import { useEffect, useState } from 'react'
import './LightningEffect.css'

interface LightningEffectProps {
  isActive: boolean
  onComplete: () => void
}

export const LightningEffect = ({ isActive, onComplete }: LightningEffectProps) => {
  const [bolts, setBolts] = useState<Array<{ id: number; delay: number; path: string }>>([])

  useEffect(() => {
    if (isActive) {
      // Generate multiple lightning bolts
      const newBolts = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        delay: i * 300,
        path: generateLightningPath()
      }))
      setBolts(newBolts)

      // Clean up after animation
      const timer = setTimeout(() => {
        setBolts([])
        onComplete()
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [isActive, onComplete])

  const generateLightningPath = () => {
    const segments = []
    let x = Math.random() * window.innerWidth
    let y = 0
    
    while (y < window.innerHeight) {
      const nextX = x + (Math.random() - 0.5) * 200
      const nextY = y + Math.random() * 100 + 50
      segments.push(`${x},${y} ${nextX},${nextY}`)
      x = nextX
      y = nextY
    }
    
    return segments.join(' ')
  }

  if (!isActive || bolts.length === 0) return null

  return (
    <div className="lightning-container">
      <div className="lightning-flash" />
      {bolts.map((bolt) => (
        <svg
          key={bolt.id}
          className="lightning-bolt"
          style={{ animationDelay: `${bolt.delay}ms` }}
          viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
        >
          <polyline
            points={bolt.path}
            stroke="url(#lightning-gradient)"
            strokeWidth="3"
            fill="none"
            filter="url(#glow)"
          />
          <defs>
            <linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#40ffaa" />
              <stop offset="100%" stopColor="#4079ff" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
      ))}
    </div>
  )
}