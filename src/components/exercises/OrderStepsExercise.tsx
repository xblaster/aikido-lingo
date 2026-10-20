'use client';

import React, { useMemo } from 'react';
import { motion, Reorder } from 'framer-motion';
import { ArrowDown, ArrowUp, GripVertical } from 'lucide-react';
import type { Exercise } from '@/types/curriculum';
import { soundEffects } from '@/utils/soundEffects';
import { shuffledOrder } from '@/utils/order';
import type { ExerciseDefinition, ExerciseViewProps, Verdict } from './types';
import { useTheme } from '@/utils/theme';

/** Answer: indices into exercise.steps, in the order the learner arranged them. */
export type OrderAnswer = number[];

export function checkOrder(ex: Exercise, answer: OrderAnswer): Verdict {
  const steps = ex.steps ?? [];
  const ok = answer.length === steps.length && answer.every((v, i) => v === i);
  return { result: ok ? 'correct' : 'wrong', expected: steps.map((s, i) => `${i + 1}. ${s}`).join('  ') };
}

/**
 * order_steps: put the steps back in order. Drag a card (mouse, touch) or use the arrow
 * buttons (keyboard, small screens).
 */
const OrderStepsView: React.FC<ExerciseViewProps<OrderAnswer>> = ({ exercise, answer, onAnswer, locked }) => {
  const { isDark } = useTheme();
  const steps = exercise.steps ?? [];
  const initial = useMemo(() => shuffledOrder(steps.length, exercise.id), [steps.length, exercise.id]);
  const order = answer ?? initial;

  const move = (pos: number, delta: number) => {
    const to = pos + delta;
    if (to < 0 || to >= order.length) return;
    soundEffects.playChipPop();
    const next = [...order];
    [next[pos], next[to]] = [next[to], next[pos]];
    onAnswer(next);
  };

  return (
    <Reorder.Group axis="y" values={order} onReorder={v => !locked && onAnswer(v)} className="space-y-3" as="ol">
      {order.map((stepIndex, pos) => {
        const placedRight = locked && stepIndex === pos;
        return (
          <Reorder.Item
            key={stepIndex}
            value={stepIndex}
            dragListener={!locked}
            data-step={stepIndex}
            className={`flex items-center gap-3 rounded-2xl border-2 px-3 py-3 font-black text-sm sm:text-base select-none transition-colors ${
              locked
                ? placedRight
                  ? isDark
                    ? 'border-emerald-600 bg-emerald-950/50 text-emerald-100'
                    : 'border-emerald-600 bg-emerald-50 text-emerald-950'
                  : isDark
                  ? 'border-rose-600 bg-rose-950/50 text-rose-100'
                  : 'border-rose-600 bg-rose-50 text-rose-950'
                : isDark
                ? 'border-slate-700 bg-slate-900 text-white shadow-3d-card cursor-grab active:cursor-grabbing'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800 shadow-3d-card cursor-grab active:cursor-grabbing'
            }`}
          >
            <GripVertical size={18} className={`${isDark ? 'text-slate-500' : 'text-slate-400'} flex-shrink-0`} aria-hidden />
            <span
              className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs flex-shrink-0 ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              {pos + 1}
            </span>
            <span className="flex-1">{steps[stepIndex]}</span>
            {!locked && (
              <span className="flex flex-col gap-1">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  disabled={pos === 0}
                  onClick={() => move(pos, -1)}
                  aria-label={`Monter « ${steps[stepIndex]} »`}
                  className={`rounded-lg border p-1 disabled:opacity-30 ${
                    isDark ? 'border-slate-700 text-slate-300 hover:border-slate-500' : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <ArrowUp size={14} />
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  disabled={pos === order.length - 1}
                  onClick={() => move(pos, 1)}
                  aria-label={`Descendre « ${steps[stepIndex]} »`}
                  className={`rounded-lg border p-1 disabled:opacity-30 ${
                    isDark ? 'border-slate-700 text-slate-300 hover:border-slate-500' : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <ArrowDown size={14} />
                </motion.button>
              </span>
            )}
          </Reorder.Item>
        );
      })}
    </Reorder.Group>
  );
};


export const orderStepsDefinition: ExerciseDefinition<OrderAnswer> = {
  label: 'Remettez dans l’ordre',
  View: OrderStepsView,
  // the shuffled order is itself an answer: the learner may check once they have looked at it
  isReady: () => true,
  // before any move, the view shows the shuffled order: check that one
  check: (ex, answer) => checkOrder(ex, answer ?? shuffledOrder((ex.steps ?? []).length, ex.id)),
};
