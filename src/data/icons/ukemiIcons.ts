/**
 * Icon definitions for Aikido falls (ukemi)
 */

import { IconData } from '@/types'

export const ukemiIcons: Record<string, IconData> = {
  /** Mae ukemi - Forward roll */
  maeUkemi: {
    type: 'composite',
    elements: [
      {
        type: 'text',
        text: '🤸',
        position: { x: 50, y: 50 },
        size: 40
      },
      {
        type: 'arrow',
        direction: 'right',
        position: { x: 75, y: 50 },
        color: '#c62828',
        size: 24
      }
    ]
  },

  /** Ushiro ukemi - Backward roll */
  ushiroUkemi: {
    type: 'composite',
    elements: [
      {
        type: 'text',
        text: '🤸',
        position: { x: 50, y: 50 },
        size: 40
      },
      {
        type: 'arrow',
        direction: 'left',
        position: { x: 25, y: 50 },
        color: '#ffa726',
        size: 24
      }
    ]
  },

  /** Yoko ukemi - Side fall */
  yokoUkemi: {
    type: 'composite',
    elements: [
      {
        type: 'text',
        text: '🤸',
        position: { x: 50, y: 45 },
        size: 40
      },
      {
        type: 'arrow',
        direction: 'down',
        position: { x: 50, y: 75 },
        color: '#666',
        size: 24
      }
    ]
  }
}
