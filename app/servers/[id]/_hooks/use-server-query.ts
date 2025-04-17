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
          user_server_stars (id),
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

      const { data } = await query.single();
      if (!data) return null;
      const [workspaceServer] = data.workspace_servers;
      return {
        id: data.id,
        name: data.name,
        slug: data.slug,
        shortDescription: data.short_description,
        description: data.description,
        maintainer: data.maintainer,
        documentation: data.documentation,
        downloads: data.downloads,
        stars: data.stars,
        version: data.version,
        isStarred: data.user_server_stars.length > 0,
        config: data.config as Record<string, any>,
        userConfig: (workspaceServer?.config ?? {}) as Record<string, any>,
        status: workspaceServer?.status ?? "not-started",
        categories: data.server_categories.map((category) => category.categories.name),
        tools: data.tools.map((tool) => {
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
