import {Hono} from "hono";
import {auth} from "@/server/middlewares/auth";
import {sValidator} from "@hono/standard-validator";
import {createWorkspace} from "@/server/features/workspaces/service/create-workspace";
import {CreateWorkspaceSchema} from "@/server/features/workspaces/schemas";

export const workspacesRouter = new Hono()
  .post("/create-workspace", auth(), sValidator("json", CreateWorkspaceSchema), async (ctx) => {
    const userId = ctx.var.user.id;
    const input = ctx.req.valid("json");
    const data = await createWorkspace(input, userId);
    return ctx.json({ data, error: null }, 201);
  })
