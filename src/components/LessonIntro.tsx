'use client';

import React from 'react';
import type { LessonIntro as Intro } from '@/types/curriculum';
import { AudioButton } from './AudioButton';
import { Illustration } from './Illustration';
import { sceneFor } from '@/data/images';
import { useTheme } from '@/utils/theme';

/** What a lesson teaches, shown before its exercises: term cards, note, key points, culture. */
export const LessonIntroView: React.FC<{ intro: Intro }> = ({ intro }) => {
  const { isDark } = useTheme();

  return (
    <div className="space-y-6">
      {(intro.termes ?? []).length > 0 && (
        <section aria-labelledby="intro-termes">
          <h3 id="intro-termes" className={`text-sm font-black uppercase tracking-wider mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Termes</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {intro.termes.map(t => {
              const image = t.illustration?.image ?? sceneFor(t.jp);
              return (
                <li
                  key={t.jp}
                  className={`rounded-2xl border-2 px-4 py-3 flex flex-col gap-3 transition-colors ${
                    isDark ? 'border-slate-800 bg-slate-900/70 text-white' : 'border-slate-200 bg-white text-slate-900 shadow-sm'
                  }`}
                >
                  {(image || t.illustration) && (
                    <Illustration
                      image={image}
                      emoji={t.illustration?.emoji}
                      alt={t.illustration?.alt ?? t.fr}
                      width="100%"
                      size={240}
                      withVideo
                      className={`rounded-xl ${isDark ? 'bg-slate-800/60' : 'bg-slate-100'}`}
                    />
                  )}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      {t.kanji && (
                        <div lang="ja" className={`font-jp text-2xl leading-tight ${isDark ? 'text-aiki-kinari' : 'text-aiki-sumi'}`}>
                          {t.kanji}
                        </div>
                      )}
                      <div lang="ja-Latn" className={`font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.jp}</div>
                      <div className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t.fr}</div>
                      {t.note && <div className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.note}</div>}
                    </div>
                    <AudioButton text={t.jp} size="sm" />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {intro.note && (
        <section
          aria-labelledby="intro-note"
          className={`rounded-2xl border-2 p-4 transition-colors ${
            isDark ? 'border-aiki-bois/50 bg-aiki-bois/10' : 'border-aiki-bois/60 bg-aiki-bois/15'
          }`}
        >
          <h3 id="intro-note" className={`font-black mb-1 ${isDark ? 'text-amber-100' : 'text-amber-950'}`}>{intro.note.titre}</h3>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-amber-50/90' : 'text-amber-900'}`}>{intro.note.texte}</p>
        </section>
      )}

      {(intro.points ?? []).length > 0 && (
        <section aria-labelledby="intro-points">
          <h3 id="intro-points" className={`text-sm font-black uppercase tracking-wider mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Points clés</h3>
          <ol className="space-y-2">
            {intro.points!.map((p, i) => (
              <li key={i} className={`flex gap-3 text-sm ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                <span className="w-6 h-6 rounded-lg bg-aiki-shu text-white text-xs font-black flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <span>{p}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {intro.culture && (
        <section
          aria-labelledby="intro-culture"
          className={`rounded-2xl border-2 p-4 transition-colors ${
            isDark ? 'border-slate-800 bg-slate-900/70 text-slate-300' : 'border-slate-200 bg-white text-slate-700 shadow-sm'
          }`}
        >
          <h3 id="intro-culture" className={`font-black mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{intro.culture.titre}</h3>
          <p className="text-sm leading-relaxed">{intro.culture.texte}</p>
        </section>
      )}

      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        Le tatami d&apos;abord : cette application aide à comprendre le vocabulaire et l&apos;étiquette, elle ne remplace
        pas l&apos;enseignement de votre professeur.
      </p>
    </div>
  );
};

