'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createSsrClient } from '@/lib/supabase/clients/ssr'

export type Provider = "google";

const redirectTo = new URL("/api/auth/callback", process.env.NEXT_PUBLIC_URL).href;

export async function signInOAuth(provider: Provider) {
  const supabase = await createSsrClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider, options: { redirectTo },
  });
  if (error) {
    // TODO: Add proper error handling
    redirect('/');
  }

  revalidatePath(data.url, 'layout');
  redirect(data.url);
}
