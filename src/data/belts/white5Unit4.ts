/**
 * Unit 4: Safety & Ukemi Basics (5ème Kyū)
 * SAFETY-CRITICAL: Safe falling and rolling techniques
 */

import { TerminologyItem, LearningUnit, Exercise } from '@/types'

/** Terminology items for Unit 4 - Ukemi Basics */
export const unit4Terminology: TerminologyItem[] = [
  {
    id: 'ukemi',
    japanese: '受身',
    romaji: 'ukemi',
    french: 'Chute sécuritaire',
    english: 'Safe falling technique',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'PersonStanding',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Art de chuter',
    category: 'falls',
    beltLevel: 'white_5',
    description: 'Ukemi est l\'art de chuter en toute sécurité. Technique fondamentale qui protège le corps lors des projections. Comprend plusieurs types de chutes adaptées à chaque situation.',
    difficulty: 2,
    keywords: ['ukemi', 'chute', 'fall', 'safety', 'protection'],
    relatedTerms: ['mae_ukemi', 'ushiro_ukemi', 'yoko_ukemi', 'uke']
  },
  {
    id: 'mae_ukemi',
    japanese: '前受け身',
    romaji: 'mae ukemi',
    french: 'Chute avant',
    english: 'Forward roll',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'ArrowDown',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Roulade avant',
    category: 'falls',
    beltLevel: 'white_5',
    description: 'Chute avant en roulant sur l\'épaule et la diagonale du dos. Protège la tête et permet de se relever rapidement. Commence à genoux puis debout.',
    difficulty: 2,
    keywords: ['mae ukemi', 'forward', 'roll', 'avant', 'roulade'],
    relatedTerms: ['ukemi', 'zempo_kaiten', 'shomen']
  },
  {
    id: 'ushiro_ukemi',
    japanese: '後ろ受け身',
    romaji: 'ushiro ukemi',
    french: 'Chute arrière',
    english: 'Backward fall',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'ArrowUp',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Chute en arrière',
    category: 'falls',
    beltLevel: 'white_5',
    description: 'Chute arrière en frappant le tatami avec les bras pour dissiper l\'énergie. Menton rentré pour protéger la tête. Essentiel pour les projections arrière.',
    difficulty: 2,
    keywords: ['ushiro ukemi', 'backward', 'fall', 'arrière'],
    relatedTerms: ['ukemi', 'koho_tento', 'tatami']
  },
  {
    id: 'yoko_ukemi',
    japanese: '横受け身',
    romaji: 'yoko ukemi',
    french: 'Chute latérale',
    english: 'Side fall',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'ArrowRight',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Chute sur le côté',
    category: 'falls',
    beltLevel: 'white_5',
    description: 'Chute latérale en frappant le tatami avec le bras. Corps en forme de C, tête protégée. Utilisée pour absorber les projections latérales.',
    difficulty: 2,
    keywords: ['yoko ukemi', 'side', 'fall', 'latéral', 'côté'],
    relatedTerms: ['ukemi', 'mae_ukemi', 'yokomen']
  },
  {
    id: 'zempo_kaiten',
    japanese: '前方回転',
    romaji: 'zempo kaiten',
    french: 'Roulade avant haute',
    english: 'Forward high roll',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'RotateCw',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Roulade dynamique',
    category: 'falls',
    beltLevel: 'white_5',
    description: 'Roulade avant plus dynamique depuis position debout. Même principe que mae ukemi mais avec plus d\'élan. Protège lors de projections rapides.',
    difficulty: 3,
    keywords: ['zempo kaiten', 'roll', 'forward', 'high', 'dynamique'],
    relatedTerms: ['mae_ukemi', 'ukemi', 'kaiten_nage']
  },
  {
    id: 'koho_tento',
    japanese: '後方転倒',
    romaji: 'koho tento',
    french: 'Roulade arrière',
    english: 'Backward roll',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'RotateCcw',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Roulement arrière',
    category: 'falls',
    beltLevel: 'white_5',
    description: 'Roulade arrière en passant par-dessus l\'épaule. Plus difficile que la chute avant, nécessite bonne flexibilité. Protège la colonne vertébrale.',
    difficulty: 3,
    keywords: ['koho tento', 'backward roll', 'arrière', 'roulade'],
    relatedTerms: ['ushiro_ukemi', 'ukemi', 'mae_ukemi']
  },
  {
    id: 'shomen',
    japanese: '正面',
    romaji: 'shomen',
    french: 'Face / front',
    english: 'Front / straight',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'ArrowDown',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Direction frontale',
    category: 'movements',
    beltLevel: 'white_5',
    description: 'Direction frontale droite. Désigne une attaque ou mouvement directement de face. Shomen uchi = frappe frontale verticale.',
    difficulty: 1,
    keywords: ['shomen', 'front', 'straight', 'face', 'direct'],
    relatedTerms: ['shomen_uchi', 'yokomen', 'mae_ukemi']
  },
  {
    id: 'yokomen',
    japanese: '横面',
    romaji: 'yokomen',
    french: 'Côté de la tête',
    english: 'Side of head',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'ArrowRight',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Attaque latérale',
    category: 'movements',
    beltLevel: 'white_5',
    description: 'Côté de la tête ou du visage. Yokomen uchi = frappe diagonale vers le côté de la tête. Attaque courante en aïkido.',
    difficulty: 2,
    keywords: ['yokomen', 'side', 'diagonal', 'côté', 'tête'],
    relatedTerms: ['yokomen_uchi', 'shomen', 'yoko_ukemi']
  },
  {
    id: 'tap_signal',
    japanese: 'タップ',
    romaji: 'tappu',
    french: 'Signal d\'abandon',
    english: 'Tap out signal',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'Hand',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Tape pour arrêter',
    category: 'etiquette',
    beltLevel: 'white_5',
    description: 'Signal de sécurité crucial : taper deux fois le tatami ou le partenaire indique douleur ou inconfort. IMPORTANT : Taper AVANT douleur sévère, pas après. Si les mains sont bloquées, utiliser les pieds ou signal verbal ("Matte!"). Le partenaire doit IMMÉDIATEMENT relâcher la technique.',
    difficulty: 1,
    keywords: ['tap', 'signal', 'safety', 'sécurité', 'abandon', 'stop'],
    relatedTerms: ['ukemi', 'uke', 'tori']
  },
  {
    id: 'breakfall',
    japanese: '受け身の方法',
    romaji: 'ukemi no hoho',
    french: 'Technique de chute',
    english: 'Breakfall method',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'Shield',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Protection en chutant',
    category: 'falls',
    beltLevel: 'white_5',
    description: 'Méthode de dissipation de l\'énergie lors d\'une chute. Inclut frapper le tatami avec les bras, protéger la tête, rester relâché.',
    difficulty: 2,
    keywords: ['breakfall', 'slap', 'protection', 'chute', 'sécurité'],
    relatedTerms: ['ukemi', 'tatami', 'mae_ukemi']
  },
  {
    id: 'atemi',
    japanese: '当て身',
    romaji: 'atemi',
    french: 'Frappe de distraction',
    english: 'Strike / distraction',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'Target',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Point de frappe',
    category: 'techniques',
    beltLevel: 'white_5',
    description: 'Frappe ou menace de frappe pour créer une ouverture. En aïkido, souvent utilisée comme distraction plutôt que frappe réelle.',
    difficulty: 2,
    keywords: ['atemi', 'strike', 'frappe', 'distraction', 'opening'],
    relatedTerms: ['shomen_uchi', 'yokomen_uchi', 'irimi']
  },
  {
    id: 'kamae_safety',
    japanese: '構えの安全',
    romaji: 'kamae no anzen',
    french: 'Posture de sécurité',
    english: 'Safe posture',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'ShieldAlert',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Position protégée',
    category: 'positions',
    beltLevel: 'white_5',
    description: 'Maintenir une posture qui protège les points vitaux et permet de réagir rapidement. Base stable, mains protectrices.',
    difficulty: 2,
    keywords: ['kamae', 'safety', 'posture', 'protection', 'sécurité'],
    relatedTerms: ['kamae', 'hanmi', 'ma-ai']
  }
]

