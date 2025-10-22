/**
 * Icon definitions for Aikido movements and footwork
 */

import { IconData } from '@/types'

export const movementsIcons: Record<string, IconData> = {
  /** Irimi - Direct entry */
  irimi: {
    type: 'composite',
    elements: [
      {
        type: 'arrow',
        direction: 'right',
        position: { x: 35, y: 50 },
        color: '#c62828',
        size: 32
      },
      {
        type: 'shape',
        shape: 'person',
        position: { x: 65, y: 50 },
        color: '#1976d2',
        size: 36
      }
    ]
  },

  /** Tenkan - Pivot rotation */
  tenkan: {
    type: 'composite',
    elements: [
      {
        type: 'text',
        text: '🔄',
        position: { x: 50, y: 40 },
        size: 40
      },
      {
        type: 'shape',
        shape: 'person',
        position: { x: 50, y: 70 },
        color: '#1976d2',
        size: 32
      }
    ]
  },

  /** Tenshin - Retreat pivot */
  tenshin: {
    type: 'composite',
    elements: [
      {
        type: 'arrow',
        direction: 'left',
        position: { x: 45, y: 40 },
        color: '#ffa726',
        size: 28
      },
      {
        type: 'text',
        text: '🔄',
        position: { x: 55, y: 60 },
        size: 32
      }
    ]
  },

  /** Tai sabaki - Body movement */
  taiSabaki: {
    type: 'composite',
    elements: [
      {
        type: 'shape',
        shape: 'circle',
        position: { x: 50, y: 50 },
        color: '#1976d2',
        size: 50
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

  /** Ayumi ashi - Normal walking steps */
  ayumiAshi: {
    type: 'composite',
    elements: [
      {
        type: 'text',
        text: '👣',
        position: { x: 40, y: 50 },
        size: 32
      },
      {
        type: 'arrow',
        direction: 'right',
        position: { x: 65, y: 50 },
        color: '#666',
        size: 24
      }
    ]
  },

  /** Tsugi ashi - Shuffle steps */
  tsugiAshi: {
    type: 'composite',
    elements: [
      {
        type: 'text',
        text: '👣',
        position: { x: 35, y: 50 },
        size: 28
      },
      {
        type: 'text',
        text: '👣',
        position: { x: 55, y: 50 },
        size: 28
      },
      {
        type: 'arrow',
        direction: 'right',
        position: { x: 75, y: 50 },
        color: '#666',
        size: 20
      }
    ]
  }
}
