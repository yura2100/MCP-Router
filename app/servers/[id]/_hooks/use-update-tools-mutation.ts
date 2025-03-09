import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createApiClient} from "@/lib/api";
import {Server, USE_SERVER_QUERY_KEY} from "@/app/servers/[id]/_hooks/use-server-query";
import { useToast } from "@/components/ui/use-toast";

export type UseUpdateToolsMutationParameters = {
  tools: {
    id: string;
    status: string;
    customName: string;
    customDescription: string;
  }[];
};

export function useUpdateToolsMutation(slug: string) {
  const queryClient = useQueryClient();
  const {toast} = useToast();
  return useMutation({
    mutationFn: async ({ tools }: UseUpdateToolsMutationParameters) => {
      const server = queryClient.getQueryData<Server | null>([USE_SERVER_QUERY_KEY, slug]);
      if (!server) return;
      const newServer = {
        ...server,
        tools: server.tools.map((tool) => {
          const newTool = tools.find(({ id }) => id === tool.id);
          if (!newTool) return tool;
          return {
            ...tool,
            status: newTool.status,
            customName: newTool.customName,
            customDescription: newTool.customDescription,
          };
        }),
      };
      queryClient.setQueryData([USE_SERVER_QUERY_KEY, slug], newServer);

      const client = createApiClient();
      const response = await client.api.tools["update-tools"].$post({ json: { tools } });
      const { error } = await response.json();
      if (error) throw new Error(error);
    },
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: [USE_SERVER_QUERY_KEY, slug] })
    },
    onSuccess: () => {
      toast({
        title: "Tools Updated",
        description: "Tools have been updated successfully",
      });
    },
  })
}
