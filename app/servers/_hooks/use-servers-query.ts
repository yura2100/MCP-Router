import {useQuery} from "@tanstack/react-query";
import {createBrowserClient} from "@/lib/supabase/clients/browser";

export const USE_SERVERS_QUERY_KEY = "useServersQuery"

export type UseServersQueryParameters = {
  search: string;
  categories: string[];
};

export function useServersQuery(params: UseServersQueryParameters) {
  return useQuery({
    queryKey: [USE_SERVERS_QUERY_KEY, params],
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
          user_servers (status, is_starred)
        `);

      if (params.search) {
        query = query.ilike("name", `%${params.search}%`);
      }

      if (params.categories.length !== 0) {
        query = query.in("server_categories.category_id", params.categories);
      }

      const { data } = await query;
      if (!data) return [];
      return data.map((server) => {
        const [userServer] = server.user_servers;
        return {
          id: server.id,
          name: server.name,
          slug: server.slug,
          shortDescription: server.short_description,
          maintainer: server.maintainer,
          downloads: server.downloads,
          stars: server.stars,
          version: server.version,
          isStarred: userServer?.is_starred ?? false,
          status: userServer?.status ?? "not-started",
          categories: server.server_categories.map((category) => category.categories.name),
        };
      });
    },
    initialData: [],
  });
}

export type PartialServer = ReturnType<typeof useServersQuery>["data"][number];
