import {
  calculateUnitXP,
  isUnitPassed,
  calculateScore,
  calculateAccuracy,
  completeUnit,
  shouldUnlockUnit,
  unlockUnit,
  updateStreak,
  getNextUnitId,
} from './progressTracking'
import { ExerciseResult, UnitProgress, UserProgress } from '../types'

const createExercise = (overrides: Partial<ExerciseResult> = {}): ExerciseResult => ({
  exerciseId: overrides.exerciseId ?? 'exercise-1',
  isCorrect: overrides.isCorrect ?? true,
  timeSpent: overrides.timeSpent ?? 30000,
  attempts: overrides.attempts ?? 1,
  timestamp: overrides.timestamp ?? new Date('2024-01-01T00:00:00.000Z').toISOString(),
  userAnswer: overrides.userAnswer ?? 'answer',
  correctAnswer: overrides.correctAnswer ?? 'correct',
  hintsUsed: overrides.hintsUsed ?? 0,
})

const createUnitProgress = (overrides: Partial<UnitProgress> = {}): UnitProgress => ({
  unitId: overrides.unitId ?? 'white5_unit1',
  currentExerciseIndex: overrides.currentExerciseIndex ?? 0,
  completedExercises: overrides.completedExercises ?? [createExercise()],
  score: overrides.score ?? 95,
  hearts: overrides.hearts ?? 5,
  isCompleted: overrides.isCompleted ?? true,
  startedAt: overrides.startedAt ?? new Date('2024-01-01T00:00:00.000Z').toISOString(),
  completedAt: overrides.completedAt ?? new Date('2024-01-01T00:10:00.000Z').toISOString(),
})

const createBaseProgress = (): UserProgress => ({
  currentBeltLevel: 'white_5',
  completedUnits: [],
  unlockedUnits: ['white5_unit1'],
  stats: {
    totalXp: 100,
    totalMinutes: 10,
    unitsCompleted: 2,
    accuracy: 70,
    streak: 2,
    categoryProgress: {
      etiquette: { termsLearned: 5, accuracy: 60 },
      positions: { termsLearned: 3, accuracy: 70 },
      movements: { termsLearned: 0, accuracy: 0 },
      techniques: { termsLearned: 0, accuracy: 0 },
      weapons: { termsLearned: 0, accuracy: 0 },
      falls: { termsLearned: 0, accuracy: 0 },
      principles: { termsLearned: 0, accuracy: 0 },
    },
  },
  practiceLog: [],
  spacedRepetitionData: { boxes: {} },
  safetyChecklist: {},
  createdAt: new Date('2024-01-01T00:00:00.000Z').toISOString(),
  lastUpdated: new Date('2024-01-01T00:00:00.000Z').toISOString(),
})

