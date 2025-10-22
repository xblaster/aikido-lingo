/**
 * Black and White Icon System for Aikido Lingo
 * ALL icons use ONLY black color (#000000) for consistency and clarity
 */

import { IconData } from '../../types'

// Black color constant
const BLACK = '#000000'

/**
 * ETIQUETTE & DOJO CULTURE
 */
export const etiquetteIcons: Record<string, IconData> = {
  rei: {
    type: 'lucide',
    iconName: 'UserCircle',
    color: BLACK,
    strokeWidth: 2,
  },
  seiza: {
    type: 'emoji',
    emoji: '🧎',
  },
  dojo: {
    type: 'lucide',
    iconName: 'Home',
    color: BLACK,
    strokeWidth: 2,
  },
  sensei: {
    type: 'lucide',
    iconName: 'GraduationCap',
    color: BLACK,
    strokeWidth: 2,
  },
  uke: {
    type: 'lucide',
    iconName: 'UserMinus',
    color: BLACK,
    strokeWidth: 2,
  },
  tori: {
    type: 'lucide',
    iconName: 'UserPlus',
    color: BLACK,
    strokeWidth: 2,
  },
  tatami: {
    type: 'lucide',
    iconName: 'Grid3x3',
    color: BLACK,
    strokeWidth: 2,
  },
  onegaishimasu: {
    type: 'lucide',
    iconName: 'HandHeart',
    color: BLACK,
    strokeWidth: 2,
  },
  arigatou: {
    type: 'lucide',
    iconName: 'Heart',
    color: BLACK,
    strokeWidth: 2,
  },
  kamiza: {
    type: 'lucide',
    iconName: 'Landmark',
    color: BLACK,
    strokeWidth: 2,
  },
}

/**
 * POSITIONS & STANCES (KAMAE)
 */
export const positionsIcons: Record<string, IconData> = {
  shizentai: {
    type: 'emoji',
    emoji: '🧍',
  },
  kamae: {
    type: 'lucide',
    iconName: 'Shield',
    color: BLACK,
    strokeWidth: 2,
  },
  hanmi: {
    type: 'lucide',
    iconName: 'Triangle',
    color: BLACK,
    strokeWidth: 2,
  },
  migihanmi: {
    type: 'lucide',
    iconName: 'ChevronRight',
    color: BLACK,
    strokeWidth: 2,
  },
  hidarihanmi: {
    type: 'lucide',
    iconName: 'ChevronLeft',
    color: BLACK,
    strokeWidth: 2,
  },
  gyakuhanmi: {
    type: 'lucide',
    iconName: 'Repeat',
    color: BLACK,
    strokeWidth: 2,
  },
  aihanmi: {
    type: 'lucide',
    iconName: 'Equal',
    color: BLACK,
    strokeWidth: 2,
  },
  shikko: {
    type: 'lucide',
    iconName: 'MoveHorizontal',
    color: BLACK,
    strokeWidth: 2,
  },
  suwariwaza: {
    type: 'lucide',
    iconName: 'User',
    color: BLACK,
    strokeWidth: 2,
  },
  tachiwaza: {
    type: 'emoji',
    emoji: '🧍',
  },
  hanzahandachi: {
    type: 'lucide',
    iconName: 'Users',
    color: BLACK,
    strokeWidth: 2,
  },
}

/**
 * MOVEMENTS (TAI SABAKI)
 */
export const movementsIcons: Record<string, IconData> = {
  tenkan: {
    type: 'lucide',
    iconName: 'RotateCw',
    color: BLACK,
    strokeWidth: 2,
  },
  irimi: {
    type: 'lucide',
    iconName: 'MoveRight',
    color: BLACK,
    strokeWidth: 2,
  },
  ayumiashi: {
    type: 'lucide',
    iconName: 'FootprintsIcon',
    color: BLACK,
    strokeWidth: 2,
  },
  tsugiashi: {
    type: 'lucide',
    iconName: 'MoveVertical',
    color: BLACK,
    strokeWidth: 2,
  },
  maai: {
    type: 'lucide',
    iconName: 'Ruler',
    color: BLACK,
    strokeWidth: 2,
  },
  issokuittou: {
    type: 'lucide',
    iconName: 'Swords',
    color: BLACK,
    strokeWidth: 2,
  },
  toma: {
    type: 'lucide',
    iconName: 'MoveUpRight',
    color: BLACK,
    strokeWidth: 2,
  },
  chikama: {
    type: 'lucide',
    iconName: 'MoveDownLeft',
    color: BLACK,
    strokeWidth: 2,
  },
  taisabaki: {
    type: 'lucide',
    iconName: 'Shuffle',
    color: BLACK,
    strokeWidth: 2,
  },
  happogiri: {
    type: 'lucide',
    iconName: 'Compass',
    color: BLACK,
    strokeWidth: 2,
  },
}

