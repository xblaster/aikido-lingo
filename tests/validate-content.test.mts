import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validate } from '../scripts/validate-content.mts';
import { contentDir, exercise, exercises, fullUnit, lesson, unit, RESEARCH } from './helpers/fixture.mts';

/** Issues of a single draft lesson holding these exercises (volume shortfalls are warnings). */
const run = (exs: any[], extra: Record<string, unknown> = {}) =>
  validate({ contentDir: contentDir([unit([lesson(exs)])], extra), levels: ['6K'] });
const codes = (r: ReturnType<typeof validate>) => r.errors.map(e => e.code);
/** Errors of one exercise, padded with valid exercises to reach 3 types. */
const exCodes = (ex: any) => codes(run([ex, ...exercises().slice(1)]));

test('the current content, demo and fixture have no error', () => {
  assert.deepEqual(validate().errors, []);
});

test('a level without content is only a warning', () => {
  const r = validate({ contentDir: contentDir([]), levels: ['5K'] });
  assert.deepEqual(r.errors, []);
  assert.deepEqual(r.warnings.map(w => w.code), ['niveau-vide']);
});

test('a complete draft unit passes; a partial level warns about the volume', () => {
  const r = validate({ contentDir: contentDir([fullUnit(1)]), levels: ['6K'] });
  assert.deepEqual(r.errors, []);
  assert.ok(r.warnings.some(w => w.code === 'volume' && w.message.includes('1 unité')));
});

test('a reviewed unit with missing volume is an error, and needs relecteur/qualification/date', () => {
  const u = unit([lesson(exercises())], { review: { statut: 'relu' } });
  const r = validate({ contentDir: contentDir([u]), levels: ['6K'] });
  assert.ok(r.errors.some(e => e.code === 'volume'));
  assert.ok(r.errors.some(e => e.code === 'relecture' && e.message.includes('qualification')));
});

test('lesson 8 must be a review', () => {
  const u = fullUnit(1);
  u.lessons[7].isReview = false;
  const r = validate({ contentDir: contentDir([u]), levels: ['6K'] });
  assert.ok(r.errors.some(e => e.code === 'revision'));
});

test('fewer than 3 exercise types in a lesson is an error', () => {
  const r = run(Array.from({ length: 8 }, (_, i) => exercise({ id: `e${i}` })));
  assert.ok(codes(r).includes('types'));
});

test('ids: unit, lesson and exercise ids must be well formed and unique', () => {
  const bad = unit([lesson(exercises(), { id: '6k-u1-lecon1' })], { id: '6K_U1' });
  const r = validate({ contentDir: contentDir([bad]), levels: ['6K'] });
  assert.ok(r.errors.some(e => e.code === 'identifiant' && e.message.includes('6k-u1')));
  assert.ok(r.errors.some(e => e.code === 'identifiant' && e.message.includes('6k-u1-l1')));
  const dup = exercises();
  dup[1].id = dup[0].id;
  assert.ok(codes(run(dup)).includes('identifiant'));
  assert.ok(exCodes(exercise({ id: 'Ex 1' })).includes('identifiant'));
});

test('every exercise needs a source with a consultation date', () => {
  assert.ok(exCodes(exercise({ sources: [] })).includes('source-manquante'));
  assert.ok(exCodes(exercise({ sources: [{ type: 'web', ref: 'X' }] })).includes('source-invalide'));
  assert.ok(exCodes(exercise({ sources: [{ type: 'lod', ref: 'X', consulte: '2026-10-19' }] })).includes('source-invalide'));
});

test('research sheet: required and must exist', () => {
  assert.ok(codes(run(exercises(), {})).every(c => c !== 'recherche'));
  const r = validate({ contentDir: contentDir([unit([lesson(exercises(), { research: 'niveaux/6k/absente.md' })])]), levels: ['6K'] });
  assert.ok(r.errors.some(e => e.code === 'recherche' && e.message.includes('absente.md')));
  const r2 = validate({ contentDir: contentDir([unit([lesson(exercises(), { research: undefined })])]), levels: ['6K'] });
  assert.ok(r2.errors.some(e => e.code === 'recherche'));
  assert.ok(RESEARCH.startsWith('niveaux/'));
});

test('choice types: answer among the options, no duplicate', () => {
  assert.ok(exCodes(exercise({ correctAnswer: 'en marchant' })).includes('reponse-hors-options'));
  assert.deepEqual(exCodes(exercise({ correctAnswer: 'Assis a genoux' })), []); // spelling-insensitive
  assert.ok(exCodes(exercise({ options: [{ id: 'o1', text: 'assis à genoux' }, { id: 'o2', text: 'Assis a genoux' }] })).includes('options'));
});

test('tile_build: every tile must be in the word bank', () => {
  const ex = exercise({ type: 'tile_build', frText: 'x', correctAnswer: ['katate-dori', 'ikkyo'], wordBank: ['ikkyo', 'nikyo'], options: undefined });
  const r = exCodes(ex);
  assert.ok(r.includes('banque-incomplete'));
});

test('match_pairs: at least 3 distinct pairs', () => {
  const ex = exercise({ type: 'match_pairs', correctAnswer: 'pairs', options: undefined, pairs: [{ jp: 'Migi', fr: 'droite' }, { jp: 'Hidari', fr: 'gauche' }] });
  assert.ok(exCodes(ex).includes('paires'));
});

