/**
 * Content validator (docs/contrat.md). Run by `npm run validate:content` and before every build.
 *
 *   node scripts/validate-content.mts [--level 6K] [--json]
 *
 * Exit code 1 when at least one error is found. Levels without content are warnings only, so
 * the app builds while the curriculum is being written.
 */
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LEVELS, loadContent, loadFixtureDemo, loadImageManifest, REFERENTIEL_FILES } from './build-content.mts';
import { joinTiles, answerKey } from '../src/utils/answerMatching.ts';

export { joinTiles };

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export type IssueLevel = 'error' | 'warning';
export interface Issue { level: IssueLevel; code: string; where: string; message: string }

export interface ValidateOptions {
  contentDir?: string;
  /** Image catalogue (default docs/images/manifest.yaml). */
  manifestPath?: string;
  /** Only check these levels. */
  levels?: string[];
  /** Also check the technical fixture (tests/fixtures/demo-types.yaml). Default: true when contentDir is the default. */
  fixture?: boolean;
}

export const VOLUMES = { units: 5, lessons: 8, exercises: 8, minTypes: 3 };

export const KNOWN_TYPES = new Set([
  'meaning_choice', 'term_choice', 'kanji_choice', 'image_choice', 'match_pairs', 'match_pairs_audio',
  'listen_choose', 'listen_type', 'typed_term', 'tile_build', 'missing_word', 'order_steps',
  'true_false', 'scenario', 'technique_decoder', 'story',
]);

/** Types whose correct answer is one of the options. */
const CHOICE_TYPES = new Set([
  'meaning_choice', 'term_choice', 'kanji_choice', 'image_choice', 'listen_choose', 'missing_word',
  'scenario', 'technique_decoder',
]);
const PAIR_TYPES = new Set(['match_pairs', 'match_pairs_audio']);
/** Field each type needs as its stimulus. */
const REQUIRED_FIELD: Record<string, string> = {
  meaning_choice: 'jpText', term_choice: 'frText', kanji_choice: 'kanji', image_choice: 'jpText',
  listen_choose: 'audioText', listen_type: 'audioText', typed_term: 'frText', tile_build: 'frText',
  true_false: 'statement',
};

const SOURCE_TYPES = new Set(['officiel', 'aikikai', 'federation', 'ouvrage', 'web', 'relecture']);
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

export class Report {
  issues: Issue[] = [];
  error(code: string, where: string, message: string) { this.issues.push({ level: 'error', code, where, message }); }
  warn(code: string, where: string, message: string) { this.issues.push({ level: 'warning', code, where, message }); }
  /** Error, or warning when the unit is still a draft. */
  strict(draft: boolean, code: string, where: string, message: string) { (draft ? this.warn : this.error).call(this, code, where, message); }
  get errors() { return this.issues.filter(i => i.level === 'error'); }
  get warnings() { return this.issues.filter(i => i.level === 'warning'); }
}

const asArray = (v: unknown): string[] => (Array.isArray(v) ? v.map(String) : v == null ? [] : [String(v)]);
const dateStr = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? ''));

export function checkSources(r: Report, where: string, sources: unknown) {
  const list = Array.isArray(sources) ? sources : sources && typeof sources === 'object' ? [sources] : [];
  if (!list.length) {
    r.error('source-manquante', where, 'aucune source citée');
    return;
  }
  list.forEach((s: any, i: number) => {
    if (!SOURCE_TYPES.has(s?.type)) r.error('source-invalide', where, `source ${i + 1} : type « ${s?.type} » inconnu`);
    if (!s?.ref) r.error('source-invalide', where, `source ${i + 1} : champ ref vide`);
    if (!DATE.test(dateStr(s?.consulte))) {
      r.error('source-invalide', where, `source ${i + 1} : date de consultation (consulte: AAAA-MM-JJ) manquante`);
    }
  });
}

type Images = ReturnType<typeof loadImageManifest>;

function checkImage(r: Report, images: Images, where: string, id: unknown) {
  if (id == null) return;
  if (!images.entries[String(id)]) r.error('image-inconnue', where, `image « ${id} » absente du catalogue docs/images/manifest.yaml`);
}

