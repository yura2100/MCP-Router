'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createSsrClient } from '@/lib/supabase/clients/ssr'

export type Provider = "google";

const callbackUrl = new URL("/api/auth/callback", process.env.NEXT_PUBLIC_URL);

export async function signInOAuth(provider: Provider, next: string) {
  const supabase = await createSsrClient()
  const redirectTo = new URL(callbackUrl);
  redirectTo.searchParams.set('next', next);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: redirectTo.toString() },
  });
  if (error) {
    // TODO: Add proper error handling
    redirect('/');
  }

  revalidatePath(data.url, 'layout');
  redirect(data.url);
}
