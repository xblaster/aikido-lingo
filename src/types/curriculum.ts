/**
 * Data model of Aikido Lingo — mirrors docs/contrat.md (shared data contract).
 * Content is written in YAML under content/ and compiled to JSON by scripts/build-content.mts.
 */

/** Grades, in order: 6e kyu, 5e kyu, 4e kyu, 3e kyu, 2e–1er kyu, 1er dan. */
export type Level = '6K' | '5K' | '4K' | '3K' | '1K' | 'SHODAN';

export const LEVELS: Level[] = ['6K', '5K', '4K', '3K', '1K', 'SHODAN'];

/** Referential file of each level (content/referentiel/<file>.yaml). */
export const REFERENTIEL_FILES: Record<Level, string> = {
  '6K': '6k.yaml',
  '5K': '5k.yaml',
  '4K': '4k.yaml',
  '3K': '3k.yaml',
  '1K': '2k-1k.yaml',
  SHODAN: 'shodan.yaml',
};

/** Exercise catalogue (16 types, docs/contrat.md « Catalogue des types »). */
export const EXERCISE_TYPES = [
  'meaning_choice',
  'term_choice',
  'kanji_choice',
  'image_choice',
  'match_pairs',
  'match_pairs_audio',
  'listen_choose',
  'listen_type',
  'typed_term',
  'tile_build',
  'missing_word',
  'order_steps',
  'true_false',
  'scenario',
  'technique_decoder',
  'story',
] as const;

export type CatalogueExerciseType = (typeof EXERCISE_TYPES)[number];
export type ExerciseType = CatalogueExerciseType;

export type SourceType = 'officiel' | 'aikikai' | 'federation' | 'ouvrage' | 'web' | 'relecture';

export const SOURCE_TYPES: SourceType[] = ['officiel', 'aikikai', 'federation', 'ouvrage', 'web', 'relecture'];

export interface Source {
  type: SourceType;
  ref: string;
  url?: string;
  page?: string;
  /** Date de consultation, AAAA-MM-JJ. */
  consulte: string;
}

/** A picture: an emoji (or an image of public/), always with a text alternative. */
export interface Illustration {
  /** Catalogue id "<famille>/<id>" (docs/images/manifest.yaml). */
  image?: string;
  emoji?: string;
  alt: string;
}

export interface ExerciseOption {
  id: string;
  text: string;
  translation?: string;
  illustration?: Illustration;
}

export interface PairItem {
  jp: string;
  fr: string;
}

export interface DialogueLine {
  speaker: string;
  text: string;
  /** Line the learner must supply (scenario). */
  missing?: boolean;
}

export interface StoryQuestion {
  /** Index of the line after which the question appears. */
  afterLine: number;
  prompt: string;
  options: ExerciseOption[];
  correctAnswer: string;
}

/** technique_decoder: the parts of a technique name. */
export interface Decomposition {
  attaque: string;
  technique: string;
  variante?: string;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  /** Consigne, en français. */
  prompt: string;
  /** Japanese term in romaji. */
  jpText?: string;
  kanji?: string;
  frText?: string;
  /** Romaji/Japanese read by speech synthesis (ja-JP). */
  audioText?: string;
  explanation?: string;
  options?: ExerciseOption[];
  correctAnswer: string | string[];
  acceptedAnswers?: string[];
  wordBank?: string[];
  pairs?: PairItem[];
  /** order_steps: the steps in the right order (the UI shuffles them). */
  steps?: string[];
  dialogue?: DialogueLine[];
  storyQuestions?: StoryQuestion[];
  /** true_false. */
  statement?: string;
  decomposition?: Decomposition;
  sources: Source[];
}

export interface IntroTerm {
  jp: string;
  kanji?: string;
  fr: string;
  note?: string;
  source?: Source;
  /** Situation picture (catalogue family scenes); by default the scene whose id is the term (Seiza -> scenes/seiza). */
  illustration?: Illustration;
}

export interface LessonIntro {
  termes: IntroTerm[];
  note: { titre: string; texte: string };
  points?: string[];
  culture?: { titre: string; texte: string; sources: Source[] };
}

export interface Lesson {
  id: string;
  title: string;
  /** Emblematic Japanese term (romaji). */
  subtitle: string;
  description: string;
  icon: string;
  xpReward: number;
  /** Key notion of the lesson. */
  focus: string;
  isReview?: boolean;
  /** Research sheet, relative to content/. */
  research?: string;
  auteur?: { session: string; date: string };
  verification?: Verification;
  intro?: LessonIntro;
  exercises: Exercise[];
}

export type ReviewStatus = 'brouillon' | 'relu' | 'publie';

export interface Review {
  statut: ReviewStatus;
  relecteur?: string;
  /** Required for relu / publie (e.g. teaching diploma, grade). */
  qualification?: string;
  date?: string;
}

export interface Verification {
  date: string;
  verificateur: string;
  /** Must differ from auteur.session. */
  session: string;
  ecarts: { exercice?: string; constat: string; correction?: string; statut: 'ouvert' | 'corrige' }[];
}

export interface Unit {
  id: string;
  level: Level;
  unitNumber: number;
  title: string;
  jpTitle: string;
  description: string;
  themeColor: string;
  icon: string;
  review?: Review;
  /** Cover image id (catalogue family covers). */
  cover?: string;
  referentiel?: { ref: string; url?: string };
  lessons: Lesson[];
}

/**
 * Level referential (content/referentiel/<niv>.yaml), written by the research agent.
 * Its exact shape is open: only the fields the UI shows are typed.
 */
export interface LevelReferential {
  level?: string;
  nom?: string;
  titre?: string;
  description?: string;
  referencePrincipale?: string;
  referentielPrincipal?: string;
  etat?: 'complet' | 'a-completer';
  variantes?: Array<{ referentiel?: string; source?: Source; [key: string]: unknown } | string>;
  prerequis?: Array<{ referentiel?: string; texte?: string; source?: string } | string>;
  programmeOfficiel?: Array<{ categorie?: string; attaque?: string | null; techniques?: string[]; prioritaires?: string[]; source?: Source }>;
  competences?: string[];
  criteresEvaluation?: string[];
  objectifs?: string[];
  themes?: string[];
  sources?: Source[];
  [key: string]: unknown;
}

/** content/lexique.yaml */
export interface LexiqueEntry {
  id: string;
  romaji: string;
  kanji?: string;
  kana?: string;
  sens: string;
  categorie: string;
  note?: string;
  source?: Source;
  /** Optional picture (catalogue image + fallback emoji). */
  illustration?: Illustration;
}

/** content/etiquette.yaml */
export interface EtiquetteCard {
  id: string;
  titre: string;
  jp?: string;
  etapes: string[];
  pourquoi: string;
  source?: Source;
}

/** content/examen.yaml */
export interface ExamEpreuve {
  categorie: string;
  /** What the jury calls, e.g. "Ai hanmi katate dori ikkyo". */
  appel: string;
  attaque: string;
  technique: string;
  variante?: string;
  conseils?: string[];
}

export interface ExamLevel {
  level: Level;
  dureeAppel?: number;
  epreuves: ExamEpreuve[];
  criteres: string[];
  sources?: Source[];
}

/** content/referentiel/histoire.yaml */
export interface HistoireFait {
  fait: string;
  date?: string;
  source: string;
  sourceUnique?: boolean;
}
