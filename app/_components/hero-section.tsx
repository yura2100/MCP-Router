import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { WordRotate } from "@/components/magicui/word-rotate";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";

export function HeroSection() {
  return (
    <section className="w-full h-[calc(100vh-3.5rem)] py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden border-b">
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute h-full w-full bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:20px_20px] dark:bg-[radial-gradient(#374151_1px,transparent_1px)]"></div>
      </div>
      <div className="h-full container px-4 md:px-6 flex items-center">
        <div className="max-w-[800px] mx-auto">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold md:text-8xl text-center">
                <WordRotate className="stop-flickering" words={["Easy", "Effortless", "Smart", "Scalable", "Powerful", "Instant", "Reliable"]}/>
                <AnimatedGradientText>AI Integrations</AnimatedGradientText>
              </h1>
              <p className="text-muted-foreground md:text-xl text-center">
                Connect AI to your workflow — no coding, no complexity, just seamless automation with MCP
              </p>
            </div>
            <div className="flex justify-center">
              <Button asChild size="lg" variant="rainbow" className="group stop-flickering">
                <Link href="/servers">
                  Browse Integrations
                  <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
