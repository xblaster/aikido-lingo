/**
 * Unit 1: Irimi Nage - Entering Throw (1er Kyū - Orange Belt)
 * Advanced entering technique with multiple variations
 */

import { TerminologyItem, LearningUnit, Exercise } from '@/types'

/** Terminology items for Orange 1 Unit 1 - Irimi Nage */
export const orange1Unit1Terminology: TerminologyItem[] = [
  {
    id: 'irimi_nage',
    japanese: '入身投げ',
    romaji: 'i-ri-mi na-ge',
    french: 'Projection par entrée',
    english: 'Entering throw',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'MoveRight',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Entrée directe et projection',
    category: 'techniques',
    beltLevel: 'white_1',
    description: 'Technique d\'entrée directe suivie d\'une projection. Irimi (entrée) combiné avec nage (projection). Nécessite timing parfait et contrôle du centre.',
    difficulty: 4,
    keywords: ['irimi nage', 'entering', 'throw', 'projection', 'entrée'],
    relatedTerms: ['irimi', 'nage', 'tenkan', 'timing']
  },
  {
    id: 'irimi_nage_shomen',
    japanese: '正面打ち入身投げ',
    romaji: 'sho-men u-chi i-ri-mi na-ge',
    french: 'Irimi nage sur frappe frontale',
    english: 'Irimi nage from front strike',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'ChevronsDown',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Contre attaque frontale',
    category: 'techniques',
    beltLevel: 'white_1',
    description: 'Application d\'irimi nage contre shomen uchi. Entrée sous la frappe, pivot et projection. Forme classique pour apprendre le timing.',
    difficulty: 4,
    keywords: ['irimi nage', 'shomen', 'strike', 'frappe', 'timing'],
    relatedTerms: ['irimi_nage', 'shomen_uchi', 'timing', 'ma_ai']
  },
  {
    id: 'irimi_nage_katate',
    japanese: '片手取り入身投げ',
    romaji: 'ka-ta-te do-ri i-ri-mi na-ge',
    french: 'Irimi nage sur saisie simple',
    english: 'Irimi nage from one-hand grab',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'Hand',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Depuis saisie poignet',
    category: 'techniques',
    beltLevel: 'white_1',
    description: 'Irimi nage depuis katate dori. Entrée profonde, atemi au visage, pivot et projection. Variation courante nécessitant fluidité.',
    difficulty: 4,
    keywords: ['irimi nage', 'katate', 'grab', 'saisie', 'atemi'],
    relatedTerms: ['irimi_nage', 'katate_dori', 'atemi', 'kuzushi']
  },
  {
    id: 'irimi_nage_timing',
    japanese: '入身投げタイミング',
    romaji: 'i-ri-mi na-ge ta-i-min-gu',
    french: 'Timing d\'irimi nage',
    english: 'Irimi nage timing',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'Clock',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Synchronisation parfaite',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Le timing est critique pour irimi nage. Entrer ni trop tôt ni trop tard. Synchroniser avec le mouvement de uke. L\'instant parfait crée l\'ouverture.',
    difficulty: 5,
    keywords: ['timing', 'irimi', 'synchronization', 'ma', 'moment'],
    relatedTerms: ['irimi_nage', 'ma_ai', 'sen', 'awase']
  },
  {
    id: 'irimi_atemi',
    japanese: '入身当て身',
    romaji: 'i-ri-mi a-te-mi',
    french: 'Atemi d\'entrée',
    english: 'Entering strike',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'Target',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Frappe pendant entrée',
    category: 'techniques',
    beltLevel: 'white_1',
    description: 'Atemi (frappe de distraction) pendant l\'entrée d\'irimi nage. Vise le visage ou la gorge. Brise la posture et crée l\'ouverture pour la projection.',
    difficulty: 4,
    keywords: ['atemi', 'strike', 'irimi', 'distraction', 'kuzushi'],
    relatedTerms: ['irimi_nage', 'atemi', 'kuzushi', 'maai']
  },
  {
    id: 'irimi_pivot',
    japanese: '入身回転',
    romaji: 'i-ri-mi kai-ten',
    french: 'Pivot d\'irimi',
    english: 'Irimi pivot',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'RotateCw',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Rotation après entrée',
    category: 'movements',
    beltLevel: 'white_1',
    description: 'Pivot de 180° après l\'entrée. Bras guide la tête de uke. Hanches génèrent la puissance. Mouvement doit être fluide et continu.',
    difficulty: 4,
    keywords: ['pivot', 'rotation', 'irimi', 'tenkan', 'kaiten'],
    relatedTerms: ['irimi_nage', 'tenkan', 'kaiten', 'koshi']
  },
  {
    id: 'neck_safety_irimi',
    japanese: '首の安全',
    romaji: 'ku-bi no an-zen',
    french: 'Sécurité du cou',
    english: 'Neck safety',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'ShieldAlert',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Protection cervicale critique',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'SÉCURITÉ CRITIQUE : Contrôler la tête, jamais serrer le cou. Bras guide, ne comprime pas. Uke doit pouvoir respirer et taper. Pression excessive = danger.',
    difficulty: 2,
    keywords: ['safety', 'neck', 'cou', 'sécurité', 'protection'],
    relatedTerms: ['irimi_nage', 'safety', 'tap_signal', 'uke']
  },
  {
    id: 'irimi_nage_ushiro',
    japanese: '後ろ入身投げ',
    romaji: 'u-shi-ro i-ri-mi na-ge',
    french: 'Irimi nage arrière',
    english: 'Rear irimi nage',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'MoveLeft',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Depuis saisie arrière',
    category: 'techniques',
    beltLevel: 'white_1',
    description: 'Irimi nage depuis attaque par l\'arrière. Pivoter, entrer, projeter. Plus complexe que version frontale. Nécessite awareness et timing supérieur.',
    difficulty: 5,
    keywords: ['ushiro', 'rear', 'back', 'arrière', 'irimi'],
    relatedTerms: ['irimi_nage', 'ushiro', 'tenkan', 'zanshin']
  },
  {
    id: 'irimi_control_fall',
    japanese: '入身投げ落下制御',
    romaji: 'i-ri-mi na-ge ra-kka se-i-gyo',
    french: 'Contrôle de la chute',
    english: 'Fall control',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'ArrowDownCircle',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Guidage de la descente',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Contrôler la descente de uke pendant irimi nage. Maintenir connection jusqu\'au sol. Guider, ne pas lâcher brusquement. Assure ukemi sécuritaire.',
    difficulty: 4,
    keywords: ['control', 'fall', 'chute', 'ukemi', 'safety'],
    relatedTerms: ['irimi_nage', 'ukemi', 'zanshin', 'musubi']
  },
  {
    id: 'irimi_multiple_attacks',
    japanese: '入身投げ複数攻撃',
    romaji: 'i-ri-mi na-ge fu-ku-su ko-ge-ki',
    french: 'Irimi nage attaques multiples',
    english: 'Irimi nage multiple attacks',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'Users',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Applications variées',
    category: 'techniques',
    beltLevel: 'white_1',
    description: 'Irimi nage fonctionne contre multiples types d\'attaques : shomen, yokomen, katate, ryote, munetsuki. Principe reste le même : timing, entrée, projection.',
    difficulty: 5,
    keywords: ['multiple', 'attacks', 'variations', 'applications', 'henka'],
    relatedTerms: ['irimi_nage', 'henka_waza', 'jiyu_waza', 'adaptability']
  }
]

