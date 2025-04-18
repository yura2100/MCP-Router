import type { StartServerInput } from "@/server/features/servers/schemas";
import { createServerClient } from "@/lib/supabase/clients/server";
import { JSONSchemaToZod } from "@dmitryrechkin/json-schema-to-zod";
import { createWorker } from "@/server/features/deployer/service/create-worker";
import { getUserWorkspace } from "@/server/features/workspaces/service/get-user-workspace";

export async function startServer({ serverId, workspaceId }: StartServerInput, userId: string) {
  const supabase = createServerClient();

  const [{ data: server }, userWorkspace] = await Promise.all([
    supabase
      .from("servers")
      .select("slug, config, tools (id)")
      .eq("id", serverId)
      .maybeSingle()
      .throwOnError(),
    getUserWorkspace(workspaceId, userId),
  ]);

  if (!server) {
    throw new Error("Server not found");
  }

  if (userWorkspace.role !== "owner") {
    throw new Error("User is not the owner of the workspace");
  }

  const schema = JSONSchemaToZod.convert((server.config as any).connection.schema);
  const { success: isConfigured } = await schema.safeParseAsync({});

  await createWorker(server.slug, workspaceId);

  await supabase
    .from("workspace_servers")
    .insert({
      workspace_id: workspaceId,
      server_id: serverId,
      status: isConfigured ? "active" : "misconfigured",
    })
    .throwOnError();

  const tools = server.tools.map((tool) => ({
    user_workspace_id: userWorkspace.id,
    tool_id: tool.id,
    status: "active",
  }));
  await supabase.from("user_workspace_tools").insert(tools).throwOnError();

  await supabase
    .rpc("increment", {
      table_name: "servers",
      field_name: "downloads",
      row_id: serverId,
      x: 1,
    })
    .throwOnError();
}
