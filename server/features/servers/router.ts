import {Hono} from "hono";
import {auth} from "@/server/middlewares/auth";
import {z} from "zod";
import {sValidator} from "@hono/standard-validator";
import {
  PauseServerSchema,
  RestartServerSchema,
  StartServerSchema,
  StopServerSchema,
  UpdateServerSchema,
} from "@/server/features/servers/schemas";
import {startServer} from "@/server/features/servers/service/start-server";
import {restartServer} from "@/server/features/servers/service/restart-server";
import {pauseServer} from "@/server/features/servers/service/pause-server";
import {stopServer} from "@/server/features/servers/service/stop-server";
import {updateServer} from "@/server/features/servers/service/update-server";

export const serversRouter = new Hono()
  .post("/start-server", auth(), sValidator("json", StartServerSchema), async (ctx) => {
    const userId = ctx.var.user.id;
    const input = ctx.req.valid("json");
    await startServer(input, userId);
    return ctx.json({ data: null, error: null }, 201);
  })
  .post("/restart-server", auth(), sValidator("json", RestartServerSchema), async (ctx) => {
    const userId = ctx.var.user.id;
    const input = ctx.req.valid("json");
    await restartServer(input, userId);
    return ctx.json({ data: null, error: null }, 201);
  })
  .post("/pause-server", auth(), sValidator("json", PauseServerSchema), async (ctx) => {
    const userId = ctx.var.user.id;
    const input = ctx.req.valid("json");
    await pauseServer(input, userId);
    return ctx.json({ data: null, error: null }, 201);
  })
  .post("/stop-server", auth(), sValidator("json", StopServerSchema), async (ctx) => {
    const userId = ctx.var.user.id;
    const input = ctx.req.valid("json");
    await stopServer(input, userId);
    return ctx.json({ data: null, error: null }, 201);
  })
  .post("/update-server", auth(), sValidator("json", UpdateServerSchema), async (ctx) => {
    const userId = ctx.var.user.id;
    const input = ctx.req.valid("json");
    await updateServer(input, userId);
    return ctx.json({ data: null, error: null }, 201);
  })
  .post("/toggle-star", auth(), sValidator("json", z.object({ serverId: z.string().uuid() })), async (ctx) => {
    // const userId = ctx.var.user.id;
    // const { serverId } = ctx.req.valid("json");
    // const supabase = createServerClient();
    // const selectResult = await supabase
    //   .from("user_servers")
    //   .select("is_starred")
    //   .eq("user_id", userId)
    //   .eq("server_id", serverId);
    // if (selectResult.error) {
    //   return ctx.json({ data: null, error: "Failed to toggle star" }, 500);
    // }
    // const [userServer] = selectResult.data;
    // if (!userServer) {
    //   return ctx.json({ data: null, error: "Failed to toggle star" }, 500);
    // }
    // const updateUserServersResult = await supabase
    //   .from("user_servers")
    //   .update({ is_starred: !userServer.is_starred })
    //   .eq("user_id", userId)
    //   .eq("server_id", serverId);
    // if (updateUserServersResult.error) {
    //   return ctx.json({ data: null, error: "Failed to toggle star" }, 500);
    // }
    // const operation = userServer.is_starred ? "decrement" : "increment";
    // const updateServersResult = await supabase.rpc(operation, {
    //   table_name: "servers",
    //   field_name: "stars",
    //   row_id: serverId,
    //   x: 1,
    // });
    // if (updateServersResult.error) {
    //   return ctx.json({ data: null, error: "Failed to toggle star" }, 500);
    // }
    return ctx.json({ data: null, error: null }, 201);
  });
