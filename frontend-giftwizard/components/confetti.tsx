"use client"

import { useEffect, useState } from "react"

interface ConfettiPiece {
  id: number
  left: number
  delay: number
  duration: number
  color: string
  size: number
}

const COLORS = ["#ff2d55", "#ff6b00", "#00d4aa", "#ffb800", "#ff4466", "#00eebb"]

export default function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    // Generate confetti pieces
    const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 8 + Math.random() * 8,
    }))
    setPieces(newPieces)

    // Clean up after animation completes
    const timeout = setTimeout(() => {
      setPieces([])
    }, 5000)

    return () => clearTimeout(timeout)
  }, [])

  if (pieces.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0%",
            animationDuration: `${piece.duration}s`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

