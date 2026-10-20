import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aspectOf, creditLines, embedUrl, fitOf, imageUrl, sceneFor, videoFileUrl, videoOf, youtubeId, type MediaEntry } from '../src/utils/media.ts';

const entries: Record<string, MediaEntry> = {
  'scenes/seiza': {
    family: 'scenes', emoji: '🧎', statut: 'valide',
    origine: { type: 'libre', auteur: 'A. Auteur', licence: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Seiza.jpg' },
  },
  'scenes/mae-ukemi': {
    family: 'scenes', emoji: '🤸', statut: 'valide', origine: { type: 'genere' },
    video: { type: 'embed', url: 'https://www.youtube.com/watch?v=abcDEF12345', debut: 12, fin: 19.5 },
  },
  'scenes/zarei': { family: 'scenes', emoji: '🙇', statut: 'a-relire', video: { type: 'fichier' } },
  'covers/dojo': { family: 'covers', emoji: '⛩️', statut: 'a-relire' },
};

test('in production only valide media are requested; in development every catalogue entry', () => {
  assert.equal(imageUrl('scenes/seiza', true, entries), '/images/scenes/seiza.webp');
  assert.equal(imageUrl('scenes/zarei', true, entries), null);
  assert.equal(imageUrl('scenes/zarei', false, entries), '/images/scenes/zarei.webp');
  assert.equal(imageUrl('scenes/inconnue', false, entries), null);
  assert.equal(imageUrl(undefined, false, entries), null);
});

test('frames: scenes 4:3, covers and modules 2:1, mascot and badges square', () => {
  assert.equal(aspectOf('scenes/seiza'), 4 / 3);
  assert.equal(aspectOf('covers/dojo'), 2);
  assert.equal(aspectOf('modules/lexique'), 2);
  assert.equal(aspectOf('badges/6k'), 1);
  assert.equal(fitOf('scenes/seiza'), 'cover');
  assert.equal(fitOf('mascotte/neutre'), 'contain');
});

test('videos: hidden in production when not valide; local clip path', () => {
  assert.equal(videoOf('scenes/zarei', true, entries), null);
  assert.deepEqual(videoOf('scenes/zarei', false, entries), { type: 'fichier' });
  assert.equal(videoFileUrl('scenes/zarei', { type: 'fichier' }), '/videos/scenes/zarei.webm');
});

test('embed: youtube-nocookie, limited to [debut, fin], muted', () => {
  assert.equal(youtubeId('https://youtu.be/abcDEF12345?t=3'), 'abcDEF12345');
  const url = embedUrl(entries['scenes/mae-ukemi'].video!)!;
  assert.ok(url.startsWith('https://www.youtube-nocookie.com/embed/abcDEF12345?'));
  const q = new URL(url).searchParams;
  assert.equal(q.get('start'), '12');
  assert.equal(q.get('end'), '20');
  assert.equal(q.get('mute'), '1');
  assert.equal(embedUrl({ type: 'embed', url: 'https://example.org/video' }), null);
});

test('credits: a CC BY-SA entry gives author, licence and link', () => {
  const lines = creditLines(entries, false);
  assert.deepEqual(lines.filter(l => l.what === 'image'), [{
    id: 'scenes/seiza', what: 'image', auteur: 'A. Auteur', licence: 'CC BY-SA 4.0',
    url: 'https://commons.wikimedia.org/wiki/File:Seiza.jpg', attribution: undefined,
  }]);
  // generated images are not credited
  assert.ok(!lines.some(l => l.id === 'scenes/mae-ukemi' && l.what === 'image'));
});

test('credits list only what production displays', () => {
  const e = { ...entries, 'scenes/seiza': { ...entries['scenes/seiza'], statut: 'a-relire' } };
  assert.deepEqual(creditLines(e, true), []);
});

test('sceneFor finds the scene named after a term', () => {
  assert.equal(sceneFor('Mae ukemi', entries), 'scenes/mae-ukemi');
  assert.equal(sceneFor('Seiza', entries), 'scenes/seiza');
  assert.equal(sceneFor('Tatami', entries), undefined);
});
