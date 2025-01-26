"use client"

import { useEffect, useRef } from "react"

const SnakeAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const snake = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: 10,
      dx: 2,
      dy: 0,
    }

    const drawSnake = () => {
      ctx.fillStyle = "green"
      ctx.fillRect(snake.x, snake.y, snake.size, snake.size)
    }

    const moveSnake = () => {
      snake.x += snake.dx
      snake.y += snake.dy

      if (snake.x < 0) snake.x = canvas.width - snake.size
      if (snake.x > canvas.width - snake.size) snake.x = 0
      if (snake.y < 0) snake.y = canvas.height - snake.size
      if (snake.y > canvas.height - snake.size) snake.y = 0
    }

    const changeDirection = () => {
      const directions = [
        { dx: 2, dy: 0 },
        { dx: -2, dy: 0 },
        { dx: 0, dy: 2 },
        { dx: 0, dy: -2 },
      ]
      const newDirection = directions[Math.floor(Math.random() * directions.length)]
      snake.dx = newDirection.dx
      snake.dy = newDirection.dy
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawSnake()
      moveSnake()

      if (Math.random() < 0.02) {
        changeDirection()
      }

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div className="flex justify-center items-center mb-8">
      <canvas ref={canvasRef} width={200} height={200} className="border border-red-500 rounded-md"></canvas>
    </div>
  )
}

export default SnakeAnimation

