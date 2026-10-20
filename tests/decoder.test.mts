import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildDecoderCatalogue, checkDecomposition, composeName, readName, getCallDuration, DEFAULT_CALL_DURATION } from '../src/utils/decoder.ts';
import { shuffledOrder } from '../src/utils/order.ts';

const src = { type: 'federation' as const, ref: 'X', consulte: '2026-10-19' };
const lexique = [
  { id: 'katate-dori', romaji: 'katate-dori', sens: "saisie d'un poignet", categorie: 'attaque', source: src },
  { id: 'ikkyo', romaji: 'ikkyo', sens: 'première immobilisation', categorie: 'technique', source: src },
  { id: 'omote', romaji: 'omote', sens: 'devant', categorie: 'vocabulaire', source: src },
  { id: 'ura', romaji: 'ura', sens: 'derrière', categorie: 'vocabulaire', source: src },
];
const examen = [{
  level: '6K' as const,
  epreuves: [{ categorie: 'tachi waza', appel: 'Shomen-uchi ikkyo omote', attaque: 'shomen-uchi', technique: 'ikkyō', variante: 'omote' }],
  criteres: [],
}];

test('the catalogue merges the exam calls and the lexicon, without duplicates', () => {
  const cat = buildDecoderCatalogue(lexique, examen);
  assert.deepEqual(cat.attaques.map(p => p.romaji), ['katate-dori', 'shomen-uchi']);
  assert.deepEqual(cat.techniques.map(p => p.romaji), ['ikkyō']);
  assert.equal(cat.techniques[0].sens, 'première immobilisation'); // ikkyō = ikkyo
  assert.deepEqual(cat.variantes.map(p => p.romaji), ['omote', 'ura']);
  assert.equal(cat.appels.length, 1);
});

test('compose and read a call', () => {
  const cat = buildDecoderCatalogue(lexique, examen);
  assert.equal(composeName('katate-dori', 'ikkyo', 'ura'), 'katate-dori ikkyo ura');
  assert.equal(readName(cat, 'katate-dori', 'ikkyo', 'ura'), "première immobilisation sur saisie d'un poignet (derrière)");
});

test('decomposition check is spelling-insensitive and strict on each part', () => {
  const exp = { attaque: 'shomen-uchi', technique: 'ikkyō', variante: 'omote' };
  assert.equal(checkDecomposition(exp, { attaque: 'Shomen uchi', technique: 'ikkyo', variante: 'omote' }).all, true);
  const r = checkDecomposition(exp, { attaque: 'shomen-uchi', technique: 'ikkyo', variante: 'ura' });
  assert.equal(r.all, false);
  assert.equal(r.variante, false);
  assert.equal(checkDecomposition({ attaque: 'a', technique: 'b' }, { attaque: 'a', technique: 'b' }).all, true);
});

test('order_steps shuffle is deterministic and never already solved', () => {
  for (const seed of ['a', 'b', 'demo-order-steps', 'x1']) {
    const o = shuffledOrder(4, seed);
    assert.deepEqual([...o].sort(), [0, 1, 2, 3]);
    assert.notDeepEqual(o, [0, 1, 2, 3]);
    assert.deepEqual(shuffledOrder(4, seed), o);
  }
});

test('dureeAppel is read from exam level (defaults to 30s, or 45s with fixture)', () => {
  assert.equal(DEFAULT_CALL_DURATION, 30);
  assert.equal(getCallDuration(null), 30);
  assert.equal(getCallDuration({}), 30);
  assert.equal(getCallDuration({ dureeAppel: 45 }), 45);
});
