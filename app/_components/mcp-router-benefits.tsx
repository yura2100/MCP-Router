import { Shield, Server, Sliders, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function McpRouterBenefitsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-10">
          <div className="space-y-3 text-center max-w-[800px]">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why MCP Router?</h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              Stop struggling with manual MCP server management. Our platform handles the complexity for you, so you can
              focus on what matters most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
            {/* Problem/Solution Card 1 */}
            <div className="flex flex-col space-y-4 bg-card p-6 rounded-lg border shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Server className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">No Server Management</h3>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-sm font-medium text-muted-foreground">The Problem</p>
                  <p className="mt-1">
                    Setting up and maintaining MCP servers requires technical expertise and ongoing attention.
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-md">
                  <p className="text-sm font-medium text-primary">Our Solution</p>
                  <p className="mt-1">
                    MCP Router handles all server provisioning, scaling, and maintenance automatically.
                  </p>
                </div>
              </div>
            </div>

            {/* Problem/Solution Card 2 */}
            <div className="flex flex-col space-y-4 bg-card p-6 rounded-lg border shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Sliders className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Seamless Configuration</h3>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-sm font-medium text-muted-foreground">The Problem</p>
                  <p className="mt-1">
                    Configuring MCP servers for different data sources and tools is complex and error-prone.
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-md">
                  <p className="text-sm font-medium text-primary">Our Solution</p>
                  <p className="mt-1">
                    Our intuitive interface makes connecting data sources and AI tools simple with just a few clicks.
                  </p>
                </div>
              </div>
            </div>

            {/* Problem/Solution Card 3 */}
            <div className="flex flex-col space-y-4 bg-card p-6 rounded-lg border shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <LayoutDashboard className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Centralized Management</h3>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-sm font-medium text-muted-foreground">The Problem</p>
                  <p className="mt-1">
                    Managing multiple MCP servers across different tools and environments is time-consuming.
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-md">
                  <p className="text-sm font-medium text-primary">Our Solution</p>
                  <p className="mt-1">
                    Our dashboard gives you a single view to monitor and control all your integrations.
                  </p>
                </div>
              </div>
            </div>

            {/* Problem/Solution Card 4 */}
            <div className="flex flex-col space-y-4 bg-card p-6 rounded-lg border shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Enterprise Security</h3>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-sm font-medium text-muted-foreground">The Problem</p>
                  <p className="mt-1">
                    Ensuring proper security and access controls for AI tools accessing your data is challenging.
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-md">
                  <p className="text-sm font-medium text-primary">Our Solution</p>
                  <p className="mt-1">
                    Built-in permission controls and audit logs keep your data secure and compliant.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center max-w-[600px]">
            <p className="text-muted-foreground mb-6">
              Join hundreds of companies that have simplified their AI infrastructure with MCP Router.
            </p>
            <Button asChild size="lg">
              <Link href="/servers">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
