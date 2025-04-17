import type { StopServerInput } from "@/server/features/servers/schemas";
import { createServerClient } from "@/lib/supabase/clients/server";
import { deleteWorker } from "@/server/features/deployer/service/delete-workser";
import { getUserWorkspace } from "@/server/features/workspaces/service/get-user-workspace";

export async function stopServer({ serverId, workspaceId }: StopServerInput, userId: string) {
  const supabase = createServerClient();

  const [{ data: workspaceServer }, { role }] = await Promise.all([
    supabase
      .from("workspace_servers")
      .select(`
        servers!inner (
          slug,
          tools!inner (id)
        ),
        workspaces!inner (
          user_workspaces!inner (id)
        )
      `)
      .eq("workspace_id", workspaceId)
      .eq("server_id", serverId)
      .maybeSingle()
      .throwOnError(),
    getUserWorkspace(workspaceId, userId),
  ]);

  if (!workspaceServer) {
    throw new Error("Server not found");
  }

  if (role !== "owner") {
    throw new Error("User is not the owner of the workspace");
  }

  await deleteWorker(workspaceServer.servers.slug, workspaceId);

  const deleteUserWorkspaceToolPromises = workspaceServer.servers.tools
    .map((tool) => {
      return workspaceServer.workspaces.user_workspaces.map(({ id }) => {
        return supabase
          .from("user_workspace_tools")
          .delete()
          .eq("tool_id", tool.id)
          .eq("user_workspace_id", id)
          .throwOnError();
      })
    })
    .flat();
  await Promise.all(deleteUserWorkspaceToolPromises);

  await supabase
    .from("workspace_servers")
    .delete()
    .eq("server_id", serverId)
    .eq("workspace_id", workspaceId)
    .throwOnError();

  await supabase
    .rpc("decrement", {
      table_name: "servers",
      field_name: "downloads",
      row_id: serverId,
      x: 1,
    })
    .throwOnError();
}
