"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, ChevronDown, ChevronUp, Edit } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mcpServers, type ServerConfig } from "@/lib/server-config"

export function ServerTools() {
  const params = useParams()
  const { toast } = useToast()
  const serverId = params.id as string

  // Get server data or redirect if not found
  const initialServerData = mcpServers[serverId as keyof typeof mcpServers]
  const [server, setServer] = useState<ServerConfig>(initialServerData)
  const [expandedTools, setExpandedTools] = useState<Record<string, boolean>>({})
  const [editingParam, setEditingParam] = useState<{ toolId: string; paramName: string } | null>(null)

  if (!initialServerData || !initialServerData.enabled) {
    return null
  }

  const handleSave = () => {
    toast({
      title: "Tool settings saved",
      description: `${server.name} MCP server tool settings have been updated.`,
    })
  }

  const toggleTool = (toolId: string) => {
    const updatedTools = server.tools.map((tool) => (tool.id === toolId ? { ...tool, enabled: !tool.enabled } : tool))

    setServer({
      ...server,
      tools: updatedTools,
    })

    const tool = server.tools.find((t) => t.id === toolId)
    if (tool) {
      toast({
        title: tool.enabled ? "Tool Disabled" : "Tool Enabled",
        description: `${tool.name} has been ${tool.enabled ? "disabled" : "enabled"}.`,
      })
    }
  }

  const toggleToolExpansion = (toolId: string) => {
    setExpandedTools((prev) => ({
      ...prev,
      [toolId]: !prev[toolId],
    }))
  }

  const updateToolProperty = (toolId: string, property: string, value: string) => {
    const updatedTools = server.tools.map((tool) => (tool.id === toolId ? { ...tool, [property]: value } : tool))

    setServer({
      ...server,
      tools: updatedTools,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tool Settings</CardTitle>
        <CardDescription>Enable or disable tools for this MCP server</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {server.tools.map((tool) => (
            <div key={tool.id} className="flex flex-col border rounded-lg overflow-hidden">
              <div
                className="flex items-start justify-between p-4 cursor-pointer hover:bg-muted/30"
                onClick={() => toggleToolExpansion(tool.id)}
              >
                <div className="flex items-center space-x-2">
                  <div>
                    <h4 className="font-medium">{tool.name}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">{tool.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div onClick={(e) => e.stopPropagation()}>
                    <Switch id={`tool-${tool.id}`} checked={tool.enabled} onCheckedChange={() => toggleTool(tool.id)} />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleToolExpansion(tool.id)
                    }}
                  >
                    {expandedTools[tool.id] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {expandedTools[tool.id] && (
                <div className="border-t p-4 space-y-6">
                  {tool.enabled && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`tool-name-${tool.id}`}>Custom Tool Name</Label>
                        <Input
                          id={`tool-name-${tool.id}`}
                          placeholder={tool.name}
                          value={tool.customName || ""}
                          onChange={(e) => updateToolProperty(tool.id, "customName", e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Override the default tool name (leave empty to use default)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`tool-desc-${tool.id}`}>Custom Description</Label>
                        <Textarea
                          id={`tool-desc-${tool.id}`}
                          placeholder={tool.description}
                          value={tool.customDescription || ""}
                          onChange={(e) => updateToolProperty(tool.id, "customDescription", e.target.value)}
                          rows={2}
                        />
                        <p className="text-xs text-muted-foreground">
                          Override the default tool description (leave empty to use default)
                        </p>
                      </div>
                    </div>
                  )}

                  {tool.parameters && tool.parameters.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Tool Parameters</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[150px]">Name</TableHead>
                            <TableHead className="w-[100px]">Type</TableHead>
                            <TableHead className="w-[100px]">Required</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {tool.parameters.map((param) => (
                            <TableRow key={param.name} className="h-[100px]">
                              <TableCell className="font-medium">{param.name}</TableCell>
                              <TableCell>{param.type}</TableCell>
                              <TableCell>{param.required ? "Yes" : "No"}</TableCell>
                              <TableCell>
                                {editingParam &&
                                editingParam.toolId === tool.id &&
                                editingParam.paramName === param.name ? (
                                  <Textarea
                                    value={param.customDescription || param.description}
                                    onChange={(e) => {
                                      const updatedTools = server.tools.map((t) => {
                                        if (t.id === tool.id) {
                                          const updatedParams = t.parameters?.map((p) =>
                                            p.name === param.name ? { ...p, customDescription: e.target.value } : p,
                                          )
                                          return { ...t, parameters: updatedParams }
                                        }
                                        return t
                                      })

                                      setServer({
                                        ...server,
                                        tools: updatedTools,
                                      })
                                    }}
                                    className="min-h-[80px] resize-none"
                                    autoFocus
                                    onBlur={() => setEditingParam(null)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault()
                                        setEditingParam(null)
                                      }
                                    }}
                                  />
                                ) : (
                                  <div className="min-h-[80px] py-2 flex items-center">
                                    {param.customDescription || param.description}
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => setEditingParam({ toolId: tool.id, paramName: param.name })}
                                >
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit description</span>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <p className="text-xs text-muted-foreground">
                        Click the edit button to customize parameter descriptions
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="ml-auto">
          <Save className="h-4 w-4 mr-2" />
          Save Tool Settings
        </Button>
      </CardFooter>
    </Card>
  )
}

