import type { Level, Unit, Lesson, LevelReferential, ReviewStatus } from '@/types/curriculum';
import { LEVELS } from '@/types/curriculum';
import curriculum from './generated/curriculum.json';
import referentiels from './generated/referentiels.json';

export interface LevelMeta {
  /** Short label: "6e kyu". */
  name: string;
  /** Japanese reading: "Rokkyū". */
  jpName: string;
  tagline: string;
  /** Tailwind classes. */
  color: string;
  badgeColor: string;
  description: string;
  /** Badge image of the catalogue (docs/images/manifest.yaml). */
  badge: string;
}

/** Grade metadata (labels only: the programme itself comes from content/referentiel/). */
export const LEVEL_METADATA: Record<Level, LevelMeta> = {
  '6K': {
    name: '6e kyu',
    jpName: 'Rokkyū',
    tagline: 'Premiers pas sur le tatami',
    color: 'bg-slate-500',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    description: "Le dojo, le salut, les postures, les chutes et les premières attaques.",
    badge: 'badges/6k',
  },
  '5K': {
    name: '5e kyu',
    jpName: 'Gokyū',
    tagline: 'Les bases se posent',
    color: 'bg-sky-600',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
    description: "Saisies et frappes de base, premières immobilisations et projections.",
    badge: 'badges/5k',
  },
  '4K': {
    name: '4e kyu',
    jpName: 'Yonkyū',
    tagline: 'Élargir le répertoire',
    color: 'bg-emerald-600',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: "Nouvelles attaques, travail à genoux et formes omote / ura.",
    badge: 'badges/4k',
  },
  '3K': {
    name: '3e kyu',
    jpName: 'Sankyū',
    tagline: 'Fluidité et précision',
    color: 'bg-amber-600',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    description: "Saisies arrière, enchaînements et vocabulaire plus riche.",
    badge: 'badges/3k',
  },
  '1K': {
    name: '2e – 1er kyu',
    jpName: 'Nikyū – Ikkyū',
    tagline: 'Vers la ceinture noire',
    color: 'bg-aiki-shu',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
    description: "Programme complet des kyu, premières armes et préparation au shodan.",
    badge: 'badges/1k',
  },
  SHODAN: {
    name: 'Shodan',
    jpName: 'Shodan',
    tagline: 'Premier dan : un commencement',
    color: 'bg-aiki-ai',
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    description: "Le programme du 1er dan : techniques, armes, randori et attitude.",
    badge: 'badges/shodan',
  },
};

/** Source: content/niveaux/<niveau>/*.yaml (npm run content:build). */
export const ALL_UNITS_BY_LEVEL = curriculum as unknown as Record<Level, Unit[]>;

/** Source: content/referentiel/<niveau>.yaml. */
export function getReferential(level: Level): LevelReferential | undefined {
  return (referentiels as unknown as Partial<Record<Level, LevelReferential>>)[level];
}

/** Least advanced review status of the level's units ('vide' when it has none). */
export function getLevelStatus(level: Level): ReviewStatus | 'vide' {
  const units = getUnitsForLevel(level);
  if (!units.length) return 'vide';
  const order: ReviewStatus[] = ['brouillon', 'relu', 'publie'];
  return units.map(u => u.review?.statut ?? 'brouillon').reduce((a, b) => (order.indexOf(a) <= order.indexOf(b) ? a : b));
}

export function getUnitsForLevel(level: Level): Unit[] {
  return ALL_UNITS_BY_LEVEL[level] || [];
}

export function findLessonById(lessonId: string): { unit: Unit; lesson: Lesson } | null {
  for (const level of LEVELS) {
    for (const unit of getUnitsForLevel(level)) {
      const lesson = unit.lessons.find(l => l.id === lessonId);
      if (lesson) return { unit, lesson };
    }
  }
  return null;
}
