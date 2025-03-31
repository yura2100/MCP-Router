import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/navbar"
import {getServerSession} from "@/lib/supabase/auth/get-server-session";
import {QueryProvider} from "@/lib/query/query-provider";
import './globals.css'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  applicationName: "MCP Router",
  title: "MCP Router | Effortless AI Integrations",
  description: "Streamline AI workflows with MCP Router — no technical setup required. We manage MCP servers, provide seamless configuration, and offer centralized control.",
  openGraph: {
    siteName: "MCP Router",
    type: "website",
    url: "https://mcp-router.com",
  },
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
        <SpeedInsights />
      </body>
    </html>
  )
}
