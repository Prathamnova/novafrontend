"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { track } from "@vercel/analytics"

interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
}

// Enhanced analytics tracker for comprehensive user monitoring
export default function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page views with detailed information
    const pageViewData = {
      path: pathname,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      referrer: document.referrer || "direct",
      session_id: getSessionId(),
    }

    // Track with Vercel Analytics
    track("page_view", pageViewData)

    // Also send to custom endpoint for detailed logging
    sendToCustomAnalytics("page_view", pageViewData)
  }, [pathname])

  const trackEvent = (event: string, properties?: Record<string, any>) => {
    if (typeof window !== "undefined") {
      const eventData: AnalyticsEvent = {
        event,
        properties: {
          ...properties,
          session_id: getSessionId(),
          timestamp: new Date().toISOString(),
          page_url: window.location.href,
          user_agent: navigator.userAgent,
        },
      }

      // Send to Vercel Analytics
      track(event, eventData.properties)

      // Send to custom analytics endpoint
      sendToCustomAnalytics(event, eventData.properties)

      // Log to console for development
      console.log("📊 Analytics Event:", eventData)
    }
  }

  const sendToCustomAnalytics = async (event: string, properties?: Record<string, any>) => {
    try {
      // Send to your custom analytics endpoint
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

  const getSessionId = () => {
    let sessionId = sessionStorage.getItem("nova_session_id")
    if (!sessionId) {
      sessionId = `nova_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem("nova_session_id", sessionId)
    }
    return sessionId
  }

  const getUserFingerprint = () => {
    // Create a basic fingerprint for user identification
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    ctx?.fillText("Nova Analytics", 0, 0)
    const fingerprint = canvas.toDataURL()

    return btoa(
      navigator.userAgent +
        navigator.language +
        screen.width +
        screen.height +
        new Date().getTimezoneOffset() +
        fingerprint,
    ).substring(0, 32)
  }

  // Enhanced tracking function with user fingerprinting
  const trackUserAction = (action: string, data?: Record<string, any>) => {
    const enrichedData = {
      ...data,
      user_fingerprint: getUserFingerprint(),
      session_duration: Date.now() - Number.parseInt(sessionStorage.getItem("session_start") || "0"),
      page_views_in_session: Number.parseInt(sessionStorage.getItem("page_views") || "0") + 1,
    }

    trackEvent(action, enrichedData)
  }

  // Set up session tracking
  useEffect(() => {
    if (!sessionStorage.getItem("session_start")) {
      sessionStorage.setItem("session_start", Date.now().toString())
    }

    const currentPageViews = Number.parseInt(sessionStorage.getItem("page_views") || "0")
    sessionStorage.setItem("page_views", (currentPageViews + 1).toString())
  }, [])

  // Expose tracking functions globally
  useEffect(() => {
    if (typeof window !== "undefined") {
      ;(window as any).trackNovaEvent = trackEvent
      ;(window as any).trackUserAction = trackUserAction
    }
  }, [])

  return null
}
