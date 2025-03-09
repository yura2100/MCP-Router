import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function McpInfoSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-t border-b">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="space-y-2 text-center max-w-[800px]">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              What is Model Context Protocol?
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              The Model Context Protocol (MCP) is a standard for connecting Large Language Models (LLMs) to external
              services. It allows AI tools like Cursor, Claude desktop, Cline, and Windsurf to query your database and
              perform operations using natural language commands.
            </p>
          </div>

          <div className="w-full max-w-3xl space-y-6">
            <h3 className="text-xl font-bold text-center mb-4">Key Benefits</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Connect AI Tools</h4>
                  <p className="text-muted-foreground">
                    Easily connect popular AI tools to your data sources, enabling them to understand and interact with
                    your information through natural language.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Manage Permissions</h4>
                  <p className="text-muted-foreground">
                    Control which tools can access which data sources with fine-grained permission settings, ensuring
                    security and compliance.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Centralized Dashboard</h4>
                  <p className="text-muted-foreground">
                    Monitor and configure all your MCP servers in one place with our intuitive dashboard, making
                    management simple and efficient.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <Button asChild className="mt-6">
            <Link href="/auth">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

