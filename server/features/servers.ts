import {Hono} from "hono";
import {auth} from "@/server/middlewares/auth";
import {z} from "zod";
import {sValidator} from "@hono/standard-validator";
import {createServerClient} from "@/lib/supabase/clients/server";

const StartServerSchema = z.object({ serverId: z.string().uuid() });
const RestartServerSchema = z.object({ serverId: z.string().uuid() });
const PauseServerSchema = z.object({ serverId: z.string().uuid() });

export const serversRouter = new Hono()
  .post("/start-server", auth(), sValidator("json", StartServerSchema), async (ctx) => {
    const userId = ctx.var.user.id;
    const { serverId } = ctx.req.valid("json");
    const supabase = createServerClient();
    const selectResult = await supabase
      .from("servers")
      .select("tools (id)")
      .eq("id", serverId);
    if (selectResult.error) {
      return ctx.json({ data: null, error: "Failed to start star" }, 500);
    }
    const [server] = selectResult.data;
    if (!server) {
      return ctx.json({ data: null, error: "Failed to start star" }, 500);
    }
    const insertUserServerResult = await supabase
      .from("user_servers")
      .insert({
        user_id: userId,
        server_id: serverId,
        status: "active",
      });
    if (insertUserServerResult.error) {
      return ctx.json({ data: null, error: "Failed to start server" }, 500);
    }
    const tools = server.tools.map((tool) => ({
      tool_id: tool.id,
      user_id: userId,
      status: "active",
    }));
    const insertUserToolsResult = await supabase
      .from("user_tools")
      .insert(tools);
    if (insertUserToolsResult.error) {
      return ctx.json({ data: null, error: "Failed to start server" }, 500);
    }
    const incrementResult = await supabase.rpc("increment", {
      table_name: "servers",
      field_name: "downloads",
      row_id: serverId,
      x: 1,
    });
    if (incrementResult.error) {
      return ctx.json({ data: null, error: "Failed to start server" }, 500);
    }
    return ctx.json({ data: null, error: null }, 201);
  })
  .post("/restart-server", auth(), sValidator("json", RestartServerSchema), async (ctx) => {
    const userId = ctx.var.user.id;
    const { serverId } = ctx.req.valid("json");
    const supabase = createServerClient();
    const result = await supabase
      .from("user_servers")
      .update({ status: "active" })
      .eq("user_id", userId)
      .eq("server_id", serverId);
    if (result.error) {
      return ctx.json({ data: null, error: "Failed to restart server" }, 500);
    }
    return ctx.json({ data: null, error: null }, 201);
  })
  .post("/pause-server", auth(), sValidator("json", PauseServerSchema), async (ctx) => {
    const userId = ctx.var.user.id;
    const { serverId } = ctx.req.valid("json");
    const supabase = createServerClient();
    const result = await supabase
      .from("user_servers")
      .update({ status: "paused" })
      .eq("user_id", userId)
      .eq("server_id", serverId);
    if (result.error) {
      return ctx.json({ data: null, error: "Failed to pause server" }, 500);
    }
    return ctx.json({ data: null, error: null }, 201);
  })
  .post("/toggle-star", auth(), sValidator("json", z.object({ serverId: z.string().uuid() })), async (ctx) => {
    const userId = ctx.var.user.id;
    const { serverId } = ctx.req.valid("json");
    const supabase = createServerClient();
    const selectResult = await supabase
      .from("user_servers")
      .select("is_starred")
      .eq("user_id", userId)
      .eq("server_id", serverId);
    if (selectResult.error) {
      return ctx.json({ data: null, error: "Failed to toggle star" }, 500);
    }
    const [userServer] = selectResult.data;
    if (!userServer) {
      return ctx.json({ data: null, error: "Failed to toggle star" }, 500);
    }
    const updateUserServersResult = await supabase
      .from("user_servers")
      .update({ is_starred: !userServer.is_starred })
      .eq("user_id", userId)
      .eq("server_id", serverId);
    if (updateUserServersResult.error) {
      return ctx.json({ data: null, error: "Failed to toggle star" }, 500);
    }
    const operation = userServer.is_starred ? "decrement" : "increment";
    const updateServersResult = await supabase.rpc(operation, {
      table_name: "servers",
      field_name: "stars",
      row_id: serverId,
      x: 1,
    });
    if (updateServersResult.error) {
      return ctx.json({ data: null, error: "Failed to toggle star" }, 500);
    }
    return ctx.json({ data: null, error: null }, 201);
  });
