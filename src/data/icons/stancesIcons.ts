/**
 * Icon definitions for Aikido stances and positions
 */

import { IconData } from '@/types'

export const stancesIcons: Record<string, IconData> = {
  /** Seiza - Formal sitting position */
  seiza: {
    type: 'emoji',
    emoji: '🧎'
  },

  /** Hanmi - Triangular stance */
  hanmi: {
    type: 'composite',
    elements: [
      {
        type: 'shape',
        shape: 'person',
        position: { x: 50, y: 35 },
        color: '#1976d2',
        size: 40
      },
      {
        type: 'shape',
        shape: 'triangle',
        position: { x: 50, y: 75 },
        color: '#ffa726',
        size: 30
      }
    ]
  },

  /** Shizentai - Natural standing posture */
  shizentai: {
    type: 'emoji',
    emoji: '🧍'
  },

  /** Kamae - Guard position */
  kamae: {
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
        text: '⚔️',
        position: { x: 70, y: 50 },
        size: 24
      }
    ]
  },

  /** Rei - Bow (salute) */
  rei: {
    type: 'composite',
    elements: [
      {
        type: 'shape',
        shape: 'person',
        position: { x: 50, y: 55 },
        color: '#1976d2',
        size: 40
      },
      {
        type: 'arrow',
        direction: 'down',
        position: { x: 50, y: 30 },
        color: '#c62828',
        size: 24
      }
    ]
  },

  /** Suwari waza - Techniques from seiza */
  suwariWaza: {
    type: 'composite',
    elements: [
      {
        type: 'text',
        text: '🧎',
        position: { x: 35, y: 50 },
        size: 32
      },
      {
        type: 'text',
        text: '🧎',
        position: { x: 65, y: 50 },
        size: 32
      }
    ]
  }
}
