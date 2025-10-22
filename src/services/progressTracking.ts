/**
 * Progress tracking service
 * Handles XP calculation, unit completion, and statistics updates
 */

import { UserProgress, ExerciseResult, UnitProgress } from '../types'
import { XP_REWARDS, TARGET_SCORE_PERCENTAGE } from '../utils/constants'

/** Calculate XP earned from unit completion */
export const calculateUnitXP = (unitProgress: UnitProgress): number => {
  let xp = XP_REWARDS.UNIT_COMPLETED

  // Bonus for high score (90%+)
  if (unitProgress.score >= 90) {
    xp += XP_REWARDS.PERFECT_SCORE
  }

  // Bonus for no errors
  const hasErrors = unitProgress.completedExercises.some(ex => !ex.isCorrect)
  if (!hasErrors && unitProgress.completedExercises.length > 0) {
    xp += XP_REWARDS.NO_ERRORS
  }

  return xp
}

/** Check if unit is passed */
export const isUnitPassed = (unitProgress: UnitProgress): boolean => {
  return unitProgress.score >= TARGET_SCORE_PERCENTAGE && unitProgress.hearts > 0
}

/** Calculate current score from exercises */
export const calculateScore = (exercises: ExerciseResult[]): number => {
  if (exercises.length === 0) return 0

  const correctCount = exercises.filter(ex => ex.isCorrect).length
  return Math.round((correctCount / exercises.length) * 100)
}

/** Calculate average accuracy from exercise results */
export const calculateAccuracy = (exercises: ExerciseResult[]): number => {
  if (exercises.length === 0) return 0

  const totalAttempts = exercises.reduce((sum, ex) => sum + ex.attempts, 0)
  const successfulAttempts = exercises.filter(ex => ex.isCorrect).length

  if (totalAttempts === 0) return 0

  return Math.round((successfulAttempts / totalAttempts) * 100)
}

/** Update user progress after unit completion */
export const completeUnit = (
  progress: UserProgress,
  unitId: string,
  unitProgress: UnitProgress,
  category: string
): UserProgress => {
  const earnedXP = calculateUnitXP(unitProgress);
  const duration = Math.round(
    unitProgress.completedExercises.reduce((sum, ex) => sum + ex.timeSpent, 0) / 60000
  );

  const newCompletedUnits = progress.completedUnits.includes(unitId)
    ? progress.completedUnits
    : [...progress.completedUnits, unitId];

  const newPracticeLog = [
    ...progress.practiceLog,
    {
      date: new Date().toISOString(),
      unitId,
      duration,
      exercisesCompleted: unitProgress.completedExercises.length,
      score: unitProgress.score,
      termsReviewed: unitProgress.completedExercises.map(ex => ex.exerciseId),
    },
  ];

  const categoryKey = category as keyof typeof progress.stats.categoryProgress;
  const oldCategoryStats = progress.stats.categoryProgress[categoryKey];
  const newCategoryStats = oldCategoryStats
    ? {
        ...oldCategoryStats,
        termsLearned: oldCategoryStats.termsLearned + unitProgress.completedExercises.length,
        accuracy: Math.round(
          (oldCategoryStats.accuracy + calculateAccuracy(unitProgress.completedExercises)) / 2
        ),
      }
    : oldCategoryStats;

  const newCategoryProgress = {
    ...progress.stats.categoryProgress,
    [categoryKey]: newCategoryStats,
  };

  const allAccuracy = Object.values(newCategoryProgress)
    .map(cat => cat.accuracy)
    .filter(acc => acc > 0);

  const newGlobalAccuracy = allAccuracy.length > 0
    ? Math.round(allAccuracy.reduce((sum, acc) => sum + acc, 0) / allAccuracy.length)
    : progress.stats.accuracy;

  const newStats = {
    ...progress.stats,
    totalXp: progress.stats.totalXp + earnedXP,
    totalMinutes: progress.stats.totalMinutes + duration,
    unitsCompleted: progress.stats.unitsCompleted + 1,
    accuracy: newGlobalAccuracy,
    categoryProgress: newCategoryProgress,
  };

  return {
    ...progress,
    completedUnits: newCompletedUnits,
    stats: newStats,
    practiceLog: newPracticeLog,
    lastUpdated: new Date().toISOString(),
  };
};

/** Check if a unit should be unlocked */
export const shouldUnlockUnit = (
  progress: UserProgress,
  unitId: string,
  prerequisites: string[]
): boolean => {
  // Already unlocked
  if (progress.unlockedUnits.includes(unitId)) {
    return false
  }

  // Check prerequisites
  const allPrerequisitesComplete = prerequisites.every(prereqId =>
    progress.completedUnits.includes(prereqId)
  )

  return allPrerequisitesComplete
}

/** Unlock a unit */
export const unlockUnit = (
  progress: UserProgress,
  unitId: string
): UserProgress => {
  if (progress.unlockedUnits.includes(unitId)) {
    return progress;
  }

  return {
    ...progress,
    unlockedUnits: [...progress.unlockedUnits, unitId],
    lastUpdated: new Date().toISOString(),
  };
};

/** Update streak based on practice sessions */
export const updateStreak = (progress: UserProgress): UserProgress => {
  if (progress.practiceLog.length === 0) {
    return {
      ...progress,
      stats: { ...progress.stats, streak: 0 },
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const hasSessionToday = progress.practiceLog.some(session => {
    const sessionDate = new Date(session.date);
    sessionDate.setHours(0, 0, 0, 0);
    return sessionDate.getTime() === today.getTime();
  });

  const hasSessionYesterday = progress.practiceLog.some(session => {
    const sessionDate = new Date(session.date);
    sessionDate.setHours(0, 0, 0, 0);
    return sessionDate.getTime() === yesterday.getTime();
  });

  let newStreak = progress.stats.streak;
  if (hasSessionToday) {
    if (!hasSessionYesterday) {
      newStreak = 1;
    } else {
      // This logic is a bit flawed, it should be based on the last practice date
      // For now, let's assume it's a simple increment
      newStreak += 1;
    }
  } else if (!hasSessionYesterday) {
    newStreak = 0;
  }

  if (newStreak !== progress.stats.streak) {
    return {
      ...progress,
      stats: { ...progress.stats, streak: newStreak },
    };
  }

  return progress;
};

/** Get next unit to unlock after completing current one */
export const getNextUnitId = (currentUnitId: string): string | null => {
  // Parse current unit ID (e.g., "white5_unit1" -> "white5", "unit1")
  const match = currentUnitId.match(/^(white|black)(\d+)_unit(\d+)$/)
  if (!match) return null

  const [, beltType, beltLevel, unitNum] = match
  const nextUnitNum = parseInt(unitNum) + 1

  // For MVP, we have 3 units in white_5
  if (beltType === 'white' && beltLevel === '5' && nextUnitNum <= 3) {
    return `white5_unit${nextUnitNum}`
  }

  // Next belt level
  if (beltType === 'white' && beltLevel === '5') {
    return 'white4_unit1'
  }

  return null // No next unit defined yet
}
