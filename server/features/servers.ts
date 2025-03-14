import {Hono} from "hono";
import {auth} from "@/server/middlewares/auth";
import {z} from "zod";
import {sValidator} from "@hono/standard-validator";
import {createServerClient} from "@/lib/supabase/clients/server";
import {JSONSchemaToZod} from "@dmitryrechkin/json-schema-to-zod";

export const serversRouter = new Hono()
  .post("/start-server", auth(), sValidator("json", z.object({ serverId: z.string().uuid() })), async (ctx) => {
    const userId = ctx.var.user.id;
    const { serverId } = ctx.req.valid("json");
    const supabase = createServerClient();
    const selectResult = await supabase
      .from("servers")
      .select("config, tools (id)")
      .eq("id", serverId);
    if (selectResult.error) {
      return ctx.json({ data: null, error: "Failed to start star" }, 500);
    }
    const [server] = selectResult.data;
    if (!server) {
      return ctx.json({ data: null, error: "Failed to start star" }, 500);
    }
    const schema = JSONSchemaToZod.convert((server.config as any).connection.schema);
    const { success: isConfigured, data, error } = await schema.safeParseAsync({});
    console.log({ schema, isConfigured, data, error });
    const insertUserServerResult = await supabase
      .from("user_servers")
      .insert({
        user_id: userId,
        server_id: serverId,
        status: isConfigured ? "active" : "misconfigured",
      });
    if (insertUserServerResult.error) {
      return ctx.json({ data: null, error: "Failed to start server" }, 500);
    }
    const tools = server.tools.map((tool) => ({
      user_id: userId,
      tool_id: tool.id,
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
  .post("/restart-server", auth(), sValidator("json", z.object({ serverId: z.string().uuid() })), async (ctx) => {
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
  .post("/pause-server", auth(), sValidator("json", z.object({ serverId: z.string().uuid() })), async (ctx) => {
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
  .post("/stop-server", auth(), sValidator("json", z.object({ serverId: z.string().uuid() })), async (ctx) => {
    const userId = ctx.var.user.id;
    const { serverId } = ctx.req.valid("json");
    const supabase = createServerClient();
    const selectResult = await supabase
      .from("user_servers")
      .select(`
        is_starred,
        servers (
          tools (id)
        )
      `)
      .eq("user_id", userId)
      .eq("server_id", serverId);
    if (selectResult.error) {
      return ctx.json({ data: null, error: "Failed to stop server" }, 500);
    }
    const [userServer] = selectResult.data;
    if (!userServer) {
      return ctx.json({ data: null, error: "Failed to stop server" }, 500);
    }
    const tooldIds = userServer.servers.tools.map((tool) => tool.id);
    const deleteUserToolsResult = await supabase
      .from("user_tools")
      .delete()
      .eq("user_id", userId)
      .in("tool_id", tooldIds);
    if (deleteUserToolsResult.error) {
      return ctx.json({ data: null, error: "Failed to stop server" }, 500);
    }
    const deleteUserServeResult = await supabase
      .from("user_servers")
      .delete()
      .eq("user_id", userId)
      .eq("server_id", serverId);
    if (deleteUserServeResult.error) {
      return ctx.json({ data: null, error: "Failed to stop server" }, 500);
    }
    const decrementDownloadsResult = await supabase.rpc("decrement", {
      table_name: "servers",
      field_name: "downloads",
      row_id: serverId,
      x: 1,
    });
    if (decrementDownloadsResult.error) {
      return ctx.json({ data: null, error: "Failed to stop server" }, 500);
    }
    if (userServer.is_starred) {
      const decrementStarsResult = await supabase.rpc("decrement", {
        table_name: "servers",
        field_name: "stars",
        row_id: serverId,
        x: 1,
      });
      if (decrementStarsResult.error) {
        return ctx.json({ data: null, error: "Failed to stop server" }, 500);
      }
    }
    return ctx.json({ data: null, error: null }, 201);
  })
  .post("/update-server", auth(), sValidator("json", z.object({ serverId: z.string().uuid(), config: z.object({ connection: z.object({}).passthrough() }) })), async (ctx) => {
    const userId = ctx.var.user.id;
    const { serverId, config } = ctx.req.valid("json");
    const supabase = createServerClient();
    const selectResult = await supabase
      .from("user_servers")
      .select("servers (config)")
      .eq("user_id", userId)
      .eq("server_id", serverId);
    if (selectResult.error) {
      return ctx.json({ data: null, error: "Failed to update server" }, 500);
    }
    const [userServer] = selectResult.data;
    if (!userServer) {
      return ctx.json({ data: null, error: "Failed to update server" }, 500);
    }
    const schema = JSONSchemaToZod.convert((userServer.servers.config as any).connection.schema);
    const { success: isConfigured } = await schema.safeParseAsync(config.connection);
    const updateResult = await supabase
      .from("user_servers")
      .update({
        config,
        status: isConfigured ? "active" : "misconfigured",
      })
      .eq("user_id", userId)
      .eq("server_id", serverId);
    if (updateResult.error) {
      return ctx.json({ data: null, error: "Failed to update server" }, 500);
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
