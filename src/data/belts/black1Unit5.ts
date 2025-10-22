/**
 * Unit 5: O-Sensei's Vision (1er Dan - Black Belt)
 * Philosophy, budo spirit, aikido as "Way of Harmony"
 */

import { TerminologyItem, LearningUnit, Exercise } from '@/types'

export const black1Unit5Terminology: TerminologyItem[] = [
  {
    id: 'osensei_vision',
    japanese: '開祖の理想',
    romaji: 'ka-i-so no ri-so',
    french: 'Vision du fondateur',
    english: 'Founder\'s vision',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Eye', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Idéal suprême',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Vision de Morihei Ueshiba : aikido comme voie de paix et harmonie universelle. Au-delà technique martiale, outil pour transformer monde.',
    difficulty: 5,
    keywords: ['osensei', 'vision', 'founder', 'peace', 'harmony'],
    relatedTerms: ['philosophy', 'osensei', 'peace', 'harmony']
  },
  {
    id: 'budo_spirit',
    japanese: '武道精神',
    romaji: 'bu-do se-i-shin',
    french: 'Esprit du budo',
    english: 'Budo spirit',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Shield', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Âme guerrière',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Esprit des voies martiales. Courage, intégrité, compassion, discipline. Guerrier protège, ne détruit. Force au service de paix.',
    difficulty: 5,
    keywords: ['budo', 'spirit', 'martial', 'warrior', 'integrity'],
    relatedTerms: ['budo', 'spirit', 'warrior', 'integrity']
  },
  {
    id: 'peace_through_martial',
    japanese: '武による和',
    romaji: 'bu ni yo-ru wa',
    french: 'Paix par le martial',
    english: 'Peace through martial arts',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Handshake', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Paradoxe pacifique',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Paradoxe d\'O-Sensei : chercher paix à travers art martial. Comprendre violence pour la transcender. Maîtriser conflit pour l\'arrêter.',
    difficulty: 5,
    keywords: ['peace', 'martial', 'paradox', 'harmony', 'transcend'],
    relatedTerms: ['philosophy', 'peace', 'bu', 'harmony']
  },
  {
    id: 'universal_love',
    japanese: '万有愛護',
    romaji: 'ban-yu a-i-go',
    french: 'Amour universel',
    english: 'Universal love',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Heart', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Compassion totale',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Concept d\'O-Sensei : amour et protection pour tous êtres. Banyu = tout l\'univers, aigo = amour protecteur. Aikido protège attaquant aussi.',
    difficulty: 5,
    keywords: ['universal', 'love', 'banyu', 'compassion', 'protection'],
    relatedTerms: ['philosophy', 'love', 'compassion', 'protection']
  },
  {
    id: 'kotodama',
    japanese: '言霊',
    romaji: 'ko-to-da-ma',
    french: 'Esprit du mot',
    english: 'Spirit of word',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Volume2', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Pouvoir vocal',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Croyance d\'O-Sensei au pouvoir spirituel des sons. Koto = mot/son, dama = esprit. Pratiquait kiai spéciaux. Sons créent vibrations spirituelles.',
    difficulty: 4,
    keywords: ['kotodama', 'sound', 'spirit', 'vibration', 'spiritual'],
    relatedTerms: ['spiritual', 'kiai', 'sound', 'osensei']
  },
  {
    id: 'divine_technique',
    japanese: '神の技',
    romaji: 'ka-mi no wa-za',
    french: 'Technique du divin',
    english: 'Divine technique',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Star', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Expression sacrée',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'O-Sensei voyait aikido comme manifestation du divin. Technique parfaite = expression forces universelles. Entraînement = pratique spirituelle.',
    difficulty: 5,
    keywords: ['divine', 'technique', 'kami', 'spiritual', 'sacred'],
    relatedTerms: ['spiritual', 'divine', 'sacred', 'practice']
  },
  {
    id: 'no_enemy',
    japanese: '敵なし',
    romaji: 'te-ki na-shi',
    french: 'Pas d\'ennemi',
    english: 'No enemy',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Users', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Tous partenaires',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Enseignement d\'O-Sensei : en aikido, pas d\'ennemis. Attaquant est partenaire égaré à guider. Combat = échec. Harmonie = victoire.',
    difficulty: 5,
    keywords: ['no', 'enemy', 'partner', 'harmony', 'philosophy'],
    relatedTerms: ['philosophy', 'harmony', 'partner', 'peace']
  },
  {
    id: 'center_universe',
    japanese: '宇宙中心',
    romaji: 'u-chu chu-shin',
    french: 'Centre de l\'univers',
    english: 'Center of universe',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Circle', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Point central',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Concept d\'O-Sensei : trouver centre qui est point d\'union avec univers. Hara/tanden = centre physique et spirituel. Univers tourne autour.',
    difficulty: 5,
    keywords: ['center', 'universe', 'uchu', 'hara', 'tanden'],
    relatedTerms: ['center', 'hara', 'tanden', 'spiritual']
  },
  {
    id: 'purification_practice',
    japanese: '稽古清浄',
    romaji: 'ke-i-ko se-i-jo',
    french: 'Pratique purificatrice',
    english: 'Purifying practice',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Droplet', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Nettoyage spirituel',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Keiko (pratique) comme purification continue. Chaque entraînement nettoie corps et esprit. Éliminer ego, peur, colère. Retour état naturel pur.',
    difficulty: 4,
    keywords: ['purification', 'practice', 'keiko', 'cleansing', 'spiritual'],
    relatedTerms: ['misogi', 'practice', 'purification', 'spiritual']
  },
  {
    id: 'way_harmony',
    japanese: '和の道',
    romaji: 'wa no mi-chi',
    french: 'Voie de l\'harmonie',
    english: 'Way of harmony',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Compass', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Chemin d\'unité',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Essence finale aikido selon O-Sensei. Wa = harmonie/paix. Do = voie. Pas juste techniques, mais chemin de vie vers harmonie universelle.',
    difficulty: 5,
    keywords: ['way', 'harmony', 'wa', 'path', 'life'],
    relatedTerms: ['philosophy', 'harmony', 'way', 'path']
  }
]

