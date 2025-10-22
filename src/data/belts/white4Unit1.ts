/**
 * Unit 1: Advanced Kamae (4ème Kyū)
 * Refined positioning and connection with partner
 */

import { TerminologyItem, LearningUnit, Exercise } from '@/types'

/** Terminology items for White 4 Unit 1 - Advanced Kamae */
export const white4Unit1Terminology: TerminologyItem[] = [
  {
    id: 'sankaku_kamae',
    japanese: '三角の構え',
    romaji: 'sankaku no kamae',
    french: 'Posture triangulaire',
    english: 'Triangular stance',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'Triangle',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Base triangulaire stable',
    category: 'positions',
    beltLevel: 'white_4',
    description: 'Posture formant un triangle avec les pieds et le centre. Base stable permettant mouvement multidirectionnel. Fondement du hanmi.',
    difficulty: 3,
    keywords: ['sankaku', 'triangle', 'kamae', 'posture', 'stable'],
    relatedTerms: ['hanmi', 'kamae', 'shizentai']
  },
  {
    id: 'maai_kamae',
    japanese: '間合いの構え',
    romaji: 'maai no kamae',
    french: 'Posture de distance',
    english: 'Distancing stance',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'Maximize2',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Distance optimale',
    category: 'positions',
    beltLevel: 'white_4',
    description: 'Kamae qui maintient la distance optimale (ma-ai) avec le partenaire. Ni trop près ni trop loin. Permet réaction et action.',
    difficulty: 3,
    keywords: ['maai', 'distance', 'kamae', 'spacing', 'optimal'],
    relatedTerms: ['ma-ai', 'kamae', 'issoku_ittou']
  },
  {
    id: 'chudan_kamae',
    japanese: '中段の構え',
    romaji: 'chudan no kamae',
    french: 'Garde du milieu',
    english: 'Middle level guard',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'Minus',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Niveau moyen',
    category: 'positions',
    beltLevel: 'white_4',
    description: 'Garde au niveau moyen (poitrine/plexus). Position équilibrée permettant attaque haute ou basse. Position standard en aïkido.',
    difficulty: 2,
    keywords: ['chudan', 'middle', 'guard', 'moyen', 'niveau'],
    relatedTerms: ['jodan_kamae', 'gedan_kamae', 'kamae']
  },
  {
    id: 'jodan_kamae',
    japanese: '上段の構え',
    romaji: 'jodan no kamae',
    french: 'Garde haute',
    english: 'High level guard',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'ArrowUp',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Niveau haut',
    category: 'positions',
    beltLevel: 'white_4',
    description: 'Garde au niveau haut (tête). Protège contre attaques hautes, menace shomen uchi. Posture offensive et défensive.',
    difficulty: 2,
    keywords: ['jodan', 'high', 'guard', 'haut', 'niveau'],
    relatedTerms: ['chudan_kamae', 'gedan_kamae', 'shomen_uchi']
  },
  {
    id: 'gedan_kamae',
    japanese: '下段の構え',
    romaji: 'gedan no kamae',
    french: 'Garde basse',
    english: 'Low level guard',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'ArrowDown',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Niveau bas',
    category: 'positions',
    beltLevel: 'white_4',
    description: 'Garde au niveau bas (hanches/genoux). Protège le centre bas, invite attaque haute. Position défensive stratégique.',
    difficulty: 2,
    keywords: ['gedan', 'low', 'guard', 'bas', 'niveau'],
    relatedTerms: ['chudan_kamae', 'jodan_kamae', 'kamae']
  },
  {
    id: 'tegatana',
    japanese: '手刀',
    romaji: 'tegatana',
    french: 'Main-sabre',
    english: 'Hand blade',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'Hand',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Tranchant de la main',
    category: 'positions',
    beltLevel: 'white_4',
    description: 'Forme de la main comme un sabre : doigts joints et tendus, pouce rentré. Concept fondamental : la main est un ken (sabre). Extension du ki.',
    difficulty: 2,
    keywords: ['tegatana', 'hand blade', 'sabre', 'main', 'extension'],
    relatedTerms: ['ken', 'bokken', 'extension']
  },
  {
    id: 'furi_kaburi',
    japanese: '振り被り',
    romaji: 'furikaburi',
    french: 'Lever l\'arme',
    english: 'Raising the weapon',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'ChevronUp',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Mouvement de préparation',
    category: 'movements',
    beltLevel: 'white_4',
    description: 'Action de lever les mains/armes au-dessus de la tête avant une coupe. Prépare shomen uchi. Génère puissance par gravité.',
    difficulty: 2,
    keywords: ['furi kaburi', 'raise', 'lever', 'préparation', 'strike'],
    relatedTerms: ['shomen_uchi', 'tegatana', 'ken']
  },
  {
    id: 'musubi',
    japanese: '結び',
    romaji: 'musubi',
    french: 'Connexion / Lien',
    english: 'Connection / Tying',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'Link',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Union avec partenaire',
    category: 'principles',
    beltLevel: 'white_4',
    description: 'Concept de connexion avec le partenaire. Lier énergies et mouvements. Fondamental en aïkido : ne pas combattre mais unir.',
    difficulty: 3,
    keywords: ['musubi', 'connection', 'lien', 'union', 'harmony'],
    relatedTerms: ['ki_musubi', 'awase', 'aiki']
  },
  {
    id: 'awase',
    japanese: '合わせ',
    romaji: 'awase',
    french: 'Harmonisation',
    english: 'Blending / Matching',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'Waves',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'S\'harmoniser',
    category: 'principles',
    beltLevel: 'white_4',
    description: 'S\'harmoniser avec l\'attaque du partenaire. Rejoindre son mouvement au lieu de s\'opposer. Clé de l\'aïkido efficace.',
    difficulty: 3,
    keywords: ['awase', 'blending', 'harmonisation', 'matching', 'join'],
    relatedTerms: ['musubi', 'aiki', 'ki_no_nagare']
  },
  {
    id: 'kokyu_power',
    japanese: '呼吸力',
    romaji: 'kokyu ryoku',
    french: 'Pouvoir de respiration',
    english: 'Breath power',
    iconType: 'lucide',
    iconData: {
      type: 'lucide',
      iconName: 'Wind',
      color: '#000000',
      strokeWidth: 2
    },
    iconCaption: 'Force respiratoire',
    category: 'principles',
    beltLevel: 'white_4',
    description: 'Pouvoir généré par coordination respiration-mouvement. Plus qu\'oxygène : timing, extension, relaxation unifiés.',
    difficulty: 4,
    keywords: ['kokyu', 'breath', 'power', 'respiration', 'timing'],
    relatedTerms: ['ki', 'extension', 'kokyu_nage']
  }
]