describe('progressTracking service', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2024-05-10T09:00:00.000Z'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('calculateUnitXP', () => {
    it('rewards bonuses for perfect score and no errors', () => {
      const unitProgress = createUnitProgress({
        score: 95,
        completedExercises: [
          createExercise({ exerciseId: 'ex-1', isCorrect: true }),
          createExercise({ exerciseId: 'ex-2', isCorrect: true }),
        ],
      })

      const xp = calculateUnitXP(unitProgress)

      expect(xp).toBe(100 + 50 + 25)
    })

    it('does not award no-error bonus when mistakes were made', () => {
      const unitProgress = createUnitProgress({
        score: 92,
        completedExercises: [
          createExercise({ exerciseId: 'ex-1', isCorrect: true }),
          createExercise({ exerciseId: 'ex-2', isCorrect: false }),
        ],
      })

      const xp = calculateUnitXP(unitProgress)

      expect(xp).toBe(100 + 50)
    })
  })

  describe('isUnitPassed', () => {
    it('requires target score and remaining hearts', () => {
      const unitProgress = createUnitProgress({ score: 80, hearts: 1 })
      expect(isUnitPassed(unitProgress)).toBe(true)

      const failedByScore = createUnitProgress({ score: 70 })
      expect(isUnitPassed(failedByScore)).toBe(false)

      const failedByHearts = createUnitProgress({ hearts: 0 })
      expect(isUnitPassed(failedByHearts)).toBe(false)
    })
  })

  describe('calculateScore', () => {
    it('computes percentage of correct exercises', () => {
      const exercises = [
        createExercise({ exerciseId: 'ex-1', isCorrect: true }),
        createExercise({ exerciseId: 'ex-2', isCorrect: true }),
        createExercise({ exerciseId: 'ex-3', isCorrect: false }),
        createExercise({ exerciseId: 'ex-4', isCorrect: true }),
      ]

      expect(calculateScore(exercises)).toBe(75)
      expect(calculateScore([])).toBe(0)
    })
  })

  describe('calculateAccuracy', () => {
    it('averages successful attempts over total attempts', () => {
      const exercises = [
        createExercise({ exerciseId: 'ex-1', attempts: 1, isCorrect: true }),
        createExercise({ exerciseId: 'ex-2', attempts: 2, isCorrect: false }),
        createExercise({ exerciseId: 'ex-3', attempts: 3, isCorrect: true }),
      ]

      expect(calculateAccuracy(exercises)).toBe(33)
      expect(calculateAccuracy([])).toBe(0)
      expect(calculateAccuracy([
        createExercise({ attempts: 0, isCorrect: false }),
      ])).toBe(0)
    })
  })

  describe('completeUnit', () => {
    it('updates progress statistics, practice log, and timestamps', () => {
      const progress = createBaseProgress()

      const unitProgress = createUnitProgress({
        unitId: 'white5_unit2',
        score: 95,
        completedExercises: [
          createExercise({ exerciseId: 'ex-1', timeSpent: 30000 }),
          createExercise({ exerciseId: 'ex-2', timeSpent: 90000 }),
        ],
      })

      const updated = completeUnit(progress, 'white5_unit2', unitProgress, 'etiquette')

      expect(updated.completedUnits).toContain('white5_unit2')
      expect(updated.stats.totalXp).toBe(100 + 175)
      expect(updated.stats.unitsCompleted).toBe(3)
      expect(updated.stats.totalMinutes).toBe(12)
      expect(updated.stats.categoryProgress.etiquette.termsLearned).toBe(7)
      expect(updated.stats.categoryProgress.etiquette.accuracy).toBe(80)
      expect(updated.stats.accuracy).toBe(75)
      expect(updated.practiceLog).toHaveLength(1)
      expect(updated.practiceLog[0]).toMatchObject({
        unitId: 'white5_unit2',
        exercisesCompleted: 2,
        score: 95,
        duration: 2,
        termsReviewed: ['ex-1', 'ex-2'],
      })
      expect(new Date(updated.practiceLog[0].date).toISOString()).toBe('2024-05-10T09:00:00.000Z')
      expect(updated.lastUpdated).toBe('2024-05-10T09:00:00.000Z')
    })
  })

  describe('shouldUnlockUnit', () => {
    it('checks completion of prerequisites and existing unlocks', () => {
      const progress = createBaseProgress()
      progress.completedUnits = ['white5_unit1']

      expect(shouldUnlockUnit(progress, 'white5_unit2', ['white5_unit1'])).toBe(true)
      progress.unlockedUnits.push('white5_unit2')
      expect(shouldUnlockUnit(progress, 'white5_unit2', ['white5_unit1'])).toBe(false)
      expect(shouldUnlockUnit(progress, 'white5_unit3', ['white5_unit2'])).toBe(false)
    })
  })

  describe('unlockUnit', () => {
    it('adds unit when not already unlocked', () => {
      const progress = createBaseProgress()
      const unlocked = unlockUnit(progress, 'white5_unit3')

      expect(unlocked.unlockedUnits).toContain('white5_unit3')

      const unchanged = unlockUnit(unlocked, 'white5_unit3')
      expect(unchanged.unlockedUnits.filter(id => id === 'white5_unit3')).toHaveLength(1)
    })
  })

  describe('updateStreak', () => {
    it('increments streak when practicing on consecutive days', () => {
      const progress = createBaseProgress()
      progress.practiceLog = [
        {
          date: '2024-05-09T07:00:00.000Z',
          unitId: 'white5_unit1',
          duration: 1,
          exercisesCompleted: 1,
          score: 90,
          termsReviewed: ['ex-1'],
        },
        {
          date: '2024-05-10T08:00:00.000Z',
          unitId: 'white5_unit1',
          duration: 1,
          exercisesCompleted: 1,
          score: 90,
          termsReviewed: ['ex-2'],
        },
      ]

      const updated = updateStreak(progress)
      expect(updated.stats.streak).toBe(3)
    })

    it('resets streak when missing consecutive practice', () => {
      const progress = createBaseProgress()
      progress.stats.streak = 5
      progress.practiceLog = [
        {
          date: '2024-05-01T07:00:00.000Z',
          unitId: 'white5_unit1',
          duration: 1,
          exercisesCompleted: 1,
          score: 90,
          termsReviewed: ['ex-1'],
        },
      ]

      const updated = updateStreak(progress)
      expect(updated.stats.streak).toBe(0)
    })
  })

  describe('getNextUnitId', () => {
    it('calculates next unit within belt and across belts', () => {
      expect(getNextUnitId('white5_unit1')).toBe('white5_unit2')
      expect(getNextUnitId('white5_unit3')).toBe('white4_unit1')
      expect(getNextUnitId('invalid')).toBeNull()
    })
  })
})

