import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Nova - Superintelligent Scientific OS",
  description:
    "A superintelligent OS where anyone can ideate, simulate, prototype and publish their innovation and scientific discovery - from a scientist to a student",
  generator: "Nova Sciences",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          {children}
          <SpeedInsights />
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
