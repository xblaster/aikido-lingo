/**
 * Skeleton Loader Component
 * Provides loading states for content
 */

import React from 'react'
import { Box, Skeleton, Grid } from '@mui/material'
import { motion } from 'framer-motion'

interface SkeletonLoaderProps {
  /** Type of content being loaded */
  variant: 'card' | 'list' | 'stats' | 'exercise'
  /** Number of items to show */
  count?: number
}

/**
 * Animated skeleton loader for better perceived performance
 */
export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant,
  count = 3,
}) => {
  if (variant === 'card') {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: count }).map((_, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: 'background.paper',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 2 }} />
                <Skeleton variant="circular" width={24} height={24} />
              </Box>
              <Skeleton variant="text" height={32} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} width="80%" sx={{ mb: 3 }} />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 2 }} />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    )
  }

  if (variant === 'stats') {
    return (
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        sx={{
          p: 3,
          borderRadius: 4,
          bgcolor: 'rgba(42, 42, 42, 0.6)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={32} width="60%" sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={12} sx={{ borderRadius: 2, mb: 2 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {Array.from({ length: 3 }).map((_, index) => (
                <Grid item xs={4} key={index}>
                  <Skeleton variant="text" height={40} />
                  <Skeleton variant="text" height={16} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    )
  }

  if (variant === 'exercise') {
    return (
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Skeleton variant="text" height={40} width="70%" sx={{ mb: 3 }} />
        <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2, mb: 3 }} />
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Grid item xs={6} key={index}>
              <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
        <Skeleton variant="rectangular" height={48} sx={{ borderRadius: 2 }} />
      </Box>
    )
  }

  // Default: list
  return (
    <Box>
      {Array.from({ length: count }).map((_, index) => (
        <Box
          key={index}
          component={motion.div}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          sx={{ mb: 2 }}
        >
          <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 2 }} />
        </Box>
      ))}
    </Box>
  )
}
