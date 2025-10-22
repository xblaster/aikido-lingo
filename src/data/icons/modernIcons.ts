/**
 * Modern icon definitions using Lucide React
 * These icons replace composite icons with clean, modern SVG designs
 */

import { IconData } from '../../types'

export const modernStancesIcons: Record<string, IconData> = {
  /** Hanmi - Triangular stance */
  hanmi: {
    type: 'lucide',
    iconName: 'Triangle',
    color: '#26a69a',
    strokeWidth: 2.5,
  },

  /** Kamae - Guard position */
  kamae: {
    type: 'lucide',
    iconName: 'Shield',
    color: '#4fc3f7',
    strokeWidth: 2.5,
  },

  /** Suwariwaza - Techniques from seated position */
  suwariwaza: {
    type: 'lucide',
    iconName: 'User',
    color: '#66bb6a',
    strokeWidth: 2.5,
  },
}

export const modernMovementsIcons: Record<string, IconData> = {
  /** Tenkan - Pivot turning */
  tenkan: {
    type: 'lucide',
    iconName: 'RotateCw',
    color: '#ffa726',
    strokeWidth: 2.5,
  },

  /** Irimi - Entering movement */
  irimi: {
    type: 'lucide',
    iconName: 'MoveRight',
    color: '#29b6f6',
    strokeWidth: 2.5,
  },

  /** Tai sabaki - Body movement */
  taisabaki: {
    type: 'lucide',
    iconName: 'Shuffle',
    color: '#4fc3f7',
    strokeWidth: 2.5,
  },

  /** Shikko - Knee walking */
  shikko: {
    type: 'lucide',
    iconName: 'MoveHorizontal',
    color: '#66bb6a',
    strokeWidth: 2.5,
  },
}

export const modernTechniquesIcons: Record<string, IconData> = {
  /** Ikkyo - First control */
  ikkyo: {
    type: 'lucide',
    iconName: 'CircleDot',
    color: '#26a69a',
    strokeWidth: 2.5,
  },

  /** Nikyo - Second control */
  nikyo: {
    type: 'lucide',
    iconName: 'Circle',
    color: '#4fc3f7',
    strokeWidth: 2.5,
  },

  /** Shiho nage - Four direction throw */
  shihonage: {
    type: 'lucide',
    iconName: 'Compass',
    color: '#ffa726',
    strokeWidth: 2.5,
  },

  /** Kote gaeshi - Wrist return */
  kotegaeshi: {
    type: 'lucide',
    iconName: 'RotateCcw',
    color: '#ff9800',
    strokeWidth: 2.5,
  },

  /** Kaiten nage - Rotation throw */
  kaitennage: {
    type: 'lucide',
    iconName: 'RefreshCw',
    color: '#29b6f6',
    strokeWidth: 2.5,
  },
}

export const modernGripsIcons: Record<string, IconData> = {
  /** Katate dori - Single hand grab */
  katatedori: {
    type: 'lucide',
    iconName: 'Hand',
    color: '#26a69a',
    strokeWidth: 2.5,
  },

  /** Ryote dori - Two hand grab */
  ryotedori: {
    type: 'lucide',
    iconName: 'Grip',
    color: '#4fc3f7',
    strokeWidth: 2.5,
  },

  /** Katate ryote dori - One hand grabbed with two hands */
  katatetedori: {
    type: 'lucide',
    iconName: 'HandMetal',
    color: '#ffa726',
    strokeWidth: 2.5,
  },

  /** Shomen uchi - Strike to forehead */
  shomenuchi: {
    type: 'lucide',
    iconName: 'ChevronsDown',
    color: '#ff9800',
    strokeWidth: 2.5,
  },

  /** Yokomen uchi - Strike to side of head */
  yokomenuchi: {
    type: 'lucide',
    iconName: 'ChevronsRight',
    color: '#29b6f6',
    strokeWidth: 2.5,
  },
}

export const modernUkemiIcons: Record<string, IconData> = {
  /** Mae ukemi - Forward roll */
  maeukemi: {
    type: 'lucide',
    iconName: 'ArrowDownCircle',
    color: '#26a69a',
    strokeWidth: 2.5,
  },

  /** Ushiro ukemi - Back roll */
  ushiroukemi: {
    type: 'lucide',
    iconName: 'ArrowUpCircle',
    color: '#4fc3f7',
    strokeWidth: 2.5,
  },

  /** Yoko ukemi - Side fall */
  yokoukemi: {
    type: 'lucide',
    iconName: 'ArrowRightCircle',
    color: '#66bb6a',
    strokeWidth: 2.5,
  },

  /** Tobi ukemi - Flying fall */
  tobiukemi: {
    type: 'lucide',
    iconName: 'Plane',
    color: '#ffa726',
    strokeWidth: 2.5,
  },
}

export const modernWeaponsIcons: Record<string, IconData> = {
  /** Bokken - Wooden sword */
  bokken: {
    type: 'lucide',
    iconName: 'Sword',
    color: '#26a69a',
    strokeWidth: 2.5,
  },

  /** Jo - Wooden staff */
  jo: {
    type: 'lucide',
    iconName: 'Minus',
    color: '#4fc3f7',
    strokeWidth: 3,
  },

  /** Tanto - Wooden knife */
  tanto: {
    type: 'lucide',
    iconName: 'Zap',
    color: '#ffa726',
    strokeWidth: 2.5,
  },
}

// Export all modern icons together
export const modernIcons = {
  ...modernStancesIcons,
  ...modernMovementsIcons,
  ...modernTechniquesIcons,
  ...modernGripsIcons,
  ...modernUkemiIcons,
  ...modernWeaponsIcons,
}
