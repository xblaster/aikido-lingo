/**
 * Unit 1: Nikyo - Second Principle (3ème Kyū - Yellow Belt)
 * Wrist control technique with spiral motion
 */

import { TerminologyItem, LearningUnit, Exercise } from '@/types'

/** Terminology items for Yellow 3 Unit 1 - Nikyo */
export const yellow3Unit1Terminology: TerminologyItem[] = [
  {
    id: 'nikyo',
    japanese: '二教',
    romaji: 'nikyo',
    french: 'Deuxième principe',
    english: 'Second teaching',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'RotateCcw',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Contrôle du poignet',
    category: 'techniques',
    beltLevel: 'white_3',
    description: 'Deuxième principe de contrôle : torsion du poignet vers l\'extérieur. Technique de contrôle par pression sur l\'articulation radio-ulnaire. Peut se faire omote ou ura.',
    difficulty: 3,
    keywords: ['nikyo', 'second', 'wrist', 'poignet', 'control'],
    relatedTerms: ['ikkyo', 'sankyo', 'kote_mawashi', 'nikkajo']
  },
  {
    id: 'nikyo_omote',
    japanese: '二教表',
    romaji: 'ni-kyo o-mo-te',
    french: 'Nikyo face',
    english: 'Nikyo front',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'ArrowRight',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Entrée directe',
    category: 'techniques',
    beltLevel: 'white_3',
    description: 'Nikyo par entrée directe (omote). Mouvement vers l\'avant du partenaire. Casse l\'équilibre vers l\'avant puis applique torsion.',
    difficulty: 3,
    keywords: ['nikyo omote', 'front', 'direct', 'face', 'avant'],
    relatedTerms: ['nikyo', 'nikyo_ura', 'omote', 'irimi']
  },
  {
    id: 'nikyo_ura',
    japanese: '二教裏',
    romaji: 'ni-kyo u-ra',
    french: 'Nikyo revers',
    english: 'Nikyo back',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'RotateCw',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Entrée en pivot',
    category: 'techniques',
    beltLevel: 'white_3',
    description: 'Nikyo par pivot (ura). Mouvement circulaire derrière le partenaire. Pivot puis application de la torsion. Plus fluide que omote.',
    difficulty: 3,
    keywords: ['nikyo ura', 'back', 'pivot', 'revers', 'circulaire'],
    relatedTerms: ['nikyo', 'nikyo_omote', 'ura', 'tenkan']
  },
  {
    id: 'nikkajo',
    japanese: '二教上',
    romaji: 'ni-kka-jo',
    french: 'Verrouillage nikyo',
    english: 'Nikyo lock',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'Lock',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Position de contrôle',
    category: 'techniques',
    beltLevel: 'white_3',
    description: 'Position finale de nikyo au sol. Poignet tordu, coude au sol, pression sur articulation. Immobilisation complète et contrôle total.',
    difficulty: 3,
    keywords: ['nikkajo', 'pin', 'lock', 'immobilisation', 'osae'],
    relatedTerms: ['nikyo', 'osae_waza', 'katame_waza']
  },
  {
    id: 'kote_mawashi',
    japanese: '小手回し',
    romaji: 'ko-te ma-wa-shi',
    french: 'Rotation du poignet',
    english: 'Wrist rotation',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'RefreshCw',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Torsion circulaire',
    category: 'techniques',
    beltLevel: 'white_3',
    description: 'Principe de rotation du poignet utilisé dans nikyo. Mouvement circulaire qui engage l\'articulation radio-ulnaire. Base de plusieurs techniques.',
    difficulty: 3,
    keywords: ['kote mawashi', 'wrist', 'rotation', 'poignet', 'twist'],
    relatedTerms: ['nikyo', 'kote_gaeshi', 'tekubi']
  },
  {
    id: 'tekubi_osae',
    japanese: '手首抑え',
    romaji: 'te-ku-bi o-sa-e',
    french: 'Contrôle du poignet',
    english: 'Wrist control',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'Grip',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Maintien du poignet',
    category: 'techniques',
    beltLevel: 'white_3',
    description: 'Technique générale de contrôle du poignet. Maintien ferme mais pas rigide. Contrôle l\'articulation sans forcer.',
    difficulty: 2,
    keywords: ['tekubi', 'osae', 'wrist', 'control', 'poignet'],
    relatedTerms: ['nikyo', 'kotegaeshi', 'osae_waza']
  },
  {
    id: 'radio_ulnar_joint',
    japanese: '橈尺関節',
    romaji: 'to-sha-ku kan-se-tsu',
    french: 'Articulation radio-ulnaire',
    english: 'Radio-ulnar joint',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'GitBranch',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Point de pression',
    category: 'principles',
    beltLevel: 'white_3',
    description: 'Articulation entre radius et ulna (os de l\'avant-bras). Point focal de nikyo. Pression ici cause inconfort et contrôle sans dommage si appliqué correctement.',
    difficulty: 4,
    keywords: ['radio', 'ulnar', 'joint', 'articulation', 'anatomy'],
    relatedTerms: ['nikyo', 'kansetsu_waza', 'kotegaeshi']
  },
  {
    id: 'spiral_motion',
    japanese: '螺旋運動',
    romaji: 'ra-sen un-do',
    french: 'Mouvement spiral',
    english: 'Spiral movement',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'TrendingUp',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Torsion hélicoïdale',
    category: 'principles',
    beltLevel: 'white_3',
    description: 'Mouvement en spirale utilisé dans nikyo et sankyo. Crée rotation tridimensionnelle. Plus efficace que force linéaire.',
    difficulty: 4,
    keywords: ['spiral', 'helix', 'rotation', 'spirale', 'torsion'],
    relatedTerms: ['nikyo', 'sankyo', 'kote_mawashi']
  },
  {
    id: 'gradual_pressure',
    japanese: '徐々に圧力',
    romaji: 'jo-jo-ni a-tsu-ryo-ku',
    french: 'Pression graduelle',
    english: 'Gradual pressure',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'Gauge',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Application progressive',
    category: 'principles',
    beltLevel: 'white_3',
    description: 'PRINCIPE DE SÉCURITÉ : Appliquer nikyo graduellement, jamais brusquement. Permet au partenaire de taper si nécessaire. Prévient blessures.',
    difficulty: 2,
    keywords: ['gradual', 'pressure', 'graduel', 'sécurité', 'safety'],
    relatedTerms: ['nikyo', 'tap_signal', 'safety']
  },
  {
    id: 'nikyo_from_katate',
    japanese: '片手取りから二教',
    romaji: 'ka-ta-te do-ri ka-ra ni-kyo',
    french: 'Nikyo depuis saisie simple',
    english: 'Nikyo from one-hand grab',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'Hand',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Application standard',
    category: 'techniques',
    beltLevel: 'white_3',
    description: 'Application de nikyo depuis katate dori (saisie d\'une main). Forme d\'entrée la plus commune pour apprendre le principe.',
    difficulty: 3,
    keywords: ['nikyo', 'katate dori', 'grab', 'saisie', 'application'],
    relatedTerms: ['nikyo', 'katate_dori', 'omote', 'ura']
  }
]

