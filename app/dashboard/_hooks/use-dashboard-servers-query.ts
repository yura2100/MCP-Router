import {useQuery} from "@tanstack/react-query";
import {createBrowserClient} from "@/lib/supabase/clients/browser";
import {useCurrentWorkspaceStore} from "@/app/dashboard/_hooks/use-current-worspace-store";

export const USE_DASHBOARD_SERVERS_QUERY_KEY = "useDashboardServersQuery"

export function useDashboardServersQuery() {
  const [workspaceId] = useCurrentWorkspaceStore();
  return useQuery({
    queryKey: [USE_DASHBOARD_SERVERS_QUERY_KEY, workspaceId],
    queryFn: async () => {
      const supabase = createBrowserClient();
      if (!workspaceId) return [];
      const { data } = await supabase
        .from("servers")
        .select(`
          id,
          name,
          slug,
          short_description,
          maintainer,
          downloads,
          stars,
          version,
          server_categories!inner (
            categories!inner (name)
          ),
          workspace_servers!inner (status),
          tools!inner (
            id,
            name,
            description,
            user_workspace_tools!inner (
              status,
              custom_name,
              custom_description,
              user_workspaces!inner (workspace_id)
            )
          )
        `)
        .eq("workspace_servers.workspace_id", workspaceId)
        .eq("tools.user_workspace_tools.user_workspaces.workspace_id", workspaceId);
      if (!data) return [];
      return data.map((server) => ({
        id: server.id,
        name: server.name,
        slug: server.slug,
        shortDescription: server.short_description,
        maintainer: server.maintainer,
        downloads: server.downloads,
        stars: server.stars,
        version: server.version,
        status: server.workspace_servers[0].status,
        categories: server.server_categories.map((category) => category.categories.name),
        tools: server.tools.map((tool) => ({
          id: tool.id,
          name: tool.name,
          description: tool.description,
          status: tool.user_workspace_tools[0].status,
          customName: tool.user_workspace_tools[0].custom_name,
          customDescription: tool.user_workspace_tools[0].custom_description,
        })),
      }));
    },
    initialData: [],
  });
}

export type DashboardServer = ReturnType<typeof useDashboardServersQuery>["data"][number];
