"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Menu, X, Mail, Github, Twitter, Linkedin, Zap, FlaskConical, Atom } from "lucide-react"
import FloatingElements from "@/components/floating-elements"
import AuthModal from "@/components/auth-modal"
import BetaModal from "@/components/beta-modal"
import AnalyticsTracker from "@/components/analytics-tracker"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showWaitlistSuccess, setShowWaitlistSuccess] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showBetaModal, setShowBetaModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [email, setEmail] = useState("")

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Track waitlist signup as new visitor
      if (typeof window !== "undefined" && (window as any).trackUserAction) {
        ;(window as any).trackUserAction("waitlist_signup", {
          email: email,
          email_domain: email.split("@")[1],
          source: "hero_section",
          form_completion_time: Date.now(),
          email_length: email.length,
          is_business_email: email.includes(".com") || email.includes(".org") || email.includes(".edu"),
          action_type: "conversion",
        })
      }
      setShowWaitlistSuccess(true)
      setEmail("")
    }
  }

  const handleAuthClick = (mode: "login" | "signup") => {
    // Track auth modal open as new visitor
    if (typeof window !== "undefined" && (window as any).trackUserAction) {
      ;(window as any).trackUserAction("auth_modal_open", {
        mode,
        source: "header",
        button_location: "desktop",
        action_type: "engagement",
      })
    }
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const scrollToSection = (sectionId: string) => {
    // Track navigation as new visitor
    if (typeof window !== "undefined" && (window as any).trackUserAction) {
      ;(window as any).trackUserAction("navigation_click", {
        section: sectionId,
        source: "header",
        scroll_position: window.scrollY,
        viewport_height: window.innerHeight,
        action_type: "navigation",
      })
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <FloatingElements />
      <AnalyticsTracker />

      {/* Header */}
      <header className="relative z-50 px-6 py-4">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent cursor-pointer"
            onClick={() => {
              if (typeof window !== "undefined" && (window as any).trackUserAction) {
                ;(window as any).trackUserAction("logo_click", {
                  source: "header",
                  current_page: window.location.pathname,
                  action_type: "navigation",
                })
              }
            }}
          >
            NOVA
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("features")} className="hover:text-blue-400 transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection("team")} className="hover:text-blue-400 transition-colors">
              Our Team
            </button>
            <button onClick={() => scrollToSection("faq")} className="hover:text-blue-400 transition-colors">
              FAQs
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={() => handleAuthClick("login")} className="text-white hover:text-blue-400">
              Log In
            </Button>
            <Button
              onClick={() => handleAuthClick("signup")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => {
              if (typeof window !== "undefined" && (window as any).trackUserAction) {
                ;(window as any).trackUserAction("mobile_menu_toggle", {
                  action: isMenuOpen ? "close" : "open",
                  device: "mobile",
                  action_type: "interaction",
                })
              }
              setIsMenuOpen(!isMenuOpen)
            }}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-gray-800">
            <div className="px-6 py-4 space-y-4">
              <button
                onClick={() => scrollToSection("features")}
                className="block w-full text-left hover:text-blue-400 transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("team")}
                className="block w-full text-left hover:text-blue-400 transition-colors"
              >
                Our Team
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="block w-full text-left hover:text-blue-400 transition-colors"
              >
                FAQs
              </button>
              <div className="flex space-x-4 pt-4 border-t border-gray-800">
                <Button
                  variant="ghost"
                  onClick={() => handleAuthClick("login")}
                  className="text-white hover:text-blue-400"
                >
                  Log In
                </Button>
                <Button
                  onClick={() => handleAuthClick("signup")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            NOVA
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-300 leading-relaxed">
            A superintelligent OS where anyone can ideate, simulate, prototype and publish their innovation and
            scientific discovery - from a scientist to a student
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-400"
                required
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 whitespace-nowrap"
              >
                Join Waitlist
              </Button>
            </form>
          </div>

          <Button
            onClick={() => {
              // Track beta modal open as new visitor
              if (typeof window !== "undefined" && (window as any).trackUserAction) {
                ;(window as any).trackUserAction("beta_modal_open", {
                  source: "hero_cta",
                  scroll_position: window.scrollY,
                  action_type: "conversion_intent",
                })
              }
              setShowBetaModal(true)
            }}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-lg px-8 py-4"
          >
            Try Beta
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <FlaskConical className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <h3 className="text-xl font-semibold mb-3">Ideate with Nova</h3>
                <p className="text-gray-400">
                  Ideate with Nova as if it is your science buddy and you both are discussing over a problem or a new
                  innovation
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Atom className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold mb-3">Simulate & Experiment</h3>
                <p className="text-gray-400">
                  Simulate your idea if how would they work in real life and ask "What if?" questions, change them and
                  see if how they work in different conditions
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                <h3 className="text-xl font-semibold mb-3">Publish & Learn</h3>
                <p className="text-gray-400">
                  Publish your research and Nova learns it and quick start the R&D with Nova
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* CEO */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">
                  PS
                </div>
                <h3 className="text-lg font-semibold mb-1 text-white">Prathamesh Shirbhate</h3>
                <p className="text-blue-400 text-sm font-medium mb-2">CEO</p>
                <p className="text-gray-400 text-xs">Leading Nova's vision for scientific innovation</p>
              </CardContent>
            </Card>

            {/* CTO */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center text-2xl font-bold">
                  AG
                </div>
                <h3 className="text-lg font-semibold mb-1 text-white">Aditya Gole</h3>
                <p className="text-purple-400 text-sm font-medium mb-2">CTO</p>
                <p className="text-gray-400 text-xs">Architecting Nova's technical infrastructure</p>
              </CardContent>
            </Card>

            {/* AI/ML Engineer */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
                  PK
                </div>
                <h3 className="text-lg font-semibold mb-1 text-white">Pradyumna Kulkarni</h3>
                <p className="text-cyan-400 text-sm font-medium mb-2">AI/ML Engineer</p>
                <p className="text-gray-400 text-xs">Building intelligent scientific models</p>
              </CardContent>
            </Card>

            {/* PhD Chemistry */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold">
                  SS
                </div>
                <h3 className="text-lg font-semibold mb-1 text-white">Sunil Shinghade</h3>
                <p className="text-green-400 text-sm font-medium mb-2">PhD Chemistry</p>
                <p className="text-gray-400 text-xs">Chemical simulation and molecular modeling</p>
              </CardContent>
            </Card>

            {/* PhD Mathematics */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center text-2xl font-bold">
                  AH
                </div>
                <h3 className="text-lg font-semibold mb-1 text-white">Amit Hogadi</h3>
                <p className="text-orange-400 text-sm font-medium mb-2">PhD Mathematics</p>
                <p className="text-gray-400 text-xs">Mathematical modeling and algorithms</p>
              </CardContent>
            </Card>

            {/* PhD Biology */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-pink-400 to-rose-600 rounded-full flex items-center justify-center text-2xl font-bold">
                  NB
                </div>
                <h3 className="text-lg font-semibold mb-1 text-white">Nagraj Balasubramanian</h3>
                <p className="text-pink-400 text-sm font-medium mb-2">PhD Biology</p>
                <p className="text-gray-400 text-xs">Biological systems and life sciences</p>
              </CardContent>
            </Card>

            {/* PhD Physics */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">
                  AC
                </div>
                <h3 className="text-lg font-semibold mb-1 text-white">Apratim Chatterji</h3>
                <p className="text-indigo-400 text-sm font-medium mb-2">PhD Physics</p>
                <p className="text-gray-400 text-xs">Physics simulations and quantum modeling</p>
              </CardContent>
            </Card>

            {/* AI/ML Genius */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full flex items-center justify-center text-2xl font-bold">
                  PC
                </div>
                <h3 className="text-lg font-semibold mb-1 text-white">P.P. Chakrabatri</h3>
                <p className="text-yellow-400 text-sm font-medium mb-2">AI/ML Genius</p>
                <p className="text-gray-400 text-xs">IITKGP ex-dean, AI research pioneer</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-xl text-gray-300 mb-4">
              A multidisciplinary team of world-class scientists and engineers
            </p>
            <p className="text-gray-400">
              Our diverse expertise spans across physics, chemistry, biology, mathematics, and AI - united by our
              mission to accelerate scientific discovery through intelligent simulation.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-gray-900/50 border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-left">🔬 What exactly does Nova do?</AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Nova is an AI-native platform that helps scientists simulate, design, and optimize experiments before
                they're conducted in the lab. It predicts molecular interactions, material behaviors, and experiment
                outcomes, acting like a scientific co-pilot.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="bg-gray-900/50 border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-left">
                🧠 How is Nova different from traditional simulation tools or ChatGPT?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Simulation tools are narrow and physics aware while Nova is trained on research papers and researches
                even the failed ones. ChatGPT doesn't understand real-world physics, molecules, or causality. Nova is
                built specifically for science — it combines real experimental data, simulations, and scientific
                reasoning. It predicts not just answers, but the "why" and "what next."
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="bg-gray-900/50 border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-left">
                📊 Do I need coding or AI knowledge to use Nova?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                No. Nova is built to be intuitive. You describe your hypothesis or experimental goal in plain language,
                and Nova helps design, simulate, and suggest next steps — like a collaborator who never sleeps.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="bg-gray-900/50 border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-left">🔐 Is my research data safe with Nova?</AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Absolutely. We take data privacy and IP protection seriously. Your research is encrypted and not used to
                train public models. Enterprise or offline deployment options are available for sensitive labs,
                students, teachers and hobbyists.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="bg-gray-900/50 border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-left">💡 Who should use Nova?</AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Scientists designing complex experiments, deep tech startups working in bio, chemistry, physics,
                materials, or energy, and R&D teams in labs and universities aiming to save time and money.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6" className="bg-gray-900/50 border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-left">🧭 What's the big picture?</AccordionTrigger>
              <AccordionContent className="text-gray-300">
                We believe AI shouldn't just write papers — it should power discoveries. Nova is building a future where
                asking "what if" takes seconds, and the next scientific revolution is just a simulation away.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>hello@nova.com</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Social Links</h3>
              <div className="flex space-x-4">
                <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
                <Github className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <div className="text-gray-400 hover:text-white cursor-pointer">Privacy Policy</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Terms of Service</div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Mission</h3>
              <p className="text-gray-400 italic">"Backed by science. Powered by imagination."</p>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm">© 2024 Nova. All rights reserved.</div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} mode={authMode} />

      <BetaModal isOpen={showBetaModal} onClose={() => setShowBetaModal(false)} />

      {/* Waitlist Success Modal */}
      <Dialog open={showWaitlistSuccess} onOpenChange={setShowWaitlistSuccess}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Thank You! 🚀
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <div className="mb-4">
              <Atom className="w-16 h-16 mx-auto text-blue-400 animate-spin" />
            </div>
            <p className="text-lg mb-4">Thank you for your time!</p>
            <p className="text-gray-300">
              Cool updates are on the way. We'll keep you posted on our latest developments and breakthroughs.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
