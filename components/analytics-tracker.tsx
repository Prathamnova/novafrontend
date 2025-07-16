"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { track } from "@vercel/analytics"

interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
}

// Enhanced analytics tracker for username-based visitor tracking
export default function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page views with username-based visitor data
    const visitor = getCurrentVisitor()

    const pageViewData = {
      path: pathname,
      timestamp: new Date().toISOString(),
      visitor_id: visitor.id,
      visitor_type: visitor.type,
      visitor_username: visitor.username,
      session_id: getSessionId(),
      page_sequence: getPageSequence(),
    }

    // Track with Vercel Analytics
    track("page_view", pageViewData)

    // Send to custom analytics endpoint
    sendToCustomAnalytics("page_view", pageViewData)
  }, [pathname])

  const getCurrentVisitor = () => {
    // Check for logged-in user first
    const loggedInUser = sessionStorage.getItem("nova_logged_in_user")
    if (loggedInUser) {
      return {
        id: loggedInUser,
        type: "authenticated_user",
        username: loggedInUser,
      }
    }

    // Check for user who attempted login/signup
    const attemptedUser = sessionStorage.getItem("nova_attempted_user")
    if (attemptedUser) {
      return {
        id: attemptedUser,
        type: "attempted_user",
        username: attemptedUser,
      }
    }

    // Check for waitlist user
    const waitlistUser = sessionStorage.getItem("nova_waitlist_user")
    if (waitlistUser) {
      return {
        id: waitlistUser,
        type: "waitlist_user",
        username: waitlistUser, // Using email as username for waitlist users
      }
    }

    // Anonymous visitor
    const anonymousId = getAnonymousVisitorId()
    return {
      id: anonymousId,
      type: "anonymous_visitor",
      username: null,
    }
  }

  const getAnonymousVisitorId = () => {
    let visitorId = sessionStorage.getItem("nova_anonymous_visitor")
    if (!visitorId) {
      visitorId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`
      sessionStorage.setItem("nova_anonymous_visitor", visitorId)
    }
    return visitorId
  }

  const getPageSequence = () => {
    const sequence = Number.parseInt(sessionStorage.getItem("page_sequence") || "0") + 1
    sessionStorage.setItem("page_sequence", sequence.toString())
    return sequence
  }

  const trackEvent = (event: string, properties?: Record<string, any>) => {
    if (typeof window !== "undefined") {
      const visitor = getCurrentVisitor()

      const eventData: AnalyticsEvent = {
        event,
        properties: {
          ...properties,
          visitor_id: visitor.id,
          visitor_type: visitor.type,
          visitor_username: visitor.username,
          session_id: getSessionId(),
          timestamp: new Date().toISOString(),
          page_url: window.location.href,
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
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem("nova_session_id", sessionId)
    }
    return sessionId
  }

  // Enhanced tracking function with username-based visitor identification
  const trackUserAction = (action: string, data?: Record<string, any>) => {
    const visitor = getCurrentVisitor()

    const enrichedData = {
      ...data,
      visitor_id: visitor.id,
      visitor_type: visitor.type,
      visitor_username: visitor.username,
      session_duration: Date.now() - Number.parseInt(sessionStorage.getItem("session_start") || "0"),
      page_views_in_session: Number.parseInt(sessionStorage.getItem("page_sequence") || "0"),
    }

    // Store user data based on action type
    if (action === "auth_attempt" && data?.username) {
      sessionStorage.setItem("nova_attempted_user", data.username)
    }

    if (action === "auth_success" && data?.username) {
      sessionStorage.setItem("nova_logged_in_user", data.username)
    }

    if (action === "waitlist_signup" && data?.email) {
      sessionStorage.setItem("nova_waitlist_user", data.email)
    }

    trackEvent(action, enrichedData)
  }

  // Set up session tracking
  useEffect(() => {
    if (!sessionStorage.getItem("session_start")) {
      sessionStorage.setItem("session_start", Date.now().toString())
    }
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
