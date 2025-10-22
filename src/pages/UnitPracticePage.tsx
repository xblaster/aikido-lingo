/**
 * Unit Practice Page
 * Practice session for a specific unit
 */

import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Typography, Container } from '@mui/material'
import { useProgress } from '../contexts/ProgressContext'
import { getUnitById } from '../data/curriculum'
import { UnitProgress } from '../types'
import LearningUnit from '../components/LearningUnit'

const UnitPracticePage: React.FC = () => {
  const { unitId } = useParams<{ unitId: string }>()
  const navigate = useNavigate()
  const { completeUnitWithProgress } = useProgress()

  const unit = unitId ? getUnitById(unitId) : null

  const handleUnitComplete = (unitProgress: UnitProgress) => {
    if (!unit) return

    // Save progress
    completeUnitWithProgress(unit.id, unitProgress, unit.category)

    // Navigate to completion screen
    navigate(`/unit/${unit.id}/complete`, {
      state: { unitProgress }
    })
  }

  const handleExit = () => {
    navigate('/')
  }

  if (!unit) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5">Unité non trouvée</Typography>
      </Container>
    )
  }

  return (
    <LearningUnit
      unit={unit}
      onComplete={handleUnitComplete}
      onExit={handleExit}
    />
  )
}

export default UnitPracticePage
