"use client"

import { useRouter } from "next/navigation"
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
import {cn} from "@/lib/utils";

type ServerOverviewProps = Server;

export function ServerOverview(props: ServerOverviewProps) {
  const router = useRouter()
  const { isAuthenticated } = useAuth();
  const { mutate: startServer, isPending: isStartServerPending } = useStartServerMutation();
  const { mutate: restartServer, isPending: isRestartServerPending } = useRestartServerMutation();
  const { mutate: pauseServer, isPending: isPauseServerPending } = usePauseServerMutation();
  const { mutate: toggleStar, isPending: isToggleStarPending } = useToggleStarMutation();
  const { mutate: toggleTool, isPending: isToggleToolPending } = useToggleToolMutation();
  const isPending = isStartServerPending || isRestartServerPending || isPauseServerPending || isToggleToolPending;

  const renderStatusControl = () => {
    if (!isAuthenticated) return null;

    if (props.status === "not-started") {
      return (
        <Button variant="default" size="sm" onClick={() => startServer({ serverId: props.id, slug: props.slug })} className="flex items-center" disabled={isPending}>
          <Play className="h-4 w-4 mr-2" />
          Start Server
        </Button>
      )
    } else if (props.status === "needs_configuration") {
      return (
        <div className="flex items-center space-x-3">
          <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>
          <span className="text-sm text-muted-foreground">Needs Configuration</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/servers/${props.slug}`)}
            className="flex items-center"
            disabled={isPending}
          >
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      )
    } else {
      // return (
      //   <Button
      //     variant="default"
      //     size="sm"
      //     onClick={() => props.status === "active" ? pauseServer({ serverId: props.id }) : restartServer({ serverId: props.id })}
      //     className="flex items-center"
      //   >
      //     <Play className="h-4 w-4 mr-2" />
      //     {props.status === "active" ? "Pause Server" : "Start Server"}
      //   </Button>
      // )
      return (
        <div className="flex items-center space-x-3">
          <div className="relative flex size-2.5">
            {props.status === "active" && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"/>)}
            <span className={cn("relative inline-flex size-2.5 rounded-full", props.status === "active" ? "bg-green-500" : "bg-amber-500")} />
          </div>
          <span className="text-sm text-muted-foreground">{props.status === "paused" ? "Paused" : "Active"}</span>
          <Switch
            checked={props.status === "active"}
            onCheckedChange={() => props.status === "active" ? pauseServer({
              serverId: props.id,
              slug: props.slug
            }) : restartServer({serverId: props.id, slug: props.slug})}
            disabled={isPending}
          />
        </div>
      )
    }
  }

  // Replace the getStatusActionButton function with this version that includes colored indicators
  const getStatusActionButton = () => {
    switch (props.status) {
      case "not-started":
        return (
          <Button onClick={() => startServer({serverId: props.id, slug: props.slug})} className="w-full"
                  disabled={isPending}>
            <Play className="h-4 w-4 mr-2" />
            Start Server
          </Button>
        )
      case "needs_configuration":
        return (
          <div className="flex flex-col items-center space-y-4 w-full">
            <div className="flex items-center justify-center space-x-3 w-full">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="text-sm font-medium">Server needs configuration</span>
            </div>
            <Button variant="outline" onClick={() => router.push(`/servers/${props.slug}/settings`)} className="w-full" disabled={isPending}>
              <Settings className="h-4 w-4 mr-2" />
              Configure Server
            </Button>
          </div>
        )
      case "paused":
        return (
          <Button onClick={() => restartServer({ serverId: props.id, slug: props.slug })} className="w-full" disabled={isPending}>
            <Play className="h-4 w-4 mr-2" />
            Start Server
          </Button>
        )
        // return (
        //   <div className="flex flex-col items-center space-y-4 w-full">
        //     <div className="flex items-center justify-center space-x-3 w-full">
        //       <div
        //         className="h-3 w-3 rounded-full bg-amber-500"
        //       />
        //       <span className="text-sm font-medium">
        //         {props.status === "paused" ? "Server is paused" : "Server is active"}
        //       </span>
        //       <Switch
        //         checked={false}
        //         onCheckedChange={() => pauseServer({ serverId: props.id })}
        //       />
        //     </div>
        //   </div>
        // )
    }
  }

  const getStatusMessage = () => {
    switch (props.status) {
      case "not-started":
        return {
          title: "Server has not been started",
          description: "Start this server to configure settings and connect it to your AI tools.",
        }
      case "paused":
        return {
          title: "Server is currently paused",
          description: "Resume this server to continue processing requests.",
        }
      case "needs_configuration":
        return {
          title: "Server needs configuration",
          description: "Configure the required settings before activating this server.",
          icon: <Settings className="h-8 w-8 text-blue-500" />,
          requiredFields: [],
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
            <CardTitle>Server Information</CardTitle>
            {renderStatusControl()}
          </div>
          <CardDescription>General information about the {props.name} MCP server</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex flex-wrap gap-2">
                {props.categories.map((category) => (
                  <Badge key={category} variant="outline" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Download className="h-4 w-4 text-muted-foreground mr-1.5" />
                <span className="text-sm">{props.downloads}</span>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => toggleStar({ serverId: props.id, slug: props.slug })}
                  disabled={!isAuthenticated || props.status === "not-started" || isToggleStarPending}
                  className="flex items-center"
                  aria-label={props.isStarred ? "Unstar this server" : "Star this server"}
                >
                  <Star
                    className={`h-4 w-4 mr-1.5 transition-colors ${
                      props.isStarred ? "fill-current text-foreground" : "text-muted-foreground"
                    } ${
                      !isAuthenticated || props.status === "not-started" || isToggleStarPending ? "" : "hover:text-foreground"
                    }`}
                  />
                  <span className="text-sm">{props.stars}</span>
                </button>
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 text-muted-foreground mr-1.5" />
                <span className="text-sm">{props.version}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Description</p>
            <p className="text-sm">{props.description}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Wrench className="mr-2 h-5 w-5 text-muted-foreground" />
              Available Tools
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {props.tools.map((tool) => (
                <Card key={tool.id} className="overflow-hidden">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{tool.customName || tool.name}</CardTitle>
                      {props.status !== "not-started" && (
                        <Switch
                          id={`tool-${tool.id}`}
                          checked={tool.status === "active"}
                          onCheckedChange={() => toggleTool({ toolId: tool.id, slug: props.slug })}
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
              href={props.documentation}
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
          <p className="text-sm text-muted-foreground">Maintained by: {props.maintainer}</p>
        </CardFooter>
      </Card>

      {isAuthenticated && props.status !== "active" && (
        <Card className="border-dashed border-muted-foreground/50">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center text-center space-y-3 py-6">
              {statusMessage?.icon ||
                (props.status === "not-started" ? (
                  <Power className="h-8 w-8 text-muted-foreground" />
                ) : (
                  <Pause className="h-8 w-8 text-muted-foreground" />
                ))}
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
