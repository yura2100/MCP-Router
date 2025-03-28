import { useMutation } from "@tanstack/react-query";
import { Provider, signInOAuth } from "@/lib/supabase/auth/actions/sign-in-oauth";

export type UseSignInOauthMutationParameters = {
  provider: Provider;
  next: string;
};

export function useSignInOauthMutation() {
  return useMutation({
    mutationFn: async ({ provider, next }: UseSignInOauthMutationParameters) => {
      await signInOAuth(provider, next)
    },
  });
}
