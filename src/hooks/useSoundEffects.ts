/**
 * Sound Effects Hook
 * Provides audio feedback for user interactions
 */

import { useRef, useCallback } from 'react'

interface SoundEffects {
  success: () => void
  error: () => void
  click: () => void
  whoosh: () => void
  celebration: () => void
}

/**
 * Hook to play sound effects for better UX
 * Uses Web Audio API to generate simple tones
 */
export const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null)

  // Initialize audio context on first use
  const getAudioContext = useCallback((): AudioContext | null => {
    if (typeof window === 'undefined') return null

    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      } catch (error) {
        console.warn('Web Audio API not supported:', error)
        return null
      }
    }

    return audioContextRef.current
  }, [])

  /**
   * Play a tone with specified frequency and duration
   */
  const playTone = useCallback(
    (frequency: number, duration: number, type: OscillatorType = 'sine') => {
      const audioContext = getAudioContext()
      if (!audioContext) return

      try {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.type = type
        oscillator.frequency.value = frequency

        // Fade in/out for smoother sound
        gainNode.gain.setValueAtTime(0, audioContext.currentTime)
        gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01)
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + duration)
      } catch (error) {
        console.warn('Failed to play tone:', error)
      }
    },
    [getAudioContext]
  )

  /**
   * Play multiple tones in sequence
   */
  const playSequence = useCallback(
    (sequence: Array<{ frequency: number; duration: number; delay: number }>) => {
      sequence.forEach(({ frequency, duration, delay }) => {
        setTimeout(() => {
          playTone(frequency, duration)
        }, delay)
      })
    },
    [playTone]
  )

  const sounds: SoundEffects = {
    // Success sound: ascending chord
    success: useCallback(() => {
      playSequence([
        { frequency: 523.25, duration: 0.1, delay: 0 }, // C5
        { frequency: 659.25, duration: 0.1, delay: 100 }, // E5
        { frequency: 783.99, duration: 0.15, delay: 200 }, // G5
      ])
    }, [playSequence]),

    // Error sound: descending dissonant
    error: useCallback(() => {
      playSequence([
        { frequency: 400, duration: 0.08, delay: 0 },
        { frequency: 350, duration: 0.08, delay: 80 },
        { frequency: 300, duration: 0.15, delay: 160 },
      ])
    }, [playSequence]),

    // Click sound: short pop
    click: useCallback(() => {
      playTone(800, 0.05, 'square')
    }, [playTone]),

    // Whoosh sound: quick sweep
    whoosh: useCallback(() => {
      const audioContext = getAudioContext()
      if (!audioContext) return

      try {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.2)

        gainNode.gain.setValueAtTime(0, audioContext.currentTime)
        gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01)
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.2)
      } catch (error) {
        console.warn('Failed to play whoosh:', error)
      }
    }, [getAudioContext]),

    // Celebration sound: rising arpeggio
    celebration: useCallback(() => {
      playSequence([
        { frequency: 523.25, duration: 0.1, delay: 0 }, // C5
        { frequency: 659.25, duration: 0.1, delay: 80 }, // E5
        { frequency: 783.99, duration: 0.1, delay: 160 }, // G5
        { frequency: 1046.5, duration: 0.2, delay: 240 }, // C6
      ])
    }, [playSequence]),
  }

  return sounds
}
