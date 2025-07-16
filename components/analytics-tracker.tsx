"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { track } from "@vercel/analytics"

interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
}

// Analytics tracker that treats every view as a new visitor
export default function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Create a new unique visitor ID for every single page view
    const newVisitorId = generateNewVisitorId()

    const pageViewData = {
      path: pathname,
      timestamp: new Date().toISOString(),
      visitor_id: newVisitorId, // Always new for each view
      visitor_type: "new_visitor", // Every view is a new visitor
      session_id: newVisitorId, // Use same ID as visitor for simplicity
      page_sequence: 1, // Always 1 since each view is a new visitor
    }

    // Track with Vercel Analytics
    track("page_view", pageViewData)

    // Send to custom analytics endpoint
    sendToCustomAnalytics("page_view", pageViewData)
  }, [pathname])

  const generateNewVisitorId = () => {
    // Generate a completely new visitor ID for every page view
    return `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 12)}`
  }

  const trackEvent = (event: string, properties?: Record<string, any>) => {
    if (typeof window !== "undefined") {
      // Create new visitor ID for every event
      const newVisitorId = generateNewVisitorId()

      const eventData: AnalyticsEvent = {
        event,
        properties: {
          ...properties,
          visitor_id: newVisitorId, // Always new visitor
          visitor_type: "new_visitor",
          session_id: newVisitorId,
          timestamp: new Date().toISOString(),
          page_url: window.location.href,
        },
      }

      // Send to Vercel Analytics
      track(event, eventData.properties)

      // Send to custom analytics endpoint
      sendToCustomAnalytics(event, eventData.properties)

      // Log to console for development
      console.log("📊 Analytics Event (New Visitor):", eventData)
    }
  }

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

  // Enhanced tracking function - each action creates a new visitor
  const trackUserAction = (action: string, data?: Record<string, any>) => {
    const newVisitorId = generateNewVisitorId()

    const enrichedData = {
      ...data,
      visitor_id: newVisitorId, // New visitor for every action
      visitor_type: "new_visitor",
      session_id: newVisitorId,
      action_timestamp: new Date().toISOString(),
      is_unique_action: true, // Every action is unique since every visitor is new
    }

    trackEvent(action, enrichedData)
  }

  // Expose tracking functions globally
  useEffect(() => {
    if (typeof window !== "undefined") {
      ;(window as any).trackNovaEvent = trackEvent
      ;(window as any).trackUserAction = trackUserAction
    }
  }, [])

  return null
}
