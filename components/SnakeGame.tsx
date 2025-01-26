"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { DollarSign } from "lucide-react"

// Define types
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"
type Position = { x: number; y: number }

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION: Direction = "RIGHT"
const INITIAL_COIN: Position = { x: 15, y: 10 }
const GAME_SPEED = 100

interface SnakeGameProps {
  onScoreChange: (score: number) => void
}

const SnakeGame: React.FC<SnakeGameProps> = ({ onScoreChange }) => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION)
  const [coin, setCoin] = useState<Position>(INITIAL_COIN)
  const [score, setScore] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const gameLoopRef = useRef<number | null>(null)

  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake]
      const head = { ...newSnake[0] }

      switch (direction) {
        case "UP":
          head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE
          break
        case "DOWN":
          head.y = (head.y + 1) % GRID_SIZE
          break
        case "LEFT":
          head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE
          break
        case "RIGHT":
          head.x = (head.x + 1) % GRID_SIZE
          break
      }

      newSnake.unshift(head)

      if (head.x === coin.x && head.y === coin.y) {
        setScore((prevScore) => {
          const newScore = prevScore + 1
          onScoreChange(newScore)
          return newScore
        })
        setCoin(getRandomPosition())
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, coin, onScoreChange])

  const getRandomPosition = (): Position => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
  }

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP")
          break
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN")
          break
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT")
          break
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT")
          break
      }
    },
    [direction],
  )

  const checkCollision = useCallback(() => {
    const head = snake[0]
    return snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
  }, [snake])

  const gameLoop = useCallback(() => {
    if (checkCollision()) {
      setGameOver(true)
      return
    }
    moveSnake()
  }, [checkCollision, moveSnake])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress])

  useEffect(() => {
    if (!gameOver) {
      gameLoopRef.current = window.setInterval(gameLoop, GAME_SPEED)
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }
  }, [gameLoop, gameOver])

  const restartGame = () => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    setCoin(INITIAL_COIN)
    setScore(0)
    onScoreChange(0)
    setGameOver(false)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-xl font-bold gold-text">Score: {score}</div>
      <div
        className="relative bg-red-900 border-4 border-yellow-600"
        style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute bg-yellow-400 rounded-full"
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
          />
        ))}
        <div
          className="absolute bg-yellow-500 rounded-full flex items-center justify-center"
          style={{
            left: coin.x * CELL_SIZE,
            top: coin.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
        >
          <DollarSign className="text-yellow-900" size={16} />
        </div>
      </div>
      {gameOver && (
        <div className="mt-4 text-center">
          <p className="text-xl font-bold text-red-500 mb-2">Game Over!</p>
          <button
            onClick={restartGame}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
          >
            Restart Game
          </button>
        </div>
      )}
    </div>
  )
}

export default SnakeGame

