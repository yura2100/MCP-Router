import {useQuery} from "@tanstack/react-query";
import {createBrowserClient} from "@/lib/supabase/clients/browser";

const USE_CONNECTION_QUERY_KEY = "useConnectionQuery";

export function useConnectionQuery() {
  return useQuery({
    queryKey: [USE_CONNECTION_QUERY_KEY],
    queryFn: async () => {
      const supabase = createBrowserClient();
      const { data } = await supabase
        .from("user_settings")
        .select("secret")
        .single();
      if (!data) return null;
      return { secret: data.secret };
    },
    initialData: null,
  });
}
