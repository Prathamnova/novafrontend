"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  username: string
}

interface AuthContextType {
  user: User | null
  login: (username: string) => void
  signup: (username: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem("nova-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (username: string) => {
    const userData = { username }
    setUser(userData)
    localStorage.setItem("nova-user", JSON.stringify(userData))

    // Track visit
    trackVisit(username)
  }

  const signup = (username: string) => {
    const userData = { username }
    setUser(userData)
    localStorage.setItem("nova-user", JSON.stringify(userData))

    // Track visit
    trackVisit(username)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("nova-user")
  }

  const trackVisit = (username: string) => {
    // Track each visit as a new visitor based on username
    const visits = JSON.parse(localStorage.getItem("nova-visits") || "[]")
    visits.push({
      username,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
    })
    localStorage.setItem("nova-visits", JSON.stringify(visits))
  }

  // Track visits for existing users
  useEffect(() => {
    if (user) {
      trackVisit(user.username)
    }
  }, [user])

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
