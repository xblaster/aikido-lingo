/**
 * Hearts Component
 * Displays remaining lives/hearts
 */

import React from 'react'
import { Box } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { MAX_HEARTS } from '../../utils/constants'

interface HeartsProps {
  current: number
  max?: number
}

const Hearts: React.FC<HeartsProps> = ({ current, max = MAX_HEARTS }) => {
  return (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      {Array.from({ length: max }).map((_, index) => (
        <Box key={index}>
          {index < current ? (
            <FavoriteIcon sx={{ color: 'error.main', fontSize: 28 }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: 'text.disabled', fontSize: 28 }} />
          )}
        </Box>
      ))}
    </Box>
  )
}

export default Hearts
