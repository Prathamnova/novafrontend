"use client"

import { createContext, useContext, useEffect, type ReactNode } from "react"

interface AnalyticsContextType {
  trackView: () => void
  getAnalytics: () => { views: number; visitors: number }
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const trackView = () => {
    // Get current analytics data
    const analytics = JSON.parse(localStorage.getItem("nova-analytics") || '{"views": 0, "visitors": 0}')

    // Increment both views and visitors (each view = new visitor as requested)
    analytics.views += 1
    analytics.visitors += 1

    // Store updated analytics
    localStorage.setItem("nova-analytics", JSON.stringify(analytics))

    // Also track individual view events
    const viewEvents = JSON.parse(localStorage.getItem("nova-view-events") || "[]")
    viewEvents.push({
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      referrer: document.referrer || "direct",
    })
    localStorage.setItem("nova-view-events", JSON.stringify(viewEvents))
  }

  const getAnalytics = () => {
    return JSON.parse(localStorage.getItem("nova-analytics") || '{"views": 0, "visitors": 0}')
  }

  // Track view on mount and route changes
  useEffect(() => {
    trackView()

    // Track route changes for SPA navigation
    const handleRouteChange = () => {
      setTimeout(trackView, 100) // Small delay to ensure route has changed
    }

    // Listen for popstate (back/forward navigation)
    window.addEventListener("popstate", handleRouteChange)

    // Listen for pushstate/replacestate (programmatic navigation)
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    history.pushState = (...args) => {
      originalPushState.apply(history, args)
      handleRouteChange()
    }

    history.replaceState = (...args) => {
      originalReplaceState.apply(history, args)
      handleRouteChange()
    }

    return () => {
      window.removeEventListener("popstate", handleRouteChange)
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
    }
  }, [])

  return <AnalyticsContext.Provider value={{ trackView, getAnalytics }}>{children}</AnalyticsContext.Provider>
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider")
  }
  return context
}
