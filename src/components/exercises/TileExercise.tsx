'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Exercise } from '@/types/curriculum';
import { soundEffects } from '@/utils/soundEffects';
import { joinTiles, matchAnswer } from '@/utils/answerMatching';
import { Stimulus } from './Stimulus';
import type { ExerciseDefinition, ExerciseViewProps, Verdict } from './types';

/** Answer: indices of the word-bank tiles, in the order the learner tapped them. */
export type TileAnswer = number[];

const expectedOf = (ex: Exercise) =>
  joinTiles(Array.isArray(ex.correctAnswer) ? ex.correctAnswer : [ex.correctAnswer]);

export function checkTiles(ex: Exercise, answer: TileAnswer): Verdict {
  const bank = ex.wordBank ?? [];
  const built = joinTiles(answer.map(i => bank[i]));
  const expected = expectedOf(ex);
  const accepted = (ex.acceptedAnswers ?? []);
  const m = matchAnswer(built, expected, accepted);
  return { result: m.result === 'correct' ? 'correct' : 'wrong', expected };
}

import { useTheme } from '@/utils/theme';

const TileView: React.FC<ExerciseViewProps<TileAnswer>> = ({ exercise, answer, onAnswer, locked }) => {
  const { isDark } = useTheme();
  const bank = exercise.wordBank ?? [];
  const chosen = answer ?? [];
  const add = (i: number) => {
    soundEffects.playChipPop();
    onAnswer([...chosen, i]);
  };
  const remove = (pos: number) => {
    soundEffects.playChipPop();
    const next = chosen.filter((_, k) => k !== pos);
    onAnswer(next.length ? next : null);
  };
  return (
    <>
      <Stimulus exercise={exercise} noAudio />
      <div className="space-y-6">
        <div className={`min-h-[70px] border-b-2 pb-3 flex flex-wrap items-center gap-2 ${isDark ? 'border-slate-700' : 'border-amber-200'}`}>
          {chosen.length === 0 ? (
            <span className={`text-sm font-medium italic ${isDark ? 'text-slate-500' : 'text-stone-500'}`}>
              Touchez les tuiles pour composer le nom…
            </span>
          ) : (
            chosen.map((i, pos) => (
              <motion.button
                key={`${i}-${pos}`}
                type="button"
                disabled={locked}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileTap={!locked ? { scale: 0.92 } : {}}
                onClick={() => remove(pos)}
                className={`px-4 py-2.5 rounded-2xl border-2 font-black text-sm shadow-3d-card transition-all ${
                  isDark
                    ? 'bg-slate-800 border-slate-600 text-white hover:bg-slate-700'
                    : 'bg-amber-100 border-amber-300 text-stone-900 hover:bg-amber-200'
                }`}
              >
                {bank[i]}
              </motion.button>
            ))
          )}
        </div>
        <div className="flex flex-wrap gap-2.5 justify-center pt-4">
          {bank.map((word, i) => {
            const used = chosen.includes(i);
            return (
              <motion.button
                key={`${word}-${i}`}
                type="button"
                disabled={used || locked}
                data-tile={i}
                whileHover={!used && !locked ? { scale: 1.05 } : {}}
                whileTap={!used && !locked ? { scale: 0.95 } : {}}
                onClick={() => add(i)}
                className={`px-4 sm:px-5 py-3 rounded-2xl font-black text-sm transition-all ${
                  used
                    ? isDark
                      ? 'bg-slate-900/60 text-slate-600 border-2 border-slate-800 cursor-default shadow-none'
                      : 'bg-amber-50/60 text-stone-400 border-2 border-amber-100 cursor-default shadow-none'
                    : isDark
                      ? 'bg-slate-900 border-2 border-slate-700 text-white hover:border-slate-500 shadow-3d-card active:translate-y-1'
                      : 'bg-white border-2 border-amber-200 text-stone-900 hover:border-amber-400 shadow-3d-card active:translate-y-1'
                }`}
              >
                {word}
              </motion.button>
            );
          })}
        </div>
      </div>
    </>
  );
};

/** tile_build: compose a technique name with tiles (attack + technique + variant). */
export const tileBuildDefinition: ExerciseDefinition<TileAnswer> = {
  label: 'Composez le nom',
  View: props => <TileView {...props} />,
  isReady: (_ex, a) => !!a && a.length > 0,
  check: checkTiles,
};
