'use client';

import React, { useEffect, useState } from 'react';
import { audioSpeech } from '@/utils/audioSpeech';

/**
 * Shown next to a sound read by speech synthesis when the browser has no Japanese voice:
 * the pronunciation heard is then approximate (or absent without speech synthesis).
 */
export const SynthesisNotice: React.FC = () => {
  const [state, setState] = useState<'ok' | 'approx' | 'none'>('ok');
  useEffect(() => {
    const update = () =>
      setState(!audioSpeech.isSupported() ? 'none' : audioSpeech.hasJapaneseVoice() ? 'ok' : 'approx');
    update();
    // voices load asynchronously in most browsers
    const t = setTimeout(update, 1000);
    return () => clearTimeout(t);
  }, []);
  if (state === 'ok') return null;
  return (
    <span className="text-[11px] font-semibold text-amber-300 text-right leading-tight max-w-[11rem]">
      {state === 'none'
        ? 'Synthèse vocale indisponible dans ce navigateur'
        : 'Pas de voix japonaise : prononciation approximative'}
    </span>
  );
};
