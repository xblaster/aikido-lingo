/**
 * Complete curriculum organization
 * Organizes all learning units by belt level
 */

import { Curriculum } from '../types'
import { white5Unit1 } from './belts/white5Unit1'
import { white5Unit2 } from './belts/white5Unit2'
import { white5Unit3 } from './belts/white5Unit3'

/** Complete curriculum with all belt levels */
export const aikidoCurriculum: Curriculum = {
  belts: [
    {
      id: 'white_5_belt',
      level: 'white_5',
      name: '5ème Kyū - Ceinture blanche',
      description: 'Découvrez les fondamentaux de l\'aïkido : étiquette, positions et déplacements de base.',
      units: [white5Unit1, white5Unit2, white5Unit3],
      color: '#ffffff',
      unlockCondition: {
        type: 'always_unlocked'
      }
    }
    // Future belt levels will be added here
    // white_4, white_3, white_2, white_1, black_1, etc.
  ]
}

/** Helper: Get belt section by level */
export const getBeltByLevel = (beltLevel: string) => {
  return aikidoCurriculum.belts.find(belt => belt.level === beltLevel)
}

/** Helper: Get unit by ID */
export const getUnitById = (unitId: string) => {
  for (const belt of aikidoCurriculum.belts) {
    const unit = belt.units.find(u => u.id === unitId)
    if (unit) return unit
  }
  return null
}

/** Helper: Get all terminology items */
export const getAllTerminology = () => {
  const allTerms = []
  for (const belt of aikidoCurriculum.belts) {
    for (const unit of belt.units) {
      allTerms.push(...unit.terminology)
    }
  }
  return allTerms
}

/** Helper: Get terminology by ID */
export const getTerminologyById = (termId: string) => {
  const allTerms = getAllTerminology()
  return allTerms.find(term => term.id === termId)
}
