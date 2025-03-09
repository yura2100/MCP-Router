import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createApiClient} from "@/lib/api";
import {Server, USE_SERVER_QUERY_KEY} from "@/app/servers/[id]/_hooks/use-server-query";
import {USE_SERVERS_QUERY_KEY} from "@/app/servers/_hooks/use-servers-query";
import {useToast} from "@/components/ui/use-toast";

export type UseStartServerMutationParameters = {
  serverId: string;
};

export function useStartServerMutation(slug: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast()
  return useMutation({
    mutationFn: async ({ serverId }: UseStartServerMutationParameters) => {
      const server = queryClient.getQueryData<Server | null>([USE_SERVER_QUERY_KEY, slug]);
      if (!server) return;
      const newServer = { ...server, status: "active" };
      queryClient.setQueryData([USE_SERVER_QUERY_KEY, slug], newServer);

      const client = createApiClient();
      const response = await client.api.servers["start-server"].$post({ json: { serverId } });
      const { error } = await response.json();
      if (error) throw new Error(error);
    },
    onSettled: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: [USE_SERVER_QUERY_KEY, slug] }),
        queryClient.invalidateQueries({ queryKey: [USE_SERVERS_QUERY_KEY] }),
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
