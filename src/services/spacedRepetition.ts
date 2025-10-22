/**
 * Spaced repetition service (Leitner box system)
 * Manages review scheduling and box progression
 */

import { SpacedRepetitionData } from '../types'
import { SPACED_REPETITION_INTERVALS } from '../utils/constants'

/** Initialize term in spaced repetition system */
export const initializeTerm = (
  data: SpacedRepetitionData,
  termId: string
): SpacedRepetitionData => {
  const now = new Date().toISOString()

  return {
    ...data,
    boxes: {
      ...data.boxes,
      [termId]: {
        box: 1,
        lastReviewed: now,
        nextReview: getNextReviewDate(1, now),
        consecutiveCorrect: 0,
        totalReviews: 0
      }
    }
  }
}

/** Calculate next review date based on box number */
export const getNextReviewDate = (boxNumber: 1 | 2 | 3 | 4 | 5, fromDate: string): string => {
  const date = new Date(fromDate)

  const intervalMap = {
    1: SPACED_REPETITION_INTERVALS.BOX_1,
    2: SPACED_REPETITION_INTERVALS.BOX_2,
    3: SPACED_REPETITION_INTERVALS.BOX_3,
    4: SPACED_REPETITION_INTERVALS.BOX_4,
    5: SPACED_REPETITION_INTERVALS.BOX_5
  }

  const days = intervalMap[boxNumber]
  date.setDate(date.getDate() + days)

  return date.toISOString()
}

/** Record a review result (correct or incorrect) */
export const recordReview = (
  data: SpacedRepetitionData,
  termId: string,
  isCorrect: boolean
): SpacedRepetitionData => {
  const termData = data.boxes[termId]

  if (!termData) {
    // Term not in system, initialize it
    return initializeTerm(data, termId)
  }

  const now = new Date().toISOString()

  let newBox: 1 | 2 | 3 | 4 | 5
  let newConsecutiveCorrect: number

  if (isCorrect) {
    // Correct answer: move up one box (max 5)
    newBox = Math.min(termData.box + 1, 5) as 1 | 2 | 3 | 4 | 5
    newConsecutiveCorrect = termData.consecutiveCorrect + 1
  } else {
    // Incorrect answer: back to box 1
    newBox = 1
    newConsecutiveCorrect = 0
  }

  return {
    ...data,
    boxes: {
      ...data.boxes,
      [termId]: {
        box: newBox,
        lastReviewed: now,
        nextReview: getNextReviewDate(newBox, now),
        consecutiveCorrect: newConsecutiveCorrect,
        totalReviews: termData.totalReviews + 1
      }
    }
  }
}

/** Get terms due for review */
export const getDueTerms = (data: SpacedRepetitionData): string[] => {
  const now = new Date()

  return Object.entries(data.boxes)
    .filter(([, termData]) => {
      const nextReview = new Date(termData.nextReview)
      return nextReview <= now
    })
    .map(([termId]) => termId)
}

/** Get terms in a specific box */
export const getTermsInBox = (
  data: SpacedRepetitionData,
  boxNumber: 1 | 2 | 3 | 4 | 5
): string[] => {
  return Object.entries(data.boxes)
    .filter(([, termData]) => termData.box === boxNumber)
    .map(([termId]) => termId)
}

/** Get term statistics */
export const getTermStats = (
  data: SpacedRepetitionData,
  termId: string
): {
  box: number
  mastery: number // 0-100
  reviewCount: number
  daysUntilReview: number
} | null => {
  const termData = data.boxes[termId]

  if (!termData) {
    return null
  }

  // Calculate mastery (box 1 = 0%, box 5 = 100%)
  const mastery = ((termData.box - 1) / 4) * 100

  // Calculate days until review
  const now = new Date()
  const nextReview = new Date(termData.nextReview)
  const daysUntilReview = Math.ceil(
    (nextReview.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  )

  return {
    box: termData.box,
    mastery: Math.round(mastery),
    reviewCount: termData.totalReviews,
    daysUntilReview: Math.max(0, daysUntilReview)
  }
}

/** Get overall spaced repetition statistics */
export const getOverallStats = (
  data: SpacedRepetitionData
): {
  totalTerms: number
  masteredTerms: number // Box 5
  dueToday: number
  averageBox: number
} => {
  const allTerms = Object.values(data.boxes)
  const totalTerms = allTerms.length

  if (totalTerms === 0) {
    return {
      totalTerms: 0,
      masteredTerms: 0,
      dueToday: 0,
      averageBox: 0
    }
  }

  const masteredTerms = allTerms.filter(t => t.box === 5).length
  const dueToday = getDueTerms(data).length

  const averageBox =
    allTerms.reduce((sum, t) => sum + t.box, 0) / totalTerms

  return {
    totalTerms,
    masteredTerms,
    dueToday,
    averageBox: Math.round(averageBox * 10) / 10
  }
}

/** Reset a term back to box 1 */
export const resetTerm = (
  data: SpacedRepetitionData,
  termId: string
): SpacedRepetitionData => {
  const termData = data.boxes[termId]

  if (!termData) {
    return data
  }

  const now = new Date().toISOString()

  return {
    ...data,
    boxes: {
      ...data.boxes,
      [termId]: {
        ...termData,
        box: 1,
        lastReviewed: now,
        nextReview: getNextReviewDate(1, now),
        consecutiveCorrect: 0
      }
    }
  }
}
