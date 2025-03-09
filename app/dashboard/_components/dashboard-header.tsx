import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button variant="outline" size="sm" asChild>
          <Link href="/servers">
            Browse Servers
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <p className="text-muted-foreground">Overview of your MCP servers and their tools</p>
    </div>
  )
}