/**
 * UKEMI (FALLS & ROLLS)
 */
export const ukemiIcons: Record<string, IconData> = {
  ukemi: {
    type: 'lucide',
    iconName: 'Undo2',
    color: BLACK,
    strokeWidth: 2,
  },
  maeukemi: {
    type: 'lucide',
    iconName: 'ArrowDownCircle',
    color: BLACK,
    strokeWidth: 2,
  },
  ushiroukemi: {
    type: 'lucide',
    iconName: 'ArrowUpCircle',
    color: BLACK,
    strokeWidth: 2,
  },
  yokoukemi: {
    type: 'lucide',
    iconName: 'ArrowRightCircle',
    color: BLACK,
    strokeWidth: 2,
  },
  zempokaiten: {
    type: 'lucide',
    iconName: 'RotateCcw',
    color: BLACK,
    strokeWidth: 2,
  },
  kohotento: {
    type: 'lucide',
    iconName: 'RotateCcwSquare',
    color: BLACK,
    strokeWidth: 2,
  },
  shomen: {
    type: 'lucide',
    iconName: 'ChevronsDown',
    color: BLACK,
    strokeWidth: 2,
  },
  yokomen: {
    type: 'lucide',
    iconName: 'ChevronsRight',
    color: BLACK,
    strokeWidth: 2,
  },
  tobiukemi: {
    type: 'lucide',
    iconName: 'Plane',
    color: BLACK,
    strokeWidth: 2,
  },
}

/**
 * TECHNIQUES (WAZA) - PINS & CONTROLS
 */
export const techniquesIcons: Record<string, IconData> = {
  ikkyo: {
    type: 'lucide',
    iconName: 'CircleDot',
    color: BLACK,
    strokeWidth: 2,
  },
  nikyo: {
    type: 'lucide',
    iconName: 'Circle',
    color: BLACK,
    strokeWidth: 2,
  },
  sankyo: {
    type: 'lucide',
    iconName: 'Hexagon',
    color: BLACK,
    strokeWidth: 2,
  },
  yonkyo: {
    type: 'lucide',
    iconName: 'Square',
    color: BLACK,
    strokeWidth: 2,
  },
  gokyo: {
    type: 'lucide',
    iconName: 'Pentagon',
    color: BLACK,
    strokeWidth: 2,
  },
  shihonage: {
    type: 'lucide',
    iconName: 'Compass',
    color: BLACK,
    strokeWidth: 2,
  },
  kotegaeshi: {
    type: 'lucide',
    iconName: 'RotateCcw',
    color: BLACK,
    strokeWidth: 2,
  },
  kaitennage: {
    type: 'lucide',
    iconName: 'RefreshCw',
    color: BLACK,
    strokeWidth: 2,
  },
  iriminage: {
    type: 'lucide',
    iconName: 'MoveRight',
    color: BLACK,
    strokeWidth: 2,
  },
  tenchinage: {
    type: 'lucide',
    iconName: 'ArrowUpDown',
    color: BLACK,
    strokeWidth: 2,
  },
  kokyunage: {
    type: 'lucide',
    iconName: 'Wind',
    color: BLACK,
    strokeWidth: 2,
  },
  suminotoshi: {
    type: 'lucide',
    iconName: 'TrendingDown',
    color: BLACK,
    strokeWidth: 2,
  },
  koshinage: {
    type: 'lucide',
    iconName: 'MoveUp',
    color: BLACK,
    strokeWidth: 2,
  },
}

/**
 * GRIPS & ATTACKS (TORI & KAKE)
 */
