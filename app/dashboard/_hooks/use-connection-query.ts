import {useQuery} from "@tanstack/react-query";
import {createBrowserClient} from "@/lib/supabase/clients/browser";
import {useCurrentWorkspaceStore} from "@/app/dashboard/_hooks/use-current-worspace-store";

const USE_CONNECTION_QUERY_KEY = "useConnectionQuery";

export function useConnectionQuery() {
  const [workspaceId] = useCurrentWorkspaceStore();
  return useQuery({
    queryKey: [USE_CONNECTION_QUERY_KEY, workspaceId],
    queryFn: async () => {
      const supabase = createBrowserClient();
      if (!workspaceId) return null;
      const { data } = await supabase
        .from("user_workspaces")
        .select("id")
        .eq("workspace_id", workspaceId)
        .single();
      if (!data) return null;
      return { secret: data.id };
    },
    initialData: null,
  });
}
