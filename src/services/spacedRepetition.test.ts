import {
  initializeTerm,
  getNextReviewDate,
  recordReview,
  getDueTerms,
  getTermsInBox,
  getTermStats,
  getOverallStats,
  resetTerm,
} from './spacedRepetition'
import { SpacedRepetitionData } from '../types'

const createData = (overrides: Partial<SpacedRepetitionData> = {}): SpacedRepetitionData => ({
  boxes: {},
  ...overrides,
})

describe('spacedRepetition service', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2024-05-10T09:00:00.000Z'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('initializes a term with default Leitner values', () => {
    const data = createData()
    const initialized = initializeTerm(data, 'term-1')

    expect(initialized.boxes['term-1']).toMatchObject({
      box: 1,
      consecutiveCorrect: 0,
      totalReviews: 0,
    })
    expect(new Date(initialized.boxes['term-1'].lastReviewed).toISOString()).toBe(
      '2024-05-10T09:00:00.000Z',
    )
  })

  it('computes next review dates according to intervals', () => {
    const start = '2024-05-01T00:00:00.000Z'
    expect(getNextReviewDate(1, start)).toBe('2024-05-02T00:00:00.000Z')
    expect(getNextReviewDate(3, start)).toBe('2024-05-08T00:00:00.000Z')
  })

  describe('recordReview', () => {
    it('initializes term when not already present', () => {
      const data = createData()
      const updated = recordReview(data, 'term-1', true)

      expect(updated.boxes['term-1'].box).toBe(1)
      expect(updated.boxes['term-1'].totalReviews).toBe(0)
    })

    it('promotes or demotes terms based on result', () => {
      const existing = createData({
        boxes: {
          'term-1': {
            box: 2,
            lastReviewed: '2024-05-08T09:00:00.000Z',
            nextReview: '2024-05-11T09:00:00.000Z',
            consecutiveCorrect: 1,
            totalReviews: 3,
          },
        },
      })

      const correct = recordReview(existing, 'term-1', true)
      expect(correct.boxes['term-1'].box).toBe(3)
      expect(correct.boxes['term-1'].consecutiveCorrect).toBe(2)
      expect(correct.boxes['term-1'].totalReviews).toBe(4)

      const incorrect = recordReview(correct, 'term-1', false)
      expect(incorrect.boxes['term-1'].box).toBe(1)
      expect(incorrect.boxes['term-1'].consecutiveCorrect).toBe(0)
      expect(incorrect.boxes['term-1'].totalReviews).toBe(5)
    })
  })

  it('returns due terms for review', () => {
    const data = createData({
      boxes: {
        due: {
          box: 2,
          lastReviewed: '2024-05-09T09:00:00.000Z',
          nextReview: '2024-05-10T08:00:00.000Z',
          consecutiveCorrect: 1,
          totalReviews: 2,
        },
        later: {
          box: 2,
          lastReviewed: '2024-05-09T09:00:00.000Z',
          nextReview: '2024-05-12T09:00:00.000Z',
          consecutiveCorrect: 1,
          totalReviews: 2,
        },
      },
    })

    expect(getDueTerms(data)).toEqual(['due'])
  })

  it('filters terms by box', () => {
    const data = createData({
      boxes: {
        a: {
          box: 1,
          lastReviewed: '2024-05-10T09:00:00.000Z',
          nextReview: '2024-05-11T09:00:00.000Z',
          consecutiveCorrect: 0,
          totalReviews: 1,
        },
        b: {
          box: 3,
          lastReviewed: '2024-05-08T09:00:00.000Z',
          nextReview: '2024-05-15T09:00:00.000Z',
          consecutiveCorrect: 2,
          totalReviews: 4,
        },
      },
    })

    expect(getTermsInBox(data, 1)).toEqual(['a'])
    expect(getTermsInBox(data, 3)).toEqual(['b'])
  })

  describe('getTermStats', () => {
    it('returns null when term is missing', () => {
      expect(getTermStats(createData(), 'missing')).toBeNull()
    })

    it('calculates mastery and days until review', () => {
      const data = createData({
        boxes: {
          term: {
            box: 4,
            lastReviewed: '2024-05-09T09:00:00.000Z',
            nextReview: '2024-05-12T09:00:00.000Z',
            consecutiveCorrect: 2,
            totalReviews: 5,
          },
        },
      })

      const stats = getTermStats(data, 'term')
      expect(stats).toMatchObject({
        box: 4,
        mastery: 75,
        reviewCount: 5,
      })
      expect(stats!.daysUntilReview).toBe(2)
    })
  })

  describe('getOverallStats', () => {
    it('handles empty datasets', () => {
      expect(getOverallStats(createData())).toEqual({
        totalTerms: 0,
        masteredTerms: 0,
        dueToday: 0,
        averageBox: 0,
      })
    })

    it('aggregates totals and averages', () => {
      const data = createData({
        boxes: {
          a: {
            box: 5,
            lastReviewed: '2024-05-09T09:00:00.000Z',
            nextReview: '2024-05-10T08:00:00.000Z',
            consecutiveCorrect: 4,
            totalReviews: 10,
          },
          b: {
            box: 2,
            lastReviewed: '2024-05-09T09:00:00.000Z',
            nextReview: '2024-05-15T09:00:00.000Z',
            consecutiveCorrect: 1,
            totalReviews: 3,
          },
        },
      })

      expect(getOverallStats(data)).toEqual({
        totalTerms: 2,
        masteredTerms: 1,
        dueToday: 1,
        averageBox: 3.5,
      })
    })
  })

  it('resets a term back to box one', () => {
    const data = createData({
      boxes: {
        term: {
          box: 4,
          lastReviewed: '2024-05-09T09:00:00.000Z',
          nextReview: '2024-05-12T09:00:00.000Z',
          consecutiveCorrect: 2,
          totalReviews: 5,
        },
      },
    })

    const reset = resetTerm(data, 'term')
    expect(reset.boxes['term'].box).toBe(1)
    expect(reset.boxes['term'].consecutiveCorrect).toBe(0)
    expect(new Date(reset.boxes['term'].lastReviewed).toISOString()).toBe(
      '2024-05-10T09:00:00.000Z',
    )
  })
})

