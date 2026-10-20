'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { DialogueLine } from '@/types/curriculum';

import { useTheme } from '@/utils/theme';

interface DialogueBubblesProps {
  lines: DialogueLine[];
  /** Content shown in place of the missing line (complete_chat). */
  missingSlot?: React.ReactNode;
}

/** A conversation: one bubble per line, speakers alternating left and right. */
export const DialogueBubbles: React.FC<DialogueBubblesProps> = ({ lines, missingSlot }) => {
  const { isDark } = useTheme();
  const speakers = [...new Set(lines.map(l => l.speaker))];
  return (
    <div className="space-y-3 mb-6">
      {lines.map((line, i) => {
        const right = speakers.indexOf(line.speaker) % 2 === 1;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${right ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-3xl border-2 px-4 py-3 ${
                right
                  ? isDark
                    ? 'bg-aiki-ai/50 border-aiki-ai-clair/40'
                    : 'bg-indigo-50 border-indigo-200'
                  : isDark
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-amber-50 border-amber-200'
              }`}
            >
              <div
                className={`text-[11px] font-black uppercase tracking-wider mb-1 ${
                  isDark ? 'text-slate-400' : 'text-stone-500'
                }`}
              >
                {line.speaker}
              </div>
              {line.missing && missingSlot !== undefined ? (
                missingSlot
              ) : (
                <div className={`font-black ${isDark ? 'text-white' : 'text-stone-900'}`}>{line.text}</div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
