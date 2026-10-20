'use client';

import React, { useState } from 'react';
import { Volume2, Snail } from 'lucide-react';
import { audioSpeech } from '@/utils/audioSpeech';
import { soundEffects } from '@/utils/soundEffects';
import { motion } from 'framer-motion';

interface AudioButtonProps {
  /** Japanese text (romaji or kana) read by speech synthesis (ja-JP). */
  text: string;
  size?: 'sm' | 'md' | 'lg';
  showSlowToggle?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  size = 'md',
  showSlowToggle = false,
  className = '',
  variant = 'primary',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSlow, setIsSlow] = useState(false);

  const handlePlay = (slowSpeed = false) => {
    soundEffects.playClick();
    if (isPlaying) {
      audioSpeech.stop();
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    setIsSlow(slowSpeed);
    audioSpeech.speak(text, {
      slow: slowSpeed,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  const sizeClasses = { sm: 'p-1.5 text-xs', md: 'p-2.5 text-sm', lg: 'p-3.5 text-base' }[size];
  const iconSizes = { sm: 16, md: 20, lg: 26 }[size];
  const variantStyles = {
    primary: 'bg-aiki-ai hover:bg-aiki-ai-fonce text-white shadow-3d-indigo active:translate-y-1 active:shadow-none',
    secondary: 'bg-white hover:bg-slate-50 text-aiki-ai-clair border-2 border-slate-200 shadow-sm active:translate-y-0.5',
    ghost: 'bg-transparent hover:bg-slate-500/10 text-aiki-ai-clair p-1',
  }[variant];

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <motion.button
        type="button"
        onClick={() => handlePlay(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
        className={`rounded-2xl font-bold flex items-center justify-center transition-all ${sizeClasses} ${variantStyles} ${
          isPlaying && !isSlow ? 'ring-4 ring-aiki-ai-clair/30 shadow-lg' : ''
        }`}
        title="Écouter (voix de synthèse japonaise)"
        aria-label="Écouter la prononciation"
        data-audio="synthese"
      >
        <Volume2 size={iconSizes} className={isPlaying && !isSlow ? 'animate-bounce-subtle text-white' : ''} />
      </motion.button>
      {showSlowToggle && (
        <motion.button
          type="button"
          onClick={() => handlePlay(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className={`rounded-2xl font-bold flex items-center justify-center transition-all bg-amber-500 hover:bg-amber-600 text-white shadow-3d-yellow active:translate-y-1 ${sizeClasses} ${
            isPlaying && isSlow ? 'ring-4 ring-amber-400/30 shadow-lg' : ''
          }`}
          title="Écouter à vitesse ralentie"
          aria-label="Écouter lentement"
        >
          <Snail size={iconSizes} className={isPlaying && isSlow ? 'animate-pulse' : ''} />
        </motion.button>
      )}
    </div>
  );
};
