"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink, FlaskConical, Dna } from "lucide-react"

interface BetaModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function BetaModal({ isOpen, onClose }: BetaModalProps) {
  const handleRedirect = (url: string) => {
    window.open(url, "_blank")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Choose Your Nova Experience
          </DialogTitle>
          <p className="text-center text-gray-300 mb-8">Select which Nova platform you'd like to explore</p>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 py-6">
          {/* Nova Sciences Button */}
          <div className="group">
            <Button
              onClick={() => handleRedirect("https://novasciences.vercel.app/")}
              className="w-full h-auto p-8 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 hover:from-blue-600/30 hover:to-cyan-600/30 border-2 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 flex flex-col items-center space-y-4 group-hover:scale-105"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mb-2">
                <FlaskConical className="w-8 h-8 text-white" />
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Nova Sciences</h3>
                <p className="text-sm text-gray-300 mb-4">General scientific research and experimentation platform</p>
                <div className="flex items-center justify-center space-x-2 text-blue-400">
                  <span className="text-sm font-medium">Launch Platform</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </Button>
          </div>

          {/* Nova Bio Button */}
          <div className="group">
            <Button
              onClick={() => handleRedirect("https://novabio.vercel.app/")}
              className="w-full h-auto p-8 bg-gradient-to-br from-green-600/20 to-emerald-600/20 hover:from-green-600/30 hover:to-emerald-600/30 border-2 border-green-500/30 hover:border-green-400/50 transition-all duration-300 flex flex-col items-center space-y-4 group-hover:scale-105"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-2">
                <Dna className="w-8 h-8 text-white" />
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Nova Bio</h3>
                <p className="text-sm text-gray-300 mb-4">Specialized biological research and molecular simulation</p>
                <div className="flex items-center justify-center space-x-2 text-green-400">
                  <span className="text-sm font-medium">Launch Platform</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </Button>
          </div>
        </div>

        <div className="text-center mt-6 pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-400">Both platforms are currently in beta. Your feedback helps us improve!</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
