import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { EXERCISE_TYPES } from '../src/types/curriculum.ts';
import { KNOWN_TYPES } from '../scripts/validate-content.mts';

// The registry (src/components/exercises/registry.ts) is typed as a complete record over
// EXERCISE_TYPES: a type without a view does not compile. These tests keep the validator,
// the type list, the contract and the documentation in step.

test('16 types, exactly the validator ones', () => {
  assert.equal(EXERCISE_TYPES.length, 16);
  assert.deepEqual([...KNOWN_TYPES].sort(), [...EXERCISE_TYPES].sort());
});

test('every catalogue type has an entry in the registry', () => {
  const registry = readFileSync('src/components/exercises/registry.ts', 'utf8');
  for (const t of EXERCISE_TYPES) assert.match(registry, new RegExp('^\\s+' + t + ':', 'm'), `registry: ${t}`);
});

test('every catalogue type is in the contract and in docs/types-exercices.md', () => {
  const contract = readFileSync('docs/contrat.md', 'utf8');
  for (const t of EXERCISE_TYPES) assert.ok(contract.includes('`' + t + '`'), `contrat: ${t}`);
  if (!existsSync('docs/types-exercices.md')) return;
  const doc = readFileSync('docs/types-exercices.md', 'utf8');
  for (const t of EXERCISE_TYPES) assert.ok(doc.includes('`' + t + '`'), `docs: ${t}`);
});

test('the contract lists no type unknown to the app', () => {
  const contract = readFileSync('docs/contrat.md', 'utf8');
  const table = contract.slice(contract.indexOf('### Catalogue des types'), contract.indexOf('Comparaison des réponses'));
  const listed = [...table.matchAll(/^\| `([a-z_]+)` \|/gm)].map(m => m[1]);
  assert.deepEqual(listed.sort(), [...EXERCISE_TYPES].sort());
});
