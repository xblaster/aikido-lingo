/**
 * SVG icon component
 * Renders SVG from path or inline content
 */

import React from 'react'
import { Box } from '@mui/material'
import { IconData } from '../../types'

interface SvgIconProps {
  iconData: IconData
  size: 'small' | 'medium' | 'large'
}

const SvgIcon: React.FC<SvgIconProps> = ({ iconData, size }) => {
  if (iconData.type !== 'svg') {
    return null
  }

  const sizeMap = {
    small: 48,
    medium: 96,
    large: 144
  }

  const sizeValue = sizeMap[size]

  // Render from SVG path
  if (iconData.svgPath) {
    return (
      <Box
        component="img"
        src={iconData.svgPath}
        alt="Icon"
        sx={{
          width: sizeValue,
          height: sizeValue,
          objectFit: 'contain'
        }}
      />
    )
  }

  // Render inline SVG content
  if (iconData.svgContent) {
    return (
      <Box
        sx={{
          width: sizeValue,
          height: sizeValue,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& svg': {
            width: '100%',
            height: '100%'
          }
        }}
        dangerouslySetInnerHTML={{ __html: iconData.svgContent }}
      />
    )
  }

  return null
}

export default SvgIcon
