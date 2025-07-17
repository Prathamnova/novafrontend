"use client"

import { useEffect, useRef } from "react"

export default function FloatingElements() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Floating elements - reduced count for cleaner look
    const elements: Array<{
      x: number
      y: number
      size: number
      speed: number
      angle: number
      type: "dna" | "molecule" | "satellite" | "planet" | "cell"
      rotation: number
      rotationSpeed: number
      opacity: number
    }> = []

    // Create fewer elements for cleaner aesthetic
    for (let i = 0; i < 8; i++) {
      elements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 25 + 15,
        speed: Math.random() * 0.3 + 0.1,
        angle: Math.random() * Math.PI * 2,
        type: ["dna", "molecule", "satellite", "planet", "cell"][Math.floor(Math.random() * 5)] as any,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        opacity: Math.random() * 0.3 + 0.1, // More subtle opacity
      })
    }

    const drawDNA = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number,
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.strokeStyle = `rgba(34, 197, 94, ${opacity})`
      ctx.lineWidth = 1.5

      // Draw DNA helix
      ctx.beginPath()
      for (let i = 0; i < size; i += 3) {
        const angle1 = (i / size) * Math.PI * 3
        const angle2 = angle1 + Math.PI
        const x1 = Math.cos(angle1) * (size / 5)
        const y1 = i - size / 2
        const x2 = Math.cos(angle2) * (size / 5)
        const y2 = i - size / 2

        if (i === 0) {
          ctx.moveTo(x1, y1)
        } else {
          ctx.lineTo(x1, y1)
        }
      }
      ctx.stroke()

      ctx.beginPath()
      for (let i = 0; i < size; i += 3) {
        const angle2 = (i / size) * Math.PI * 3 + Math.PI
        const x2 = Math.cos(angle2) * (size / 5)
        const y2 = i - size / 2

        if (i === 0) {
          ctx.moveTo(x2, y2)
        } else {
          ctx.lineTo(x2, y2)
        }
      }
      ctx.stroke()
      ctx.restore()
    }

    const drawMolecule = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number,
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Draw molecule structure
      const atoms = 5
      for (let i = 0; i < atoms; i++) {
        const angle = (i / atoms) * Math.PI * 2
        const atomX = Math.cos(angle) * (size / 4)
        const atomY = Math.sin(angle) * (size / 4)

        // Draw bonds
        ctx.strokeStyle = `rgba(168, 85, 247, ${opacity * 0.8})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(atomX, atomY)
        ctx.stroke()

        // Draw atoms
        ctx.fillStyle = `rgba(168, 85, 247, ${opacity})`
        ctx.beginPath()
        ctx.arc(atomX, atomY, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      // Center atom
      ctx.fillStyle = `rgba(168, 85, 247, ${opacity * 1.2})`
      ctx.beginPath()
      ctx.arc(0, 0, 3, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    const drawSatellite = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number,
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Satellite body
      ctx.fillStyle = `rgba(34, 197, 197, ${opacity})`
      ctx.fillRect(-size / 5, -size / 8, size / 2.5, size / 4)

      // Solar panels
      ctx.fillStyle = `rgba(34, 197, 197, ${opacity * 0.6})`
      ctx.fillRect(-size / 2.5, -size / 10, size / 8, size / 5)
      ctx.fillRect(size / 4, -size / 10, size / 8, size / 5)

      // Antenna
      ctx.strokeStyle = `rgba(34, 197, 197, ${opacity * 1.2})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, -size / 8)
      ctx.lineTo(0, -size / 4)
      ctx.stroke()

      ctx.restore()
    }

    const drawPlanet = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number,
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Planet
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size / 2)
      gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity * 1.2})`)
      gradient.addColorStop(1, `rgba(59, 130, 246, ${opacity * 0.3})`)
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
      ctx.fill()

      // Ring
      ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.8})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.ellipse(0, 0, size * 0.6, size * 0.15, 0, 0, Math.PI * 2)
      ctx.stroke()

      ctx.restore()
    }

    const drawCell = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number,
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Cell membrane
      ctx.strokeStyle = `rgba(236, 72, 153, ${opacity})`
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
      ctx.stroke()

      // Nucleus
      ctx.fillStyle = `rgba(236, 72, 153, ${opacity * 0.8})`
      ctx.beginPath()
      ctx.arc(0, 0, size / 5, 0, Math.PI * 2)
      ctx.fill()

      // Organelles
      for (let i = 0; i < 2; i++) {
        const angle = (i / 2) * Math.PI * 2
        const orgX = Math.cos(angle) * (size / 4)
        const orgY = Math.sin(angle) * (size / 4)

        ctx.fillStyle = `rgba(236, 72, 153, ${opacity * 0.6})`
        ctx.beginPath()
        ctx.arc(orgX, orgY, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      elements.forEach((element) => {
        // Update position
        element.x += Math.cos(element.angle) * element.speed
        element.y += Math.sin(element.angle) * element.speed
        element.rotation += element.rotationSpeed

        // Wrap around screen
        if (element.x > canvas.width + element.size) element.x = -element.size
        if (element.x < -element.size) element.x = canvas.width + element.size
        if (element.y > canvas.height + element.size) element.y = -element.size
        if (element.y < -element.size) element.y = canvas.height + element.size

        // Draw element
        switch (element.type) {
          case "dna":
            drawDNA(ctx, element.x, element.y, element.size, element.rotation, element.opacity)
            break
          case "molecule":
            drawMolecule(ctx, element.x, element.y, element.size, element.rotation, element.opacity)
            break
          case "satellite":
            drawSatellite(ctx, element.x, element.y, element.size, element.rotation, element.opacity)
            break
          case "planet":
            drawPlanet(ctx, element.x, element.y, element.size, element.rotation, element.opacity)
            break
          case "cell":
            drawCell(ctx, element.x, element.y, element.size, element.rotation, element.opacity)
            break
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
  )
}
