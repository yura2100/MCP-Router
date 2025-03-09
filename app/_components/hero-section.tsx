import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="w-full h-[calc(100vh-3.5rem)] py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute h-full w-full bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:20px_20px] dark:bg-[radial-gradient(#374151_1px,transparent_1px)]"></div>
        <div className="absolute inset-y-0 right-0 -z-10 w-[50%] bg-gradient-to-r from-transparent to-primary/5 dark:from-transparent dark:to-primary/10"></div>
      </div>
      <div className="h-full container px-4 md:px-6 flex items-center">
        <div className="max-w-[800px] mx-auto">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-center">
                AI Integrations Made Easy
              </h1>
              <p className="text-muted-foreground md:text-xl text-center">
                Easily connect AI to your workflow — no coding, no complexity, just seamless automation with MCP.
              </p>
            </div>
            <div className="flex justify-center">
              <Button asChild size="lg">
                <Link href="/servers">
                  Browse Integrations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

