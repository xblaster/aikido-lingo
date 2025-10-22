/**
 * User progress and tracking types
 * Defines progress tracking, statistics, and spaced repetition data
 */

import { BeltLevel, TechniqueCategory } from './AikidoTypes'

/** Global user progress saved */
export interface UserProgress {
  // Curriculum progress
  currentBeltLevel: BeltLevel
  completedUnits: string[]      // IDs of completed units
  unlockedUnits: string[]       // IDs of unlocked units

  // Global statistics
  stats: UserStats

  // Practice history
  practiceLog: PracticeSession[]

  // Spaced repetition
  spacedRepetitionData: SpacedRepetitionData

  // Safety certifications
  safetyChecklist: { [unitId: string]: boolean }

  // Metadata
  createdAt: string             // ISO timestamp
  lastUpdated: string
}

/** User statistics */
export interface UserStats {
  totalXp: number               // Experience points
  totalMinutes: number          // Total practice time
  unitsCompleted: number        // Number of validated units
  accuracy: number              // Average accuracy (%)
  streak: number                // Consecutive days of practice

  // By category
  categoryProgress: {
    [key in TechniqueCategory]: {
      termsLearned: number
      accuracy: number
    }
  }
}

/** Practice session */
export interface PracticeSession {
  date: string                  // ISO date
  unitId: string
  duration: number              // Minutes
  exercisesCompleted: number
  score: number                 // Percentage
  termsReviewed: string[]       // IDs of terms practiced
}

/** Spaced repetition data (Leitner system) */
export interface SpacedRepetitionData {
  boxes: {
    [termId: string]: {
      box: 1 | 2 | 3 | 4 | 5    // Current box (1=new, 5=mastered)
      lastReviewed: string      // ISO timestamp
      nextReview: string        // ISO timestamp
      consecutiveCorrect: number
      totalReviews: number
    }
  }
}

/** Exercise result */
export interface ExerciseResult {
  exerciseId: string
  isCorrect: boolean
  timeSpent: number             // Milliseconds
  attempts: number              // Number of attempts
  timestamp: string             // ISO timestamp

  // Specific feedback
  userAnswer: string
  correctAnswer: string
  hintsUsed: number
}

/** Unit in progress state */
export interface UnitProgress {
  unitId: string
  currentExerciseIndex: number
  completedExercises: ExerciseResult[]
  score: number                 // Current percentage
  hearts: number                // Remaining lives (out of 5)
  isCompleted: boolean
  startedAt: string
  completedAt?: string
}

/** Achievement badge */
export interface Achievement {
  id: string
  title: string                 // E.g. "First steps"
  description: string
  icon: string                  // Emoji icon
  unlockedAt?: string           // ISO timestamp if unlocked
  progress?: number             // Progress 0-100 if not unlocked
  target?: number               // Target value to unlock
}

/** User settings */
export interface UserSettings {
  soundEnabled: boolean
  darkMode: boolean
  language: 'fr' | 'en'
  notificationsEnabled: boolean
  dailyGoal: number             // Minutes per day
}
