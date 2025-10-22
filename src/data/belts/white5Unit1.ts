/**
 * Unit 1: Dojo Etiquette (5ème Kyū)
 * Fundamental respect and conduct in an Aikido dojo
 */

import { TerminologyItem, LearningUnit, Exercise } from '../../types'
import { stancesIcons } from '../icons'

/** Terminology items for Unit 1 */
export const unit1Terminology: TerminologyItem[] = [
  {
    id: 'rei',
    japanese: '礼',
    romaji: 'rei',
    french: 'Salut',
    english: 'Bow',
    iconType: 'composite',
    iconData: stancesIcons.rei,
    iconCaption: 'Salut respectueux',
    category: 'etiquette',
    beltLevel: 'white_5',
    description: 'Salut formel marquant respect et humilité. Se fait debout (ritsu rei) ou assis (za rei).',
    difficulty: 1,
    keywords: ['salut', 'respect', 'étiquette', 'bow'],
    relatedTerms: ['seiza', 'ritsu_rei', 'za_rei']
  },
  {
    id: 'seiza',
    japanese: '正座',
    romaji: 'sei-za',
    french: 'Position assise formelle',
    english: 'Formal sitting',
    iconType: 'emoji',
    iconData: stancesIcons.seiza,
    iconCaption: 'Assis sur les talons',
    category: 'positions',
    beltLevel: 'white_5',
    description: 'Position assise traditionnelle sur les talons, genoux au sol, dos droit.',
    difficulty: 1,
    keywords: ['assis', 'position', 'sitting', 'formal'],
    relatedTerms: ['rei', 'tatami']
  },
  {
    id: 'dojo',
    japanese: '道場',
    romaji: 'do-jo',
    french: 'Lieu d\'entraînement',
    english: 'Training hall',
    iconType: 'emoji',
    iconData: { type: 'emoji', emoji: '🏯' },
    iconCaption: 'Salle de pratique',
    category: 'etiquette',
    beltLevel: 'white_5',
    description: 'Lieu sacré où l\'on pratique la voie (do). Espace de respect et d\'apprentissage.',
    difficulty: 1,
    keywords: ['dojo', 'salle', 'training', 'hall'],
    relatedTerms: ['tatami', 'kamiza']
  },
  {
    id: 'sensei',
    japanese: '先生',
    romaji: 'sen-sei',
    french: 'Professeur',
    english: 'Teacher',
    iconType: 'emoji',
    iconData: { type: 'emoji', emoji: '👨‍🏫' },
    iconCaption: 'Instructeur',
    category: 'etiquette',
    beltLevel: 'white_5',
    description: 'Enseignant, celui qui était là avant. Mérite respect et attention.',
    difficulty: 1,
    keywords: ['professeur', 'enseignant', 'teacher', 'instructor'],
    relatedTerms: ['rei', 'dojo']
  },
  {
    id: 'uke',
    japanese: '受け',
    romaji: 'u-ke',
    french: 'Celui qui reçoit',
    english: 'Receiver',
    iconType: 'emoji',
    iconData: { type: 'emoji', emoji: '🤸' },
    iconCaption: 'Partenaire qui chute',
    category: 'etiquette',
    beltLevel: 'white_5',
    description: 'Partenaire qui reçoit la technique et chute. Rôle actif et essentiel.',
    difficulty: 2,
    keywords: ['uke', 'receiver', 'partenaire', 'chute'],
    relatedTerms: ['tori', 'ukemi']
  },
  {
    id: 'tori',
    japanese: '取り',
    romaji: 'to-ri',
    french: 'Celui qui prend',
    english: 'Taker',
    iconType: 'composite',
    iconData: {
      type: 'composite',
      elements: [
        {
          type: 'shape',
          shape: 'person',
          position: { x: 50, y: 50 },
          color: '#c62828',
          size: 40
        },
        {
          type: 'text',
          text: '✊',
          position: { x: 70, y: 45 },
          size: 24
        }
      ]
    },
    iconCaption: 'Celui qui exécute',
    category: 'etiquette',
    beltLevel: 'white_5',
    description: 'Partenaire qui exécute la technique. Guide le mouvement avec contrôle.',
    difficulty: 2,
    keywords: ['tori', 'taker', 'exécutant', 'technique'],
    relatedTerms: ['uke', 'nage']
  },
  {
    id: 'tatami',
    japanese: '畳',
    romaji: 'ta-ta-mi',
    french: 'Tapis',
    english: 'Mat',
    iconType: 'emoji',
    iconData: { type: 'emoji', emoji: '🟩' },
    iconCaption: 'Surface de pratique',
    category: 'etiquette',
    beltLevel: 'white_5',
    description: 'Tapis traditionnel japonais. Surface de pratique à respecter.',
    difficulty: 1,
    keywords: ['tatami', 'tapis', 'mat', 'surface'],
    relatedTerms: ['dojo']
  },
  {
    id: 'onegaishimasu',
    japanese: 'お願いします',
    romaji: 'o-ne-gai-shi-ma-su',
    french: 'S\'il vous plaît / Merci de m\'enseigner',
    english: 'Please teach me',
    iconType: 'emoji',
    iconData: { type: 'emoji', emoji: '🙏' },
    iconCaption: 'Demande respectueuse',
    category: 'etiquette',
    beltLevel: 'white_5',
    description: 'Formule de politesse au début de la pratique. Exprime humilité et désir d\'apprendre.',
    difficulty: 2,
    keywords: ['onegaishimasu', 'merci', 'please', 'politesse'],
    relatedTerms: ['arigatou', 'rei']
  },
  {
    id: 'arigatou',
    japanese: 'ありがとう',
    romaji: 'a-ri-ga-tou',
    french: 'Merci',
    english: 'Thank you',
    iconType: 'emoji',
    iconData: { type: 'emoji', emoji: '🙇' },
    iconCaption: 'Remerciement',
    category: 'etiquette',
    beltLevel: 'white_5',
    description: 'Remerciement à la fin de la pratique. Gratitude envers le partenaire.',
    difficulty: 1,
    keywords: ['arigatou', 'merci', 'thank you', 'gratitude'],
    relatedTerms: ['onegaishimasu', 'rei']
  },
  {
    id: 'kamiza',
    japanese: '上座',
    romaji: 'ka-mi-za',
    french: 'Place d\'honneur',
    english: 'Upper seat',
    iconType: 'composite',
    iconData: {
      type: 'composite',
      elements: [
        {
          type: 'text',
          text: '⛩️',
          position: { x: 50, y: 50 },
          size: 40
        }
      ]
    },
    iconCaption: 'Côté sacré du dojo',
    category: 'etiquette',
    beltLevel: 'white_5',
    description: 'Côté supérieur du dojo où se trouve souvent un autel. Direction du salut.',
    difficulty: 2,
    keywords: ['kamiza', 'honneur', 'autel', 'sacred'],
    relatedTerms: ['dojo', 'rei']
  }
]

