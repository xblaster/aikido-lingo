/**
 * Unit 6: Continuous Journey (Shugyo) (1er Dan - Black Belt)
 * Lifelong learning, teaching others, refinement
 */

import { TerminologyItem, LearningUnit, Exercise } from '@/types'

export const black1Unit6Terminology: TerminologyItem[] = [
  {
    id: 'shugyo',
    japanese: '修行',
    romaji: 'shu-gyo',
    french: 'Entraînement austère',
    english: 'Austere training',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Mountain', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Chemin difficile',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Entraînement rigoureux et continu toute la vie. Shu = discipline, gyo = pratique. Shodan n\'est que début véritable. Montagne sans sommet.',
    difficulty: 5,
    keywords: ['shugyo', 'training', 'austere', 'discipline', 'lifelong'],
    relatedTerms: ['training', 'discipline', 'lifelong', 'journey']
  },
  {
    id: 'shodan_beginning',
    japanese: '初段始まり',
    romaji: 'sho-dan ha-ji-ma-ri',
    french: 'Shodan est début',
    english: 'Shodan is beginning',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Flag', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Premier jalon',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Shodan (1er dan) = premier pas, non arrivée. Sho = premier/début. Maîtrise basique acquise, apprentissage profond commence maintenant.',
    difficulty: 4,
    keywords: ['shodan', 'beginning', 'first', 'start', 'journey'],
    relatedTerms: ['shodan', 'beginning', 'journey', 'growth']
  },
  {
    id: 'teaching_learning',
    japanese: '教えることは学ぶこと',
    romaji: 'o-shi-e-ru ko-to wa ma-na-bu ko-to',
    french: 'Enseigner c\'est apprendre',
    english: 'Teaching is learning',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Users', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Croissance mutuelle',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'En enseignant on apprend deux fois. Expliquer révèle lacunes. Questions élèves approfondissent compréhension. Cercle vertueux enseignement-apprentissage.',
    difficulty: 4,
    keywords: ['teaching', 'learning', 'mutual', 'growth', 'circle'],
    relatedTerms: ['teaching', 'learning', 'growth', 'understanding']
  },
  {
    id: 'sempai_kohai',
    japanese: '先輩後輩',
    romaji: 'sem-pa-i ko-ha-i',
    french: 'Senior et junior',
    english: 'Senior and junior',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'ArrowUpDown', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Relation hiérarchique',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Système sempai-kohai. Sempai (senior) guide kohai (junior). Pas supériorité mais responsabilité. Kohai respecte, sempai protège et enseigne.',
    difficulty: 4,
    keywords: ['sempai', 'kohai', 'senior', 'junior', 'hierarchy'],
    relatedTerms: ['dojo', 'etiquette', 'teaching', 'respect']
  },
  {
    id: 'refine_basics',
    japanese: '基本を磨く',
    romaji: 'ki-hon wo mi-ga-ku',
    french: 'Polir les bases',
    english: 'Polish the basics',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Gem', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Raffinement continu',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Après shodan, retour aux kihon avec compréhension profonde. Polir bases encore et encore. Chaque répétition révèle nouvelle profondeur.',
    difficulty: 5,
    keywords: ['refine', 'basics', 'polish', 'kihon', 'depth'],
    relatedTerms: ['kihon', 'basics', 'refinement', 'mastery']
  },
  {
    id: 'beginner_expert',
    japanese: '初心者専門家',
    romaji: 'sho-shin-sha sem-mon-ka',
    french: 'Débutant-expert',
    english: 'Beginner-expert',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Repeat', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Paradoxe perpétuel',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Paradoxe shodan : expert ET débutant simultanément. Expert en bases, débutant en profondeur. Garder humilité tout en guidant.',
    difficulty: 5,
    keywords: ['beginner', 'expert', 'paradox', 'humility', 'depth'],
    relatedTerms: ['shoshin', 'humility', 'expertise', 'growth']
  },
  {
    id: 'daily_practice',
    japanese: '日々の稽古',
    romaji: 'hi-bi no ke-i-ko',
    french: 'Pratique quotidienne',
    english: 'Daily practice',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Calendar', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Régularité constante',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Pratique quotidienne essentielle. Pas marathons occasionnels. Régularité crée transformation. Petit effort chaque jour > grand effort rare.',
    difficulty: 4,
    keywords: ['daily', 'practice', 'regular', 'consistency', 'habit'],
    relatedTerms: ['practice', 'discipline', 'consistency', 'habit']
  },
  {
    id: 'contribute_community',
    japanese: 'コミュニティへの貢献',
    romaji: 'ko-myu-ni-ti he no ko-ken',
    french: 'Contribuer à la communauté',
    english: 'Contribute to community',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Heart', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Servir le dojo',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Shodan a responsabilité envers communauté dojo. Aider organisation, accueillir nouveaux, maintenir esprit. Recevoir ET donner.',
    difficulty: 4,
    keywords: ['contribute', 'community', 'dojo', 'service', 'responsibility'],
    relatedTerms: ['dojo', 'community', 'service', 'responsibility']
  },
  {
    id: 'lifelong_student',
    japanese: '生涯学生',
    romaji: 'sho-gai ga-ku-se-i',
    french: 'Étudiant à vie',
    english: 'Lifelong student',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'BookOpen', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Apprentissage éternel',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Toujours étudiant, jamais "fini". Shogai = toute la vie. Même 8e dan apprend. Curiosité et ouverture perpétuelles.',
    difficulty: 4,
    keywords: ['lifelong', 'student', 'learning', 'curiosity', 'eternal'],
    relatedTerms: ['learning', 'growth', 'humility', 'shoshin']
  },
  {
    id: 'path_continues',
    japanese: '道は続く',
    romaji: 'mi-chi wa tsu-zu-ku',
    french: 'Le chemin continue',
    english: 'The path continues',
    iconType: 'lucide',
    iconData: { type: 'lucide', iconName: 'Compass', color: '#000000', strokeWidth: 2 },
    iconCaption: 'Voyage infini',
    category: 'principles',
    beltLevel: 'black_1',
    description: 'Le do (chemin) n\'a pas de fin. Chaque fin est nouveau début. Shodan ouvre porte vers profondeur infinie. Voyage joyeux sans destination.',
    difficulty: 5,
    keywords: ['path', 'continues', 'journey', 'endless', 'do'],
    relatedTerms: ['do', 'journey', 'path', 'growth']
  }
]

