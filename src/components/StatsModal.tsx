'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Gem, CheckCircle2, Award, Puzzle, Landmark } from 'lucide-react';
import type { UserProgress } from '@/types/gamification';
import { LEVELS } from '@/types/curriculum';
import { LEVEL_METADATA, getUnitsForLevel } from '@/data/curriculumIndex';
import { ETIQUETTE } from '@/data/modules';
import { Credits } from './Credits';
import { Mascot } from './Mascot';
import { Illustration } from './Illustration';

import { useTheme } from '@/utils/theme';

const Tile: React.FC<{ icon: React.ReactNode; value: React.ReactNode; label: string }> = ({ icon, value, label }) => {
  const { isDark } = useTheme();
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -2 }}
      className={`border-2 rounded-3xl p-5 text-center transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-amber-200 shadow-sm'
      }`}
    >
      <div className={`w-10 h-10 rounded-2xl mx-auto flex items-center justify-center mb-2 ${
        isDark ? 'bg-slate-800' : 'bg-amber-100'
      }`}>
        {icon}
      </div>
      <div className={`text-2xl font-black ${isDark ? 'text-white' : 'text-stone-900'}`}>{value}</div>
      <div className={`text-xs font-bold uppercase mt-0.5 ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>{label}</div>
    </motion.div>
  );
};

/** Progress: XP, streak, lessons, modules, and the ladder of the six grades. */
export const StatsModal: React.FC<{ progress: UserProgress }> = ({ progress }) => {
  const { isDark } = useTheme();
  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8 px-1 sm:px-4 space-y-8">
      <div className="bg-gradient-to-r from-aiki-ai-fonce via-aiki-ai to-aiki-ai-fonce text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-black uppercase tracking-wider text-aiki-kinari mb-2">
              <Trophy size={14} /> Seiseki — vos progrès
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Votre chemin sur la Voie</h2>
            <p className="text-slate-200 text-sm mt-1 max-w-xl font-medium">
              Du 6e kyu au shodan : le vocabulaire, l&apos;étiquette et les noms de techniques de chaque grade.
            </p>
          </div>
          <Mascot mood="cheering" size="md" speechText="Ganbatte !" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Tile icon={<Flame size={24} className="fill-amber-500 text-amber-500" />} value={`${progress.streak} j`} label="Série en cours" />
        <Tile icon={<Trophy size={24} className="text-aiki-bois" />} value={`${progress.xp} XP`} label="Expérience" />
        <Tile icon={<Gem size={24} className="fill-aiki-ai-clair text-aiki-ai-clair" />} value={progress.gems} label="Gemmes" />
        <Tile icon={<CheckCircle2 size={24} className="text-emerald-400" />} value={progress.completedLessons.length} label="Leçons réussies" />
        <Tile icon={<Puzzle size={24} className="text-orange-300" />} value={progress.decoderScore} label="Appels décodés" />
        <Tile icon={<Landmark size={24} className="text-aiki-kinari" />} value={`${progress.etiquetteSeen.length}${ETIQUETTE.length ? ` / ${ETIQUETTE.length}` : ''}`} label="Fiches reishiki lues" />
      </div>

      <div className={`border-2 rounded-3xl p-6 transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-amber-200 shadow-sm'
      }`}>
        <h3 className={`text-xl font-black mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-stone-900'}`}>
          <Award size={22} className="text-aiki-shu" /> Les six grades
        </h3>
        <div className="space-y-3">
          {LEVELS.map((lvl, idx) => {
            const meta = LEVEL_METADATA[lvl];
            const lessons = getUnitsForLevel(lvl).flatMap(u => u.lessons);
            const done = lessons.filter(l => progress.completedLessons.includes(l.id)).length;
            const exam = progress.examScores[lvl];
            return (
              <motion.div
                key={lvl}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`p-4 rounded-2xl border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                  isDark
                    ? 'border-slate-800 bg-slate-950/40'
                    : 'border-amber-200 bg-amber-50/60'
                }`}
              >
                <div className="flex items-center gap-4">
                  <Illustration image={meta.badge} alt={`Badge ${meta.name}`} size={48} />
                  <div>
                    <h4 className={`font-black ${isDark ? 'text-white' : 'text-stone-900'}`}>{meta.name} <span className={`font-semibold text-sm ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>· {meta.jpName}</span></h4>
                    <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>{meta.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-black">
                  <span className={`px-3 py-1 rounded-full ${
                    isDark ? 'bg-slate-800 text-slate-200' : 'bg-amber-100 text-stone-700'
                  }`}>
                    {lessons.length ? `${done} / ${lessons.length} leçons` : 'En préparation'}
                  </span>
                  {exam != null && <span className="px-3 py-1 rounded-full bg-aiki-shu/20 text-orange-200">Examen : {exam} %</span>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Credits className="mt-6" />
    </div>
  );
};
