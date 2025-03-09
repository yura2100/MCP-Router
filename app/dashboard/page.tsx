"use client"

import { useState, useEffect } from "react"
import { mcpServers, type ServerConfig } from "@/lib/server-config"
import { DashboardHeader } from "./_components/dashboard-header"
import { StatsOverview } from "./_components/stats-overview"
import { ServersNeedingConfiguration } from "./_components/servers-needing-configuration"
import { AIToolConnections } from "./_components/ai-tool-connections"
import { AvailableTools } from "./_components/available-tools"

export default function DashboardPage() {
  const [servers, setServers] = useState<ServerConfig[]>([])
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    paused: 0,
    needsConfiguration: 0,
  })

  useEffect(() => {
    // Get all servers
    const allServers = Object.values(mcpServers)

    // Calculate stats
    const activeServers = allServers.filter((server) => server.state === "active")
    const pausedServers = allServers.filter((server) => server.state === "paused")
    const configurationNeededServers = allServers.filter((server) => server.state === "needs_configuration")

    setServers(allServers)
    setStats({
      total: allServers.length,
      active: activeServers.length,
      paused: pausedServers.length,
      needsConfiguration: configurationNeededServers.length,
    })
  }, [])

  const toggleServerState = (serverId: string, newState: "active" | "paused") => {
    setServers((prevServers) =>
      prevServers.map((server) =>
        server.id === serverId ? { ...server, state: newState, enabled: newState === "active" } : server,
      ),
    )

    // Update stats after toggling server state
    const updatedServers = servers.map((server) =>
      server.id === serverId ? { ...server, state: newState, enabled: newState === "active" } : server,
    )

    const activeCount = updatedServers.filter((server) => server.state === "active").length
    const pausedCount = updatedServers.filter((server) => server.state === "paused").length
    const configurationNeededCount = updatedServers.filter((server) => server.state === "needs_configuration").length

    setStats({
      total: stats.total,
      active: activeCount,
      paused: pausedCount,
      needsConfiguration: configurationNeededCount,
    })
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-8">
        <DashboardHeader />
        <StatsOverview stats={stats} />
        <ServersNeedingConfiguration servers={servers} />
        <AIToolConnections />
        <AvailableTools servers={servers} toggleServerState={toggleServerState} />
      </div>
    </div>
  )
}