/** Generate exercises for Unit 1 */
const generateUnit1Exercises = (): Exercise[] => {
  const exercises: Exercise[] = []

  // Exercise 1: Term to Icon - Rei
  exercises.push({
    id: 'ex1_term_to_icon_rei',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Rei" (salut) ?',
    terminologyItem: unit1Terminology[0],
    options: [
      {
        id: 'opt1',
        value: 'Salut respectueux',
        iconData: stancesIcons.rei,
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Position assise',
        iconData: stancesIcons.seiza,
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Position debout',
        iconData: stancesIcons.shizentai,
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'En garde',
        iconData: stancesIcons.kamae,
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    hint: 'Recherchez le mouvement vers le bas',
    difficulty: 1,
    estimatedTime: 15
  })

  // Exercise 2: Icon to Term - Seiza
  exercises.push({
    id: 'ex2_icon_to_term_seiza',
    type: 'icon_to_term',
    question: 'Quel est le terme japonais pour cette position ?',
    terminologyItem: unit1Terminology[1],
    options: [
      { id: 'opt1', value: 'Seiza', isCorrect: true },
      { id: 'opt2', value: 'Kamae', isCorrect: false },
      { id: 'opt3', value: 'Hanmi', isCorrect: false },
      { id: 'opt4', value: 'Shizentai', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Position assise formelle',
    difficulty: 1,
    estimatedTime: 15
  })

  // Exercise 3: Term to Icon - Dojo
  exercises.push({
    id: 'ex3_term_to_icon_dojo',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Dojo" ?',
    terminologyItem: unit1Terminology[2],
    options: [
      {
        id: 'opt1',
        value: 'Lieu d\'entraînement',
        iconData: { type: 'emoji', emoji: '🏯' },
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Professeur',
        iconData: { type: 'emoji', emoji: '👨‍🏫' },
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Tapis',
        iconData: { type: 'emoji', emoji: '🟩' },
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Chute',
        iconData: { type: 'emoji', emoji: '🤸' },
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    difficulty: 1,
    estimatedTime: 15
  })

  // Exercise 4: Icon to Term - Sensei
  exercises.push({
    id: 'ex4_icon_to_term_sensei',
    type: 'icon_to_term',
    question: 'Comment appelle-t-on le professeur en japonais ?',
    terminologyItem: unit1Terminology[3],
    options: [
      { id: 'opt1', value: 'Sensei', isCorrect: true },
      { id: 'opt2', value: 'Sempai', isCorrect: false },
      { id: 'opt3', value: 'Tori', isCorrect: false },
      { id: 'opt4', value: 'Uke', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    difficulty: 1,
    estimatedTime: 15
  })

  // Exercise 5: Safety Quiz - Respecting the Dojo
  exercises.push({
    id: 'ex5_safety_respect_dojo',
    type: 'safety_quiz',
    question: 'Que devez-vous faire en entrant sur le tatami ?',
    terminologyItem: unit1Terminology[2],
    options: [
      { id: 'opt1', value: 'Saluer (rei)', isCorrect: true },
      { id: 'opt2', value: 'Courir vers votre place', isCorrect: false },
      { id: 'opt3', value: 'Parler fort', isCorrect: false },
      { id: 'opt4', value: 'Garder vos chaussures', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Le respect est primordial',
    context: 'Le dojo est un lieu sacré qui mérite respect et attention',
    difficulty: 1,
    estimatedTime: 20
  })

  // Exercise 6: Term to Icon - Uke
  exercises.push({
    id: 'ex6_term_to_icon_uke',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Uke" (celui qui reçoit) ?',
    terminologyItem: unit1Terminology[4],
    options: [
      {
        id: 'opt1',
        value: 'Celui qui chute',
        iconData: { type: 'emoji', emoji: '🤸' },
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Celui qui exécute',
        iconData: {
          type: 'composite',
          elements: [
            { type: 'shape', shape: 'person', position: { x: 50, y: 50 }, color: '#c62828', size: 40 }
          ]
        },
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Professeur',
        iconData: { type: 'emoji', emoji: '👨‍🏫' },
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Salut',
        iconData: stancesIcons.rei,
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    difficulty: 2,
    estimatedTime: 15
  })

  // Exercise 7: Icon to Term - Onegaishimasu
  exercises.push({
    id: 'ex7_icon_to_term_onegai',
    type: 'icon_to_term',
    question: 'Que dit-on au début de la pratique ?',
    terminologyItem: unit1Terminology[7],
    options: [
      { id: 'opt1', value: 'Onegaishimasu', isCorrect: true },
      { id: 'opt2', value: 'Arigatou', isCorrect: false },
      { id: 'opt3', value: 'Sayonara', isCorrect: false },
      { id: 'opt4', value: 'Konnichiwa', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Formule de demande respectueuse',
    difficulty: 2,
    estimatedTime: 15
  })

  // Exercise 8: Free Recall - Tatami
  exercises.push({
    id: 'ex8_recall_tatami',
    type: 'free_recall',
    question: 'Quel est le terme pour le tapis de pratique ?',
    terminologyItem: unit1Terminology[6],
    correctAnswer: 'tatami',
    hint: 'Commence par "ta"',
    difficulty: 1,
    estimatedTime: 20
  })

  // Exercise 9: Safety Quiz - Partner Safety
  exercises.push({
    id: 'ex9_safety_partner',
    type: 'safety_quiz',
    question: 'Que doit faire Uke pendant la technique ?',
    terminologyItem: unit1Terminology[4],
    options: [
      { id: 'opt1', value: 'Coopérer et protéger son partenaire', isCorrect: true },
      { id: 'opt2', value: 'Résister avec force', isCorrect: false },
      { id: 'opt3', value: 'Rester passif', isCorrect: false },
      { id: 'opt4', value: 'Ignorer la technique', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    context: 'Uke a un rôle actif et responsable dans la sécurité',
    difficulty: 2,
    estimatedTime: 20
  })

  // Exercise 10: Icon to Term - Kamiza
  exercises.push({
    id: 'ex10_icon_to_term_kamiza',
    type: 'icon_to_term',
    question: 'Comment appelle-t-on la place d\'honneur du dojo ?',
    terminologyItem: unit1Terminology[9],
    options: [
      { id: 'opt1', value: 'Kamiza', isCorrect: true },
      { id: 'opt2', value: 'Shimoza', isCorrect: false },
      { id: 'opt3', value: 'Tatami', isCorrect: false },
      { id: 'opt4', value: 'Dojo', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Direction vers laquelle on salue',
    difficulty: 2,
    estimatedTime: 15
  })

  return exercises
}

/** Complete learning unit */
export const white5Unit1: LearningUnit = {
  id: 'white5_unit1',
  title: 'Étiquette du dojo',
  description: 'Apprenez les bases du respect et de la conduite dans un dojo d\'aïkido. Ces termes sont essentiels pour votre première pratique.',
  beltLevel: 'white_5',
  category: 'etiquette',
  terminology: unit1Terminology,
  exercises: generateUnit1Exercises(),
  targetScore: 80,
  estimatedTime: 15,
  prerequisites: [],
  isSafetyCritical: true
}
