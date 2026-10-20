'use client';

import React, { useState, useEffect } from 'react';
import { Lesson, Unit, Exercise } from '@/types/curriculum';
import { X, CheckCircle2, XCircle, ArrowRight, Star, Zap, BookOpen, RotateCcw, SkipForward } from 'lucide-react';
import { soundEffects } from '@/utils/soundEffects';
import { Mascot } from './Mascot';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { getExerciseDefinition } from './exercises/registry';
import type { Verdict } from './exercises/types';
import { LessonIntroView } from './LessonIntro';
import { useTheme } from '@/utils/theme';

interface LessonModalProps {
  lesson: Lesson;
  unit: Unit;
  onClose: () => void;
  onComplete: (xpGained: number, gemsGained: number) => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  lesson,
  unit,
  onClose,
  onComplete,
}) => {
  const { isDark } = useTheme();
  const [currentIdx, setCurrentIdx] = useState(0);
  // the answer is tied to its exercise, so the next exercise never receives the previous answer
  const [answerState, setAnswerState] = useState<{ exerciseId: string; value: unknown } | null>(null);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  // no lives: the learner may retry an exercise as often as they like, or skip it.
  // Accuracy counts the exercises answered right on the first try.
  const [correctCount, setCorrectCount] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [failedOnce, setFailedOnce] = useState(false);
  const [shake, setShake] = useState(false);
  const [animatedXp, setAnimatedXp] = useState(0);
  // the lesson intro is shown before the first exercise, and can be reopened at any time
  const [showIntro, setShowIntro] = useState(!!lesson.intro);

  const exercises = lesson.exercises;
  const currentExercise: Exercise | undefined = exercises[currentIdx];

  // Reset state on step change
  useEffect(() => {
    setAnswerState(null);
    setVerdict(null);
    setStatus('idle');
    setShake(false);
    setAttempt(0);
    setFailedOnce(false);
  }, [currentIdx]);

  // Animated XP counter ticker when finishing
  useEffect(() => {
    if (isFinished) {
      let current = 0;
      const target = lesson.xpReward;
      const step = Math.max(1, Math.floor(target / 20));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          setAnimatedXp(target);
          clearInterval(timer);
        } else {
          setAnimatedXp(current);
        }
      }, 40);
      return () => clearInterval(timer);
    }
  }, [isFinished, lesson.xpReward]);

  if (!currentExercise && !isFinished) {
    return null;
  }

  const progressPercent = ((currentIdx) / exercises.length) * 100;

  const definition = currentExercise ? getExerciseDefinition(currentExercise.type) : undefined;
  const answer = currentExercise && answerState?.exerciseId === currentExercise.id ? answerState.value : null;
  const setAnswer = (value: unknown) =>
    currentExercise && setAnswerState(value == null ? null : { exerciseId: currentExercise.id, value });

  // Check answer logic: each exercise type corrects its own answer
  const handleCheck = () => {
    if (status !== 'idle' || !definition || !currentExercise) return;
    const v = definition.check(currentExercise, answer);
    setVerdict(v);
    const isCorrect = v.result === 'correct';

    if (isCorrect) {
      soundEffects.playCorrect();
      setStatus('correct');
      if (!failedOnce) setCorrectCount(prev => prev + 1);
    } else {
      soundEffects.playIncorrect();
      setStatus('incorrect');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setFailedOnce(true);
    }
  };

  // Try the same exercise again, from a blank answer
  const handleRetry = () => {
    soundEffects.playClick();
    setAnswerState(null);
    setVerdict(null);
    setStatus('idle');
    setAttempt(prev => prev + 1);
  };

  // Skip an exercise judged too hard: it simply does not count as right
  const handleSkip = () => {
    setSkippedCount(prev => prev + 1);
    handleContinue();
  };

  // Continue to next exercise or finish
  const handleContinue = () => {
    soundEffects.playWhoosh();

    if (currentIdx + 1 < exercises.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
      soundEffects.playVictory();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D2462D', '#22325A', '#F6F1E7', '#C8A46A'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 400);
    }
  };

  // Lesson intro (vocabulary, note, model, culture), before or during the exercises
  if (showIntro && lesson.intro) {
    const started = currentIdx > 0;
    return (
      <div className={`fixed inset-0 z-50 flex flex-col ${isDark ? 'bg-aiki-nuit text-white' : 'bg-amber-50 text-stone-900'}`}>
        <div className={`px-4 sm:px-8 py-4 border-b flex items-center justify-between gap-4 max-w-4xl mx-auto w-full ${isDark ? 'border-slate-800' : 'border-amber-200'}`}>
          <button type="button" onClick={onClose} className={`${isDark ? 'text-slate-400 hover:text-white' : 'text-stone-500 hover:text-stone-900'} p-1`} aria-label="Quitter la leçon">
            <X size={24} />
          </button>
          <h2 className="flex-1 font-black text-lg">{lesson.title}</h2>
        </div>
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-2xl mx-auto w-full">
          <p className={`text-sm font-semibold mb-4 ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>{lesson.focus}</p>
          <LessonIntroView intro={lesson.intro} />
        </div>
        <div className={`p-4 sm:p-6 border-t-2 ${isDark ? 'border-slate-800 bg-slate-900/95' : 'border-amber-200 bg-amber-100/95'}`}>
          <div className="max-w-2xl mx-auto flex justify-end">
            <button
              type="button"
              onClick={() => setShowIntro(false)}
              className="w-full sm:w-auto px-9 py-4 rounded-2xl font-black text-base bg-aiki-shu hover:bg-aiki-shu-fonce text-white shadow-3d-seal"
            >
              {started ? 'Reprendre les exercices' : 'Commencer les exercices'} <ArrowRight size={18} className="inline ml-1" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Final completion celebration screen
  if (isFinished) {
    return (
      <div className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-12 overflow-y-auto ${isDark ? 'bg-aiki-nuit text-white' : 'bg-amber-50 text-stone-900'}`}>
        <div className="w-full max-w-md flex justify-end">
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className={`p-2 rounded-2xl ${isDark ? 'text-slate-400 hover:text-white' : 'text-stone-500 hover:text-stone-900'}`}
          >
            <X size={26} />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="text-center max-w-md my-auto py-6"
        >
          <Mascot mood="cheering" size="lg" className="justify-center mb-6" />

          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
            Leçon Complétée !
          </h2>
          <p className="text-lg font-extrabold text-aiki-shu mt-1">
            Yoshi ! Otsukaresama deshita.
          </p>

          {/* Cards for XP & Accuracy (first-try answers) */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className={`rounded-3xl p-5 text-center shadow-lg relative overflow-hidden border-2 ${
                isDark
                  ? 'bg-gradient-to-br from-amber-950/60 to-orange-950/60 border-amber-500/60'
                  : 'bg-gradient-to-br from-amber-100 to-orange-100 border-amber-400'
              }`}
            >
              <div className={`flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-amber-400' : 'text-amber-800'}`}>
                <Zap size={14} className={isDark ? 'fill-amber-400 text-amber-400' : 'fill-amber-800 text-amber-800'} />
                XP Gagnés
              </div>
              <p className={`text-3xl font-black ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>+{animatedXp} XP</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.35, type: 'spring' }}
              className={`rounded-3xl p-5 text-center shadow-lg border-2 ${
                isDark
                  ? 'bg-gradient-to-br from-sky-950/60 to-blue-950/60 border-aiki-ai-clair/60'
                  : 'bg-gradient-to-br from-sky-100 to-blue-100 border-sky-400'
              }`}
            >
              <div className={`flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-sky-400' : 'text-sky-800'}`}>
                <Star size={14} className={isDark ? 'fill-sky-400 text-sky-400' : 'fill-sky-800 text-sky-800'} />
                Précision
              </div>
              <p className={`text-3xl font-black ${isDark ? 'text-sky-200' : 'text-sky-900'}`}>
                {Math.round((correctCount / exercises.length) * 100)}%
              </p>
              <p className={`text-[11px] font-semibold mt-1 ${isDark ? 'text-sky-300/80' : 'text-sky-700'}`}>du premier coup</p>
            </motion.div>
          </div>

          {skippedCount > 0 && (
            <p className={`mt-4 text-sm font-semibold ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
              {skippedCount === 1 ? '1 exercice passé' : `${skippedCount} exercices passés`} : refaites la leçon pour les retenter.
            </p>
          )}

          <div className={`mt-6 border rounded-2xl p-3.5 text-xs font-semibold shadow-inner ${
            isDark
              ? 'bg-slate-900 border-slate-800 text-slate-300'
              : 'bg-white border-amber-200 text-stone-700'
          }`}>
            <span className={`font-black ${isDark ? 'text-white' : 'text-stone-900'}`}>Notion clé :</span> {lesson.focus}
          </div>
        </motion.div>

        <div className="w-full max-w-md pb-4">
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onComplete(lesson.xpReward, 15)}
            className="w-full py-4 rounded-2xl bg-aiki-shu hover:bg-aiki-shu-fonce text-white font-black text-lg shadow-3d-seal transition-all"
          >
            Continuer la Progression
          </motion.button>
        </div>
      </div>
    );
  }

  const isCheckDisabled = !definition || !definition.isReady(currentExercise, answer);
  const View = definition?.View;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col justify-between overflow-hidden ${isDark ? 'bg-aiki-nuit text-white' : 'bg-amber-50 text-stone-900'}`}>
      
      {/* Top Header */}
      <div className={`px-4 sm:px-8 py-4 border-b flex items-center justify-between gap-4 max-w-4xl mx-auto w-full ${isDark ? 'border-slate-800' : 'border-amber-200'}`}>
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className={`${isDark ? 'text-slate-400 hover:text-white' : 'text-stone-500 hover:text-stone-900'} p-1`}
        >
          <X size={24} />
        </motion.button>

        {/* Progress Bar */}
        <div className={`flex-1 h-4 rounded-full overflow-hidden p-0.5 relative shadow-inner ${isDark ? 'bg-slate-800' : 'bg-amber-200'}`}>
          <motion.div
            className="h-full bg-gradient-to-r from-aiki-shu to-orange-400 rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 bg-white/20 rounded-full" />
          </motion.div>
        </div>

        {lesson.intro && (
          <button
            type="button"
            onClick={() => setShowIntro(true)}
            className={`${isDark ? 'text-slate-300 hover:text-white' : 'text-stone-600 hover:text-stone-900'} p-1`}
            aria-label="Revoir les termes et la note de la leçon"
            title="Revoir les termes et la note"
          >
            <BookOpen size={22} />
          </button>
        )}

      </div>

      {/* Main Content Question Area */}
      <motion.div
        animate={shake ? { x: [-12, 12, -10, 10, -5, 5, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 pb-32 max-w-2xl mx-auto w-full flex flex-col justify-center"
      >
        
        {/* Exercise Type Tag */}
        <div className="mb-2">
          <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-inner border ${
            isDark
              ? 'text-slate-400 bg-slate-900 border-slate-800'
              : 'text-stone-600 bg-white border-amber-200'
          }`}>
            {definition?.label ?? 'Exercice'}
          </span>
        </div>

        {/* Prompt Title */}
        <h2 className={`text-xl sm:text-2xl font-black mb-6 tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
          {currentExercise.prompt}
        </h2>

        {View ? (
          <View
            key={`${currentExercise.id}-${attempt}`}
            exercise={currentExercise}
            answer={answer}
            onAnswer={setAnswer}
            locked={status !== 'idle'}
            verdict={verdict}
          />
        ) : (
          <p className="text-rose-400 font-bold">Type d'exercice non pris en charge : {currentExercise.type}</p>
        )}

      </motion.div>

      {/* Bottom Sticky Action Banner */}
      <AnimatePresence>
        <motion.div
          key={status}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className={`p-4 sm:p-6 border-t-2 transition-colors ${
            status === 'correct' 
              ? isDark
                ? 'bg-emerald-950/95 border-emerald-600 text-emerald-100'
                : 'bg-emerald-50 border-emerald-500 text-emerald-950'
              : status === 'incorrect' 
              ? isDark
                ? 'bg-rose-950/95 border-rose-600 text-rose-100'
                : 'bg-rose-50 border-rose-500 text-rose-950'
              : isDark
              ? 'bg-slate-900/95 border-slate-800 text-white'
              : 'bg-white/95 border-amber-200 text-stone-900'
          }`}
        >
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Feedback messages */}
            {status === 'correct' ? (
              <div className={`flex items-center gap-3 w-full sm:w-auto ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>
                <CheckCircle2 size={38} className="text-emerald-500 flex-shrink-0" />
                <div>
                  <h4 className="font-black text-lg">Yoshi ! (Très bien !)</h4>
                  {verdict?.detail && (
                    <p className={`text-xs font-semibold max-w-md mt-0.5 ${isDark ? 'text-emerald-100' : 'text-emerald-900'}`}>{verdict.detail}</p>
                  )}
                  {currentExercise.explanation && (
                    <p className={`text-xs font-medium max-w-md mt-0.5 ${isDark ? 'text-emerald-200' : 'text-emerald-800'}`}>{currentExercise.explanation}</p>
                  )}
                </div>
              </div>
            ) : status === 'incorrect' ? (
              <div className={`flex items-center gap-3 w-full sm:w-auto ${isDark ? 'text-rose-300' : 'text-rose-800'}`}>
                <XCircle size={38} className="text-rose-500 flex-shrink-0" />
                <div>
                  <h4 className="font-black text-lg">
                    Mō ichido ! Bonne réponse :
                  </h4>
                  <p className={`text-sm font-black ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    {verdict ? <Highlighted text={verdict.expected} indices={verdict.highlights} /> : null}
                  </p>
                  {verdict?.detail && (
                    <p className={`text-xs font-semibold mt-0.5 max-w-md ${isDark ? 'text-rose-100' : 'text-rose-900'}`}>{verdict.detail}</p>
                  )}
                  {currentExercise.explanation && (
                    <p className={`text-xs font-medium mt-0.5 max-w-md ${isDark ? 'text-rose-200' : 'text-rose-800'}`}>{currentExercise.explanation}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className={`hidden sm:block text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                Sélectionnez votre réponse puis vérifiez.
              </div>
            )}

            {/* Action buttons: check or skip; after a mistake, retry as often as wanted or move on */}
            {status === 'idle' ? (
              <div className="w-full sm:w-auto flex flex-col-reverse sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleSkip}
                  className={`w-full sm:w-auto px-6 py-4 rounded-2xl font-black text-base border-2 transition-colors ${
                    isDark
                      ? 'border-slate-700 text-slate-300 hover:text-white hover:border-slate-500'
                      : 'border-stone-300 bg-white text-stone-700 hover:text-stone-900 hover:border-stone-400'
                  }`}
                >
                  <SkipForward size={18} className="inline mr-1.5 -mt-0.5" />
                  Passer
                </button>
                <motion.button
                  type="button"
                  disabled={isCheckDisabled}
                  whileHover={!isCheckDisabled ? { scale: 1.04 } : {}}
                  whileTap={!isCheckDisabled ? { scale: 0.96 } : {}}
                  onClick={handleCheck}
                  className={`w-full sm:w-auto px-9 py-4 rounded-2xl font-black text-base transition-all ${
                    isCheckDisabled
                      ? isDark
                        ? 'bg-slate-800 text-slate-600 cursor-not-allowed shadow-none'
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none'
                      : 'bg-aiki-shu hover:bg-aiki-shu-fonce text-white shadow-3d-seal'
                  }`}
                >
                  Vérifier
                </motion.button>
              </div>
            ) : status === 'incorrect' ? (
              <div className="w-full sm:w-auto flex flex-col-reverse sm:flex-row gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleContinue}
                  className={`w-full sm:w-auto px-6 py-4 rounded-2xl font-black text-base border-2 transition-colors ${
                    isDark
                      ? 'border-rose-700 text-rose-200 hover:text-white hover:border-rose-500'
                      : 'border-rose-300 bg-white text-rose-700 hover:text-rose-900 hover:border-rose-400'
                  }`}
                >
                  Continuer <ArrowRight size={18} className="inline ml-1" />
                </button>
                <motion.button
                  type="button"
                  autoFocus
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleRetry}
                  className="w-full sm:w-auto px-9 py-4 rounded-2xl font-black text-base text-white shadow-lg bg-rose-600 hover:bg-rose-700 transition-all"
                >
                  <RotateCcw size={18} className="inline mr-1.5 -mt-0.5" />
                  Réessayer
                </motion.button>
              </div>
            ) : (
              <motion.button
                type="button"
                autoFocus
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleContinue}
                className="w-full sm:w-auto px-9 py-4 rounded-2xl font-black text-base text-white shadow-lg transition-all bg-emerald-600 hover:bg-emerald-700"
              >
                Continuer <ArrowRight size={18} className="inline ml-1" />
              </motion.button>
            )}

          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
};

/** Displays the expected answer with the letters the learner missed underlined. */
const Highlighted: React.FC<{ text: string; indices?: number[] }> = ({ text, indices }) => {
  if (!indices?.length) return <>{text}</>;
  const set = new Set(indices);
  return (
    <>
      {[...text].map((ch, i) =>
        set.has(i) ? (
          <mark key={i} className="bg-amber-400 text-slate-950 rounded px-0.5">{ch}</mark>
        ) : (
          <React.Fragment key={i}>{ch}</React.Fragment>
        ),
      )}
    </>
  );
};
