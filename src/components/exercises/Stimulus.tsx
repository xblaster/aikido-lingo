'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Exercise } from '@/types/curriculum';
import { AudioButton } from '../AudioButton';
import { Mascot } from '../Mascot';
import { SynthesisNotice } from './SynthesisNotice';
import { useTheme } from '@/utils/theme';

interface StimulusProps {
  exercise: Exercise;
  /** Hide the Japanese text (listening exercises: the learner must not read it). */
  hideText?: boolean;
  /** Listening exercise once checked: show what was heard. */
  revealAudio?: boolean;
  /** Show the kanji big (kanji_choice). */
  bigKanji?: boolean;
  /** Do not offer audio (the sound would give the answer away). */
  noAudio?: boolean;
}

/** The bubble that presents what the exercise is about: term, kanji, French text, audio. */
export const Stimulus: React.FC<StimulusProps> = ({ exercise, hideText = false, revealAudio = false, bigKanji = false, noAudio = false }) => {
  const { isDark } = useTheme();
  const jp = exercise.jpText ?? (revealAudio ? exercise.audioText : undefined);
  const showJp = !hideText && jp;
  const showKanji = !hideText && exercise.kanji;
  const spoken = noAudio ? undefined : exercise.audioText ?? exercise.jpText;
  if (!showJp && !showKanji && !exercise.frText && !spoken) return null;
  return (
    <div className="flex items-start gap-4 mb-6">
      <Mascot mood="happy" size="sm" className="hidden sm:flex" interactive={false} />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex-1 border-2 rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-4 shadow-md transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        <div>
          {showKanji && (
            <div
              lang="ja"
              className={`font-jp font-black ${
                bigKanji
                  ? isDark
                    ? 'text-5xl sm:text-6xl tracking-widest text-white'
                    : 'text-5xl sm:text-6xl tracking-widest text-aiki-sumi'
                  : isDark
                  ? 'text-base text-slate-300'
                  : 'text-base text-slate-700'
              }`}
            >
              {exercise.kanji}
            </div>
          )}
          {showJp && <div lang="ja-Latn" className={`text-lg sm:text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{jp}</div>}
          {exercise.frText && <div className={`text-sm font-semibold mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>« {exercise.frText} »</div>}
          {hideText && !exercise.frText && <div className={`text-sm font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Écoutez la prononciation.</div>}
        </div>
        {spoken && (
          <div className="flex flex-col items-end gap-1">
            <AudioButton text={spoken} size="md" showSlowToggle />
            <SynthesisNotice />
          </div>
        )}
      </motion.div>
    </div>
  );
};

