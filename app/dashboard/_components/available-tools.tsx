import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {Wrench, ExternalLink, ArrowRight} from "lucide-react"
import { ServerStatusBadge } from "@/components/server-status-badge"
import { Switch } from "@/components/ui/switch"
import {DashboardServer} from "@/app/dashboard/_hooks/use-dashboard-servers-query";
import {useRestartServerMutation} from "@/app/servers/[id]/_hooks/use-restart-server-mutation";
import {usePauseServerMutation} from "@/app/servers/[id]/_hooks/use-pause-server-mutation";
import {useToggleToolMutation} from "@/app/servers/[id]/_hooks/use-toggle-tool-mutation";
import {cn} from "@/lib/utils";
import {ServerIcon} from "@/components/server-icon";

interface AvailableToolsProps {
  servers: DashboardServer[]
}

export function AvailableTools({ servers }: AvailableToolsProps) {
  const { mutate: restartServer, isPending: isRestartServerPending } = useRestartServerMutation();
  const { mutate: pauseServer, isPending: isPauseServerPending } = usePauseServerMutation();
  const { mutate: toggleTool, isPending: isToggleToolPending } = useToggleToolMutation();
  const isPending = isRestartServerPending || isPauseServerPending || isToggleToolPending;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Wrench className="h-5 w-5 text-orange-600" />
        <h2 className="text-2xl font-bold tracking-tight">Available Tools</h2>
      </div>
      <p className="text-muted-foreground">All tools from your servers</p>

      {servers.length > 0 ? (
        servers.map((server) => (
          <Card key={server.id} className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ServerIcon slug={server.slug} />
                  <div>
                    <CardTitle className="text-xl flex items-center">
                      {server.name}
                      <ServerStatusBadge state={server.status} className="ml-2" />
                    </CardTitle>
                    <CardDescription>{server.maintainer}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative hidden sm:flex size-2.5">
                    {server.status === "active" && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"/>)}
                    <span className={cn("relative inline-flex size-2.5 rounded-full", server.status === "active" ? "bg-green-500" : "bg-amber-500")} />
                  </div>
                  <span className="hidden sm:flex text-sm text-muted-foreground">{server.status === "paused" ? "Paused" : "Active"}</span>
                  <Switch
                    checked={server.status === "active"}
                    disabled={isPending}
                    onCheckedChange={() => server.status === "active" ? pauseServer({ serverId: server.id, slug: server.slug }) : restartServer({ serverId: server.id, slug: server.slug })}
                  />
                  <Button className="hidden sm:flex" variant="outline" size="sm" asChild>
                    <Link href={`/servers/${server.slug}`}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Server
                    </Link>
                  </Button>
                </div>
              </div>
              <Button className="sm:hidden" variant="outline" size="sm" asChild>
                <Link href={`/servers/${server.slug}`}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Server
                </Link>
              </Button>
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
                          checked={tool.status === "active"}
                          disabled={isPending}
                          onCheckedChange={() => toggleTool({ toolId: tool.id, slug: server.slug })}
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
                {server.status === "active" && (
                  <span className="ml-2">({server.tools.filter((t) => t.status === "active").length} enabled)</span>
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
                <h3 className="text-lg font-medium">No servers</h3>
                <p className="text-sm text-muted-foreground">Start a server to see available tools.</p>
              </div>
              <Button asChild>
                <Link href="/servers">
                  Browse Integrations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

