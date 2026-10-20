'use client';

import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, Target, BookOpen, Layers, ShieldCheck } from 'lucide-react';
import type { Level, Source, LevelReferential } from '@/types/curriculum';
import { LEVEL_METADATA, getLevelStatus, getReferential } from '@/data/curriculumIndex';
import { HISTOIRE } from '@/data/modules';

const strings = (v: unknown): string[] =>
  Array.isArray(v) ? v.map(x => (typeof x === 'string' ? x : (x as any)?.nom ?? (x as any)?.titre ?? (x as any)?.romaji ?? '')).filter(Boolean) : [];

/**
 * Level presentation: review status banner and, when the referential exists, what the
 * programme of the grade covers (reference principale, variantes, programme, sources).
 */
export const LevelOverview: React.FC<{ level: Level; isDark: boolean }> = ({ level, isDark }) => {
  const [open, setOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const ref = getReferential(level) as LevelReferential | null;
  const status = getLevelStatus(level);
  const box = isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800 shadow-sm';
  const subBox = isDark ? 'bg-slate-800/40 border-slate-700/50' : 'bg-slate-50 border-slate-200';
  const cardBox = isDark ? 'bg-slate-800/30 border-slate-700/30' : 'bg-slate-100/70 border-slate-200';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-600';
  const textTitle = isDark ? 'text-white' : 'text-slate-900';

  const refPrincipal = ref?.referencePrincipale ?? ref?.referentielPrincipal;
  const variantes = Array.isArray(ref?.variantes) ? ref!.variantes : [];
  const prerequis = Array.isArray(ref?.prerequis) ? ref!.prerequis : [];
  const programme = Array.isArray(ref?.programmeOfficiel) ? ref!.programmeOfficiel : [];
  const competences = Array.isArray(ref?.competences) ? ref!.competences : [];
  const criteres = Array.isArray(ref?.criteresEvaluation) ? ref!.criteresEvaluation : [];
  const objectifs = strings(ref?.objectifs ?? (ref as any)?.descripteurs);
  const themes = strings(ref?.themes);
  const sources = (Array.isArray(ref?.sources) ? ref!.sources : []) as Source[];
  const isACompleter = ref?.etat === 'a-completer';

  return (
    <div className="space-y-4 mb-10">
      {status === 'vide' && (
        <div role="status" className="flex items-start gap-3 rounded-2xl border-2 border-sky-700/60 bg-sky-950/40 p-4 text-sm text-sky-100">
          <AlertTriangle size={20} className="flex-shrink-0 text-sky-300" aria-hidden />
          <p>
            <span className="font-black">Grade en préparation.</span> Les leçons du {LEVEL_METADATA[level].name} sont en cours
            de rédaction et de vérification ; elles apparaîtront ici dès qu&apos;elles seront prêtes.
          </p>
        </div>
      )}
      {(status === 'brouillon' || status === 'relu') && (
        <div role="status" className="flex items-start gap-3 rounded-2xl border-2 border-amber-700/60 bg-amber-950/40 p-4 text-sm text-amber-100">
          <AlertTriangle size={20} className="flex-shrink-0 text-amber-300" aria-hidden />
          <p>
            <span className="font-black">{status === 'brouillon' ? 'Brouillon, non relu par un enseignant.' : 'Contenu relu, pas encore publié.'}</span>{' '}
            {status === 'brouillon'
              ? 'Chaque exercice cite ses sources, mais des erreurs restent possibles : en cas de doute, votre enseignant a raison.'
              : 'Ce grade a été relu ; sa publication définitive est en cours.'}
          </p>
        </div>
      )}

      {ref && (
        <div className={`rounded-2xl border-2 ${box}`}>
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
            className="flex w-full min-h-[48px] items-center justify-between gap-3 px-4 py-3 text-left font-black"
          >
            <span className="flex items-center gap-2">
              <Target size={18} aria-hidden /> Le programme du {LEVEL_METADATA[level].name}
              {isACompleter && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  À compléter
                </span>
              )}
            </span>
            <ChevronDown size={18} aria-hidden className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          {open && (
            <div className="px-4 pb-4 space-y-4 text-sm">
              {/* Référence principale */}
              {refPrincipal && (
                <div className={`rounded-xl ${subBox} p-3 border`}>
                  <p className={`font-bold text-xs uppercase tracking-wider ${textMuted} mb-1 flex items-center gap-1.5`}>
                    <ShieldCheck size={14} className="text-aiki-shu" />
                    Référence principale
                  </p>
                  <p className={`font-bold ${textTitle} text-sm`}>{refPrincipal}</p>
                </div>
              )}

              {/* Variantes */}
              {variantes.length > 0 && (
                <div>
                  <p className={`font-bold text-xs uppercase tracking-wider ${textMuted} mb-1.5 flex items-center gap-1.5`}>
                    <Layers size={14} />
                    Variantes mentionnées
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    {variantes.map((v, i) => {
                      const label = typeof v === 'string' ? v : (v.referentiel ?? (v as any).nom ?? 'Variante');
                      return (
                        <li key={i} className="opacity-90">
                          <span className="font-semibold">{label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Prérequis */}
              {prerequis.length > 0 && (
                <div>
                  <p className={`font-bold text-xs uppercase tracking-wider ${textMuted} mb-1.5`}>Prérequis</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {prerequis.map((p, i) => (
                      <li key={i} className="opacity-90">
                        {typeof p === 'string' ? p : `${p.referentiel ? p.referentiel + ' : ' : ''}${p.texte}`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Programme officiel */}
              {programme.length > 0 && (
                <div>
                  <p className={`font-bold text-xs uppercase tracking-wider ${textMuted} mb-1.5`}>Programme technique</p>
                  <div className="space-y-2">
                    {programme.map((p, i) => {
                      const tech = Array.isArray(p.techniques) ? p.techniques.join(', ') : '';
                      return (
                        <div key={i} className={`rounded-xl ${cardBox} p-2.5 border text-xs`}>
                          <span className="font-bold text-aiki-shu dark:text-aiki-kinari">{p.categorie}</span>
                          {p.attaque && <span className="opacity-90 font-medium"> — {p.attaque}</span>}
                          {tech && <div className="mt-0.5 opacity-90">{tech}</div>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Compétences & critères */}
              {competences.length > 0 && (
                <div>
                  <p className={`font-bold text-xs uppercase tracking-wider ${textMuted} mb-1.5`}>Compétences</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {competences.map((c, i) => <li key={i} className="opacity-90">{c}</li>)}
                  </ul>
                </div>
              )}

              {criteres.length > 0 && (
                <div>
                  <p className={`font-bold text-xs uppercase tracking-wider ${textMuted} mb-1.5`}>Critères d&apos;évaluation</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {criteres.map((c, i) => <li key={i} className="opacity-90">{c}</li>)}
                  </ul>
                </div>
              )}

              {objectifs.length > 0 && <ul className="space-y-2 list-disc pl-5">{objectifs.map(d => <li key={d}>{d}</li>)}</ul>}
              {themes.length > 0 && (
                <div>
                  <p className={`font-bold mb-1 ${textTitle}`}>Thèmes</p>
                  <p className="opacity-90">{themes.join(' · ')}</p>
                </div>
              )}

              {/* Repères historiques (notamment faits avec source unique) */}
              {HISTOIRE.length > 0 && (
                <div className="pt-2 border-t border-slate-700/40">
                  <button
                    type="button"
                    onClick={() => setShowHistory(h => !h)}
                    className="flex items-center gap-2 font-bold text-xs text-aiki-shu dark:text-aiki-kinari hover:underline"
                  >
                    <BookOpen size={14} />
                    {showHistory ? 'Masquer les repères historiques' : 'Voir les repères historiques et sources uniques'}
                  </button>
                  {showHistory && (
                    <ul className="mt-2 space-y-1.5 text-xs">
                      {HISTOIRE.map((h, i) => (
                        <li key={i} className="opacity-90">
                          {h.date && <span className="font-bold mr-1">[{h.date}]</span>}
                          {h.sourceUnique && !h.fait.toLowerCase().startsWith('selon') ? (
                            <span>Selon {h.source} : {h.fait}</span>
                          ) : (
                            <span>{h.fait}</span>
                          )}
                          {h.sourceUnique && (
                            <span className="ml-1.5 inline-block text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                              source unique
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {sources.length > 0 && <p className="text-xs opacity-70">Sources : {sources.map(s => s.ref).join(' ; ')}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
