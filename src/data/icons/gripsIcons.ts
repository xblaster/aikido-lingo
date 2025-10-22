/**
 * Icon definitions for Aikido grips and attacks
 */

import { IconData } from '@/types'

export const gripsIcons: Record<string, IconData> = {
  /** Katate dori - One-hand wrist grab */
  katateDori: {
    type: 'emoji',
    emoji: '🤝'
  },

  /** Morote dori - Two hands on one wrist */
  moroteDori: {
    type: 'composite',
    elements: [
      {
        type: 'text',
        text: '🤝',
        position: { x: 40, y: 50 },
        size: 32
      },
      {
        type: 'text',
        text: '🤝',
        position: { x: 60, y: 50 },
        size: 32
      }
    ]
  },

  /** Ryote dori - Both wrists grabbed */
  ryoteDori: {
    type: 'emoji',
    emoji: '🙌'
  },

  /** Shomen uchi - Vertical strike */
  shomenUchi: {
    type: 'composite',
    elements: [
      {
        type: 'text',
        text: '✋',
        position: { x: 50, y: 30 },
        size: 36
      },
      {
        type: 'arrow',
        direction: 'down',
        position: { x: 50, y: 60 },
        color: '#c62828',
        size: 32
      }
    ]
  },

  /** Yokomen uchi - Side strike */
  yokomenUchi: {
    type: 'composite',
    elements: [
      {
        type: 'text',
        text: '✋',
        position: { x: 35, y: 40 },
        size: 32
      },
      {
        type: 'arrow',
        direction: 'diagonal',
        position: { x: 60, y: 60 },
        color: '#c62828',
        size: 28
      }
    ]
  },

  /** Mune dori - Chest grab */
  muneDori: {
    type: 'composite',
    elements: [
      {
        type: 'shape',
        shape: 'person',
        position: { x: 50, y: 50 },
        color: '#1976d2',
        size: 40
      },
      {
        type: 'text',
        text: '✊',
        position: { x: 70, y: 45 },
        size: 24
      }
    ]
  }
}