export const gripsIcons: Record<string, IconData> = {
  katatedori: {
    type: 'lucide',
    iconName: 'Hand',
    color: BLACK,
    strokeWidth: 2,
  },
  ryotedori: {
    type: 'lucide',
    iconName: 'Grip',
    color: BLACK,
    strokeWidth: 2,
  },
  katatedoriryotedori: {
    type: 'lucide',
    iconName: 'HandMetal',
    color: BLACK,
    strokeWidth: 2,
  },
  katadori: {
    type: 'lucide',
    iconName: 'UserCircle',
    color: BLACK,
    strokeWidth: 2,
  },
  shomenuchi: {
    type: 'lucide',
    iconName: 'ChevronsDown',
    color: BLACK,
    strokeWidth: 2,
  },
  yokomenuchi: {
    type: 'lucide',
    iconName: 'ChevronsRight',
    color: BLACK,
    strokeWidth: 2,
  },
  munetsuki: {
    type: 'lucide',
    iconName: 'CircleDashed',
    color: BLACK,
    strokeWidth: 2,
  },
  ushiroryotedori: {
    type: 'lucide',
    iconName: 'MoveLeft',
    color: BLACK,
    strokeWidth: 2,
  },
  moritetori: {
    type: 'lucide',
    iconName: 'HandHeart',
    color: BLACK,
    strokeWidth: 2,
  },
}

/**
 * WEAPONS (BUKI WAZA)
 */
export const weaponsIcons: Record<string, IconData> = {
  bokken: {
    type: 'lucide',
    iconName: 'Sword',
    color: BLACK,
    strokeWidth: 2,
  },
  jo: {
    type: 'lucide',
    iconName: 'Minus',
    color: BLACK,
    strokeWidth: 3,
  },
  tanto: {
    type: 'lucide',
    iconName: 'Zap',
    color: BLACK,
    strokeWidth: 2,
  },
  suburito: {
    type: 'lucide',
    iconName: 'SwordIcon',
    color: BLACK,
    strokeWidth: 2,
  },
  kumijo: {
    type: 'lucide',
    iconName: 'Swords',
    color: BLACK,
    strokeWidth: 2,
  },
  kumitachi: {
    type: 'lucide',
    iconName: 'Swords',
    color: BLACK,
    strokeWidth: 2,
  },
  tantodori: {
    type: 'lucide',
    iconName: 'ShieldAlert',
    color: BLACK,
    strokeWidth: 2,
  },
}

/**
 * PRINCIPLES & PHILOSOPHY (KOKYU & REI)
 */
export const principlesIcons: Record<string, IconData> = {
  kokyu: {
    type: 'lucide',
    iconName: 'Wind',
    color: BLACK,
    strokeWidth: 2,
  },
  ki: {
    type: 'lucide',
    iconName: 'Sparkles',
    color: BLACK,
    strokeWidth: 2,
  },
  musubi: {
    type: 'lucide',
    iconName: 'Link',
    color: BLACK,
    strokeWidth: 2,
  },
  awase: {
    type: 'lucide',
    iconName: 'Merge',
    color: BLACK,
    strokeWidth: 2,
  },
  zanshin: {
    type: 'lucide',
    iconName: 'Eye',
    color: BLACK,
    strokeWidth: 2,
  },
  kihonwaza: {
    type: 'lucide',
    iconName: 'BookOpen',
    color: BLACK,
    strokeWidth: 2,
  },
  nagare: {
    type: 'lucide',
    iconName: 'Waves',
    color: BLACK,
    strokeWidth: 2,
  },
  kuzushi: {
    type: 'lucide',
    iconName: 'TrendingDown',
    color: BLACK,
    strokeWidth: 2,
  },
  masakatsu: {
    type: 'lucide',
    iconName: 'Award',
    color: BLACK,
    strokeWidth: 2,
  },
  agatsu: {
    type: 'lucide',
    iconName: 'Target',
    color: BLACK,
    strokeWidth: 2,
  },
}

/**
 * COMBINED EXPORT - All Black & White Icons
 */
export const blackWhiteIcons = {
  ...etiquetteIcons,
  ...positionsIcons,
  ...movementsIcons,
  ...ukemiIcons,
  ...techniquesIcons,
  ...gripsIcons,
  ...weaponsIcons,
  ...principlesIcons,
}
