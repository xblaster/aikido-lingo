'use client';

import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { LEXIQUE } from '@/data/modules';
import { normalizeAnswer } from '@/utils/answerMatching';
import type { LexiqueEntry } from '@/types/curriculum';
import { AudioButton } from './AudioButton';
import { Illustration } from './Illustration';
import { sceneFor } from '@/data/images';
import { EmptyState, ModuleHeader } from './ModuleHeader';
import { useTheme } from '@/utils/theme';

/** Text searched for an entry: romaji (with and without separators), kanji, kana, meaning, note. */
export function lexiqueHaystack(e: LexiqueEntry): string {
  const romaji = normalizeAnswer(e.romaji ?? '');
  return [romaji, romaji.replace(/\s+/g, ''), e.kanji ?? '', e.kana ?? '', normalizeAnswer(e.sens ?? ''), normalizeAnswer(e.note ?? '')].join(' | ');
}

/** Entries matching a query (accent-, case- and hyphen-insensitive) and a category. */
export function searchLexique(entries: LexiqueEntry[], query: string, categorie: string | null): LexiqueEntry[] {
  const q = normalizeAnswer(query);
  const qCompact = q.replace(/\s+/g, '');
  return entries.filter(e => {
    if (categorie && e.categorie !== categorie) return false;
    if (!q && !query.trim()) return true;
    const h = lexiqueHaystack(e);
    return h.includes(q) || h.includes(qCompact) || (!!query.trim() && h.includes(query.trim()));
  });
}

interface LexiqueModuleProps {
  theme?: 'dark' | 'light';
}

/** Lexique: the dictionary of the dojo (content/lexique.yaml). */
export const LexiqueModule: React.FC<LexiqueModuleProps> = ({ theme: propTheme }) => {
  const { isDark: contextIsDark } = useTheme();
  const isDark = propTheme ? propTheme === 'dark' : contextIsDark;
  const [query, setQuery] = useState('');
  const [categorie, setCategorie] = useState<string | null>(null);
  const categories = useMemo(() => [...new Set(LEXIQUE.map(e => e.categorie).filter(Boolean))].sort(), []);
  const results = useMemo(() => searchLexique(LEXIQUE, query, categorie), [query, categorie]);

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8 px-1 sm:px-4 space-y-6">
      <ModuleHeader
        image="modules/lexique"
        kicker="Dictionnaire du dojo"
        title="Lexique"
        jp="用語"
        description="Cherchez un terme en romaji, en kanji ou par son sens en français, et écoutez sa prononciation."
      />

      {LEXIQUE.length === 0 ? (
        <EmptyState file="content/lexique.yaml" what="Le lexique" />
      ) : (
        <>
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} size={20} aria-hidden />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Rechercher dans le lexique"
              placeholder="Rechercher (ex. katate dori, 礼, saisie…)"
              className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 font-bold focus:outline-none transition-colors ${
                isDark
                  ? 'border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:border-aiki-ai-clair'
                  : 'border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:border-aiki-ai shadow-sm'
              }`}
            />
          </div>

          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
              {[null, ...categories].map(c => (
                <button
                  key={c ?? 'toutes'}
                  type="button"
                  aria-pressed={categorie === c}
                  onClick={() => setCategorie(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-black border-2 transition-colors ${
                    categorie === c
                      ? 'bg-aiki-shu border-aiki-shu text-white'
                      : isDark
                      ? 'border-slate-700 text-slate-300 hover:border-slate-500'
                      : 'border-slate-300 text-slate-700 hover:border-slate-400 bg-white shadow-sm'
                  }`}
                >
                  {c ?? 'Toutes'}
                </button>
              ))}
            </div>
          )}

          <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`} aria-live="polite">
            {results.length} terme{results.length > 1 ? 's' : ''}
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map(e => {
              const ill = e.illustration;
              const image = ill?.image ?? sceneFor(e.romaji);
              return (
                <li
                  key={e.id}
                  className={`border-2 rounded-3xl p-5 flex flex-col gap-2 transition-colors ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      {(ill || image) && (
                        <Illustration
                          image={image}
                          emoji={ill?.emoji}
                          alt={ill?.alt ?? e.sens}
                          size={88}
                          withVideo
                          className={`rounded-xl ${isDark ? 'bg-slate-800/60' : 'bg-slate-100'}`}
                        />
                      )}
                      <div className="min-w-0">
                        {e.kanji && (
                          <div lang="ja" className={`font-jp text-2xl leading-tight ${isDark ? 'text-aiki-kinari' : 'text-aiki-sumi'}`}>
                            {e.kanji}
                          </div>
                        )}
                        <h3 lang="ja-Latn" className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{e.romaji}</h3>
                        {e.kana && <div lang="ja" className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{e.kana}</div>}
                      </div>
                    </div>
                    <AudioButton text={e.kana ?? e.romaji} size="sm" showSlowToggle />
                  </div>
                  <p className={`text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{e.sens}</p>
                  {e.note && <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{e.note}</p>}
                  <div className="flex items-center justify-between gap-2 mt-auto pt-2">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                      {e.categorie}
                    </span>
                    {e.source && (
                      <span className="text-[10px] text-slate-500 truncate" title={e.source.ref}>
                        Source : {e.source.url ? <a href={e.source.url} target="_blank" rel="noopener noreferrer" className="underline">{e.source.ref}</a> : e.source.ref}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};
