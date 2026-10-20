'use client';

import React from 'react';
import { BookOpen, BookText, Landmark, Puzzle, GraduationCap, Trophy, RotateCcw } from 'lucide-react';
import { soundEffects } from '@/utils/soundEffects';
import { Mascot } from './Mascot';
import { motion } from 'framer-motion';

export type ActiveTab = 'learn' | 'lexique' | 'reishiki' | 'decodeur' | 'examen' | 'stats';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onResetProgress: () => void;
  xp: number;
  theme?: 'dark' | 'light';
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onResetProgress,
  xp,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';

  const navItems: { id: ActiveTab; label: string; jpLabel: string; icon: React.ReactNode }[] = [
    { id: 'learn', label: 'Parcours', jpLabel: 'Keiko', icon: <BookOpen size={20} /> },
    { id: 'lexique', label: 'Lexique', jpLabel: 'Yōgo', icon: <BookText size={20} /> },
    { id: 'reishiki', label: 'Reishiki', jpLabel: 'Étiquette', icon: <Landmark size={20} /> },
    { id: 'decodeur', label: 'Décodeur', jpLabel: 'Waza no namae', icon: <Puzzle size={20} /> },
    { id: 'examen', label: 'Passage de grade', jpLabel: 'Shinsa', icon: <GraduationCap size={20} /> },
    { id: 'stats', label: 'Progrès', jpLabel: 'Seiseki', icon: <Trophy size={20} /> },
  ];

  return (
    <>
      {/* Desktop / Tablet Vertical Sidebar */}
      <aside className={`hidden md:flex w-64 lg:w-72 flex-col justify-between p-4 flex-shrink-0 sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto border-r-2 transition-colors ${
        isDark
          ? 'bg-slate-900 border-slate-800 text-slate-100'
          : 'bg-white border-slate-100 text-slate-800'
      }`}>
        
        {/* Navigation Links */}
        <div className="space-y-1.5">
          <p className={`px-3 text-[11px] font-black uppercase tracking-widest mb-2.5 ${
            isDark ? 'text-slate-300' : 'text-slate-500'
          }`}>
            Aikido Lingo
          </p>

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                type="button"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  soundEffects.playWhoosh();
                  onSelectTab(item.id);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-black text-sm transition-all text-left relative ${
                  isActive
                    ? 'bg-aiki-shu/20 text-aiki-shu border-2 border-aiki-shu/50 shadow-md'
                    : isDark
                    ? 'text-slate-200 hover:bg-slate-800 hover:text-white border-2 border-transparent'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-aiki-shu' : isDark ? 'text-slate-300' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <div>
                    <div className="leading-tight font-black">{item.label}</div>
                    <div className={`text-[11px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.jpLabel}</div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Mascot Box & Total XP */}
        <div className="mt-4 pt-4 border-t-2 border-slate-800 space-y-3">
          
          {/* Mascot card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`border-2 rounded-3xl p-3.5 shadow-md ${
              isDark
                ? 'bg-gradient-to-br from-aiki-ai via-aiki-ai-fonce to-slate-900 border-aiki-ai-clair/30 text-aiki-kinari'
                : 'bg-gradient-to-br from-aiki-kinari via-white to-aiki-kinari border-aiki-tatami text-aiki-ai'
            }`}
          >
            <Mascot mood="cheering" size="sm" speechText="Ganbatte !" />
            <div className="mt-2.5 text-xs font-bold text-center">
              <span className="font-black text-aiki-bois">Deshi :</span> « Cliquez sur moi ! »
            </div>
          </motion.div>

          {/* Total XP Bar */}
          <div className={`border-2 rounded-2xl p-2.5 flex items-center justify-between text-xs ${
            isDark ? 'bg-slate-800/90 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <span className="font-bold">Total XP</span>
            <span className="font-black text-aiki-ai-clair flex items-center gap-1 text-sm">
              <Trophy size={15} /> {xp} XP
            </span>
          </div>

          {/* Reset Progress */}
          <button
            type="button"
            onClick={() => {
              if (confirm("Voulez-vous vraiment réinitialiser votre progression et recommencer à zéro ?")) {
                onResetProgress();
              }
            }}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold text-slate-400 hover:text-rose-400 transition-colors"
          >
            <RotateCcw size={12} />
            Réinitialiser
          </button>

        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md border-t-2 px-2 py-1.5 flex justify-around items-center shadow-2xl transition-colors ${
        isDark ? 'bg-slate-900/95 border-slate-800 text-white' : 'bg-white/95 border-slate-200 text-slate-800'
      }`}>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                soundEffects.playWhoosh();
                onSelectTab(item.id);
              }}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                isActive
                  ? 'text-aiki-shu font-black'
                  : isDark ? 'text-slate-300 font-bold hover:text-white' : 'text-slate-500 font-semibold'
              }`}
            >
              <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-aiki-shu/20' : ''}`}>
                {item.icon}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 leading-none text-center">{item.label.split(" ")[0]}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
