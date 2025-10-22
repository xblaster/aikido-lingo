/**
 * Haptic Feedback Hook
 * Provides haptic vibration feedback for mobile devices
 */

interface HapticPattern {
  success: number[]
  error: number[]
  warning: number[]
  light: number[]
  medium: number[]
  heavy: number[]
}

/**
 * Hook to trigger haptic feedback on supported devices
 * Uses the Vibration API for mobile devices
 */
export const useHaptic = () => {
  // Check if vibration API is supported
  const isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator

  // Predefined vibration patterns (in milliseconds)
  const patterns: HapticPattern = {
    success: [50, 50, 50], // Three short vibrations
    error: [100, 100, 100, 100, 100], // Long-short-long pattern
    warning: [50, 100, 50], // Short-long-short
    light: [10], // Very short tap
    medium: [30], // Medium tap
    heavy: [50], // Heavy tap
  }

  /**
   * Trigger a haptic feedback pattern
   */
  const trigger = (pattern: keyof HapticPattern): void => {
    if (!isSupported) return

    try {
      navigator.vibrate(patterns[pattern])
    } catch (error) {
      console.warn('Haptic feedback failed:', error)
    }
  }

  /**
   * Custom vibration pattern
   */
  const custom = (pattern: number | number[]): void => {
    if (!isSupported) return

    try {
      navigator.vibrate(pattern)
    } catch (error) {
      console.warn('Haptic feedback failed:', error)
    }
  }

  /**
   * Stop all vibrations
   */
  const stop = (): void => {
    if (!isSupported) return

    try {
      navigator.vibrate(0)
    } catch (error) {
      console.warn('Failed to stop haptic:', error)
    }
  }

  return {
    trigger,
    custom,
    stop,
    isSupported,
  }
}
