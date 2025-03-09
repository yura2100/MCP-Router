import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Legal - MCP Router",
  description: "Legal information for MCP Router",
}

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-8">{children}</div>
    </div>
  )
}

