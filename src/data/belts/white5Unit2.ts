/**
 * Unit 2: Basic Positions (5ème Kyū)
 * Fundamental stances and postures in Aikido
 */

import { TerminologyItem, LearningUnit, Exercise } from '../../types'
import { stancesIcons } from '../icons'

/** Terminology items for Unit 2 */
export const unit2Terminology: TerminologyItem[] = [
  {
    id: 'hanmi',
    japanese: '半身',
    romaji: 'han-mi',
    french: 'Position triangulaire',
    english: 'Half-body stance',
    iconType: 'composite',
    iconData: stancesIcons.hanmi,
    iconCaption: 'Garde triangulaire',
    category: 'positions',
    beltLevel: 'white_5',
    description: 'Position de base en triangle. Un pied devant, un derrière, formant une base stable.',
    difficulty: 2,
    keywords: ['hanmi', 'position', 'stance', 'triangle'],
    relatedTerms: ['kamae', 'shizentai']
  },
  {
    id: 'kamae',
    japanese: '構え',
    romaji: 'ka-ma-e',
    french: 'Position de garde',
    english: 'Guard posture',
    iconType: 'composite',
    iconData: stancesIcons.kamae,
    iconCaption: 'En garde',
    category: 'positions',
    beltLevel: 'white_5',
    description: 'Position d\'engagement, prêt à recevoir ou exécuter une technique.',
    difficulty: 2,
    keywords: ['kamae', 'garde', 'guard', 'ready'],
    relatedTerms: ['hanmi', 'migi', 'hidari']
  },
  {
    id: 'shizentai',
    japanese: '自然体',
    romaji: 'shi-zen-tai',
    french: 'Posture naturelle',
    english: 'Natural stance',
    iconType: 'emoji',
    iconData: stancesIcons.shizentai,
    iconCaption: 'Debout naturel',
    category: 'positions',
    beltLevel: 'white_5',
    description: 'Position debout naturelle et détendue. Point de départ de nombreux mouvements.',
    difficulty: 1,
    keywords: ['shizentai', 'naturel', 'natural', 'debout'],
    relatedTerms: ['hanmi', 'kamae']
  },
  {
    id: 'migi',
    japanese: '右',
    romaji: 'mi-gi',
    french: 'Droite',
    english: 'Right',
    iconType: 'emoji',
    iconData: { type: 'emoji', emoji: '➡️' },
    iconCaption: 'Côté droit',
    category: 'positions',
    beltLevel: 'white_5',
    description: 'Désigne le côté droit. Utilisé pour préciser quelle jambe/main est devant.',
    difficulty: 1,
    keywords: ['migi', 'droite', 'right', 'direction'],
    relatedTerms: ['hidari', 'hanmi']
  },
  {
    id: 'hidari',
    japanese: '左',
    romaji: 'hi-da-ri',
    french: 'Gauche',
    english: 'Left',
    iconType: 'emoji',
    iconData: { type: 'emoji', emoji: '⬅️' },
    iconCaption: 'Côté gauche',
    category: 'positions',
    beltLevel: 'white_5',
    description: 'Désigne le côté gauche. Important pour distinguer migi hanmi et hidari hanmi.',
    difficulty: 1,
    keywords: ['hidari', 'gauche', 'left', 'direction'],
    relatedTerms: ['migi', 'hanmi']
  },
  {
    id: 'ai-hanmi',
    japanese: '相半身',
    romaji: 'ai-han-mi',
    french: 'Même position',
    english: 'Same stance',
    iconType: 'composite',
    iconData: {
      type: 'composite',
      elements: [
        { type: 'shape', shape: 'person', position: { x: 35, y: 50 }, color: '#1976d2', size: 32 },
        { type: 'shape', shape: 'person', position: { x: 65, y: 50 }, color: '#1976d2', size: 32 },
        { type: 'text', text: '=', position: { x: 50, y: 25 }, size: 24 }
      ]
    },
    iconCaption: 'Même côté devant',
    category: 'positions',
    beltLevel: 'white_5',
    description: 'Même jambe devant pour les deux partenaires (droite-droite ou gauche-gauche).',
    difficulty: 3,
    keywords: ['ai-hanmi', 'même', 'same', 'mirror'],
    relatedTerms: ['gyaku-hanmi', 'hanmi']
  },
  {
    id: 'gyaku-hanmi',
    japanese: '逆半身',
    romaji: 'gya-ku-han-mi',
    french: 'Position opposée',
    english: 'Opposite stance',
    iconType: 'composite',
    iconData: {
      type: 'composite',
      elements: [
        { type: 'shape', shape: 'person', position: { x: 35, y: 50 }, color: '#1976d2', size: 32 },
        { type: 'shape', shape: 'person', position: { x: 65, y: 50 }, color: '#c62828', size: 32 },
        { type: 'text', text: '≠', position: { x: 50, y: 25 }, size: 24 }
      ]
    },
    iconCaption: 'Côtés opposés',
    category: 'positions',
    beltLevel: 'white_5',
    description: 'Jambes opposées devant (un droite, l\'autre gauche).',
    difficulty: 3,
    keywords: ['gyaku-hanmi', 'opposé', 'opposite', 'reverse'],
    relatedTerms: ['ai-hanmi', 'hanmi']
  },
  {
    id: 'suwari-waza',
    japanese: '座り技',
    romaji: 'su-wa-ri-wa-za',
    french: 'Techniques à genoux',
    english: 'Kneeling techniques',
    iconType: 'composite',
    iconData: stancesIcons.suwariWaza,
    iconCaption: 'Travail en seiza',
    category: 'positions',
    beltLevel: 'white_5',
    description: 'Techniques pratiquées en position seiza (les deux partenaires à genoux).',
    difficulty: 2,
    keywords: ['suwari-waza', 'genoux', 'kneeling', 'seiza'],
    relatedTerms: ['seiza', 'hanmi-handachi']
  },
  {
    id: 'tachi-waza',
    japanese: '立ち技',
    romaji: 'ta-chi-wa-za',
    french: 'Techniques debout',
    english: 'Standing techniques',
    iconType: 'composite',
    iconData: {
      type: 'composite',
      elements: [
        { type: 'shape', shape: 'person', position: { x: 35, y: 50 }, color: '#1976d2', size: 36 },
        { type: 'shape', shape: 'person', position: { x: 65, y: 50 }, color: '#c62828', size: 36 }
      ]
    },
    iconCaption: 'Travail debout',
    category: 'positions',
    beltLevel: 'white_5',
    description: 'Techniques pratiquées en position debout (les deux partenaires).',
    difficulty: 2,
    keywords: ['tachi-waza', 'debout', 'standing', 'upright'],
    relatedTerms: ['suwari-waza', 'hanmi-handachi']
  },
  {
    id: 'hanmi-handachi',
    japanese: '半身半立',
    romaji: 'han-mi-han-da-chi',
    french: 'Un assis, un debout',
    english: 'One sitting, one standing',
    iconType: 'composite',
    iconData: {
      type: 'composite',
      elements: [
        { type: 'text', text: '🧎', position: { x: 35, y: 55 }, size: 32 },
        { type: 'shape', shape: 'person', position: { x: 65, y: 45 }, color: '#c62828', size: 36 }
      ]
    },
    iconCaption: 'Positions mixtes',
    category: 'positions',
    beltLevel: 'white_5',
    description: 'Tori à genoux, Uke debout. Pratique difficile développant technique pure.',
    difficulty: 3,
    keywords: ['hanmi-handachi', 'mixte', 'mixed', 'challenge'],
    relatedTerms: ['suwari-waza', 'tachi-waza']
  },
  {
    id: 'chudan',
    japanese: '中段',
    romaji: 'chu-dan',
    french: 'Niveau moyen',
    english: 'Middle level',
    iconType: 'composite',
    iconData: {
      type: 'composite',
      elements: [
        { type: 'shape', shape: 'person', position: { x: 50, y: 50 }, color: '#1976d2', size: 40 },
        { type: 'line', position: { x: 70, y: 50 }, size: 20, color: '#c62828' }
      ]
    },
    iconCaption: 'Hauteur poitrine',
    category: 'positions',
    beltLevel: 'white_5',
    description: 'Niveau moyen du corps (poitrine). Utilisé pour les gardes et attaques.',
    difficulty: 2,
    keywords: ['chudan', 'moyen', 'middle', 'chest'],
    relatedTerms: ['jodan', 'gedan']
  },
  {
    id: 'ma-ai',
    japanese: '間合い',
    romaji: 'ma-ai',
    french: 'Distance de sécurité',
    english: 'Safe distance',
    iconType: 'composite',
    iconData: {
      type: 'composite',
      elements: [
        { type: 'shape', shape: 'person', position: { x: 25, y: 50 }, color: '#1976d2', size: 32 },
        { type: 'text', text: '↔️', position: { x: 50, y: 50 }, size: 28 },
        { type: 'shape', shape: 'person', position: { x: 75, y: 50 }, color: '#c62828', size: 32 }
      ]
    },
    iconCaption: 'Bonne distance',
    category: 'positions',
    beltLevel: 'white_5',
    description: 'Distance optimale entre partenaires. Ni trop près, ni trop loin.',
    difficulty: 3,
    keywords: ['ma-ai', 'distance', 'spacing', 'safety'],
    relatedTerms: ['hanmi', 'kamae']
  }
]

