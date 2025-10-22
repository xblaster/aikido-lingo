/**
 * Unit tests for progressStorage utilities
 * Tests localStorage save/load functionality
 */

import {
  loadProgress,
  saveProgress,
  loadSettings,
  saveSettings,
  clearAllData,
  exportProgress,
  importProgress,
  getDefaultProgress,
  getDefaultSettings,
} from './progressStorage'
import { UserProgress, UserSettings } from '../types'
import { STORAGE_KEYS } from './constants'

describe('progressStorage', () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {}

    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString()
      },
      removeItem: (key: string) => {
        delete store[key]
      },
      clear: () => {
        store = {}
      },
    }
  })()

  beforeEach(() => {
    // Reset localStorage before each test
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    })
    localStorageMock.clear()
  })

  describe('getDefaultProgress', () => {
    it('should return a valid default progress object', () => {
      const progress = getDefaultProgress()

      expect(progress).toBeDefined()
      expect(progress.currentBeltLevel).toBe('white_5')
      expect(progress.completedUnits).toEqual([])
      expect(Array.isArray(progress.unlockedUnits)).toBe(true)
      expect(progress.unlockedUnits.length).toBeGreaterThan(0)
      expect(progress.stats).toBeDefined()
      expect(progress.stats.totalXp).toBe(0)
      expect(progress.stats.accuracy).toBe(0)
      expect(progress.stats.streak).toBe(0)
      expect(progress.spacedRepetitionData).toBeDefined()
      expect(progress.spacedRepetitionData.boxes).toBeDefined()
      expect(typeof progress.createdAt).toBe('string')
      expect(typeof progress.lastUpdated).toBe('string')
    })

    it('should unlock all curriculum units by default', () => {
      const progress = getDefaultProgress()

      // Should have units from all belts unlocked
      expect(progress.unlockedUnits.length).toBeGreaterThanOrEqual(19) // At least 19 units currently
    })
  })

  describe('getDefaultSettings', () => {
    it('should return valid default settings', () => {
      const settings = getDefaultSettings()

      expect(settings).toBeDefined()
      expect(settings.soundEnabled).toBe(true)
      expect(settings.darkMode).toBe(false)
      expect(settings.language).toBe('fr')
      expect(settings.notificationsEnabled).toBe(false)
      expect(settings.dailyGoal).toBe(15)
    })
  })

  describe('saveProgress and loadProgress', () => {
    it('should save progress to localStorage', () => {
      const progress = getDefaultProgress()
      progress.stats.totalXp = 100

      saveProgress(progress)

      const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS)
      expect(stored).not.toBeNull()

      const parsed = JSON.parse(stored!)
      expect(parsed.stats.totalXp).toBe(100)
    })

    it('should load progress from localStorage', () => {
      const progress = getDefaultProgress()
      progress.stats.totalXp = 200
      progress.completedUnits = ['unit1', 'unit2']

      saveProgress(progress)
      const loaded = loadProgress()

      expect(loaded.stats.totalXp).toBe(200)
      expect(loaded.completedUnits).toEqual(['unit1', 'unit2'])
    })

    it('should update lastUpdated timestamp on save', () => {
      const progress = getDefaultProgress()
      const beforeSave = new Date().toISOString()

      // Small delay to ensure timestamp difference
      setTimeout(() => {
        saveProgress(progress)
        const loaded = loadProgress()

        expect(loaded.lastUpdated).toBeDefined()
        expect(loaded.lastUpdated >= beforeSave).toBe(true)
      }, 10)
    })

    it('should return default progress when localStorage is empty', () => {
      const progress = loadProgress()

      expect(progress).toBeDefined()
      expect(progress.currentBeltLevel).toBe('white_5')
      expect(progress.stats.totalXp).toBe(0)
    })

    it('should return default progress when stored data is invalid', () => {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, 'invalid json')

      const progress = loadProgress()

      expect(progress).toBeDefined()
      expect(progress.currentBeltLevel).toBe('white_5')
    })

    it('should handle missing fields gracefully', () => {
      const invalidProgress = {
        currentBeltLevel: 'white_5',
        completedUnits: [],
        // Missing stats and spacedRepetitionData
      }
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(invalidProgress))

      const progress = loadProgress()

      expect(progress).toBeDefined()
      expect(progress.stats).toBeDefined() // Should have default stats
      expect(progress.spacedRepetitionData).toBeDefined()
    })
  })

  describe('saveSettings and loadSettings', () => {
    it('should save settings to localStorage', () => {
      const settings = getDefaultSettings()
      settings.soundEnabled = false
      settings.darkMode = true

      saveSettings(settings)

      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS)
      expect(stored).not.toBeNull()

      const parsed = JSON.parse(stored!)
      expect(parsed.soundEnabled).toBe(false)
      expect(parsed.darkMode).toBe(true)
    })

    it('should load settings from localStorage', () => {
      const settings = getDefaultSettings()
      settings.language = 'en'
      settings.dailyGoal = 30

      saveSettings(settings)
      const loaded = loadSettings()

      expect(loaded.language).toBe('en')
      expect(loaded.dailyGoal).toBe(30)
    })

    it('should return default settings when localStorage is empty', () => {
      const settings = loadSettings()

      expect(settings).toBeDefined()
      expect(settings.soundEnabled).toBe(true)
      expect(settings.language).toBe('fr')
    })
  })

  describe('clearAllData', () => {
    it('should remove all data from localStorage', () => {
      const progress = getDefaultProgress()
      const settings = getDefaultSettings()

      saveProgress(progress)
      saveSettings(settings)

      expect(localStorage.getItem(STORAGE_KEYS.PROGRESS)).not.toBeNull()
      expect(localStorage.getItem(STORAGE_KEYS.SETTINGS)).not.toBeNull()

      clearAllData()

      expect(localStorage.getItem(STORAGE_KEYS.PROGRESS)).toBeNull()
      expect(localStorage.getItem(STORAGE_KEYS.SETTINGS)).toBeNull()
      expect(localStorage.getItem(STORAGE_KEYS.CACHE)).toBeNull()
    })
  })

  describe('exportProgress', () => {
    it('should export progress as JSON string', () => {
      const progress = getDefaultProgress()
      progress.stats.totalXp = 500

      saveProgress(progress)
      const exported = exportProgress()

      expect(typeof exported).toBe('string')

      const parsed = JSON.parse(exported)
      expect(parsed.stats.totalXp).toBe(500)
    })

    it('should export formatted JSON (pretty printed)', () => {
      const progress = getDefaultProgress()
      saveProgress(progress)

      const exported = exportProgress()

      // Should contain newlines and indentation (pretty printed)
      expect(exported).toContain('\n')
      expect(exported).toContain('  ') // 2-space indentation
    })
  })

  describe('importProgress', () => {
    it('should import valid progress JSON', () => {
      const progress = getDefaultProgress()
      progress.stats.totalXp = 750
      progress.completedUnits = ['unit1', 'unit2', 'unit3']

      const jsonString = JSON.stringify(progress)
      const result = importProgress(jsonString)

      expect(result).toBe(true)

      const loaded = loadProgress()
      expect(loaded.stats.totalXp).toBe(750)
      expect(loaded.completedUnits).toEqual(['unit1', 'unit2', 'unit3'])
    })

    it('should reject invalid JSON', () => {
      const result = importProgress('invalid json {]')

      expect(result).toBe(false)
    })

    it('should reject progress with missing required fields', () => {
      const invalidProgress = {
        currentBeltLevel: 'white_5',
        // Missing stats and spacedRepetitionData
      }

      const result = importProgress(JSON.stringify(invalidProgress))

      expect(result).toBe(false)
    })
  })

  describe('Progress persistence across sessions', () => {
    it('should maintain progress data across multiple save/load cycles', () => {
      // First session
      const progress1 = getDefaultProgress()
      progress1.stats.totalXp = 100
      progress1.completedUnits = ['unit1']
      saveProgress(progress1)

      // Second session - load and update
      const progress2 = loadProgress()
      expect(progress2.stats.totalXp).toBe(100)
      progress2.stats.totalXp = 200
      progress2.completedUnits.push('unit2')
      saveProgress(progress2)

      // Third session - verify cumulative updates
      const progress3 = loadProgress()
      expect(progress3.stats.totalXp).toBe(200)
      expect(progress3.completedUnits).toEqual(['unit1', 'unit2'])
    })
  })

  describe('Unit unlock migration', () => {
    it('should unlock all units for existing users with old progress', () => {
      // Simulate old progress with limited unlocked units
      const oldProgress = getDefaultProgress()
      oldProgress.unlockedUnits = ['white5_unit1', 'white5_unit2'] // Only 2 units

      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(oldProgress))

      const loaded = loadProgress()

      // Should now have all units unlocked
      expect(loaded.unlockedUnits.length).toBeGreaterThan(2)
      expect(loaded.unlockedUnits.length).toBeGreaterThanOrEqual(19)
    })
  })

  describe('SpacedRepetition data persistence', () => {
    it('should save and load spaced repetition boxes', () => {
      const progress = getDefaultProgress()
      progress.spacedRepetitionData.boxes = {
        'term1': { boxNumber: 2, nextReviewDate: '2025-10-25' },
        'term2': { boxNumber: 1, nextReviewDate: '2025-10-23' },
      }

      saveProgress(progress)
      const loaded = loadProgress()

      expect(loaded.spacedRepetitionData.boxes['term1']).toBeDefined()
      expect(loaded.spacedRepetitionData.boxes['term1'].boxNumber).toBe(2)
      expect(loaded.spacedRepetitionData.boxes['term2'].boxNumber).toBe(1)
    })
  })

  describe('Category progress tracking', () => {
    it('should save and load category progress', () => {
      const progress = getDefaultProgress()
      progress.stats.categoryProgress.etiquette = { termsLearned: 10, accuracy: 85 }
      progress.stats.categoryProgress.techniques = { termsLearned: 5, accuracy: 92 }

      saveProgress(progress)
      const loaded = loadProgress()

      expect(loaded.stats.categoryProgress.etiquette.termsLearned).toBe(10)
      expect(loaded.stats.categoryProgress.etiquette.accuracy).toBe(85)
      expect(loaded.stats.categoryProgress.techniques.termsLearned).toBe(5)
      expect(loaded.stats.categoryProgress.techniques.accuracy).toBe(92)
    })
  })
})
