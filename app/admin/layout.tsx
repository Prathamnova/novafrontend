import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nova Admin Dashboard",
  description: "Analytics dashboard for Nova website",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
