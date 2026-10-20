/**
 * Answer comparison for typed and assembled answers (docs/contrat.md, « Comparaison des réponses
 * tapées »).
 *
 * Insensitive to: case, accents and diacritics, hyphens, spaces, punctuation, apostrophes,
 * and long-vowel spellings of romaji: macrons are ignored and ō = o = ou = oo, ū = u = uu
 * (« katatedori » = « Katate-dori » = « katate dori », « kokyū-hō » = « kokyuho » = « kokyuuhou »).
 */

export type MatchResult =
  | { result: 'correct'; matched: string }
  | { result: 'wrong' };

/** Removes diacritics and macrons: ō -> o, é -> e, â -> a. */
export function stripDiacritics(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC');
}

/** Lower-case, accents removed, single spaces, punctuation replaced by spaces (for display/search). */
export function normalizeAnswer(text: string): string {
  return stripDiacritics(text)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

/**
 * Comparison key: normalised, with every separator removed and romaji long vowels folded
 * (ou, oo -> o; uu -> u). Two answers with the same key are the same answer.
 */
export function answerKey(text: string): string {
  return normalizeAnswer(text)
    .replace(/\s+/g, '')
    .replace(/o[ou]/g, 'o')
    .replace(/uu/g, 'u');
}

/** Compares a learner answer with the expected answer and its accepted variants. */
export function matchAnswer(input: string, expected: string | string[], accepted: string[] = []): MatchResult {
  const candidates = [...(Array.isArray(expected) ? expected : [expected]), ...accepted].filter(Boolean);
  const given = answerKey(input);
  if (!given) return { result: 'wrong' };
  for (const c of candidates) {
    if (answerKey(c) === given) return { result: 'correct', matched: c };
  }
  return { result: 'wrong' };
}

/** Joins answer tiles, gluing punctuation tiles to the previous word. */
export function joinTiles(tiles: string[]): string {
  return tiles.reduce((acc, t) => (!acc ? t : /^[,.;:!?…»)]+$/.test(t) ? acc + t : `${acc} ${t}`), '');
}
