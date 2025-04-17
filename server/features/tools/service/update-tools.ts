import type { UpdateToolsInput } from "@/server/features/tools/schemas";
import { createServerClient } from "@/lib/supabase/clients/server";
import { getUserWorkspace } from "@/server/features/workspaces/service/get-user-workspace";

export async function updateTools({ workspaceId, tools }: UpdateToolsInput, userId: string) {
  const supabase = createServerClient();

  const toolIds = tools.map((tool) => tool.id);
  const [{ data: userWorkspaceTools }, { role }] = await Promise.all([
    supabase
      .from("user_workspace_tools")
      .select("id, tool_id, user_workspaces!inner (workspace_id)")
      .in("tool_id", toolIds)
      .eq("user_workspaces.workspace_id", workspaceId)
      .throwOnError(),
    getUserWorkspace(workspaceId, userId),
  ]);

  if (role !== "owner") {
    throw new Error("User is not the owner of the workspace");
  }

  const updateToolPromises = tools
    .map((tool) => {
      return userWorkspaceTools
        .filter(({ tool_id }) => tool_id === tool.id)
        .map(({ id }) => {
          return supabase
            .from("user_workspace_tools")
            .update({
              status: tool.status,
              custom_name: tool.customName,
              custom_description: tool.customDescription,
            })
            .eq("id", id)
            .throwOnError();
        });
    })
    .flat();
  await Promise.all(updateToolPromises);
}
