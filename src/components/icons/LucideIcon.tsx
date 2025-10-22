/**
 * Lucide Icon Component
 * Renders icons from lucide-react library
 */

import React from 'react'
import { Box } from '@mui/material'
import * as LucideIcons from 'lucide-react'
import { IconData } from '../../types'

interface LucideIconProps {
  iconData: IconData & { type: 'lucide' }
  size?: 'small' | 'medium' | 'large'
}

const sizeMap = {
  small: 48,
  medium: 96,
  large: 144,
}

/**
 * Renders a Lucide icon with proper sizing
 */
const LucideIcon: React.FC<LucideIconProps> = ({ iconData, size = 'medium' }) => {
  if (iconData.type !== 'lucide' || !iconData.iconName) {
    return null
  }

  const IconComponent = (LucideIcons as any)[iconData.iconName]

  if (!IconComponent) {
    console.warn(`Lucide icon "${iconData.iconName}" not found`)
    return null
  }

  const iconSize = sizeMap[size]
  const strokeWidth = iconData.strokeWidth || 2
  const color = iconData.color || 'currentColor'

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: iconSize,
        height: iconSize,
        color: color,
      }}
    >
      <IconComponent size={iconSize * 0.7} strokeWidth={strokeWidth} />
    </Box>
  )
}

export default LucideIcon
