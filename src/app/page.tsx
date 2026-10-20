'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Sidebar, ActiveTab } from '@/components/Sidebar';
import { SkillTree } from '@/components/SkillTree';
import { LessonModal } from '@/components/LessonModal';
import { LexiqueModule } from '@/components/LexiqueModule';
import { ReishikiModule } from '@/components/ReishikiModule';
import { DecodeurModule } from '@/components/DecodeurModule';
import { ExamenModule } from '@/components/ExamenModule';
import { StatsModal } from '@/components/StatsModal';
import { Mascot } from '@/components/Mascot';

import type { Level, Lesson, Unit } from '@/types/curriculum';
import { UserProgress, INITIAL_USER_PROGRESS } from '@/types/gamification';
import { loadUserProgress, saveUserProgress, resetUserProgress } from '@/utils/storage';
import { getUnitsForLevel } from '@/data/curriculumIndex';
import { soundEffects } from '@/utils/soundEffects';
import { ThemeProvider } from '@/utils/theme';

const today = () => new Date().toISOString().split('T')[0];

/** Streak: +1 on the day after the last practice, reset after a missed day. */
function touchStreak(p: UserProgress): UserProgress {
  const t = today();
  if (p.lastActiveDate === t) return p;
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  return { ...p, streak: p.lastActiveDate === yesterday ? p.streak + 1 : 1, lastActiveDate: t };
}

export default function Home() {
  const [progress, setProgress] = useState<UserProgress>(INITIAL_USER_PROGRESS);
  const [activeTab, setActiveTab] = useState<ActiveTab>('learn');
  const [activeLesson, setActiveLesson] = useState<{ lesson: Lesson; unit: Unit } | null>(null);
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  useEffect(() => {
    const saved = { ...INITIAL_USER_PROGRESS, ...loadUserProgress() };
    setProgress(saved);
    soundEffects.setEnabled(saved.soundEnabled);
    setIsClientLoaded(true);
  }, []);

  useEffect(() => {
    if (isClientLoaded) saveUserProgress(progress);
  }, [progress, isClientLoaded]);

  const handleSelectLevel = (level: Level) =>
    setProgress(prev => ({
      ...prev,
      currentLevel: level,
      unlockedLevels: prev.unlockedLevels.includes(level) ? prev.unlockedLevels : [...prev.unlockedLevels, level],
    }));

  const handleToggleSound = () => {
    const next = !progress.soundEnabled;
    soundEffects.setEnabled(next);
    setProgress(prev => ({ ...prev, soundEnabled: next }));
  };

  const handleToggleTheme = () => setProgress(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));

  const handleResetProgress = () => {
    setProgress(resetUserProgress());
    setActiveTab('learn');
    setActiveLesson(null);
  };

  const handleCompleteLesson = (xpGained: number, gemsGained: number) => {
    if (!activeLesson) return;
    const { lesson, unit } = activeLesson;
    setProgress(prev => {
      const completedLessons = prev.completedLessons.includes(lesson.id) ? prev.completedLessons : [...prev.completedLessons, lesson.id];
      const unitDone = unit.lessons.every(l => completedLessons.includes(l.id));
      const completedUnits = unitDone && !prev.completedUnits.includes(unit.id) ? [...prev.completedUnits, unit.id] : prev.completedUnits;
      return touchStreak({ ...prev, xp: prev.xp + xpGained, gems: prev.gems + gemsGained, completedLessons, completedUnits });
    });
    setActiveLesson(null);
  };

  const currentUnits = getUnitsForLevel(progress.currentLevel);
  const isDark = progress.theme === 'dark';

  return (
    <ThemeProvider theme={progress.theme} onToggleTheme={handleToggleTheme}>
      <div className={`min-h-screen flex flex-col transition-colors ${isDark ? 'bg-aiki-nuit text-slate-100 bg-duo-canvas-dark' : 'bg-aiki-kinari text-slate-800'}`}>
      <Header
        currentLevel={progress.currentLevel}
        onSelectLevel={handleSelectLevel}
        streak={progress.streak}
        gems={progress.gems}
        soundEnabled={progress.soundEnabled}
        onToggleSound={handleToggleSound}
        theme={progress.theme}
        onToggleTheme={handleToggleTheme}
        onOpenTab={setActiveTab}
      />

      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full">
        <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} onResetProgress={handleResetProgress} xp={progress.xp} theme={progress.theme} />

        <main className="flex-1 p-3 sm:p-6 md:p-8 pb-24 md:pb-8 overflow-y-auto">
          <div key={activeTab + progress.currentLevel} className="animate-fade-in">
            {activeTab === 'learn' && (
              <SkillTree
                currentLevel={progress.currentLevel}
                units={currentUnits}
                completedLessons={progress.completedLessons}
                onStartLesson={(lesson, unit) => setActiveLesson({ lesson, unit })}
                theme={progress.theme}
              />
            )}
            {activeTab === 'lexique' && <LexiqueModule />}
            {activeTab === 'reishiki' && (
              <ReishikiModule
                seen={progress.etiquetteSeen}
                onToggleSeen={id =>
                  setProgress(prev => ({
                    ...prev,
                    etiquetteSeen: prev.etiquetteSeen.includes(id) ? prev.etiquetteSeen.filter(x => x !== id) : [...prev.etiquetteSeen, id],
                  }))
                }
              />
            )}
            {activeTab === 'decodeur' && (
              <DecodeurModule onQuizCorrect={() => setProgress(prev => touchStreak({ ...prev, decoderScore: prev.decoderScore + 1, xp: prev.xp + 2 }))} />
            )}
            {activeTab === 'examen' && (
              <ExamenModule
                bestScores={progress.examScores}
                onFinish={(level, score) =>
                  setProgress(prev =>
                    touchStreak({
                      ...prev,
                      xp: prev.xp + Math.round(score / 10),
                      examScores: { ...prev.examScores, [level]: Math.max(score, prev.examScores[level] ?? 0) },
                    }),
                  )
                }
              />
            )}
            {activeTab === 'stats' && <StatsModal progress={progress} />}
          </div>
        </main>
      </div>

      <AnimatePresence>
        {activeLesson && (
          <LessonModal
            lesson={activeLesson.lesson}
            unit={activeLesson.unit}
            onClose={() => setActiveLesson(null)}
            onComplete={handleCompleteLesson}
          />
        )}
      </AnimatePresence>

      {/* first launch: « le tatami d'abord » */}
      <AnimatePresence>
        {isClientLoaded && !progress.welcomeSeen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-title"
          >
            <div className="max-w-md w-full rounded-3xl bg-aiki-nuit border-2 border-aiki-ai-clair/30 p-6 text-slate-100 space-y-4">
              <Mascot mood="happy" size="md" speechText="Onegaishimasu !" interactive={false} />
              <h2 id="welcome-title" className="text-xl font-black">Le tatami d&apos;abord</h2>
              <p className="text-sm text-slate-300">
                Aikido Lingo vous aide à comprendre le vocabulaire japonais, l&apos;étiquette et les noms de techniques. Il
                n&apos;enseigne pas le geste : chutes et techniques s&apos;apprennent au dojo, sous la conduite de votre enseignant.
                Les usages varient selon les fédérations et les dojos ; en cas de doute, suivez celui de votre dojo.
              </p>
              <button
                type="button"
                autoFocus
                onClick={() => setProgress(prev => ({ ...prev, welcomeSeen: true }))}
                className="w-full py-3 rounded-2xl font-black bg-aiki-shu hover:bg-aiki-shu-fonce text-white shadow-3d-seal"
              >
                Compris, onegaishimasu
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}
