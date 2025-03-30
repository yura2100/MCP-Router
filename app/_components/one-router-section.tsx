import { LayoutDashboard, Layers, Folder, Settings, BatteryFull, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { TextAnimate } from "@/components/magicui/text-animate";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import {Vercel} from "@/components/icons/vercel";
import {AWS} from "@/components/icons/aws";
import {Google} from "@/components/icons/google";
import {Linear} from "@/components/icons/linear";
import {Notion} from "@/components/icons/notion";
import {Supabase} from "@/components/icons/supabase";

const features = [
  {
    Icon: Layers,
    name: "More Than 100 Integrations",
    description: "Get access to most popular MCP servers",
    href: "/servers",
    cta: "Browse Integrations",
    background: (
      <div className="absolute top-8 lg:top-4 flex h-[16rem] w-full flex-col items-center justify-center overflow-hidden">
        <OrbitingCircles iconSize={44} radius={100} duration={60}>
          <AWS className="size-6" />
          <Notion className="size-6" />
          <Google className="size-6" />
          <Supabase className="size-6" />
          <Vercel className="size-6" />
          <Linear className="size-6" />
        </OrbitingCircles>
      </div>
    ),
    className: "col-span-3 lg:col-span-1 row-span-2",
  },
  {
    Icon: LayoutDashboard,
    name: "Centralized Management",
    description: "Control all your MCP servers from a single place",
    href: "/dashboard",
    cta: "Launch Dashboard",
    background: <div />,
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: Folder,
    name: "Workspaces",
    description: "Switch between workspaces for different projects",
    href: "/dashboard",
    cta: "Create Workspace",
    background: <div />,
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: Settings,
    name: "No-Code Setup",
    description: "Start and configure MCP servers in few clicks",
    href: "/dashboard",
    cta: "Get Started",
    background: <div />,
    className: "col-span-3 lg:col-span-2",
  },
  {
    Icon: Zap,
    name: "Hybrid Execution",
    description: "Run isolated MCP servers locally or on our fully managed infrastructure",
    href: "/dashboard",
    cta: "Learn More",
    background: <div />,
    className: "col-span-3 lg:col-span-2",
  },
  {
    Icon: BatteryFull,
    name: "Batteries Included",
    description: "Access control, observability, and more",
    href: "/dashboard",
    cta: "Learn More",
    background: <div />,
    className: "col-span-3 lg:col-span-1",
  },
];

export function OneRouterSection() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-4">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-10">
          <div className="space-y-3 text-center max-w-[800px]">
            <TextAnimate className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl" delay={0.2}>One Router To Rule Them All</TextAnimate>
            <p className="text-muted-foreground md:text-xl">
              Access hosted MCP servers and run isolated instances with ergonomic setup
            </p>
          </div>

          <BentoGrid className="lg:grid-rows-3">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </div>

        <div className="h-20"/>
      </div>
    </section>
  )
}
