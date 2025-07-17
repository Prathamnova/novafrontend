"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Mail,
  Github,
  Twitter,
  Linkedin,
  User,
  Lightbulb,
  FlaskConical,
  BookOpen,
  Beaker,
  Atom,
  Rocket,
} from "lucide-react"
import FloatingElements from "@/components/floating-elements"
import { useAuth } from "@/hooks/use-auth"

export default function HomePage() {
  const [email, setEmail] = useState("")
  const [showThankYou, setShowThankYou] = useState(false)
  const [showBeta, setShowBeta] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [showFAQ, setShowFAQ] = useState(false)
  const { user, login, signup, logout } = useAuth()

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setShowThankYou(true)
    setEmail("")
  }

  const faqs = [
    {
      question: "🔬 What exactly does Nova do?",
      answer:
        "Nova is an AI-native platform that helps scientists simulate, design, and optimize experiments before they're conducted in the lab. It predicts molecular interactions, material behaviors, and experiment outcomes, acting like a scientific co-pilot.",
    },
    {
      question: "🧠 How is Nova different from traditional simulation tools or ChatGPT?",
      answer:
        "Simulation tools are narrow and physics aware while Nova is trained on research papers and researches even the failed ones. ChatGPT doesn't understand real-world physics, molecules, or causality. Nova is built specifically for science — it combines real experimental data, simulations, and scientific reasoning. It predicts not just answers, but the 'why' and 'what next.'",
    },
    {
      question: "📊 Do I need coding or AI knowledge to use Nova?",
      answer:
        "No. Nova is built to be intuitive. You describe your hypothesis or experimental goal in plain language, and Nova helps design, simulate, and suggest next steps — like a collaborator who never sleeps.",
    },
    {
      question: "🔐 Is my research data safe with Nova?",
      answer:
        "Absolutely. We take data privacy and IP protection seriously. Your research is encrypted and not used to train public models. Enterprise or offline deployment options are available for sensitive labs, students, teachers and hobbyists.",
    },
    {
      question: "💡 Who should use Nova?",
      answer:
        "Scientists designing complex experiments. Deep tech startups working in bio, chemistry, Physics, materials, or energy. R&D teams in labs and universities aiming to save time and money.",
    },
    {
      question: "🧭 What's the big picture?",
      answer:
        "We believe AI shouldn't just write papers — it should power discoveries. Nova is building a future where asking 'what if' takes seconds, and the next scientific revolution is just a simulation away.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <FloatingElements />

      {/* Header */}
      <header className="relative z-50 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          NOVA
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Button
            variant="ghost"
            onClick={() => setShowFAQ(true)}
            className="text-gray-300 hover:text-cyan-400 transition-colors"
          >
            FAQs
          </Button>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black bg-transparent flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>{user.username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
                <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="hover:bg-gray-800 cursor-pointer text-red-400">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                onClick={() => setShowLogin(true)}
                variant="outline"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black bg-transparent"
              >
                Log In
              </Button>
              <Button
                onClick={() => setShowSignup(true)}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-6 max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          NOVA
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl leading-relaxed">
          A superintelligent OS where anyone can ideate, simulate, prototype and publish their innovation and scientific
          discovery - from a scientist to a student
        </p>

        <div className="flex flex-col sm:flex-row gap-6 mb-16">
          <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email for updates"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400 backdrop-blur-sm"
              required
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 px-8"
            >
              Join Waitlist
            </Button>
          </form>

          <Button
            onClick={() => setShowBeta(true)}
            variant="outline"
            className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 bg-transparent"
          >
            Try Beta
          </Button>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Features
          </h2>
          <p className="text-gray-400 text-lg">Discover what makes Nova your perfect scientific companion</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Ideate with Nova</h3>
              <p className="text-gray-300 leading-relaxed">
                Ideate with Nova as if it is your science buddy and you both are discussing over a problem or a new
                innovation
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                  <Beaker className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">Simulate & Experiment</h3>
              <p className="text-gray-300 leading-relaxed">
                Simulate your idea if how would they work in real life and ask "What if?" questions, change them and see
                if how they work in different conditions
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-green-400">Publish & Learn</h3>
              <p className="text-gray-300 leading-relaxed">
                Publish your research and Nova learns it and quick start the R&D with Nova
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-gray-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-cyan-400">Contact</h3>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>hello@nova.science</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-cyan-400">Social Links</h3>
              <div className="flex space-x-4">
                <Github className="w-5 h-5 text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors" />
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-cyan-400">Legal</h3>
              <div className="space-y-2">
                <div className="text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors">Privacy Policy</div>
                <div className="text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors">
                  Terms of Service
                </div>
              </div>
            </div>

            <div>
              <p className="text-gray-400 italic">"Backed by science. Powered by imagination."</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Thank You Modal */}
      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent className="bg-gray-900 border-cyan-400 text-white max-w-md">
          <div className="text-center py-8">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
                <Rocket className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Thank you for your time
            </h2>
            <p className="text-gray-300 text-lg">Cool updates are on the way! 🚀</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Beta Modal */}
      <Dialog open={showBeta} onOpenChange={setShowBeta}>
        <DialogContent className="bg-gray-900 border-cyan-400 text-white max-w-6xl h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Try Nova Beta
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardContent className="p-4 h-full">
                <Button
                  onClick={() => window.open("https://novasciences.vercel.app/", "_blank")}
                  className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-lg font-semibold flex flex-col items-center justify-center space-y-2"
                >
                  <Atom className="w-12 h-12" />
                  <span>Nova Sciences</span>
                  <span className="text-sm opacity-80">General Scientific Research</span>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardContent className="p-4 h-full">
                <Button
                  onClick={() => window.open("https://novabio.vercel.app/", "_blank")}
                  className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-lg font-semibold flex flex-col items-center justify-center space-y-2"
                >
                  <FlaskConical className="w-12 h-12" />
                  <span>Nova Bio</span>
                  <span className="text-sm opacity-80">Biological Research & Analysis</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Login Modal */}
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent className="bg-gray-900 border-cyan-400 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Log In to Nova
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const username = formData.get("username") as string
              login(username)
              setShowLogin(false)
            }}
            className="space-y-4"
          >
            <Input
              name="username"
              placeholder="Enter your username"
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
            <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-purple-600">
              Log In
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Signup Modal */}
      <Dialog open={showSignup} onOpenChange={setShowSignup}>
        <DialogContent className="bg-gray-900 border-cyan-400 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Create Nova Account
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const username = formData.get("username") as string
              signup(username)
              setShowSignup(false)
            }}
            className="space-y-4"
          >
            <Input
              name="username"
              placeholder="Choose a username"
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
            <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-purple-600">
              Sign Up
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* FAQ Modal */}
      <Dialog open={showFAQ} onOpenChange={setShowFAQ}>
        <DialogContent className="bg-gray-900 border-cyan-400 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </DialogTitle>
          </DialogHeader>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-gray-700">
                <AccordionTrigger className="text-left text-cyan-400 hover:text-cyan-300">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </DialogContent>
      </Dialog>
    </div>
  )
}
