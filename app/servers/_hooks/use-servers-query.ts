import {useQuery} from "@tanstack/react-query";
import {createBrowserClient} from "@/lib/supabase/clients/browser";
import {useCurrentWorkspaceStore} from "@/app/dashboard/_hooks/use-current-worspace-store";

export const USE_SERVERS_QUERY_KEY = "useServersQuery"

export type UseServersQueryParameters = {
  search: string;
  categories: string[];
};

export function useServersQuery(params: UseServersQueryParameters) {
  const [workspaceId] = useCurrentWorkspaceStore();
  return useQuery({
    queryKey: [USE_SERVERS_QUERY_KEY, workspaceId, params],
    queryFn: async () => {
      const supabase = createBrowserClient();
      let query = supabase
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
            categories (name)
          ),
          workspace_servers (status)
        `);

      if (workspaceId) {
        query = query.eq("workspace_servers.workspace_id", workspaceId);
      }

      if (params.search) {
        query = query.ilike("name", `%${params.search}%`);
      }

      if (params.categories.length !== 0) {
        query = query.in("server_categories.category_id", params.categories);
      }

      const { data } = await query;
      if (!data) return [];
      return data.map((server) => {
        const [workspaceServer] = server.workspace_servers;
        return {
          id: server.id,
          name: server.name,
          slug: server.slug,
          shortDescription: server.short_description,
          maintainer: server.maintainer,
          downloads: server.downloads,
          stars: server.stars,
          version: server.version,
          isStarred: false,
          status: workspaceServer?.status ?? "not-started",
          categories: server.server_categories.map((category) => category.categories.name),
        };
      });
    },
    initialData: [],
  });
}

export type PartialServer = ReturnType<typeof useServersQuery>["data"][number];
