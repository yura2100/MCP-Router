import { createServerClient } from "@/lib/supabase/clients/server";

export async function getUserWorkspace(workspaceId: string, userId: string) {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("user_workspaces")
    .select("id, role")
    .eq("user_id", userId)
    .eq("workspace_id", workspaceId)
    .maybeSingle()
    .throwOnError();

  if (!data) {
    throw new Error("Workspace not found");
  }

  return data;
}
