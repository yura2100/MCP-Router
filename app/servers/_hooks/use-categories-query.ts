import {useQuery} from "@tanstack/react-query";
import {createBrowserClient} from "@/lib/supabase/clients/browser";

export const USE_CATEGORIES_QUERY_KEY = "useCategoriesQuery"

export function useCategoriesQuery() {
  return useQuery({
    queryKey: [USE_CATEGORIES_QUERY_KEY],
    queryFn: async () => {
      const supabase = createBrowserClient();
      const { data } = await supabase
        .from("categories")
        .select(`id, name`);
      if (!data) return [];
      return data;
    },
    initialData: [],
  });
}
