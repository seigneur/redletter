"use client"

import { useEffect, useRef } from "react"

const DragonAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Dragon body segments
    const segments: { x: number; y: number }[] = Array(20)
      .fill(null)
      .map(() => ({
        x: canvas.width / 2,
        y: canvas.height / 2,
      }))

    let time = 0
    let targetX = canvas.width / 2
    let targetY = canvas.height / 2

    const updateTarget = () => {
      const radius = 100
      targetX = canvas.width / 2 + Math.cos(time) * radius
      targetY = canvas.height / 2 + Math.sin(time * 0.5) * radius
      time += 0.02
    }

    const drawDragon = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update head position (first segment)
      updateTarget()
      const head = segments[0]
      const dx = targetX - head.x
      const dy = targetY - head.y
      head.x += dx * 0.1
      head.y += dy * 0.1

      // Update body segments
      for (let i = 1; i < segments.length; i++) {
        const segment = segments[i]
        const prevSegment = segments[i - 1]
        const dx = prevSegment.x - segment.x
        const dy = prevSegment.y - segment.y
        segment.x += dx * 0.1
        segment.y += dy * 0.1
      }

      // Draw dragon body
      ctx.beginPath()
      ctx.moveTo(segments[0].x, segments[0].y)

      for (let i = 1; i < segments.length; i++) {
        const xc = (segments[i].x + segments[i - 1].x) / 2
        const yc = (segments[i].y + segments[i - 1].y) / 2
        ctx.quadraticCurveTo(segments[i - 1].x, segments[i - 1].y, xc, yc)
      }

      // Golden gradient for dragon body
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#D4AF37")
      gradient.addColorStop(0.5, "#C5A028")
      gradient.addColorStop(1, "#FFD700")

      ctx.strokeStyle = gradient
      ctx.lineWidth = 20
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.stroke()

      // Draw dragon head
      ctx.beginPath()
      ctx.arc(head.x, head.y, 15, 0, Math.PI * 2)
      ctx.fillStyle = "#FFD700"
      ctx.fill()

      requestAnimationFrame(drawDragon)
    }

    drawDragon()
  }, [])

  return <canvas ref={canvasRef} width={800} height={400} className="dragon-canvas rounded-lg shadow-2xl mb-8" />
}

export default DragonAnimation

