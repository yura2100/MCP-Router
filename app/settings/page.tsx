"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Shield, Bell, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)

    // Simulate saving settings
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      })
    }, 1000)
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your MCP Router settings and preferences</p>
        </div>

        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure general settings for your MCP Proxy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="proxy-name">Router Name</Label>
                  <Input id="proxy-name" defaultValue="My MCP Router" />
                  <p className="text-xs text-muted-foreground">
                    This name will be displayed to AI tools connecting to your router
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="proxy-port">Router Port</Label>
                  <Input id="proxy-port" type="number" defaultValue="8080" />
                  <p className="text-xs text-muted-foreground">The port your MCP Router will listen on</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-timeout">Default Timeout (ms)</Label>
                  <Input id="default-timeout" type="number" defaultValue="5000" />
                  <p className="text-xs text-muted-foreground">Default timeout for MCP server requests</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="auto-start" defaultChecked />
                  <Label htmlFor="auto-start">Start proxy on system startup</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Settings"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security settings for your MCP Proxy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="auth-method">Authentication Method</Label>
                  <Select defaultValue="token">
                    <SelectTrigger id="auth-method">
                      <SelectValue placeholder="Select authentication method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="token">API Token</SelectItem>
                      <SelectItem value="oauth">OAuth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-token">API Token</Label>
                  <div className="flex space-x-2">
                    <Input id="api-token" type="password" defaultValue="mcp_token_12345" />
                    <Button variant="outline" size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This token is required for AI tools to connect to your proxy
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ip-whitelist">IP Whitelist</Label>
                    <Switch id="ip-whitelist" />
                  </div>
                  <Input placeholder="127.0.0.1, 192.168.1.0/24" disabled />
                  <p className="text-xs text-muted-foreground">Only allow connections from these IP addresses</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="tls" defaultChecked />
                  <Label htmlFor="tls">Enable TLS encryption</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading}>
                  <Shield className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Security Settings"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="flex items-center space-x-2">
                    <Switch id="email-security" defaultChecked />
                    <Label htmlFor="email-security">Security alerts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="email-updates" defaultChecked />
                    <Label htmlFor="email-updates">System updates</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="email-usage" />
                    <Label htmlFor="email-usage">Usage reports</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">In-App Notifications</h3>
                  <div className="flex items-center space-x-2">
                    <Switch id="app-connections" defaultChecked />
                    <Label htmlFor="app-connections">New connections</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="app-errors" defaultChecked />
                    <Label htmlFor="app-errors">Server errors</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notification-email">Notification Email</Label>
                  <Input id="notification-email" type="email" defaultValue="user@example.com" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading}>
                  <Bell className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Notification Settings"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>Configure advanced settings for your MCP Proxy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="log-level">Log Level</Label>
                  <Select defaultValue="info">
                    <SelectTrigger id="log-level">
                      <SelectValue placeholder="Select log level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="warn">Warning</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="debug">Debug</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="log-retention">Log Retention (days)</Label>
                  <Input id="log-retention" type="number" defaultValue="30" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-connections">Max Concurrent Connections</Label>
                  <Input id="max-connections" type="number" defaultValue="50" />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="debug-mode" />
                  <Label htmlFor="debug-mode">Enable debug mode</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="metrics" defaultChecked />
                  <Label htmlFor="metrics">Collect usage metrics</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Advanced Settings"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

