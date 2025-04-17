import {Hono} from "hono";
import {auth} from "@/server/middlewares/auth";
import {sValidator} from "@hono/standard-validator";
import {ToggleToolSchema, UpdateToolsSchema} from "@/server/features/tools/schemas";
import {toggleTool} from "@/server/features/tools/service/toggle-tool";
import {updateTools} from "@/server/features/tools/service/update-tools";

export const toolsRouter = new Hono()
  .post("/toggle-tool", auth(), sValidator("json", ToggleToolSchema), async (ctx) => {
    const userId = ctx.var.user.id;
    const input = ctx.req.valid("json");
    await toggleTool(input, userId);
    return ctx.json({ data: null, error: null }, 201);
  })
  .post(
    "/update-tools",
    auth(),
    sValidator("json", UpdateToolsSchema),
    async (ctx) => {
      const userId = ctx.var.user.id;
      const input = ctx.req.valid("json");
      await updateTools(input, userId);
      return ctx.json({ data: null, error: null }, 201);
    },
  );
