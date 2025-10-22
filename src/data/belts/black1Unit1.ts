/**
 * Unit 1: Teaching Fundamentals (1er Dan - Black Belt)
 * Pedagogy, demonstration, correction, and dojo leadership
 */

import { TerminologyItem, LearningUnit, Exercise } from '@/types'

export const black1Unit1Terminology: TerminologyItem[] = [
  {
    id: 'kyoju_dairi',
    japanese: '教授代理',
    romaji: 'kyo-ju da-i-ri',
    french: 'Assistant enseignant',
    english: 'Teaching assistant',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'GraduationCap', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Rôle pédagogique',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Rôle d\'assistant enseignant. Shodan commence à enseigner sous supervision. Responsabilité d\'aider débutants et transmettre aikido correctement.',
    difficulty: 4,
    keywords: ['teaching', 'assistant', 'pedagogy', 'instructor', 'kyoju'],
    relatedTerms: ['teaching', 'sensei', 'dojo', 'responsibility']
  },
  {
    id: 'misete_miru',
    japanese: '見せてみる',
    romaji: 'mi-se-te mi-ru',
    french: 'Montrer pour voir',
    english: 'Show to demonstrate',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Eye', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Démonstration claire',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Montrer technique clairement. Démonstration doit être visible de tous. Décomposer mouvement. Angles multiples. Clarté prime sur vitesse.',
    difficulty: 4,
    keywords: ['demonstration', 'showing', 'visual', 'clear', 'teaching'],
    relatedTerms: ['teaching', 'demonstration', 'clarity', 'pedagogy']
  },
  {
    id: 'kotoba_setsu',
    japanese: '言葉説',
    romaji: 'ko-to-ba se-tsu',
    french: 'Explication verbale',
    english: 'Verbal explanation',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'MessageCircle', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Mots justes',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Expliquer avec mots appropriés. Pas trop technique pour débutants. Utiliser images et métaphores. Adapter langage au niveau.',
    difficulty: 4,
    keywords: ['explanation', 'verbal', 'words', 'teaching', 'communication'],
    relatedTerms: ['teaching', 'communication', 'pedagogy', 'clarity']
  },
  {
    id: 'tadasu',
    japanese: '正す',
    romaji: 'ta-da-su',
    french: 'Corriger',
    english: 'To correct',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'CheckCircle', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Correction bienveillante',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Art de corriger élèves. Correction doit être constructive, jamais dure. Encourager tout en guidant. Voir potentiel, pas seulement erreurs.',
    difficulty: 5,
    keywords: ['correction', 'tadasu', 'guidance', 'constructive', 'teaching'],
    relatedTerms: ['teaching', 'correction', 'guidance', 'encouragement']
  },
  {
    id: 'mitori_geiko',
    japanese: '見取り稽古',
    romaji: 'mi-to-ri ge-i-ko',
    french: 'Apprendre en observant',
    english: 'Learning by watching',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Telescope', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Observation active',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Principe d\'apprendre par observation. Regarder sensei, sempai, même kohai. Chaque pratiquant enseigne quelque chose. Observation = formation continue.',
    difficulty: 4,
    keywords: ['observation', 'watching', 'learning', 'mitori', 'visual'],
    relatedTerms: ['learning', 'observation', 'training', 'awareness']
  },
  {
    id: 'teaching_patience',
    japanese: '教える忍耐',
    romaji: 'o-shi-e-ru nin-tai',
    french: 'Patience pédagogique',
    english: 'Teaching patience',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Clock', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Temps nécessaire',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Patience essentielle pour enseigner. Chacun apprend à son rythme. Répéter sans frustration. Comprendre que maîtrise prend années.',
    difficulty: 4,
    keywords: ['patience', 'teaching', 'time', 'compassion', 'understanding'],
    relatedTerms: ['teaching', 'patience', 'compassion', 'time']
  },
  {
    id: 'safe_practice_leader',
    japanese: '安全練習リーダー',
    romaji: 'an-zen ren-shu ri-da',
    french: 'Leader sécurité pratique',
    english: 'Safe practice leader',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'ShieldCheck', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Vigilance constante',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Responsabilité sécurité du groupe. Surveiller débutants. Intervenir si dangereux. Créer environnement safe. Sécurité = priorité absolue.',
    difficulty: 3,
    keywords: ['safety', 'leader', 'responsibility', 'supervision', 'care'],
    relatedTerms: ['safety', 'leadership', 'responsibility', 'care']
  },
  {
    id: 'lead_by_example',
    japanese: '模範を示す',
    romaji: 'mo-han wo shi-me-su',
    french: 'Montrer l\'exemple',
    english: 'Lead by example',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Star', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Exemplarité',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Enseigner par l\'exemple. Attitude, respect, effort visible. Élèves copient comportement autant que technique. Être modèle constant.',
    difficulty: 4,
    keywords: ['example', 'model', 'leadership', 'behavior', 'role model'],
    relatedTerms: ['leadership', 'example', 'behavior', 'influence']
  },
  {
    id: 'encourage_growth',
    japanese: '成長を励ます',
    romaji: 'se-i-cho wo ha-ge-ma-su',
    french: 'Encourager croissance',
    english: 'Encourage growth',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'TrendingUp', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Développement positif',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Encourager progression de chaque élève. Célébrer petites victoires. Reconnaître effort, pas seulement résultat. Créer momentum positif.',
    difficulty: 4,
    keywords: ['encouragement', 'growth', 'development', 'positive', 'support'],
    relatedTerms: ['teaching', 'encouragement', 'growth', 'support']
  },
  {
    id: 'adapt_to_student',
    japanese: '生徒に適応',
    romaji: 'se-i-to ni te-ki-o',
    french: 'Adapter à l\'élève',
    english: 'Adapt to student',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Users', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Enseignement individualisé',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Adapter enseignement à chaque élève. Certains visuels, autres kinesthésiques. Âges, capacités différentes. Flexibilité pédagogique essentielle.',
    difficulty: 5,
    keywords: ['adaptation', 'individual', 'flexibility', 'personalized', 'teaching'],
    relatedTerms: ['teaching', 'adaptation', 'flexibility', 'individual']
  }
]

