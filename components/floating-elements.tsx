"use client"

import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  z: number
  size: number
  speed: number
  type: "dna" | "atom" | "satellite" | "molecule" | "cell" | "planet"
  rotation: { x: number; y: number; z: number }
  rotationSpeed: { x: number; y: number; z: number }
  opacity: number
}

export default function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const createElements = () => {
      const newElements: FloatingElement[] = []
      const types: FloatingElement["type"][] = ["dna", "atom", "satellite", "molecule", "cell", "planet"]

      for (let i = 0; i < 20; i++) {
        newElements.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          z: Math.random() * 1000,
          size: Math.random() * 50 + 40,
          speed: Math.random() * 0.8 + 0.3,
          type: types[Math.floor(Math.random() * types.length)],
          rotation: {
            x: Math.random() * 360,
            y: Math.random() * 360,
            z: Math.random() * 360,
          },
          rotationSpeed: {
            x: Math.random() * 3 - 1.5,
            y: Math.random() * 3 - 1.5,
            z: Math.random() * 3 - 1.5,
          },
          opacity: Math.random() * 0.4 + 0.4,
        })
      }
      setElements(newElements)
    }

    createElements()
    window.addEventListener("resize", createElements)
    return () => window.removeEventListener("resize", createElements)
  }, [])

  useEffect(() => {
    const animate = () => {
      setElements((prev) =>
        prev.map((element) => ({
          ...element,
          y: element.y <= -100 ? window.innerHeight + 100 : element.y - element.speed,
          rotation: {
            x: element.rotation.x + element.rotationSpeed.x,
            y: element.rotation.y + element.rotationSpeed.y,
            z: element.rotation.z + element.rotationSpeed.z,
          },
        })),
      )
    }

    const interval = setInterval(animate, 50)
    return () => clearInterval(interval)
  }, [])

  const renderElement = (element: FloatingElement) => {
    const style = {
      position: "absolute" as const,
      left: element.x,
      top: element.y,
      width: element.size,
      height: element.size,
      transform: `translate3d(0, 0, ${element.z}px) rotateX(${element.rotation.x}deg) rotateY(${element.rotation.y}deg) rotateZ(${element.rotation.z}deg)`,
      opacity: element.opacity,
      pointerEvents: "none" as const,
      transformStyle: "preserve-3d" as const,
    }

    switch (element.type) {
      case "dna":
        return (
          <div key={element.id} style={style} className="text-blue-400">
            <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
              {/* DNA Double Helix Structure */}
              <div className="absolute inset-0">
                {/* Outer glow */}
                <div className="absolute inset-0 bg-gradient-radial from-blue-400/30 to-transparent rounded-full blur-lg"></div>

                {/* Main helix structure */}
                <div className="relative w-full h-full">
                  {/* Left strand */}
                  <div
                    className="absolute left-2 top-0 w-2 h-full bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500 rounded-full shadow-lg transform rotate-12"
                    style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                  ></div>

                  {/* Right strand */}
                  <div
                    className="absolute right-2 top-0 w-2 h-full bg-gradient-to-b from-cyan-300 via-cyan-400 to-cyan-500 rounded-full shadow-lg transform -rotate-12"
                    style={{ boxShadow: "0 0 20px rgba(34, 211, 238, 0.5)" }}
                  ></div>

                  {/* Base pairs */}
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-6 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 shadow-md transform rotate-${i * 45}`}
                      style={{
                        top: `${20 + i * 15}%`,
                        left: "50%",
                        transform: `translateX(-50%) rotateZ(${i * 45}deg)`,
                        boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      case "atom":
        return (
          <div key={element.id} style={style} className="text-purple-400">
            <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
              {/* Outer glow */}
              <div className="absolute inset-0 bg-gradient-radial from-purple-400/30 to-transparent rounded-full blur-lg"></div>

              {/* Nucleus */}
              <div className="absolute top-1/2 left-1/2 w-6 h-6 transform -translate-x-1/2 -translate-y-1/2">
                <div
                  className="w-full h-full bg-gradient-radial from-purple-300 to-purple-600 rounded-full shadow-lg"
                  style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.6)" }}
                ></div>
              </div>

              {/* Electron orbits */}
              <div
                className="absolute inset-0 border-2 border-purple-400/60 rounded-full animate-spin"
                style={{ animationDuration: "8s", boxShadow: "0 0 15px rgba(168, 85, 247, 0.3)" }}
              ></div>
              <div
                className="absolute inset-2 border-2 border-pink-400/60 rounded-full animate-spin"
                style={{
                  animationDuration: "6s",
                  animationDirection: "reverse",
                  boxShadow: "0 0 10px rgba(236, 72, 153, 0.3)",
                }}
              ></div>

              {/* Electrons */}
              <div
                className="absolute top-0 left-1/2 w-2 h-2 bg-gradient-radial from-purple-200 to-purple-500 rounded-full transform -translate-x-1/2 animate-spin"
                style={{ animationDuration: "8s", boxShadow: "0 0 8px rgba(168, 85, 247, 0.8)" }}
              ></div>
              <div
                className="absolute bottom-2 right-2 w-2 h-2 bg-gradient-radial from-pink-200 to-pink-500 rounded-full animate-spin"
                style={{
                  animationDuration: "6s",
                  animationDirection: "reverse",
                  boxShadow: "0 0 8px rgba(236, 72, 153, 0.8)",
                }}
              ></div>
            </div>
          </div>
        )
      case "satellite":
        return (
          <div key={element.id} style={style} className="text-cyan-400">
            <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
              {/* Outer glow */}
              <div className="absolute inset-0 bg-gradient-radial from-cyan-400/20 to-transparent blur-lg"></div>

              {/* Main body */}
              <div className="absolute top-1/3 left-1/2 w-8 h-12 transform -translate-x-1/2">
                <div
                  className="w-full h-full bg-gradient-to-b from-cyan-300 via-cyan-400 to-cyan-600 rounded-lg shadow-lg"
                  style={{ boxShadow: "0 0 15px rgba(34, 211, 238, 0.4)" }}
                ></div>

                {/* Antenna */}
                <div
                  className="absolute -top-2 left-1/2 w-0.5 h-4 bg-cyan-300 transform -translate-x-1/2"
                  style={{ boxShadow: "0 0 5px rgba(34, 211, 238, 0.6)" }}
                ></div>
              </div>

              {/* Solar panels */}
              <div
                className="absolute top-1/2 left-0 w-4 h-8 bg-gradient-to-r from-blue-400 to-blue-600 transform -translate-y-1/2 shadow-lg"
                style={{ boxShadow: "0 0 10px rgba(59, 130, 246, 0.4)" }}
              ></div>
              <div
                className="absolute top-1/2 right-0 w-4 h-8 bg-gradient-to-l from-blue-400 to-blue-600 transform -translate-y-1/2 shadow-lg"
                style={{ boxShadow: "0 0 10px rgba(59, 130, 246, 0.4)" }}
              ></div>

              {/* Panel details */}
              <div className="absolute top-1/2 left-0 w-4 h-8 transform -translate-y-1/2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-0.5 bg-blue-200/50"
                    style={{ top: `${25 + i * 25}%` }}
                  ></div>
                ))}
              </div>
              <div className="absolute top-1/2 right-0 w-4 h-8 transform -translate-y-1/2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-0.5 bg-blue-200/50"
                    style={{ top: `${25 + i * 25}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        )
      case "molecule":
        return (
          <div key={element.id} style={style} className="text-green-400">
            <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
              {/* Outer glow */}
              <div className="absolute inset-0 bg-gradient-radial from-green-400/20 to-transparent rounded-full blur-lg"></div>

              {/* Atoms */}
              <div
                className="absolute top-2 left-2 w-4 h-4 bg-gradient-radial from-green-300 to-green-600 rounded-full shadow-lg"
                style={{ boxShadow: "0 0 12px rgba(34, 197, 94, 0.6)" }}
              ></div>
              <div
                className="absolute top-2 right-2 w-4 h-4 bg-gradient-radial from-emerald-300 to-emerald-600 rounded-full shadow-lg"
                style={{ boxShadow: "0 0 12px rgba(16, 185, 129, 0.6)" }}
              ></div>
              <div
                className="absolute bottom-2 left-1/2 w-4 h-4 bg-gradient-radial from-lime-300 to-lime-600 rounded-full shadow-lg transform -translate-x-1/2"
                style={{ boxShadow: "0 0 12px rgba(132, 204, 22, 0.6)" }}
              ></div>

              {/* Bonds */}
              <div
                className="absolute top-4 left-4 w-6 h-1 bg-gradient-to-r from-green-400 to-emerald-400 transform rotate-45 shadow-md"
                style={{ boxShadow: "0 0 8px rgba(34, 197, 94, 0.4)" }}
              ></div>
              <div
                className="absolute top-4 right-4 w-6 h-1 bg-gradient-to-l from-emerald-400 to-lime-400 transform -rotate-45 shadow-md"
                style={{ boxShadow: "0 0 8px rgba(16, 185, 129, 0.4)" }}
              ></div>

              {/* Electron clouds */}
              <div className="absolute top-1 left-1 w-6 h-6 border border-green-300/30 rounded-full"></div>
              <div className="absolute top-1 right-1 w-6 h-6 border border-emerald-300/30 rounded-full"></div>
              <div className="absolute bottom-1 left-1/2 w-6 h-6 border border-lime-300/30 rounded-full transform -translate-x-1/2"></div>
            </div>
          </div>
        )
      case "cell":
        return (
          <div key={element.id} style={style} className="text-pink-400">
            <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
              {/* Outer glow */}
              <div className="absolute inset-0 bg-gradient-radial from-pink-400/20 to-transparent rounded-full blur-lg"></div>

              {/* Cell membrane */}
              <div
                className="absolute inset-0 border-2 border-pink-400/80 rounded-full shadow-lg"
                style={{ boxShadow: "0 0 20px rgba(236, 72, 153, 0.3)" }}
              >
                {/* Nucleus */}
                <div className="absolute top-1/2 left-1/2 w-8 h-8 transform -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="w-full h-full bg-gradient-radial from-pink-300 to-pink-600 rounded-full shadow-lg"
                    style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.5)" }}
                  ></div>

                  {/* Nucleolus */}
                  <div
                    className="absolute top-1/2 left-1/2 w-3 h-3 bg-gradient-radial from-rose-300 to-rose-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                    style={{ boxShadow: "0 0 8px rgba(244, 63, 94, 0.6)" }}
                  ></div>
                </div>

                {/* Organelles */}
                <div
                  className="absolute top-3 left-3 w-2 h-2 bg-gradient-radial from-pink-200 to-pink-500 rounded-full"
                  style={{ boxShadow: "0 0 6px rgba(236, 72, 153, 0.4)" }}
                ></div>
                <div
                  className="absolute bottom-3 right-3 w-2 h-2 bg-gradient-radial from-rose-200 to-rose-500 rounded-full"
                  style={{ boxShadow: "0 0 6px rgba(244, 63, 94, 0.4)" }}
                ></div>
                <div
                  className="absolute top-1/3 right-4 w-1.5 h-1.5 bg-gradient-radial from-pink-300 to-pink-600 rounded-full"
                  style={{ boxShadow: "0 0 4px rgba(236, 72, 153, 0.5)" }}
                ></div>

                {/* Membrane texture */}
                <div className="absolute inset-1 border border-pink-300/20 rounded-full"></div>
                <div className="absolute inset-2 border border-pink-300/10 rounded-full"></div>
              </div>
            </div>
          </div>
        )
      case "planet":
        return (
          <div key={element.id} style={style} className="text-orange-400">
            <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
              {/* Outer glow */}
              <div className="absolute inset-0 bg-gradient-radial from-orange-400/30 to-transparent rounded-full blur-xl"></div>

              {/* Planet surface */}
              <div
                className="absolute inset-0 bg-gradient-radial from-orange-300 via-orange-500 to-orange-700 rounded-full shadow-2xl"
                style={{ boxShadow: "0 0 30px rgba(251, 146, 60, 0.4)" }}
              >
                {/* Surface features */}
                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-red-500/60 rounded-full"></div>
                <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-yellow-400/60 rounded-full"></div>
                <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-red-400/60 rounded-full"></div>

                {/* Atmospheric glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200/20 via-transparent to-orange-800/40 rounded-full"></div>

                {/* Equatorial line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-300/40 to-transparent transform -translate-y-1/2"></div>

                {/* Polar caps */}
                <div className="absolute top-1 left-1/2 w-4 h-2 bg-orange-200/30 rounded-full transform -translate-x-1/2"></div>
                <div className="absolute bottom-1 left-1/2 w-4 h-2 bg-orange-200/30 rounded-full transform -translate-x-1/2"></div>
              </div>

              {/* Ring system (for some planets) */}
              {element.id % 3 === 0 && (
                <div
                  className="absolute inset-0 border-2 border-orange-300/40 rounded-full transform rotate-12"
                  style={{ boxShadow: "0 0 15px rgba(251, 146, 60, 0.2)" }}
                ></div>
              )}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ perspective: "2000px" }}>
      {elements.map(renderElement)}
    </div>
  )
}
