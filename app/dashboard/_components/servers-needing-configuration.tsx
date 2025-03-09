import { Settings } from "lucide-react"
import { ServerCard } from "@/components/server-card"
import type { ServerConfig } from "@/lib/server-config"
import {DashboardServer} from "@/app/dashboard/_hooks/use-dashboard-servers-query";

interface ServersNeedingConfigurationProps {
  servers: DashboardServer[];
}

export function ServersNeedingConfiguration({ servers }: ServersNeedingConfigurationProps) {
  const serversNeedingConfig = servers.filter((server) => server.status === "misconfigured")

  if (serversNeedingConfig.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Settings className="h-5 w-5 text-blue-600" />
        <h2 className="text-2xl font-bold tracking-tight">Servers Needing Configuration</h2>
      </div>
      <p className="text-muted-foreground">These servers need to be configured before they can be activated</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {serversNeedingConfig.map((server) => (
          <ServerCard key={server.id} server={server} />
        ))}
      </div>
    </div>
  )
}
