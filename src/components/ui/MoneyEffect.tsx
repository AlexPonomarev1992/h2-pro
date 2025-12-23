import { useEffect, useState } from 'react'
import './MoneyEffect.css'

interface MoneyEffectProps {
  isActive: boolean
  onComplete: () => void
}

export const MoneyEffect = ({ isActive, onComplete }: MoneyEffectProps) => {
  const [money, setMoney] = useState<Array<{ id: number; style: React.CSSProperties; type: string; isNote: boolean }>>([])

  useEffect(() => {
    if (isActive) {
      // Generate falling money
      const newMoney = Array.from({ length: 25 }, (_, i) => {
        const isNote = Math.random() > 0.6
        return {
          id: i,
          type: isNote ? '💵' : '🪙',
          isNote,
          style: {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.3}s`,
            animationDuration: `${1.5 + Math.random() * 1}s`,
            fontSize: `${isNote ? 30 + Math.random() * 20 : 20 + Math.random() * 15}px`,
            transform: `rotate(${Math.random() * 360}deg)`
          }
        }
      })
      setMoney(newMoney)

      // Clean up after animation
      const timer = setTimeout(() => {
        setMoney([])
        onComplete()
      }, 4500)

      return () => clearTimeout(timer)
    }
  }, [isActive, onComplete])

  if (!isActive) return null

  return (
    <div className="money-container">
      <div className="golden-overlay" />
      {money.map((item) => (
        <div
          key={item.id}
          className={`falling-money ${item.isNote ? 'note' : 'coin'}`}
          style={item.style}
        >
          {item.type}
        </div>
      ))}
    </div>
  )
}