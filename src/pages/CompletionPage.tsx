/**
 * Completion Page
 * Shows results after completing a unit
 */

import React from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
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
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          {/* Result */}
          {passed ? (
            <>
              <Typography variant="h3" gutterBottom sx={{ mb: 3 }}>
                ⭐ Unité terminée ! ⭐
              </Typography>
              <Typography variant="h4" color="primary" gutterBottom sx={{ mb: 4 }}>
                Score: {unitProgress.score}%
              </Typography>

              {/* Stars */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 4 }}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Box key={index}>
                    {index < stars ? (
                      <StarIcon sx={{ fontSize: 48, color: 'warning.main' }} />
                    ) : (
                      <StarBorderIcon sx={{ fontSize: 48, color: 'text.disabled' }} />
                    )}
                  </Box>
                ))}
              </Box>
            </>
          ) : (
            <>
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
            </>
          )}

          <Divider sx={{ my: 3 }} />

          {/* Statistics */}
          <Typography variant="h6" gutterBottom>
            📊 Statistiques
          </Typography>

          <Grid container spacing={2} sx={{ mt: 2, mb: 3 }}>
            <Grid item xs={6}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Temps
                </Typography>
                <Typography variant="h6">{duration} min</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
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
                <Grid item xs={6}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      XP gagné
                    </Typography>
                    <Typography variant="h6">+{totalXP} XP</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {passed ? (
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/')}
              >
                Continuer
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => navigate(`/unit/${unitId}`)}
              >
                Réessayer
              </Button>
            )}

            <Button variant="outlined" onClick={() => navigate('/')}>
              Retour à l'accueil
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default CompletionPage
