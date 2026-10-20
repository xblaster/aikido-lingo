/**
 * Converts the YAML content of content/ into the JSON files imported by the app
 * (src/data/generated/). Run by `npm run content:build` (predev, prebuild, pretest).
 *
 * Every input is optional: a missing or empty file gives an empty level or module, so the app
 * builds with partial content.
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = join(ROOT, 'content');
const OUT = join(ROOT, 'src', 'data', 'generated');

/** Levels and their referential file (docs/contrat.md « Niveaux »). */
export const LEVELS = ['6K', '5K', '4K', '3K', '1K', 'SHODAN'] as const;
export const REFERENTIEL_FILES: Record<string, string> = {
  '6K': '6k.yaml', '5K': '5k.yaml', '4K': '4k.yaml', '3K': '3k.yaml', '1K': '2k-1k.yaml', SHODAN: 'shodan.yaml',
};
export const IMAGE_FAMILIES = ['mascotte', 'badges', 'covers', 'modules', 'scenes'] as const;

export function readYaml(path: string): unknown {
  try {
    return YAML.parse(readFileSync(path, 'utf8'));
  } catch (e) {
    throw new Error(`YAML invalide : ${path}\n${(e as Error).message}`);
  }
}

/** Units of a level, sorted by unitNumber. Files starting with "_" are ignored. */
export function loadLevelUnits(level: string, contentDir = CONTENT): any[] {
  const dir = join(contentDir, 'niveaux', level.toLowerCase());
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => f.endsWith('.yaml') && !f.startsWith('_'))
    .map(f => readYaml(join(dir, f)) as any)
    .filter(u => u && typeof u === 'object' && !Array.isArray(u))
    .map(u => ({ ...u, lessons: Array.isArray(u.lessons) ? u.lessons : [] }))
    .sort((a, b) => (a.unitNumber ?? 0) - (b.unitNumber ?? 0));
}

/**
 * A list file (lexique, etiquette, examen): a YAML list, or an object holding one list
 * (e.g. `entrees: [...]`). Missing or empty file: [].
 */
export function readList(path: string): any[] {
  if (!existsSync(path)) return [];
  const data = readYaml(path);
  if (Array.isArray(data)) return data.filter(Boolean);
  if (data && typeof data === 'object') {
    const list = Object.values(data).find(Array.isArray);
    if (list) return (list as any[]).filter(Boolean);
  }
  return [];
}

/**
 * Media catalogue (docs/images/manifest.yaml), keyed by "<famille>/<id>": fallback emoji, scene,
 * review status (absent = a-relire), origin (licence, author) and optional video.
 */
export function loadImageManifest(manifestPath = join(ROOT, 'docs', 'images', 'manifest.yaml')) {
  const entries: Record<string, {
    family: string; emoji: string; scene?: string; statut: string;
    origine?: { type?: string; url?: string; auteur?: string; licence?: string; attribution?: string };
    video?: { type: 'fichier' | 'embed'; src?: string; url?: string; debut?: number; fin?: number; licence?: string; attribution?: string };
  }> = {};
  if (!existsSync(manifestPath)) return { entries };
  const data = (readYaml(manifestPath) ?? {}) as Record<string, any[]>;
  for (const [family, list] of Object.entries(data)) {
    if (!Array.isArray(list)) continue;
    for (const e of list) {
      if (!e?.id) continue;
      entries[`${family}/${e.id}`] = {
        family,
        emoji: e.emoji ?? '',
        scene: e.scene,
        statut: e.relecture?.statut ?? 'a-relire',
        ...(e.origine ? { origine: e.origine } : {}),
        ...(e.video ? { video: e.video } : {}),
      };
    }
  }
  return { entries };
}

export function loadContent(contentDir = CONTENT) {
  const levels: Record<string, any[]> = {};
  for (const level of LEVELS) levels[level] = loadLevelUnits(level, contentDir);
  const optional = (name: string) => {
    const p = join(contentDir, name);
    return existsSync(p) ? readYaml(p) : null;
  };
  const referentiels: Record<string, unknown> = {};
  for (const level of LEVELS) {
    const r = optional(join('referentiel', REFERENTIEL_FILES[level]));
    if (r) referentiels[level] = r;
  }
  return {
    levels,
    referentiels,
    demo: optional(join('_exemples', 'demo-types.yaml')),
    lexique: readList(join(contentDir, 'lexique.yaml')),
    etiquette: readList(join(contentDir, 'etiquette.yaml')),
    examen: readList(join(contentDir, 'examen.yaml')),
    histoire: readList(join(contentDir, 'referentiel', 'histoire.yaml')),
  };
}

/** The engine test lesson (tests/fixtures/demo-types.yaml), owned by the technical side. */
export function loadFixtureDemo() {
  const p = join(ROOT, 'tests', 'fixtures', 'demo-types.yaml');
  return existsSync(p) ? readYaml(p) : null;
}

function main() {
  const c = loadContent();
  mkdirSync(OUT, { recursive: true });
  const write = (name: string, data: unknown) => writeFileSync(join(OUT, name), JSON.stringify(data ?? null) + '\n');
  write('curriculum.json', c.levels);
  write('referentiels.json', c.referentiels);
  write('lexique.json', c.lexique);
  write('etiquette.json', c.etiquette);
  write('examen.json', c.examen);
  write('histoire.json', c.histoire);
  write('demo.json', c.demo);
  write('demo-fixture.json', loadFixtureDemo());
  write('images.json', loadImageManifest());
  const migrations = join(CONTENT, 'migrations.yaml');
  write('migrations.json', (existsSync(migrations) && readYaml(migrations)) || { lessons: {}, units: {} });
  const units = Object.values(c.levels).flat();
  const exercises = units.flatMap((u: any) => u.lessons.flatMap((l: any) => l.exercises ?? []));
  const filled = LEVELS.filter(l => c.levels[l].length).join(', ') || 'aucun';
  console.log(
    `content: ${units.length} unités (niveaux : ${filled}), ${exercises.length} exercices, ` +
    `lexique ${c.lexique.length}, étiquette ${c.etiquette.length}, examen ${c.examen.length} -> src/data/generated/`,
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