test('order_steps: correctAnswer is « steps » or the steps in order', () => {
  const base = { type: 'order_steps', options: undefined, jpText: undefined, steps: ['a', 'b', 'c'] };
  assert.deepEqual(exCodes(exercise({ ...base, correctAnswer: 'steps' })), []);
  assert.deepEqual(exCodes(exercise({ ...base, correctAnswer: ['a', 'b', 'c'] })), []);
  assert.ok(exCodes(exercise({ ...base, correctAnswer: ['b', 'a', 'c'] })).includes('etapes'));
});

test('true_false: answer is vrai or faux', () => {
  assert.ok(exCodes(exercise({ type: 'true_false', statement: 's', correctAnswer: 'oui', options: undefined })).includes('vrai-faux'));
});

test('technique_decoder needs a decomposition', () => {
  const ex = exercise({ type: 'technique_decoder', jpText: 'Shomen-uchi ikkyo', correctAnswer: 'ikkyo', options: [{ id: 'o1', text: 'ikkyo' }, { id: 'o2', text: 'nikyo' }] });
  assert.ok(exCodes(ex).includes('decomposition'));
  assert.deepEqual(exCodes({ ...ex, decomposition: { attaque: 'shomen-uchi', technique: 'ikkyo' } }), []);
});

test('story: each question answer among its options', () => {
  const ex = exercise({
    type: 'story', correctAnswer: 'story', options: undefined, jpText: undefined,
    dialogue: [{ speaker: 'A', text: 'x' }],
    storyQuestions: [{ afterLine: 1, prompt: 'q', correctAnswer: 'z', options: [{ id: 'o1', text: 'y' }] }],
  });
  assert.ok(exCodes(ex).includes('reponse-hors-options'));
});

test('an unknown type is an error', () => {
  assert.ok(exCodes(exercise({ type: 'karaoke' })).includes('type-inconnu'));
});

test('images: an unknown illustration.image fails, naming the exercise and the id', () => {
  const opts = (image: string) => [
    { id: 'o1', text: 'Seiza', illustration: { image, emoji: '🧎', alt: 'assis' } },
    { id: 'o2', text: 'Rei', illustration: { emoji: '🙇', alt: 'salut' } },
  ];
  const ok = exercise({ id: 'img-ok', type: 'image_choice', correctAnswer: 'Seiza', options: opts('scenes/seiza') });
  assert.deepEqual(exCodes(ok), []);
  const bad = exercise({ id: 'img-bad', type: 'image_choice', correctAnswer: 'Seiza', options: opts('scenes/kokyu-ho') });
  const r = run([bad, ...exercises().slice(1)]);
  const err = r.errors.find(e => e.code === 'image-inconnue');
  assert.ok(err);
  assert.match(err!.where, /img-bad/);
  assert.match(err!.message, /scenes\/kokyu-ho/);
});

test('images: an unknown unit cover fails', () => {
  const r = validate({ contentDir: contentDir([unit([lesson(exercises())], { cover: 'inexistante' })]), levels: ['6K'] });
  assert.ok(r.errors.some(e => e.code === 'image-inconnue' && e.message.includes('covers/inexistante')));
  const ok = validate({ contentDir: contentDir([unit([lesson(exercises())], { cover: 'dojo' })]), levels: ['6K'] });
  assert.ok(!ok.errors.some(e => e.code === 'image-inconnue'));
});

test('verification in the same session as writing is refused', () => {
  const l = lesson(exercises(), { auteur: { session: 's1', date: '2026-10-19' }, verification: { date: '2026-10-19', verificateur: 'v', session: 's1', ecarts: [] } });
  const r = validate({ contentDir: contentDir([unit([l])]), levels: ['6K'] });
  assert.ok(r.errors.some(e => e.code === 'verification' && e.message.includes('non indépendante')));
});

test('annex files: lexique, etiquette and examen entries are checked', () => {
  const src = { type: 'federation', ref: 'X', consulte: '2026-10-19' };
  const dir = contentDir([], {
    'lexique.yaml': [{ id: 'rei', romaji: 'rei', sens: 'salut', categorie: 'étiquette', source: src }, { id: 'rei', romaji: 'x', sens: 'y', categorie: 'z' }],
    'etiquette.yaml': [{ id: 'entrer', titre: 'Entrer', etapes: [], pourquoi: 'p', source: src }],
    'examen.yaml': [{ level: '7K', epreuves: [{ categorie: 'c', appel: 'a' }], criteres: [], sources: [src] }],
  });
  const r = validate({ contentDir: dir, fixture: false });
  const where = r.errors.map(e => `${e.where}:${e.code}`).join('\n');
  assert.match(where, /lexique rei:identifiant/);
  assert.match(where, /lexique rei:source-manquante/);
  assert.match(where, /étiquette entrer:schema/);
  assert.match(where, /examen 7K:schema/);
});

test('a published unit in a level whose referential is a-completer fails', () => {
  const u = fullUnit(1);
  u.level = '4K';
  u.id = '4k-u1';
  u.review = { statut: 'publie', relecteur: 'Sensei', qualification: '6e dan', date: '2026-10-19' };
  const r = validate({
    contentDir: contentDir([u], { 'referentiel/4k.yaml': { level: '4K', nom: '4e kyu', etat: 'a-completer' } }),
    levels: ['4K'],
  });
  assert.ok(r.errors.some(e => e.code === 'referentiel-incomplet'));
});

test('a term with a kanji without source fails', () => {
  const l = lesson(exercises(), {
    intro: {
      termes: [{ jp: 'Rei', kanji: '礼', fr: 'salut' }],
      note: { titre: 'T', texte: 'X' },
    },
  });
  const r = validate({ contentDir: contentDir([unit([l])]), levels: ['6K'] });
  assert.ok(r.errors.some(e => e.code === 'kanji-sans-source' && e.message.includes('礼')));
});
