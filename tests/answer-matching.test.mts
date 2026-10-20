import { test } from 'node:test';
import assert from 'node:assert/strict';
import { matchAnswer, normalizeAnswer, answerKey, joinTiles } from '../src/utils/answerMatching.ts';

// docs/contrat.md: case-, accent-, hyphen- and space-insensitive; macrons ignored (ō = o = ou).

test('katatedori = Katate-dori = katate dori', () => {
  for (const given of ['katatedori', 'Katate-dori', 'katate dori', 'KATATE  DORI', ' katate–dori ']) {
    assert.equal(matchAnswer(given, 'katate-dori').result, 'correct', given);
  }
});

test('macrons are ignored: ō = o = ou = oo, ū = u = uu', () => {
  for (const given of ['dojo', 'dōjō', 'doujou', 'doojoo', 'Dôjô']) assert.equal(matchAnswer(given, 'dōjō').result, 'correct', given);
  for (const given of ['kokyuho', 'kokyū-hō', 'kokyuuhou']) assert.equal(matchAnswer(given, 'Kokyū-hō').result, 'correct', given);
});

test('accents of French answers do not matter', () => {
  assert.equal(matchAnswer('salut a genoux', 'Salut à genoux').result, 'correct');
});

test('apostrophes and punctuation are ignored', () => {
  assert.equal(matchAnswer("onegaishimasu !", 'Onegaishimasu.').result, 'correct');
});

test('accepted answers are correct too', () => {
  assert.equal(matchAnswer('ritsu rei', 'ritsurei', ['ritsu-rei']).result, 'correct');
});

test('a different term is wrong', () => {
  assert.equal(matchAnswer('kata-dori', 'katate-dori').result, 'wrong');
  assert.equal(matchAnswer('ikkyo', 'nikyo').result, 'wrong');
  assert.equal(matchAnswer('omote', 'ura').result, 'wrong');
});

test('an empty answer is wrong', () => {
  assert.equal(matchAnswer('   ', 'rei').result, 'wrong');
});

test('normalizeAnswer: lower case, no accents, single spaces', () => {
  assert.equal(normalizeAnswer('  Shōmen-Uchi  Ikkyō! '), 'shomen uchi ikkyo');
});

test('answerKey folds every separator and long vowel', () => {
  assert.equal(answerKey('Ushiro ryōte-dori'), answerKey('ushiroryotedori'));
});

test('joinTiles joins with spaces and glues punctuation', () => {
  assert.equal(joinTiles(['katate-dori', 'ikkyo', 'omote']), 'katate-dori ikkyo omote');
  assert.equal(joinTiles(['Onegaishimasu', '.']), 'Onegaishimasu.');
});
