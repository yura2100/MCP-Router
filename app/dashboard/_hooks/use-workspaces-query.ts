import { useQuery } from "@tanstack/react-query";
import { createBrowserClient } from "@/lib/supabase/clients/browser";
import {useCurrentWorkspaceStore} from "@/app/dashboard/_hooks/use-current-worspace-store";

export const USE_WORKSPACES_QUERY = "useWorkspacesQuery";

export function useWorkspacesQuery() {
  const [currentWorkspaceId, setCurrentWorkspaceId] = useCurrentWorkspaceStore();
  return useQuery({
    queryKey: [USE_WORKSPACES_QUERY],
    queryFn: async () => {
      const supabase = createBrowserClient();
      const result = await supabase
        .from("user_workspaces")
        .select("role, workspaces (id, name)");
      if (result.error) return [];
      const workspaces = result.data.map((workspace) => ({
        id: workspace.workspaces.id,
        name: workspace.workspaces.name,
        role: workspace.role,
      }));
      const isCurrentWorkspaceExists = workspaces.some((workspace) => workspace.id === currentWorkspaceId);
      if (!isCurrentWorkspaceExists) {
        setCurrentWorkspaceId(workspaces[0].id);
      }
      return workspaces;
    },
    initialData: [],
  });
}
