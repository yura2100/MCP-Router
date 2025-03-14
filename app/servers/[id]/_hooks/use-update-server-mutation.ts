import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createApiClient} from "@/lib/api";
import {USE_SERVER_QUERY_KEY} from "@/app/servers/[id]/_hooks/use-server-query";
import {USE_SERVERS_QUERY_KEY} from "@/app/servers/_hooks/use-servers-query";
import {useToast} from "@/components/ui/use-toast";
import {USE_DASHBOARD_SERVERS_QUERY_KEY} from "@/app/dashboard/_hooks/use-dashboard-servers-query";

export type UseUpdateServerMutationParameters = {
  serverId: string;
  config: {
    connection: Record<string, any>;
  };
};

export function useUpdateServerMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ serverId, config }: UseUpdateServerMutationParameters) => {
      const client = createApiClient();
      const response = await client.api.servers["update-server"].$post({ json: { serverId, config } });
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
        title: "Server Updated",
        description: "Server has been updated successfully",
      });
    },
  })
}
