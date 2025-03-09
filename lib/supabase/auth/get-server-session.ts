import { createSsrClient } from "@/lib/supabase/clients/ssr";

export async function getServerSession() {
  const supabase = await createSsrClient();
  const { data } = await supabase.auth.getSession();
  return data.session;
}