/** Generate exercises for Unit 4 */
function generateUnit4Exercises(): Exercise[] {
  const exercises: Exercise[] = []

  // Exercise 1: Term to Icon - ukemi (difficulty 1)
  exercises.push({
    id: 'white5_unit4_ex1',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Ukemi" (chute sécuritaire) ?',
    terminologyItem: unit4Terminology[0],
    options: [
      {
        id: 'opt1',
        value: 'Art de chuter',
        iconData: unit4Terminology[0].iconData,
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Salut respectueux',
        iconData: { type: 'lucide', iconName: 'Hand', color: '#000000' },
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Position debout',
        iconData: { type: 'lucide', iconName: 'User', color: '#000000' },
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Frappe',
        iconData: { type: 'lucide', iconName: 'Target', color: '#000000' },
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    hint: 'Ukemi protège le corps lors des chutes',
    difficulty: 1,
    estimatedTime: 15
  })

  // Exercise 2: Safety Quiz - tap signal (CRITICAL)
  exercises.push({
    id: 'white5_unit4_ex2_safety',
    type: 'safety_quiz',
    question: 'Que devez-vous faire si votre partenaire tape deux fois le tatami pendant une technique ?',
    terminologyItem: unit4Terminology[8], // tap_signal
    options: [
      {
        id: 'opt1',
        value: 'Relâcher IMMÉDIATEMENT la technique',
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Continuer doucement pour finir le mouvement',
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Demander si tout va bien',
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Terminer puis vérifier après',
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    context: 'Le signal de tap est un signal de SÉCURITÉ CRITIQUE. Vous devez arrêter immédiatement sans question.',
    difficulty: 1,
    estimatedTime: 20
  })

  // Exercise 3: Icon to Term - mae ukemi
  exercises.push({
    id: 'white5_unit4_ex3',
    type: 'icon_to_term',
    question: 'Quel est ce type d\'ukemi ?',
    terminologyItem: unit4Terminology[1], // mae_ukemi
    options: [
      { id: 'opt1', value: 'Mae ukemi', isCorrect: true },
      { id: 'opt2', value: 'Ushiro ukemi', isCorrect: false },
      { id: 'opt3', value: 'Yoko ukemi', isCorrect: false },
      { id: 'opt4', value: 'Koho tento', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Mae = avant / devant',
    difficulty: 2,
    estimatedTime: 15
  })

  // Exercise 4: Term to Icon - ushiro ukemi
  exercises.push({
    id: 'white5_unit4_ex4',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Ushiro ukemi" (chute arrière) ?',
    terminologyItem: unit4Terminology[2], // ushiro_ukemi
    options: [
      {
        id: 'opt1',
        value: 'Chute arrière',
        iconData: unit4Terminology[2].iconData,
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Chute avant',
        iconData: unit4Terminology[1].iconData,
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Chute latérale',
        iconData: unit4Terminology[3].iconData,
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Roulade',
        iconData: unit4Terminology[4].iconData,
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    hint: 'Ushiro = arrière / derrière',
    difficulty: 2,
    estimatedTime: 15
  })

  // Exercise 5: Icon to Term - yoko ukemi
  exercises.push({
    id: 'white5_unit4_ex5',
    type: 'icon_to_term',
    question: 'Quel est ce type d\'ukemi ?',
    terminologyItem: unit4Terminology[3], // yoko_ukemi
    options: [
      { id: 'opt1', value: 'Yoko ukemi', isCorrect: true },
      { id: 'opt2', value: 'Mae ukemi', isCorrect: false },
      { id: 'opt3', value: 'Ushiro ukemi', isCorrect: false },
      { id: 'opt4', value: 'Zempo kaiten', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Yoko = côté / latéral',
    difficulty: 2,
    estimatedTime: 15
  })

  // Exercise 6: Safety Quiz - head protection
  exercises.push({
    id: 'white5_unit4_ex6_safety',
    type: 'safety_quiz',
    question: 'Lors d\'un ukemi, comment protégez-vous votre tête ?',
    terminologyItem: unit4Terminology[0], // ukemi
    options: [
      {
        id: 'opt1',
        value: 'Rentrer le menton et regarder votre ceinture',
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Regarder droit devant',
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Tourner la tête sur le côté',
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Laisser la tête suivre naturellement',
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    context: 'Protéger la tête est ESSENTIEL : menton rentré empêche la tête de toucher le tatami.',
    difficulty: 2,
    estimatedTime: 20
  })

  // Exercise 7: Term to Icon - zempo kaiten
  exercises.push({
    id: 'white5_unit4_ex7',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Zempo kaiten" (roulade avant haute) ?',
    terminologyItem: unit4Terminology[4], // zempo_kaiten
    options: [
      {
        id: 'opt1',
        value: 'Roulade dynamique',
        iconData: unit4Terminology[4].iconData,
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Chute latérale',
        iconData: unit4Terminology[3].iconData,
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Position debout',
        iconData: { type: 'lucide', iconName: 'User', color: '#000000' },
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Signal d\'abandon',
        iconData: unit4Terminology[8].iconData,
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    hint: 'Kaiten = rotation / roulement',
    difficulty: 3,
    estimatedTime: 15
  })

  // Exercise 8: Icon to Term - shomen vs yokomen
  exercises.push({
    id: 'white5_unit4_ex8',
    type: 'icon_to_term',
    question: 'Quelle direction représente cette icône ?',
    terminologyItem: unit4Terminology[6], // shomen
    options: [
      { id: 'opt1', value: 'Shomen (frontal)', isCorrect: true },
      { id: 'opt2', value: 'Yokomen (latéral)', isCorrect: false },
      { id: 'opt3', value: 'Ushiro (arrière)', isCorrect: false },
      { id: 'opt4', value: 'Yoko (côté)', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Shomen = direction frontale droite',
    difficulty: 2,
    estimatedTime: 15
  })

  // Exercise 9: Safety Quiz - progression
  exercises.push({
    id: 'white5_unit4_ex9_safety',
    type: 'safety_quiz',
    question: 'Quelle est la bonne progression pour apprendre mae ukemi ?',
    terminologyItem: unit4Terminology[1], // mae_ukemi
    options: [
      {
        id: 'opt1',
        value: 'À genoux → debout lentement → debout rapidement',
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Directement debout et rapide',
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Assis → à genoux → debout',
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Avec partenaire immédiatement',
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    context: 'La progression graduelle permet d\'apprendre la technique correctement et en sécurité.',
    difficulty: 2,
    estimatedTime: 20
  })

  // Exercise 10: Free Recall - ukemi general
  exercises.push({
    id: 'white5_unit4_ex10_recall',
    type: 'free_recall',
    question: 'Nommez les trois types principaux d\'ukemi de base',
    terminologyItem: unit4Terminology[0], // ukemi
    options: [
      { id: 'hard', value: 'Je ne sais pas', isCorrect: false },
      { id: 'medium', value: 'Je connais 1-2 types', isCorrect: false },
      { id: 'good', value: 'Je connais les 3 types', isCorrect: true },
      { id: 'easy', value: 'Je connais tous les types et leurs utilisations', isCorrect: true }
    ],
    correctAnswer: 'good',
    hint: 'Mae (avant), Ushiro (arrière), Yoko (latéral)',
    difficulty: 3,
    estimatedTime: 20
  })

  return exercises
}

/** Complete Unit 4 export */
export const white5Unit4: LearningUnit = {
  id: 'white5_unit4',
  title: 'Sécurité et Ukemi de base',
  description: 'Apprenez l\'art essentiel de chuter en toute sécurité. Module critique pour votre protection.',

  beltLevel: 'white_5',
  category: 'falls',

  terminology: unit4Terminology,
  exercises: generateUnit4Exercises(),

  targetScore: 80,
  estimatedTime: 20,

  prerequisites: ['white5_unit1', 'white5_unit2'],
  isSafetyCritical: true // SAFETY-CRITICAL unit
}
