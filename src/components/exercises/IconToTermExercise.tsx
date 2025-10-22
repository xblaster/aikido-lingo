/**
 * Icon to Term Exercise Component
 * Given an icon, choose the correct term from options
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

interface IconToTermExerciseProps {
  exercise: Exercise
  onComplete: (result: ExerciseResult) => void
}

const IconToTermExercise: React.FC<IconToTermExerciseProps> = ({
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

      {/* Icon display */}
      <Paper sx={{ p: 4, mb: 3, textAlign: 'center' }}>
        <IconRenderer
          iconData={exercise.terminologyItem.iconData}
          caption={exercise.terminologyItem.iconCaption}
          size="large"
        />
      </Paper>

      {/* Options */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {exercise.options?.map((option) => (
          <Grid item xs={6} key={option.id}>
            <Button
              variant={selectedOption === option.id ? 'contained' : 'outlined'}
              size="large"
              fullWidth
              onClick={() => handleOptionSelect(option.id)}
              disabled={showFeedback}
              sx={{
                p: 2,
                fontSize: '1.1rem',
                borderWidth: 2,
                borderColor:
                  showFeedback && option.isCorrect
                    ? 'success.main'
                    : showFeedback && selectedOption === option.id && !option.isCorrect
                    ? 'error.main'
                    : undefined,
                bgcolor:
                  showFeedback && option.isCorrect
                    ? 'success.light'
                    : showFeedback && selectedOption === option.id && !option.isCorrect
                    ? 'error.light'
                    : undefined
              }}
            >
              {option.value}
            </Button>
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
          {selectedOption === exercise.correctAnswer ? (
            <>
              ✅ Correct ! <strong>{exercise.terminologyItem.japanese}</strong> (
              {exercise.terminologyItem.romaji})
            </>
          ) : (
            <>
              ❌ Incorrect. C'était{' '}
              <strong>{exercise.terminologyItem.japanese}</strong> (
              {exercise.terminologyItem.romaji})
            </>
          )}
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

export default IconToTermExercise
