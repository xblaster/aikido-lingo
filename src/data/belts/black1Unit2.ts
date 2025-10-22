/**
 * Unit 2: Advanced Applications (1er Dan - Black Belt)
 * Jiyu waza concepts, multiple attackers, henka variations
 */

import { TerminologyItem, LearningUnit, Exercise } from '@/types'

export const black1Unit2Terminology: TerminologyItem[] = [
  {
    id: 'oyo_waza',
    japanese: '応用技',
    romaji: 'o-yo wa-za',
    french: 'Techniques d\'application',
    english: 'Applied techniques',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Lightbulb', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Application créative',
    category: 'techniques',
    beltLevel: 'black_1',
    description: 'Application créative des principes de base. Adapter kihon à situations variées. Comprendre essence permet applications infinies.',
    difficulty: 5,
    keywords: ['application', 'oyo', 'creative', 'adaptive', 'advanced'],
    relatedTerms: ['kihon_waza', 'henka_waza', 'jiyu_waza', 'principles']
  },
  {
    id: 'randori',
    japanese: '乱取り',
    romaji: 'ran-do-ri',
    french: 'Pratique libre',
    english: 'Free practice',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Shuffle', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Chaos contrôlé',
    category: 'techniques',
    beltLevel: 'black_1',
    description: 'Pratique libre avec attaques continues. Ran = chaos/désordre, dori = prendre. Développe fluidité sous pression, décisions spontanées.',
    difficulty: 5,
    keywords: ['randori', 'free', 'practice', 'spontaneous', 'chaos'],
    relatedTerms: ['jiyu_waza', 'multiple_attackers', 'flow', 'pressure']
  },
  {
    id: 'taninzu_gake',
    japanese: '多人数掛け',
    romaji: 'ta-nin-zu ga-ke',
    french: 'Multiples attaquants',
    english: 'Multiple attackers',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Users', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Plusieurs adversaires',
    category: 'techniques',
    beltLevel: 'black_1',
    description: 'Défense contre plusieurs attaquants simultanés. Taninzu = plusieurs personnes. Nécessite awareness 360°, positionnement stratégique.',
    difficulty: 5,
    keywords: ['multiple', 'attackers', 'taninzu', 'several', 'awareness'],
    relatedTerms: ['randori', 'awareness', 'positioning', 'strategy']
  },
  {
    id: 'circular_awareness',
    japanese: '円周意識',
    romaji: 'en-shu i-shi-ki',
    french: 'Conscience circulaire',
    english: 'Circular awareness',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Compass', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Perception 360°',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Conscience de tout l\'espace autour. Pas focus tunnel sur un attaquant. Perception périphérique active. Essentiel pour taninzu gake.',
    difficulty: 5,
    keywords: ['awareness', 'circular', '360', 'perception', 'spatial'],
    relatedTerms: ['zanshin', 'awareness', 'taninzu_gake', 'perception']
  },
  {
    id: 'positioning_strategy',
    japanese: '位置戦略',
    romaji: 'i-chi sen-rya-ku',
    french: 'Stratégie positionnement',
    english: 'Positioning strategy',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'MapPin', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Placement tactique',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Positionnement stratégique contre multiples. Aligner attaquants, utiliser comme boucliers. Jamais se laisser encercler complètement.',
    difficulty: 5,
    keywords: ['positioning', 'strategy', 'tactical', 'placement', 'spatial'],
    relatedTerms: ['taninzu_gake', 'strategy', 'maai', 'tactics']
  },
  {
    id: 'continuous_movement',
    japanese: '継続動作',
    romaji: 'ke-i-zo-ku do-sa',
    french: 'Mouvement continu',
    english: 'Continuous movement',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Waves', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Flux ininterrompu',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Mouvement sans arrêt contre multiples. Pause = vulnérabilité. Flux constant d\'une technique à l\'autre. Comme eau qui coule.',
    difficulty: 5,
    keywords: ['continuous', 'movement', 'flow', 'constant', 'uninterrupted'],
    relatedTerms: ['nagare', 'randori', 'flow', 'momentum']
  },
  {
    id: 'priority_targeting',
    japanese: '優先目標',
    romaji: 'yu-sen mo-ku-hyo',
    french: 'Ciblage prioritaire',
    english: 'Priority targeting',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Target', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Menace immédiate',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Identifier et traiter menace la plus proche d\'abord. Pas ordre chronologique, mais danger immédiat. Triage tactique constant.',
    difficulty: 5,
    keywords: ['priority', 'targeting', 'threat', 'assessment', 'tactical'],
    relatedTerms: ['taninzu_gake', 'strategy', 'awareness', 'decision']
  },
  {
    id: 'use_environment',
    japanese: '環境を使う',
    romaji: 'kan-kyo wo tsu-kau',
    french: 'Utiliser l\'environnement',
    english: 'Use environment',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Landmark', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Terrain tactique',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Utiliser obstacles, murs, meubles comme avantages tactiques. Canaliser attaquants, limiter angles. Environnement = allié.',
    difficulty: 5,
    keywords: ['environment', 'tactical', 'terrain', 'obstacles', 'advantage'],
    relatedTerms: ['strategy', 'positioning', 'tactical', 'awareness']
  },
  {
    id: 'stress_adaptation',
    japanese: 'ストレス適応',
    romaji: 'su-to-re-su te-ki-o',
    french: 'Adaptation au stress',
    english: 'Stress adaptation',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'AlertCircle', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Calme sous pression',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Capacité à fonctionner sous stress élevé. Randori et taninzu créent pression. Entraîner esprit à rester calme, corps à bouger naturellement.',
    difficulty: 5,
    keywords: ['stress', 'adaptation', 'pressure', 'calm', 'resilience'],
    relatedTerms: ['fudoshin', 'mushin', 'pressure', 'mental']
  },
  {
    id: 'spontaneous_decision',
    japanese: '即座決定',
    romaji: 'so-ku-za ke-tte-i',
    french: 'Décision spontanée',
    english: 'Spontaneous decision',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Zap', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Choix instantané',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Décisions techniques instantanées sans hésitation. Pas temps d\'analyser en randori. Corps décide, esprit observe. Entraînement crée réflexes.',
    difficulty: 5,
    keywords: ['spontaneous', 'decision', 'instant', 'reflex', 'intuitive'],
    relatedTerms: ['mushin', 'randori', 'intuition', 'reflex']
  }
]

