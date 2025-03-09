import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createApiClient} from "@/lib/api";
import {Server, USE_SERVER_QUERY_KEY} from "@/app/servers/[id]/_hooks/use-server-query";
import {USE_SERVERS_QUERY_KEY} from "@/app/servers/_hooks/use-servers-query";

export type UseToggleStarMutationParameters = {
  serverId: string;
};

export function useToggleStarMutation(slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ serverId }: UseToggleStarMutationParameters) => {
      const server = queryClient.getQueryData<Server | null>([USE_SERVER_QUERY_KEY, slug]);
      if (!server) return;
      const newServer = {
        ...server,
        isStarred: !server.isStarred,
        stars: !server.isStarred ? server.stars + 1 : server.stars - 1,
      };
      queryClient.setQueryData([USE_SERVER_QUERY_KEY, slug], newServer);

      const client = createApiClient();
      const response = await client.api.servers["toggle-star"].$post({ json: { serverId } });
      const { error } = await response.json();
      if (error) throw new Error(error);
    },
    onSettled: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: [USE_SERVER_QUERY_KEY, slug] }),
        queryClient.invalidateQueries({ queryKey: [USE_SERVERS_QUERY_KEY] }),
      ])
    },
  })
}
