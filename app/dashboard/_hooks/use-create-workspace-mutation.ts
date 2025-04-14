import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createApiClient } from "@/lib/api";
import { USE_WORKSPACES_QUERY } from "@/app/dashboard/_hooks/use-workspaces-query";
import { useToast } from "@/components/ui/use-toast";

type UseCreateWorkspaceMutationParameters = {
  name: string;
};

export function useCreateWorkspaceMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ name }: UseCreateWorkspaceMutationParameters) => {
      const client = createApiClient();
      const response = await client.api.workspaces["create-workspace"].$post({ json: { name } });
      const result = await response.json();
      if (result.error !== null) throw new Error(result.error);
      return result.data;
    },
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: [USE_WORKSPACES_QUERY] });
    },
    onSuccess: () => {
      toast({
        title: "Workspace Created",
        description: "Workspace has been created successfully",
      });
    },
  });
}
