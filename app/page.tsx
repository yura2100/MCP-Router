import { HeroSection } from "./_components/hero-section"
import { McpSection } from "@/app/_components/mcp-section";
import { McpRouterBenefitsSection } from "@/app/_components/mcp-router-benefits";
// import { PricingSection } from "./_components/pricing-section"
// import { SiteFooter } from "./_components/site-footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <HeroSection />
      <McpSection />
      <McpRouterBenefitsSection />
      {/*<PricingSection />*/}
      {/*<SiteFooter />*/}
    </div>
  )
}
