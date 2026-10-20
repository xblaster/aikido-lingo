'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '@/utils/soundEffects';
import { Illustration } from './Illustration';

const POSE: Record<NonNullable<MascotProps['mood']>, string> = {
  happy: 'mascotte/neutre',
  cheering: 'mascotte/bravo',
  thinking: 'mascotte/reflechit',
  encouraging: 'mascotte/encourage',
};

interface MascotProps {
  mood?: 'happy' | 'cheering' | 'thinking' | 'encouraging';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  speechText?: string;
  className?: string;
  interactive?: boolean;
}

/** Encouragements, in Japanese (romaji) with their French meaning. */
export const MASCOT_PHRASES = [
  'Yoshi ! (C’est bien !)',
  'Ganbatte ! (Courage !)',
  'Mō ichido ! (Encore une fois !)',
  'Onegaishimasu ! (Pratiquons ensemble !)',
  'Keiko, keiko… (La pratique, toujours.)',
  'Dōmo arigatō gozaimashita !',
];

/**
 * « Deshi », the mascot: a small practitioner in white keikogi and indigo hakama, with an
 * ensō behind him and a red seal. Original drawing (SVG).
 */
export const Mascot: React.FC<MascotProps> = ({
  mood = 'happy',
  size = 'md',
  speechText,
  className = '',
  interactive = true,
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [customSpeech, setCustomSpeech] = useState<string | null>(null);

  const sizeClasses = { sm: 'w-16 h-16', md: 'w-24 h-24', lg: 'w-36 h-36', xl: 'w-48 h-48' }[size];

  const handleClick = () => {
    if (!interactive) return;
    soundEffects.playMascotRoar();
    setCustomSpeech(MASCOT_PHRASES[clickCount % MASCOT_PHRASES.length]);
    setClickCount(c => c + 1);
  };

  const displayText = customSpeech || speechText;
  const closedEyes = mood === 'cheering' || mood === 'encouraging';

  return (
    <div className={`flex items-center gap-3 relative ${className}`}>
      <motion.div
        onClick={handleClick}
        title={interactive ? 'Cliquez sur Deshi pour un encouragement' : undefined}
        className={`relative ${sizeClasses} flex-shrink-0 select-none ${interactive ? 'cursor-pointer' : ''}`}
        animate={{
          y: mood === 'cheering' ? [0, -10, 0, -8, 0] : [0, -4, 0],
          rotate: mood === 'cheering' ? [0, -3, 3, -2, 0] : [0, 0.5, -0.5, 0],
        }}
        transition={{ duration: mood === 'cheering' ? 1.4 : 3, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={interactive ? { scale: 1.08 } : {}}
        whileTap={interactive ? { scale: 0.92 } : {}}
      >
        <Illustration image={POSE[mood]} alt="Deshi, la mascotte" width="100%" height="100%" fallbackNode={<svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-lg overflow-visible" role="img" aria-label="Deshi, la mascotte">
          {/* ensō */}
          <path d="M60 6a54 54 0 1 0 50 34" fill="none" stroke="#8EA2F0" strokeOpacity="0.35" strokeWidth="7" strokeLinecap="round" />
          {/* hakama (indigo, pleated) */}
          <path d="M34 72 L86 72 L98 114 L22 114 Z" fill="#22325A" />
          <path d="M60 74 L60 114 M47 76 L42 114 M73 76 L78 114" stroke="#16213D" strokeWidth="2.5" />
          {/* keikogi (white jacket) */}
          <path d="M36 52 Q60 44 84 52 L88 76 L32 76 Z" fill="#F6F1E7" />
          <path d="M50 50 L60 66 L70 50" fill="none" stroke="#8A8F99" strokeWidth="2.5" />
          {/* sleeves and hands */}
          <path d="M36 54 Q22 62 26 78 L36 76 Z" fill="#F6F1E7" />
          <path d="M84 54 Q98 62 94 78 L84 76 Z" fill="#F6F1E7" />
          <circle cx="29" cy="80" r="5" fill="#F5D0A9" />
          <circle cx="91" cy="80" r="5" fill="#F5D0A9" />
          {/* belt */}
          <rect x="33" y="70" width="54" height="6" rx="2" fill="#1C1C1E" />
          {/* head and hair */}
          <circle cx="60" cy="32" r="20" fill="#F5D0A9" />
          <path d="M40 30 Q42 10 60 11 Q78 10 80 30 Q70 20 60 22 Q50 20 40 30 Z" fill="#1C1C1E" />
          <circle cx="60" cy="10" r="5" fill="#1C1C1E" />
          {closedEyes ? (
            <g stroke="#1C1C1E" strokeWidth="2.6" strokeLinecap="round" fill="none">
              <path d="M49 34 Q53 29 57 34" />
              <path d="M63 34 Q67 29 71 34" />
            </g>
          ) : mood === 'thinking' ? (
            <g fill="#1C1C1E">
              <circle cx="53" cy="32" r="2.6" />
              <circle cx="67" cy="32" r="2.6" />
              <path d="M49 27 L57 28 M63 28 L71 27" stroke="#1C1C1E" strokeWidth="2" />
            </g>
          ) : (
            <g fill="#1C1C1E">
              <ellipse cx="53" cy="33" rx="3" ry="3.6" />
              <ellipse cx="67" cy="33" rx="3" ry="3.6" />
              <circle cx="54" cy="32" r="1" fill="white" />
              <circle cx="68" cy="32" r="1" fill="white" />
            </g>
          )}
          <ellipse cx="48" cy="39" rx="3.5" ry="2" fill="#F08A8A" opacity="0.6" />
          <ellipse cx="72" cy="39" rx="3.5" ry="2" fill="#F08A8A" opacity="0.6" />
          {mood === 'thinking' ? (
            <path d="M55 43 L65 43" stroke="#1C1C1E" strokeWidth="2.4" strokeLinecap="round" />
          ) : (
            <path d="M54 41 Q60 47 66 41" stroke="#1C1C1E" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          )}
          {/* hanko seal */}
          <rect x="88" y="94" width="18" height="18" rx="3" fill="#D2462D" />
          <path d="M92 99 H102 M97 99 V108 M92 108 H102" stroke="#F6F1E7" strokeWidth="2" />
        </svg>} />
        {mood === 'cheering' && (
          <motion.div
            className="absolute -top-3 -right-2 text-aiki-bois font-black text-lg select-none"
            animate={{ scale: [0.8, 1.3, 0.8], rotate: [0, 20, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            ✨
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {displayText && (
          <motion.div
            key={displayText}
            initial={{ opacity: 0, scale: 0.85, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, x: -5 }}
            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
            className="relative bg-aiki-kinari border-2 border-slate-200 rounded-2xl px-4 py-2.5 shadow-md text-sm font-extrabold text-slate-800 max-w-xs"
          >
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-aiki-kinari border-b-8 border-b-transparent z-10" />
            {displayText}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
