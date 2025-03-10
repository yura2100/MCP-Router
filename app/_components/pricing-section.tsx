import { Button } from "@/components/ui/button"
import {Check, Plus} from "lucide-react";

export function PricingSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that's right for you and start connecting your AI tools to your data.
            </p>
          </div>

          <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {/* Free Plan */}
            <div className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Free</h3>
                <div className="text-4xl font-bold">
                  $0<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground">Perfect for individuals just getting started with MCP</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    Up to 3 integrations
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    Basic authentication
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    Community support
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <Plus className="mr-2 h-4 w-4 rotate-45" />
                    Advanced security features
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <Plus className="mr-2 h-4 w-4 rotate-45" />
                    Usage analytics
                  </li>
                </ul>
              </div>
              <Button className="mt-6" variant="outline">
                Get Started
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="relative flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm">
              <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Popular
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Pro</h3>
                <div className="text-4xl font-bold">
                  $19<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground">For professionals and small teams</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    Unlimited integrations
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    Advanced authentication
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    Email support
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    Advanced security features
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    Basic usage analytics
                  </li>
                </ul>
              </div>
              <Button className="mt-6">Get Started</Button>
            </div>

            {/* Enterprise Plan */}
            <div className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Enterprise</h3>
                <div className="text-4xl font-bold">Custom</div>
                <p className="text-muted-foreground">For organizations with advanced needs</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    Unlimited integrations
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    SSO & SAML authentication
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    Dedicated support
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    Enterprise-grade security
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    Advanced analytics & reporting
                  </li>
                </ul>
              </div>
              <Button className="mt-6" variant="outline">
                Contact Sales
              </Button>
            </div>
          </div>

          <div className="mt-10 text-center text-sm text-muted-foreground">
            Need a custom plan?{" "}
            <a href="#" className="font-medium text-primary underline underline-offset-4">
              Contact us
            </a>{" "}
            for more information.
          </div>
        </div>
      </div>
    </section>
  )
}

