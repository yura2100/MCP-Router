import type { UpdateServerInput } from "@/server/features/servers/schemas";
import { createServerClient } from "@/lib/supabase/clients/server";
import { JSONSchemaToZod } from "@dmitryrechkin/json-schema-to-zod";
import { updateWorker } from "@/server/features/deployer/service/update-worker";
import { getUserWorkspace } from "@/server/features/workspaces/service/get-user-workspace";

export async function updateServer({ serverId, workspaceId, config }: UpdateServerInput, userId: string) {
  const supabase = createServerClient();

  const [{ data: workspaceServer }, { role }] = await Promise.all([
    supabase
      .from("workspace_servers")
      .select("servers!inner (slug, config)")
      .eq("server_id", serverId)
      .eq("workspace_id", workspaceId)
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

  const schema = JSONSchemaToZod.convert((workspaceServer.servers.config as any).connection.schema);
  const { success: isConfigured } = await schema.safeParseAsync(config.connection);

  await updateWorker(workspaceServer.servers.slug, workspaceId, config.connection);

  await supabase
    .from("workspace_servers")
    .update({ config, status: isConfigured ? "active" : "misconfigured" })
    .eq("server_id", serverId)
    .eq("workspace_id", workspaceId)
    .throwOnError();
}
