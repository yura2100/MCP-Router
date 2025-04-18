"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Code, ExternalLinkIcon } from "lucide-react"
import { useConnectionQuery } from "@/app/dashboard/_hooks/use-connection-query";
import {PasswordInput} from "@/components/ui/password-input";
import {CopyButton} from "@/components/ui/copy-button";

export function AIToolConnections() {
  const { data } = useConnectionQuery();
  const url = `https://router.mcp-router.com/mcp/${data?.secret ?? ""}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Code className="h-5 w-5 text-purple-600" />
        <h2 className="text-2xl font-bold tracking-tight">AI Tool Connection</h2>
      </div>
      <p className="text-muted-foreground">
        Connect your favorite AI tools to MCP Router by using the connection link below
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Connection Link</CardTitle>
          <CardDescription>Copy this link and paste it into your AI tool's integration settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <label htmlFor="connection-link" className="text-sm font-medium">
              MCP Router Connection Link
            </label>
            <div className="flex gap-2">
              <PasswordInput
                id="connection-link"
                value={url}
                readOnly
                className="font-mono text-sm"
              />
              <CopyButton textToCopy={url} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              This link is unique to your account. Do not share it with others.
            </p>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/30 flex justify-between p-3">
          <div className="text-sm text-muted-foreground">
            Need help?{" "}
            <Link href="/support" className="text-primary hover:underline">
              Contact support
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            <Link href="/docs/ai-tools" className="text-primary hover:underline flex items-center gap-1">
              <span>View documentation</span>
              <ExternalLinkIcon className="h-3 w-3" />
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
