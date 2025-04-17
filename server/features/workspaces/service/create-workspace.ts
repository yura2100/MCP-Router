import type { CreateWorkspaceInput } from "@/server/features/workspaces/schemas";
import { createServerClient } from "@/lib/supabase/clients/server";

export async function createWorkspace({ name }: CreateWorkspaceInput, userId: string) {
  const supabase = createServerClient();

  const { data } = await supabase
    .from("workspaces")
    .insert({ name })
    .select("id")
    .single()
    .throwOnError();
  const workspaceId = data.id;

  await supabase
    .from("user_workspaces")
    .insert({ user_id: userId, workspace_id: data.id, role: "owner" })
    .throwOnError();

  return { workspaceId };
}
