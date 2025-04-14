import {Hono} from "hono";
import {auth} from "@/server/middlewares/auth";
import {sValidator} from "@hono/standard-validator";
import {z} from "zod";
import {createServerClient} from "@/lib/supabase/clients/server";

export const workspacesRouter = new Hono()
  .post("/create-workspace", auth(), sValidator("json", z.object({ name: z.string() })), async (ctx) => {
    const userId = ctx.var.user.id;
    const { name } = ctx.req.valid("json");
    const supabase = createServerClient();
    const insertWorkspaceResult = await supabase
      .from("workspaces")
      .insert({ name })
      .select("id");
    if (insertWorkspaceResult.error) {
      return ctx.json({ data: null, error: "Failed to create workspace" }, 500);
    }
    const workspaceId = insertWorkspaceResult.data[0].id;
    const insertUserWorkspaceResult = await supabase
      .from("user_workspaces")
      .insert({ user_id: userId, workspace_id: workspaceId, role: "owner" });
    if (insertUserWorkspaceResult.error) {
      return ctx.json({ data: null, error: "Failed to create workspace" }, 500);
    }
    return ctx.json({ data: { workspaceId }, error: null }, 201);
  })
