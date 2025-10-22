/**
 * Completion Page
 * Shows results after completing a unit
 */

import React from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Divider
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { UnitProgress } from '../types'
import { getUnitById } from '../data/curriculum'
import { isUnitPassed } from '../services/progressTracking'
import { ConfettiCelebration } from '../components/common/ConfettiCelebration'
import {
  pageVariants,
  celebrationStar,
  staggerContainer,
  staggerItem,
  buttonPress,
  errorShake,
} from '../utils/animations'

const CompletionPage: React.FC = () => {
  const { unitId } = useParams<{ unitId: string }>()
  const location = useLocation()
  const navigate = useNavigate()

  const unitProgress = location.state?.unitProgress as UnitProgress | undefined
  const unit = unitId ? getUnitById(unitId) : null

  if (!unit || !unitProgress) {
    navigate('/')
    return null
  }

  const passed = isUnitPassed(unitProgress)
  const duration = Math.round(
    unitProgress.completedExercises.reduce((sum, ex) => sum + ex.timeSpent, 0) / 60000
  )

  const correctCount = unitProgress.completedExercises.filter(ex => ex.isCorrect).length
  const totalCount = unitProgress.completedExercises.length

  // Calculate XP (simplified)
  const baseXP = 100
  const bonusXP = unitProgress.score >= 90 ? 50 : 0
  const totalXP = baseXP + bonusXP

  // Stars (out of 5)
  const stars = Math.round((unitProgress.score / 100) * 5)

  return (
    <Box
      component={motion.div}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}
    >
      {/* Confetti on success */}
      {passed && <ConfettiCelebration active={passed} duration={4000} numberOfPieces={300} />}

      <Container maxWidth="sm">
        <Paper
          component={motion.div}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
          sx={{ p: 4, textAlign: 'center' }}
        >
          {/* Result */}
          {passed ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Typography variant="h3" gutterBottom sx={{ mb: 3 }}>
                  ⭐ Unité terminée ! ⭐
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5, type: 'spring' }}
              >
                <Typography variant="h4" color="primary" gutterBottom sx={{ mb: 4 }}>
                  Score: {unitProgress.score}%
                </Typography>
              </motion.div>

              {/* Stars */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 4 }}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <motion.div
                    key={index}
                    variants={celebrationStar}
                    initial="initial"
                    animate="animate"
                    custom={index * 0.1 + 0.7}
                  >
                    {index < stars ? (
                      <StarIcon sx={{ fontSize: 48, color: 'warning.main' }} />
                    ) : (
                      <StarBorderIcon sx={{ fontSize: 48, color: 'text.disabled' }} />
                    )}
                  </motion.div>
                ))}
              </Box>
            </>
          ) : (
            <motion.div
              variants={errorShake}
              initial="initial"
              animate="animate"
            >
              <Typography variant="h3" gutterBottom sx={{ mb: 3, color: 'error.main' }}>
                😔 Unité échouée
              </Typography>
              <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
                Score: {unitProgress.score}%
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                {unitProgress.hearts === 0
                  ? 'Vous avez perdu tous vos cœurs. Réessayez !'
                  : `Score minimum requis : ${unit.targetScore}%`}
              </Typography>
            </motion.div>
          )}

          <Divider sx={{ my: 3 }} />

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <Typography variant="h6" gutterBottom>
              📊 Statistiques
            </Typography>
          </motion.div>

          <Grid
            container
            spacing={2}
            sx={{ mt: 2, mb: 3 }}
            component={motion.div}
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <Grid item xs={6} component={motion.div} variants={staggerItem}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Temps
                </Typography>
                <Typography variant="h6">{duration} min</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} component={motion.div} variants={staggerItem}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Précision
                </Typography>
                <Typography variant="h6">
                  {correctCount}/{totalCount}
                </Typography>
              </Paper>
            </Grid>
            {passed && (
              <>
                <Grid item xs={6} component={motion.div} variants={staggerItem}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      XP gagné
                    </Typography>
                    <Typography variant="h6">+{totalXP} XP</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} component={motion.div} variants={staggerItem}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Cœurs restants
                    </Typography>
                    <Typography variant="h6">{unitProgress.hearts}/5 ❤️</Typography>
                  </Paper>
                </Grid>
              </>
            )}
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Actions */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            {passed ? (
              <Button
                component={motion.button}
                variants={buttonPress}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variant="contained"
                size="large"
                onClick={() => navigate('/')}
              >
                Continuer
              </Button>
            ) : (
              <Button
                component={motion.button}
                variants={buttonPress}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variant="contained"
                size="large"
                color="primary"
                onClick={() => navigate(`/unit/${unitId}`)}
              >
                Réessayer
              </Button>
            )}

            <Button
              component={motion.button}
              variants={buttonPress}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variant="outlined"
              onClick={() => navigate('/')}
            >
              Retour à l'accueil
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default CompletionPage
