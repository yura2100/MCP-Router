"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Trash2, Shield, Users, DatabaseIcon, Power, Play } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { mcpServers, type ServerConfig, type ServerState } from "@/lib/server-config"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ServerSettings() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const serverId = params.id as string

  // Get server data or redirect if not found
  const initialServerData = mcpServers[serverId as keyof typeof mcpServers]
  const [server, setServer] = useState<ServerConfig>(initialServerData)
  const [isConfigured, setIsConfigured] = useState(false)

  if (
    !initialServerData ||
    (initialServerData.state !== "active" && initialServerData.state !== "needs_configuration")
  ) {
    return null
  }

  const checkConfiguration = (serverData: ServerConfig) => {
    if (!serverData.requiredConfigFields || serverData.requiredConfigFields.length === 0) {
      setIsConfigured(true)
      return
    }

    // Check if all required fields have values
    let configured = true
    for (const field of serverData.requiredConfigFields) {
      const value = serverData[field]

      if (value === undefined || value === null || value === "") {
        configured = false
        break
      }

      // Check if arrays have at least one item
      if (Array.isArray(value) && value.length === 0) {
        configured = false
        break
      }
    }

    setIsConfigured(configured)
  }

  const handleSave = () => {
    // Check configuration status
    checkConfiguration(server)

    // Update server state if it's now configured and was in needs_configuration state
    if (isConfigured && server.state === "needs_configuration") {
      const updatedServer = {
        ...server,
        state: "active" as ServerState,
        enabled: true,
        isConfigured: true,
      }
      setServer(updatedServer)

      toast({
        title: "Server Activated",
        description: `${server.name} MCP server has been configured and activated.`,
      })
    } else {
      toast({
        title: "Settings saved",
        description: `${server.name} MCP server settings have been updated.`,
      })
    }
  }

  const activateServer = () => {
    if (!isConfigured) {
      toast({
        title: "Configuration Required",
        description: "Please complete all required configuration fields before activating.",
        variant: "destructive",
      })
      return
    }

    const updatedServer = {
      ...server,
      state: "active" as ServerState,
      enabled: true,
      isConfigured: true,
    }
    setServer(updatedServer)

    toast({
      title: "Server Activated",
      description: `${server.name} MCP server has been activated and is now running.`,
    })

    // Navigate back to the server info page
    router.push(`/servers/${serverId}`)
  }

  const stopServer = () => {
    // Update server state to not-started
    const updatedServer = {
      ...server,
      state: "not-started" as ServerState,
      enabled: false, // Keep enabled in sync with state for backward compatibility
    }

    // Update the server in the state
    setServer(updatedServer)

    toast({
      title: "Server Stopped",
      description: `${server.name} MCP server has been stopped.`,
    })

    // Navigate back to the server info page
    router.push(`/servers/${serverId}`)
  }

  const renderConnectionSettings = () => {
    switch (serverId) {
      case "postgres":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="connectionString">
                Connection String <span className="text-red-500">*</span>
              </Label>
              <Input
                id="connectionString"
                value={server.connectionString}
                onChange={(e) => {
                  const updatedServer = { ...server, connectionString: e.target.value }
                  setServer(updatedServer)
                  checkConfiguration(updatedServer)
                }}
                className={!server.connectionString ? "border-red-300 dark:border-red-700" : ""}
              />
              {!server.connectionString && <p className="text-xs text-red-500">This field is required</p>}
              <p className="text-xs text-muted-foreground">
                The PostgreSQL connection string to connect to your database
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="schema">
                Schema <span className="text-red-500">*</span>
              </Label>
              <Input
                id="schema"
                value={server.schema}
                onChange={(e) => {
                  const updatedServer = { ...server, schema: e.target.value }
                  setServer(updatedServer)
                  checkConfiguration(updatedServer)
                }}
                className={!server.schema ? "border-red-300 dark:border-red-700" : ""}
              />
              {!server.schema && <p className="text-xs text-red-500">This field is required</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="allowedTables">
                Allowed Tables <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="allowedTables"
                value={server.allowedTables.join("\n")}
                onChange={(e) => {
                  const tables = e.target.value.split("\n").filter((table) => table.trim() !== "")
                  const updatedServer = { ...server, allowedTables: tables }
                  setServer(updatedServer)
                  checkConfiguration(updatedServer)
                }}
                placeholder="One table per line"
                className={server.allowedTables.length === 0 ? "border-red-300 dark:border-red-700" : ""}
              />
              {server.allowedTables.length === 0 && (
                <p className="text-xs text-red-500">At least one table is required</p>
              )}
              <p className="text-xs text-muted-foreground">
                List of tables that can be accessed through this MCP server
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxQueryTime">Max Query Time (ms)</Label>
              <Input
                id="maxQueryTime"
                type="number"
                value={server.maxQueryTime}
                onChange={(e) => setServer({ ...server, maxQueryTime: Number.parseInt(e.target.value) })}
              />
            </div>
          </div>
        )
      case "github":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">
                GitHub API Key <span className="text-red-500">*</span>
              </Label>
              <Input
                id="apiKey"
                type="password"
                value={server.apiKey}
                onChange={(e) => {
                  const updatedServer = { ...server, apiKey: e.target.value }
                  setServer(updatedServer)
                  checkConfiguration(updatedServer)
                }}
                className={!server.apiKey ? "border-red-300 dark:border-red-700" : ""}
              />
              {!server.apiKey && <p className="text-xs text-red-500">This field is required</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="repositories">
                Repositories <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="repositories"
                value={server.repositories.join("\n")}
                onChange={(e) => {
                  const repos = e.target.value.split("\n").filter((repo) => repo.trim() !== "")
                  const updatedServer = { ...server, repositories: repos }
                  setServer(updatedServer)
                  checkConfiguration(updatedServer)
                }}
                placeholder="owner/repo (one per line)"
                className={server.repositories.length === 0 ? "border-red-300 dark:border-red-700" : ""}
              />
              {server.repositories.length === 0 && (
                <p className="text-xs text-red-500">At least one repository is required</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Permissions</Label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="read-permission"
                    checked={server.permissions.includes("read")}
                    onCheckedChange={(checked) => {
                      const newPermissions = checked
                        ? [...server.permissions, "read"]
                        : server.permissions.filter((p) => p !== "read")
                      setServer({ ...server, permissions: newPermissions })
                    }}
                  />
                  <Label htmlFor="read-permission">Read</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="write-permission"
                    checked={server.permissions.includes("write")}
                    onCheckedChange={(checked) => {
                      const newPermissions = checked
                        ? [...server.permissions, "write"]
                        : server.permissions.filter((p) => p !== "write")
                      setServer({ ...server, permissions: newPermissions })
                    }}
                  />
                  <Label htmlFor="write-permission">Write</Label>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">
                API Key <span className="text-red-500">*</span>
              </Label>
              <Input
                id="apiKey"
                type="password"
                value={server.apiKey || ""}
                onChange={(e) => {
                  const updatedServer = { ...server, apiKey: e.target.value }
                  setServer(updatedServer)
                  checkConfiguration(updatedServer)
                }}
                className={!server.apiKey ? "border-red-300 dark:border-red-700" : ""}
              />
              {!server.apiKey && <p className="text-xs text-red-500">This field is required</p>}
            </div>
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">
                Additional configuration options for this MCP server will be displayed here.
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Server Settings</CardTitle>
          <div className="flex space-x-2">
            {server.state === "needs_configuration" && isConfigured && (
              <Button variant="default" size="sm" onClick={activateServer} className="flex items-center">
                <Play className="h-4 w-4 mr-2" />
                Activate Server
              </Button>
            )}
            <Button variant="destructive" size="sm" onClick={stopServer} className="flex items-center">
              <Power className="h-4 w-4 mr-2" />
              Stop Server
            </Button>
          </div>
        </div>
        <CardDescription>Configure settings for your {server.name} MCP server</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {server.state === "needs_configuration" && (
          <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <AlertDescription className="text-blue-700 dark:text-blue-300">
                This server needs to be configured before it can be activated. Required fields are marked with{" "}
                <span className="text-red-500">*</span>
              </AlertDescription>
            </div>
          </Alert>
        )}

        {/* Connection Settings */}
        <div>
          <div className="flex items-center mb-4">
            <DatabaseIcon className="h-5 w-5 mr-2 text-primary" />
            <h3 className="text-lg font-medium">Connection Settings</h3>
          </div>
          {renderConnectionSettings()}
        </div>

        <Separator />

        {/* Security Settings */}
        <div>
          <div className="flex items-center mb-4">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            <h3 className="text-lg font-medium">Security Settings</h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="security-level">Security Level</Label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="security-low"
                    name="security-level"
                    checked={server.securityLevel === "low"}
                    onChange={() => setServer({ ...server, securityLevel: "low" })}
                  />
                  <Label htmlFor="security-low">Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="security-medium"
                    name="security-level"
                    checked={server.securityLevel === "medium"}
                    onChange={() => setServer({ ...server, securityLevel: "medium" })}
                  />
                  <Label htmlFor="security-medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="security-high"
                    name="security-level"
                    checked={server.securityLevel === "high"}
                    onChange={() => setServer({ ...server, securityLevel: "high" })}
                  />
                  <Label htmlFor="security-high">High</Label>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Sets the security restrictions for this server</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="logging-enabled">Enable Logging</Label>
                <Switch
                  id="logging-enabled"
                  checked={server.loggingEnabled}
                  onCheckedChange={(checked) => setServer({ ...server, loggingEnabled: checked })}
                />
              </div>
              <p className="text-xs text-muted-foreground">When enabled, all requests to this server will be logged</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate-limit">Rate Limit (requests per minute)</Label>
              <Input id="rate-limit" type="number" defaultValue="60" />
              <p className="text-xs text-muted-foreground">
                Limit the number of requests that can be made to this server
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Access Control Settings */}
        <div>
          <div className="flex items-center mb-4">
            <Users className="h-5 w-5 mr-2 text-primary" />
            <h3 className="text-lg font-medium">Access Control</h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="allowed-users">Allowed Users</Label>
              <Textarea
                id="allowed-users"
                value={server.allowedUsers.join("\n")}
                onChange={(e) => setServer({ ...server, allowedUsers: e.target.value.split("\n").filter(Boolean) })}
                placeholder="Enter email addresses (one per line)"
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                List of users who can access this server. Leave empty to allow all users.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">AI Tool Access</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="cursor-access" defaultChecked />
                  <Label htmlFor="cursor-access">Cursor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="claude-access" defaultChecked />
                  <Label htmlFor="claude-access">Claude Desktop</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="cline-access" defaultChecked />
                  <Label htmlFor="cline-access">Cline (VS Code)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="windsurf-access" />
                  <Label htmlFor="windsurf-access">Windsurf (Codium)</Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Server
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  )
}
