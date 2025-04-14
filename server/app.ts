import { Hono } from "hono";
import { serversRouter } from "@/server/features/servers";
import { toolsRouter } from "@/server/features/tools";
import { workspacesRouter } from "@/server/features/workspaces";

export const app = new Hono()
  .basePath('/api')
  .route("/servers", serversRouter)
  .route("/tools", toolsRouter)
  .route("/workspaces", workspacesRouter);

export type AppType = typeof app;
