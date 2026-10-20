'use client';

import React, { useMemo, useState } from 'react';
import { Shuffle, CheckCircle2, XCircle } from 'lucide-react';
import { EXAMEN, LEXIQUE } from '@/data/modules';
import { buildDecoderCatalogue, checkDecomposition, composeName, readName, type DecoderPart } from '@/utils/decoder';
import { soundEffects } from '@/utils/soundEffects';
import { AudioButton } from './AudioButton';
import { EmptyState, ModuleHeader } from './ModuleHeader';
import { useTheme } from '@/utils/theme';

const PartPicker: React.FC<{
  label: string;
  parts: DecoderPart[];
  value: string;
  onChange: (v: string) => void;
  optional?: boolean;
  color: string;
  isDark: boolean;
}> = ({ label, parts, value, onChange, optional, color, isDark }) => (
  <fieldset className="space-y-2">
    <legend className={`text-xs font-black uppercase tracking-wider ${color}`}>{label}</legend>
    <div className="flex flex-wrap gap-2">
      {optional && (
        <button
          type="button"
          aria-pressed={value === ''}
          onClick={() => onChange('')}
          className={`px-3 py-2 rounded-2xl text-sm font-black border-2 transition-colors ${
            value === ''
              ? isDark
                ? 'border-white bg-white/10 text-white'
                : 'border-aiki-ai bg-aiki-ai/10 text-aiki-ai'
              : isDark
              ? 'border-slate-700 text-slate-400 hover:border-slate-500'
              : 'border-slate-300 text-slate-600 hover:border-slate-400 bg-white shadow-sm'
          }`}
        >
          aucune
        </button>
      )}
      {parts.map(p => (
        <button
          key={p.romaji}
          type="button"
          aria-pressed={value === p.romaji}
          title={p.sens}
          onClick={() => { soundEffects.playClick(); onChange(p.romaji); }}
          lang="ja-Latn"
          className={`px-3 py-2 rounded-2xl text-sm font-black border-2 transition-colors ${
            value === p.romaji
              ? 'border-aiki-ai-clair bg-aiki-ai text-white shadow-3d-indigo'
              : isDark
              ? 'border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500'
              : 'border-slate-300 bg-white text-slate-800 hover:border-slate-400 shadow-sm'
          }`}
        >
          {p.romaji}
        </button>
      ))}
    </div>
  </fieldset>
);

interface DecodeurModuleProps {
  onQuizCorrect: () => void;
  theme?: 'dark' | 'light';
}

/**
 * Décodeur de techniques: compose a call from its parts (attack + technique + omote/ura) and
 * read it; or, in the quiz, hear/see a call and find its parts.
 */
