import {createClient} from "@supabase/supabase-js";
import {Database} from "@/lib/supabase/database";

export function createServerClient() {
    return createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );
}
