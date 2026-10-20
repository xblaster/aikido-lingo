'use client';

import React from 'react';
import { creditLines } from '@/data/images';
import { useTheme } from '@/utils/theme';

/** « À propos »: what the app is (and is not), and where its content comes from. */
export const Credits: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isDark } = useTheme();
  return (
    <section
      aria-labelledby="credits-title"
      className={`rounded-2xl border-2 p-4 text-xs transition-colors ${
        isDark
          ? 'border-slate-800 bg-slate-900/60 text-slate-300'
          : 'border-amber-200 bg-white/70 text-stone-700'
      } ${className}`}
    >
      <h2 id="credits-title" className={`font-black text-sm mb-2 ${isDark ? 'text-white' : 'text-stone-900'}`}>
        À propos
      </h2>
      <p>
        <span className="font-black text-aiki-bois">Le tatami d&apos;abord.</span> Aikido Lingo aide à comprendre le vocabulaire
        japonais, l&apos;étiquette et les noms de techniques. Il n&apos;enseigne pas le geste et ne remplace pas votre enseignant :
        les chutes et les techniques s&apos;apprennent sur le tatami, sous sa conduite.
      </p>
      <p className="mt-2">
        Chaque exercice cite ses sources (programmes fédéraux, Aikikai, ouvrages de référence). Les usages varient selon
        les fédérations et les dojos : en cas de différence, suivez celui de votre dojo. Aikido Lingo est un projet
        indépendant, sans lien avec une fédération.
      </p>
      <p className="mt-2">Prononciation : synthèse vocale japonaise du navigateur (approximative sans voix japonaise installée).</p>
      <MediaCredits />
    </section>
  );
};

/** Crédits des images et vidéos sous licence libre (origine du manifeste docs/images/manifest.yaml). */
export const MediaCredits: React.FC = () => {
  const { isDark } = useTheme();
  const lines = creditLines();
  return (
    <div className="mt-3" aria-labelledby="credits-media">
      <h3 id="credits-media" className={`font-black text-xs mb-1 ${isDark ? 'text-white' : 'text-stone-900'}`}>
        Crédits des images et vidéos
      </h3>
      {lines.length === 0 ? (
        <p>Aucun média sous licence libre n&apos;est affiché pour le moment ; les dessins sont originaux.</p>
      ) : (
        <ul className="space-y-1" data-credits>
          {lines.map(l => (
            <li key={`${l.id}-${l.what}`}>
              <span className="font-bold">{l.id}</span> ({l.what}) :{' '}
              {l.attribution ?? [l.auteur, l.licence].filter(Boolean).join(', ')}
              {l.url && (
                <>
                  {' — '}
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className="underline text-aiki-ai-clair">source</a>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
