/**
 * Icon definitions for Aikido techniques
 */

import { IconData } from '@/types'

export const techniquesIcons: Record<string, IconData> = {
  /** Ikkyo - First principle (arm control) */
  ikkyo: {
    type: 'composite',
    elements: [
      {
        type: 'text',
        text: '✋',
        position: { x: 50, y: 35 },
        size: 36
      },
      {
        type: 'arrow',
        direction: 'down',
        position: { x: 50, y: 65 },
        color: '#c62828',
        size: 32
      }
    ]
  },

  /** Nikyo - Second principle (wrist twist) */
  nikyo: {
    type: 'composite',
    elements: [
      {
        type: 'text',
        text: '🤝',
        position: { x: 45, y: 50 },
        size: 36
      },
      {
        type: 'text',
        text: '🔄',
        position: { x: 65, y: 50 },
        size: 28
      }
    ]
  },

  /** Sankyo - Third principle (wrist rotation) */
  sankyo: {
    type: 'composite',
    elements: [
      {
        type: 'text',
        text: '🤝',
        position: { x: 50, y: 40 },
        size: 36
      },
      {
        type: 'arrow',
        direction: 'diagonal',
        position: { x: 65, y: 60 },
        color: '#ffa726',
        size: 28
      }
    ]
  },

  /** Yonkyo - Fourth principle (pressure point) */
  yonkyo: {
    type: 'composite',
    elements: [
      {
        type: 'text',
        text: '✋',
        position: { x: 50, y: 50 },
        size: 36
      },
      {
        type: 'shape',
        shape: 'circle',
        position: { x: 65, y: 45 },
        color: '#c62828',
        size: 12
      }
    ]
  },

  /** Kote gaeshi - Wrist turn throw */
  koteGaeshi: {
    type: 'composite',
    elements: [
      {
        type: 'text',
        text: '🤝',
        position: { x: 45, y: 50 },
        size: 36
      },
      {
        type: 'arrow',
        direction: 'left',
        position: { x: 70, y: 35 },
        color: '#c62828',
        size: 24
      }
    ]
  },

  /** Shiho nage - Four-direction throw */
  shihoNage: {
    type: 'composite',
    elements: [
      {
        type: 'text',
        text: '🤝',
        position: { x: 50, y: 55 },
        size: 36
      },
      {
        type: 'arrow',
        direction: 'up',
        position: { x: 50, y: 30 },
        color: '#c62828',
        size: 28
      }
    ]
  }
}
