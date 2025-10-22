/**
 * Progress Context
 * Global state management for user progress and statistics
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { UserProgress, UnitProgress } from '../types'
import { loadProgress, saveProgress, getDefaultProgress } from '../utils/progressStorage'
import {
  completeUnit,
  unlockUnit,
  updateStreak,
  getNextUnitId
} from '../services/progressTracking'
import { recordReview } from '../services/spacedRepetition'

interface ProgressContextValue {
  progress: UserProgress
  isUnitUnlocked: (unitId: string) => boolean
  isUnitCompleted: (unitId: string) => boolean
  completeUnitWithProgress: (unitId: string, unitProgress: UnitProgress, category: string) => void
  recordTermReview: (termId: string, isCorrect: boolean) => void
  resetProgress: () => void
  refreshProgress: () => void
}

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined)

interface ProgressProviderProps {
  children: ReactNode
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(getDefaultProgress())

  // Load progress on mount
  useEffect(() => {
    const loaded = loadProgress()
    setProgress(loaded)

    // Update streak on load
    const updatedWithStreak = updateStreak(loaded)
    if (updatedWithStreak.stats.streak !== loaded.stats.streak) {
      setProgress(updatedWithStreak)
      saveProgress(updatedWithStreak)
    }
  }, [])

  // Save progress whenever it changes
  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const isUnitUnlocked = (unitId: string): boolean => {
    return progress.unlockedUnits.includes(unitId)
  }

  const isUnitCompleted = (unitId: string): boolean => {
    return progress.completedUnits.includes(unitId)
  }

  const completeUnitWithProgress = (
    unitId: string,
    unitProgress: UnitProgress,
    category: string
  ) => {
    // Complete the unit and update stats
    let updatedProgress = completeUnit(progress, unitId, unitProgress, category)

    // Update spaced repetition for all terms
    for (const exercise of unitProgress.completedExercises) {
      const termId = exercise.exerciseId
      updatedProgress = {
        ...updatedProgress,
        spacedRepetitionData: recordReview(
          updatedProgress.spacedRepetitionData,
          termId,
          exercise.isCorrect
        )
      }
    }

    // Check and unlock next unit
    const nextUnitId = getNextUnitId(unitId)
    if (nextUnitId) {
      // For MVP, we unlock next unit immediately after completing previous
      if (!updatedProgress.unlockedUnits.includes(nextUnitId)) {
        updatedProgress = unlockUnit(updatedProgress, nextUnitId)
      }
    }

    // Update streak
    updatedProgress = updateStreak(updatedProgress)

    setProgress(updatedProgress)
  }

  const recordTermReview = (termId: string, isCorrect: boolean) => {
    const updatedProgress = {
      ...progress,
      spacedRepetitionData: recordReview(
        progress.spacedRepetitionData,
        termId,
        isCorrect
      )
    }
    setProgress(updatedProgress)
  }

  const resetProgress = () => {
    const freshProgress = getDefaultProgress()
    setProgress(freshProgress)
    saveProgress(freshProgress)
  }

  const refreshProgress = () => {
    const loaded = loadProgress()
    setProgress(loaded)
  }

  const value: ProgressContextValue = {
    progress,
    isUnitUnlocked,
    isUnitCompleted,
    completeUnitWithProgress,
    recordTermReview,
    resetProgress,
    refreshProgress
  }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

/** Custom hook to use progress context */
export const useProgress = (): ProgressContextValue => {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}
