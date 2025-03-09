import {Hono} from "hono";
import {auth} from "@/server/middlewares/auth";
import {sValidator} from "@hono/standard-validator";
import {z} from "zod";
import {createServerClient} from "@/lib/supabase/clients/server";

export const toolsRouter = new Hono()
  .post("/toggle-tool", auth(), sValidator("json", z.object({ toolId: z.string().uuid() })), async (ctx) => {
    const userId = ctx.var.user.id;
    const { toolId } = ctx.req.valid("json");
    const supabase = createServerClient();
    const selectResult = await supabase
      .from("user_tools")
      .select("status")
      .eq("user_id", userId)
      .eq("tool_id", toolId);
    if (selectResult.error) {
      return ctx.json({ data: null, error: "Failed to toggle tool" }, 500);
    }
    const [userTool] = selectResult.data;
    if (!userTool) {
      return ctx.json({ data: null, error: "Failed to toggle tool" }, 500);
    }
    const updateUserServersResult = await supabase
      .from("user_tools")
      .update({ status: userTool.status === "active" ? "disabled" : "active" })
      .eq("user_id", userId)
      .eq("tool_id", toolId);
    if (updateUserServersResult.error) {
      return ctx.json({ data: null, error: "Failed to toggle tool" }, 500);
    }
    return ctx.json({ data: null, error: null }, 201);
  })