/** Generate exercises for Yellow 3 Unit 1 */
function generateYellow3Unit1Exercises(): Exercise[] {
  const exercises: Exercise[] = []

  // Exercise 1: Term to Icon - nikyo
  exercises.push({
    id: 'yellow3_unit1_ex1',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Nikyo" (deuxième principe) ?',
    terminologyItem: yellow3Unit1Terminology[0],
    options: [
      {
        id: 'opt1',
        value: 'Contrôle du poignet',
        iconData: yellow3Unit1Terminology[0].iconData,
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Entrée directe',
        iconData: yellow3Unit1Terminology[1].iconData,
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Verrouillage',
        iconData: yellow3Unit1Terminology[3].iconData,
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Rotation simple',
        iconData: yellow3Unit1Terminology[4].iconData,
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    hint: 'Nikyo = deuxième enseignement, technique de torsion du poignet',
    difficulty: 2,
    estimatedTime: 15
  })

  // Exercise 2: Icon to Term - nikyo omote vs ura
  exercises.push({
    id: 'yellow3_unit1_ex2',
    type: 'icon_to_term',
    question: 'Quelle variante de nikyo est représentée ?',
    terminologyItem: yellow3Unit1Terminology[1], // nikyo omote
    options: [
      { id: 'opt1', value: 'Nikyo omote (direct)', isCorrect: true },
      { id: 'opt2', value: 'Nikyo ura (pivot)', isCorrect: false },
      { id: 'opt3', value: 'Nikkajo (verrouillage)', isCorrect: false },
      { id: 'opt4', value: 'Kote mawashi (rotation)', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Omote = entrée directe vers l\'avant',
    difficulty: 3,
    estimatedTime: 15
  })

  // Exercise 3: SAFETY QUIZ - gradual pressure (CRITICAL)
  exercises.push({
    id: 'yellow3_unit1_ex3_safety',
    type: 'safety_quiz',
    question: 'Comment devez-vous appliquer la pression dans nikyo ?',
    terminologyItem: yellow3Unit1Terminology[8], // gradual_pressure
    options: [
      {
        id: 'opt1',
        value: 'Graduellement et progressivement',
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Rapidement pour surprendre',
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Avec force maximale immédiate',
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'En saccades pour tester',
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    context: 'CRITIQUE : Nikyo appliqué brusquement peut causer blessure sérieuse. TOUJOURS graduel pour permettre au partenaire de taper.',
    difficulty: 1,
    estimatedTime: 20
  })

  // Exercise 4: Term to Icon - kote mawashi
  exercises.push({
    id: 'yellow3_unit1_ex4',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Kote mawashi" (rotation du poignet) ?',
    terminologyItem: yellow3Unit1Terminology[4],
    options: [
      {
        id: 'opt1',
        value: 'Torsion circulaire',
        iconData: yellow3Unit1Terminology[4].iconData,
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Contrôle simple',
        iconData: yellow3Unit1Terminology[5].iconData,
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Verrouillage',
        iconData: yellow3Unit1Terminology[3].iconData,
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Mouvement spiral',
        iconData: yellow3Unit1Terminology[7].iconData,
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    hint: 'Kote = poignet, mawashi = rotation circulaire',
    difficulty: 3,
    estimatedTime: 15
  })

  // Exercise 5: Icon to Term - nikkajo
  exercises.push({
    id: 'yellow3_unit1_ex5',
    type: 'icon_to_term',
    question: 'Quelle est la position finale de nikyo ?',
    terminologyItem: yellow3Unit1Terminology[3], // nikkajo
    options: [
      { id: 'opt1', value: 'Nikkajo (verrouillage)', isCorrect: true },
      { id: 'opt2', value: 'Nikyo omote', isCorrect: false },
      { id: 'opt3', value: 'Tekubi osae', isCorrect: false },
      { id: 'opt4', value: 'Kote mawashi', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Jo = position fixe, immobilisation au sol',
    difficulty: 3,
    estimatedTime: 15
  })

  // Exercise 6: Term to Icon - spiral motion
  exercises.push({
    id: 'yellow3_unit1_ex6',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Rasen undo" (mouvement spiral) ?',
    terminologyItem: yellow3Unit1Terminology[7],
    options: [
      {
        id: 'opt1',
        value: 'Torsion hélicoïdale',
        iconData: yellow3Unit1Terminology[7].iconData,
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Rotation simple',
        iconData: yellow3Unit1Terminology[4].iconData,
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Pivot circulaire',
        iconData: yellow3Unit1Terminology[2].iconData,
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Point de pression',
        iconData: yellow3Unit1Terminology[6].iconData,
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    hint: 'Rasen = spirale tridimensionnelle',
    difficulty: 4,
    estimatedTime: 15
  })

  // Exercise 7: SAFETY QUIZ - anatomy awareness
  exercises.push({
    id: 'yellow3_unit1_ex7_safety',
    type: 'safety_quiz',
    question: 'Sur quelle articulation nikyo exerce-t-il une pression ?',
    terminologyItem: yellow3Unit1Terminology[6], // radio_ulnar_joint
    options: [
      {
        id: 'opt1',
        value: 'L\'articulation radio-ulnaire (avant-bras)',
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Le coude',
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'L\'épaule',
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Les doigts',
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    context: 'Comprendre l\'anatomie aide à appliquer nikyo correctement et en sécurité.',
    difficulty: 3,
    estimatedTime: 20
  })

  // Exercise 8: Icon to Term - nikyo ura
  exercises.push({
    id: 'yellow3_unit1_ex8',
    type: 'icon_to_term',
    question: 'Quelle entrée circulaire de nikyo est représentée ?',
    terminologyItem: yellow3Unit1Terminology[2], // nikyo_ura
    options: [
      { id: 'opt1', value: 'Nikyo ura (pivot)', isCorrect: true },
      { id: 'opt2', value: 'Nikyo omote (direct)', isCorrect: false },
      { id: 'opt3', value: 'Kote mawashi', isCorrect: false },
      { id: 'opt4', value: 'Nikkajo', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Ura = revers, mouvement circulaire par l\'arrière',
    difficulty: 3,
    estimatedTime: 15
  })

  // Exercise 9: Free Recall - nikyo applications
  exercises.push({
    id: 'yellow3_unit1_ex9_recall',
    type: 'free_recall',
    question: 'Expliquez la différence entre nikyo omote et nikyo ura',
    terminologyItem: yellow3Unit1Terminology[0], // nikyo
    options: [
      { id: 'hard', value: 'Je ne sais pas', isCorrect: false },
      { id: 'medium', value: 'Je connais vaguement', isCorrect: false },
      { id: 'good', value: 'Je peux expliquer la différence', isCorrect: true },
      { id: 'easy', value: 'Je peux démontrer les deux', isCorrect: true }
    ],
    correctAnswer: 'good',
    hint: 'Omote = direct vers l\'avant, Ura = circulaire par pivot',
    difficulty: 4,
    estimatedTime: 25
  })

  // Exercise 10: SAFETY QUIZ - partner communication
  exercises.push({
    id: 'yellow3_unit1_ex10_safety',
    type: 'safety_quiz',
    question: 'Que faites-vous si votre partenaire montre des signes d\'inconfort pendant nikyo ?',
    terminologyItem: yellow3Unit1Terminology[8], // gradual_pressure
    options: [
      {
        id: 'opt1',
        value: 'Relâcher immédiatement et vérifier',
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Continuer mais plus doucement',
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Finir rapidement la technique',
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Demander s\'il peut continuer',
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    context: 'La sécurité du partenaire est TOUJOURS la priorité. Relâcher immédiatement au moindre signe d\'inconfort.',
    difficulty: 2,
    estimatedTime: 20
  })

  return exercises
}

/** Complete Yellow 3 Unit 1 export */
export const yellow3Unit1: LearningUnit = {
  id: 'yellow3_unit1',
  title: 'Nikyo - Deuxième principe',
  description: 'Maîtrisez le contrôle du poignet par torsion. Technique subtile nécessitant précision et sensibilité.',

  beltLevel: 'white_3',
  category: 'techniques',

  terminology: yellow3Unit1Terminology,
  exercises: generateYellow3Unit1Exercises(),

  targetScore: 80,
  estimatedTime: 25,

  prerequisites: ['white5_unit5', 'white4_unit3'], // After ikkyo and basic kamae
  isSafetyCritical: true // Joint locks are safety-critical
}
