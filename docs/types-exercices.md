# Catalogue des types d'exercices — Aikido Lingo

Aikido Lingo reprend les mécaniques d'exercice de Duolingo (catalogue établi et sourcé pour le
projet modèle LuxLingo, `C:\dev\letz-learn\docs\types-exercices.md`, revérifié le 2026-10-17) et les
adapte à ce qu'un pratiquant doit savoir **hors du tatami** : le vocabulaire japonais du dojo, le nom
des techniques demandées au passage de grade, l'étiquette (reishiki), l'ordre des gestes, quelques
repères d'histoire. L'application **n'enseigne pas le geste** : elle prépare à comprendre ce que dit
l'enseignant ou le jury, et renvoie toujours au tatami et à l'enseignant pour la pratique.

Le format des champs est défini dans `docs/contrat.md` (catalogue des 16 types). Ce document dit
**à quoi sert** chaque type, d'où il vient et comment bien l'écrire.

## Règles communes

- Chaque unité utilise au moins une fois chacun des 16 types ; chaque leçon en utilise au moins 3 ;
  exactement 8 exercices par leçon (leçon 8 = révision). On n'ajoute jamais un exercice pour caser un type.
- Chaque exercice cite au moins une source tirée de `content/referentiel/sources.md`.
- Les distracteurs sont **plausibles** (même famille : une autre attaque, une autre technique du même
  grade, une autre posture), jamais absurdes, et **jamais faux au point d'induire une erreur
  dangereuse** si l'élève les retient.
- L'explication (`explanation`) **enseigne** : elle dit pourquoi la bonne réponse est juste et ce que
  désignent les distracteurs, quand c'est utile.
- Ce qui varie selon les fédérations ou les écoles est dit comme tel (« selon la FFAAA… », « dans de
  nombreux dojos… ») et ne fait **jamais** l'objet d'une question à réponse unique.
- Romaji en Hepburn, convention de tirets de `content/referentiel/terminologie.yaml` (ex. `katate-dori`,
  `shomen-uchi`) ; les réponses tapées sont comparées sans casse, accents, tirets ni espaces, macrons ignorés.
