import {Hono} from "hono";
import {auth} from "@/server/middlewares/auth";
import {z} from "zod";
import {sValidator} from "@hono/standard-validator";
import {createServerClient} from "@/lib/supabase/clients/server";
import {JSONSchemaToZod} from "@dmitryrechkin/json-schema-to-zod";

export const serversRouter = new Hono()
  .post("/start-server", auth(), sValidator("json", z.object({ serverId: z.string().uuid(), workspaceId: z.string().uuid() })), async (ctx) => {
    const userId = ctx.var.user.id;
    const { serverId, workspaceId } = ctx.req.valid("json");
    const supabase = createServerClient();
    const [selectServerResult, selectUserWorkspaceResult] = await Promise.all([
      supabase
        .from("servers")
        .select("slug, config, tools (id)")
        .eq("id", serverId)
        .single(),
      supabase
        .from("user_workspaces")
        .select("id, role")
        .eq("user_id", userId)
        .eq("workspace_id", workspaceId)
        .single(),
    ]);
    if (selectServerResult.error || selectUserWorkspaceResult.error) {
      return ctx.json({ data: null, error: "Failed to start star" }, 500);
    }
    const server = selectServerResult.data;
    const userWorkspace = selectUserWorkspaceResult.data;

    if (userWorkspace.role !== "owner") {
      return ctx.json({ data: null, error: "Failed to start star" }, 500);
    }

    const schema = JSONSchemaToZod.convert((server.config as any).connection.schema);
    const { success: isConfigured } = await schema.safeParseAsync({});

    const token = btoa(`${process.env.DEPLOYER_USERNAME}:${process.env.DEPLOYER_PASSWORD}`);
    const createResponse = await fetch(`${process.env.DEPLOYER_URL}/create`, {
      method: "POST",
      headers: { "Authorization": `Basic ${token}` },
      body: JSON.stringify({ slug: server.slug, workspaceId }),
    });
    if (!createResponse.ok) {
      return ctx.json({ data: null, error: "Failed to start server" }, 500);
    }

    const insertWorkspaceServerResult = await supabase
      .from("workspace_servers")
      .insert({
        workspace_id: userId,
        server_id: serverId,
        status: isConfigured ? "active" : "misconfigured",
      });
    if (insertWorkspaceServerResult.error) {
      return ctx.json({ data: null, error: "Failed to start server" }, 500);
    }
    const tools = server.tools.map((tool) => ({
      user_workspace_id: userWorkspace.id,
      tool_id: tool.id,
      status: "active",
    }));
    const insertUserWorkspaceToolsResult = await supabase
      .from("user_workspace_tools")
      .insert(tools);
    if (insertUserWorkspaceToolsResult.error) {
      return ctx.json({ data: null, error: "Failed to start server" }, 500);
    }
    const incrementResult = await supabase.rpc("increment", {
      table_name: "servers",
      field_name: "downloads",
      row_id: serverId,
      x: 1,
    });
    if (incrementResult.error) {
      return ctx.json({ data: null, error: "Failed to start server" }, 500);
    }
    return ctx.json({ data: null, error: null }, 201);
  })
  .post("/restart-server", auth(), sValidator("json", z.object({ serverId: z.string().uuid(), workspaceId: z.string().uuid() })), async (ctx) => {
    const userId = ctx.var.user.id;
    const { serverId, workspaceId } = ctx.req.valid("json");
    const supabase = createServerClient();
    const selectUserWorkspaceResult = await supabase
      .from("user_workspaces")
      .select("id, role")
      .eq("user_id", userId)
      .eq("workspace_id", workspaceId)
      .single();
    if (selectUserWorkspaceResult.error) {
      return ctx.json({ data: null, error: "Failed to restart server" }, 500);
    }
    if (selectUserWorkspaceResult.data.role !== "owner") {
      return ctx.json({ data: null, error: "Failed to restart server" }, 500);
    }
    const result = await supabase
      .from("workspace_servers")
      .update({ status: "active" })
      .eq("workspace_id", workspaceId)
      .eq("server_id", serverId);
    if (result.error) {
      return ctx.json({ data: null, error: "Failed to restart server" }, 500);
    }
    return ctx.json({ data: null, error: null }, 201);
  })
  .post("/pause-server", auth(), sValidator("json", z.object({ serverId: z.string().uuid(), workspaceId: z.string().uuid() })), async (ctx) => {
    const userId = ctx.var.user.id;
    const { serverId, workspaceId } = ctx.req.valid("json");
    const supabase = createServerClient();
    const selectUserWorkspaceResult = await supabase
      .from("user_workspaces")
      .select("id, role")
      .eq("user_id", userId)
      .eq("workspace_id", workspaceId)
      .single();
    if (selectUserWorkspaceResult.error) {
      return ctx.json({ data: null, error: "Failed to pause server" }, 500);
    }
    if (selectUserWorkspaceResult.data.role !== "owner") {
      return ctx.json({ data: null, error: "Failed to pause server" }, 500);
    }
    const result = await supabase
      .from("workspace_servers")
      .update({ status: "paused" })
      .eq("workspace_id", workspaceId)
      .eq("server_id", serverId);
    if (result.error) {
      return ctx.json({ data: null, error: "Failed to pause server" }, 500);
    }
    return ctx.json({ data: null, error: null }, 201);
  })
  .post("/stop-server", auth(), sValidator("json", z.object({ serverId: z.string().uuid(), workspaceId: z.string().uuid() })), async (ctx) => {
    const userId = ctx.var.user.id;
    const { serverId, workspaceId } = ctx.req.valid("json");
    const supabase = createServerClient();
    const selectUserWorkspaceResult = await supabase
      .from("user_workspaces")
      .select("id, role")
      .eq("user_id", userId)
      .eq("workspace_id", workspaceId)
      .single();
    if (selectUserWorkspaceResult.error) {
      return ctx.json({ data: null, error: "Failed to stop server" }, 500);
    }
    if (selectUserWorkspaceResult.data.role !== "owner") {
      return ctx.json({ data: null, error: "Failed to stop server" }, 500);
    }
    const selectResult = await supabase
      .from("workspace_servers")
      .select(`
        servers!inner (
          slug,
          tools (id)
        ),
        workspaces!inner (
          user_workspaces!inner (id)
        )
      `)
      .eq("workspace_id", workspaceId)
      .eq("server_id", serverId)
      .single();
    if (selectResult.error) {
      return ctx.json({ data: null, error: "Failed to stop server" }, 500);
    }
    const workspaceServer = selectResult.data;

    const token = btoa(`${process.env.DEPLOYER_USERNAME}:${process.env.DEPLOYER_PASSWORD}`);
    const deleteResponse = await fetch(`${process.env.DEPLOYER_URL}/delete`, {
      method: "POST",
      headers: { "Authorization": `Basic ${token}` },
      body: JSON.stringify({ slug: workspaceServer.servers.slug, workspaceId }),
    });
    if (!deleteResponse.ok) {
      return ctx.json({ data: null, error: "Failed to stop server" }, 500);
    }

    const deleteUserWorkspaceToolPromises = workspaceServer.servers.tools
      .map((tool) => {
        return workspaceServer.workspaces.user_workspaces.map(({ id }) => {
          return supabase
            .from("user_workspace_tools")
            .delete()
            .eq("tool_id", tool.id)
            .eq("user_workspace_id", id);
        })
      })
      .flat();
    await Promise.all(deleteUserWorkspaceToolPromises);
    const deleteWorkspaceServerResult = await supabase
      .from("workspace_servers")
      .delete()
      .eq("server_id", serverId)
      .eq("workspace_id", workspaceId);
    if (deleteWorkspaceServerResult.error) {
      return ctx.json({ data: null, error: "Failed to stop server" }, 500);
    }
    const decrementDownloadsResult = await supabase.rpc("decrement", {
      table_name: "servers",
      field_name: "downloads",
      row_id: serverId,
      x: 1,
    });
    if (decrementDownloadsResult.error) {
      return ctx.json({ data: null, error: "Failed to stop server" }, 500);
    }
    return ctx.json({ data: null, error: null }, 201);
  })
  .post("/update-server", auth(), sValidator("json", z.object({ serverId: z.string().uuid(), workspaceId: z.string().uuid(), config: z.object({ connection: z.object({}).passthrough() }) })), async (ctx) => {
    const userId = ctx.var.user.id;
    const { serverId, workspaceId, config } = ctx.req.valid("json");
    const supabase = createServerClient();
    const selectUserWorkspaceResult = await supabase
      .from("user_workspaces")
      .select("id, role")
      .eq("user_id", userId)
      .eq("workspace_id", workspaceId)
      .single();
    if (selectUserWorkspaceResult.error) {
      return ctx.json({ data: null, error: "Failed to update server" }, 500);
    }
    if (selectUserWorkspaceResult.data.role !== "owner") {
      return ctx.json({ data: null, error: "Failed to update server" }, 500);
    }
    const selectResult = await supabase
      .from("workspace_servers")
      .select("servers!inner (slug, config)")
      .eq("server_id", serverId)
      .eq("workspace_id", workspaceId)
      .single();
    if (selectResult.error) {
      return ctx.json({ data: null, error: "Failed to update server" }, 500);
    }
    const workspaceServer = selectResult.data;

    const schema = JSONSchemaToZod.convert((workspaceServer.servers.config as any).connection.schema);
    const { success: isConfigured } = await schema.safeParseAsync(config.connection);

    const token = btoa(`${process.env.DEPLOYER_USERNAME}:${process.env.DEPLOYER_PASSWORD}`);
    const updateSecretsResponse = await fetch(`${process.env.DEPLOYER_URL}/update-secrets`, {
      method: "POST",
      headers: { "Authorization": `Basic ${token}` },
      body: JSON.stringify({ slug: workspaceServer.servers.slug, workspaceId }),
    });
    if (!updateSecretsResponse.ok) {
      return ctx.json({ data: null, error: "Failed to update server" }, 500);
    }

    const updateResult = await supabase
      .from("workspace_servers")
      .update({
        config,
        status: isConfigured ? "active" : "misconfigured",
      })
      .eq("server_id", serverId)
      .eq("workspace_id", workspaceId);
    if (updateResult.error) {
      return ctx.json({ data: null, error: "Failed to update server" }, 500);
    }
    return ctx.json({ data: null, error: null }, 201);
  })
  .post("/toggle-star", auth(), sValidator("json", z.object({ serverId: z.string().uuid() })), async (ctx) => {
    const userId = ctx.var.user.id;
    const { serverId } = ctx.req.valid("json");
    const supabase = createServerClient();
    const selectResult = await supabase
      .from("user_servers")
      .select("is_starred")
      .eq("user_id", userId)
      .eq("server_id", serverId);
    if (selectResult.error) {
      return ctx.json({ data: null, error: "Failed to toggle star" }, 500);
    }
    const [userServer] = selectResult.data;
    if (!userServer) {
      return ctx.json({ data: null, error: "Failed to toggle star" }, 500);
    }
    const updateUserServersResult = await supabase
      .from("user_servers")
      .update({ is_starred: !userServer.is_starred })
      .eq("user_id", userId)
      .eq("server_id", serverId);
    if (updateUserServersResult.error) {
      return ctx.json({ data: null, error: "Failed to toggle star" }, 500);
    }
    const operation = userServer.is_starred ? "decrement" : "increment";
    const updateServersResult = await supabase.rpc(operation, {
      table_name: "servers",
      field_name: "stars",
      row_id: serverId,
      x: 1,
    });
    if (updateServersResult.error) {
      return ctx.json({ data: null, error: "Failed to toggle star" }, 500);
    }
    return ctx.json({ data: null, error: null }, 201);
  });
