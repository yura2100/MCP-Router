import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createApiClient} from "@/lib/api";
import {Server, USE_SERVER_QUERY_KEY} from "@/app/servers/[id]/_hooks/use-server-query";
import {USE_SERVERS_QUERY_KEY} from "@/app/servers/_hooks/use-servers-query";
import {useToast} from "@/components/ui/use-toast";
import {USE_DASHBOARD_SERVERS_QUERY_KEY} from "@/app/dashboard/_hooks/use-dashboard-servers-query";
import {useCurrentWorkspaceStore} from "@/app/dashboard/_hooks/use-current-worspace-store";

export type UseStartServerMutationParameters = {
  serverId: string;
  slug: string;
};

export function useStartServerMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [workspaceId] = useCurrentWorkspaceStore();
  return useMutation({
    mutationFn: async ({ serverId, slug }: UseStartServerMutationParameters) => {
      const server = queryClient.getQueryData<Server | null>([USE_SERVER_QUERY_KEY, workspaceId, slug]);
      if (server) {
        const newServer = { ...server, status: "active" };
        queryClient.setQueryData([USE_SERVER_QUERY_KEY, workspaceId, slug], newServer);
      }

      const client = createApiClient();
      const response = await client.api.servers["start-server"].$post({ json: { serverId } });
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
    onSuccess: () => {
      toast({
        title: "Server Started",
        description: "Server has been started successfully",
      });
    },
  })
}
