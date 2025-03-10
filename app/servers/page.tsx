"use client"

import {useState} from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { ServerCard } from "@/components/server-card"
import {useServersQuery} from "@/app/servers/_hooks/use-servers-query";
import {useCategoriesQuery} from "@/app/servers/_hooks/use-categories-query";

export default function ServersPage() {
  const [search, setSearch] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showCategories, setShowCategories] = useState(false);
  const { data: categories } = useCategoriesQuery();
  const { data: servers } = useServersQuery({ search, categories: selectedCategories });

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Clear all selected categories
  const clearCategories = () => {
    setSelectedCategories([])
  }

  // Remove a specific category
  const removeCategory = (category: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category))
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground">
            Browse and configure Model Context Protocol servers to connect your AI tools to external services
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search integrations..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="relative">
            <Button
              variant={selectedCategories.length > 0 ? "default" : "outline"}
              onClick={() => setShowCategories(!showCategories)}
              className="min-w-[130px] flex items-center"
            >
              <Filter className="mr-2 h-4 w-4" />
              Categories
            </Button>

            {showCategories && (
              <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-background border z-10">
                <div className="p-2 border-b flex justify-between items-center">
                  <span className="font-medium">Filter by category</span>
                  {selectedCategories.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearCategories} className="h-8 px-2 text-xs">
                      Clear all
                    </Button>
                  )}
                </div>
                <div className="py-1 max-h-[300px] overflow-y-auto">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2 px-4 py-2 hover:bg-muted">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="flex-1 text-sm cursor-pointer flex justify-between"
                      >
                        <span>{category.name}</span>
                        {/* TODO: Show count */}
                        {/*<span className="text-xs text-muted-foreground">*/}
                        {/*  {servers.filter((s) => s.categories.includes(category.name)).length}*/}
                        {/*</span>*/}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {selectedCategories.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {selectedCategories.map((id) => {
              const category = categories.find((category) => category.id === id);
              if (!category) return null;
              return (
                <Badge key={id} variant="outline" className="px-3 py-1 flex items-center">
                  {category.name}
                  <button className="ml-2 hover:text-destructive" onClick={() => removeCategory(category.id)}>
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </button>
                </Badge>
              )
            })}
            <span className="text-sm text-muted-foreground ml-2">
              {servers.length} server{servers.length !== 1 ? "s" : ""} found
            </span>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servers.map((server) => (
            <ServerCard key={server.id} server={server} />
          ))}
        </div>
      </div>
    </div>
  )
}
