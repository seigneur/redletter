"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Gift, Banana, FlagIcon as Orange } from "lucide-react"

interface FloatingItem {
  id: number
  x: number
  y: number
  speed: number
  icon: "gift" | "pineapple" | "mandarin"
}

const FloatingElements: React.FC = () => {
  const [items, setItems] = useState<FloatingItem[]>([])

  useEffect(() => {
    const createItem = (): FloatingItem => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: 0.5 + Math.random() * 1.5,
      icon: ["gift", "pineapple", "mandarin"][Math.floor(Math.random() * 3)] as "gift" | "pineapple" | "mandarin",
    })

    setItems(Array.from({ length: 15 }, createItem))

    const animateItems = () => {
      setItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          y: (item.y + item.speed) % window.innerHeight,
        })),
      )
    }

    const intervalId = setInterval(animateItems, 50)

    return () => clearInterval(intervalId)
  }, [])

  const renderIcon = (icon: "gift" | "pineapple" | "mandarin") => {
    switch (icon) {
      case "gift":
        return <Gift className="text-yellow-500" size={24} />
      case "pineapple":
        return <Banana className="text-yellow-500" size={24} />
      case "mandarin":
        return <Orange className="text-yellow-500" size={24} />
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute transition-transform duration-300 ease-linear"
          style={{
            transform: `translate(${item.x}px, ${item.y}px)`,
          }}
        >
          {renderIcon(item.icon)}
        </div>
      ))}
    </div>
  )
}

export default FloatingElements

