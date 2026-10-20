import { UserProgress, INITIAL_USER_PROGRESS } from '@/types/gamification';
import migrations from '@/data/generated/migrations.json';
import { migrateProgress, type IdMigrations } from './progressMigration';

/** Reserved for a previous schema (none yet). */
const STORAGE_KEY_V1 = 'aikidolingo_user_progress_v0';
const STORAGE_KEY = 'aikidolingo_user_progress_v1';

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') return INITIAL_USER_PROGRESS;

  try {
    const raw = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(STORAGE_KEY_V1);
    if (!raw) return INITIAL_USER_PROGRESS;
    const parsed = JSON.parse(raw);
    // renames are applied on every load, so later content changes migrate too
    const migrated = migrateProgress({ ...INITIAL_USER_PROGRESS, ...parsed }, migrations as IdMigrations);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    return migrated;
  } catch (e) {
    console.error('Failed to load user progress:', e);
    return INITIAL_USER_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save user progress:', e);
  }
}

export function resetUserProgress(): UserProgress {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY_V1);
  }
  return INITIAL_USER_PROGRESS;
}
