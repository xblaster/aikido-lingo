/**
 * Migration of the saved progress when content identifiers change (content/migrations.yaml).
 * Pure functions: no storage access.
 */

export const PROGRESS_SCHEMA_VERSION = 2;

/** Old id -> new id, or null when the content was removed without replacement. */
export interface IdMigrations {
  lessons: Record<string, string | null>;
  units: Record<string, string | null>;
}

interface WithCompletion {
  completedLessons?: string[];
  completedUnits?: string[];
}

/** Follows renames (a -> b -> c) and drops removed ids; keeps unknown ids as they are. */
export function migrateIds(ids: string[], map: Record<string, string | null>): string[] {
  const out: string[] = [];
  for (const id of ids) {
    let cur: string | null = id;
    const seen = new Set<string>();
    while (cur !== null && Object.prototype.hasOwnProperty.call(map, cur) && !seen.has(cur)) {
      seen.add(cur);
      cur = map[cur];
    }
    if (cur !== null && !out.includes(cur)) out.push(cur);
  }
  return out;
}

/** Returns the progress with lesson and unit ids migrated, and the current schema version. */
export function migrateProgress<T extends WithCompletion>(progress: T, map: IdMigrations): T & { schemaVersion: number } {
  return {
    ...progress,
    completedLessons: migrateIds(progress.completedLessons ?? [], map.lessons),
    completedUnits: migrateIds(progress.completedUnits ?? [], map.units),
    schemaVersion: PROGRESS_SCHEMA_VERSION,
  };
}
