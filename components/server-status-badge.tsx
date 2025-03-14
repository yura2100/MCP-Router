import { Badge } from "@/components/ui/badge"
import { Play, Pause, Settings } from "lucide-react"
import type { ServerState } from "@/lib/server-config"

interface ServerStatusBadgeProps {
  state: ServerState
  className?: string
}

export function ServerStatusBadge({ state, className }: ServerStatusBadgeProps) {
  switch (state) {
    case "active":
      return (
        <Badge variant="outline" className={`bg-green-500/10 text-green-600 hover:bg-green-500/10 ${className}`}>
          <Play className="h-3 w-3 mr-1 fill-current" />
          Active
        </Badge>
      )
    case "paused":
      return (
        <Badge variant="outline" className={`bg-amber-500/10 text-amber-600 hover:bg-amber-500/10 ${className}`}>
          <Pause className="h-3 w-3 mr-1 fill-current" />
          Paused
        </Badge>
      )
    case "misconfigured":
      return (
        <Badge variant="outline" className={`bg-blue-500/10 text-blue-600 hover:bg-blue-500/10 ${className}`}>
          <Settings className="h-3 w-3 mr-1" />
          Needs Configuration
        </Badge>
      )
    case "not-started":
      // Don't display any badge for not started servers
      return null
    default:
      return null
  }
}

