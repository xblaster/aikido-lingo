'use client';

import React, { useEffect, useState } from 'react';
import { LessonModal } from '@/components/LessonModal';
import { findLessonById } from '@/data/curriculumIndex';
import demo from '@/data/generated/demo.json';
import fixture from '@/data/generated/demo-fixture.json';
import type { Lesson, Unit } from '@/types/curriculum';
import { ThemeProvider, Theme } from '@/utils/theme';
import { Sun, Moon } from 'lucide-react';

const DEMO_UNIT = {
  id: 'demo', level: '6K', unitNumber: 0, title: 'Démonstration', jpTitle: '', description: '',
  themeColor: '', icon: 'Sparkles', lessons: [],
} as unknown as Unit;

/**
 * Exercise engine check page.
 *   /demo            the technical fixture (tests/fixtures/demo-types.yaml): one exercise per type
 *   /demo?contenu=1  the content team's demo (content/_exemples/demo-types.yaml), when it exists
 *   /demo?lecon=<id> any lesson of the curriculum
 *   /demo?theme=light or dark
 * Progress is not saved.
 */
export default function DemoPage() {
  const [target, setTarget] = useState<{ lesson: Lesson; unit: Unit } | null>(null);
  const [run, setRun] = useState(0);
  const [done, setDone] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('lecon');
    const paramTheme = params.get('theme');
    if (paramTheme === 'light' || paramTheme === 'dark') {
      setTheme(paramTheme);
    }
    const found = id ? findLessonById(id) : null;
    const source = (params.get('contenu') && demo ? demo : fixture ?? demo) as unknown as Lesson | null;
    if (found) setTarget(found);
    else if (source) setTarget({ lesson: source, unit: DEMO_UNIT });
  }, []);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  if (!target) {
    return <main className={`min-h-screen flex items-center justify-center p-6 ${theme === 'dark' ? 'bg-aiki-nuit text-white' : 'bg-amber-50 text-stone-900'}`}>Aucune leçon de démonstration.</main>;
  }
  if (done) {
    return (
      <main className={`min-h-screen flex flex-col items-center justify-center gap-4 p-6 ${theme === 'dark' ? 'bg-aiki-nuit text-white' : 'bg-amber-50 text-stone-900'}`}>
        <p className="font-black text-xl">Démonstration terminée.</p>
        <button type="button" className="px-6 py-3 rounded-2xl bg-aiki-shu text-white font-black" onClick={() => { setDone(false); setRun(r => r + 1); }}>
          Recommencer
        </button>
      </main>
    );
  }
  return (
    <ThemeProvider theme={theme} onToggleTheme={toggleTheme}>
      <div className="relative min-h-screen">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Passer en thème clair' : 'Passer en thème sombre'}
          title={theme === 'dark' ? 'Thème clair' : 'Thème sombre'}
          className={`fixed top-3 right-16 z-[60] p-2 rounded-2xl border-2 transition-colors ${
            theme === 'dark'
              ? 'bg-slate-900/90 border-slate-700 text-amber-300 hover:bg-slate-800'
              : 'bg-white/90 border-amber-300 text-amber-700 hover:bg-amber-50 shadow-sm'
          }`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <LessonModal key={run} lesson={target.lesson} unit={target.unit} onClose={() => setDone(true)} onComplete={() => setDone(true)} />
      </div>
    </ThemeProvider>
  );
}
