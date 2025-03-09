"use client"

import {useState} from "react";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {Layers, Settings, LogOut, LayoutDashboard, X, Menu} from "lucide-react"
import {useSignOutMutation} from "@/app/auth/_hooks/use-sign-out-mutation";

type NavbarProps = {
  isAuthenticated: boolean;
};

export function Navbar({ isAuthenticated }: NavbarProps) {
  const pathname = usePathname();
  const { mutate } = useSignOutMutation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

        {/* Mobile menu button */}
        <div className="flex md:hidden ml-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex flex-1 items-center justify-between space-x-2 md:justify-end">
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

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 flex flex-col space-y-3">
            <nav className="flex flex-col space-y-2">
              {/* Public nav items - visible to all users */}
              {publicNavItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "default" : "ghost"}
                  size="sm"
                  asChild
                  className="justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href={item.href} className="flex items-center">
                    {item.icon}
                    {item.name}
                  </Link>
                </Button>
              ))}

              {/* Private nav items - only visible to authenticated users */}
              {isAuthenticated &&
                privateNavItems.map((item) => (
                  <Button
                    key={item.href}
                    variant={pathname === item.href ? "default" : "ghost"}
                    size="sm"
                    asChild
                    className="justify-start"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href={item.href} className="flex items-center">
                      {item.icon}
                      {item.name}
                    </Link>
                  </Button>
                ))}
            </nav>

            <div className="flex flex-col space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ModeToggle />
              </div>

              {isAuthenticated ? (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    mutate()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full justify-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  asChild
                  className="w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="/auth">Login</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
