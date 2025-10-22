/**
 * Complete curriculum organization
 * Organizes all learning units by belt level
 */

import { Curriculum } from '../types'
import { white5Unit1 } from './belts/white5Unit1'
import { white5Unit2 } from './belts/white5Unit2'
import { white5Unit3 } from './belts/white5Unit3'
import { white5Unit4 } from './belts/white5Unit4'
import { white5Unit5 } from './belts/white5Unit5'
import { white4Unit1 } from './belts/white4Unit1'
import { yellow3Unit1 } from './belts/yellow3Unit1'
import { orange1Unit1 } from './belts/orange1Unit1'
import { orange1Unit2 } from './belts/orange1Unit2'
import { orange1Unit3 } from './belts/orange1Unit3'
import { orange1Unit4 } from './belts/orange1Unit4'
import { orange1Unit5 } from './belts/orange1Unit5'
import { orange1Unit6 } from './belts/orange1Unit6'
import { black1Unit1 } from './belts/black1Unit1'
import { black1Unit2 } from './belts/black1Unit2'
import { black1Unit3 } from './belts/black1Unit3'
import { black1Unit4 } from './belts/black1Unit4'
import { black1Unit5 } from './belts/black1Unit5'
import { black1Unit6 } from './belts/black1Unit6'

/** Complete curriculum with all belt levels */
export const aikidoCurriculum: Curriculum = {
  belts: [
    {
      id: 'white_5_belt',
      level: 'white_5',
      name: '5ème Kyū - Ceinture blanche',
      description: 'Découvrez les fondamentaux de l\'aïkido : étiquette, positions et déplacements de base.',
      units: [white5Unit1, white5Unit2, white5Unit3, white5Unit4, white5Unit5],
      color: '#ffffff',
      unlockCondition: {
        type: 'always_unlocked'
      }
    },
    {
      id: 'white_4_belt',
      level: 'white_4',
      name: '4ème Kyū - Ceinture blanche avancée',
      description: 'Approfondissez vos connaissances avec des positions et mouvements plus avancés.',
      units: [white4Unit1],
      color: '#f5f5f5',
      unlockCondition: {
        type: 'previous_belt_complete',
        requiredBeltId: 'white_5_belt'
      }
    },
    {
      id: 'yellow_3_belt',
      level: 'yellow_3',
      name: '3ème Kyū - Ceinture jaune',
      description: 'Maîtrisez les techniques de contrôle et les principes fondamentaux.',
      units: [yellow3Unit1],
      color: '#ffd700',
      unlockCondition: {
        type: 'previous_belt_complete',
        requiredBeltId: 'white_4_belt'
      }
    },
    {
      id: 'orange_1_belt',
      level: 'orange_1',
      name: '1er Kyū - Ceinture orange',
      description: 'Techniques avancées, variations et applications philosophiques.',
      units: [orange1Unit1, orange1Unit2, orange1Unit3, orange1Unit4, orange1Unit5, orange1Unit6],
      color: '#ff8c00',
      unlockCondition: {
        type: 'previous_belt_complete',
        requiredBeltId: 'yellow_3_belt'
      }
    },
    {
      id: 'black_1_belt',
      level: 'black_1',
      name: '1er Dan - Ceinture noire',
      description: 'Enseignement, maîtrise des armes, philosophie d\'O-Sensei et le chemin continu.',
      units: [black1Unit1, black1Unit2, black1Unit3, black1Unit4, black1Unit5, black1Unit6],
      color: '#000000',
      unlockCondition: {
        type: 'previous_belt_complete',
        requiredBeltId: 'orange_1_belt'
      }
    }
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
