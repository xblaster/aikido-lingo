/**
 * Enhanced Tooltip Component
 * Styled tooltip with better UX and animations
 */

import React from 'react'
import { Tooltip, TooltipProps, styled } from '@mui/material'

interface EnhancedTooltipProps extends Omit<TooltipProps, 'title'> {
  title: string
  /** Show keyboard shortcut hint */
  shortcut?: string
  /** Tooltip variant */
  variant?: 'info' | 'success' | 'warning' | 'error'
}

const StyledTooltip = styled(
  ({ className, variant, ...props }: TooltipProps & { variant?: string }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  )
)(({ theme, variant = 'info' }) => {
  const variantColors = {
    info: {
      bg: 'rgba(38, 166, 154, 0.95)',
      border: '#26a69a',
    },
    success: {
      bg: 'rgba(102, 187, 106, 0.95)',
      border: '#66bb6a',
    },
    warning: {
      bg: 'rgba(255, 167, 38, 0.95)',
      border: '#ffa726',
    },
    error: {
      bg: 'rgba(255, 152, 0, 0.95)',
      border: '#ff9800',
    },
  }

  const colors = variantColors[variant as keyof typeof variantColors] || variantColors.info

  return {
    '& .MuiTooltip-tooltip': {
      backgroundColor: colors.bg,
      backdropFilter: 'blur(10px)',
      border: `1px solid ${colors.border}`,
      borderRadius: 8,
      padding: '8px 12px',
      fontSize: '0.875rem',
      fontWeight: 500,
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
      maxWidth: 300,
    },
    '& .MuiTooltip-arrow': {
      color: colors.bg,
      '&::before': {
        border: `1px solid ${colors.border}`,
      },
    },
  }
})

/**
 * Enhanced tooltip with better styling and optional keyboard shortcuts
 */
export const EnhancedTooltip: React.FC<EnhancedTooltipProps> = ({
  title,
  shortcut,
  variant = 'info',
  children,
  ...props
}) => {
  const tooltipTitle = shortcut ? (
    <div>
      {title}
      <div style={{ marginTop: 4, opacity: 0.8, fontSize: '0.75rem' }}>
        <kbd
          style={{
            background: 'rgba(0, 0, 0, 0.2)',
            padding: '2px 6px',
            borderRadius: 4,
            fontFamily: 'monospace',
          }}
        >
          {shortcut}
        </kbd>
      </div>
    </div>
  ) : (
    title
  )

  return (
    <StyledTooltip
      title={tooltipTitle}
      variant={variant}
      arrow
      enterDelay={500}
      leaveDelay={0}
      TransitionProps={{ timeout: 300 }}
      {...props}
    >
      {children}
    </StyledTooltip>
  )
}
