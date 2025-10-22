/**
 * Main icon renderer component
 * Factory pattern - renders appropriate icon type based on iconData
 */

import React from 'react'
import { Box } from '@mui/material'
import { IconData } from '../../types'
import EmojiIcon from './EmojiIcon'
import SvgIcon from './SvgIcon'
import CompositeIcon from './CompositeIcon'

export interface IconRendererProps {
  iconData: IconData
  caption?: string
  size?: 'small' | 'medium' | 'large'
  showCaption?: boolean
}

const IconRenderer: React.FC<IconRendererProps> = ({
  iconData,
  caption,
  size = 'medium',
  showCaption = true
}) => {
  const renderIcon = () => {
    switch (iconData.type) {
      case 'emoji':
        return <EmojiIcon iconData={iconData} size={size} />
      case 'svg':
        return <SvgIcon iconData={iconData} size={size} />
      case 'composite':
        return <CompositeIcon iconData={iconData} size={size} />
      default:
        return null
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      {renderIcon()}

      {showCaption && caption && (
        <Box
          component="span"
          sx={{
            mt: 1,
            fontSize: '0.75rem',
            color: 'text.secondary',
            fontWeight: 500,
            maxWidth: size === 'small' ? 80 : size === 'medium' ? 120 : 160
          }}
        >
          {caption}
        </Box>
      )}
    </Box>
  )
}

export default IconRenderer