export function checkExercise(r: Report, ex: any, where: string, images: Images) {
  const w = `${where} ${ex?.id ?? '?'}`;
  if (!ex?.id) r.error('schema', where, 'exercice sans id');
  else if (!KEBAB.test(ex.id)) r.error('identifiant', w, `identifiant « ${ex.id} » mal formé (minuscules, chiffres et tirets)`);
  if (!KNOWN_TYPES.has(ex?.type)) r.error('type-inconnu', w, `type « ${ex?.type} » absent du catalogue`);
  if (!ex?.prompt) r.error('schema', w, 'consigne (prompt) manquante');
  if (ex?.correctAnswer == null || (Array.isArray(ex.correctAnswer) && !ex.correctAnswer.length)) {
    r.error('schema', w, 'réponse attendue (correctAnswer) manquante');
  }
  checkSources(r, w, ex?.sources);
  const field = REQUIRED_FIELD[ex?.type];
  if (field && !ex[field]) r.error('schema', w, `champ ${field} manquant pour le type ${ex.type}`);

  const opts: string[] = (ex.options ?? []).map((o: any) => answerKey(String(o?.text ?? '')));
  for (const o of ex.options ?? []) {
    if (o?.illustration) {
      checkImage(r, images, `${w} option ${o.id}`, o.illustration.image);
      if (!o.illustration.alt) r.error('illustration', w, `option ${o.id} : texte alternatif (alt) manquant`);
      if (!o.illustration.emoji && !o.illustration.image) r.error('illustration', w, `option ${o.id} : ni emoji ni image`);
    }
  }

  if (CHOICE_TYPES.has(ex.type)) {
    if (opts.length < 2) r.error('options', w, 'moins de 2 options');
    const answers = [...asArray(ex.correctAnswer), ...asArray(ex.acceptedAnswers)].map(answerKey);
    if (!answers.some(a => opts.includes(a))) {
      r.error('reponse-hors-options', w, `la réponse « ${asArray(ex.correctAnswer)[0]} » n'est pas parmi les options`);
    }
    const dup = opts.filter((o, i) => opts.indexOf(o) !== i);
    if (dup.length) r.error('options', w, `option en double : « ${dup[0]} »`);
  }

  switch (ex.type) {
    case 'image_choice':
      for (const o of ex.options ?? []) if (!o?.illustration) r.error('illustration', w, `option ${o?.id} sans illustration`);
      break;
    case 'missing_word':
      if (!/_{2,}/.test(String(ex.frText ?? ex.jpText ?? ''))) r.error('schema', w, 'la phrase (frText) doit contenir ___');
      break;
    case 'scenario':
      if (!ex.frText && !(ex.dialogue ?? []).length) r.error('schema', w, 'scenario : frText ou dialogue requis');
      break;
    case 'technique_decoder': {
      const d = ex.decomposition;
      if (!d?.attaque || !d?.technique) r.error('decomposition', w, 'decomposition { attaque, technique, variante? } incomplète');
      else if (!ex.jpText) r.error('schema', w, 'champ jpText (appel de la technique) manquant');
      else {
        const full = answerKey(ex.jpText);
        for (const part of [d.attaque, d.technique, d.variante].filter(Boolean)) {
          if (!full.includes(answerKey(part))) r.warn('decomposition', w, `« ${part} » n'apparaît pas dans l'appel « ${ex.jpText} »`);
        }
      }
      break;
    }
    case 'tile_build': {
      if (!Array.isArray(ex.correctAnswer)) r.error('tuiles', w, 'correctAnswer doit être une liste de tuiles');
      const pool = asArray(ex.wordBank);
      for (const tile of asArray(ex.correctAnswer)) {
        const i = pool.indexOf(tile);
        if (i < 0) r.error('banque-incomplete', w, `la tuile « ${tile} » manque dans la banque de mots`);
        else pool.splice(i, 1);
      }
      break;
    }
    case 'match_pairs':
    case 'match_pairs_audio': {
      const pairs = ex.pairs ?? [];
      if (pairs.length < 3) r.error('paires', w, 'au moins 3 paires attendues');
      for (const k of ['jp', 'fr'] as const) {
        const list = pairs.map((p: any) => answerKey(String(p?.[k] ?? '')));
        if (list.some((x: string) => !x)) r.error('paires', w, `paire sans texte ${k}`);
        if (new Set(list).size !== list.length) r.error('paires', w, `deux paires ont le même texte ${k}`);
      }
      if (ex.correctAnswer !== 'pairs') r.warn('paires', w, 'correctAnswer devrait valoir « pairs »');
      break;
    }
    case 'order_steps': {
      const steps = asArray(ex.steps);
      if (steps.length < 3) r.error('etapes', w, 'au moins 3 étapes attendues');
      if (new Set(steps.map(answerKey)).size !== steps.length) r.error('etapes', w, 'deux étapes identiques : ordre ambigu');
      const ca = ex.correctAnswer;
      if (!(ca === 'steps' || (Array.isArray(ca) && ca.length === steps.length && ca.every((s: string, i: number) => s === steps[i])))) {
        r.error('etapes', w, 'correctAnswer doit valoir « steps » (ou reprendre steps dans le même ordre)');
      }
      break;
    }
    case 'true_false':
      if (!['vrai', 'faux'].includes(String(ex.correctAnswer).toLowerCase())) r.error('vrai-faux', w, 'correctAnswer doit valoir « vrai » ou « faux »');
      break;
    case 'story': {
      const lines = ex.dialogue ?? [];
      const qs = ex.storyQuestions ?? [];
      if (!lines.length) r.error('story', w, 'récit (dialogue) vide');
      if (!qs.length) r.error('story', w, 'aucune question (storyQuestions)');
      qs.forEach((q: any, i: number) => {
        const qo = (q.options ?? []).map((o: any) => answerKey(String(o?.text ?? '')));
        if (!qo.includes(answerKey(String(q.correctAnswer ?? '')))) r.error('reponse-hors-options', w, `question ${i + 1} : réponse absente des options`);
        if (!(q.afterLine >= 1 && q.afterLine <= lines.length)) r.error('story', w, `question ${i + 1} : afterLine hors du récit`);
      });
      break;
    }
  }
}

