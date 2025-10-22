/**
 * Unit 2: Kaiten Nage - Rotation Throw (1er Kyū - Orange Belt)
 * Circular projection using rotational momentum
 */

import { TerminologyItem, LearningUnit, Exercise } from '@/types'

/** Terminology items for Orange 1 Unit 2 - Kaiten Nage */
export const orange1Unit2Terminology: TerminologyItem[] = [
  {
    id: 'kaiten_nage',
    japanese: '回転投げ',
    romaji: 'kai-ten na-ge',
    french: 'Projection rotative',
    english: 'Rotation throw',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'RefreshCw',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Projection circulaire',
    category: 'techniques',
    beltLevel: 'white_1',
    description: 'Projection par rotation circulaire. Utilise momentum circulaire pour projeter uke. Mouvement continu et fluide. Nécessite coordination corps entier.',
    difficulty: 4,
    keywords: ['kaiten', 'rotation', 'throw', 'projection', 'circular'],
    relatedTerms: ['nage', 'tenkan', 'koshi', 'circular_motion']
  },
  {
    id: 'kaiten_nage_uchi',
    japanese: '打ち回転投げ',
    romaji: 'u-chi kai-ten na-ge',
    french: 'Kaiten nage sur frappe',
    english: 'Kaiten nage from strike',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'ChevronsRight',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Depuis yokomen uchi',
    category: 'techniques',
    beltLevel: 'white_1',
    description: 'Kaiten nage depuis yokomen uchi. Esquiver, saisir le bras, rotation complète. Application classique pour apprendre la rotation.',
    difficulty: 4,
    keywords: ['kaiten', 'uchi', 'strike', 'yokomen', 'rotation'],
    relatedTerms: ['kaiten_nage', 'yokomen_uchi', 'tenkan', 'nagare']
  },
  {
    id: 'kaiten_nage_katate',
    japanese: '片手取り回転投げ',
    romaji: 'ka-ta-te do-ri kai-ten na-ge',
    french: 'Kaiten nage sur saisie',
    english: 'Kaiten nage from grab',
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
    description: 'Kaiten nage depuis katate dori. Lever le bras, pivoter sous, rotation complète. Variation nécessitant amplitude et fluidité.',
    difficulty: 4,
    keywords: ['kaiten', 'katate', 'grab', 'saisie', 'pivot'],
    relatedTerms: ['kaiten_nage', 'katate_dori', 'tenkan', 'ude']
  },
  {
    id: 'circular_momentum',
    japanese: '円運動',
    romaji: 'en un-do',
    french: 'Mouvement circulaire',
    english: 'Circular movement',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'Circle',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Énergie rotative',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Principe du mouvement circulaire en aikido. Crée momentum sans force. Utilise rotation pour amplifier l\'énergie. Base de kaiten nage.',
    difficulty: 4,
    keywords: ['circular', 'momentum', 'rotation', 'circulaire', 'energy'],
    relatedTerms: ['kaiten_nage', 'tenkan', 'kokyu', 'nagare']
  },
  {
    id: 'overhead_rotation',
    japanese: '上方回転',
    romaji: 'jo-ho kai-ten',
    french: 'Rotation au-dessus',
    english: 'Overhead rotation',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'RotateCcw',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Arc au-dessus de la tête',
    category: 'movements',
    beltLevel: 'white_1',
    description: 'Rotation du bras de uke au-dessus de sa tête. Arc large et fluide. Maintient extension du bras. Génère moment rotatif pour projection.',
    difficulty: 4,
    keywords: ['overhead', 'rotation', 'arc', 'au-dessus', 'arm'],
    relatedTerms: ['kaiten_nage', 'ude', 'extension', 'circular_momentum']
  },
  {
    id: 'arm_extension_kaiten',
    japanese: '腕伸展',
    romaji: 'u-de shin-ten',
    french: 'Extension du bras',
    english: 'Arm extension',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'MoveUpRight',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Maintien extension',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Maintenir extension du bras de uke pendant kaiten nage. Bras reste étendu, pas plié. Extension crée ligne de force efficace pour projection.',
    difficulty: 4,
    keywords: ['arm', 'extension', 'bras', 'stretch', 'line'],
    relatedTerms: ['kaiten_nage', 'ude', 'structure', 'kuzushi']
  },
  {
    id: 'shoulder_safety_kaiten',
    japanese: '肩の安全',
    romaji: 'ka-ta no an-zen',
    french: 'Sécurité épaule',
    english: 'Shoulder safety',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'ShieldCheck',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Protection articulaire',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'SÉCURITÉ CRITIQUE : Respecter limite de rotation de l\'épaule. Ne pas forcer hyperextension. Mouvement fluide, pas saccadé. Uke peut taper si douleur.',
    difficulty: 2,
    keywords: ['safety', 'shoulder', 'épaule', 'joint', 'sécurité'],
    relatedTerms: ['kaiten_nage', 'safety', 'kata', 'kansetsu']
  },
  {
    id: 'kaiten_ukemi',
    japanese: '回転投げ受け身',
    romaji: 'kai-ten na-ge u-ke-mi',
    french: 'Ukemi pour kaiten nage',
    english: 'Kaiten nage ukemi',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'Plane',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Chute en rotation',
    category: 'falls',
    beltLevel: 'white_1',
    description: 'Ukemi spécifique pour kaiten nage. Roulade haute avec rotation. Suivre le mouvement circulaire. Protéger bras étendu. Peut nécessiter tobi ukemi.',
    difficulty: 5,
    keywords: ['ukemi', 'fall', 'kaiten', 'rotation', 'roll'],
    relatedTerms: ['kaiten_nage', 'ukemi', 'tobi_ukemi', 'zenpo_kaiten']
  },
  {
    id: 'kaiten_timing',
    japanese: '回転タイミング',
    romaji: 'kai-ten ta-i-min-gu',
    french: 'Timing de rotation',
    english: 'Rotation timing',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'Timer',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Synchronisation rotation',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Timing crucial pour kaiten nage. Rotation doit commencer au bon moment. Ni trop tôt (perte connection) ni trop tard (force). Synchroniser avec uke.',
    difficulty: 5,
    keywords: ['timing', 'rotation', 'kaiten', 'synchronization', 'awase'],
    relatedTerms: ['kaiten_nage', 'timing', 'awase', 'musubi']
  },
  {
    id: 'continuous_circle',
    japanese: '連続円',
    romaji: 'ren-zo-ku en',
    french: 'Cercle continu',
    english: 'Continuous circle',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'Loader',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Mouvement ininterrompu',
    category: 'principles',
    beltLevel: 'white_1',
    description: 'Kaiten nage est un cercle continu sans interruption. Pas de pause ou changement direction. Mouvement fluide du début à la fin. Fluidité maximale.',
    difficulty: 4,
    keywords: ['continuous', 'circle', 'flow', 'continu', 'fluidity'],
    relatedTerms: ['kaiten_nage', 'nagare', 'musubi', 'circular_momentum']
  }
]