export const DecodeurModule: React.FC<DecodeurModuleProps> = ({ onQuizCorrect, theme: propTheme }) => {
  const { isDark: contextIsDark } = useTheme();
  const isDark = propTheme ? propTheme === 'dark' : contextIsDark;
  const cat = useMemo(() => buildDecoderCatalogue(LEXIQUE, EXAMEN), []);
  const [mode, setMode] = useState<'composer' | 'quiz'>('composer');
  const [a, setA] = useState('');
  const [t, setT] = useState('');
  const [v, setV] = useState('');
  const [quizIndex, setQuizIndex] = useState(0);
  const [checked, setChecked] = useState<ReturnType<typeof checkDecomposition> | null>(null);
  const [streak, setStreak] = useState(0);

  const empty = cat.attaques.length === 0 || cat.techniques.length === 0;
  const name = composeName(a, t, v);
  const quiz = cat.appels.length ? cat.appels[quizIndex % cat.appels.length] : null;

  const reset = () => { setA(''); setT(''); setV(''); setChecked(null); };
  const nextQuiz = () => {
    soundEffects.playWhoosh();
    reset();
    setQuizIndex(i => (cat.appels.length > 1 ? (i + 1 + Math.floor(Math.random() * (cat.appels.length - 1))) % cat.appels.length : 0));
  };
  const check = () => {
    if (!quiz) return;
    const r = checkDecomposition(quiz, { attaque: a, technique: t, variante: v || undefined });
    setChecked(r);
    if (r.all) { soundEffects.playCorrect(); setStreak(s => s + 1); onQuizCorrect(); }
    else { soundEffects.playIncorrect(); setStreak(0); }
  };

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8 px-1 sm:px-4 space-y-6">
      <ModuleHeader
        image="modules/decodeur"
        kicker="Lire un nom de technique"
        title="Décodeur de techniques"
        description="Un nom de technique se lit comme une phrase : l'attaque, puis la technique, puis la forme (omote / ura)."
      />

      {empty ? (
        <EmptyState file="content/lexique.yaml et content/examen.yaml" what="Le décodeur" />
      ) : (
        <>
          <div className="flex gap-2" role="tablist">
            {(['composer', 'quiz'] as const).map(m => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                disabled={m === 'quiz' && !cat.appels.length}
                onClick={() => { soundEffects.playClick(); setMode(m); reset(); }}
                className={`px-4 py-2 rounded-2xl text-sm font-black border-2 transition-colors disabled:opacity-40 ${
                  mode === m
                    ? 'bg-aiki-shu border-aiki-shu text-white'
                    : isDark
                    ? 'border-slate-700 text-slate-300 hover:border-slate-500'
                    : 'border-slate-300 text-slate-700 hover:border-slate-400 bg-white shadow-sm'
                }`}
              >
                {m === 'composer' ? 'Composer' : 'Quiz : décomposer un appel'}
              </button>
            ))}
          </div>

          {mode === 'quiz' && quiz && (
            <div className={`rounded-3xl border-2 p-5 space-y-2 transition-colors ${
              isDark ? 'border-slate-800 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-800 shadow-sm'
            }`}>
              <p className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Le jury annonce</p>
              <div className="flex items-center justify-between gap-3">
                <p lang="ja-Latn" className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{quiz.appel}</p>
                <AudioButton text={quiz.appel} showSlowToggle />
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Retrouvez l&apos;attaque, la technique et la forme. Série : {streak}</p>
            </div>
          )}

          <div className={`rounded-3xl border-2 p-5 space-y-5 transition-colors ${
            isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white shadow-sm'
          }`}>
            <PartPicker
              label="Attaque"
              parts={cat.attaques}
              value={a}
              onChange={x => { setA(x); setChecked(null); }}
              color={isDark ? 'text-sky-300' : 'text-sky-800'}
              isDark={isDark}
            />
            <PartPicker
              label="Technique"
              parts={cat.techniques}
              value={t}
              onChange={x => { setT(x); setChecked(null); }}
              color={isDark ? 'text-orange-300' : 'text-orange-800'}
              isDark={isDark}
            />
            {cat.variantes.length > 0 && (
              <PartPicker
                label="Forme"
                parts={cat.variantes}
                value={v}
                onChange={x => { setV(x); setChecked(null); }}
                optional
                color={isDark ? 'text-amber-300' : 'text-amber-800'}
                isDark={isDark}
              />
            )}
          </div>

          {mode === 'composer' ? (
            <div
              className={`rounded-3xl border-2 p-5 min-h-[120px] transition-colors ${
                isDark ? 'border-aiki-shu/50 bg-aiki-shu/10' : 'border-aiki-shu/40 bg-aiki-shu/5'
              }`}
              aria-live="polite"
            >
              {a || t ? (
                <>
                  <p className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-orange-200' : 'text-orange-800'}`}>Nom complet</p>
                  <div className="flex items-center justify-between gap-3">
                    <p lang="ja-Latn" className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{name}</p>
                    <AudioButton text={name} showSlowToggle />
                  </div>
                  <p className={`text-sm mt-2 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{readName(cat, a, t, v)}</p>
                </>
              ) : (
                <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Choisissez une attaque et une technique pour lire le nom complet.</p>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {checked && quiz && (
                <div
                  className={`rounded-2xl border-2 p-4 text-sm ${
                    checked.all
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
                    {checked.all ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                    {checked.all ? 'Yoshi ! Bien décodé.' : 'Mō ichido : voici la décomposition.'}
                  </p>
                  <p className="mt-1">
                    Attaque : <b>{quiz.attaque}</b> · Technique : <b>{quiz.technique}</b>
                    {quiz.variante ? <> · Forme : <b>{quiz.variante}</b></> : null}
                  </p>
                </div>
              )}
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={nextQuiz}
                  className={`px-5 py-3 rounded-2xl border-2 font-black transition-colors ${
                    isDark ? 'border-slate-700 text-slate-200 hover:border-slate-500' : 'border-slate-300 text-slate-700 hover:border-slate-400 bg-white shadow-sm'
                  }`}
                >
                  <Shuffle size={16} className="inline mr-1" /> Autre appel
                </button>
                <button
                  type="button"
                  disabled={!a || !t}
                  onClick={check}
                  className="px-7 py-3 rounded-2xl font-black bg-aiki-shu hover:bg-aiki-shu-fonce text-white shadow-3d-seal disabled:opacity-40"
                >
                  Vérifier
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

