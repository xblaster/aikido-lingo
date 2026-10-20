import type { LexiqueEntry, EtiquetteCard, ExamLevel, HistoireFait } from '@/types/curriculum';
import lexique from './generated/lexique.json';
import etiquette from './generated/etiquette.json';
import examen from './generated/examen.json';
import histoire from './generated/histoire.json';

/** content/lexique.yaml (empty list while the file is missing). */
export const LEXIQUE = (lexique ?? []) as unknown as LexiqueEntry[];
/** content/etiquette.yaml */
export const ETIQUETTE = (etiquette ?? []) as unknown as EtiquetteCard[];
/** content/examen.yaml */
export const EXAMEN = (examen ?? []) as unknown as ExamLevel[];
/** content/referentiel/histoire.yaml */
export const HISTOIRE = (histoire ?? []) as unknown as HistoireFait[];
