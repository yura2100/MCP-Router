import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/navbar"
import {getServerSession} from "@/lib/supabase/auth/get-server-session";
import {QueryProvider} from "@/lib/query/query-provider";
import './globals.css'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MCP Router - Manage Your Model Context Protocol Servers",
  description: "A SaaS solution to proxy and manage MCP servers",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <QueryProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <Navbar isAuthenticated={session !== null} />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster/>
        </ThemeProvider>
      </QueryProvider>
      <Analytics />
      </body>
    </html>
  )
}
