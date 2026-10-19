# Design

## Context

Voir `proposal.md` (Why). L'application est un export statique Next.js : les médias sont des fichiers de
`public/` sans optimisation serveur (`images.unoptimized`). Le contrat (`docs/contrat.md`) prévoit
`illustration: { image?, emoji, alt }`. Les médias viennent de trois origines (libre, filmé, généré) ;
la recherche des médias libres est en cours (`docs/images/sources-libres.md`).

## Goals / Non-Goals

**Goals**
- Une seule source de vérité (le manifeste) pour la liste, l'origine, la licence, la vidéo et le statut
  de relecture de chaque média.
- Application complète sans aucun média : l'emoji reste le repli.

**Non-Goals**
- Pas un média par leçon : 57 entrées réutilisées par toutes les unités.
- Pas de cours vidéo complet ni de démonstration intégrale d'une technique : un média illustre une
  situation de base ; la technique s'apprend sur le tatami.
- Pas de génération à l'exécution.

## Decisions

1. **Référence par identifiant `<famille>/<id>`** plutôt que par chemin : la validation vérifie
   l'identifiant contre le manifeste. *Écarté* : `src` libre, qui laisse le contenu inventer des médias.
2. **Préférence libre > filmé > généré.** Une photo ou une vidéo réelle montre une situation vraie ; un
   dessin généré peut se tromper sur une saisie ou un appui. Le dessin généré est imposé **non
   photoréaliste** pour ne jamais passer pour une vraie séance. *Écarté* : tout générer (cohérence
   maximale mais justesse technique incertaine), photos générées (trompeuses).
3. **Pas de vidéo de technique générée** : erreurs de mouvement probables et risque de blessure si
   imitées. Les vidéos viennent de sources libres, d'intégrations officielles ou d'un tournage au club.
4. **Deux modes vidéo.** Fichier WebM court, muet, en boucle (hébergé, hors ligne possible, licence
   compatible requise) ; ou intégration `youtube-nocookie` chargée **au clic** et limitée à un segment
   (pas de requête tierce à l'affichage, pas besoin du droit de réhéberger). *Écarté* : lecteur intégré
   chargé d'office (requêtes tierces, poids).
5. **Manifeste copié dans `src/data/generated/images.json`** par `build-content`, avec emoji de repli,
   origine et statut : l'interface ne lit pas le système de fichiers ; la page « Crédits » en est
   générée.
6. **Repli côté client** : cadre de format fixe par famille (4:3 pour `scenes`, 2:1 pour `covers` et
   `modules`), bascule sur l'emoji sur `onError` ; en production un média non `valide` n'est pas demandé.
7. **Palette = jetons Tailwind `aiki.*`** partagés par l'interface et le prompt de génération ; les
   photos libres ne sont pas recolorées (cohérence par cadrage et format, pas par filtre).
8. **WebP** pour les images, **WebM** pour les clips.

## Risks / Trade-offs

- [Mélange photos / dessins hétérogène] → mêmes formats et cadres, une famille entière d'une même
  origine quand c'est possible (ex. toutes les attaques en photo ou toutes en dessin).
- [Saisie ou appui faux] → auto-contrôle du prompt, relecture par un gradé, repli emoji en production
  tant que non validé.
- [Droit à l'image sur les photos libres] → une licence CC ne couvre pas le droit à l'image : signalement
  des personnes reconnaissables, aucun mineur identifiable, vérification avant publication.
- [Vidéo externe supprimée ou modifiée] → l'image reste affichée ; contrôle périodique des liens.
- [ShareAlike (CC BY-SA)] → s'applique à l'image elle-même (et ses retouches), pas à l'application :
  attribution et licence affichées dans « Crédits ».

## Migration Plan

1. Technique : jetons, champs, composant de média, `images.json`, contrôles — tout s'affiche en emoji.
2. Recherche : sources libres ; l'utilisateur valide les recommandations ; l'origine est reportée.
3. Médias libres importés, puis génération Antigravity du reste, puis relecture par lots.
Retour arrière : retirer un fichier ou passer son statut à `refuse` restaure l'emoji.

## Open Questions

- Le club de l'utilisateur peut-il filmer les clips des attaques et des chutes ? Sans effet sur
  l'implémentation : l'origine `filme` est déjà prévue.
- Qui est le relecteur gradé des médias ? Le champ `relecteur` est libre.
