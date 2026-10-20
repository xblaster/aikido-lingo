'use client';

import React, { useState } from 'react';
import { Unit, Lesson, Level } from '@/types/curriculum';
import { LEVEL_METADATA } from '@/data/curriculumIndex';
import { LevelOverview } from './LevelOverview';
import { Illustration } from './Illustration';
import { Check, Lock, Star, Play, Sparkles, ArrowRight } from 'lucide-react';
import { soundEffects } from '@/utils/soundEffects';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillTreeProps {
  currentLevel: Level;
  units: Unit[];
  completedLessons: string[];
  onStartLesson: (lesson: Lesson, unit: Unit) => void;
  theme?: 'dark' | 'light';
}

export const SkillTree: React.FC<SkillTreeProps> = ({
  currentLevel,
  units,
  completedLessons,
  onStartLesson,
  theme = 'dark',
}) => {
  const meta = LEVEL_METADATA[currentLevel];
  const [hoveredLessonId, setHoveredLessonId] = useState<string | null>(null);
  const isDark = theme === 'dark';

  // Responsive zig-zag offsets
  const getOffsetClass = (index: number) => {
    const cycle = index % 4;
    switch (cycle) {
      case 0: return 'translate-x-0';
      case 1: return '-translate-x-7 sm:-translate-x-12';
      case 2: return 'translate-x-0';
      case 3: return 'translate-x-7 sm:translate-x-12';
      default: return 'translate-x-0';
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-4 sm:py-6 px-3 sm:px-4 overflow-x-hidden">
      
      {/* Current Level Header Banner with Ambient Glow */}
      <div
        className="bg-gradient-to-r from-aiki-ai-fonce via-aiki-ai to-aiki-ai-fonce text-white rounded-3xl p-5 sm:p-7 shadow-2xl mb-8 sm:mb-12 border-2 border-slate-700/60 relative overflow-hidden group animate-fade-in"
      >
        {/* Animated Glow Backdrop */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-44 h-44 bg-gradient-to-br from-aiki-shu/30 via-amber-500/20 to-aiki-ai/30 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] sm:text-xs font-black uppercase tracking-wider text-aiki-bois mb-2 border border-white/10 shadow-sm">
              <Sparkles size={13} className="animate-spin-slow" />
              Grade : {meta.name}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{meta.name}</h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
              <span className="text-white font-bold">{meta.jpName}</span> · {meta.tagline}
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.08, rotate: [0, -4, 4, 0] }}
            className="flex-shrink-0 self-start sm:self-auto flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-white/15 to-white/5 border-2 border-white/20 shadow-xl backdrop-blur-md p-3"
          >
            <Illustration image={meta.badge} alt={`Badge ${meta.name}`} size={44} />
          </motion.div>
        </div>
      </div>

      <LevelOverview level={currentLevel} isDark={isDark} />

      {/* Units and Lessons Path */}
      <div className="space-y-14 sm:space-y-20">
        {units.map((unit) => {
          return (
            <div
              key={unit.id}
              className="relative animate-fade-in"
            >
              
              {/* Unit Header Card */}
              <div className={`bg-gradient-to-r ${unit.themeColor || 'bg-aiki-ai'} text-white rounded-3xl p-5 sm:p-6 shadow-2xl mb-8 sm:mb-12 relative overflow-hidden border-b-4 border-black/20`}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase bg-black/25 px-2.5 sm:px-3 py-1 rounded-full inline-block mb-1.5 backdrop-blur-sm shadow-sm">
                      Unité {unit.unitNumber}
                    </span>
                    {(unit.review?.statut ?? 'brouillon') === 'brouillon' && (
                      <span className="ml-2 text-[10px] font-black uppercase bg-amber-400/90 text-amber-950 px-2 py-0.5 rounded-full" title="Contenu en brouillon, non relu par un enseignant">
                        Brouillon, non relu par un enseignant
                      </span>
                    )}
                    <h3 className="text-lg sm:text-2xl font-black tracking-tight leading-snug">{unit.title}</h3>
                    <p className="text-white/85 text-xs sm:text-sm font-semibold mt-0.5 sm:mt-1"><span lang="ja-Latn">{unit.jpTitle}</span></p>
                  </div>
                  <Illustration image={unit.cover ? `covers/${unit.cover}` : undefined} emoji="🥋" alt={unit.title} decorative size={112} className="rounded-2xl bg-white/15 border border-white/30" />
                </div>
                <p className="text-white/95 text-xs mt-3 pt-2.5 border-t border-white/20 leading-relaxed font-medium">
                  {unit.description}
                </p>
              </div>

              {/* Lessons Path Nodes */}
              <div className="flex flex-col items-center gap-10 sm:gap-12 py-3 relative">
                
                {/* Connecting background vertical winding path */}
                <div className={`absolute top-4 bottom-4 w-2.5 sm:w-3 rounded-full z-0 shadow-inner ${
                  isDark ? 'bg-slate-800' : 'bg-slate-200/90'
                }`} />

                {unit.lessons.map((lesson, idx) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isFirstLesson = idx === 0 && unit.unitNumber === 1;
                  const isPrevCompleted = idx > 0 ? completedLessons.includes(unit.lessons[idx - 1].id) : true;
                  const isUnlocked = isFirstLesson || isPrevCompleted || isCompleted;
                  const isCurrent = isUnlocked && !isCompleted;
                  const isHovered = hoveredLessonId === lesson.id;

                  return (
                    <div
                      key={lesson.id}
                      className={`relative z-10 flex flex-col items-center transition-transform duration-300 ${getOffsetClass(idx)}`}
                      onMouseEnter={() => setHoveredLessonId(lesson.id)}
                      onMouseLeave={() => setHoveredLessonId(null)}
                    >
                      {/* Floating Interactive Tooltip Popover */}
                      <AnimatePresence>
                        {isHovered && isUnlocked && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: -8, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.9 }}
                            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                            className="absolute -top-24 z-30 bg-slate-900 text-white rounded-2xl p-3 shadow-2xl border-2 border-slate-700 min-w-[200px] text-center pointer-events-none"
                          >
                            <p className="text-xs font-black text-white">{lesson.title}</p>
                            <p className="text-[11px] text-slate-400 font-medium">{lesson.subtitle}</p>
                            <div className="mt-1.5 flex items-center justify-center gap-1 text-[11px] font-black text-aiki-shu">
                              <span>+{lesson.xpReward} XP</span>
                              <span>•</span>
                              <span>{isCompleted ? "Réviser" : "Commencer"}</span>
                              <ArrowRight size={12} />
                            </div>
                            <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-900" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Lesson Node Button */}
                      <div className="relative">
                        {/* Outer Glow Pulse for Active Lesson */}
                        {isCurrent && (
                          <motion.div
                            className="absolute -inset-2 rounded-full bg-aiki-shu/40 blur-md z-0"
                            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.9, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          />
                        )}

                        <motion.button
                          type="button"
                          disabled={!isUnlocked}
                          onClick={() => {
                            if (isUnlocked) {
                              soundEffects.playWhoosh();
                              onStartLesson(lesson, unit);
                            }
                          }}
                          whileHover={isUnlocked ? { scale: 1.1, y: -4 } : {}}
                          whileTap={isUnlocked ? { scale: 0.94 } : {}}
                          className={`relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center transition-all ${
                            isCompleted
                              ? 'bg-aiki-shu text-white shadow-3d-seal hover:shadow-lg'
                              : isCurrent
                              ? 'bg-aiki-shu text-white shadow-3d-seal hover:shadow-xl ring-4 ring-slate-900'
                              : isDark
                              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border-2 border-slate-700 shadow-inner'
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed border-2 border-slate-300'
                          }`}
                        >
                          {/* Inner Icon */}
                          {isCompleted ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', damping: 10, stiffness: 200 }}
                            >
                              <Check size={36} strokeWidth={3.5} className="text-white sm:w-10 sm:h-10" />
                            </motion.div>
                          ) : isCurrent ? (
                            <Play size={30} className="text-white fill-white ml-1 sm:w-8 sm:h-8" />
                          ) : (
                            <Lock size={24} className={isDark ? 'text-slate-600 sm:w-7 sm:h-7' : 'text-slate-400 sm:w-7 sm:h-7'} />
                          )}

                          {/* Floating Mini Badge for Active */}
                          {isCurrent && (
                            <motion.div
                              animate={{ y: [0, -3, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="absolute -top-3 bg-amber-400 text-amber-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border-2 border-slate-900 shadow-md flex items-center gap-1 select-none"
                            >
                              <Star size={10} className="fill-amber-950 text-amber-950" />
                              Départ
                            </motion.div>
                          )}

                          {/* Completed Star Crown */}
                          {isCompleted && (
                            <div className="absolute -top-2 -right-1 bg-amber-400 rounded-full p-1 border-2 border-slate-900 shadow-sm">
                              <Star size={11} className="fill-white text-white" />
                            </div>
                          )}
                        </motion.button>
                      </div>

                      {/* Lesson title label pill underneath */}
                      <div className="mt-2.5 max-w-[150px] sm:max-w-[170px] text-center select-none">
                        <p className={`text-xs font-black leading-tight ${
                          isUnlocked 
                            ? isDark ? 'text-white' : 'text-slate-900' 
                            : isDark ? 'text-slate-300' : 'text-slate-500'
                        }`}>
                          {lesson.title}
                        </p>
                        <p className={`text-[11px] font-bold line-clamp-1 mt-0.5 ${
                          isUnlocked
                            ? isDark ? 'text-slate-300' : 'text-slate-600'
                            : isDark ? 'text-slate-400' : 'text-slate-400'
                        }`}>
                          {lesson.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
