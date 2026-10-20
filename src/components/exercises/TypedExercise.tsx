'use client';

import React from 'react';
import type { Exercise } from '@/types/curriculum';
import { matchAnswer } from '@/utils/answerMatching';
import { Stimulus } from './Stimulus';
import type { ExerciseDefinition, ExerciseViewProps, Verdict } from './types';

const expectedOf = (ex: Exercise) => (Array.isArray(ex.correctAnswer) ? ex.correctAnswer[0] : ex.correctAnswer);

/** Typed romaji: case, accents, hyphens, spaces and macrons do not matter (answerMatching). */
export function checkTyped(ex: Exercise, answer: string): Verdict {
  const expected = expectedOf(ex);
  const m = matchAnswer(answer, ex.correctAnswer, ex.acceptedAnswers);
  return { result: m.result === 'correct' ? 'correct' : 'wrong', expected };
}

import { useTheme } from '@/utils/theme';

const AnswerField: React.FC<{ value: string; onChange: (v: string) => void; locked: boolean }> = ({ value, onChange, locked }) => {
  const { isDark } = useTheme();
  return (
    <div className="space-y-2">
      <input
        type="text"
        value={value}
        disabled={locked}
        lang="ja-Latn"
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        aria-label="Votre réponse en romaji"
        placeholder="Écrivez en romaji (ex. katate-dori)…"
        onChange={e => onChange(e.target.value)}
        className={`w-full rounded-2xl border-2 px-4 py-3 text-base font-bold focus:border-aiki-ai-clair focus:outline-none disabled:opacity-80 transition-colors ${
          isDark
            ? 'border-slate-700 bg-slate-900 text-white placeholder:text-slate-500'
            : 'border-amber-200 bg-white text-stone-900 placeholder:text-stone-400'
        }`}
      />
      {!locked && (
        <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
          Majuscules, tirets, espaces et voyelles longues (ō, ou) ne comptent pas.
        </p>
      )}
    </div>
  );
};

const TypedView: React.FC<ExerciseViewProps<string> & { listen?: boolean }> = ({ exercise, answer, onAnswer, locked, listen }) => (
  <>
    <Stimulus exercise={exercise} hideText={listen && !locked} revealAudio={listen && locked} noAudio={!listen && !locked} />
    <AnswerField value={answer ?? ''} onChange={v => onAnswer(v.trim() ? v : null)} locked={locked} />
  </>
);

const typed = (label: string, listen: boolean): ExerciseDefinition<string> => ({
  label,
  View: props => <TypedView {...props} listen={listen} />,
  isReady: (_ex, a) => !!a && a.trim().length > 0,
  check: checkTyped,
});

/** typed_term: French meaning -> type the Japanese term in romaji. */
export const typedTermDefinition = typed('Écrivez le terme japonais', false);
/** listen_type: hear the term -> type it in romaji. */
export const listenTypeDefinition = typed('Écrivez ce que vous entendez', true);
