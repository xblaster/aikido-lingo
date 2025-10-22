/**
 * Progress Bar Component
 * Shows current progress in a unit
 */

import React from 'react'
import { Box, LinearProgress, Typography } from '@mui/material'

interface ProgressBarProps {
  current: number
  total: number
  percentage: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, percentage }) => {
  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          {current}/{total} exercices
        </Typography>
        <Typography variant="body2" color="text.secondary" fontWeight={600}>
          {percentage}%
        </Typography>
      </Box>
      <LinearProgress variant="determinate" value={(current / total) * 100} />
    </Box>
  )
}

export default ProgressBar
