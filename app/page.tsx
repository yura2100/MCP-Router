import { HeroSection } from "./_components/hero-section"
import { McpSection } from "@/app/_components/mcp-section";
import { OneRouterSection } from "@/app/_components/one-router-section";
import { AuroraBackground } from "@/components/ui/aurora-background";
// import { PricingSection } from "./_components/pricing-section"
// import { SiteFooter } from "./_components/site-footer"

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <HeroSection />
        <McpSection />
        <OneRouterSection />
        {/*<PricingSection />*/}
        {/*<SiteFooter />*/}
      </div>
      <AuroraBackground />
    </>
  )
}
