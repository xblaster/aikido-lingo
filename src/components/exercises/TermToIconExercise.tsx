/**
 * Term to Icon Exercise Component
 * Given a term, choose the correct icon from options
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
import {
  fadeInOut,
  staggerContainer,
  staggerItem,
  buttonPress,
  successBounce,
  errorShake,
} from '../../utils/animations'
import { useSoundEffects } from '../../hooks/useSoundEffects'
import { useHaptic } from '../../hooks/useHaptic'

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

  // Sound effects and haptic feedback
  const sounds = useSoundEffects()
  const haptic = useHaptic()

  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return
    setSelectedOption(optionId)
    // Light click feedback
    sounds.click()
    haptic.trigger('light')
  }

  const handleSubmit = () => {
    if (!selectedOption) return

    setAttempts(prev => prev + 1)
    setShowFeedback(true)

    const isCorrect = selectedOption === exercise.correctAnswer
    const timeSpent = Date.now() - startTime

    // Audio and haptic feedback based on result
    if (isCorrect) {
      sounds.success()
      haptic.trigger('success')
    } else {
      sounds.error()
      haptic.trigger('error')
    }

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
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Question */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        {exercise.question}
      </Typography>

      {/* Term information */}
      <Paper
        component={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        sx={{ p: 2, mb: 3, bgcolor: 'primary.light', color: 'white' }}
      >
        <Typography variant="h6">
          {exercise.terminologyItem.japanese} ({exercise.terminologyItem.romaji})
        </Typography>
        <Typography variant="body2">
          {exercise.terminologyItem.french}
        </Typography>
      </Paper>

      {/* Options grid */}
      <Grid
        container
        spacing={2}
        sx={{ mb: 3 }}
        component={motion.div}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {exercise.options?.map((option) => {
          const isSelected = selectedOption === option.id
          const isCorrectOption = option.isCorrect
          const shouldAnimate = showFeedback && isSelected

          return (
            <Grid item xs={6} key={option.id} component={motion.div} variants={staggerItem}>
              <Paper
                component={motion.div}
                variants={
                  shouldAnimate
                    ? isCorrectOption
                      ? successBounce
                      : errorShake
                    : undefined
                }
                initial="initial"
                animate={shouldAnimate ? 'animate' : undefined}
                onClick={() => handleOptionSelect(option.id)}
                whileHover={!showFeedback ? { scale: 1.05, y: -4 } : undefined}
                whileTap={!showFeedback ? { scale: 0.98 } : undefined}
                sx={{
                  p: 3,
                  cursor: showFeedback ? 'default' : 'pointer',
                  border: 2,
                  borderColor:
                    isSelected
                      ? showFeedback
                        ? isCorrectOption
                          ? 'success.main'
                          : 'error.main'
                        : 'primary.main'
                      : 'transparent',
                  bgcolor:
                    showFeedback && isCorrectOption
                      ? 'success.light'
                      : 'background.paper',
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
          )
        })}
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
      <AnimatePresence>
        {showFeedback && (
          <Alert
            component={motion.div}
            variants={fadeInOut}
            initial="initial"
            animate="animate"
            exit="exit"
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
      </AnimatePresence>

      {/* Submit button */}
      <AnimatePresence>
        {!showFeedback && (
          <Button
            component={motion.button}
            variants={buttonPress}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            exit={{ opacity: 0, scale: 0.9 }}
            variant="contained"
            size="large"
            fullWidth
            onClick={handleSubmit}
            disabled={!selectedOption}
          >
            Valider
          </Button>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default TermToIconExercise
