import {Hono} from "hono";
import {auth} from "@/server/middlewares/auth";
import {sValidator} from "@hono/standard-validator";
import {
  PauseServerSchema,
  RestartServerSchema,
  StartServerSchema,
  StopServerSchema,
  ToggleStarSchema,
  UpdateServerSchema,
} from "@/server/features/servers/schemas";
import {startServer} from "@/server/features/servers/service/start-server";
import {restartServer} from "@/server/features/servers/service/restart-server";
import {pauseServer} from "@/server/features/servers/service/pause-server";
import {stopServer} from "@/server/features/servers/service/stop-server";
import {updateServer} from "@/server/features/servers/service/update-server";
import {toggleStar} from "@/server/features/servers/service/toggle-star";

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
  .post("/toggle-star", auth(), sValidator("json", ToggleStarSchema), async (ctx) => {
    const userId = ctx.var.user.id;
    const input = ctx.req.valid("json");
    await toggleStar(input, userId);
    return ctx.json({ data: null, error: null }, 201);
  });
