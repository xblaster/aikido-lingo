/**
 * Composite icon component
 * Renders multiple icon elements (shapes, arrows, lines, text) composed together
 */

import React from 'react'
import { Box } from '@mui/material'
import { IconData, IconElement } from '../../types'

interface CompositeIconProps {
  iconData: IconData
  size: 'small' | 'medium' | 'large'
}

const CompositeIcon: React.FC<CompositeIconProps> = ({ iconData, size }) => {
  if (iconData.type !== 'composite' || !iconData.elements) {
    return null
  }

  const sizeMap = {
    small: 48,
    medium: 96,
    large: 144
  }

  const sizeValue = sizeMap[size]

  const renderElement = (element: IconElement, index: number) => {
    const { type, position, color = '#1976d2', size: elementSize = 20 } = element

    const baseStyle = {
      position: 'absolute' as const,
      left: `${position.x}%`,
      top: `${position.y}%`,
      transform: 'translate(-50%, -50%)',
      color
    }

    switch (type) {
      case 'shape':
        return renderShape(element, baseStyle, index, elementSize)
      case 'arrow':
        return renderArrow(element, baseStyle, index, elementSize)
      case 'line':
        return renderLine(element, baseStyle, index, elementSize)
      case 'text':
        return renderText(element, baseStyle, index, elementSize)
      default:
        return null
    }
  }

  const renderShape = (
    element: IconElement,
    baseStyle: React.CSSProperties,
    index: number,
    elementSize: number
  ) => {
    const { shape = 'circle', color = '#1976d2' } = element

    const shapeMap = {
      circle: (
        <Box
          key={index}
          sx={{
            ...baseStyle,
            width: elementSize,
            height: elementSize,
            borderRadius: '50%',
            backgroundColor: color,
            border: `2px solid ${color}`
          }}
        />
      ),
      square: (
        <Box
          key={index}
          sx={{
            ...baseStyle,
            width: elementSize,
            height: elementSize,
            backgroundColor: color,
            border: `2px solid ${color}`
          }}
        />
      ),
      triangle: (
        <Box
          key={index}
          sx={{
            ...baseStyle,
            width: 0,
            height: 0,
            borderLeft: `${elementSize / 2}px solid transparent`,
            borderRight: `${elementSize / 2}px solid transparent`,
            borderBottom: `${elementSize}px solid ${color}`
          }}
        />
      ),
      person: (
        <Box
          key={index}
          sx={{
            ...baseStyle,
            fontSize: elementSize,
            lineHeight: 1
          }}
        >
          🧍
        </Box>
      )
    }

    return shapeMap[shape] || null
  }

  const renderArrow = (
    element: IconElement,
    baseStyle: React.CSSProperties,
    index: number,
    elementSize: number
  ) => {
    const { direction = 'right', color = '#1976d2' } = element

    const arrowMap = {
      up: '↑',
      down: '↓',
      left: '←',
      right: '→',
      diagonal: '↗'
    }

    return (
      <Box
        key={index}
        sx={{
          ...baseStyle,
          fontSize: elementSize,
          fontWeight: 'bold',
          color,
          lineHeight: 1
        }}
      >
        {arrowMap[direction]}
      </Box>
    )
  }

  const renderLine = (
    element: IconElement,
    baseStyle: React.CSSProperties,
    index: number,
    elementSize: number
  ) => {
    const { direction = 'horizontal', color = '#666' } = element

    const isHorizontal = direction === 'left' || direction === 'right'

    return (
      <Box
        key={index}
        sx={{
          ...baseStyle,
          width: isHorizontal ? elementSize : 2,
          height: isHorizontal ? 2 : elementSize,
          backgroundColor: color
        }}
      />
    )
  }

  const renderText = (
    element: IconElement,
    baseStyle: React.CSSProperties,
    index: number,
    elementSize: number
  ) => {
    const { text = '', color = '#000' } = element

    return (
      <Box
        key={index}
        sx={{
          ...baseStyle,
          fontSize: elementSize,
          fontWeight: 'bold',
          color,
          whiteSpace: 'nowrap'
        }}
      >
        {text}
      </Box>
    )
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: sizeValue,
        height: sizeValue,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {iconData.elements.map((element, index) => renderElement(element, index))}
    </Box>
  )
}

export default CompositeIcon
