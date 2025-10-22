/**
 * Emoji icon component
 * Simple emoji rendering with size support
 */

import React from 'react'
import { Box } from '@mui/material'
import { IconData } from '../../types'

interface EmojiIconProps {
  iconData: IconData
  size: 'small' | 'medium' | 'large'
}

const EmojiIcon: React.FC<EmojiIconProps> = ({ iconData, size }) => {
  if (iconData.type !== 'emoji' || !iconData.emoji) {
    return null
  }

  const sizeMap = {
    small: 48,
    medium: 96,
    large: 144
  }

  return (
    <Box
      sx={{
        fontSize: `${sizeMap[size]}px`,
        lineHeight: 1,
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      role="img"
      aria-label="Icon"
    >
      {iconData.emoji}
    </Box>
  )
}

export default EmojiIcon
