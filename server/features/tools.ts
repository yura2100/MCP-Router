import {Hono} from "hono";
import {auth} from "@/server/middlewares/auth";
import {sValidator} from "@hono/standard-validator";
import {z} from "zod";
import {createServerClient} from "@/lib/supabase/clients/server";

export const toolsRouter = new Hono()
  .post("/toggle-tool", auth(), sValidator("json", z.object({ toolId: z.string().uuid(), workspaceId: z.string().uuid() })), async (ctx) => {
    const userId = ctx.var.user.id;
    const { toolId, workspaceId } = ctx.req.valid("json");
    const supabase = createServerClient();
    const selectUserWorkspaceResult = await supabase
      .from("user_workspaces")
      .select("id, role")
      .eq("user_id", userId)
      .eq("workspace_id", workspaceId)
      .single();
    if (selectUserWorkspaceResult.error) {
      return ctx.json({ data: null, error: "Failed to toggle tool" }, 500);
    }
    if (selectUserWorkspaceResult.data.role !== "owner") {
      return ctx.json({ data: null, error: "Failed to toggle tool" }, 500);
    }
    const selectResult = await supabase
      .from("user_workspace_tools")
      .select(`
        id,
        status,
        user_workspaces!inner (id, workspace_id)
      `)
      .eq("tool_id", toolId)
      .eq("user_workspaces.workspace_id", workspaceId);
    if (selectResult.error) {
      return ctx.json({ data: null, error: "Failed to toggle tool" }, 500);
    }
    const userWorkspaceTools = selectResult.data;
    const updateUserWorkspaceToolPromises = userWorkspaceTools.map(({ id }) => {
      return supabase
        .from("user_workspace_tools")
        .update({ status: userWorkspaceTools[0].status === "active" ? "disabled" : "active" })
        .eq("id", id);
    });
    await Promise.all(updateUserWorkspaceToolPromises);
    return ctx.json({ data: null, error: null }, 201);
  })
  .post(
    "/update-tools",
    auth(),
    sValidator(
      "json",
      z.object({
        workspaceId: z.string().uuid(),
        tools: z.array(
          z.object({
            id: z.string().uuid(),
            status: z.enum(["active", "disabled"]),
            customName: z.string(),
            customDescription: z.string(),
          })
        )
      })
    ),
    async (ctx) => {
      const userId = ctx.var.user.id;
      const { tools, workspaceId } = ctx.req.valid("json");
      const supabase = createServerClient();
      const selectUserWorkspaceResult = await supabase
        .from("user_workspaces")
        .select("id, role")
        .eq("user_id", userId)
        .eq("workspace_id", workspaceId)
        .single();
      if (selectUserWorkspaceResult.error) {
        return ctx.json({ data: null, error: "Failed to update tools" }, 500);
      }
      if (selectUserWorkspaceResult.data.role !== "owner") {
        return ctx.json({ data: null, error: "Failed to update tools" }, 500);
      }
      const toolIds = tools.map((tool) => tool.id);
      const selectResult = await supabase
        .from("user_workspace_tools")
        .select("id, tool_id, user_workspaces!inner (workspace_id)")
        .in("tool_id", toolIds)
        .eq("user_workspaces.workspace_id", workspaceId);
      if (selectResult.error) {
        return ctx.json({ data: null, error: "Failed to update tools" }, 500);
      }
      const updateToolPromises = tools
        .map((tool) => {
          const userWorkspaceTools = selectResult.data.filter(({ tool_id }) => tool_id === tool.id);
          return userWorkspaceTools.map(({ id }) => {
            return supabase
              .from("user_workspace_tools")
              .update({
                status: tool.status,
                custom_name: tool.customName,
                custom_description: tool.customDescription,
              })
              .eq("id", tool.id);
          })
        })
        .flat();
      await Promise.all(updateToolPromises);
      return ctx.json({ data: null, error: null }, 201);
    },
  )
