/**
 * localStorage management for user progress
 */

import { UserProgress, UserSettings } from '../types'
import { STORAGE_KEYS } from './constants'
import { aikidoCurriculum } from '../data/curriculum'

const allUnitIds = aikidoCurriculum.belts.flatMap(belt => belt.units.map(unit => unit.id))

/** Default user progress */
export const getDefaultProgress = (): UserProgress => ({
  currentBeltLevel: 'white_5',
  completedUnits: [],
  unlockedUnits: allUnitIds, // All units unlocked by default
  stats: {
    totalXp: 0,
    totalMinutes: 0,
    unitsCompleted: 0,
    accuracy: 0,
    streak: 0,
    categoryProgress: {
      etiquette: { termsLearned: 0, accuracy: 0 },
      positions: { termsLearned: 0, accuracy: 0 },
      movements: { termsLearned: 0, accuracy: 0 },
      techniques: { termsLearned: 0, accuracy: 0 },
      weapons: { termsLearned: 0, accuracy: 0 },
      falls: { termsLearned: 0, accuracy: 0 },
      principles: { termsLearned: 0, accuracy: 0 }
    }
  },
  practiceLog: [],
  spacedRepetitionData: {
    boxes: {}
  },
  safetyChecklist: {},
  createdAt: new Date().toISOString(),
  lastUpdated: new Date().toISOString()
})

/** Default user settings */
export const getDefaultSettings = (): UserSettings => ({
  soundEnabled: true,
  darkMode: false,
  language: 'fr',
  notificationsEnabled: false,
  dailyGoal: 15 // 15 minutes per day
})

/** Load progress from localStorage */
export const loadProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS)
    if (!stored) {
      return getDefaultProgress()
    }

    let parsed = JSON.parse(stored) as UserProgress

    // Validate structure (basic check)
    if (!parsed.stats || !parsed.spacedRepetitionData) {
      console.warn('Invalid progress data, using defaults')
      return getDefaultProgress()
    }

    // Migration: Ensure all units are unlocked for existing users
    if (JSON.stringify(parsed.unlockedUnits.sort()) !== JSON.stringify(allUnitIds.sort())) {
      parsed.unlockedUnits = allUnitIds;
      saveProgress(parsed);
    }

    return parsed
  } catch (error) {
    console.error('Failed to load progress:', error)
    return getDefaultProgress()
  }
}

/** Save progress to localStorage */
export const saveProgress = (progress: UserProgress): void => {
  try {
    progress.lastUpdated = new Date().toISOString()
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress))
  } catch (error) {
    console.error('Failed to save progress:', error)
  }
}

/** Load settings from localStorage */
export const loadSettings = (): UserSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS)
    if (!stored) {
      return getDefaultSettings()
    }

    return JSON.parse(stored) as UserSettings
  } catch (error) {
    console.error('Failed to load settings:', error)
    return getDefaultSettings()
  }
}

/** Save settings to localStorage */
export const saveSettings = (settings: UserSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings))
  } catch (error) {
    console.error('Failed to save settings:', error)
  }
}

/** Clear all data (reset progress) */
export const clearAllData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.PROGRESS)
    localStorage.removeItem(STORAGE_KEYS.SETTINGS)
    localStorage.removeItem(STORAGE_KEYS.CACHE)
  } catch (error) {
    console.error('Failed to clear data:', error)
  }
}

/** Export progress as JSON */
export const exportProgress = (): string => {
  const progress = loadProgress()
  return JSON.stringify(progress, null, 2)
}

/** Import progress from JSON */
export const importProgress = (jsonString: string): boolean => {
  try {
    const parsed = JSON.parse(jsonString)

    // Basic validation
    if (!parsed.stats || !parsed.spacedRepetitionData) {
      throw new Error('Invalid progress format')
    }

    saveProgress(parsed as UserProgress)
    return true
  } catch (error) {
    console.error('Failed to import progress:', error)
    return false
  }
}
