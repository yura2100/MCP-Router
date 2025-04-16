import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createApiClient} from "@/lib/api";
import {Server, USE_SERVER_QUERY_KEY} from "@/app/servers/[id]/_hooks/use-server-query";
import {USE_SERVERS_QUERY_KEY} from "@/app/servers/_hooks/use-servers-query";
import {USE_DASHBOARD_SERVERS_QUERY_KEY} from "@/app/dashboard/_hooks/use-dashboard-servers-query";
import {useCurrentWorkspaceStore} from "@/app/dashboard/_hooks/use-current-worspace-store";

export type UseToggleStarMutationParameters = {
  serverId: string;
  slug: string;
};

export function useToggleStarMutation() {
  const queryClient = useQueryClient();
  const [workspaceId] = useCurrentWorkspaceStore();
  return useMutation({
    mutationFn: async ({ serverId, slug }: UseToggleStarMutationParameters) => {
      const server = queryClient.getQueryData<Server | null>([USE_SERVER_QUERY_KEY, workspaceId, slug]);
      if (server) {
        const newServer = {
          ...server,
          isStarred: !server.isStarred,
          stars: !server.isStarred ? server.stars + 1 : server.stars - 1,
        };
        queryClient.setQueryData([USE_SERVER_QUERY_KEY, workspaceId], newServer);
      }

      const client = createApiClient();
      const response = await client.api.servers["toggle-star"].$post({ json: { serverId } });
      const { error } = await response.json();
      if (error) throw new Error(error);
    },
    onSettled: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: [USE_SERVER_QUERY_KEY, workspaceId] }),
        queryClient.invalidateQueries({ queryKey: [USE_SERVERS_QUERY_KEY, workspaceId] }),
        queryClient.invalidateQueries({ queryKey: [USE_DASHBOARD_SERVERS_QUERY_KEY, workspaceId] }),
      ])
    },
  })
}
