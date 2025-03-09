import {hc} from "hono/client";
import {AppType} from "@/server/app";

export function createApiClient() {
  return hc<AppType>(process.env.NEXT_PUBLIC_URL!);
}
