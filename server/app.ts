import { Hono } from "hono";
import { serversRouter } from "@/server/features/servers/router";
import { toolsRouter } from "@/server/features/tools/router";
import { workspacesRouter } from "@/server/features/workspaces/router";

export const app = new Hono()
  .basePath('/api')
  .route("/servers", serversRouter)
  .route("/tools", toolsRouter)
  .route("/workspaces", workspacesRouter);

export type AppType = typeof app;
