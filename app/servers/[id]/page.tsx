"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {ArrowLeft, Info, SettingsIcon, AlertTriangle, Wrench, ServerIcon} from "lucide-react"
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import { ServerStatusBadge } from "@/components/server-status-badge"
import {ServerOverview} from "@/app/servers/[id]/_components/server-overview";
import {ServerTools} from "@/app/servers/[id]/_components/server-tools";
import {ServerSettings} from "@/app/servers/[id]/_components/server-settings";
import {useServerQuery} from "@/app/servers/[id]/_hooks/use-server-query";

export default function ServerPage() {
  const params = useParams()
  const router = useRouter()
  const [tab, setTab] = useState("overview")
  const { data: server } = useServerQuery({ slug: params.id as string })

  if (!server) {
    return null
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <ServerIcon className="h-8 w-8 text-primary" />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-3xl font-bold tracking-tight">{server.name}</h1>
                <ServerStatusBadge state={server.status} />
              </div>
              <p className="text-muted-foreground">{server.shortDescription}</p>
            </div>
          </div>
        </div>

        {server.status !== "not-started" && (
          <Tabs className="w-full flex items-center justify-between" value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="overview" className="flex items-center">
                <Info className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="tools" className="flex items-center">
                <Wrench className="h-4 w-4 mr-2" />
                Tools
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center">
                <SettingsIcon className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}
        {tab === "overview" && <ServerOverview {...server} />}
        {tab === "tools" && <ServerTools />}
        {tab === "settings" && <ServerSettings />}

        {/*{server.state !== "active" && activeTab === "tools" ? (*/}
        {/*  <Alert variant="destructive">*/}
        {/*    <AlertTriangle className="h-4 w-4" />*/}
        {/*    <AlertDescription>*/}
        {/*      {server.state === "not-started"*/}
        {/*        ? "This server has not been started. Please start the server from the General Info page to access tools."*/}
        {/*        : server.state === "needs_configuration"*/}
        {/*          ? "This server needs configuration. Please configure the server from the Settings page before accessing tools."*/}
        {/*          : "This server is currently paused. Please resume the server from the General Info page to access tools."}*/}
        {/*    </AlertDescription>*/}
        {/*  </Alert>*/}
        {/*) : server.state !== "active" && server.state !== "needs_configuration" && activeTab === "settings" ? (*/}
        {/*  <Alert variant="destructive">*/}
        {/*    <AlertTriangle className="h-4 w-4" />*/}
        {/*    <AlertDescription>*/}
        {/*      {server.state === "not-started"*/}
        {/*        ? "This server has not been started. Please start the server from the General Info page to access settings."*/}
        {/*        : "This server is currently paused. Please resume the server from the General Info page to access settings."}*/}
        {/*    </AlertDescription>*/}
        {/*  </Alert>*/}
        {/*)}*/}
      </div>
    </div>
  )
}
