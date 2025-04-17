import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createApiClient} from "@/lib/api";
import {Server, USE_SERVER_QUERY_KEY} from "@/app/servers/[id]/_hooks/use-server-query";
import { useToast } from "@/components/ui/use-toast";
import {USE_DASHBOARD_SERVERS_QUERY_KEY} from "@/app/dashboard/_hooks/use-dashboard-servers-query";
import {useCurrentWorkspaceStore} from "@/app/dashboard/_hooks/use-current-worspace-store";

export type UseUpdateToolsMutationParameters = {
  slug: string;
  tools: {
    id: string;
    status: string;
    customName: string;
    customDescription: string;
  }[];
};

export function useUpdateToolsMutation() {
  const queryClient = useQueryClient();
  const {toast} = useToast();
  const [workspaceId] = useCurrentWorkspaceStore();
  return useMutation({
    mutationFn: async ({ slug, tools }: UseUpdateToolsMutationParameters) => {
      if (!workspaceId) {
        throw new Error("Workspace ID is not defined");
      }

      const server = queryClient.getQueryData<Server | null>([USE_SERVER_QUERY_KEY, workspaceId, slug]);
      if (server) {
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
        queryClient.setQueryData([USE_SERVER_QUERY_KEY, workspaceId, slug], newServer);
      }

      const client = createApiClient();
      const response = await client.api.tools["update-tools"].$post({ json: { workspaceId, tools } });
      const { error } = await response.json();
      if (error) throw new Error(error);
    },
    onSettled: (_data, _error, { slug }) => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: [USE_SERVER_QUERY_KEY, workspaceId, slug] }),
        queryClient.invalidateQueries({ queryKey: [USE_DASHBOARD_SERVERS_QUERY_KEY, workspaceId] }),
      ]);
    },
    onSuccess: () => {
      toast({
        title: "Tools Updated",
        description: "Tools have been updated successfully",
      });
    },
  })
}
