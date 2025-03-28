"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Power, Download, Star, FileText, Wrench, Tag, Play, Pause, Settings } from "lucide-react"
import { Server } from "@/app/servers/[id]/_hooks/use-server-query";
import {useStartServerMutation} from "@/app/servers/[id]/_hooks/use-start-server-mutation";
import {useAuth} from "@/lib/supabase/auth/use-auth";
import {usePauseServerMutation} from "@/app/servers/[id]/_hooks/use-pause-server-mutation";
import {useRestartServerMutation} from "@/app/servers/[id]/_hooks/use-restart-server-mutation";
import {useToggleStarMutation} from "@/app/servers/[id]/_hooks/use-toggle-star-mutation";
import {useToggleToolMutation} from "@/app/servers/[id]/_hooks/use-toggle-tool-mutation";
import {ServerInlineStatus} from "@/components/server-inline-status";
import Link from "next/link";

type ServerOverviewProps = {
  server: Server;
  setTab: (tab: string) => void;
};

export function ServerOverview({ server, setTab }: ServerOverviewProps) {
  const { isAuthenticated } = useAuth();
  const { mutate: startServer, isPending: isStartServerPending } = useStartServerMutation();
  const { mutate: restartServer, isPending: isRestartServerPending } = useRestartServerMutation();
  const { mutate: pauseServer, isPending: isPauseServerPending } = usePauseServerMutation();
  const { mutate: toggleStar, isPending: isToggleStarPending } = useToggleStarMutation();
  const { mutate: toggleTool, isPending: isToggleToolPending } = useToggleToolMutation();
  const isPending = isStartServerPending || isRestartServerPending || isPauseServerPending || isToggleToolPending;

  const renderStatusControl = () => {
    if (!isAuthenticated) {
      return (
        <Button variant="default" size="sm" className="flex items-center" asChild>
          <Link href={`/auth?next=/servers/${server.slug}`}>
            <Play className="h-4 w-4 mr-2" />
            Start Server
          </Link>
        </Button>
      );
    }

    if (server.status === "not-started") {
      return (
        <Button variant="default" size="sm" onClick={() => startServer({ serverId: server.id, slug: server.slug })} className="flex items-center" disabled={isPending}>
          <Play className="h-4 w-4 mr-2" />
          Start Server
        </Button>
      )
    } else if (server.status === "misconfigured") {
      return (
        <div className="flex items-center space-x-3">
          <ServerInlineStatus status="misconfigured" />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTab("settings")}
            className="flex items-center"
            disabled={isPending}
          >
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      )
    } else {
      return (
        <div className="flex items-center space-x-3">
          <ServerInlineStatus status={server.status} />
          <Switch
            checked={server.status === "active"}
            onCheckedChange={() => server.status === "active" ? pauseServer({
              serverId: server.id,
              slug: server.slug
            }) : restartServer({serverId: server.id, slug: server.slug})}
            disabled={isPending}
          />
        </div>
      )
    }
  }

  // Replace the getStatusActionButton function with this version that includes colored indicators
  const getStatusActionButton = () => {
    if (!isAuthenticated) {
      return (
        <Button variant="default" size="sm" className="w-full" asChild>
          <Link href={`/auth?next=/servers/${server.slug}`}>
            <Play className="h-4 w-4 mr-2" />
            Start Server
          </Link>
        </Button>
      );
    }

    switch (server.status) {
      case "not-started":
        return (
          <Button onClick={() => startServer({serverId: server.id, slug: server.slug})} className="w-full" disabled={isPending}>
            <Play className="h-4 w-4 mr-2" />
            Start Server
          </Button>
        )
      case "misconfigured":
        return (
          <Button variant="outline" onClick={() => setTab("settings")} className="w-full" disabled={isPending}>
            <Settings className="h-4 w-4 mr-2" />
            Configure Server
          </Button>
        )
      case "paused":
        return (
          <Button onClick={() => restartServer({ serverId: server.id, slug: server.slug })} className="w-full" disabled={isPending}>
            <Play className="h-4 w-4 mr-2" />
            Start Server
          </Button>
        )
    }
  }

  const getStatusMessage = () => {
    switch (server.status) {
      case "not-started":
        return {
          title: "Server has not been started",
          description: "Start this server to configure settings and connect it to your AI tools.",
          icon: <Power className="h-8 w-8 text-muted-foreground" />,
        }
      case "paused":
        return {
          title: "Server is currently paused",
          description: "Resume this server to continue processing requests.",
          icon: <Pause className="h-8 w-8 text-muted-foreground" />,
        }
      case "misconfigured":
        return {
          title: "Server needs configuration",
          description: "Configure the required settings before activating this server.",
          icon: <Settings className="h-8 w-8 text-blue-500" />,
        }
      default:
        return null
    }
  }

  const statusMessage = getStatusMessage()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Overview</CardTitle>
            {renderStatusControl()}
          </div>
          <CardDescription>General information about the {server.name} MCP server</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex flex-wrap gap-2">
                {server.categories.map((category) => (
                  <Badge key={category} variant="outline" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Download className="h-4 w-4 text-muted-foreground mr-1.5" />
                <span className="text-sm">{server.downloads}</span>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => toggleStar({ serverId: server.id, slug: server.slug })}
                  disabled={!isAuthenticated || server.status === "not-started" || isToggleStarPending}
                  className="flex items-center"
                  aria-label={server.isStarred ? "Unstar this server" : "Star this server"}
                >
                  <Star
                    className={`h-4 w-4 mr-1.5 transition-colors ${
                      server.isStarred ? "fill-current text-foreground" : "text-muted-foreground"
                    } ${
                      !isAuthenticated || server.status === "not-started" || isToggleStarPending ? "" : "hover:text-foreground"
                    }`}
                  />
                  <span className="text-sm">{server.stars}</span>
                </button>
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 text-muted-foreground mr-1.5" />
                <span className="text-sm">{server.version}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Description</p>
            <p className="text-sm">{server.description}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Wrench className="mr-2 h-5 w-5 text-muted-foreground" />
              Available Tools
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {server.tools.map((tool) => (
                <Card key={tool.id} className="overflow-hidden">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{tool.customName || tool.name}</CardTitle>
                      {server.status !== "not-started" && (
                        <Switch
                          id={`tool-${tool.id}`}
                          checked={tool.status === "active"}
                          onCheckedChange={() => toggleTool({ toolId: tool.id, slug: server.slug })}
                          disabled={isPending}
                        />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">{tool.customDescription || tool.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Documentation</h3>
            <a
              href={server.documentation}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center"
            >
              <FileText className="mr-2 h-4 w-4" />
              View Documentation
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">Maintained by: {server.maintainer}</p>
        </CardFooter>
      </Card>

      {server.status !== "active" && (
        <Card className="border-dashed border-muted-foreground/50">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center text-center space-y-3 py-6">
              {statusMessage?.icon}
              <div className="space-y-1">
                <h3 className="text-lg font-medium">{statusMessage?.title}</h3>
                <p className="text-sm text-muted-foreground">{statusMessage?.description}</p>
              </div>
              {getStatusActionButton()}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
