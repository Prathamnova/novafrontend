import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/hooks/use-auth"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"
import { AnalyticsProvider } from "@/hooks/use-analytics"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nova - Superintelligent OS for Scientific Discovery",
  description:
    "A superintelligent OS where anyone can ideate, simulate, prototype and publish their innovation and scientific discovery - from a scientist to a student.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnalyticsProvider>
          <AuthProvider>
            <Suspense fallback={<div>Loading...</div>}>
              {children}
              <Analytics />
            </Suspense>
          </AuthProvider>
        </AnalyticsProvider>
      </body>
    </html>
  )
}
