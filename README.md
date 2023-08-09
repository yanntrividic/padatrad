# Padatrad

Padatrad permet de traduire collectivement des textes et de les éditer depuis un navigateur web. Cette webapp est totalement rédigée en JavaScript ES6. Elle s'appuie sur les [Etherpads](https://fr.wikipedia.org/wiki/Etherpad), lit les contenus en [Markdown](https://fr.wikipedia.org/wiki/Markdown), et génère la prévisualisation pour l'impression avec la bibliothèque [PagedJS](https://pagedjs.org).

![Vue du logiciel](https://gitlab.com/editionsburnaout/padatrad/-/raw/master/screenshot.png){width=100%}

## Description

Ce projet s'intéresse au paradigme _fetch, convert & publish_ en mettant un accent sur la traduction collective. Étant donné qu'il n'existait à notre connaissance aucun logiciel libre facilitant l'édition de traductions à plusieurs, nous l'avons fait nous-même. Dans l'idée, nous avons cherché à faire une application qui serait la plus légère possible et la plus facile à installer. Tout est en JS vanille, pèse moins d'un mégaoctet, et est entièrement portable (à l'exception des instances d'Etherpad).

Si le paradigme vous intéresse plus que la traduction collective en tant que telle, peut-être trouverez-vous votre bonheur ici : [pad2print](https://gitlab.com/Luuse/pad2print) de Luuse, [Ethertoff](http://osp.kitchen/tools/ethertoff/) ou [Ether2html](http://osp.kitchen/tools/ether2html/) d’Open Source Publishing, [Collabprint](https://gitlab.com/quentinjuhel/collabprint) de Quentin Juhel, [Octomode](https://git.vvvvvvaria.org/varia/octomode) de Varia, [Libreto](https://libreto.net/) de Pierre Tandille, ou encore [Pink my pad!](https://pinkmypad.net/) de Nicolas Sauret[^julienb].

[^julienb]: https://www.accentgrave.net/log/.

## Installation

Commencez par télécharger la dernière version de Padatrad [ici](https://gitlab.com/editionsburnaout/padatrad/-/tags). Décompressez l'archive. À partir de là, vous n'aurez besoin que d'un serveur HTTP. Celui-ci peut tourner sur votre machine en local ou être connecté à Internet. Dans les deux cas, vous n'avez aucune autre dépendance à installer pour que Padatrad puisse fonctionner correctement. Si tout est bon, alors vous pouvez ouvrir un navigateur web à l'URL de votre projet ; ça devrait déjà fonctionner.

### Fichier `config.js`

Le fichier `config.js` vous permet de vous approprier votre instance de Padatrad. Vous pouvez renseigner un titre pour votre projet, spécifier la langue cible et la langue source de votre traduction, etc. Le texte contenu dans le champ `infoText` est affiché dans la fenêtre pop-up qui apparaît lorsqu'un·e utilisateurice clique sur le bouton `Infos` du menu latéral. Les champs `extraUrlLabel` et `extraUrl` permettent d'ajouter un bouton de votre choix dans le menu latéral.

### Renseigner ses pads 

Le fichier `pads.json` vous permet de préciser sur quels pads sont vos contenus. Padatrad reconnait deux types de pads : `md` pour les pads contenant vos textes, au format Markdown ; `css` pour vos feuilles de style CSS. Vous pouvez utiliser autant de pads que vous le souhaitez. Chaque pad en Markdown correspond à une section de votre document, et chaque pad CSS correspond à une feuille de style. Les différents pads sont chargés dans l'ordre spécifié dans ce fichier. Maintenant, concernant les autres champs :

* `id` doit être rempli avec un nom unique ;
* `string` vous permettra de retrouver votre pad dans le menu latéral ;
* `url` doit contenir l'URL du pad correspondant.

Une liste des CHATONS ayant déployé une instance publique d'Etherpad est disponible [ici](https://wiki.chatons.org/doku.php/services/bureautique_en_ligne/etherpad). 

> **Attention :** Veillez à n'utiliser qu'un pad par serveur, autrement les serveurs concernés croiront que vous essayez de les DDOS et bloqueront vos requêtes.

## Usage

Une fois vos fichiers `config.js` et `pads.json` prêts, vous pouvez commencer à remplir vos pads.

### Préparation des fichiers et traduction

Les pads contenant vos textes sources comme vos textes traduits devront être rédigés en Markdown. Padatrad a recours au convertisseur Markdownit, dont la syntaxe est explicitée [ici](https://markdown-it.github.io/). Dans un premier temps, chaque section de votre texte source doit être convertie en Markdown et mise dans chaque pad (protip : pour faire ça, allez voir du côté de [Pandoc](https://pandoc.org/)). Prenons maintenant l'exemple d'une traduction de l'anglais vers le français avec un pad unique contenant un titre de niveau 1 et deux paragraphes :

```markdown
# Example text

This is an example for a translation from english to french.

There is not much else to say about this example.
```

Une fois le texte prêt dans votre pad, il devrait apparaître aussi dans la prévisualisation de Padatrad. Vous pouvez alors commencer la traduction. Par exemple, pour traduire le premier paragraphe, ajoutez votre traduction sous le texte source concerné et précisez qu'il s'agit du texte cible en ajoutant la classe `{.fr}` en fin de paragraphe :

```markdown
This is an example for a translation from english to french.

Ceci est un example de traduction de l'anglais vers le français. {.fr}
```

Dans la prévisualisation, votre traduction devrait normalement remplacer le paragraphe source et être mis en valeur par un surlignement jaune. Un surlignement jaune indique que le texte a été traduit, mais pas encore validé. Vous pouvez désactiver le surlignement en cliquant sur le pourcentage de traduction effectué dans le menu latéral. Pour valider la traduction, ajoutez la classe `.accepted` à votre proposition :

```markdown
Ceci est un example de traduction de l'anglais vers le français. {.fr .accepted}
```

Maintenant que vous savez comment traduire un paragraphe, vous savez virtuellement comment traduire tout type de document. Padatrad dispose aussi d'une fonctionnalité permettant de spécifier des variantes de traduction. Par exemple, vous pourriez vouloir voir coexister deux traductions pour la phrase précédente ; en plus de la première, on pourrait imaginer "Ceci est un example de traduction de la langue de Shakespeare vers celle de Molière." C'est possible en suivant cette syntaxe : 

```markdown
Ceci est un example de traduction de [l'anglais vers le français]{alt="la langue de Shakespeare vers celle de Molière"}. {.fr .accepted}
```

Le texte apparaît alors surligné en rouge et une des deux versions est tirée au hasard lors de la génération de la prévisualisation. Si vous souhaitez ajouter des alternatives, vous pouvez en rajouter à la suite de la première, entre les accolades, en précédant la proposition non pas de `alt` mais de `alt1`, `alt2`, `alt3`, etc. Vous pouvez parcourir les alternatives dans la prévisualisation en cliquant sur le texte correspondant.

Si vous souhaitez ne pas effectuer de tirage aléatoire dans la prévisualisation, alors ajoutez le mot-clé `default` entre les accolades. Dans l'exemple suivant, _traduction_ apparaîtra toujours en premier, mais le mot reste cliquable afin de révéler ses variantes :

```markdown
[traduction]{default alt="thème" alt2="transposition"}
```

> Nous avons rajouté à markdown-it les extensions [markdown-it-attrs](https://www.npmjs.com/package/) ainsi que [markdown-it-bracketed-spans](https://www.npmjs.com/package/markdown-it-bracketed-spans) qui permettent aux utilisateurices une latitude importante pour remplir de nombreux besoins en termes de mise en page et de sémantisation.


### Sauvegarde et backups

Pour sauvegarder l'état courant de votre traduction, cliquez sur le bouton `Sauvegarder` du menu latéral. Une archive de vos pads au format `zip` est sauvegardée sur votre machine. Il est possible d'intégrer cette archive à vos backups Padatrad et de la prévisualiser à nouveau plus tard. Pour ce faire, suivez la procédure suivante :

1. Ajoutez l'archive dans le dossier `backups/zip` ;
1. Ajoutez le nom du fichier (sans l'extension) à votre fichier `backups.json` ;
1. Renseignez les autres champs de votre nouvelle entrée du fichier `backups.json`.

Toutes vos sauvegardes sont accessibles via le bouton `Backups` du menu latéral.

### Exportation au format PDF

Avoir des archives de vos pads c'est cool, mais pouvoir exporter votre travail au format PDF c'est quand même mieux. PagedJS permet de prévisualiser ce qui se passe lorsque l'on cherche à imprimer une page web ; il suffit donc d'imprimer votre page web depuis votre navigateur pour obtenir un export au format PDF.

> **Attention :** PagedJS est conçu pour fonctionner en priorité avec le moteur de rendu Blink. C'est le moteur utilisé par Google Chrome, Chromium, ou encore ungoogled-chromium. Si votre PDF ne ressemble pas à ce que vous voyez dans la prévisualisation, commencez par utiliser l'un de ces navigateurs pour exporter votre travail.

### Implémentation de vos propres hooks pour PagedJS

Pour automatiser certains traitements sur votre traduction, le plus simple sera certainement de passer par un hook avec PagedJS. Les hooks sont des plugins vous permettant de modifier le comportement de PagedJS. De nombreux hooks ont déjà été développés par la communauté. Pour les intégrer à votre projet, ajoutez le fichier JavaScript contenant votre hook dans le dossier `scripts/hooks` et modifiez le fichier `hooks.js` en y ajoutant la ligne correspondant à l'importation de votre hook.

#### Hooks déjà installés 

Quelques hooks ont déjà été installés dans Padatrad :
- [reload_in_place](https://gitlab.com/nicolastaf/pagedjs-reload-in-place) de [Nicolas Taffin](https://polylogue.org/) ;
- [regex_typo](https://gitlab.com/JulieBlanc/typesetting-tools) de [Julie Blanc](https://julie-blanc.fr/) ;
- [Hyphenopoly](https://github.com/mnater/Hyphenopoly), avec un hook par Nicolas Taffin.

## Contribuer

Toute contribution est la bienvenue. Pour vous donner une idée de ce qui va nous occuper dans les prochaines versions, jetez un œil à notre [liste de choses à faire](https://gitlab.com/yanntrividic/the-moral-of-the-xerox-vf/-/blob/main/TODO.md). Vous êtes cordialement invité·es à nous soumettre une pull request, ou à [contacter le mainteneur](mailto:bonjour@yanntrividic.fr) du projet.

## Auteur et mentions

Ce programme a été développé et est maintenu par [Yann Trividic](https://yanntrividic.fr) pour le compte des [Éditions Burn~Août](https://editionsburnaout.fr/).

Merci à Julien Taquet et à Nicolas Taffin pour l'aide apportée sur PagedJS. Et surtout, merci à toutes les personnes ayant participé aux ateliers de traduction de [_La Morale de la Xerox_](https://gitlab.com/yanntrividic/the-moral-of-the-xerox-vf) qui ont avec bonne humeur éprouvé les premières version de ce logiciel et nous ont aidé à l'améliorer.

## Licence

Ce logiciel est distribué sous la licence GNU-GPL3. Les règles de cette licence n'impliquent pas de nous mettre au courant de vos usages du logiciel, mais si jamais vous vous en servez, [dites-le nous](mailto:burnaout@riseup.net), ça nous ferait très plaisir !