/** Generate exercises for Orange 1 Unit 1 */
function generateOrange1Unit1Exercises(): Exercise[] {
  const exercises: Exercise[] = []

  // Exercise 1: Term to Icon - irimi nage
  exercises.push({
    id: 'orange1_unit1_ex1',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Irimi nage" (projection par entrée) ?',
    terminologyItem: orange1Unit1Terminology[0],
    options: [
      {
        id: 'opt1',
        value: 'Entrée directe et projection',
        iconData: orange1Unit1Terminology[0].iconData,
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Pivot après entrée',
        iconData: orange1Unit1Terminology[5].iconData,
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Contrôle de chute',
        iconData: orange1Unit1Terminology[8].iconData,
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Frappe d\'entrée',
        iconData: orange1Unit1Terminology[4].iconData,
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    hint: 'Irimi = entrée, nage = projection',
    difficulty: 3,
    estimatedTime: 15
  })

  // Exercise 2: SAFETY QUIZ - neck safety (CRITICAL)
  exercises.push({
    id: 'orange1_unit1_ex2_safety',
    type: 'safety_quiz',
    question: 'Comment devez-vous contrôler la tête dans irimi nage ?',
    terminologyItem: orange1Unit1Terminology[6], // neck_safety
    options: [
      {
        id: 'opt1',
        value: 'Guider la tête sans comprimer le cou',
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Serrer fermement le cou',
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Appliquer pression sur la gorge',
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Bloquer la respiration momentanément',
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    context: 'CRITIQUE : Le cou est fragile. Contrôler la tête, JAMAIS comprimer le cou. Uke doit toujours pouvoir respirer et taper.',
    difficulty: 1,
    estimatedTime: 20
  })

  // Exercise 3: Icon to Term - timing
  exercises.push({
    id: 'orange1_unit1_ex3',
    type: 'icon_to_term',
    question: 'Quel principe est essentiel pour réussir irimi nage ?',
    terminologyItem: orange1Unit1Terminology[3], // timing
    options: [
      { id: 'opt1', value: 'Timing parfait (synchronisation)', isCorrect: true },
      { id: 'opt2', value: 'Force physique', isCorrect: false },
      { id: 'opt3', value: 'Vitesse maximale', isCorrect: false },
      { id: 'opt4', value: 'Rigidité du corps', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Irimi nage nécessite synchronisation parfaite avec le mouvement de uke',
    difficulty: 4,
    estimatedTime: 15
  })

  // Exercise 4: Term to Icon - shomen variation
  exercises.push({
    id: 'orange1_unit1_ex4',
    type: 'term_to_icon',
    question: 'Quelle icône représente irimi nage contre shomen uchi ?',
    terminologyItem: orange1Unit1Terminology[1],
    options: [
      {
        id: 'opt1',
        value: 'Contre frappe frontale',
        iconData: orange1Unit1Terminology[1].iconData,
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Depuis saisie poignet',
        iconData: orange1Unit1Terminology[2].iconData,
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Depuis arrière',
        iconData: orange1Unit1Terminology[7].iconData,
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Frappe d\'entrée',
        iconData: orange1Unit1Terminology[4].iconData,
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    hint: 'Shomen = frappe verticale frontale',
    difficulty: 3,
    estimatedTime: 15
  })

  // Exercise 5: Icon to Term - atemi
  exercises.push({
    id: 'orange1_unit1_ex5',
    type: 'icon_to_term',
    question: 'Quel élément brise la posture pendant l\'entrée ?',
    terminologyItem: orange1Unit1Terminology[4], // atemi
    options: [
      { id: 'opt1', value: 'Atemi (frappe de distraction)', isCorrect: true },
      { id: 'opt2', value: 'Pivot rapide', isCorrect: false },
      { id: 'opt3', value: 'Pression au cou', isCorrect: false },
      { id: 'opt4', value: 'Saisie forte', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Frappe au visage ou gorge crée l\'ouverture',
    difficulty: 4,
    estimatedTime: 15
  })

  // Exercise 6: Term to Icon - pivot
  exercises.push({
    id: 'orange1_unit1_ex6',
    type: 'term_to_icon',
    question: 'Quelle icône représente le pivot après l\'entrée ?',
    terminologyItem: orange1Unit1Terminology[5],
    options: [
      {
        id: 'opt1',
        value: 'Rotation après entrée',
        iconData: orange1Unit1Terminology[5].iconData,
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Entrée directe',
        iconData: orange1Unit1Terminology[0].iconData,
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Timing',
        iconData: orange1Unit1Terminology[3].iconData,
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Contrôle chute',
        iconData: orange1Unit1Terminology[8].iconData,
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    hint: 'Pivot de 180° après l\'entrée',
    difficulty: 3,
    estimatedTime: 15
  })

  // Exercise 7: SAFETY QUIZ - fall control
  exercises.push({
    id: 'orange1_unit1_ex7_safety',
    type: 'safety_quiz',
    question: 'Comment devez-vous gérer la chute de uke dans irimi nage ?',
    terminologyItem: orange1Unit1Terminology[8], // fall control
    options: [
      {
        id: 'opt1',
        value: 'Maintenir connection et guider jusqu\'au sol',
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Lâcher immédiatement après projection',
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Pousser fort et lâcher',
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Laisser uke gérer seul',
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    context: 'Contrôler la descente assure un ukemi sécuritaire. Ne jamais lâcher brusquement.',
    difficulty: 2,
    estimatedTime: 20
  })

  // Exercise 8: Icon to Term - rear application
  exercises.push({
    id: 'orange1_unit1_ex8',
    type: 'icon_to_term',
    question: 'Quelle est la version la plus complexe d\'irimi nage ?',
    terminologyItem: orange1Unit1Terminology[7], // ushiro
    options: [
      { id: 'opt1', value: 'Ushiro irimi nage (depuis arrière)', isCorrect: true },
      { id: 'opt2', value: 'Shomen irimi nage', isCorrect: false },
      { id: 'opt3', value: 'Katate irimi nage', isCorrect: false },
      { id: 'opt4', value: 'Irimi nage basique', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Depuis l\'arrière nécessite awareness supérieur',
    difficulty: 5,
    estimatedTime: 15
  })

  // Exercise 9: Free Recall - principles
  exercises.push({
    id: 'orange1_unit1_ex9_recall',
    type: 'free_recall',
    question: 'Expliquez les trois phases d\'irimi nage : entrée, atemi, projection',
    terminologyItem: orange1Unit1Terminology[0],
    options: [
      { id: 'hard', value: 'Je ne sais pas', isCorrect: false },
      { id: 'medium', value: 'Je connais vaguement', isCorrect: false },
      { id: 'good', value: 'Je peux décrire les trois phases', isCorrect: true },
      { id: 'easy', value: 'Je peux démontrer fluidement', isCorrect: true }
    ],
    correctAnswer: 'good',
    hint: '1) Irimi (timing parfait), 2) Atemi (distraction), 3) Kaiten + nage (projection)',
    difficulty: 4,
    estimatedTime: 30
  })

  // Exercise 10: Term to Icon - multiple attacks
  exercises.push({
    id: 'orange1_unit1_ex10',
    type: 'term_to_icon',
    question: 'Irimi nage peut s\'appliquer contre quels types d\'attaques ?',
    terminologyItem: orange1Unit1Terminology[9],
    options: [
      {
        id: 'opt1',
        value: 'Multiples attaques variées',
        iconData: orange1Unit1Terminology[9].iconData,
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Uniquement shomen',
        iconData: orange1Unit1Terminology[1].iconData,
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Uniquement katate',
        iconData: orange1Unit1Terminology[2].iconData,
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Uniquement ushiro',
        iconData: orange1Unit1Terminology[7].iconData,
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    hint: 'Principe universel applicable à de nombreuses situations',
    difficulty: 4,
    estimatedTime: 15
  })

  return exercises
}

/** Complete Orange 1 Unit 1 export */
export const orange1Unit1: LearningUnit = {
  id: 'orange1_unit1',
  title: 'Irimi Nage - Projection par entrée',
  description: 'Maîtrisez la technique d\'entrée directe avec timing parfait. Technique emblématique nécessitant synchronisation et fluidité.',

  beltLevel: 'white_1',
  category: 'techniques',

  terminology: orange1Unit1Terminology,
  exercises: generateOrange1Unit1Exercises(),

  targetScore: 80,
  estimatedTime: 30,

  prerequisites: ['yellow2_unit6'], // After advanced timing and throws
  isSafetyCritical: true // Neck control requires careful attention
}
