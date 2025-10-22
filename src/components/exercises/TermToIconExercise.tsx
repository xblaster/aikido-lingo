/**
 * Term to Icon Exercise Component
 * Given a term, choose the correct icon from options
 */

import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Alert
} from '@mui/material'
import { Exercise, ExerciseResult } from '../../types'
import IconRenderer from '../icons/IconRenderer'

interface TermToIconExerciseProps {
  exercise: Exercise
  onComplete: (result: ExerciseResult) => void
}

const TermToIconExercise: React.FC<TermToIconExerciseProps> = ({
  exercise,
  onComplete
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [startTime] = useState(Date.now())
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)

  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return
    setSelectedOption(optionId)
  }

  const handleSubmit = () => {
    if (!selectedOption) return

    setAttempts(prev => prev + 1)
    setShowFeedback(true)

    const isCorrect = selectedOption === exercise.correctAnswer
    const timeSpent = Date.now() - startTime

    // Wait for feedback, then complete
    setTimeout(() => {
      const result: ExerciseResult = {
        exerciseId: exercise.id,
        isCorrect,
        timeSpent,
        attempts: attempts + 1,
        timestamp: new Date().toISOString(),
        userAnswer: selectedOption,
        correctAnswer: exercise.correctAnswer,
        hintsUsed: showHint ? 1 : 0
      }
      onComplete(result)
    }, 1500)
  }

  return (
    <Box>
      {/* Question */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        {exercise.question}
      </Typography>

      {/* Term information */}
      <Paper sx={{ p: 2, mb: 3, bgcolor: 'primary.light', color: 'white' }}>
        <Typography variant="h6">
          {exercise.terminologyItem.japanese} ({exercise.terminologyItem.romaji})
        </Typography>
        <Typography variant="body2">
          {exercise.terminologyItem.french}
        </Typography>
      </Paper>

      {/* Options grid */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {exercise.options?.map((option) => (
          <Grid item xs={6} key={option.id}>
            <Paper
              onClick={() => handleOptionSelect(option.id)}
              sx={{
                p: 3,
                cursor: showFeedback ? 'default' : 'pointer',
                border: 2,
                borderColor:
                  selectedOption === option.id
                    ? showFeedback
                      ? option.isCorrect
                        ? 'success.main'
                        : 'error.main'
                      : 'primary.main'
                    : 'transparent',
                bgcolor:
                  showFeedback && option.isCorrect
                    ? 'success.light'
                    : 'background.paper',
                transition: 'all 0.2s',
                '&:hover': !showFeedback
                  ? {
                      transform: 'translateY(-4px)',
                      boxShadow: 3
                    }
                  : {}
              }}
            >
              {option.iconData && (
                <IconRenderer
                  iconData={option.iconData}
                  caption={option.value}
                  size="medium"
                />
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Hint */}
      {exercise.hint && !showFeedback && (
        <Box sx={{ mb: 2 }}>
          {!showHint ? (
            <Button
              variant="outlined"
              size="small"
              onClick={() => setShowHint(true)}
            >
              💡 Voir l'indice
            </Button>
          ) : (
            <Alert severity="info">{exercise.hint}</Alert>
          )}
        </Box>
      )}

      {/* Feedback */}
      {showFeedback && (
        <Alert
          severity={
            selectedOption === exercise.correctAnswer ? 'success' : 'error'
          }
          sx={{ mb: 2 }}
        >
          {selectedOption === exercise.correctAnswer
            ? '✅ Correct ! Bien joué !'
            : '❌ Incorrect. La bonne réponse était mise en vert.'}
        </Alert>
      )}

      {/* Submit button */}
      {!showFeedback && (
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleSubmit}
          disabled={!selectedOption}
        >
          Valider
        </Button>
      )}
    </Box>
  )
}

export default TermToIconExercise
