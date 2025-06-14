import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createApiClient} from "@/lib/api";
import {Server, USE_SERVER_QUERY_KEY} from "@/app/servers/[id]/_hooks/use-server-query";
import { useToast } from "@/components/ui/use-toast";
import {DashboardServer, USE_DASHBOARD_SERVERS_QUERY_KEY} from "@/app/dashboard/_hooks/use-dashboard-servers-query";
import {useCurrentWorkspaceStore} from "@/app/dashboard/_hooks/use-current-worspace-store";

export type UseToggleToolMutationParameters = {
  toolId: string;
  slug: string;
};

export function useToggleToolMutation() {
  const queryClient = useQueryClient();
  const {toast} = useToast();
  const [workspaceId] = useCurrentWorkspaceStore();
  return useMutation({
    mutationFn: async ({ toolId, slug }: UseToggleToolMutationParameters) => {
      if (!workspaceId) {
        throw new Error("Workspace ID is not defined");
      }

      const server = queryClient.getQueryData<Server | null>([USE_SERVER_QUERY_KEY, workspaceId, slug]);
      if (server) {
        const newServer = {
          ...server,
          tools: server.tools.map((tool) => {
            if (tool.id !== toolId) return tool;
            return {
              ...tool,
              status: tool.status === "active" ? "disabled" : "active",
            };
          }),
        };
        queryClient.setQueryData([USE_SERVER_QUERY_KEY, workspaceId, slug], newServer);
      }

      const dashboardServers = queryClient.getQueryData<DashboardServer[]>([USE_DASHBOARD_SERVERS_QUERY_KEY, workspaceId]);
      if (dashboardServers) {
        const newDashboardServers = dashboardServers.map((server) => {
          const tool = server.tools.find(({ id }) => id === toolId);
          if (!tool) return server;
          return {
            ...server,
            tools: server.tools.map((tool) => {
              if (tool.id !== toolId) return tool;
              return {
                ...tool,
                status: tool.status === "active" ? "disabled" : "active",
              };
            }),
          };
        });
        queryClient.setQueryData([USE_DASHBOARD_SERVERS_QUERY_KEY, workspaceId], newDashboardServers);
      }

      const client = createApiClient();
      const response = await client.api.tools["toggle-tool"].$post({ json: { toolId, workspaceId } });
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
