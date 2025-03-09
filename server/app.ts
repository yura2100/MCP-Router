import {Hono} from "hono";
import {serversRouter} from "@/server/features/servers";
import { toolsRouter } from "./features/tools";

export const app = new Hono()
  .basePath('/api')
  .route("/servers", serversRouter)
  .route("/tools", toolsRouter);

export type AppType = typeof app;