function generateBlack1Unit1Exercises(): Exercise[] {
  const exercises: Exercise[] = []

  exercises.push({
    id: 'black1_unit1_ex1',
    type: 'term_to_icon',
    question: 'Quel est le nouveau rôle du shodan (1er dan) ?',
    terminologyItem: black1Unit1Terminology[0],
    options: [
      { id: 'opt1', value: 'Rôle pédagogique', iconData: black1Unit1Terminology[0].iconData, isCorrect: true },
      { id: 'opt2', value: 'Démonstration claire', iconData: black1Unit1Terminology[1].iconData, isCorrect: false },
      { id: 'opt3', value: 'Vigilance constante', iconData: black1Unit1Terminology[6].iconData, isCorrect: false },
      { id: 'opt4', value: 'Exemplarité', iconData: black1Unit1Terminology[7].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Kyoju dairi = assistant enseignant',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit1_ex2',
    type: 'icon_to_term',
    question: 'Quelle qualité prime lors d\'une démonstration technique ?',
    terminologyItem: black1Unit1Terminology[1],
    options: [
      { id: 'opt1', value: 'Clarté visuelle (visible de tous)', isCorrect: true },
      { id: 'opt2', value: 'Vitesse maximale', isCorrect: false },
      { id: 'opt3', value: 'Complexité technique', isCorrect: false },
      { id: 'opt4', value: 'Montrer sa force', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Misete miru = montrer clairement, clarté > vitesse',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit1_ex3',
    type: 'term_to_icon',
    question: 'Comment devez-vous adapter vos explications verbales ?',
    terminologyItem: black1Unit1Terminology[2],
    options: [
      { id: 'opt1', value: 'Mots justes', iconData: black1Unit1Terminology[2].iconData, isCorrect: true },
      { id: 'opt2', value: 'Correction bienveillante', iconData: black1Unit1Terminology[3].iconData, isCorrect: false },
      { id: 'opt3', value: 'Observation active', iconData: black1Unit1Terminology[4].iconData, isCorrect: false },
      { id: 'opt4', value: 'Enseignement individualisé', iconData: black1Unit1Terminology[9].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Adapter langage au niveau, utiliser images',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit1_ex4',
    type: 'icon_to_term',
    question: 'Comment les corrections doivent-elles être données ?',
    terminologyItem: black1Unit1Terminology[3],
    options: [
      { id: 'opt1', value: 'Constructives et encourageantes', isCorrect: true },
      { id: 'opt2', value: 'Dures et strictes', isCorrect: false },
      { id: 'opt3', value: 'Seulement pointer erreurs', isCorrect: false },
      { id: 'opt4', value: 'Jamais corriger', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Tadasu = corriger en voyant potentiel',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit1_ex5',
    type: 'term_to_icon',
    question: 'Quel principe encourage apprentissage continu par observation ?',
    terminologyItem: black1Unit1Terminology[4],
    options: [
      { id: 'opt1', value: 'Observation active', iconData: black1Unit1Terminology[4].iconData, isCorrect: true },
      { id: 'opt2', value: 'Temps nécessaire', iconData: black1Unit1Terminology[5].iconData, isCorrect: false },
      { id: 'opt3', value: 'Développement positif', iconData: black1Unit1Terminology[8].iconData, isCorrect: false },
      { id: 'opt4', value: 'Mots justes', iconData: black1Unit1Terminology[2].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Mitori geiko = apprendre en regardant tous',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit1_ex6',
    type: 'icon_to_term',
    question: 'Quelle qualité est essentielle pour enseigner efficacement ?',
    terminologyItem: black1Unit1Terminology[5],
    options: [
      { id: 'opt1', value: 'Patience - chacun apprend à son rythme', isCorrect: true },
      { id: 'opt2', value: 'Exigence immédiate', isCorrect: false },
      { id: 'opt3', value: 'Frustration si lent', isCorrect: false },
      { id: 'opt4', value: 'Abandonner si difficile', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Répéter sans frustration, maîtrise prend années',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit1_ex7',
    type: 'term_to_icon',
    question: 'Quelle est la priorité absolue en enseignant ?',
    terminologyItem: black1Unit1Terminology[6],
    options: [
      { id: 'opt1', value: 'Vigilance constante', iconData: black1Unit1Terminology[6].iconData, isCorrect: true },
      { id: 'opt2', value: 'Rôle pédagogique', iconData: black1Unit1Terminology[0].iconData, isCorrect: false },
      { id: 'opt3', value: 'Exemplarité', iconData: black1Unit1Terminology[7].iconData, isCorrect: false },
      { id: 'opt4', value: 'Observation active', iconData: black1Unit1Terminology[4].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Sécurité du groupe = responsabilité du leader',
    difficulty: 3,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit1_ex8',
    type: 'icon_to_term',
    question: 'Comment influencez-vous le plus vos élèves ?',
    terminologyItem: black1Unit1Terminology[7],
    options: [
      { id: 'opt1', value: 'Par votre exemple personnel', isCorrect: true },
      { id: 'opt2', value: 'Par vos paroles seulement', isCorrect: false },
      { id: 'opt3', value: 'Par votre force technique', isCorrect: false },
      { id: 'opt4', value: 'Par votre grade', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Élèves copient comportement autant que technique',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit1_ex9_recall',
    type: 'free_recall',
    question: 'Expliquez pourquoi adaptation à chaque élève est cruciale',
    terminologyItem: black1Unit1Terminology[9],
    options: [
      { id: 'hard', value: 'Je ne sais pas', isCorrect: false },
      { id: 'medium', value: 'Je sais que c\'est important', isCorrect: false },
      { id: 'good', value: 'Je peux expliquer styles apprentissage variés', isCorrect: true },
      { id: 'easy', value: 'Je peux adapter spontanément', isCorrect: true }
    ],
    correctAnswer: 'good',
    hint: 'Visuels, kinesthésiques, âges/capacités différents = flexibilité nécessaire',
    difficulty: 5,
    estimatedTime: 30
  })

  exercises.push({
    id: 'black1_unit1_ex10',
    type: 'term_to_icon',
    question: 'Comment créer momentum positif chez les élèves ?',
    terminologyItem: black1Unit1Terminology[8],
    options: [
      { id: 'opt1', value: 'Développement positif', iconData: black1Unit1Terminology[8].iconData, isCorrect: true },
      { id: 'opt2', value: 'Critique constante', iconData: black1Unit1Terminology[3].iconData, isCorrect: false },
      { id: 'opt3', value: 'Ignorer progrès', iconData: black1Unit1Terminology[4].iconData, isCorrect: false },
      { id: 'opt4', value: 'Focus erreurs seules', iconData: black1Unit1Terminology[6].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Célébrer petites victoires, reconnaître effort',
    difficulty: 4,
    estimatedTime: 15
  })

  return exercises
}

export const black1Unit1: LearningUnit = {
  id: 'black1_unit1',
  title: 'Fondamentaux de l\'enseignement',
  description: 'Premiers pas comme enseignant. Pédagogie, démonstration claire, correction bienveillante et leadership sécuritaire.',

  beltLevel: 'black_1',
  category: 'principles',

  terminology: black1Unit1Terminology,
  exercises: generateBlack1Unit1Exercises(),

  targetScore: 80,
  estimatedTime: 35,

  prerequisites: ['orange1_unit6'],
  isSafetyCritical: true // Teaching safety is critical responsibility
}
