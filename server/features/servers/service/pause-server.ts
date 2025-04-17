import type { PauseServerInput } from "@/server/features/servers/schemas";
import { createServerClient } from "@/lib/supabase/clients/server";
import { getUserWorkspace } from "@/server/features/workspaces/service/get-user-workspace";

export async function pauseServer({ serverId, workspaceId }: PauseServerInput, userId: string) {
  const supabase = createServerClient();

  const { role } = await getUserWorkspace(workspaceId, userId);
  if (role !== "owner") {
    throw new Error("User is not the owner of the workspace");
  }

  await supabase
    .from("workspace_servers")
    .update({ status: "paused" })
    .eq("server_id", serverId)
    .eq("workspace_id", workspaceId)
    .throwOnError();
}
