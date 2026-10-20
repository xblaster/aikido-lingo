'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Timer, Play, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { EXAMEN, LEXIQUE } from '@/data/modules';
import { LEVEL_METADATA } from '@/data/curriculumIndex';
import type { ExamEpreuve, Level } from '@/types/curriculum';
import { buildDecoderCatalogue, checkDecomposition, getCallDuration, DEFAULT_CALL_DURATION } from '@/utils/decoder';
import { soundEffects } from '@/utils/soundEffects';
import { AudioButton } from './AudioButton';
import { Illustration } from './Illustration';
import { EmptyState, ModuleHeader } from './ModuleHeader';
import { useTheme } from '@/utils/theme';

export { getCallDuration, DEFAULT_CALL_DURATION };
export const MAX_CALLS = 10;

/** Up to `n` items in random order. */
function sample<T>(list: T[], n: number): T[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

const Choice: React.FC<{
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
  isDark: boolean;
}> = ({ label, options, value, onChange, disabled, isDark }) => (
  <label className="block space-y-1">
    <span className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{label}</span>
    <select
      value={value}
      disabled={disabled}
      onChange={e => onChange(e.target.value)}
      className={`w-full rounded-2xl border-2 px-3 py-3 font-bold focus:outline-none transition-colors ${
        isDark ? 'border-slate-700 bg-slate-900 text-white focus:border-aiki-ai-clair' : 'border-slate-300 bg-white text-slate-900 focus:border-aiki-ai shadow-sm'
      }`}
    >
      <option value="">—</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </label>
);

interface ExamenModuleProps {
  bestScores: Partial<Record<Level, number>>;
  onFinish: (level: Level, score: number) => void;
  theme?: 'dark' | 'light';
}

/**
 * Passage de grade: the jury calls a technique, the learner identifies attack / technique /
 * variant against the clock; then the jury's criteria as a checklist.
 */
export const ExamenModule: React.FC<ExamenModuleProps> = ({ bestScores, onFinish, theme: propTheme }) => {
  const { isDark: contextIsDark } = useTheme();
  const isDark = propTheme ? propTheme === 'dark' : contextIsDark;
  const levels = EXAMEN.filter(x => (x.epreuves ?? []).length > 0);
  const [levelId, setLevelId] = useState<Level | null>(levels[0]?.level ?? null);
  const exam = levels.find(x => x.level === levelId);
  const duration = getCallDuration(exam);
  const [calls, setCalls] = useState<ExamEpreuve[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [given, setGiven] = useState({ attaque: '', technique: '', variante: '' });
  const [result, setResult] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [left, setLeft] = useState(duration);
  const [criteria, setCriteria] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setLeft(duration);
  }, [duration]);

  // options: the parts of every call of this level, plus the lexicon's
  const options = useMemo(() => {
    const cat = buildDecoderCatalogue(LEXIQUE, exam ? [exam] : []);
    return { attaques: cat.attaques.map(p => p.romaji), techniques: cat.techniques.map(p => p.romaji), variantes: cat.variantes.map(p => p.romaji) };
  }, [exam]);

  const current = calls?.[idx];
  const finished = calls && idx >= calls.length;

  useEffect(() => {
    if (!current || result !== null) return;
    if (left <= 0) {
      setResult(false);
      soundEffects.playIncorrect();
      return;
    }
    const t = setTimeout(() => setLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [current, left, result]);

  const start = () => {
    if (!exam) return;
    soundEffects.playWhoosh();
    setCalls(sample(exam.epreuves, MAX_CALLS));
    setIdx(0);
    setScore(0);
    setCriteria({});
    newCall();
  };
  const newCall = () => {
    setGiven({ attaque: '', technique: '', variante: '' });
    setResult(null);
    setLeft(duration);
  };
  const validate = () => {
    if (!current) return;
    const ok = checkDecomposition(current, { ...given, variante: given.variante || undefined }).all;
    setResult(ok);
    if (ok) { soundEffects.playCorrect(); setScore(s => s + 1); } else soundEffects.playIncorrect();
  };
  const next = () => {
    if (!calls || !exam) return;
    if (idx + 1 >= calls.length) {
      const pct = Math.round(((score) / calls.length) * 100);
      soundEffects.playVictory();
      onFinish(exam.level, pct);
    }
    setIdx(i => i + 1);
    newCall();
  };

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8 px-1 sm:px-4 space-y-6">
      <ModuleHeader
        image="modules/examen"
        kicker="Simulateur"
        title="Passage de grade"
        jp="審査"
        description="Le jury annonce une technique : identifiez l'attaque, la technique et la forme avant la fin du temps."
      />

      {levels.length === 0 || !exam ? (
        <EmptyState file="content/examen.yaml" what="Le simulateur de passage de grade" />
      ) : !calls ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {levels.map(x => (
              <button
                key={x.level}
                type="button"
                aria-pressed={levelId === x.level}
                onClick={() => { soundEffects.playClick(); setLevelId(x.level); }}
                className={`rounded-3xl border-2 p-4 flex flex-col items-center gap-2 transition-colors ${
                  levelId === x.level
                    ? 'border-aiki-shu bg-aiki-shu/15'
                    : isDark
                    ? 'border-slate-800 bg-slate-900'
                    : 'border-slate-200 bg-white shadow-sm'
                }`}
              >
                <Illustration image={LEVEL_METADATA[x.level]?.badge} alt={`Badge ${LEVEL_METADATA[x.level]?.name ?? x.level}`} size={56} />
                <span className={`font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{LEVEL_METADATA[x.level]?.name ?? x.level}</span>
                <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{x.epreuves.length} appel{x.epreuves.length > 1 ? 's' : ''}</span>
                {bestScores[x.level] != null && <span className="text-[11px] font-black text-aiki-bois">Meilleur : {bestScores[x.level]} %</span>}
              </button>
            ))}
          </div>
          <button type="button" onClick={start} className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black bg-aiki-shu hover:bg-aiki-shu-fonce text-white shadow-3d-seal">
            <Play size={18} className="inline mr-2" /> Commencer le passage ({Math.min(MAX_CALLS, exam.epreuves.length)} appels, {duration} s chacun)
          </button>
        </div>
      ) : finished ? (
        <div className="space-y-5">
          <div className={`rounded-3xl border-2 p-6 text-center transition-colors ${
            isDark ? 'border-aiki-bois/60 bg-aiki-bois/10' : 'border-aiki-bois/70 bg-aiki-bois/15 shadow-sm'
          }`}>
            <p className="text-sm font-black uppercase tracking-wider text-aiki-bois">Résultat</p>
            <p className={`text-5xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{Math.round((score / calls.length) * 100)} %</p>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{score} appel(s) bien identifié(s) sur {calls.length}</p>
          </div>
          {(exam.criteres ?? []).length > 0 && (
            <div className={`rounded-3xl border-2 p-5 transition-colors ${
              isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white shadow-sm'
            }`}>
              <h3 className={`font-black mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Ce que le jury regarde aussi (auto-évaluation)</h3>
              <ul className="space-y-2">
                {exam.criteres.map((c, i) => (
                  <li key={i}>
                    <label className={`flex items-start gap-3 text-sm cursor-pointer ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                      <input type="checkbox" checked={!!criteria[i]} onChange={e => setCriteria(s => ({ ...s, [i]: e.target.checked }))} className="mt-1 accent-[#D2462D]" />
                      {c}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {(exam.sources ?? []).length > 0 && (
            <p className="text-[11px] text-slate-500">Sources : {exam.sources!.map(s => s.ref).join(' ; ')}</p>
          )}
          <button
            type="button"
            onClick={() => setCalls(null)}
            className={`px-6 py-3 rounded-2xl border-2 font-black transition-colors ${
              isDark ? 'border-slate-700 text-slate-200 hover:border-slate-500' : 'border-slate-300 text-slate-700 hover:border-slate-400 bg-white shadow-sm'
            }`}
          >
            <RotateCcw size={16} className="inline mr-1" /> Autre passage
          </button>
        </div>
      ) : current ? (
        <div className="space-y-5">
          <div className={`flex items-center justify-between text-sm font-black ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <span>Appel {idx + 1} / {calls.length}</span>
            <span className={`flex items-center gap-1 ${left <= 5 ? 'text-rose-400' : ''}`} aria-live="polite">
              <Timer size={16} /> {left} s
            </span>
          </div>
          <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
            <div className="h-full bg-aiki-shu transition-all" style={{ width: `${(left / duration) * 100}%` }} />
          </div>
          <div className={`rounded-3xl border-2 p-5 transition-colors ${
            isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white shadow-sm'
          }`}>
            <p className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{current.categorie} — le jury annonce</p>
            <div className="flex items-center justify-between gap-3 mt-1">
              <p lang="ja-Latn" className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{current.appel}</p>
              <AudioButton text={current.appel} showSlowToggle />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Choice label="Attaque" options={options.attaques} value={given.attaque} disabled={result !== null} onChange={v => setGiven(g => ({ ...g, attaque: v }))} isDark={isDark} />
            <Choice label="Technique" options={options.techniques} value={given.technique} disabled={result !== null} onChange={v => setGiven(g => ({ ...g, technique: v }))} isDark={isDark} />
            <Choice label="Forme" options={options.variantes} value={given.variante} disabled={result !== null} onChange={v => setGiven(g => ({ ...g, variante: v }))} isDark={isDark} />
          </div>
          {result !== null && (
            <div
              className={`rounded-2xl border-2 p-4 text-sm ${
                result
                  ? isDark
                    ? 'border-emerald-600 bg-emerald-950/50 text-emerald-100'
                    : 'border-emerald-600 bg-emerald-50 text-emerald-950'
                  : isDark
                  ? 'border-rose-600 bg-rose-950/50 text-rose-100'
                  : 'border-rose-600 bg-rose-50 text-rose-950'
              }`}
              role="status"
            >
              <p className="font-black flex items-center gap-2">
                {result ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                {result ? 'Yoshi !' : left <= 0 ? 'Temps écoulé.' : 'Mō ichido.'}
              </p>
              <p className="mt-1">
                Attaque : <b>{current.attaque}</b> · Technique : <b>{current.technique}</b>
                {current.variante ? <> · Forme : <b>{current.variante}</b></> : null}
              </p>
              {(current.conseils ?? []).length > 0 && (
                <ul className={`mt-2 list-disc pl-5 space-y-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {current.conseils!.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              )}
            </div>
          )}
          <div className="flex justify-end">
            {result === null ? (
              <button type="button" disabled={!given.attaque || !given.technique} onClick={validate} className="px-8 py-3 rounded-2xl font-black bg-aiki-shu hover:bg-aiki-shu-fonce text-white shadow-3d-seal disabled:opacity-40">
                Valider
              </button>
            ) : (
              <button type="button" onClick={next} autoFocus className="px-8 py-3 rounded-2xl font-black bg-aiki-ai hover:bg-aiki-ai-fonce text-white shadow-3d-indigo">
                Suivant <ArrowRight size={16} className="inline ml-1" />
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
