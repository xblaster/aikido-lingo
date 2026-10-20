/**
 * Technique decoder: a technique call is read as attack + technique (+ variant), e.g.
 * « katate-dori ikkyo omote ». Pure functions, built from the lexicon and the exam programme
 * (no list is hard-coded: everything taught must come from sourced content).
 */
import type { ExamLevel, LexiqueEntry, Level } from '@/types/curriculum';
import { answerKey } from './answerMatching.ts';

export interface DecoderPart {
  romaji: string;
  sens?: string;
  kanji?: string;
  kana?: string;
}

export interface DecoderCatalogue {
  attaques: DecoderPart[];
  techniques: DecoderPart[];
  variantes: DecoderPart[];
  /** Calls of the exam programme, decomposed (for the quiz). */
  appels: { appel: string; attaque: string; technique: string; variante?: string; level: Level }[];
}

const ATTAQUE = /attaque|saisie|frappe|coup/i;
const TECHNIQUE = /technique|immobilisation|projection|controle|contrôle/i;
const VARIANTE = /variante|forme|direction/i;

function addUnique(list: DecoderPart[], part: DecoderPart) {
  const k = answerKey(part.romaji);
  if (!k) return;
  const existing = list.find(p => answerKey(p.romaji) === k);
  if (existing) {
    existing.sens ??= part.sens;
    existing.kanji ??= part.kanji;
    existing.kana ??= part.kana;
  } else list.push({ ...part });
}

/** Lexicon entry for a romaji term (any spelling). */
export function lookup(lexique: LexiqueEntry[], romaji: string): LexiqueEntry | undefined {
  const k = answerKey(romaji);
  return lexique.find(e => answerKey(e.romaji) === k);
}

export function buildDecoderCatalogue(lexique: LexiqueEntry[], examen: ExamLevel[]): DecoderCatalogue {
  const cat: DecoderCatalogue = { attaques: [], techniques: [], variantes: [], appels: [] };
  const part = (romaji: string): DecoderPart => {
    const e = lookup(lexique, romaji);
    return { romaji, sens: e?.sens, kanji: e?.kanji, kana: e?.kana };
  };
  for (const level of examen) {
    for (const ep of level.epreuves ?? []) {
      if (!ep?.attaque || !ep?.technique) continue;
      addUnique(cat.attaques, part(ep.attaque));
      addUnique(cat.techniques, part(ep.technique));
      if (ep.variante) addUnique(cat.variantes, part(ep.variante));
      cat.appels.push({ appel: ep.appel, attaque: ep.attaque, technique: ep.technique, variante: ep.variante, level: level.level });
    }
  }
  for (const e of lexique) {
    const c = `${e.categorie ?? ''}`;
    const p = { romaji: e.romaji, sens: e.sens, kanji: e.kanji, kana: e.kana };
    if (VARIANTE.test(c) || /^(omote|ura)$/.test(answerKey(e.romaji))) addUnique(cat.variantes, p);
    else if (ATTAQUE.test(c)) addUnique(cat.attaques, p);
    else if (TECHNIQUE.test(c)) addUnique(cat.techniques, p);
  }
  const byName = (a: DecoderPart, b: DecoderPart) => a.romaji.localeCompare(b.romaji, 'fr');
  cat.attaques.sort(byName);
  cat.techniques.sort(byName);
  cat.variantes.sort(byName);
  return cat;
}

/** Full call: attack, technique, then variant (« katate-dori ikkyo omote »). */
export function composeName(attaque?: string, technique?: string, variante?: string): string {
  return [attaque, technique, variante].filter(Boolean).join(' ');
}

/** French reading of a call, from the meanings of its parts. */
export function readName(cat: DecoderCatalogue, attaque?: string, technique?: string, variante?: string): string {
  const find = (list: DecoderPart[], r?: string) => (r ? list.find(p => answerKey(p.romaji) === answerKey(r)) : undefined);
  const a = find(cat.attaques, attaque);
  const t = find(cat.techniques, technique);
  const v = find(cat.variantes, variante);
  const parts = [
    t ? (t.sens ?? t.romaji) : undefined,
    a ? `sur ${a.sens ?? a.romaji}` : undefined,
    v ? `(${v.sens ?? v.romaji})` : undefined,
  ].filter(Boolean);
  return parts.join(' ');
}

/** Does the learner's decomposition match the call? Spelling-insensitive; variant optional when the call has none. */
export function checkDecomposition(
  expected: { attaque: string; technique: string; variante?: string },
  given: { attaque?: string; technique?: string; variante?: string },
): { attaque: boolean; technique: boolean; variante: boolean; all: boolean } {
  const eq = (a?: string, b?: string) => answerKey(a ?? '') === answerKey(b ?? '');
  const res = {
    attaque: eq(expected.attaque, given.attaque),
    technique: eq(expected.technique, given.technique),
    variante: eq(expected.variante, given.variante),
  };
  return { ...res, all: res.attaque && res.technique && res.variante };
}

export const DEFAULT_CALL_DURATION = 30;

/** Duration in seconds allowed for each call (dureeAppel from examen.yaml or 30 s by default). */
export function getCallDuration(exam?: Partial<ExamLevel> | null): number {
  if (typeof exam?.dureeAppel === 'number' && exam.dureeAppel > 0) {
    return exam.dureeAppel;
  }
  return DEFAULT_CALL_DURATION;
}
