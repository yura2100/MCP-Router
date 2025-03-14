"use client"

import { DashboardHeader } from "./_components/dashboard-header"
import { StatsOverview } from "./_components/stats-overview"
import { ServersNeedingConfiguration } from "./_components/servers-needing-configuration"
// import { AIToolConnections } from "./_components/ai-tool-connections"
import { AvailableTools } from "./_components/available-tools"
import {useDashboardServersQuery} from "@/app/dashboard/_hooks/use-dashboard-servers-query";

export default function DashboardPage() {
  const { data: servers } = useDashboardServersQuery();
  const stats = {
    total: servers.length,
    active: servers.filter((server) => server.status === "active").length,
    paused: servers.filter((server) => server.status === "paused").length,
    misconfigured: servers.filter((server) => server.status === "misconfigured").length,
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-8">
        <DashboardHeader />
        <StatsOverview stats={stats} />
        <ServersNeedingConfiguration servers={servers} />
        {/*<AIToolConnections />*/}
        <AvailableTools servers={servers} />
      </div>
    </div>
  )
}

