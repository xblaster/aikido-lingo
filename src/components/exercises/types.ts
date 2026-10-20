import type React from 'react';
import type { CatalogueExerciseType, Exercise } from '@/types/curriculum';

/** Result of checking an answer . */
export interface Verdict {
  result: 'correct' | 'almost' | 'wrong';
  /** The expected answer, as shown to the learner after checking. */
  expected: string;
  /** Indices in `expected` of the letters to highlight . */
  highlights?: number[];
  /** Extra explanation computed from the answer. */
  detail?: string;
}

/** The learner's answer, in the shape each exercise type defines. */
export type Answer = unknown;

export interface ExerciseViewProps<A = Answer> {
  exercise: Exercise;
  /** Current answer (null: nothing answered yet). */
  answer: A | null;
  onAnswer: (answer: A | null) => void;
  /** True once the answer has been checked: the view becomes read-only. */
  locked: boolean;
  verdict: Verdict | null;
}

export interface ExerciseDefinition<A = Answer> {
  /** Label shown above the prompt. */
  label: string;
  View: React.FC<ExerciseViewProps<A>>;
  /** Whether the answer is complete enough to enable « Vérifier ». */
  isReady: (exercise: Exercise, answer: A | null) => boolean;
  check: (exercise: Exercise, answer: A) => Verdict;
}

export type ExerciseRegistry = Record<CatalogueExerciseType, ExerciseDefinition<any>>;
