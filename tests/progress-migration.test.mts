import { test } from 'node:test';
import assert from 'node:assert/strict';
import { migrateIds, migrateProgress, PROGRESS_SCHEMA_VERSION } from '../src/utils/progressMigration.ts';

const map = { lessons: { 'a1-u1-l1': 'a1-u1-l3', 'a1-u1-l3': 'a1-u2-l1', 'a1-u4-l1': null }, units: { 'a1-u4': 'a1-u2' } };

test('a renamed lesson stays completed under its new id (scenario « Leçon renommée »)', () => {
  assert.deepEqual(migrateIds(['a1-u1-l1'], { 'a1-u1-l1': 'a1-u1-l3' }), ['a1-u1-l3']);
});

test('renames are followed in chain, duplicates merged, removed lessons dropped', () => {
  assert.deepEqual(migrateIds(['a1-u1-l1', 'a1-u2-l1', 'a1-u4-l1', 'b1-u1-l1'], map.lessons), ['a1-u2-l1', 'b1-u1-l1']);
});

test('a v1 progress keeps its XP, gems and streak, and gets the current schema version', () => {
  const v1 = { xp: 340, gems: 85, streak: 6, completedLessons: ['a1-u1-l1', 'a1-u2-l1'], completedUnits: ['a1-u4'] };
  const v2 = migrateProgress(v1, map);
  assert.equal(v2.xp, 340);
  assert.equal(v2.gems, 85);
  assert.equal(v2.streak, 6);
  assert.deepEqual(v2.completedLessons, ['a1-u2-l1']);
  assert.deepEqual(v2.completedUnits, ['a1-u2']);
  assert.equal(v2.schemaVersion, PROGRESS_SCHEMA_VERSION);
});

test('migration is idempotent', () => {
  const once = migrateProgress({ completedLessons: ['a1-u1-l1'], completedUnits: [] }, map);
  assert.deepEqual(migrateProgress(once, map), once);
});

test('a rename cycle does not loop forever', () => {
  assert.deepEqual(migrateIds(['x'], { x: 'y', y: 'x' }), ['x']);
});
