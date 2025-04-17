import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createApiClient} from "@/lib/api";
import {USE_SERVER_QUERY_KEY} from "@/app/servers/[id]/_hooks/use-server-query";
import {USE_SERVERS_QUERY_KEY} from "@/app/servers/_hooks/use-servers-query";
import {useToast} from "@/components/ui/use-toast";
import {USE_DASHBOARD_SERVERS_QUERY_KEY} from "@/app/dashboard/_hooks/use-dashboard-servers-query";
import {useCurrentWorkspaceStore} from "@/app/dashboard/_hooks/use-current-worspace-store";

export type UseUpdateServerMutationParameters = {
  serverId: string;
  slug: string;
  config: {
    connection: Record<string, any>;
  };
};

export function useUpdateServerMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [workspaceId] = useCurrentWorkspaceStore();
  return useMutation({
    mutationFn: async ({ serverId, config }: UseUpdateServerMutationParameters) => {
      if (!workspaceId) {
        throw new Error("Workspace ID is not defined");
      }

      const client = createApiClient();
      const response = await client.api.servers["update-server"].$post({ json: { serverId, workspaceId, config } });
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
        title: "Server Updated",
        description: "Server has been updated successfully",
      });
    },
  })
}
