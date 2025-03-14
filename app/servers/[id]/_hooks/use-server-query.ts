import {useQuery} from "@tanstack/react-query";
import {createBrowserClient} from "@/lib/supabase/clients/browser";

export const USE_SERVER_QUERY_KEY = "useServerQuery"

export type UseServerQueryParameters = {
  slug: string;
};

export function useServerQuery({ slug }: UseServerQueryParameters) {
  return useQuery({
    queryKey: [USE_SERVER_QUERY_KEY, slug],
    queryFn: async () => {
      const supabase = createBrowserClient();
      const { data } = await supabase
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
          server_categories (
            categories (name)
          ),
          user_servers (status, is_starred, config),
          tools (
            id,
            name,
            description,
            user_tools (status, custom_name, custom_description)
          )
        `)
        .eq("slug", slug);
      const server = data?.[0];
      if (!server) return null;
      const [userServer] = server.user_servers;
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
        isStarred: userServer?.is_starred ?? false,
        config: server.config as Record<string, any>,
        userConfig: (userServer?.config ?? {}) as Record<string, any>,
        status: userServer?.status ?? "not-started",
        categories: server.server_categories.map((category) => category.categories.name),
        tools: server.tools.map((tool) => {
          const [userTool] = tool.user_tools;
          return {
            id: tool.id,
            name: tool.name,
            description: tool.description,
            status: userTool?.status ?? "active",
            customName: userTool?.custom_name ?? "",
            customDescription: userTool?.custom_description ?? "",
          }
        }),
      };
    },
    initialData: null,
  });
}

export type Server = NonNullable<ReturnType<typeof useServerQuery>["data"]>;
