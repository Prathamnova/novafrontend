"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Eye, Users, Calendar, Globe, Download, BarChart3, TrendingUp, Clock, Shield } from "lucide-react"

const ADMIN_PASSWORD = "nova2024admin" // Change this to your secure password

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [analytics, setAnalytics] = useState({ views: 0, visitors: 0 })
  const [viewEvents, setViewEvents] = useState<any[]>([])
  const [showLogin, setShowLogin] = useState(true)

  useEffect(() => {
    // Check if already authenticated
    const authStatus = localStorage.getItem("nova-admin-auth")
    if (authStatus === "authenticated") {
      setIsAuthenticated(true)
      setShowLogin(false)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      // Update analytics data every 2 seconds
      const interval = setInterval(() => {
        const analyticsData = JSON.parse(localStorage.getItem("nova-analytics") || '{"views": 0, "visitors": 0}')
        const events = JSON.parse(localStorage.getItem("nova-view-events") || "[]")
        setAnalytics(analyticsData)
        setViewEvents(events)
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setShowLogin(false)
      localStorage.setItem("nova-admin-auth", "authenticated")
    } else {
      alert("Invalid password")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setShowLogin(true)
    localStorage.removeItem("nova-admin-auth")
    setPassword("")
  }

  const exportData = () => {
    const data = {
      analytics,
      events: viewEvents,
      exportedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `nova-analytics-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearData = () => {
    if (confirm("Are you sure you want to clear all analytics data? This cannot be undone.")) {
      localStorage.removeItem("nova-analytics")
      localStorage.removeItem("nova-view-events")
      setAnalytics({ views: 0, visitors: 0 })
      setViewEvents([])
    }
  }

  const getRecentEvents = () => {
    return viewEvents.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10)
  }

  const getTodayStats = () => {
    const today = new Date().toDateString()
    const todayEvents = viewEvents.filter((event) => new Date(event.timestamp).toDateString() === today)
    return {
      views: todayEvents.length,
      visitors: todayEvents.length, // Each view = visitor as per requirement
    }
  }

  const getTopPages = () => {
    const pageCounts = viewEvents.reduce(
      (acc, event) => {
        acc[event.page] = (acc[event.page] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(pageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Dialog open={showLogin} onOpenChange={() => {}}>
          <DialogContent className="bg-gray-900 border-cyan-400 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Admin Access Required
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
              <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-purple-600">
                Access Dashboard
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  const todayStats = getTodayStats()
  const topPages = getTopPages()

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Nova Analytics Dashboard
            </h1>
            <p className="text-gray-400 mt-2">Real-time website analytics and visitor insights</p>
          </div>
          <div className="flex space-x-4">
            <Button onClick={exportData} variant="outline" className="border-cyan-400 text-cyan-400 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button onClick={clearData} variant="outline" className="border-red-400 text-red-400 bg-transparent">
              Clear Data
            </Button>
            <Button onClick={handleLogout} variant="outline" className="border-gray-400 text-gray-400 bg-transparent">
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400 flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                Total Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-400">{analytics.views}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Total Visitors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">{analytics.visitors}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Today's Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{todayStats.views}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Today's Visitors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">{todayStats.visitors}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {getRecentEvents().map((event, index) => (
                  <div key={index} className="border-b border-gray-700 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm text-white">{event.page}</div>
                        <div className="text-xs text-gray-400">{new Date(event.timestamp).toLocaleString()}</div>
                      </div>
                      <div className="text-xs text-gray-500">{event.referrer === "direct" ? "Direct" : "Referrer"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Pages */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Top Pages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPages.map(([page, count], index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="text-sm text-white">{page}</div>
                    <div className="text-sm text-cyan-400 font-mono">{count} views</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Events Table */}
        <Card className="bg-gray-900 border-gray-700 mt-6">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              All Events ({viewEvents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 text-gray-400">Timestamp</th>
                    <th className="text-left py-2 text-gray-400">Page</th>
                    <th className="text-left py-2 text-gray-400">Referrer</th>
                    <th className="text-left py-2 text-gray-400">User Agent</th>
                  </tr>
                </thead>
                <tbody className="max-h-64 overflow-y-auto">
                  {viewEvents
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .slice(0, 50)
                    .map((event, index) => (
                      <tr key={index} className="border-b border-gray-800">
                        <td className="py-2 text-gray-300">{new Date(event.timestamp).toLocaleString()}</td>
                        <td className="py-2 text-white">{event.page}</td>
                        <td className="py-2 text-gray-400">
                          {event.referrer === "direct" ? "Direct" : event.referrer}
                        </td>
                        <td className="py-2 text-gray-500 truncate max-w-xs">{event.userAgent.substring(0, 50)}...</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
