import { useEffect, useState } from 'react'
import './LeavesEffect.css'

interface LeavesEffectProps {
  isActive: boolean
  onComplete: () => void
}

export const LeavesEffect = ({ isActive, onComplete }: LeavesEffectProps) => {
  const [leaves, setLeaves] = useState<Array<{ id: number; style: React.CSSProperties; type: string }>>([])

  useEffect(() => {
    if (isActive) {
      // Generate falling leaves
      const newLeaves = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        type: ['🍃', '🍀', '🌿', '🍂'][Math.floor(Math.random() * 4)],
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 0.5}s`,
          animationDuration: `${2 + Math.random() * 1.5}s`,
          fontSize: `${20 + Math.random() * 20}px`,
          transform: `rotate(${Math.random() * 360}deg)`
        }
      }))
      setLeaves(newLeaves)

      // Clean up after animation
      const timer = setTimeout(() => {
        setLeaves([])
        onComplete()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isActive, onComplete])

  if (!isActive) return null

  return (
    <div className="leaves-container">
      <div className="green-overlay" />
      <div className="moss-overlay" />
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="falling-leaf"
          style={leaf.style}
        >
          {leaf.type}
        </div>
      ))}
    </div>
  )
}