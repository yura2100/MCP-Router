import { Plug, ChevronsLeftRightEllipsis, Search, Lock } from "lucide-react"

export function McpInfoSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-t border-b">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="space-y-2 text-center max-w-[800px]">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              What is MCP?
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              The <b>Model Context Protocol (MCP)</b> is a new standard that simplifies how <b>AI models</b> connects to your <b>tools</b> and <b>data</b>.
              Think of MCP like a <b>USB-C port for AI</b> — instead of custom integrations for every tool, AI applications can use a single, standardized protocol to access multiple services <b>seamlessly</b>.
            </p>
          </div>

          <div className="w-full max-w-3xl space-y-6">
            <h3 className="text-xl font-bold text-center mb-4">Key Benefits</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Plug className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">One Integration</h4>
                  <p className="text-muted-foreground">
                    Traditional APIs require separate integrations for every tool. With MCP, a single connection unlocks access to multiple services.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <ChevronsLeftRightEllipsis className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Real-Time, Two-Way Communication</h4>
                  <p className="text-muted-foreground">
                    Unlike traditional APIs, MCP enables AI models to both retrieve data and trigger actions dynamically — just like a conversation.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <Search className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Smarter AI with Dynamic Discovery</h4>
                  <p className="text-muted-foreground">
                    MCP allows AI to discover and use available tools on the fly — no need for hardcoded integrations.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <Lock className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Secure & Standardized</h4>
                  <p className="text-muted-foreground">
                    By following an open protocol, MCP ensures consistent, secure, and reliable AI integrations without reinventing the wheel.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

