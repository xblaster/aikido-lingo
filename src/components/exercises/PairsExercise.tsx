'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { Exercise } from '@/types/curriculum';
import { soundEffects } from '@/utils/soundEffects';
import { audioSpeech } from '@/utils/audioSpeech';
import { Volume2 } from 'lucide-react';
import type { ExerciseDefinition, ExerciseViewProps, Verdict } from './types';
import { useTheme } from '@/utils/theme';

/** Answer: pairs matched so far (indices into exercise.pairs) and the number of wrong attempts. */
export interface PairsAnswer {
  matched: number[];
  mistakes: number;
}

/** Deterministic shuffle (same order on every render of the same exercise). */
function shuffled(n: number, seed: string): number[] {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const idx = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) >>> 0;
    const j = h % (i + 1);
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

export function checkPairs(ex: Exercise, answer: PairsAnswer): Verdict {
  const expected = (ex.pairs ?? []).map(p => `${p.jp} = ${p.fr}`).join(' · ');
  const complete = answer.matched.length === (ex.pairs ?? []).length;
  return {
    // like Duolingo, finding every pair completes the exercise; wrong attempts are shown, not punished twice
    result: complete ? 'correct' : 'wrong',
    expected,
    detail: answer.mistakes ? `${answer.mistakes} association(s) fausse(s) avant de trouver toutes les paires.` : undefined,
  };
}

const PairsView: React.FC<ExerciseViewProps<PairsAnswer> & { audio?: boolean }> = ({ exercise, answer, onAnswer, locked, audio }) => {
  const { isDark } = useTheme();
  const pairs = exercise.pairs ?? [];
  const left = useMemo(() => shuffled(pairs.length, exercise.id + 'L'), [pairs.length, exercise.id]);
  const right = useMemo(() => shuffled(pairs.length, exercise.id + 'R'), [pairs.length, exercise.id]);
  const [pick, setPick] = useState<{ side: 'jp' | 'fr'; index: number } | null>(null);
  const [wrong, setWrong] = useState<number[] | null>(null);
  const state: PairsAnswer = answer ?? { matched: [], mistakes: 0 };

  const choose = (side: 'jp' | 'fr', index: number) => {
    if (locked || state.matched.includes(index)) return;
    if (side === 'jp' && audio) {
      audioSpeech.speak(pairs[index].jp, {});
    }
    if (!pick || pick.side === side) {
      soundEffects.playClick();
      setPick({ side, index });
      return;
    }
    if (pick.index === index) {
      soundEffects.playChipPop();
      onAnswer({ ...state, matched: [...state.matched, index] });
    } else {
      soundEffects.playIncorrect();
      setWrong([pick.index, index]);
      setTimeout(() => setWrong(null), 600);
      onAnswer({ ...state, mistakes: state.mistakes + 1 });
    }
    setPick(null);
  };

  const cell = (side: 'jp' | 'fr', index: number, label: React.ReactNode, n: number) => {
    const done = state.matched.includes(index);
    const picked = pick?.side === side && pick.index === index;
    const isWrong = wrong?.includes(index) && !done;
    return (
      <motion.button
        key={`${side}-${index}`}
        type="button"
        data-pair={`${side}-${index}`}
        disabled={done || locked}
        aria-pressed={picked}
        animate={isWrong ? { x: [-6, 6, -4, 4, 0] } : {}}
        onClick={() => choose(side, index)}
        className={`min-h-[56px] w-full rounded-2xl border-2 px-4 py-3 font-black text-sm sm:text-base transition-all ${
          done
            ? isDark
              ? 'border-slate-800 bg-slate-900/40 text-slate-600'
              : 'border-slate-200 bg-slate-100 text-slate-400'
            : isWrong
            ? isDark
              ? 'border-rose-500 bg-rose-950/60 text-rose-100'
              : 'border-rose-500 bg-rose-100 text-rose-900'
            : picked
            ? isDark
              ? 'border-aiki-ai-clair bg-aiki-ai/20 text-white ring-2 ring-aiki-ai-clair/30'
              : 'border-aiki-ai bg-aiki-ai/10 text-aiki-ai ring-2 ring-aiki-ai/30'
            : isDark
            ? 'border-slate-800 bg-slate-900/90 text-white hover:bg-slate-800 shadow-3d-card'
            : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50 shadow-3d-card'
        }`}
      >
        {label ?? n}
      </motion.button>
    );
  };


  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-3">
        {left.map((i, n) =>
          cell('jp', i, audio && !locked ? (
            <span className="inline-flex items-center gap-2"><Volume2 size={18} aria-hidden /> <span className="sr-only">Enregistrement</span>{n + 1}</span>
          ) : pairs[i].jp, n),
        )}
      </div>
      <div className="space-y-3">{right.map((i, n) => cell('fr', i, pairs[i].fr, n))}</div>
    </div>
  );
};

const pairsDefinition = (label: string, audio: boolean): ExerciseDefinition<PairsAnswer> => ({
  label,
  View: props => <PairsView {...props} audio={audio} />,
  isReady: (ex, a) => !!a && a.matched.length === (ex.pairs ?? []).length,
  check: checkPairs,
});

export const matchPairsDefinition = pairsDefinition('Associez les paires', false);
export const matchPairsAudioDefinition = pairsDefinition('Associez ce que vous entendez', true);
