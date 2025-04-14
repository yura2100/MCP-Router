"use client"

import { useState, useRef, useEffect } from "react"
import { Check, ChevronsUpDown, Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useWorkspacesQuery } from "@/app/dashboard/_hooks/use-workspaces-query";
import { useCreateWorkspaceMutation } from "@/app/dashboard/_hooks/use-create-workspace-mutation";
import { useCurrentWorkspaceStore } from "@/app/dashboard/_hooks/use-current-worspace-store";

export function WorkspaceSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [showNewWorkspaceDialog, setShowNewWorkspaceDialog] = useState(false)
  const [newWorkspaceName, setNewWorkspaceName] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { data: workspaces } = useWorkspacesQuery();
  const { mutateAsync: createWorkspaceAsync } = useCreateWorkspaceMutation();
  const [currentWorkspaceId, setCurrentWorkspaceId] = useCurrentWorkspaceStore();
  const currentWorkspace = workspaces.find(({ id }) => id === currentWorkspaceId);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreateWorkspace = async () => {
    const { workspaceId } = await createWorkspaceAsync({ name: newWorkspaceName.trim() });
    setNewWorkspaceName("");
    setShowNewWorkspaceDialog(false);
    setCurrentWorkspaceId(workspaceId);
  };

  if (!currentWorkspace) {
    return null
  }

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          aria-label="Select a workspace"
          className="w-full min-w-[200px] justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Users className="size-4" />
          <span className="truncate">{currentWorkspace.name}</span>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-md border bg-popover shadow-md">
            <div className="p-1">
              <div className="py-1.5 px-2 text-xs font-medium text-muted-foreground">Workspaces</div>
              <div className="max-h-[300px] overflow-auto">
                {workspaces.map((workspace) => (
                  <button
                    key={workspace.id}
                    className={`flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground ${
                      currentWorkspace.id === workspace.id ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => {
                      setCurrentWorkspaceId(workspace.id)
                      setIsOpen(false)
                    }}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    <span className="truncate">{workspace.name}</span>
                    {currentWorkspace.id === workspace.id && <Check className="ml-auto h-4 w-4" />}
                  </button>
                ))}
              </div>
              <div className="mt-1 pt-1 border-t">
                <button
                  className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                  onClick={() => {
                    setIsOpen(false)
                    setShowNewWorkspaceDialog(true)
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Workspace
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog open={showNewWorkspaceDialog} onOpenChange={setShowNewWorkspaceDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create workspace</DialogTitle>
            <DialogDescription>Add a new workspace to organize your MCP servers and tools.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Workspace name</Label>
              <Input
                id="name"
                placeholder="Acme Corp"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCreateWorkspace()
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewWorkspaceDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateWorkspace} disabled={!newWorkspaceName.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