function generateBlack1Unit2Exercises(): Exercise[] {
  const exercises: Exercise[] = []

  exercises.push({
    id: 'black1_unit2_ex1',
    type: 'term_to_icon',
    question: 'Que permettent les techniques d\'application (oyo waza) ?',
    terminologyItem: black1Unit2Terminology[0],
    options: [
      { id: 'opt1', value: 'Application créative', iconData: black1Unit2Terminology[0].iconData, isCorrect: true },
      { id: 'opt2', value: 'Chaos contrôlé', iconData: black1Unit2Terminology[1].iconData, isCorrect: false },
      { id: 'opt3', value: 'Perception 360', iconData: black1Unit2Terminology[3].iconData, isCorrect: false },
      { id: 'opt4', value: 'Flux ininterrompu', iconData: black1Unit2Terminology[5].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Comprendre essence permet applications infinies',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit2_ex2',
    type: 'icon_to_term',
    question: 'Qu\'est-ce que randori développe principalement ?',
    terminologyItem: black1Unit2Terminology[1],
    options: [
      { id: 'opt1', value: 'Fluidité sous pression et décisions spontanées', isCorrect: true },
      { id: 'opt2', value: 'Technique parfaite répétée', isCorrect: false },
      { id: 'opt3', value: 'Force musculaire', isCorrect: false },
      { id: 'opt4', value: 'Formes rigides', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Ran = chaos, développe adaptation temps réel',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit2_ex3',
    type: 'term_to_icon',
    question: 'Contre plusieurs attaquants, quelle conscience est essentielle ?',
    terminologyItem: black1Unit2Terminology[3],
    options: [
      { id: 'opt1', value: 'Perception 360°', iconData: black1Unit2Terminology[3].iconData, isCorrect: true },
      { id: 'opt2', value: 'Placement tactique', iconData: black1Unit2Terminology[4].iconData, isCorrect: false },
      { id: 'opt3', value: 'Menace immédiate', iconData: black1Unit2Terminology[6].iconData, isCorrect: false },
      { id: 'opt4', value: 'Choix instantané', iconData: black1Unit2Terminology[9].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Pas focus tunnel - perception périphérique active',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit2_ex4',
    type: 'icon_to_term',
    question: 'Comment éviter encerclement par multiples attaquants ?',
    terminologyItem: black1Unit2Terminology[4],
    options: [
      { id: 'opt1', value: 'Positionnement stratégique (aligner, utiliser comme boucliers)', isCorrect: true },
      { id: 'opt2', value: 'Rester au centre', isCorrect: false },
      { id: 'opt3', value: 'Ne pas bouger', isCorrect: false },
      { id: 'opt4', value: 'Attaquer au hasard', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Placement tactique, jamais se laisser encercler',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit2_ex5',
    type: 'term_to_icon',
    question: 'Pourquoi mouvement continu est crucial contre multiples ?',
    terminologyItem: black1Unit2Terminology[5],
    options: [
      { id: 'opt1', value: 'Flux ininterrompu', iconData: black1Unit2Terminology[5].iconData, isCorrect: true },
      { id: 'opt2', value: 'Application créative', iconData: black1Unit2Terminology[0].iconData, isCorrect: false },
      { id: 'opt3', value: 'Terrain tactique', iconData: black1Unit2Terminology[7].iconData, isCorrect: false },
      { id: 'opt4', value: 'Calme pression', iconData: black1Unit2Terminology[8].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Pause = vulnérabilité. Flux constant comme eau',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit2_ex6',
    type: 'icon_to_term',
    question: 'Quel attaquant traiter en priorité ?',
    terminologyItem: black1Unit2Terminology[6],
    options: [
      { id: 'opt1', value: 'Menace la plus proche/immédiate', isCorrect: true },
      { id: 'opt2', value: 'Le premier chronologiquement', isCorrect: false },
      { id: 'opt3', value: 'Le plus faible', isCorrect: false },
      { id: 'opt4', value: 'Le plus fort', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Triage tactique constant - danger immédiat d\'abord',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit2_ex7',
    type: 'term_to_icon',
    question: 'Comment utiliser tactiquement l\'espace de pratique ?',
    terminologyItem: black1Unit2Terminology[7],
    options: [
      { id: 'opt1', value: 'Terrain tactique', iconData: black1Unit2Terminology[7].iconData, isCorrect: true },
      { id: 'opt2', value: 'Plusieurs adversaires', iconData: black1Unit2Terminology[2].iconData, isCorrect: false },
      { id: 'opt3', value: 'Perception 360', iconData: black1Unit2Terminology[3].iconData, isCorrect: false },
      { id: 'opt4', value: 'Chaos contrôlé', iconData: black1Unit2Terminology[1].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Obstacles, murs = avantages. Canaliser attaquants',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit2_ex8',
    type: 'icon_to_term',
    question: 'Quelle capacité mentale randori développe-t-il ?',
    terminologyItem: black1Unit2Terminology[8],
    options: [
      { id: 'opt1', value: 'Rester calme sous pression élevée', isCorrect: true },
      { id: 'opt2', value: 'Paniquer rapidement', isCorrect: false },
      { id: 'opt3', value: 'Abandonner si difficile', isCorrect: false },
      { id: 'opt4', value: 'Éviter le stress', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Entraîner esprit calme, corps naturel sous stress',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit2_ex9_recall',
    type: 'free_recall',
    question: 'Expliquez la différence entre kihon waza, henka waza et oyo waza',
    terminologyItem: black1Unit2Terminology[0],
    options: [
      { id: 'hard', value: 'Je ne sais pas', isCorrect: false },
      { id: 'medium', value: 'Je connais les termes', isCorrect: false },
      { id: 'good', value: 'Je peux expliquer progression base→variation→application', isCorrect: true },
      { id: 'easy', value: 'Je peux démontrer les trois niveaux', isCorrect: true }
    ],
    correctAnswer: 'good',
    hint: 'Kihon = base, henka = variation, oyo = application créative',
    difficulty: 5,
    estimatedTime: 30
  })

  exercises.push({
    id: 'black1_unit2_ex10',
    type: 'term_to_icon',
    question: 'Comment les décisions sont-elles prises en randori ?',
    terminologyItem: black1Unit2Terminology[9],
    options: [
      { id: 'opt1', value: 'Choix instantané', iconData: black1Unit2Terminology[9].iconData, isCorrect: true },
      { id: 'opt2', value: 'Analyse longue', iconData: black1Unit2Terminology[0].iconData, isCorrect: false },
      { id: 'opt3', value: 'Hésitation prudente', iconData: black1Unit2Terminology[8].iconData, isCorrect: false },
      { id: 'opt4', value: 'Pause réflexion', iconData: black1Unit2Terminology[5].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Corps décide, esprit observe. Pas temps analyser',
    difficulty: 5,
    estimatedTime: 15
  })

  return exercises
}

export const black1Unit2: LearningUnit = {
  id: 'black1_unit2',
  title: 'Applications avancées',
  description: 'Oyo waza, randori, taninzu gake. Appliquer principes sous pression, multiples attaquants, décisions spontanées.',

  beltLevel: 'black_1',
  category: 'techniques',

  terminology: black1Unit2Terminology,
  exercises: generateBlack1Unit2Exercises(),

  targetScore: 80,
  estimatedTime: 35,

  prerequisites: ['black1_unit1'],
  isSafetyCritical: false
}
