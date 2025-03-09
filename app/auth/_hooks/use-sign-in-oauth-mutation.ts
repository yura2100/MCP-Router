import { useMutation } from "@tanstack/react-query";
import { Provider, signInOAuth } from "@/lib/supabase/auth/actions/sign-in-oauth";

export type UseSignInOauthMutationParameters = {
  provider: Provider
};

export function useSignInOauthMutation() {
  return useMutation({
    mutationFn: async ({ provider }: UseSignInOauthMutationParameters) => {
      await signInOAuth(provider)
    },
  });
}
