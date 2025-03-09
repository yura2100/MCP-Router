import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {Download, ServerIcon, Star, Tag} from "lucide-react"
import { ServerStatusBadge } from "@/components/server-status-badge"
import {PartialServer} from "@/app/servers/_hooks/use-servers-query";

interface ServerCardProps {
  server: PartialServer
  className?: string
}

export function ServerCard({ server, className }: ServerCardProps) {
  return (
    <Link href={`/servers/${server.slug}`} className="block">
      <Card className={`overflow-hidden h-full transition-all hover:shadow-md hover:border-primary/50 ${className}`}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <ServerIcon className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-xl">{server.name}</CardTitle>
                <CardDescription className="text-xs">{server.maintainer}</CardDescription>
              </div>
            </div>
            <ServerStatusBadge state={server.status} />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{server.shortDescription}</p>

          <div className="flex flex-wrap gap-2 mb-3">
            {server.categories.map((category) => (
              <Badge key={category} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>

          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Download className="h-3.5 w-3.5 mr-1" />
              <span>{server.downloads}</span>
            </div>
            <div className="flex items-center">
              <Star className={`h-3.5 w-3.5 mr-1 ${server.isStarred ? "fill-current text-foreground" : ""}`} />
              <span>{server.stars}</span>
            </div>
            <div className="flex items-center">
              <Tag className="h-3.5 w-3.5 mr-1" />
              <span>{server.version}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

