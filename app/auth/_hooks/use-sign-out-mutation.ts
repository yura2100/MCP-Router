import {useMutation} from "@tanstack/react-query";
import {signOut} from "@/lib/supabase/auth/actions/sign-out";

export function useSignOutMutation() {
  return useMutation({
    mutationFn: async () => {
      await signOut();
    },
  });
}
