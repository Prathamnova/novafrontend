"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "login" | "signup"
}

export default function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Track authentication attempt as new visitor
    if (typeof window !== "undefined" && (window as any).trackUserAction) {
      ;(window as any).trackUserAction("auth_attempt", {
        mode,
        username: username,
        username_length: username.length,
        has_password: password.length > 0,
        password_length: password.length,
        passwords_match: mode === "signup" ? password === confirmPassword : true,
        form_completion_time: Date.now(),
        attempt_timestamp: new Date().toISOString(),
        action_type: "authentication",
      })
    }

    // Simulate successful login/signup and track as new visitor
    if (typeof window !== "undefined" && (window as any).trackUserAction) {
      ;(window as any).trackUserAction("auth_success", {
        mode,
        username: username,
        user_type: mode === "signup" ? "new_user" : "returning_user",
        success_timestamp: new Date().toISOString(),
        action_type: "conversion",
      })
    }

    console.log("✅ Auth Success (New Visitor):", { username, mode })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {mode === "login" ? "Welcome Back" : "Join Nova"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white"
              required
            />
          </div>
          {mode === "signup" && (
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {mode === "login" ? "Log In" : "Sign Up"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
