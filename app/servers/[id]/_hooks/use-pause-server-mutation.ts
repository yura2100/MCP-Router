import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createApiClient} from "@/lib/api";
import {Server, USE_SERVER_QUERY_KEY} from "@/app/servers/[id]/_hooks/use-server-query";
import {USE_SERVERS_QUERY_KEY} from "@/app/servers/_hooks/use-servers-query";
import {useToast} from "@/components/ui/use-toast";
import {DashboardServer, USE_DASHBOARD_SERVERS_QUERY_KEY} from "@/app/dashboard/_hooks/use-dashboard-servers-query";

export type UsePauseServerMutationParameters = {
  serverId: string;
  slug: string;
};

export function usePauseServerMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ serverId, slug }: UsePauseServerMutationParameters) => {
      const server = queryClient.getQueryData<Server | null>([USE_SERVER_QUERY_KEY, slug]);
      if (server) {
        const newServer = { ...server, status: "paused" };
        queryClient.setQueryData([USE_SERVER_QUERY_KEY, slug], newServer);
      }

      const dashboardServers = queryClient.getQueryData<DashboardServer[]>([USE_DASHBOARD_SERVERS_QUERY_KEY]);
      if (dashboardServers) {
        const newDashboardServers = dashboardServers.map((server) => {
          if (server.id !== serverId) return server;
          return { ...server, status: "paused" };
        });
        queryClient.setQueryData([USE_DASHBOARD_SERVERS_QUERY_KEY], newDashboardServers);
      }

      const client = createApiClient();
      const response = await client.api.servers["pause-server"].$post({ json: { serverId } });
      const { error } = await response.json();
      if (error) throw new Error(error);
    },
    onSettled: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: [USE_SERVER_QUERY_KEY] }),
        queryClient.invalidateQueries({ queryKey: [USE_SERVERS_QUERY_KEY] }),
        queryClient.invalidateQueries({ queryKey: [USE_DASHBOARD_SERVERS_QUERY_KEY] }),
      ])
    },
    onSuccess: () => {
      toast({
        title: "Server Paused",
        description: "Server has been paused successfully",
      });
    },
  })
}
