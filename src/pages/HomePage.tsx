/**
 * Home Page
 * Main navigation with belt progression and unit cards
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Box,
  Container,
  Typography,
  Card,
  CardActionArea,
  Grid,
  Chip,
  LinearProgress,
} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useTheme } from '@mui/material/styles';
import { useProgress } from '../contexts/ProgressContext'
import { aikidoCurriculum } from '../data/curriculum'
import { pageVariants, staggerContainer, staggerItem, cardHover } from '../utils/animations'

const HomePage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate()
  const { progress, isUnitUnlocked, isUnitCompleted } = useProgress()

  const currentBelt = aikidoCurriculum.belts.find(
    belt => belt.level === progress.currentBeltLevel
  )

  const handleUnitClick = (unitId: string) => {
    if (isUnitUnlocked(unitId)) {
      navigate(`/unit/${unitId}`)
    }
  }

  const getUnitStatus = (unitId: string) => {
    if (isUnitCompleted(unitId)) return 'completed'
    if (isUnitUnlocked(unitId)) return 'unlocked'
    return 'locked'
  }

  const completedUnits = currentBelt?.units.filter(u => isUnitCompleted(u.id)).length || 0
  const totalUnits = currentBelt?.units.length || 1
  const beltProgress = Math.round((completedUnits / totalUnits) * 100)

  return (
    <Box
      component={motion.div}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      sx={{ minHeight: '100vh', py: 4 }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          sx={{ mb: 4, textAlign: 'center' }}
        >
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, color: 'primary.light' }}>
            🥋 Aikido Lingo
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Maîtrisez la terminologie de l'aïkido
          </Typography>
        </Box>

        {/* User Stats Card (Glassmorphism) */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: '16px',
            bgcolor: 'rgba(42, 42, 42, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                {currentBelt?.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={beltProgress}
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      bgcolor: 'rgba(255,255,255,0.1)',
                      '& .MuiLinearProgress-bar': {
                        background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                      },
                    }}
                  />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.light' }}>
                  {beltProgress}%
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2} textAlign="center">
                <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {progress.stats.totalXp}
                  </Typography>
                  <Typography variant="caption">Total XP</Typography>
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {progress.stats.accuracy}%
                  </Typography>
                  <Typography variant="caption">Précision</Typography>
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {progress.stats.streak} 🔥
                  </Typography>
                  <Typography variant="caption">Série</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        {/* Units List */}
        <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
          Unités d'apprentissage
        </Typography>

        <Grid
          container
          spacing={3}
          component={motion.div}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {currentBelt?.units.map((unit, index) => {
            const status = getUnitStatus(unit.id);
            const isLocked = status === 'locked';
            const isComplete = status === 'completed';

            return (
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                key={unit.id}
                component={motion.div}
                variants={staggerItem}
              >
                <Card
                  component={motion.div}
                  variants={isLocked ? undefined : cardHover}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  sx={{
                    height: '100%',
                    opacity: isLocked ? 0.5 : 1,
                    background: isComplete
                      ? 'linear-gradient(145deg, rgba(46, 125, 50, 0.2), rgba(22, 22, 22, 0.2))'
                      : `linear-gradient(145deg, ${theme.palette.background.paper}, #1a1a1a)`,
                  }}
                >
                  <CardActionArea
                    onClick={() => handleUnitClick(unit.id)}
                    disabled={isLocked}
                    sx={{ height: '100%', p: 3 }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Chip
                        label={`Unité ${index + 1}`}
                        size="small"
                        color="primary"
                      />
                      {isComplete ? (
                        <CheckCircleIcon sx={{ color: 'success.main' }} />
                      ) : isLocked ? (
                        <LockIcon />
                      ) : (
                        <PlayArrowIcon color="primary" />
                      )}
                    </Box>

                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, my: 2 }}>
                      {unit.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 40 }}>
                      {unit.description}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label={`${unit.terminology.length} termes`}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label={`${unit.exercises.length} exercices`}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label={`~${unit.estimatedTime} min`}
                        size="small"
                        variant="outlined"
                      />
                      {unit.isSafetyCritical && (
                        <Chip
                          label="⚠️ Sécurité"
                          size="small"
                          color="warning"
                          variant="filled"
                        />
                      )}
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Footer */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Développé avec ❤️ pour les pratiquants d'aïkido
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
export default HomePage
