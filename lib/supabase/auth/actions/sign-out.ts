'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createSsrClient } from '@/lib/supabase/clients/ssr'

export async function signOut() {
  const supabase = await createSsrClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    // TODO: Add proper error handling
    redirect('/');
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
