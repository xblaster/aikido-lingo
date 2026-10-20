'use client';

import React from 'react';
import type { Level } from '@/types/curriculum';
import { LEVELS } from '@/types/curriculum';
import { LEVEL_METADATA, getLevelStatus } from '@/data/curriculumIndex';
import { Flame, Gem, ChevronDown, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { soundEffects } from '@/utils/soundEffects';
import { motion, AnimatePresence } from 'framer-motion';
import type { ActiveTab } from './Sidebar';
import { Illustration } from './Illustration';

interface HeaderProps {
  currentLevel: Level;
  onSelectLevel: (lvl: Level) => void;
  streak: number;
  gems: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenTab: (tab: ActiveTab) => void;
}

/** The app logo: an ensō with a red seal. */
export const Logo: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden className="flex-shrink-0">
    <rect width="100" height="100" rx="24" fill="#22325A" />
    <path d="M50 16a34 34 0 1 0 31 20" fill="none" stroke="#F6F1E7" strokeWidth="10" strokeLinecap="round" />
    <rect x="62" y="62" width="20" height="20" rx="4" fill="#D2462D" />
  </svg>
);

const QUICK: { tab: ActiveTab; label: string }[] = [
  { tab: 'lexique', label: 'Lexique' },
  { tab: 'reishiki', label: 'Reishiki' },
  { tab: 'decodeur', label: 'Décodeur' },
  { tab: 'examen', label: 'Passage de grade' },
];

export const Header: React.FC<HeaderProps> = ({
  currentLevel, onSelectLevel, streak, gems, soundEnabled, onToggleSound, theme, onToggleTheme, onOpenTab,
}) => {
  const [open, setOpen] = React.useState(false);
  const isDark = theme === 'dark';
  const meta = LEVEL_METADATA[currentLevel];

  return (
    <header className={`sticky top-0 z-30 transition-colors border-b-2 px-4 lg:px-8 py-3 ${
      isDark ? 'bg-aiki-nuit/95 backdrop-blur-md border-slate-800 text-white shadow-md' : 'bg-white/95 backdrop-blur-md border-slate-100 text-slate-800 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button type="button" className="flex items-center gap-2 select-none" onClick={() => { soundEffects.playClick(); onOpenTab('learn'); }} aria-label="Aikido Lingo, accueil">
            <Logo />
            <span className={`hidden sm:inline font-black text-xl tracking-tight ${isDark ? 'text-white' : 'text-aiki-ai'}`}>
              Aikido <span className="text-aiki-shu">Lingo</span>
            </span>
          </button>

          <div className="relative">
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-haspopup="listbox"
              aria-expanded={open}
              onClick={() => { soundEffects.playClick(); setOpen(!open); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border-2 font-extrabold text-xs sm:text-sm shadow-sm transition-colors ${
                isDark ? 'border-slate-700 hover:border-aiki-ai-clair bg-slate-800 text-white' : 'border-slate-200 hover:border-aiki-ai bg-white text-slate-700'
              }`}
            >
              <Illustration image={meta.badge} alt={`Badge ${meta.name}`} size={20} />
              <span>{meta.name}</span>
              <span className={`hidden md:inline font-semibold ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>({meta.tagline})</span>
              <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {open && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -6 }}
                    className={`absolute left-0 mt-2 w-72 rounded-3xl shadow-2xl border-2 p-2.5 z-50 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-100'}`}
                    role="listbox"
                  >
                    <p className="text-[11px] font-black uppercase text-slate-400 px-3 py-1 tracking-wider">Grades</p>
                    <div className="space-y-1 mt-1">
                      {LEVELS.map(lvl => {
                        const m = LEVEL_METADATA[lvl];
                        const selected = lvl === currentLevel;
                        const empty = getLevelStatus(lvl) === 'vide';
                        return (
                          <button
                            key={lvl}
                            type="button"
                            role="option"
                            aria-selected={selected}
                            onClick={() => { soundEffects.playWhoosh(); onSelectLevel(lvl); setOpen(false); }}
                            className={`w-full text-left px-3 py-2.5 rounded-2xl text-xs flex items-center gap-3 transition-all ${
                              selected ? 'bg-aiki-shu/15 border-2 border-aiki-shu/50' : isDark ? 'hover:bg-slate-800 border-2 border-transparent' : 'hover:bg-slate-50 border-2 border-transparent'
                            }`}
                          >
                            <Illustration image={m.badge} alt="" decorative size={32} />
                            <div className="flex-1 min-w-0">
                              <div className={`font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {m.name} <span className="font-semibold text-slate-400">· {m.jpName}</span>
                              </div>
                              <p className="text-[11px] text-slate-400 line-clamp-1 font-medium">{empty ? 'En préparation' : m.tagline}</p>
                            </div>
                            {selected && <span className="text-aiki-shu font-black">✓</span>}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-2" aria-label="Modules">
          {QUICK.map(q => (
            <motion.button
              key={q.tab}
              type="button"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenTab(q.tab)}
              className={`px-3 py-1.5 rounded-2xl font-extrabold text-xs border shadow-sm transition-colors ${
                isDark ? 'bg-aiki-ai/50 hover:bg-aiki-ai text-aiki-kinari border-aiki-ai-clair/30' : 'bg-aiki-kinari hover:bg-white text-aiki-ai border-aiki-tatami'
              }`}
            >
              {q.label}
            </motion.button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4 select-none">
          <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm text-amber-400" title={`${streak} jour(s) de pratique consécutif(s)`}>
            <Flame size={20} className="fill-amber-400 text-amber-400" />
            <span>{streak}</span>
          </div>
          <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm text-aiki-ai-clair" title={`${gems} gemmes`}>
            <Gem size={20} className="fill-aiki-ai-clair text-aiki-ai-clair" />
            <span>{gems}</span>
          </div>
          <button
            type="button"
            onClick={() => { soundEffects.playClick(); onToggleTheme(); }}
            className={`p-2 rounded-2xl transition-colors ${isDark ? 'text-aiki-bois hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}
            title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
            aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            onClick={onToggleSound}
            className={`p-2 rounded-2xl transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
            title={soundEnabled ? 'Couper le son' : 'Activer le son'}
            aria-label={soundEnabled ? 'Couper le son' : 'Activer le son'}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};
