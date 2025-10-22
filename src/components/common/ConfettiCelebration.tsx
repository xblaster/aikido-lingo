import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from '../../hooks/useWindowSize'

interface ConfettiCelebrationProps {
  /** Whether to show confetti */
  active: boolean
  /** Duration in milliseconds (default: 3000) */
  duration?: number
  /** Number of confetti pieces (default: 200) */
  numberOfPieces?: number
  /** Callback when confetti finishes */
  onComplete?: () => void
}

/**
 * Confetti celebration component for success moments
 * Automatically stops after duration and calls onComplete
 */
export const ConfettiCelebration: React.FC<ConfettiCelebrationProps> = ({
  active,
  duration = 3000,
  numberOfPieces = 200,
  onComplete,
}) => {
  const { width, height } = useWindowSize()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (active) {
      setIsActive(true)

      const timer = setTimeout(() => {
        setIsActive(false)
        onComplete?.()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [active, duration, onComplete])

  if (!isActive) {
    return null
  }

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={numberOfPieces}
      recycle={false}
      gravity={0.3}
      colors={['#26a69a', '#4fc3f7', '#66bb6a', '#ffa726', '#ff9800', '#29b6f6']}
    />
  )
}
