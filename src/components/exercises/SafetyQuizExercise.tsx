/**
 * Safety Quiz Exercise Component
 * Multiple choice safety questions - must be answered correctly
 */

import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  Chip
} from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning'
import { Exercise, ExerciseResult } from '../../types'

interface SafetyQuizExerciseProps {
  exercise: Exercise
  onComplete: (result: ExerciseResult) => void
}

const SafetyQuizExercise: React.FC<SafetyQuizExerciseProps> = ({
  exercise,
  onComplete
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [startTime] = useState(Date.now())
  const [attempts, setAttempts] = useState(0)

  const handleSubmit = () => {
    if (!selectedOption) return

    setAttempts(prev => prev + 1)
    setShowFeedback(true)

    const isCorrect = selectedOption === exercise.correctAnswer
    const timeSpent = Date.now() - startTime

    // For safety quizzes, only proceed if correct
    if (isCorrect) {
      setTimeout(() => {
        const result: ExerciseResult = {
          exerciseId: exercise.id,
          isCorrect: true,
          timeSpent,
          attempts: attempts + 1,
          timestamp: new Date().toISOString(),
          userAnswer: selectedOption,
          correctAnswer: exercise.correctAnswer,
          hintsUsed: 0
        }
        onComplete(result)
      }, 2000)
    }
  }

  const handleRetry = () => {
    setSelectedOption(null)
    setShowFeedback(false)
  }

  const isCorrect = selectedOption === exercise.correctAnswer

  return (
    <Box>
      {/* Safety badge */}
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningIcon color="warning" />
        <Chip
          label="Question de sécurité"
          color="warning"
          variant="outlined"
          size="small"
        />
      </Box>

      {/* Question */}
      <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
        {exercise.question}
      </Typography>

      {/* Context */}
      {exercise.context && (
        <Alert severity="info" sx={{ mb: 3 }}>
          {exercise.context}
        </Alert>
      )}

      {/* Options */}
      <Box sx={{ mb: 3 }}>
        {exercise.options?.map((option) => (
          <Paper
            key={option.id}
            onClick={() => !showFeedback && setSelectedOption(option.id)}
            sx={{
              p: 2,
              mb: 2,
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
                  : selectedOption === option.id && showFeedback && !option.isCorrect
                  ? 'error.light'
                  : 'background.paper',
              transition: 'all 0.2s',
              '&:hover': !showFeedback
                ? {
                    bgcolor: 'action.hover'
                  }
                : {}
            }}
          >
            <Typography variant="body1">{option.value}</Typography>
          </Paper>
        ))}
      </Box>

      {/* Feedback */}
      {showFeedback && (
        <Alert
          severity={isCorrect ? 'success' : 'error'}
          sx={{ mb: 2 }}
        >
          {isCorrect ? (
            <>
              ✅ <strong>Correct !</strong> C'est une réponse appropriée pour
              votre sécurité.
            </>
          ) : (
            <>
              ❌ <strong>Incorrect.</strong> Cette question doit être réussie
              pour votre sécurité et celle de vos partenaires. Veuillez
              réessayer.
            </>
          )}
        </Alert>
      )}

      {/* Important note */}
      <Alert severity="warning" sx={{ mb: 2 }}>
        ⚠️ Cette question ne coûte pas de vie mais doit être réussie pour valider
        l'unité
      </Alert>

      {/* Action buttons */}
      {!showFeedback ? (
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleSubmit}
          disabled={!selectedOption}
        >
          Valider
        </Button>
      ) : !isCorrect ? (
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleRetry}
          color="warning"
        >
          Réessayer
        </Button>
      ) : null}
    </Box>
  )
}

export default SafetyQuizExercise