/** Generate exercises for Orange 1 Unit 2 */
function generateOrange1Unit2Exercises(): Exercise[] {
  const exercises: Exercise[] = []

  exercises.push({
    id: 'orange1_unit2_ex1',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Kaiten nage" (projection rotative) ?',
    terminologyItem: orange1Unit2Terminology[0],
    options: [
      { id: 'opt1', value: 'Projection circulaire', iconData: orange1Unit2Terminology[0].iconData, isCorrect: true },
      { id: 'opt2', value: 'Depuis yokomen', iconData: orange1Unit2Terminology[1].iconData, isCorrect: false },
      { id: 'opt3', value: 'Rotation au-dessus', iconData: orange1Unit2Terminology[4].iconData, isCorrect: false },
      { id: 'opt4', value: 'Cercle continu', iconData: orange1Unit2Terminology[9].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Kaiten = rotation circulaire',
    difficulty: 3,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit2_ex2_safety',
    type: 'safety_quiz',
    question: 'Quelle articulation doit être protégée dans kaiten nage ?',
    terminologyItem: orange1Unit2Terminology[6],
    options: [
      { id: 'opt1', value: 'L\'épaule - respecter limite de rotation', isCorrect: true },
      { id: 'opt2', value: 'Le poignet seulement', isCorrect: false },
      { id: 'opt3', value: 'Le cou principalement', isCorrect: false },
      { id: 'opt4', value: 'Les doigts uniquement', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    context: 'CRITIQUE : L\'épaule peut se luxer si rotation forcée. Mouvement doit être fluide et respecter limites anatomiques.',
    difficulty: 2,
    estimatedTime: 20
  })

  exercises.push({
    id: 'orange1_unit2_ex3',
    type: 'icon_to_term',
    question: 'Quel principe génère la puissance dans kaiten nage ?',
    terminologyItem: orange1Unit2Terminology[3],
    options: [
      { id: 'opt1', value: 'Mouvement circulaire (momentum)', isCorrect: true },
      { id: 'opt2', value: 'Force musculaire', isCorrect: false },
      { id: 'opt3', value: 'Vitesse pure', isCorrect: false },
      { id: 'opt4', value: 'Pression statique', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Rotation circulaire crée momentum sans force brute',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit2_ex4',
    type: 'term_to_icon',
    question: 'Comment le bras de uke doit-il être maintenu ?',
    terminologyItem: orange1Unit2Terminology[5],
    options: [
      { id: 'opt1', value: 'Extension maintenue', iconData: orange1Unit2Terminology[5].iconData, isCorrect: true },
      { id: 'opt2', value: 'Plié au coude', iconData: orange1Unit2Terminology[2].iconData, isCorrect: false },
      { id: 'opt3', value: 'Rotation libre', iconData: orange1Unit2Terminology[4].iconData, isCorrect: false },
      { id: 'opt4', value: 'Cercle fermé', iconData: orange1Unit2Terminology[9].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Extension du bras crée ligne de force efficace',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit2_ex5',
    type: 'icon_to_term',
    question: 'Quelle application classique enseigne kaiten nage ?',
    terminologyItem: orange1Unit2Terminology[1],
    options: [
      { id: 'opt1', value: 'Kaiten nage uchi (depuis yokomen)', isCorrect: true },
      { id: 'opt2', value: 'Kaiten nage katate seulement', isCorrect: false },
      { id: 'opt3', value: 'Kaiten nage ushiro', isCorrect: false },
      { id: 'opt4', value: 'Kaiten nage munetsuki', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Yokomen uchi est la forme classique d\'apprentissage',
    difficulty: 3,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit2_ex6',
    type: 'term_to_icon',
    question: 'Quelle trajectoire prend le bras dans kaiten nage ?',
    terminologyItem: orange1Unit2Terminology[4],
    options: [
      { id: 'opt1', value: 'Arc au-dessus de la tête', iconData: orange1Unit2Terminology[4].iconData, isCorrect: true },
      { id: 'opt2', value: 'Ligne droite', iconData: orange1Unit2Terminology[5].iconData, isCorrect: false },
      { id: 'opt3', value: 'Cercle horizontal', iconData: orange1Unit2Terminology[3].iconData, isCorrect: false },
      { id: 'opt4', value: 'Saisie simple', iconData: orange1Unit2Terminology[2].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Rotation overhead - au-dessus de la tête',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit2_ex7_safety',
    type: 'safety_quiz',
    question: 'Quel type d\'ukemi est souvent nécessaire pour kaiten nage ?',
    terminologyItem: orange1Unit2Terminology[7],
    options: [
      { id: 'opt1', value: 'Tobi ukemi (chute haute avec rotation)', isCorrect: true },
      { id: 'opt2', value: 'Ukemi statique au sol', isCorrect: false },
      { id: 'opt3', value: 'Simple roulade avant', isCorrect: false },
      { id: 'opt4', value: 'Pas d\'ukemi nécessaire', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    context: 'La rotation haute peut nécessiter chute aérienne. Uke doit maîtriser tobi ukemi pour sécurité.',
    difficulty: 4,
    estimatedTime: 20
  })

  exercises.push({
    id: 'orange1_unit2_ex8',
    type: 'icon_to_term',
    question: 'Quel est l\'élément clé de la fluidité en kaiten nage ?',
    terminologyItem: orange1Unit2Terminology[9],
    options: [
      { id: 'opt1', value: 'Cercle continu sans pause', isCorrect: true },
      { id: 'opt2', value: 'Pauses fréquentes', isCorrect: false },
      { id: 'opt3', value: 'Changements direction', isCorrect: false },
      { id: 'opt4', value: 'Mouvements saccadés', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Mouvement ininterrompu du début à la fin',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'orange1_unit2_ex9_recall',
    type: 'free_recall',
    question: 'Décrivez la trajectoire complète de kaiten nage depuis yokomen uchi',
    terminologyItem: orange1Unit2Terminology[0],
    options: [
      { id: 'hard', value: 'Je ne sais pas', isCorrect: false },
      { id: 'medium', value: 'Je connais les étapes de base', isCorrect: false },
      { id: 'good', value: 'Je peux décrire la trajectoire circulaire', isCorrect: true },
      { id: 'easy', value: 'Je peux démontrer avec fluidité', isCorrect: true }
    ],
    correctAnswer: 'good',
    hint: 'Esquive, saisie bras, arc au-dessus tête, rotation complète, projection',
    difficulty: 5,
    estimatedTime: 30
  })

  exercises.push({
    id: 'orange1_unit2_ex10',
    type: 'term_to_icon',
    question: 'Qu\'est-ce qui détermine le succès de kaiten nage ?',
    terminologyItem: orange1Unit2Terminology[8],
    options: [
      { id: 'opt1', value: 'Timing de rotation', iconData: orange1Unit2Terminology[8].iconData, isCorrect: true },
      { id: 'opt2', value: 'Force brute', iconData: orange1Unit2Terminology[5].iconData, isCorrect: false },
      { id: 'opt3', value: 'Vitesse maximale', iconData: orange1Unit2Terminology[4].iconData, isCorrect: false },
      { id: 'opt4', value: 'Saisie forte', iconData: orange1Unit2Terminology[2].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Timing parfait = rotation au bon moment',
    difficulty: 5,
    estimatedTime: 15
  })

  return exercises
}

/** Complete Orange 1 Unit 2 export */
export const orange1Unit2: LearningUnit = {
  id: 'orange1_unit2',
  title: 'Kaiten Nage - Projection rotative',
  description: 'Technique de projection circulaire utilisant momentum rotatif. Nécessite fluidité, extension et timing parfait.',

  beltLevel: 'white_1',
  category: 'techniques',

  terminology: orange1Unit2Terminology,
  exercises: generateOrange1Unit2Exercises(),

  targetScore: 80,
  estimatedTime: 30,

  prerequisites: ['orange1_unit1'],
  isSafetyCritical: true // Shoulder safety critical
}
