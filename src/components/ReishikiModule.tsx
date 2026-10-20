'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronDown, Circle } from 'lucide-react';
import { ETIQUETTE } from '@/data/modules';
import { soundEffects } from '@/utils/soundEffects';
import { AudioButton } from './AudioButton';
import { EmptyState, ModuleHeader } from './ModuleHeader';
import { useTheme } from '@/utils/theme';

interface ReishikiModuleProps {
  seen: string[];
  onToggleSeen: (id: string) => void;
  theme?: 'dark' | 'light';
}

/** Reishiki: etiquette cards (content/etiquette.yaml) — steps, then why. */
export const ReishikiModule: React.FC<ReishikiModuleProps> = ({ seen, onToggleSeen, theme: propTheme }) => {
  const { isDark: contextIsDark } = useTheme();
  const isDark = propTheme ? propTheme === 'dark' : contextIsDark;
  const [open, setOpen] = useState<string | null>(ETIQUETTE[0]?.id ?? null);
  const done = ETIQUETTE.filter(c => seen.includes(c.id)).length;

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8 px-1 sm:px-4 space-y-6">
      <ModuleHeader
        image="modules/reishiki"
        kicker="Étiquette du dojo"
        title="Reishiki"
        jp="礼式"
        description="Les gestes de politesse du dojo, étape par étape, et pourquoi on les fait."
      >
        {ETIQUETTE.length > 0 && (
          <p className="mt-3 text-xs font-black text-aiki-bois">
            {done} / {ETIQUETTE.length} fiche{ETIQUETTE.length > 1 ? 's' : ''} lue{done > 1 ? 's' : ''}
          </p>
        )}
      </ModuleHeader>

      {ETIQUETTE.length === 0 ? (
        <EmptyState file="content/etiquette.yaml" what="Les fiches d'étiquette" />
      ) : (
        <ul className="space-y-4">
          {ETIQUETTE.map(card => {
            const isOpen = open === card.id;
            const isSeen = seen.includes(card.id);
            return (
              <li
                key={card.id}
                className={`rounded-3xl border-2 overflow-hidden transition-colors ${
                  isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white shadow-sm'
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => { soundEffects.playClick(); setOpen(isOpen ? null : card.id); }}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className="flex items-center gap-3">
                    {isSeen ? <CheckCircle2 size={20} className="text-emerald-400" aria-label="lue" /> : <Circle size={20} className={isDark ? 'text-slate-600' : 'text-slate-300'} aria-hidden />}
                    <span>
                      <span className={`block font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{card.titre}</span>
                      {card.jp && <span lang="ja-Latn" className={`block text-xs font-bold ${isDark ? 'text-aiki-ai-clair' : 'text-aiki-ai'}`}>{card.jp}</span>}
                    </span>
                  </span>
                  <ChevronDown size={18} className={`${isDark ? 'text-slate-400' : 'text-slate-500'} transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden />
                </button>
                {isOpen && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="px-5 pb-5 space-y-4">
                    {card.jp && <AudioButton text={card.jp} size="sm" showSlowToggle />}
                    <ol className="space-y-2">
                      {(card.etapes ?? []).map((step, i) => (
                        <li key={i} className={`flex gap-3 text-sm ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                          <span className="w-6 h-6 rounded-lg bg-aiki-shu text-white text-xs font-black flex items-center justify-center flex-shrink-0">{i + 1}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                    <div className={`rounded-2xl border-2 p-3 text-sm ${
                      isDark ? 'border-aiki-bois/40 bg-aiki-bois/10 text-amber-50' : 'border-aiki-bois/60 bg-aiki-bois/15 text-amber-950'
                    }`}>
                      <span className="font-black">Pourquoi ? </span>{card.pourquoi}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      {card.source && <span className="text-[11px] text-slate-500">Source : {card.source.ref}</span>}
                      <button
                        type="button"
                        onClick={() => { soundEffects.playChipPop(); onToggleSeen(card.id); }}
                        className={`px-4 py-2 rounded-2xl text-xs font-black border-2 transition-colors ${
                          isSeen
                            ? isDark
                              ? 'border-emerald-600 text-emerald-300'
                              : 'border-emerald-600 text-emerald-700 bg-emerald-50'
                            : 'border-aiki-shu bg-aiki-shu text-white shadow-3d-seal'
                        }`}
                      >
                        {isSeen ? 'Lue ✓' : "J'ai lu cette fiche"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

