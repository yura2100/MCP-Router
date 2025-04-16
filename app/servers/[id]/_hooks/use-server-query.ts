import {useQuery} from "@tanstack/react-query";
import {createBrowserClient} from "@/lib/supabase/clients/browser";
import {useCurrentWorkspaceStore} from "@/app/dashboard/_hooks/use-current-worspace-store";

export const USE_SERVER_QUERY_KEY = "useServerQuery"

export type UseServerQueryParameters = {
  slug: string;
};

export function useServerQuery({ slug }: UseServerQueryParameters) {
  const [workspaceId] = useCurrentWorkspaceStore();
  return useQuery({
    queryKey: [USE_SERVER_QUERY_KEY, workspaceId, slug],
    queryFn: async () => {
      const supabase = createBrowserClient();
      let query = supabase
        .from("servers")
        .select(`
          id,
          name,
          slug,
          short_description,
          description,
          documentation,
          downloads,
          stars,
          version,
          maintainer,
          config,
          server_categories!inner (
            categories!inner (name)
          ),
          workspace_servers (status, config),
          tools!inner (
            id,
            name,
            description,
            user_workspace_tools (
              status,
              custom_name,
              custom_description,
              user_workspaces!inner (workspace_id)
            )
          )
        `)
        .eq("slug", slug);

      if (workspaceId) {
        query = query
          .eq("workspace_servers.workspace_id", workspaceId)
          .eq("tools.user_workspace_tools.user_workspaces.workspace_id", workspaceId);
      }

      const { data } = await query;
      const server = data?.[0];
      if (!server) return null;
      const [workspaceServer] = server.workspace_servers;
      return {
        id: server.id,
        name: server.name,
        slug: server.slug,
        shortDescription: server.short_description,
        description: server.description,
        maintainer: server.maintainer,
        documentation: server.documentation,
        downloads: server.downloads,
        stars: server.stars,
        version: server.version,
        isStarred: false,
        config: server.config as Record<string, any>,
        userConfig: (workspaceServer?.config ?? {}) as Record<string, any>,
        status: workspaceServer?.status ?? "not-started",
        categories: server.server_categories.map((category) => category.categories.name),
        tools: server.tools.map((tool) => {
          const [userWorkspaceTool] = tool.user_workspace_tools;
          return {
            id: tool.id,
            name: tool.name,
            description: tool.description,
            status: userWorkspaceTool?.status ?? "active",
            customName: userWorkspaceTool?.custom_name ?? "",
            customDescription: userWorkspaceTool?.custom_description ?? "",
          }
        }),
      };
    },
    initialData: null,
  });
}

export type Server = NonNullable<ReturnType<typeof useServerQuery>["data"]>;
