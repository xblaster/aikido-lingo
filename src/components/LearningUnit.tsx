/**
 * Learning Unit Component
 * Orchestrates exercises with hearts system and progress tracking
 */

import React, { useState } from 'react'
import { Box, Container, IconButton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { LearningUnit as LearningUnitType, ExerciseResult, UnitProgress } from '../types'
import { MAX_HEARTS } from '../utils/constants'
import { calculateScore } from '../services/progressTracking'
import ProgressBar from './common/ProgressBar'
import Hearts from './common/Hearts'
import TermToIconExercise from './exercises/TermToIconExercise'
import IconToTermExercise from './exercises/IconToTermExercise'
import SafetyQuizExercise from './exercises/SafetyQuizExercise'
import FreeRecallExercise from './exercises/FreeRecallExercise'

interface LearningUnitProps {
  unit: LearningUnitType
  onComplete: (unitProgress: UnitProgress) => void
  onExit: () => void
}

const LearningUnit: React.FC<LearningUnitProps> = ({ unit, onComplete, onExit }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<ExerciseResult[]>([])
  const [hearts, setHearts] = useState(MAX_HEARTS)
  const [startTime] = useState(new Date().toISOString())

  const currentExercise = unit.exercises[currentExerciseIndex]
  const progress = calculateScore(completedExercises)

  const handleExerciseComplete = (result: ExerciseResult) => {
    const updatedCompleted = [...completedExercises, result]
    setCompletedExercises(updatedCompleted)

    // Lose a heart on incorrect answer (except safety quizzes)
    if (!result.isCorrect && currentExercise.type !== 'safety_quiz') {
      setHearts(prev => Math.max(0, prev - 1))
    }

    // Check if unit is failed (no hearts left)
    if (hearts <= 1 && !result.isCorrect && currentExercise.type !== 'safety_quiz') {
      // Unit failed
      const unitProgress: UnitProgress = {
        unitId: unit.id,
        currentExerciseIndex: currentExerciseIndex + 1,
        completedExercises: updatedCompleted,
        score: calculateScore(updatedCompleted),
        hearts: 0,
        isCompleted: false,
        startedAt: startTime
      }
      onComplete(unitProgress)
      return
    }

    // Move to next exercise
    if (currentExerciseIndex < unit.exercises.length - 1) {
      setTimeout(() => {
        setCurrentExerciseIndex(prev => prev + 1)
      }, 100)
    } else {
      // Unit completed
      const finalScore = calculateScore(updatedCompleted)
      const unitProgress: UnitProgress = {
        unitId: unit.id,
        currentExerciseIndex: unit.exercises.length,
        completedExercises: updatedCompleted,
        score: finalScore,
        hearts,
        isCompleted: true,
        startedAt: startTime,
        completedAt: new Date().toISOString()
      }
      onComplete(unitProgress)
    }
  }

  const renderExercise = () => {
    switch (currentExercise.type) {
      case 'term_to_icon':
        return (
          <TermToIconExercise
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
          />
        )
      case 'icon_to_term':
        return (
          <IconToTermExercise
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
          />
        )
      case 'safety_quiz':
        return (
          <SafetyQuizExercise
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
          />
        )
      case 'free_recall':
        return (
          <FreeRecallExercise
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
          />
        )
      default:
        return <Typography>Type d'exercice non supporté</Typography>
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', py: 3 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, px: 2 }}>
          <IconButton onClick={onExit} size="large">
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, mx: 2 }}>
            <ProgressBar
              current={currentExerciseIndex}
              total={unit.exercises.length}
              percentage={progress}
            />
          </Box>
          <Hearts current={hearts} />
        </Box>

        {/* Exercise (Glassmorphism) */}
        <Box
          sx={{
            p: { xs: 2, sm: 4 },
            mt: 3,
            borderRadius: '16px',
            bgcolor: 'rgba(42, 42, 42, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
            {currentExercise.question}
          </Typography>
          {renderExercise()}
        </Box>
      </Container>
    </Box>
  );
};

export default LearningUnit
