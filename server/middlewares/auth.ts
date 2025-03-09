import {createMiddleware} from "hono/factory";
import {User} from "@supabase/supabase-js";
import {createSsrClient} from "@/lib/supabase/clients/ssr";

type Variables = { user: User };

export function auth() {
  return createMiddleware<{ Variables: Variables }>((async (ctx, next) => {
    const supabase = await createSsrClient();
    const { data } = await supabase.auth.getUser();
    if (!data.user) return ctx.json({ data: null, error: "Unauthorized" }, 401);
    ctx.set("user", data.user);
    return next();
  }));
}
