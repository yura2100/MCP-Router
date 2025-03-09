"use client"

import { useCallback, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Copy, Check, Globe, Code, RefreshCw, ExternalLinkIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export function AIToolConnections() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Code className="h-5 w-5 text-purple-600" />
        <h2 className="text-2xl font-bold tracking-tight">AI Tool Connections</h2>
      </div>
      <p className="text-muted-foreground">Connect your favorite AI tools to MCP Router for enhanced capabilities</p>

      <Card>
        <CardHeader>
          <CardTitle>Connect AI Tools</CardTitle>
          <CardDescription>
            MCP Router can integrate with popular AI coding tools like Cursor, Windsurf, and others
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="api-key" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="api-key">API Key</TabsTrigger>
              <TabsTrigger value="oauth">OAuth</TabsTrigger>
              <TabsTrigger value="url">Direct URL</TabsTrigger>
              <TabsTrigger value="local">Local Dev</TabsTrigger>
            </TabsList>

            <TabsContent value="api-key" className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">API Key Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Use your MCP Router API key to connect AI tools that support API key authentication.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="api-key" className="text-sm font-medium">
                      Your MCP Router API Key
                    </label>
                    <Button variant="ghost" size="sm" className="h-7 gap-1">
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span className="text-xs">Regenerate</span>
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="api-key"
                      value="mcp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      readOnly
                      className="font-mono text-sm"
                    />
                    <CopyButton textToCopy="mcp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This key grants access to your MCP Router. Keep it secure and never share it publicly.
                  </p>
                </div>

                <div className="rounded-md border p-4 space-y-4">
                  <h4 className="font-medium">Connection Instructions</h4>
                  <ol className="space-y-3 text-sm">
                    <li className="flex gap-2">
                      <div className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-800/30">
                        1
                      </div>
                      <span>Open your AI tool settings (Cursor, Windsurf, etc.)</span>
                    </li>
                    <li className="flex gap-2">
                      <div className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-800/30">
                        2
                      </div>
                      <span>Navigate to Integrations or Extensions section</span>
                    </li>
                    <li className="flex gap-2">
                      <div className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-800/30">
                        3
                      </div>
                      <span>Find and select "MCP Router" from the list of available integrations</span>
                    </li>
                    <li className="flex gap-2">
                      <div className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-800/30">
                        4
                      </div>
                      <span>Paste your API key when prompted</span>
                    </li>
                    <li className="flex gap-2">
                      <div className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-800/30">
                        5
                      </div>
                      <span>Click Connect or Save to complete the integration</span>
                    </li>
                  </ol>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="oauth" className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">OAuth Connection</h3>
                <p className="text-sm text-muted-foreground">
                  Connect using OAuth for a more secure integration without exposing API keys.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="border-muted">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/30">
                          <Globe className="h-3.5 w-3.5 text-blue-600" />
                        </div>
                        Cursor
                      </CardTitle>
                      <Button size="sm" variant="secondary">
                        Connect
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-muted-foreground">
                      AI-native code editor with built-in pair programming capabilities.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-muted">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center dark:bg-indigo-900/30">
                          <Globe className="h-3.5 w-3.5 text-indigo-600" />
                        </div>
                        Windsurf
                      </CardTitle>
                      <Button size="sm" variant="secondary">
                        Connect
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-muted-foreground">
                      AI-powered development environment for faster coding workflows.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-muted">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900/30">
                          <Globe className="h-3.5 w-3.5 text-green-600" />
                        </div>
                        GitHub Copilot
                      </CardTitle>
                      <Button size="sm" variant="secondary">
                        Connect
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-muted-foreground">
                      AI pair programmer that offers suggestions as you code.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-muted">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center dark:bg-orange-900/30">
                          <Globe className="h-3.5 w-3.5 text-orange-600" />
                        </div>
                        Custom Tool
                      </CardTitle>
                      <Button size="sm" variant="secondary">
                        Configure
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-muted-foreground">
                      Set up a custom OAuth integration with your preferred AI tool.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="url" className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Direct URL Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Use these URLs to directly connect your AI tools to specific MCP Router endpoints.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="base-url" className="text-sm font-medium">
                    Base URL
                  </label>
                  <div className="flex gap-2">
                    <Input id="base-url" value="https://api.mcprouter.com/v1" readOnly className="font-mono text-sm" />
                    <CopyButton textToCopy="https://api.mcprouter.com/v1" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="webhook-url" className="text-sm font-medium">
                    Webhook URL
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="webhook-url"
                      value="https://api.mcprouter.com/v1/webhooks/ai-tools"
                      readOnly
                      className="font-mono text-sm"
                    />
                    <CopyButton textToCopy="https://api.mcprouter.com/v1/webhooks/ai-tools" />
                  </div>
                </div>

                <div className="rounded-md border p-4 space-y-4">
                  <h4 className="font-medium">Connection Instructions</h4>
                  <ol className="space-y-3 text-sm">
                    <li className="flex gap-2">
                      <div className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-800/30">
                        1
                      </div>
                      <span>In your AI tool, locate the custom integration or webhook settings</span>
                    </li>
                    <li className="flex gap-2">
                      <div className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-800/30">
                        2
                      </div>
                      <span>Enter the Base URL for general API access or Webhook URL for event-based integration</span>
                    </li>
                    <li className="flex gap-2">
                      <div className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-800/30">
                        3
                      </div>
                      <span>Configure authentication using your API key in the Authorization header</span>
                    </li>
                    <li className="flex gap-2">
                      <div className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-800/30">
                        4
                      </div>
                      <span>Set the content type to application/json for all requests</span>
                    </li>
                    <li className="flex gap-2">
                      <div className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-800/30">
                        5
                      </div>
                      <span>Test the connection to ensure proper communication</span>
                    </li>
                  </ol>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="local" className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Local Development Setup</h3>
                <p className="text-sm text-muted-foreground">
                  Configure your local development environment to work with MCP Router.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-md bg-muted p-4 font-mono text-sm">
                  <div className="flex items-center justify-between">
                    <span># Install the MCP Router CLI</span>
                    <CopyButton textToCopy="npm install -g mcp-router-cli" />
                  </div>
                  <span className="text-muted-foreground">npm install -g mcp-router-cli</span>
                </div>

                <div className="rounded-md bg-muted p-4 font-mono text-sm">
                  <div className="flex items-center justify-between">
                    <span># Initialize with your API key</span>
                    <CopyButton textToCopy="mcp init --api-key mcp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
                  </div>
                  <span className="text-muted-foreground">mcp init --api-key mcp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                </div>

                <div className="rounded-md bg-muted p-4 font-mono text-sm">
                  <div className="flex items-center justify-between">
                    <span># Start local development server</span>
                    <CopyButton textToCopy="mcp dev" />
                  </div>
                  <span className="text-muted-foreground">mcp dev</span>
                </div>

                <div className="rounded-md border p-4">
                  <h4 className="font-medium mb-2">Local Development URLs</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Local API:</span>
                      <span className="font-mono">http://localhost:3030/api</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Local Webhook:</span>
                      <span className="font-mono">http://localhost:3030/webhook</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Local Dashboard:</span>
                      <span className="font-mono">http://localhost:3030/dashboard</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button variant="outline" size="sm" className="gap-1">
                    <ExternalLinkIcon className="h-4 w-4" />
                    <span>View Documentation</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Code className="h-4 w-4" />
                    <span>Sample Code</span>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
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
              <span>View full documentation</span>
              <ExternalLinkIcon className="h-3 w-3" />
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

// Copy button component with copy functionality
function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    toast({
      description: "Copied to clipboard",
      duration: 2000,
    })
    setTimeout(() => setCopied(false), 2000)
  }, [textToCopy, toast])

  return (
    <Button variant="outline" size="icon" onClick={copyToClipboard} className="h-10 w-10">
      {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
    </Button>
  )
}

