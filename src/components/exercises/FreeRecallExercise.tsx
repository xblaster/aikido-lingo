/**
 * Free Recall Exercise Component
 * Flashcard-style recall with self-assessment
 */

import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  ButtonGroup
} from '@mui/material'
import { Exercise, ExerciseResult } from '../../types'
import IconRenderer from '../icons/IconRenderer'

interface FreeRecallExerciseProps {
  exercise: Exercise
  onComplete: (result: ExerciseResult) => void
}

const FreeRecallExercise: React.FC<FreeRecallExerciseProps> = ({
  exercise,
  onComplete
}) => {
  const [showAnswer, setShowAnswer] = useState(false)
  const [startTime] = useState(Date.now())

  const handleReveal = () => {
    setShowAnswer(true)
  }

  const handleSelfAssessment = (confidence: 'bad' | 'medium' | 'good' | 'perfect') => {
    const timeSpent = Date.now() - startTime

    // Map confidence to correctness (for spaced repetition)
    const isCorrect = confidence === 'good' || confidence === 'perfect'

    const result: ExerciseResult = {
      exerciseId: exercise.id,
      isCorrect,
      timeSpent,
      attempts: 1,
      timestamp: new Date().toISOString(),
      userAnswer: confidence,
      correctAnswer: exercise.correctAnswer,
      hintsUsed: 0
    }

    onComplete(result)
  }

  return (
    <Box>
      {/* Card indicator */}
      <Typography
        variant="caption"
        sx={{ display: 'block', mb: 2, color: 'text.secondary' }}
      >
        📇 Flashcard - Rappel libre
      </Typography>

      <Paper
        sx={{
          minHeight: 300,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        {!showAnswer ? (
          <>
            {/* Front of card - Icon */}
            <IconRenderer
              iconData={exercise.terminologyItem.iconData}
              caption={exercise.terminologyItem.iconCaption}
              size="large"
            />

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              {exercise.question}
            </Typography>

            {exercise.hint && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontStyle: 'italic', mb: 3 }}
              >
                💡 {exercise.hint}
              </Typography>
            )}

            <Button
              variant="contained"
              size="large"
              onClick={handleReveal}
              sx={{ mt: 2 }}
            >
              Afficher la réponse
            </Button>
          </>
        ) : (
          <>
            {/* Back of card - Answer */}
            <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }}>
              {exercise.terminologyItem.japanese}
            </Typography>

            <Typography variant="h5" sx={{ mb: 1, color: 'primary.main' }}>
              ({exercise.terminologyItem.romaji})
            </Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>
              {exercise.terminologyItem.french}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {exercise.terminologyItem.english}
            </Typography>

            <Divider sx={{ width: '100%', my: 2 }} />

            <Typography variant="body2" sx={{ mb: 3 }}>
              Vous vous en souvenez ?
            </Typography>

            <ButtonGroup variant="outlined" fullWidth>
              <Button
                onClick={() => handleSelfAssessment('bad')}
                color="error"
                sx={{ py: 1.5 }}
              >
                😟<br />
                <Typography variant="caption">Pas du tout</Typography>
              </Button>
              <Button
                onClick={() => handleSelfAssessment('medium')}
                color="warning"
                sx={{ py: 1.5 }}
              >
                😐<br />
                <Typography variant="caption">Un peu</Typography>
              </Button>
              <Button
                onClick={() => handleSelfAssessment('good')}
                color="success"
                sx={{ py: 1.5 }}
              >
                😊<br />
                <Typography variant="caption">Bien</Typography>
              </Button>
              <Button
                onClick={() => handleSelfAssessment('perfect')}
                color="success"
                sx={{ py: 1.5 }}
              >
                😄<br />
                <Typography variant="caption">Parfait!</Typography>
              </Button>
            </ButtonGroup>
          </>
        )}
      </Paper>
    </Box>
  )
}

export default FreeRecallExercise
