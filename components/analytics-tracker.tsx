"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { track } from "@vercel/analytics"

// Simplified analytics tracker for page views and bounce rate only
export default function AnalyticsTracker() {
  const pathname = usePathname()
  const [sessionStartTime] = useState(Date.now())
  const [pageViewCount, setPageViewCount] = useState(0)

  useEffect(() => {
    // Track page view
    const pageViewData = {
      path: pathname,
      timestamp: new Date().toISOString(),
    }

    // Increment page view count for bounce rate calculation
    setPageViewCount((prev) => prev + 1)

    // Track with Vercel Analytics
    track("page_view", pageViewData)

    // Send to custom analytics endpoint
    sendToCustomAnalytics("page_view", pageViewData)
  }, [pathname])

  useEffect(() => {
    // Track bounce rate when user leaves or after timeout
    const handleBeforeUnload = () => {
      const timeOnSite = Date.now() - sessionStartTime
      const bounced = pageViewCount <= 1 && timeOnSite < 30000 // Less than 30 seconds on single page

      if (bounced) {
        const bounceData = {
          bounced: true,
          time_on_site: timeOnSite,
          pages_viewed: pageViewCount,
          timestamp: new Date().toISOString(),
        }

        // Track bounce
        track("bounce", bounceData)
        sendToCustomAnalytics("bounce", bounceData)
      }
    }

    // Track bounce on page unload
    window.addEventListener("beforeunload", handleBeforeUnload)

    // Track bounce after 30 seconds if still on single page
    const bounceTimer = setTimeout(() => {
      if (pageViewCount === 1) {
        const bounceData = {
          bounced: true,
          time_on_site: 30000,
          pages_viewed: 1,
          timestamp: new Date().toISOString(),
        }

        track("bounce", bounceData)
        sendToCustomAnalytics("bounce", bounceData)
      }
    }, 30000)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      clearTimeout(bounceTimer)
    }
  }, [sessionStartTime, pageViewCount])

  const sendToCustomAnalytics = async (event: string, properties?: Record<string, any>) => {
    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event,
          properties,
          timestamp: new Date().toISOString(),
        }),
      })
    } catch (error) {
      console.error("Failed to send custom analytics:", error)
    }
  }

  return null
}
