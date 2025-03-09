import { HeroSection } from "./_components/hero-section"
import { McpInfoSection } from "./_components/mcp-info-section"
import { PricingSection } from "./_components/pricing-section"
import { SiteFooter } from "./_components/site-footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <HeroSection />
      <McpInfoSection />
      <PricingSection />
      <SiteFooter />
    </div>
  )
}

