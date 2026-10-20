import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadContent, loadFixtureDemo, loadImageManifest, readList, LEVELS, REFERENTIEL_FILES } from '../scripts/build-content.mts';
import { validate } from '../scripts/validate-content.mts';
import { EXERCISE_TYPES, LEVELS as APP_LEVELS, REFERENTIEL_FILES as APP_REF } from '../src/types/curriculum.ts';
import { contentDir, fullUnit } from './helpers/fixture.mts';

test('levels and referential files are the contract ones (2k-1k.yaml -> 1K)', () => {
  assert.deepEqual([...LEVELS], ['6K', '5K', '4K', '3K', '1K', 'SHODAN']);
  assert.deepEqual([...APP_LEVELS], [...LEVELS]);
  assert.equal(REFERENTIEL_FILES['1K'], '2k-1k.yaml');
  assert.deepEqual(APP_REF, REFERENTIEL_FILES);
});

test('a referential 2k-1k.yaml is loaded as level 1K', () => {
  const dir = contentDir([], { 'referentiel/2k-1k.yaml': { titre: '2e et 1er kyu' } });
  assert.deepEqual(loadContent(dir).referentiels, { '1K': { titre: '2e et 1er kyu' } });
});

test('units are loaded from content/niveaux/<niv>/, sorted, "_" files ignored', () => {
  const dir = contentDir([fullUnit(2), fullUnit(1)], { 'niveaux/6k/_brouillon.yaml': { id: 'x' } });
  const c = loadContent(dir);
  assert.deepEqual(c.levels['6K'].map((u: any) => u.id), ['6k-u1', '6k-u2']);
  assert.equal(c.levels['5K'].length, 0);
});

test('missing or empty annex files give empty lists', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aikidolingo-'));
  writeFileSync(join(dir, 'lexique.yaml'), '');
  writeFileSync(join(dir, 'etiquette.yaml'), 'fiches:\n  - { id: a, titre: t, etapes: [x], pourquoi: p }\n');
  const c = loadContent(dir);
  assert.deepEqual(c.lexique, []);
  assert.equal(c.etiquette.length, 1); // a list under one key is accepted
  assert.deepEqual(c.examen, []);
  assert.deepEqual(readList(join(dir, 'absent.yaml')), []);
});

test('the technical fixture has one exercise of each of the 16 types and no error', () => {
  const fx: any = loadFixtureDemo();
  assert.deepEqual([...fx.exercises.map((e: any) => e.type)].sort(), [...EXERCISE_TYPES].sort());
  assert.deepEqual(validate().issues.filter(i => i.where.startsWith('fixture') && i.level === 'error'), []);
});

test('the content demo, when present, passes the exercise checks', () => {
  const demo: any = loadContent().demo;
  if (!demo) return;
  assert.deepEqual(validate().errors.filter(i => i.where.startsWith('démonstration')), []);
});

test('build-content writes images.json from the manifest, with status, origin and video', () => {
  const generated = join('src', 'data', 'generated', 'images.json');
  assert.ok(existsSync(generated), 'run npm run content:build');
  const json = JSON.parse(readFileSync(generated, 'utf8'));
  assert.deepEqual(json, JSON.parse(JSON.stringify(loadImageManifest())));
  const seiza = json.entries['scenes/seiza'];
  assert.ok(seiza.emoji);
  assert.ok(['a-relire', 'valide', 'refuse'].includes(seiza.statut));
  for (const id of ['badges/6k', 'badges/shodan', 'modules/lexique', 'modules/reishiki', 'modules/decodeur', 'modules/examen', 'mascotte/neutre']) {
    assert.ok(json.entries[id], id);
  }
});

test('manifest entries keep origin and video fields', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aikidolingo-'));
  const p = join(dir, 'manifest.yaml');
  writeFileSync(p, [
    'scenes:',
    '  - id: seiza',
    '    emoji: "🧎"',
    '    origine: { type: libre, auteur: "A. Auteur", licence: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/x" }',
    '    video: { type: embed, url: "https://youtu.be/abcdefghijk", debut: 5, fin: 12 }',
    '    relecture: { statut: valide }',
  ].join('\n'));
  const e = loadImageManifest(p).entries['scenes/seiza'];
  assert.equal(e.statut, 'valide');
  assert.equal(e.origine?.licence, 'CC BY-SA 4.0');
  assert.equal(e.video?.type, 'embed');
  assert.equal(e.family, 'scenes');
});
