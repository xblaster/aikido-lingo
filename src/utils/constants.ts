/**
 * Application-wide constants
 */

import { BeltLevel } from '@/types'

/** Belt names in French */
export const BELT_NAMES: Record<BeltLevel, string> = {
  white_5: '5ème Kyū - Ceinture blanche',
  white_4: '4ème Kyū - Ceinture blanche',
  white_3: '3ème Kyū - Ceinture jaune',
  white_2: '2ème Kyū - Ceinture jaune',
  white_1: '1er Kyū - Ceinture orange',
  black_1: '1er Dan - Ceinture noire',
  black_2: '2ème Dan - Ceinture noire',
  black_3: '3ème Dan - Ceinture noire',
  black_4: '4ème Dan - Ceinture noire'
}

/** localStorage keys */
export const STORAGE_KEYS = {
  PROGRESS: 'aikido-lingo-progress',
  SETTINGS: 'aikido-lingo-settings',
  CACHE: 'aikido-lingo-cache'
} as const

/** Hearts per unit (lives system) */
export const MAX_HEARTS = 5

/** Target score to pass a unit (%) */
export const TARGET_SCORE_PERCENTAGE = 80

/** XP rewards */
export const XP_REWARDS = {
  UNIT_COMPLETED: 100,
  PERFECT_SCORE: 50,      // 90%+ score
  NO_ERRORS: 25,          // Completed without errors
  STREAK_DAILY: 10        // Per consecutive day
} as const

/** Spaced repetition intervals (days) */
export const SPACED_REPETITION_INTERVALS = {
  BOX_1: 1,    // New terms: review daily
  BOX_2: 3,    // Review every 3 days
  BOX_3: 7,    // Review weekly
  BOX_4: 14,   // Review bi-weekly
  BOX_5: 30    // Mastered: review monthly
} as const

/** Achievement IDs */
export const ACHIEVEMENTS = {
  FIRST_UNIT: 'first_unit',
  STREAK_7: 'streak_7',
  PERFECTIONIST_10: 'perfectionist_10',
  VOCAB_100: 'vocab_100',
  SPEED_DEMON: 'speed_demon'
} as const

/** Sound effects (optional) */
export const SOUNDS = {
  CORRECT: '/sounds/correct.mp3',
  INCORRECT: '/sounds/incorrect.mp3',
  UNIT_COMPLETE: '/sounds/unit-complete.mp3',
  LEVEL_UP: '/sounds/level-up.mp3'
} as const
