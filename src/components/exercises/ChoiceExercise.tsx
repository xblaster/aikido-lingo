'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import type { Exercise, ExerciseOption } from '@/types/curriculum';
import { soundEffects } from '@/utils/soundEffects';
import { matchAnswer, answerKey } from '@/utils/answerMatching';
import { Stimulus } from './Stimulus';
import { DialogueBubbles } from './DialogueBubbles';
import type { ExerciseDefinition, ExerciseViewProps, Verdict } from './types';
import { useTheme } from '@/utils/theme';

export const firstAnswer = (ex: Exercise) => (Array.isArray(ex.correctAnswer) ? ex.correctAnswer[0] : ex.correctAnswer);

/** One option chosen among several: correct when it is the expected answer or an accepted one. */
export function checkChoice(ex: Exercise, answer: string): Verdict {
  const expected = firstAnswer(ex);
  const ok = matchAnswer(answer, ex.correctAnswer, ex.acceptedAnswers).result === 'correct';
  return { result: ok ? 'correct' : 'wrong', expected };
}

interface OptionListProps {
  options: ExerciseOption[];
  selected: string | null;
  locked: boolean;
  onSelect: (text: string) => void;
  /** Japanese options (lang attribute for screen readers). */
  japanese?: boolean;
}

export const OptionList: React.FC<OptionListProps> = ({ options, selected, locked, onSelect, japanese }) => {
  const { isDark } = useTheme();
  return (
    <div className="grid grid-cols-1 gap-3">
      {options.map((opt, idx) => {
        const isSelected = selected === opt.text;
        return (
          <motion.button
            key={opt.id}
            type="button"
            disabled={locked}
            whileHover={!locked ? { scale: 1.015 } : {}}
            whileTap={!locked ? { scale: 0.985 } : {}}
            onClick={() => {
              soundEffects.playClick();
              onSelect(opt.text);
            }}
            aria-pressed={isSelected}
            data-option={opt.id}
            className={`w-full text-left px-5 py-4 rounded-2xl font-black text-sm sm:text-base border-2 transition-all flex items-center justify-between gap-3 ${
              isSelected
                ? isDark
                  ? 'border-aiki-ai-clair bg-aiki-ai/60 text-white shadow-3d-indigo ring-2 ring-aiki-ai-clair/30'
                  : 'border-aiki-ai bg-aiki-ai/10 text-aiki-ai shadow-3d-indigo ring-2 ring-aiki-ai/30'
                : isDark
                ? 'border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-white shadow-3d-card'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800 shadow-3d-card'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center text-xs font-black shadow-sm ${
                  isDark ? 'border-slate-700 text-slate-300 bg-slate-800' : 'border-slate-200 text-slate-700 bg-slate-100'
                }`}
              >
                {idx + 1}
              </span>
              <div>
                <div lang={japanese ? 'ja-Latn' : undefined}>{opt.text}</div>
                {opt.translation && locked && (
                  <div className={`text-xs font-semibold mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{opt.translation}</div>
                )}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

/** meaning_choice, term_choice, missing_word: read, then choose. */
export const ChoiceView: React.FC<ExerciseViewProps<string>> = ({ exercise, answer, onAnswer, locked }) => (
  <>
    <Stimulus exercise={exercise} />
    <OptionList options={exercise.options ?? []} selected={answer} locked={locked} onSelect={onAnswer} japanese={exercise.type === 'term_choice'} />
  </>
);

/** kanji_choice: the kanji shown big, no audio (it would give the reading away). */
export const KanjiChoiceView: React.FC<ExerciseViewProps<string>> = ({ exercise, answer, onAnswer, locked }) => (
  <>
    <Stimulus exercise={exercise} bigKanji noAudio={!locked} />
    <OptionList options={exercise.options ?? []} selected={answer} locked={locked} onSelect={onAnswer} />
  </>
);

/** listen_choose: hear, then choose the term (the text is hidden until checked). */
export const ListenChoiceView: React.FC<ExerciseViewProps<string>> = ({ exercise, answer, onAnswer, locked }) => (
  <>
    <Stimulus exercise={exercise} hideText={!locked} revealAudio={locked} />
    <OptionList options={exercise.options ?? []} selected={answer} locked={locked} onSelect={onAnswer} japanese />
  </>
);

/** scenario: a dojo situation (text or conversation with a missing line), choose the right attitude. */
export const ScenarioView: React.FC<ExerciseViewProps<string>> = ({ exercise, answer, onAnswer, locked }) => {
  const { isDark } = useTheme();
  return (
    <>
      {exercise.frText && (
        <div
          className={`mb-5 rounded-3xl border-2 p-4 text-sm sm:text-base font-semibold transition-colors ${
            isDark ? 'border-aiki-bois/50 bg-aiki-bois/10 text-slate-100' : 'border-aiki-bois/60 bg-aiki-bois/15 text-slate-800'
          }`}
        >
          <span aria-hidden className="mr-2">⛩️</span>
          {exercise.frText}
        </div>
      )}
      {(exercise.dialogue ?? []).length > 0 && (
        <DialogueBubbles
          lines={exercise.dialogue ?? []}
          missingSlot={<span className={`font-black ${answer ? (isDark ? 'text-white' : 'text-slate-900') : 'text-slate-500 italic'}`}>{answer ?? '…'}</span>}
        />
      )}
      <OptionList options={exercise.options ?? []} selected={answer} locked={locked} onSelect={onAnswer} />
    </>
  );
};


export const choiceDefinition = (label: string, View: React.FC<ExerciseViewProps<string>> = ChoiceView): ExerciseDefinition<string> => ({
  label,
  View,
  isReady: (_ex, a) => !!a,
  check: checkChoice,
});

/* ---------- true_false ---------- */

const TrueFalseView: React.FC<ExerciseViewProps<string>> = ({ exercise, answer, onAnswer, locked }) => {
  const { isDark } = useTheme();
  return (
    <>
      <div
        className={`mb-6 rounded-3xl border-2 p-5 text-lg font-black shadow-md transition-colors ${
          isDark ? 'border-slate-800 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900 shadow-sm'
        }`}
      >
        {exercise.statement}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {(['vrai', 'faux'] as const).map(v => {
          const selected = answer === v;
          return (
            <motion.button
              key={v}
              type="button"
              data-option={v}
              disabled={locked}
              aria-pressed={selected}
              whileHover={!locked ? { scale: 1.03 } : {}}
              whileTap={!locked ? { scale: 0.97 } : {}}
              onClick={() => { soundEffects.playClick(); onAnswer(v); }}
              className={`flex flex-col items-center justify-center gap-2 rounded-3xl border-2 p-6 font-black text-lg transition-all ${
                selected
                  ? isDark
                    ? 'border-aiki-ai-clair bg-aiki-ai/60 text-white shadow-3d-indigo ring-2 ring-aiki-ai-clair/30'
                    : 'border-aiki-ai bg-aiki-ai/10 text-aiki-ai shadow-3d-indigo ring-2 ring-aiki-ai/30'
                  : isDark
                  ? 'border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-white shadow-3d-card'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800 shadow-3d-card'
              }`}
            >
              {v === 'vrai' ? <Check size={32} className="text-emerald-400" aria-hidden /> : <X size={32} className="text-rose-400" aria-hidden />}
              {v === 'vrai' ? 'Vrai' : 'Faux'}
            </motion.button>
          );
        })}
      </div>
    </>
  );
};

export const trueFalseDefinition: ExerciseDefinition<string> = {
  label: 'Vrai ou faux ?',
  View: TrueFalseView,
  isReady: (_ex, a) => !!a,
  check: (ex, answer) => {
    const expected = String(firstAnswer(ex)).toLowerCase() === 'vrai' ? 'Vrai' : 'Faux';
    return { result: answerKey(answer) === answerKey(expected) ? 'correct' : 'wrong', expected };
  },
};

/* ---------- technique_decoder ---------- */

const PART_LABELS: { key: 'attaque' | 'technique' | 'variante'; label: string; darkColor: string; lightColor: string }[] = [
  { key: 'attaque', label: 'Attaque', darkColor: 'border-sky-500/60 bg-sky-950/50 text-sky-100', lightColor: 'border-sky-300 bg-sky-50 text-sky-950' },
  { key: 'technique', label: 'Technique', darkColor: 'border-aiki-shu/70 bg-aiki-shu/15 text-orange-100', lightColor: 'border-orange-300 bg-orange-50 text-orange-950' },
  { key: 'variante', label: 'Variante', darkColor: 'border-aiki-bois/70 bg-aiki-bois/15 text-amber-100', lightColor: 'border-amber-300 bg-amber-50 text-amber-950' },
];

/** The parts of a technique name, as coloured chips. */
export const DecompositionChips: React.FC<{ decomposition: Exercise['decomposition'] }> = ({ decomposition }) => {
  const { isDark } = useTheme();
  return (
    <div className="flex flex-wrap gap-2">
      {PART_LABELS.filter(p => decomposition?.[p.key]).map(p => (
        <span key={p.key} className={`rounded-2xl border-2 px-3 py-2 text-sm font-black ${isDark ? p.darkColor : p.lightColor}`}>
          <span className="block text-[10px] uppercase tracking-wider opacity-80">{p.label}</span>
          <span lang="ja-Latn">{decomposition?.[p.key]}</span>
        </span>
      ))}
    </div>
  );
};

/** Reverse mode: the expected answer is the full call (jpText) — the learner sees its parts. */
const isReverse = (ex: Exercise) => !!ex.jpText && answerKey(String(firstAnswer(ex))) === answerKey(ex.jpText);

/**
 * technique_decoder: read a technique call (« shomen-uchi ikkyo omote ») and pick one of its
 * parts; or, reversed, see the parts and pick the full call. Once checked, the decomposition
 * is shown in colour.
 */
const TechniqueDecoderView: React.FC<ExerciseViewProps<string>> = ({ exercise, answer, onAnswer, locked }) => {
  const { isDark } = useTheme();
  const reverse = isReverse(exercise);
  return (
    <>
      <div
        className={`mb-6 rounded-3xl border-2 p-5 shadow-md space-y-3 transition-colors ${
          isDark ? 'border-slate-800 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900 shadow-sm'
        }`}
      >
        {reverse ? (
          <>
            <p className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Les éléments</p>
            <DecompositionChips decomposition={exercise.decomposition} />
          </>
        ) : (
          <>
            <p className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>L&apos;appel du jury</p>
            <p lang="ja-Latn" className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{exercise.jpText}</p>
            {locked && <DecompositionChips decomposition={exercise.decomposition} />}
          </>
        )}
        {locked && reverse && <p lang="ja-Latn" className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{exercise.jpText}</p>}
      </div>
      <OptionList options={exercise.options ?? []} selected={answer} locked={locked} onSelect={onAnswer} japanese />
    </>
  );
};


export const techniqueDecoderDefinition: ExerciseDefinition<string> = {
  label: 'Décodeur de technique',
  View: TechniqueDecoderView,
  isReady: (_ex, a) => !!a,
  check: checkChoice,
};
