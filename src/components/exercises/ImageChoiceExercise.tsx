'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { soundEffects } from '@/utils/soundEffects';
import { Stimulus } from './Stimulus';
import { Illustration } from '../Illustration';
import { checkChoice } from './ChoiceExercise';
import type { ExerciseDefinition, ExerciseViewProps } from './types';


import { useTheme } from '@/utils/theme';

/** image_choice: read or hear a word, choose the matching picture. */
const ImageChoiceView: React.FC<ExerciseViewProps<string>> = ({ exercise, answer, onAnswer, locked }) => {
  const { isDark } = useTheme();
  return (
    <>
      <Stimulus exercise={exercise} />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {(exercise.options ?? []).map(opt => {
          const selected = answer === opt.text;
          return (
            <motion.button
              key={opt.id}
              type="button"
              data-option={opt.id}
              aria-pressed={selected}
              disabled={locked}
              whileHover={!locked ? { scale: 1.03 } : {}}
              whileTap={!locked ? { scale: 0.97 } : {}}
              onClick={() => { soundEffects.playClick(); onAnswer(opt.text); }}
              className={`flex flex-col items-center justify-center gap-3 rounded-3xl border-2 p-3 transition-all ${
                selected
                  ? isDark
                    ? 'border-aiki-ai-clair bg-aiki-ai/20 shadow-3d-indigo ring-2 ring-aiki-ai-clair/30'
                    : 'border-aiki-ai bg-indigo-50 shadow-3d-indigo ring-2 ring-aiki-ai/30'
                  : isDark
                    ? 'border-slate-800 bg-slate-900/90 hover:bg-slate-800 shadow-3d-card'
                    : 'border-amber-200 bg-amber-50/90 hover:bg-amber-100/90 shadow-3d-card'
              }`}
            >
              <Illustration
                image={opt.illustration?.image}
                emoji={opt.illustration?.emoji}
                alt={opt.illustration?.alt ?? opt.text}
                width="100%"
                size={160}
                className={`rounded-2xl ${isDark ? 'bg-slate-800/60' : 'bg-amber-100/60'}`}
              />
              {/* the word is only revealed once checked: before, the picture alone must carry the meaning */}
              <span className={`text-sm font-black ${locked ? (isDark ? 'text-white' : 'text-stone-900') : 'sr-only'}`}>
                {locked ? opt.text : opt.illustration?.alt}
              </span>
            </motion.button>
          );
        })}
      </div>
    </>
  );
};

export const imageChoiceDefinition: ExerciseDefinition<string> = {
  label: "Choisissez l'image",
  View: ImageChoiceView,
  isReady: (_ex, a) => !!a,
  check: checkChoice,
};