function checkLesson(r: Report, lesson: any, where: string, index: number, contentDir: string, images: Images, draft: boolean) {
  const w = `${where} ${lesson?.id ?? '?'}`;
  for (const f of ['id', 'title', 'exercises']) if (lesson?.[f] == null) r.error('schema', w, `champ ${f} manquant`);
  const exercises: any[] = lesson.exercises ?? [];
  const ids = new Set<string>();
  for (const ex of exercises) {
    if (ex?.id && ids.has(ex.id)) r.error('identifiant', w, `identifiant d'exercice en double : ${ex.id}`);
    ids.add(ex?.id);
    checkExercise(r, ex, w, images);
  }
  if (exercises.length !== VOLUMES.exercises) r.strict(draft, 'volume', w, `${exercises.length} exercice(s) au lieu de ${VOLUMES.exercises}`);
  const types = new Set(exercises.map(e => e?.type));
  if (exercises.length && types.size < VOLUMES.minTypes) r.error('types', w, `${types.size} type(s) d'exercice, au moins ${VOLUMES.minTypes} attendus`);
  if (index === VOLUMES.lessons - 1 && lesson.isReview !== true) r.error('revision', w, `la leçon ${VOLUMES.lessons} doit être une révision (isReview: true)`);
  if (index !== VOLUMES.lessons - 1 && lesson.isReview === true) r.warn('revision', w, `seule la leçon ${VOLUMES.lessons} est une révision`);
  if (!lesson.research) r.error('recherche', w, 'fiche de recherche (research) manquante');
  else if (!existsSync(join(contentDir, lesson.research))) r.error('recherche', w, `fiche de recherche introuvable : content/${lesson.research}`);
  if (!lesson.intro) r.strict(draft, 'apport', w, 'intro (termes, note) manquante');
  else {
    if (!(lesson.intro.termes ?? []).length) r.strict(draft, 'apport', w, 'intro.termes vide');
    if (!lesson.intro.note?.titre || !lesson.intro.note?.texte) r.strict(draft, 'apport', w, 'intro.note incomplète');
    if (lesson.intro.culture) checkSources(r, `${w} (culture)`, lesson.intro.culture.sources);
    for (const t of lesson.intro.termes ?? []) {
      if (t?.kanji && !t?.source) {
        r.error('kanji-sans-source', `${w} (terme ${t?.jp ?? '?'})`, `le kanji « ${t.kanji} » n'a aucune source`);
      }
      if (t?.source) checkSources(r, `${w} (terme ${t.jp})`, [t.source]);
      if (t?.illustration) {
        checkImage(r, images, `${w} (terme ${t.jp ?? '?'})`, t.illustration.image);
        if (!t.illustration.alt) r.error('illustration', w, `terme ${t.jp ?? '?'}: texte alternatif (alt) manquant`);
        if (!t.illustration.emoji && !t.illustration.image) r.error('illustration', w, `terme ${t.jp ?? '?'}: ni emoji ni image`);
      }
    }
  }
  const a = lesson.auteur, v = lesson.verification;
  if (v) {
    for (const f of ['date', 'verificateur', 'session']) if (!v[f]) r.error('verification', w, `verification.${f} manquant`);
    if (a?.session && v.session && a.session === v.session) r.error('verification', w, 'vérification non indépendante : même session que la rédaction');
    for (const e of v.ecarts ?? []) {
      if (e?.statut === 'ouvert') r.strict(draft, 'verification', w, `écart ouvert : ${e.constat ?? e.description ?? ''}`);
    }
  }
}