function generateBlack1Unit6Exercises(): Exercise[] {
  const exercises: Exercise[] = []

  exercises.push({
    id: 'black1_unit6_ex1',
    type: 'term_to_icon',
    question: 'Quel concept décrit l\'entraînement rigoureux à vie ?',
    terminologyItem: black1Unit6Terminology[0],
    options: [
      { id: 'opt1', value: 'Chemin difficile', iconData: black1Unit6Terminology[0].iconData, isCorrect: true },
      { id: 'opt2', value: 'Premier jalon', iconData: black1Unit6Terminology[1].iconData, isCorrect: false },
      { id: 'opt3', value: 'Raffinement continu', iconData: black1Unit6Terminology[4].iconData, isCorrect: false },
      { id: 'opt4', value: 'Voyage infini', iconData: black1Unit6Terminology[9].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Shugyo = montagne sans sommet',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit6_ex2',
    type: 'icon_to_term',
    question: 'Que signifie vraiment obtenir shodan (1er dan) ?',
    terminologyItem: black1Unit6Terminology[1],
    options: [
      { id: 'opt1', value: 'C\'est le début du vrai voyage', isCorrect: true },
      { id: 'opt2', value: 'C\'est la fin de l\'apprentissage', isCorrect: false },
      { id: 'opt3', value: 'On a tout maîtrisé', isCorrect: false },
      { id: 'opt4', value: 'On peut arrêter d\'apprendre', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Sho = premier, maîtrise basique acquise seulement',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit6_ex3',
    type: 'term_to_icon',
    question: 'Quel bénéfice tire-t-on de l\'enseignement ?',
    terminologyItem: black1Unit6Terminology[2],
    options: [
      { id: 'opt1', value: 'Croissance mutuelle', iconData: black1Unit6Terminology[2].iconData, isCorrect: true },
      { id: 'opt2', value: 'Relation hiérarchique', iconData: black1Unit6Terminology[3].iconData, isCorrect: false },
      { id: 'opt3', value: 'Servir dojo', iconData: black1Unit6Terminology[7].iconData, isCorrect: false },
      { id: 'opt4', value: 'Apprentissage éternel', iconData: black1Unit6Terminology[8].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Enseigner c\'est apprendre deux fois',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit6_ex4',
    type: 'icon_to_term',
    question: 'Quelle est la vraie nature relation sempai-kohai ?',
    terminologyItem: black1Unit6Terminology[3],
    options: [
      { id: 'opt1', value: 'Responsabilité de guider, non supériorité', isCorrect: true },
      { id: 'opt2', value: 'Domination du senior', isCorrect: false },
      { id: 'opt3', value: 'Compétition hiérarchique', isCorrect: false },
      { id: 'opt4', value: 'Servitude du junior', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Sempai protège et enseigne, kohai respecte',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit6_ex5',
    type: 'term_to_icon',
    question: 'Que doit faire shodan avec les techniques de base ?',
    terminologyItem: black1Unit6Terminology[4],
    options: [
      { id: 'opt1', value: 'Raffinement continu', iconData: black1Unit6Terminology[4].iconData, isCorrect: true },
      { id: 'opt2', value: 'Les abandonner', iconData: black1Unit6Terminology[6].iconData, isCorrect: false },
      { id: 'opt3', value: 'Les ignorer', iconData: black1Unit6Terminology[7].iconData, isCorrect: false },
      { id: 'opt4', value: 'Les considérer acquises', iconData: black1Unit6Terminology[1].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Polir kihon encore et encore révèle profondeur',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit6_ex6',
    type: 'icon_to_term',
    question: 'Quel paradoxe caractérise shodan ?',
    terminologyItem: black1Unit6Terminology[5],
    options: [
      { id: 'opt1', value: 'Expert en bases, débutant en profondeur', isCorrect: true },
      { id: 'opt2', value: 'Tout savoir, rien apprendre', isCorrect: false },
      { id: 'opt3', value: 'Enseigner sans étudier', isCorrect: false },
      { id: 'opt4', value: 'Maîtrise totale immédiate', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Expert ET débutant - garder humilité',
    difficulty: 5,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit6_ex7',
    type: 'term_to_icon',
    question: 'Quelle approche entraînement est la plus efficace ?',
    terminologyItem: black1Unit6Terminology[6],
    options: [
      { id: 'opt1', value: 'Régularité constante', iconData: black1Unit6Terminology[6].iconData, isCorrect: true },
      { id: 'opt2', value: 'Marathons occasionnels', iconData: black1Unit6Terminology[0].iconData, isCorrect: false },
      { id: 'opt3', value: 'Effort intense rare', iconData: black1Unit6Terminology[4].iconData, isCorrect: false },
      { id: 'opt4', value: 'Pratique aléatoire', iconData: black1Unit6Terminology[9].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Petit effort chaque jour > grand effort rare',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit6_ex8',
    type: 'icon_to_term',
    question: 'Quelle responsabilité shodan a-t-il envers le dojo ?',
    terminologyItem: black1Unit6Terminology[7],
    options: [
      { id: 'opt1', value: 'Contribuer activement à la communauté', isCorrect: true },
      { id: 'opt2', value: 'Seulement prendre des cours', isCorrect: false },
      { id: 'opt3', value: 'Ignorer les autres', isCorrect: false },
      { id: 'opt4', value: 'Se concentrer sur soi uniquement', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Recevoir ET donner - servir communauté',
    difficulty: 4,
    estimatedTime: 15
  })

  exercises.push({
    id: 'black1_unit6_ex9_recall',
    type: 'free_recall',
    question: 'Expliquez pourquoi "le chemin continue" même après shodan',
    terminologyItem: black1Unit6Terminology[9],
    options: [
      { id: 'hard', value: 'Je ne comprends pas', isCorrect: false },
      { id: 'medium', value: 'Je sais qu\'on doit continuer', isCorrect: false },
      { id: 'good', value: 'Je comprends le concept de do (voie sans fin)', isCorrect: true },
      { id: 'easy', value: 'Je vis cette philosophie quotidiennement', isCorrect: true }
    ],
    correctAnswer: 'good',
    hint: 'Do = chemin sans destination, chaque fin = nouveau début',
    difficulty: 5,
    estimatedTime: 30
  })

  exercises.push({
    id: 'black1_unit6_ex10',
    type: 'term_to_icon',
    question: 'Quelle mentalité garder toute la vie en aikido ?',
    terminologyItem: black1Unit6Terminology[8],
    options: [
      { id: 'opt1', value: 'Apprentissage éternel', iconData: black1Unit6Terminology[8].iconData, isCorrect: true },
      { id: 'opt2', value: 'Savoir acquis final', iconData: black1Unit6Terminology[1].iconData, isCorrect: false },
      { id: 'opt3', value: 'Fin des études', iconData: black1Unit6Terminology[5].iconData, isCorrect: false },
      { id: 'opt4', value: 'Compétence maximale', iconData: black1Unit6Terminology[4].iconData, isCorrect: false }
    ],
    correctAnswer: 'opt1',
    hint: 'Shogai gakusei - toujours étudiant, même 8e dan',
    difficulty: 4,
    estimatedTime: 15
  })

  return exercises
}

export const black1Unit6: LearningUnit = {
  id: 'black1_unit6',
  title: 'Voyage continu (Shugyo)',
  description: 'Shodan est le début. Apprentissage à vie, enseigner pour apprendre, polir les bases, contribuer. Le chemin continue.',

  beltLevel: 'black_1',
  category: 'principles',

  terminology: black1Unit6Terminology,
  exercises: generateBlack1Unit6Exercises(),

  targetScore: 80,
  estimatedTime: 35,

  prerequisites: ['black1_unit5'],
  isSafetyCritical: false
}
