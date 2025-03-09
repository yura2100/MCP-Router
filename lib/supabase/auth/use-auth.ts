import {useEffect, useState} from "react";
import {createBrowserClient} from "@/lib/supabase/clients/browser";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const supabase = createBrowserClient();
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      const isAuthenticatedNow = session !== null;
      if (isAuthenticated !== isAuthenticatedNow) {
        setIsAuthenticated(isAuthenticatedNow);
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return { isAuthenticated };
}
