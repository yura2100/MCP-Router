import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Wrench, ExternalLink } from "lucide-react"
import { ServerStatusBadge } from "@/components/server-status-badge"
import { Switch } from "@/components/ui/switch"
import type { ServerConfig } from "@/lib/server-config"

interface AvailableToolsProps {
  servers: ServerConfig[]
  toggleServerState: (serverId: string, newState: "active" | "paused") => void
}

export function AvailableTools({ servers, toggleServerState }: AvailableToolsProps) {
  const activeOrPausedServers = servers.filter((server) => server.state === "active" || server.state === "paused")

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Wrench className="h-5 w-5 text-orange-600" />
        <h2 className="text-2xl font-bold tracking-tight">Available Tools</h2>
      </div>
      <p className="text-muted-foreground">All tools from your active and paused servers</p>

      {activeOrPausedServers.length > 0 ? (
        activeOrPausedServers.map((server) => (
          <Card key={server.id} className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {server.icon}
                  <div>
                    <CardTitle className="text-xl flex items-center">
                      {server.name}
                      <ServerStatusBadge state={server.state} className="ml-2" />
                    </CardTitle>
                    <CardDescription>{server.category}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Switch
                    checked={server.state === "active"}
                    onCheckedChange={(checked) => toggleServerState(server.id, checked ? "active" : "paused")}
                  />
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/servers/${server.id}`}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Server
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-2">
                {server.tools.map((tool) => (
                  <Card key={tool.id} className="overflow-hidden border-muted">
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{tool.customName || tool.name}</CardTitle>
                        <Switch
                          id={`tool-${server.id}-${tool.id}`}
                          checked={tool.enabled}
                          disabled={server.state !== "active"}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {tool.customDescription || tool.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {server.tools.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">No tools available for this server</div>
              )}
            </CardContent>
            <CardFooter className="border-t bg-muted/30 px-6 py-3">
              <div className="flex items-center text-xs text-muted-foreground">
                <Wrench className="h-3.5 w-3.5 mr-1.5" />
                <span>{server.tools.length} tools available</span>
                {server.state === "active" && (
                  <span className="ml-2">({server.tools.filter((t) => t.enabled).length} enabled)</span>
                )}
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <Card className="border-dashed border-muted-foreground/50">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center text-center space-y-3 py-6">
              <Wrench className="h-8 w-8 text-muted-foreground" />
              <div className="space-y-1">
                <h3 className="text-lg font-medium">No active or paused servers</h3>
                <p className="text-sm text-muted-foreground">Start or resume a server to see available tools.</p>
              </div>
              <Button asChild>
                <Link href="/servers">Browse Servers</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

