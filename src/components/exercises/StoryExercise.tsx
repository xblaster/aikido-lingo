'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';
import type { Exercise } from '@/types/curriculum';
import { matchAnswer } from '@/utils/answerMatching';
import { DialogueBubbles } from './DialogueBubbles';
import { OptionList } from './ChoiceExercise';
import type { ExerciseDefinition, ExerciseViewProps, Verdict } from './types';

/** Answer: how many lines are revealed, and the option chosen for each question. */
export interface StoryAnswer {
  shown: number;
  answers: Record<number, string>;
}

export function checkStory(ex: Exercise, answer: StoryAnswer): Verdict {
  const qs = ex.storyQuestions ?? [];
  const wrong = qs.filter((q, i) => matchAnswer(answer.answers[i] ?? '', q.correctAnswer).result !== 'correct');
  return {
    result: wrong.length === 0 ? 'correct' : 'wrong',
    expected: qs.map(q => `${q.prompt} ${q.correctAnswer}`).join(' · '),
  };
}

import { useTheme } from '@/utils/theme';

/** story: a short story read and heard line by line, with comprehension questions on the way. */
const StoryView: React.FC<ExerciseViewProps<StoryAnswer>> = ({ exercise, answer, onAnswer, locked }) => {
  const { isDark } = useTheme();
  const lines = exercise.dialogue ?? [];
  const qs = exercise.storyQuestions ?? [];
  const state: StoryAnswer = answer ?? { shown: 1, answers: {} };
  // a question blocks the story until it is answered
  const pending = qs.findIndex((q, i) => q.afterLine < state.shown && state.answers[i] === undefined);
  const canContinue = state.shown < lines.length && pending < 0;

  return (
    <div>
      <DialogueBubbles lines={lines.slice(0, state.shown)} />
      {qs.map((q, i) =>
        q.afterLine < state.shown ? (
          <div
            key={i}
            className={`mb-6 rounded-3xl border-2 p-4 ${
              isDark
                ? 'border-amber-700/50 bg-amber-950/30'
                : 'border-amber-300 bg-amber-100/70'
            }`}
          >
            <p className={`font-black mb-3 ${isDark ? 'text-amber-100' : 'text-stone-900'}`}>{q.prompt}</p>
            <OptionList
              options={q.options}
              selected={state.answers[i] ?? null}
              locked={locked}
              onSelect={text => onAnswer({ ...state, answers: { ...state.answers, [i]: text } })}
            />
          </div>
        ) : null,
      )}
      {canContinue && !locked && (
        <button
          type="button"
          onClick={() => onAnswer({ ...state, shown: state.shown + 1 })}
          className={`mx-auto flex min-h-[48px] items-center gap-2 rounded-2xl border-2 px-5 py-3 font-black transition-colors ${
            isDark
              ? 'border-slate-700 bg-slate-900 text-white hover:border-slate-500'
              : 'border-stone-300 bg-white text-stone-900 hover:border-stone-400'
          }`}
        >
          Suite <ArrowDown size={18} aria-hidden />
        </button>
      )}
    </div>
  );
};

export const storyDefinition: ExerciseDefinition<StoryAnswer> = {
  label: 'Histoire',
  View: StoryView,
  isReady: (ex, a) =>
    !!a && a.shown >= (ex.dialogue ?? []).length && (ex.storyQuestions ?? []).every((_, i) => a.answers[i] !== undefined),
  check: checkStory,
};