/** Generate exercises for White 4 Unit 1 */
function generateWhite4Unit1Exercises(): Exercise[] {
  const exercises: Exercise[] = []

  // Exercise 1: Term to Icon - sankaku kamae
  exercises.push({
    id: 'white4_unit1_ex1',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Sankaku no kamae" (posture triangulaire) ?',
    terminologyItem: white4Unit1Terminology[0],
    options: [
      {
        id: 'opt1',
        value: 'Base triangulaire',
        iconData: white4Unit1Terminology[0].iconData,
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Niveau moyen',
        iconData: white4Unit1Terminology[2].iconData,
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Connexion',
        iconData: white4Unit1Terminology[7].iconData,
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Main-sabre',
        iconData: white4Unit1Terminology[5].iconData,
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    hint: 'Sankaku = triangle en japonais',
    difficulty: 2,
    estimatedTime: 15
  })

  // Exercise 2: Icon to Term - chudan vs jodan vs gedan
  exercises.push({
    id: 'white4_unit1_ex2',
    type: 'icon_to_term',
    question: 'Quel niveau de kamae est représenté ?',
    terminologyItem: white4Unit1Terminology[2], // chudan
    options: [
      { id: 'opt1', value: 'Chudan (moyen)', isCorrect: true },
      { id: 'opt2', value: 'Jodan (haut)', isCorrect: false },
      { id: 'opt3', value: 'Gedan (bas)', isCorrect: false },
      { id: 'opt4', value: 'Maai (distance)', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Chudan = niveau du milieu (poitrine)',
    difficulty: 2,
    estimatedTime: 15
  })

  // Exercise 3: Term to Icon - tegatana
  exercises.push({
    id: 'white4_unit1_ex3',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Tegatana" (main-sabre) ?',
    terminologyItem: white4Unit1Terminology[5],
    options: [
      {
        id: 'opt1',
        value: 'Tranchant de la main',
        iconData: white4Unit1Terminology[5].iconData,
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Lever l\'arme',
        iconData: white4Unit1Terminology[6].iconData,
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Triangle',
        iconData: white4Unit1Terminology[0].iconData,
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Harmonisation',
        iconData: white4Unit1Terminology[8].iconData,
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    hint: 'La main utilisée comme un sabre',
    difficulty: 2,
    estimatedTime: 15
  })

  // Exercise 4: Icon to Term - musubi
  exercises.push({
    id: 'white4_unit1_ex4',
    type: 'icon_to_term',
    question: 'Quel principe est représenté par cette icône ?',
    terminologyItem: white4Unit1Terminology[7], // musubi
    options: [
      { id: 'opt1', value: 'Musubi (connexion)', isCorrect: true },
      { id: 'opt2', value: 'Awase (harmonisation)', isCorrect: false },
      { id: 'opt3', value: 'Kokyu (respiration)', isCorrect: false },
      { id: 'opt4', value: 'Tegatana (main-sabre)', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Musubi = lien, connexion avec le partenaire',
    difficulty: 3,
    estimatedTime: 15
  })

  // Exercise 5: Safety Quiz - tegatana safety
  exercises.push({
    id: 'white4_unit1_ex5_safety',
    type: 'safety_quiz',
    question: 'Lors de l\'utilisation du tegatana (main-sabre), comment protégez-vous votre poignet ?',
    terminologyItem: white4Unit1Terminology[5],
    options: [
      {
        id: 'opt1',
        value: 'Garder le poignet droit et aligné avec l\'avant-bras',
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Fléchir le poignet vers l\'arrière',
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Laisser le poignet complètement relâché',
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Fléchir le poignet vers l\'avant',
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    context: 'Un poignet bien aligné prévient les blessures et permet une extension correcte du ki.',
    difficulty: 2,
    estimatedTime: 20
  })

  // Exercise 6: Term to Icon - jodan kamae
  exercises.push({
    id: 'white4_unit1_ex6',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Jodan no kamae" (garde haute) ?',
    terminologyItem: white4Unit1Terminology[3],
    options: [
      {
        id: 'opt1',
        value: 'Niveau haut',
        iconData: white4Unit1Terminology[3].iconData,
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Niveau bas',
        iconData: white4Unit1Terminology[4].iconData,
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Niveau moyen',
        iconData: white4Unit1Terminology[2].iconData,
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Distance optimale',
        iconData: white4Unit1Terminology[1].iconData,
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    hint: 'Jodan = niveau supérieur (haut)',
    difficulty: 2,
    estimatedTime: 15
  })

  // Exercise 7: Icon to Term - awase
  exercises.push({
    id: 'white4_unit1_ex7',
    type: 'icon_to_term',
    question: 'Quel principe d\'harmonisation est représenté ?',
    terminologyItem: white4Unit1Terminology[8], // awase
    options: [
      { id: 'opt1', value: 'Awase (harmonisation)', isCorrect: true },
      { id: 'opt2', value: 'Musubi (connexion)', isCorrect: false },
      { id: 'opt3', value: 'Kokyu (respiration)', isCorrect: false },
      { id: 'opt4', value: 'Maai (distance)', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Awase = rejoindre, s\'harmoniser avec le mouvement',
    difficulty: 3,
    estimatedTime: 15
  })

  // Exercise 8: Term to Icon - kokyu power
  exercises.push({
    id: 'white4_unit1_ex8',
    type: 'term_to_icon',
    question: 'Quelle icône représente "Kokyu ryoku" (pouvoir de respiration) ?',
    terminologyItem: white4Unit1Terminology[9],
    options: [
      {
        id: 'opt1',
        value: 'Force respiratoire',
        iconData: white4Unit1Terminology[9].iconData,
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Harmonisation',
        iconData: white4Unit1Terminology[8].iconData,
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Main-sabre',
        iconData: white4Unit1Terminology[5].iconData,
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Connexion',
        iconData: white4Unit1Terminology[7].iconData,
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    hint: 'Kokyu = respiration, ryoku = pouvoir/force',
    difficulty: 3,
    estimatedTime: 15
  })

  // Exercise 9: Free Recall - levels of kamae
  exercises.push({
    id: 'white4_unit1_ex9_recall',
    type: 'free_recall',
    question: 'Nommez les trois niveaux de kamae (garde)',
    terminologyItem: white4Unit1Terminology[2], // chudan as reference
    options: [
      { id: 'hard', value: 'Je ne sais pas', isCorrect: false },
      { id: 'medium', value: 'Je connais 1-2 niveaux', isCorrect: false },
      { id: 'good', value: 'Je connais les 3 niveaux', isCorrect: true },
      { id: 'easy', value: 'Je connais tous et peux les démontrer', isCorrect: true }
    ],
    correctAnswer: 'good',
    hint: 'Jodan (haut), Chudan (moyen), Gedan (bas)',
    difficulty: 3,
    estimatedTime: 20
  })

  // Exercise 10: Safety Quiz - maai importance
  exercises.push({
    id: 'white4_unit1_ex10_safety',
    type: 'safety_quiz',
    question: 'Pourquoi le ma-ai (distance) est-il important pour la sécurité ?',
    terminologyItem: white4Unit1Terminology[1],
    options: [
      {
        id: 'opt1',
        value: 'Il permet de réagir et évite les collisions',
        isCorrect: true
      },
      {
        id: 'opt2',
        value: 'Il impressionne le partenaire',
        isCorrect: false
      },
      {
        id: 'opt3',
        value: 'Il facilite les salutations',
        isCorrect: false
      },
      {
        id: 'opt4',
        value: 'Il permet de parler pendant la pratique',
        isCorrect: false
      }
    ],
    correctAnswer: 'opt1',
    context: 'Le bon ma-ai prévient les accidents : suffisamment proche pour la technique, assez loin pour la sécurité.',
    difficulty: 2,
    estimatedTime: 20
  })

  return exercises
}

/** Complete White 4 Unit 1 export */
export const white4Unit1: LearningUnit = {
  id: 'white4_unit1',
  title: 'Kamae avancés',
  description: 'Perfectionnez vos postures et développez la connexion avec le partenaire.',

  beltLevel: 'white_4',
  category: 'positions',

  terminology: white4Unit1Terminology,
  exercises: generateWhite4Unit1Exercises(),

  targetScore: 80,
  estimatedTime: 20,

  prerequisites: ['white5_unit1', 'white5_unit2', 'white5_unit3', 'white5_unit4'],
  isSafetyCritical: false
}
