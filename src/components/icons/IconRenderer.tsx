/**
 * Main icon renderer component
 * Factory pattern - renders appropriate icon type based on iconData
 */

import React from 'react'
import { motion } from 'framer-motion'
import { Box } from '@mui/material'
import { IconData } from '../../types'
import EmojiIcon from './EmojiIcon'
import SvgIcon from './SvgIcon'
import CompositeIcon from './CompositeIcon'
import LucideIcon from './LucideIcon'
import { iconHover } from '../../utils/animations'

export interface IconRendererProps {
  iconData: IconData
  caption?: string
  size?: 'small' | 'medium' | 'large'
  showCaption?: boolean
  /** Enable hover animation (default: true) */
  enableHover?: boolean
  /** Enable pulse animation (default: false) */
  enablePulse?: boolean
}

const IconRenderer: React.FC<IconRendererProps> = ({
  iconData,
  caption,
  size = 'medium',
  showCaption = true,
  enableHover = true,
  enablePulse = false,
}) => {
  const renderIcon = () => {
    switch (iconData.type) {
      case 'emoji':
        return <EmojiIcon iconData={iconData} size={size} />
      case 'svg':
        return <SvgIcon iconData={iconData} size={size} />
      case 'composite':
        return <CompositeIcon iconData={iconData} size={size} />
      case 'lucide':
        return <LucideIcon iconData={iconData as any} size={size} />
      default:
        return null
    }
  }

  const pulseAnimation = enablePulse
    ? {
        scale: [1, 1.05, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }
    : {}

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
      <Box
        component={motion.div}
        variants={enableHover ? iconHover : undefined}
        initial="rest"
        whileHover={enableHover ? 'hover' : undefined}
        animate={pulseAnimation}
        sx={{ display: 'inline-block' }}
      >
        {renderIcon()}
      </Box>

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