export function validate(opts: ValidateOptions = {}): Report {
  const contentDir = opts.contentDir ?? join(ROOT, 'content');
  const content = loadContent(contentDir);
  const images = loadImageManifest(opts.manifestPath);
  const r = new Report();
  const levels = opts.levels ?? [...LEVELS];

  const seenUnits = new Set<string>();
  const seenLessons = new Set<string>();
  for (const level of levels) {
    const units = content.levels[level] ?? [];
    if (!units.length) {
      r.warn('niveau-vide', level, 'aucune unité pour ce niveau');
      continue;
    }
    const levelDraft = units.every((u: any) => (u.review?.statut ?? 'brouillon') === 'brouillon');
    if (units.length !== VOLUMES.units) r.strict(levelDraft, 'volume', level, `${units.length} unité(s) au lieu de ${VOLUMES.units}`);
    const ref = content.referentiels[level] as any;
    if (!ref) r.warn('referentiel', level, `aucun référentiel (content/referentiel/${REFERENTIEL_FILES[level]})`);
    else if (Array.isArray(ref.lexique)) {
      for (const t of ref.lexique) {
        if (t?.kanji && !t?.source) {
          r.error('kanji-sans-source', `${level} lexique ${t.romaji ?? '?'}`, `le kanji « ${t.kanji} » n'a aucune source`);
        }
      }
    }

    for (const unit of units) {
      const w = `${level} ${unit.id ?? '?'}`;
      const statut = unit.review?.statut ?? 'brouillon';
      const draft = statut === 'brouillon';
      if (statut === 'publie' && (!ref || ref.etat === 'a-completer')) {
        r.error('referentiel-incomplet', w, `l'unité est « publie » mais le référentiel du niveau ${level} est ${ref ? '« a-completer »' : 'absent'}`);
      }
      for (const f of ['id', 'level', 'unitNumber', 'title', 'lessons']) if (unit[f] == null) r.error('schema', w, `champ ${f} manquant`);
      if (unit.level && unit.level !== level) r.error('schema', w, `niveau « ${unit.level} » rangé dans le dossier ${level.toLowerCase()}`);
      const expectedId = `${level.toLowerCase()}-u${unit.unitNumber}`;
      if (unit.id && unit.id !== expectedId) r.error('identifiant', w, `identifiant attendu : ${expectedId}`);
      if (seenUnits.has(unit.id)) r.error('identifiant', w, "identifiant d'unité en double");
      seenUnits.add(unit.id);
      if (!['brouillon', 'relu', 'publie'].includes(statut)) r.error('relecture', w, `statut de relecture inconnu : ${statut}`);
      if (!draft) {
        for (const f of ['relecteur', 'qualification', 'date']) if (!unit.review?.[f]) r.error('relecture', w, `review.${f} requis pour une unité « ${statut} »`);
      }
      if (unit.cover != null) checkImage(r, images, `${w} (cover)`, `covers/${unit.cover}`);
      const lessons: any[] = unit.lessons ?? [];
      if (lessons.length !== VOLUMES.lessons) r.strict(draft, 'volume', w, `${lessons.length} leçon(s) au lieu de ${VOLUMES.lessons}`);
      lessons.forEach((lesson, i) => {
        if (seenLessons.has(lesson?.id)) r.error('identifiant', w, `identifiant de leçon en double : ${lesson.id}`);
        seenLessons.add(lesson?.id);
        const expected = `${expectedId}-l${i + 1}`;
        if (lesson?.id && lesson.id !== expected) r.error('identifiant', w, `leçon ${i + 1} : identifiant attendu ${expected}, trouvé ${lesson.id}`);
        checkLesson(r, lesson, w, i, contentDir, images, draft);
      });
    }
  }

  if (!opts.levels) {
    const demo: any = content.demo;
    if (demo) for (const ex of demo.exercises ?? []) checkExercise(r, ex, 'démonstration', images);
    if (opts.fixture ?? !opts.contentDir) {
      const fx: any = loadFixtureDemo();
      for (const ex of fx?.exercises ?? []) checkExercise(r, ex, 'fixture', images);
    }

    const lexIds = new Set<string>();
    for (const e of content.lexique as any[]) {
      const w = `lexique ${e.id ?? e.romaji ?? '?'}`;
      for (const f of ['id', 'romaji', 'sens', 'categorie']) if (!e[f]) r.error('schema', w, `champ ${f} manquant`);
      if (e.id && lexIds.has(e.id)) r.error('identifiant', w, 'identifiant en double');
      lexIds.add(e.id);
      checkSources(r, w, e.source ?? e.sources);
      if (e.kanji && !(e.source ?? e.sources)) {
        r.error('kanji-sans-source', w, `le kanji « ${e.kanji} » n'a aucune source`);
      }
      if (e.illustration) checkImage(r, images, w, e.illustration.image);
    }
    const etiIds = new Set<string>();
    for (const e of content.etiquette as any[]) {
      const w = `étiquette ${e.id ?? '?'}`;
      for (const f of ['id', 'titre', 'pourquoi']) if (!e[f]) r.error('schema', w, `champ ${f} manquant`);
      if (!Array.isArray(e.etapes) || !e.etapes.length) r.error('schema', w, 'etapes vide');
      if (e.id && etiIds.has(e.id)) r.error('identifiant', w, 'identifiant en double');
      etiIds.add(e.id);
      checkSources(r, w, e.source ?? e.sources);
    }
    for (const x of content.examen as any[]) {
      const w = `examen ${x.level ?? '?'}`;
      if (!LEVELS.includes(x.level)) r.error('schema', w, `niveau inconnu « ${x.level} »`);
      if (!Array.isArray(x.epreuves) || !x.epreuves.length) r.error('schema', w, 'aucune épreuve');
      (x.epreuves ?? []).forEach((ep: any, i: number) => {
        for (const f of ['categorie', 'appel', 'attaque', 'technique']) if (!ep?.[f]) r.error('schema', `${w} épreuve ${i + 1}`, `champ ${f} manquant`);
      });
      checkSources(r, w, x.sources);
    }
  }
  return r;
}

function main() {
  const args = process.argv.slice(2);
  const li = args.indexOf('--level');
  const levels = li >= 0 ? [args[li + 1].toUpperCase()] : undefined;
  const r = validate({ levels });
  if (args.includes('--json')) {
    console.log(JSON.stringify(r.issues, null, 1));
  } else {
    for (const i of r.issues) console.log(`${i.level === 'error' ? 'ERREUR ' : 'alerte '} [${i.code}] ${i.where} : ${i.message}`);
    const byCode = new Map<string, number>();
    for (const i of r.errors) byCode.set(i.code, (byCode.get(i.code) ?? 0) + 1);
    console.log(`\n${r.errors.length} erreur(s), ${r.warnings.length} alerte(s)` +
      (byCode.size ? ` — ${[...byCode].map(([c, n]) => `${c}: ${n}`).join(', ')}` : ''));
  }
  process.exit(r.errors.length ? 1 : 0);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
