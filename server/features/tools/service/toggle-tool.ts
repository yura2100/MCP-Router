import type { ToggleToolInput } from "@/server/features/tools/schemas";
import { createServerClient } from "@/lib/supabase/clients/server";
import { getUserWorkspace } from "@/server/features/workspaces/service/get-user-workspace";

export async function toggleTool({ toolId, workspaceId }: ToggleToolInput, userId: string) {
  const supabase = createServerClient();

  const [{ data: userWorkspaceTools }, { role }] = await Promise.all([
    supabase
      .from("user_workspace_tools")
      .select(`
        id,
        status,
        user_workspaces!inner (id, workspace_id)
      `)
      .eq("tool_id", toolId)
      .eq("user_workspaces.workspace_id", workspaceId)
      .throwOnError(),
    getUserWorkspace(workspaceId, userId),
  ]);

  if (role !== "owner") {
    throw new Error("User is not the owner of the workspace");
  }

  const updateUserWorkspaceToolPromises = userWorkspaceTools.map(({ id }) => {
    return supabase
      .from("user_workspace_tools")
      .update({ status: userWorkspaceTools[0].status === "active" ? "disabled" : "active" })
      .eq("id", id)
      .throwOnError();
  });
  await Promise.all(updateUserWorkspaceToolPromises);
}
