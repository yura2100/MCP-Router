"use client"

import {useMemo, useState} from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, DatabaseIcon, Power } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {Server} from "@/app/servers/[id]/_hooks/use-server-query";
import {AutoForm} from "@/components/ui/autoform";
import {ZodProvider} from "@autoform/zod";
import {buildServerSettingsSchema} from "@/app/servers/[id]/_utils/build-server-settings-schema";
import {useStopServerMutation} from "@/app/servers/[id]/_hooks/use-stop-server-mutation";
import {useUpdateServerMutation} from "@/app/servers/[id]/_hooks/use-update-server-mutation";

type ServerSettingsProps = {
  server: Server;
  setTab: (tab: string) => void;
};

export function ServerSettings({ server, setTab }: ServerSettingsProps) {
  const [connection, setConnection] = useState<Record<string, any>>({});
  const { mutateAsync: stopServerAsync, isPending: isStopserverPending } = useStopServerMutation();
  const { mutate: updateServer, isPending: isUpdateServerPending } = useUpdateServerMutation();
  const isPending = isStopserverPending || isUpdateServerPending;

  const schema = useMemo(() => {
    const schema = buildServerSettingsSchema(
      server.config.connection.schema,
      server.config.connection.fieldConfigs,
    );
    return new ZodProvider(schema)
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Server Settings</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="destructive"
              className="flex items-center"
              disabled={isPending}
              onClick={async () => {
                await stopServerAsync({ serverId: server.id });
                setTab("overview");
              }}
            >
              <Power className="h-4 w-4 mr-2" />
              Stop Server
            </Button>
          </div>
        </div>
        <CardDescription>Configure settings for your {server.name} MCP server</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {server.status === "misconfigured" && (
          <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-2">
              <AlertDescription className="text-blue-700 dark:text-blue-300">
                This server needs to be configured before it can be activated. Required fields are marked with{" "}
                <span className="text-destructive">*</span>
              </AlertDescription>
            </div>
          </Alert>
        )}
        <div>
          <div className="flex items-center mb-4">
            <DatabaseIcon className="h-5 w-5 mr-2 text-primary" />
            <h3 className="text-lg font-medium">Connection Settings</h3>
          </div>
          <AutoForm
            schema={schema}
            defaultValues={server.userConfig.connection}
            onFormInit={(form) => {
              form.watch(setConnection);
            }}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="ml-auto"
          disabled={isPending}
          onClick={() => updateServer({ serverId: server.id, config: { connection } })}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  )
}
