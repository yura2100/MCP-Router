"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Layers, Settings, LogOut, LayoutDashboard } from "lucide-react"
import {useSignOutMutation} from "@/app/auth/_hooks/use-sign-out-mutation";

type NavbarProps = {
  isAuthenticated: boolean;
};

export function Navbar({ isAuthenticated }: NavbarProps) {
  const pathname = usePathname();
  const { mutate } = useSignOutMutation();

  // Split navigation items into public and private
  const publicNavItems = [
    {
      name: "MCP Servers",
      href: "/servers",
      icon: <Layers className="h-4 w-4 mr-2" />,
    },
  ]

  const privateNavItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Layers className="h-6 w-6" />
            <span className="font-bold">MCP Router</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            {/* Public nav items - visible to all users */}
            {publicNavItems.map((item) => (
              <Button key={item.href} variant={pathname === item.href ? "default" : "ghost"} size="sm" asChild>
                <Link href={item.href} className="flex items-center">
                  {item.icon}
                  {item.name}
                </Link>
              </Button>
            ))}

            {/* Private nav items - only visible to authenticated users */}
            {isAuthenticated &&
              privateNavItems.map((item) => (
                <Button key={item.href} variant={pathname === item.href ? "default" : "ghost"} size="sm" asChild>
                  <Link href={item.href} className="flex items-center">
                    {item.icon}
                    {item.name}
                  </Link>
                </Button>
              ))}
          </nav>
          <div className="flex items-center space-x-2">
            <ModeToggle />
            {isAuthenticated ? (
              <Button variant="outline" size="sm" onClick={() => mutate()} className="flex items-center">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link href="/auth">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

