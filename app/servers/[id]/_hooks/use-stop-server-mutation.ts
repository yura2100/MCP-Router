import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createApiClient} from "@/lib/api";
import {USE_SERVER_QUERY_KEY} from "@/app/servers/[id]/_hooks/use-server-query";
import {USE_SERVERS_QUERY_KEY} from "@/app/servers/_hooks/use-servers-query";
import {useToast} from "@/components/ui/use-toast";
import {USE_DASHBOARD_SERVERS_QUERY_KEY} from "@/app/dashboard/_hooks/use-dashboard-servers-query";
import {useCurrentWorkspaceStore} from "@/app/dashboard/_hooks/use-current-worspace-store";

export type UseStopServerMutationParameters = {
  serverId: string;
  slug: string;
};

export function useStopServerMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [workspaceId] = useCurrentWorkspaceStore();
  return useMutation({
    mutationFn: async ({ serverId }: UseStopServerMutationParameters) => {
      if (!workspaceId) {
        throw new Error("Workspace ID is not defined");
      }

      const client = createApiClient();
      const response = await client.api.servers["stop-server"].$post({ json: { serverId, workspaceId } });
      const { error } = await response.json();
      if (error) throw new Error(error);
    },
    onSettled: (_data, _error, { slug }) => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: [USE_SERVER_QUERY_KEY, workspaceId, slug] }),
        queryClient.invalidateQueries({ queryKey: [USE_SERVERS_QUERY_KEY, workspaceId] }),
        queryClient.invalidateQueries({ queryKey: [USE_DASHBOARD_SERVERS_QUERY_KEY, workspaceId] }),
      ]);
    },
    onSuccess: () => {
      toast({
        title: "Server Stoped",
        description: "Server has been stoped successfully",
      });
    },
  })
}