function generateBlack1Unit5Exercises(): Exercise[] {
  const exercises: Exercise[] = []

  exercises.push({
    id: 'black1_unit5_ex1',
    type: 'term_to_icon',
    question: 'Quelle était la vision ultime d\'O-Sensei pour l\'aikido ?',
    terminologyItem: black1Unit5Terminology[0],
    options: [
      { id: 'opt1', value: 'Idéal suprême', iconData: black1Unit5Terminology[0].iconData, isCorrect: true },
      { id: 'opt2', value: 'Âme guerrière', iconData: black1Unit5Terminology[1].iconData, isCorrect: false },
      { id: 'opt3', value: 'Expression sacrée', iconData: black1Unit5Terminology[5].iconData, isCorrect: false },
      { id: 'opt4', value: 'Point central', iconData: black1Unit5Terminology[7].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Outil pour transformer monde vers paix',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit5_ex2',
    type: 'icon_to_term',
    question: 'Que caractérise l\'esprit du budo véritable ?',
    terminologyItem: black1Unit5Terminology[1],
    options: [
      { id: 'opt1', value: 'Courage, intégrité, compassion au service de paix', isCorrect: true },
      { id: 'opt2', value: 'Agressivité et domination', isCorrect: false },
      { id: 'opt3', value: 'Victoire à tout prix', isCorrect: false },
      { id: 'opt4', value: 'Destruction de l\'adversaire', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Guerrier protège, ne détruit',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit5_ex3',
    type: 'term_to_icon',
    question: 'Quel paradoxe O-Sensei enseignait-il ?',
    terminologyItem: black1Unit5Terminology[2],
    options: [
      { id: 'opt1', value: 'Paradoxe pacifique', iconData: black1Unit5Terminology[2].iconData, isCorrect: true },
      { id: 'opt2', value: 'Compassion totale', iconData: black1Unit5Terminology[3].iconData, isCorrect: false },
      { id: 'opt3', value: 'Tous partenaires', iconData: black1Unit5Terminology[6].iconData, isCorrect: false },
      { id: 'opt4', value: 'Chemin unité', iconData: black1Unit5Terminology[9].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Chercher paix à travers art martial',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit5_ex4',
    type: 'icon_to_term',
    question: 'Qui l\'aikido doit-il protéger selon O-Sensei ?',
    terminologyItem: black1Unit5Terminology[3],
    options: [
      { id: 'opt1', value: 'Tous êtres - même l\'attaquant', isCorrect: true },
      { id: 'opt2', value: 'Seulement soi-même', isCorrect: false },
      { id: 'opt3', value: 'Seulement les alliés', isCorrect: false },
      { id: 'opt4', value: 'Seulement les innocents', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Banyu aigo = amour protecteur universel',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit5_ex5',
    type: 'term_to_icon',
    question: 'Quel pouvoir O-Sensei attribuait-il aux sons ?',
    terminologyItem: black1Unit5Terminology[4],
    options: [
      { id: 'opt1', value: 'Pouvoir vocal', iconData: black1Unit5Terminology[4].iconData, isCorrect: true },
      { id: 'opt2', value: 'Nettoyage spirituel', iconData: black1Unit5Terminology[8].iconData, isCorrect: false },
      { id: 'opt3', value: 'Âme guerrière', iconData: black1Unit5Terminology[1].iconData, isCorrect: false },
      { id: 'opt4', value: 'Point central', iconData: black1Unit5Terminology[7].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Kotodama = sons créent vibrations spirituelles',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit5_ex6',
    type: 'icon_to_term',
    question: 'Comment O-Sensei voyait-il la technique parfaite ?',
    terminologyItem: black1Unit5Terminology[5],
    options: [
      { id: 'opt1', value: 'Manifestation du divin', isCorrect: true },
      { id: 'opt2', value: 'Simple mécanique physique', isCorrect: false },
      { id: 'opt3', value: 'Truc de combat', isCorrect: false },
      { id: 'opt4', value: 'Exercice gymnastique', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Expression forces universelles, pratique spirituelle',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit5_ex7',
    type: 'term_to_icon',
    question: 'Quelle est la relation avec l\'attaquant en aikido ?',
    terminologyItem: black1Unit5Terminology[6],
    options: [
      { id: 'opt1', value: 'Tous partenaires', iconData: black1Unit5Terminology[6].iconData, isCorrect: true },
      { id: 'opt2', value: 'Ennemis absolus', iconData: black1Unit5Terminology[1].iconData, isCorrect: false },
      { id: 'opt3', value: 'Adversaires à vaincre', iconData: black1Unit5Terminology[2].iconData, isCorrect: false },
      { id: 'opt4', value: 'Obstacles à éliminer', iconData: black1Unit5Terminology[5].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Pas d\'ennemis - partenaire égaré à guider',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit5_ex8',
    type: 'icon_to_term',
    question: 'Où est le point d\'union avec l\'univers ?',
    terminologyItem: black1Unit5Terminology[7],
    options: [
      { id: 'opt1', value: 'Centre hara/tanden', isCorrect: true },
      { id: 'opt2', value: 'Dans la tête', isCorrect: false },
      { id: 'opt3', value: 'Dans les mains', isCorrect: false },
      { id: 'opt4', value: 'À l\'extérieur du corps', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Centre physique et spirituel, univers tourne autour',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit5_ex9_recall',
    type: 'free_recall',
    question: 'Expliquez pourquoi aikido est voie de vie, pas simple sport',
    terminologyItem: black1Unit5Terminology[9],
    options: [
      { id: 'hard', value: 'Je ne sais pas', isCorrect: false },
      { id: 'medium', value: 'Je sais que c\'est important', isCorrect: false },
      { id: 'good', value: 'Je peux expliquer vision d\'O-Sensei', isCorrect: true },
      { id: 'easy', value: 'Je vis cette philosophie', isCorrect: true }
    ],
    correctAnswer: 'good',
    hint: 'Wa no michi = chemin de vie vers harmonie universelle',
    difficulty: 5,
    estimatedTime: 30
  })

  exercises.push({
    id: 'black1_unit5_ex10',
    type: 'term_to_icon',
    question: 'Quel est l\'effet spirituel de la pratique régulière ?',
    terminologyItem: black1Unit5Terminology[8],
    options: [
      { id: 'opt1', value: 'Nettoyage spirituel', iconData: black1Unit5Terminology[8].iconData, isCorrect: true },
      { id: 'opt2', value: 'Pouvoir vocal', iconData: black1Unit5Terminology[4].iconData, isCorrect: false },
      { id: 'opt3', value: 'Expression sacrée', iconData: black1Unit5Terminology[5].iconData, isCorrect: false },
      { id: 'opt4', value: 'Idéal suprême', iconData: black1Unit5Terminology[0].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Keiko purifie corps et esprit continuellement',
    difficulty: 4,
    estimatedTime: 15
  })

  return exercises
}

export const black1Unit5: LearningUnit = {
  id: 'black1_unit5',
  title: 'Vision d\'O-Sensei',
  description: 'Philosophie profonde du fondateur. Aikido comme voie de paix, amour universel, manifestation du divin. Wa no michi.',

  beltLevel: 'black_1',
  category: 'principles',

  terminology: black1Unit5Terminology,
  exercises: generateBlack1Unit5Exercises(),

  targetScore: 80,
  estimatedTime: 35,

  prerequisites: ['black1_unit4'],
  isSafetyCritical: false
}
