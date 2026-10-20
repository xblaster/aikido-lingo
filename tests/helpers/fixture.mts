import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import YAML from 'yaml';

export const SRC = [{ type: 'federation', ref: 'TEST', consulte: '2026-10-19' }];
export const RESEARCH = 'niveaux/6k/6k-u1/recherche/6k-u1-l1.md';

export function exercise(over: Record<string, unknown> = {}): any {
  return {
    id: 'ex-1', type: 'meaning_choice', prompt: 'Que signifie « seiza » ?', jpText: 'Seiza',
    correctAnswer: 'assis à genoux',
    options: [{ id: 'o1', text: 'assis à genoux' }, { id: 'o2', text: 'debout' }],
    sources: SRC, ...over,
  };
}

/** Eight valid exercises of three different types. */
export function exercises(): any[] {
  return Array.from({ length: 8 }, (_, i) =>
    i % 3 === 0 ? exercise({ id: `ex-${i + 1}` })
      : i % 3 === 1 ? exercise({ id: `ex-${i + 1}`, type: 'true_false', statement: 'Uke reçoit la technique.', correctAnswer: 'vrai', options: undefined, jpText: undefined })
        : exercise({ id: `ex-${i + 1}`, type: 'typed_term', frText: 'le salut', correctAnswer: 'rei', options: undefined, jpText: undefined }));
}

export function intro(over: Record<string, unknown> = {}): any {
  return { termes: [{ jp: 'Seiza', fr: 'assis à genoux' }], note: { titre: 'Note', texte: 'Texte.' }, ...over };
}

export function lesson(exs: any[], over: Record<string, unknown> = {}): any {
  return {
    id: '6k-u1-l1', title: 'Test', subtitle: 'Rei', description: '', icon: 'X', xpReward: 10, focus: 'test',
    isReview: false, research: RESEARCH, intro: intro(), exercises: exs, ...over,
  };
}

export function unit(lessons: any[], over: Record<string, unknown> = {}): any {
  return {
    id: '6k-u1', level: '6K', unitNumber: 1, title: 'Test', jpTitle: 'Reishiki', description: '', themeColor: '', icon: 'X',
    review: { statut: 'brouillon' }, lessons, ...over,
  };
}

/** A full draft unit: 8 lessons of 8 exercises, lesson 8 a review. */
export function fullUnit(n = 1): any {
  const id = `6k-u${n}`;
  return unit(
    Array.from({ length: 8 }, (_, i) => lesson(exercises(), { id: `${id}-l${i + 1}`, isReview: i === 7 })),
    { id, unitNumber: n },
  );
}

/**
 * Writes a temporary content/ directory with the given units and extra files (keyed by path
 * relative to content/). The research sheet RESEARCH exists.
 */
export function contentDir(units: any[], extra: Record<string, unknown> = {}): string {
  const dir = mkdtempSync(join(tmpdir(), 'aikidolingo-'));
  mkdirSync(dirname(join(dir, RESEARCH)), { recursive: true });
  writeFileSync(join(dir, RESEARCH), '# Fiche de recherche de test');
  for (const u of units) {
    const d = join(dir, 'niveaux', String(u.level).toLowerCase());
    mkdirSync(d, { recursive: true });
    writeFileSync(join(d, `${u.id}.yaml`), YAML.stringify(u, { aliasDuplicateObjects: false }));
  }
  for (const [name, data] of Object.entries(extra)) {
    mkdirSync(dirname(join(dir, name)), { recursive: true });
    writeFileSync(join(dir, name), typeof data === 'string' ? data : YAML.stringify(data));
  }
  return dir;
}