- Kanji uniquement s'il est donné par une source du référentiel.
- Ukemi et techniques : formulation prudente (« sous la conduite de l'enseignant », « à son rythme »),
  pas d'instruction gestuelle détaillée qui remplacerait l'enseignant.

## Les 16 types

| Type | Origine Duolingo | Ce qu'il entraîne en aikido | Bons usages | Pièges à éviter |
|---|---|---|---|---|
| `meaning_choice` | « Select the correct meaning » | **Comprendre** un terme entendu au dojo (romaji → sens) | postures (*seiza*, *hanmi*), commandes (*hajime*, *yame*), noms d'attaques | options de longueur ou de style très différents (la bonne se devine) |
| `term_choice` | même mécanique, sens inverse (« Select the correct word ») | **Retrouver** le terme japonais à partir d'une description | « saisie d'un poignet par la main opposée » → *ai-hanmi katate-dori* | distracteurs qui sont aussi corrects selon une autre école |
| `kanji_choice` | pratique des caractères (« Let's learn Hiragana/Kanji ») | **Reconnaître** les kanji qu'on voit au dojo (calligraphies, diplômes, *dōjō*, *rei*) | kanji simples et sourcés : 合気道, 道場, 礼, 先生 | kanji non sourcés, lectures rares |
| `image_choice` | « Select the correct image » | **Associer** un terme à un objet ou une idée concrète | objets du dojo (*bokken*, *tatami*, *hakama*), nombres | emojis trompeurs : l'emoji illustre, il ne montre pas une technique |
| `match_pairs` | « Tap the matching pairs » | **Consolider** un petit lot de vocabulaire (4–5 paires) | parties du corps, attaques, postures, nombres | paires trop proches sémantiquement (deux réponses possibles) |
| `match_pairs_audio` | « Tap the matching pairs » (boutons audio) | **Reconnaître à l'oreille** des termes, comme quand l'enseignant les annonce | nombres (*ichi, ni, san*), commandes du cours | termes que la synthèse ja-JP prononce mal (vérifier sur l'appareil) |
| `listen_choose` | « What do you hear? » | **Entendre** un appel du jury ou de l'enseignant et l'identifier | « *shomen-uchi ikkyo* », « *onegaishimasu* » | options qui ne diffèrent que d'une voyelle longue (non discriminable en TTS) |
| `listen_type` | « Type what you hear » | **Orthographier** un terme entendu (mémorisation active) | noms courts et fréquents | expressions longues : réserver aux termes de 1–3 mots |
| `typed_term` | « Type the translation » (vers la langue cible) | **Rappel actif** : produire le terme sans aide | *seiza*, *ukemi*, *tatami*, le compte jusqu'à 10 | accepter les graphies légitimes (`acceptedAnswers` : *dojo* / *dōjō*, etc.) |
| `tile_build` | « Translate this sentence » (banque de mots) | **Composer** un nom de technique dans l'ordre d'appel : (posture) + attaque + technique + (omote/ura) | « *ai-hanmi katate-dori ikkyo omote* » | ordre qui varie selon les écoles : ne pas exiger un ordre non sourcé |
| `missing_word` | « Select the missing word » | **Compléter** une formule rituelle ou une phrase de cours | « ___ *shimasu* » (onegai), « *dōmo arigatō gozai*___ » | phrases inventées présentées comme des citations |
| `order_steps` | (pas d'équivalent strict : dérivé des tuiles « remettre dans l'ordre ») | **Séquencer** : déroulé d'un salut, du début/fin de cours, d'un passage de grade, d'une marche en *shikko* | étapes de 3 à 6, chacune vérifiable dans la source | ordre qui n'est pas fixé par la source (sinon : `true_false` ou `scenario` avec nuance) |
| `true_false` | (questions de compréhension des Stories/DuoRadio) | **Vérifier une idée reçue** ou un fait d'histoire ou de règlement | « Le salut se fait aussi en montant sur le tatami » | affirmations ambiguës ou vraies seulement dans certaines écoles |
| `scenario` | « Complete the chat » | **Savoir se conduire** : choisir l'attitude ou la réplique juste dans une situation de dojo | arriver en retard, changer de partenaire, se blesser, ne pas comprendre la consigne | présenter une coutume locale comme universelle ; la bonne réponse doit être défendable partout |
| `technique_decoder` | — (propre à l'aikido) | **Lire un nom de technique** : décomposer l'appel en attaque / technique / variante, ou retrouver l'appel à partir de la décomposition | « *shomen-uchi irimi-nage* » → attaque *shomen-uchi*, technique *irimi-nage* | techniques hors programme du niveau |
| `story` | Duolingo Stories | **Mettre en contexte** : récit d'un cours type, d'un passage de grade, épisode sourcé de la vie du fondateur | 4–8 répliques, 1–3 questions | récits historiques non sourcés ou anecdotes apocryphes présentées comme vraies |

## Répartition conseillée par thème

| Thème | Types privilégiés |
|---|---|
| Vocabulaire (postures, attaques, corps, objets) | `meaning_choice`, `term_choice`, `match_pairs`, `image_choice`, `typed_term` |
| Compter, commandes du cours | `match_pairs_audio`, `listen_choose`, `listen_type`, `missing_word` |
| Noms de techniques (programme de grade) | `technique_decoder`, `tile_build`, `listen_choose`, `term_choice` |
| Étiquette (reishiki) | `order_steps`, `scenario`, `true_false`, `missing_word` |
| Histoire, culture | `story`, `true_false`, `kanji_choice`, `meaning_choice` |

## Hors catalogue (volontairement)

- **Exercices de prononciation enregistrée** (« Speak this sentence ») : pas de reconnaissance vocale
  fiable pour le japonais isolé dans le navigateur, et peu utile pour l'objectif.
- **Démonstration gestuelle (vidéo)** : l'application ne remplace pas l'enseignant ; pas de vidéo de
  technique dans le parcours.

## Exemple

Un exercice de chaque type : `content/_exemples/demo-types.yaml`.
