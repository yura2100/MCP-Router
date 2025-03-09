"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, ChevronDown, ChevronUp, Edit } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Server } from "@/app/servers/[id]/_hooks/use-server-query";
import {useUpdateToolsMutation} from "@/app/servers/[id]/_hooks/use-update-tools-mutation";

type ServerToolsProps = {
  slug: string;
  tools: Server["tools"];
};

export function ServerTools({ slug, tools: initialTools }: ServerToolsProps) {
  const [tools, setTools] = useState(initialTools);
  const [expandedTools, setExpandedTools] = useState<Record<string, boolean>>({})
  const [editingParam, setEditingParam] = useState<{ toolId: string; paramName: string } | null>(null);
  const { mutate, isPending } = useUpdateToolsMutation(slug)

  const toggleToolExpansion = (toolId: string) => {
    setExpandedTools((prev) => ({
      ...prev,
      [toolId]: !prev[toolId],
    }))
  }

  const updateToolProperty = (toolId: string, property: string, value: string) => {
    const newTools = tools.map((tool) => {
      if (tool.id !== toolId) return tool
      return { ...tool, [property]: value };
    })
    setTools(newTools);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tool Settings</CardTitle>
        <CardDescription>Enable or disable tools for this MCP server</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {tools.map((tool) => (
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
                    <Switch
                      id={`tool-${tool.id}`}
                      checked={tool.status === "active"}
                      disabled={isPending}
                      onCheckedChange={() => updateToolProperty(tool.id, "status", tool.status === "active" ? "disabled" : "active")}
                    />
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
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`tool-name-${tool.id}`}>Custom Tool Name</Label>
                      <Input
                        id={`tool-name-${tool.id}`}
                        placeholder={tool.name}
                        value={tool.customName}
                        disabled={isPending}
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
                        placeholder={tool.description ?? ""}
                        value={tool.customDescription}
                        disabled={isPending}
                        onChange={(e) => updateToolProperty(tool.id, "customDescription", e.target.value)}
                        rows={2}
                      />
                      <p className="text-xs text-muted-foreground">
                        Override the default tool description (leave empty to use default)
                      </p>
                    </div>
                  </div>

                  {/*{tool.parameters && tool.parameters.length > 0 && (*/}
                  {/*  <div className="space-y-3">*/}
                  {/*    <h4 className="font-medium text-sm">Tool Parameters</h4>*/}
                  {/*    <Table>*/}
                  {/*      <TableHeader>*/}
                  {/*        <TableRow>*/}
                  {/*          <TableHead className="w-[150px]">Name</TableHead>*/}
                  {/*          <TableHead className="w-[100px]">Type</TableHead>*/}
                  {/*          <TableHead className="w-[100px]">Required</TableHead>*/}
                  {/*          <TableHead>Description</TableHead>*/}
                  {/*          <TableHead className="w-[50px]"></TableHead>*/}
                  {/*        </TableRow>*/}
                  {/*      </TableHeader>*/}
                  {/*      <TableBody>*/}
                  {/*        {tool.parameters.map((param) => (*/}
                  {/*          <TableRow key={param.name} className="h-[100px]">*/}
                  {/*            <TableCell className="font-medium">{param.name}</TableCell>*/}
                  {/*            <TableCell>{param.type}</TableCell>*/}
                  {/*            <TableCell>{param.required ? "Yes" : "No"}</TableCell>*/}
                  {/*            <TableCell>*/}
                  {/*              {editingParam &&*/}
                  {/*              editingParam.toolId === tool.id &&*/}
                  {/*              editingParam.paramName === param.name ? (*/}
                  {/*                <Textarea*/}
                  {/*                  value={param.customDescription || param.description}*/}
                  {/*                  onChange={(e) => {*/}
                  {/*                    const updatedTools = server.tools.map((t) => {*/}
                  {/*                      if (t.id === tool.id) {*/}
                  {/*                        const updatedParams = t.parameters?.map((p) =>*/}
                  {/*                          p.name === param.name ? { ...p, customDescription: e.target.value } : p,*/}
                  {/*                        )*/}
                  {/*                        return { ...t, parameters: updatedParams }*/}
                  {/*                      }*/}
                  {/*                      return t*/}
                  {/*                    })*/}

                  {/*                    setServer({*/}
                  {/*                      ...server,*/}
                  {/*                      tools: updatedTools,*/}
                  {/*                    })*/}
                  {/*                  }}*/}
                  {/*                  className="min-h-[80px] resize-none"*/}
                  {/*                  autoFocus*/}
                  {/*                  onBlur={() => setEditingParam(null)}*/}
                  {/*                  onKeyDown={(e) => {*/}
                  {/*                    if (e.key === "Enter" && !e.shiftKey) {*/}
                  {/*                      e.preventDefault()*/}
                  {/*                      setEditingParam(null)*/}
                  {/*                    }*/}
                  {/*                  }}*/}
                  {/*                />*/}
                  {/*              ) : (*/}
                  {/*                <div className="min-h-[80px] py-2 flex items-center">*/}
                  {/*                  {param.customDescription || param.description}*/}
                  {/*                </div>*/}
                  {/*              )}*/}
                  {/*            </TableCell>*/}
                  {/*            <TableCell>*/}
                  {/*              <Button*/}
                  {/*                variant="ghost"*/}
                  {/*                size="sm"*/}
                  {/*                className="h-8 w-8 p-0"*/}
                  {/*                onClick={() => setEditingParam({ toolId: tool.id, paramName: param.name })}*/}
                  {/*              >*/}
                  {/*                <Edit className="h-4 w-4" />*/}
                  {/*                <span className="sr-only">Edit description</span>*/}
                  {/*              </Button>*/}
                  {/*            </TableCell>*/}
                  {/*          </TableRow>*/}
                  {/*        ))}*/}
                  {/*      </TableBody>*/}
                  {/*    </Table>*/}
                  {/*    <p className="text-xs text-muted-foreground">*/}
                  {/*      Click the edit button to customize parameter descriptions*/}
                  {/*    </p>*/}
                  {/*  </div>*/}
                  {/*)}*/}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled={isPending} onClick={() => mutate({ tools })} className="ml-auto">
          <Save className="h-4 w-4 mr-2" />
          Save Tool Settings
        </Button>
      </CardFooter>
    </Card>
  )
}
