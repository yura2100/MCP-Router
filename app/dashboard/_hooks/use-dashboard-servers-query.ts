import {useQuery} from "@tanstack/react-query";
import {createBrowserClient} from "@/lib/supabase/clients/browser";

export const USE_DASHBOARD_SERVERS_QUERY_KEY = "useDashboardServersQuery"

export function useDashboardServersQuery() {
  return useQuery({
    queryKey: [USE_DASHBOARD_SERVERS_QUERY_KEY],
    queryFn: async () => {
      const supabase = createBrowserClient();
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
          server_categories (
            categories (name)
          ),
          user_servers!inner (status, is_starred),
          tools (
            id,
            name,
            description,
            user_tools (status, custom_name, custom_description)
          )
        `);
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
        isStarred: server.user_servers[0].is_starred,
        status: server.user_servers[0].status,
        categories: server.server_categories.map((category) => category.categories.name),
        tools: server.tools.map((tool) => ({
          id: tool.id,
          name: tool.name,
          description: tool.description,
          status: tool.user_tools[0].status,
          customName: tool.user_tools[0].custom_name,
          customDescription: tool.user_tools[0].custom_description,
        })),
      }));
    },
    initialData: [],
  });
}

export type DashboardServer = ReturnType<typeof useDashboardServersQuery>["data"][number];
