import type { Level } from './curriculum';

export interface UserProgress {
  currentLevel: Level;
  xp: number;
  gems: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  completedLessons: string[]; // lesson IDs
  completedUnits: string[]; // unit IDs
  unlockedLevels: Level[];
  /** Best score (0-100 %) of the grade-exam simulator, per level. */
  examScores: Partial<Record<Level, number>>;
  /** Correct answers given in the technique decoder quiz. */
  decoderScore: number;
  /** Reishiki (etiquette) cards the learner marked as read. */
  etiquetteSeen: string[];
  /** The « le tatami d'abord » notice was acknowledged. */
  welcomeSeen: boolean;
  audioSlowMode: boolean;
  soundEnabled: boolean;
  theme: 'dark' | 'light';
}

export const INITIAL_USER_PROGRESS: UserProgress = {
  currentLevel: '6K',
  xp: 0,
  gems: 50,
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessons: [],
  completedUnits: [],
  unlockedLevels: ['6K'],
  examScores: {},
  decoderScore: 0,
  etiquetteSeen: [],
  welcomeSeen: false,
  audioSlowMode: false,
  soundEnabled: true,
  theme: 'dark',
};