/** Generate exercises for Unit 2 */
const generateUnit2Exercises = (): Exercise[] => {
  const exercises: Exercise[] = []

  // Exercise 1: Term to Icon - Hanmi
  exercises.push({
    id: 'ex1_term_hanmi',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Hanmi" ?',
    terminologyItem: unit2Terminology[0],
    options: [
      { id: 'opt1', value: 'Position triangulaire', iconData: stancesIcons.hanmi, isCorrect: true },
      { id: 'opt2', value: 'Position naturelle', iconData: stancesIcons.shizentai, isCorrect: false },
      { id: 'opt3', value: 'Position assise', iconData: stancesIcons.seiza, isCorrect: false },
      { id: 'opt4', value: 'Salut', iconData: stancesIcons.rei, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Cherchez le triangle',
    difficulty: 2,
    estimatedTime: 15
  })

  // Exercise 2: Icon to Term - Shizentai
  exercises.push({
    id: 'ex2_icon_shizentai',
    type: 'icon_to_term',
    question: 'Quel terme désigne la posture naturelle debout ?',
    terminologyItem: unit2Terminology[2],
    options: [
      { id: 'opt1', value: 'Shizentai', isCorrect: true },
      { id: 'opt2', value: 'Hanmi', isCorrect: false },
      { id: 'opt3', value: 'Kamae', isCorrect: false },
      { id: 'opt4', value: 'Seiza', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    difficulty: 1,
    estimatedTime: 15
  })

  // Exercise 3: Safety Quiz - Correct Stance
  exercises.push({
    id: 'ex3_safety_stance',
    type: 'safety_quiz',
    question: 'Pourquoi est-il important de maintenir un bon hanmi ?',
    terminologyItem: unit2Terminology[0],
    options: [
      { id: 'opt1', value: 'Stabilité et équilibre', isCorrect: true },
      { id: 'opt2', value: 'Pour paraître impressionnant', isCorrect: false },
      { id: 'opt3', value: 'C\'est obligatoire sans raison', isCorrect: false },
      { id: 'opt4', value: 'Pour aller plus vite', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    context: 'Une bonne position de base assure votre sécurité et celle de votre partenaire',
    difficulty: 2,
    estimatedTime: 20
  })

  // Exercise 4: Term to Icon - Migi/Hidari
  exercises.push({
    id: 'ex4_term_direction',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Migi" (droite) ?',
    terminologyItem: unit2Terminology[3],
    options: [
      { id: 'opt1', value: 'Droite', iconData: { type: 'emoji', emoji: '➡️' }, isCorrect: true },
      { id: 'opt2', value: 'Gauche', iconData: { type: 'emoji', emoji: '⬅️' }, isCorrect: false },
      { id: 'opt3', value: 'Haut', iconData: { type: 'emoji', emoji: '⬆️' }, isCorrect: false },
      { id: 'opt4', value: 'Bas', iconData: { type: 'emoji', emoji: '⬇️' }, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    difficulty: 1,
    estimatedTime: 15
  })

  // Exercise 5: Icon to Term - Ai-hanmi vs Gyaku-hanmi
  exercises.push({
    id: 'ex5_icon_ai_gyaku',
    type: 'icon_to_term',
    question: 'Quelle position montre les deux partenaires avec la même jambe devant ?',
    terminologyItem: unit2Terminology[5],
    options: [
      { id: 'opt1', value: 'Ai-hanmi', isCorrect: true },
      { id: 'opt2', value: 'Gyaku-hanmi', isCorrect: false },
      { id: 'opt3', value: 'Hanmi-handachi', isCorrect: false },
      { id: 'opt4', value: 'Suwari-waza', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Ai signifie "même"',
    difficulty: 3,
    estimatedTime: 20
  })

  // Exercise 6: Free Recall - Kamae
  exercises.push({
    id: 'ex6_recall_kamae',
    type: 'free_recall',
    question: 'Quel terme désigne la position de garde ?',
    terminologyItem: unit2Terminology[1],
    correctAnswer: 'kamae',
    hint: 'Commence par "ka"',
    difficulty: 2,
    estimatedTime: 20
  })

  // Exercise 7: Term to Icon - Suwari-waza
  exercises.push({
    id: 'ex7_term_suwari',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Suwari-waza" ?',
    terminologyItem: unit2Terminology[7],
    options: [
      { id: 'opt1', value: 'Techniques à genoux', iconData: stancesIcons.suwariWaza, isCorrect: true },
      { id: 'opt2', value: 'Techniques debout', iconData: { type: 'composite', elements: [{ type: 'shape', shape: 'person', position: { x: 50, y: 50 }, color: '#1976d2', size: 40 }] }, isCorrect: false },
      { id: 'opt3', value: 'Position naturelle', iconData: stancesIcons.shizentai, isCorrect: false },
      { id: 'opt4', value: 'Position garde', iconData: stancesIcons.kamae, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Les deux partenaires à genoux',
    difficulty: 2,
    estimatedTime: 15
  })

  // Exercise 8: Icon to Term - Tachi-waza
  exercises.push({
    id: 'ex8_icon_tachi',
    type: 'icon_to_term',
    question: 'Comment appelle-t-on les techniques pratiquées debout ?',
    terminologyItem: unit2Terminology[8],
    options: [
      { id: 'opt1', value: 'Tachi-waza', isCorrect: true },
      { id: 'opt2', value: 'Suwari-waza', isCorrect: false },
      { id: 'opt3', value: 'Hanmi-handachi', isCorrect: false },
      { id: 'opt4', value: 'Shizentai', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    difficulty: 2,
    estimatedTime: 15
  })

  // Exercise 9: Term to Icon - Ma-ai
  exercises.push({
    id: 'ex9_term_maai',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Ma-ai" (distance de sécurité) ?',
    terminologyItem: unit2Terminology[11],
    options: [
      { id: 'opt1', value: 'Distance entre partenaires', iconData: unit2Terminology[11].iconData, isCorrect: true },
      { id: 'opt2', value: 'Même position', iconData: unit2Terminology[5].iconData, isCorrect: false },
      { id: 'opt3', value: 'Position opposée', iconData: unit2Terminology[6].iconData, isCorrect: false },
      { id: 'opt4', value: 'Position garde', iconData: stancesIcons.kamae, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Cherchez la distance',
    difficulty: 3,
    estimatedTime: 15
  })

  // Exercise 10: Safety Quiz - Distance
  exercises.push({
    id: 'ex10_safety_distance',
    type: 'safety_quiz',
    question: 'Pourquoi ma-ai (la bonne distance) est-il important ?',
    terminologyItem: unit2Terminology[11],
    options: [
      { id: 'opt1', value: 'Sécurité et efficacité de la technique', isCorrect: true },
      { id: 'opt2', value: 'Pour avoir l\'air professionnel', isCorrect: false },
      { id: 'opt3', value: 'Pas vraiment important', isCorrect: false },
      { id: 'opt4', value: 'Seulement pour les compétitions', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    context: 'La bonne distance permet une pratique sûre et efficace',
    difficulty: 2,
    estimatedTime: 20
  })

  // Exercise 11: Free Recall - Hidari
  exercises.push({
    id: 'ex11_recall_hidari',
    type: 'free_recall',
    question: 'Comment dit-on "gauche" en japonais ?',
    terminologyItem: unit2Terminology[4],
    correctAnswer: 'hidari',
    hint: 'Commence par "hi"',
    difficulty: 1,
    estimatedTime: 15
  })

  // Exercise 12: Icon to Term - Hanmi-handachi
  exercises.push({
    id: 'ex12_icon_hanmi_handachi',
    type: 'icon_to_term',
    question: 'Comment appelle-t-on la pratique avec un partenaire assis et l\'autre debout ?',
    terminologyItem: unit2Terminology[9],
    options: [
      { id: 'opt1', value: 'Hanmi-handachi', isCorrect: true },
      { id: 'opt2', value: 'Suwari-waza', isCorrect: false },
      { id: 'opt3', value: 'Tachi-waza', isCorrect: false },
      { id: 'opt4', value: 'Ai-hanmi', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    difficulty: 3,
    estimatedTime: 20
  })

  return exercises
}

/** Complete learning unit */
export const white5Unit2: LearningUnit = {
  id: 'white5_unit2',
  title: 'Positions de base',
  description: 'Maîtrisez les positions fondamentales de l\'aïkido : hanmi, kamae, et les différentes configurations de pratique.',
  beltLevel: 'white_5',
  category: 'positions',
  terminology: unit2Terminology,
  exercises: generateUnit2Exercises(),
  targetScore: 80,
  estimatedTime: 20,
  prerequisites: [],
  isSafetyCritical: true
}
