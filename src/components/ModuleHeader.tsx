'use client';

import React from 'react';
import { Illustration } from './Illustration';

import { useTheme } from '@/utils/theme';

interface ModuleHeaderProps {
  /** Catalogue id of the header image (modules/<id>). */
  image: string;
  kicker: string;
  title: string;
  jp?: string;
  description: string;
  children?: React.ReactNode;
}

/** Banner of a side module (Lexique, Reishiki, Décodeur, Passage de grade). */
export const ModuleHeader: React.FC<ModuleHeaderProps> = ({ image, kicker, title, jp, description, children }) => (
  <div className="bg-gradient-to-r from-aiki-ai-fonce via-aiki-ai to-aiki-ai-fonce text-white rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden border-2 border-aiki-ai-clair/20">
    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="min-w-0">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-black uppercase tracking-wider text-aiki-kinari mb-2">
          {kicker}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          {title} {jp && <span lang="ja" className="font-jp text-aiki-bois text-xl sm:text-2xl ml-1">{jp}</span>}
        </h2>
        <p className="text-slate-200 text-sm mt-1 max-w-xl font-medium">{description}</p>
        {children}
      </div>
      <Illustration image={image} alt="" decorative size={176} className="self-start sm:self-auto rounded-2xl bg-white/5" />
    </div>
  </div>
);

/** Shown when a module's content file is missing or empty (content arrives later). */
export const EmptyState: React.FC<{ file: string; what: string }> = ({ file, what }) => {
  const { isDark } = useTheme();
  return (
    <div
      role="status"
      className={`rounded-3xl border-2 border-dashed p-8 text-center transition-colors ${
        isDark ? 'border-slate-700 bg-slate-900/50' : 'border-slate-300 bg-white shadow-sm'
      }`}
    >
      <div className="text-4xl mb-3" aria-hidden>🌱</div>
      <p className={`font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{what} en préparation</p>
      <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        Ce module se remplira dès que <code className={isDark ? 'text-aiki-ai-clair' : 'text-aiki-ai font-bold'}>{file}</code> sera rédigé et sourcé.
      </p>
    </div>
  );
};

