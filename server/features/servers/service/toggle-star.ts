import type { ToggleStarInput } from "@/server/features/servers/schemas";
import { createServerClient } from "@/lib/supabase/clients/server";

export async function toggleStar({ serverId }: ToggleStarInput, userId: string) {
  const supabase = createServerClient();

  const { data: isStared } = await supabase
    .from("user_server_stars")
    .select("id")
    .eq("server_id", serverId)
    .eq("user_id", userId)
    .maybeSingle()
    .throwOnError();

  if (isStared) {
    return unstar(serverId, userId);
  }

  return star(serverId, userId);
}

async function star(serverId: string, userId: string) {
  const supabase = createServerClient();

  await supabase
    .from("user_server_stars")
    .insert({ server_id: serverId, user_id: userId })
    .throwOnError();

  await supabase
    .rpc("increment", {
      table_name: "servers",
      field_name: "stars",
      row_id: serverId,
      x: 1,
    })
    .throwOnError();
}

async function unstar(serverId: string, userId: string) {
  const supabase = createServerClient();

  await supabase
    .from("user_server_stars")
    .delete()
    .eq("server_id", serverId)
    .eq("user_id", userId)
    .throwOnError();

  await supabase
    .rpc("decrement", {
      table_name: "servers",
      field_name: "stars",
      row_id: serverId,
      x: 1,
    })
    .throwOnError();
}
