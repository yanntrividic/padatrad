# Padatrad

[English version [below](#en)!]

Padatrad permet de traduire collectivement des textes et de les éditer depuis un navigateur web. Cette webapp est totalement rédigée en JavaScript ES6. Elle s'appuie sur [Etherpad](https://fr.wikipedia.org/wiki/Etherpad), lit les contenus en [Markdown](https://fr.wikipedia.org/wiki/Markdown), et gère les règles CSS pour l'impression avec la bibliothèque [PagedJS](https://pagedjs.org).

![Vue du logiciel](https://gitlab.com/editionsburnaout/padatrad/-/raw/master/screenshot.png){width=100%}

## Description

Ce projet s'intéresse au paradigme _fetch, convert & publish_ en mettant un accent sur la traduction collective. Étant donné qu'il n'existait à notre connaissance aucun logiciel libre facilitant l'édition de traductions à plusieurs, nous l'avons fait nous-même. Dans l'idée, nous avons cherché à faire une application qui serait la plus légère possible et la plus facile à installer. Tout est en JS vanille, pèse moins d'un mégaoctet, et est entièrement portable (à l'exception des instances d'Etherpad).

Si le paradigme vous intéresse plus que la traduction collective en tant que telle, peut-être trouverez-vous votre bonheur ici : [pad2print](https://gitlab.com/Luuse/pad2print) de Luuse, [Ethertoff](http://osp.kitchen/tools/ethertoff/) ou [Ether2html](http://osp.kitchen/tools/ether2html/) d’Open Source Publishing, [Collabprint](https://gitlab.com/quentinjuhel/collabprint) de Quentin Juhel, [Octomode](https://git.vvvvvvaria.org/varia/octomode) de Varia, [Libreto](https://libreto.net/) de Pierre Tandille, ou encore [Pink my pad!](https://pinkmypad.net/) de Nicolas Sauret[^julienb].

[^julienb]: https://www.accentgrave.net/log/.

## Installation

Commencez par télécharger la dernière version de Padatrad [ici](https://gitlab.com/editionsburnaout/padatrad/-/releases). Décompressez l'archive. À partir de là, vous n'aurez besoin que d'un serveur HTTP. Celui-ci peut tourner sur votre machine en local ou être connecté à Internet. Dans les deux cas, vous n'avez aucune autre dépendance à installer pour que Padatrad puisse fonctionner correctement. Si tout est bon, alors vous pouvez ouvrir un navigateur web à l'URL de votre projet ; ça devrait déjà fonctionner.

Si vous souhaitez utiliser Padatrad avec d'autres personnes, mais que vous n'avez pas de serveur HTTP relié à Internet, nous proposons aussi d'héberger gratuitement des instances de Padatrad sur [padatrad.editionsburnaout.fr](https://padatrad.editionsburnaout.fr).

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

Les pads contenant vos textes sources comme vos textes traduits devront être rédigés en Markdown. Padatrad a recours au convertisseur Markdownit, dont la syntaxe est explicitée [ici](https://markdown-it.github.io/). Dans un premier temps, chaque section de votre texte source doit être mise dans chaque pad après conversion en Markdown et (protip : pour faire ça, allez voir du côté de [Pandoc](https://pandoc.org/)). Prenons maintenant l'exemple d'une traduction de l'anglais vers le français avec un pad unique contenant un titre de niveau 1 et deux paragraphes :

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
- [ragadjustfr](https://github.com/yanntrividic/ragadjustfr) de Yann Trividic ;

## Contribuer

Toute contribution est la bienvenue. Pour vous donner une idée de ce qui va nous occuper dans les prochaines versions, jetez un œil à notre [liste de choses à faire](https://gitlab.com/editionsburnaout/padatrad/-/blob/master/CONTRIBUTING.md). Vous êtes cordialement invité·es à nous soumettre une pull request, ou à [contacter le mainteneur](mailto:bonjour@yanntrividic.fr) du projet.

## Auteur et mentions

Ce programme a été développé et est maintenu par [Yann Trividic](https://yanntrividic.fr) pour le compte des [Éditions Burn~Août](https://editionsburnaout.fr/).

Merci à [Julien Taquet](https://twitter.com/John_Tax) et à Nicolas Taffin pour l'aide apportée sur PagedJS. Et surtout, merci à toutes les personnes ayant participé aux ateliers de traduction de [_La Morale de la Xerox_](https://gitlab.com/yanntrividic/the-moral-of-the-xerox-vf) qui ont avec bonne humeur éprouvé les premières version de ce logiciel et nous ont aidé à l'améliorer.

## Licence

Ce logiciel est distribué sous la licence GNU-GPL3. Les règles de cette licence n'impliquent pas de nous mettre au courant de vos usages du logiciel, mais si jamais vous vous en servez, [dites-le nous](mailto:burnaout@riseup.net), ça nous ferait très plaisir !

# <a name="en"></a>Padatrad (in english!)

Padatrad allows collective translation of texts and editing them from a web browser. This web app is entirely written in JavaScript ES6. It relies on [Etherpad](https://en.wikipedia.org/wiki/Etherpad), reads content in [Markdown](https://en.wikipedia.org/wiki/Markdown), and manages CSS rules for printing using the [PagedJS](https://pagedjs.org) library. The name padatrad (\pad.a.tʁa.d\) stands for "pad à traduction", that is to say, pad for translation.

![Software View](https://gitlab.com/editionsburnaout/padatrad/-/raw/master/screenshot.png){width=100%}

## Description

This project focuses on the _fetch, convert & publish_ paradigm, with an emphasis on collective translation. Since there was no known open-source software facilitating collaborative translation editing, we created Padatrad ourselves. In essence, we aimed to create an application that is as lightweight and easy to install as possible. Everything is in vanilla JS, weighs less than one megabyte, and is entirely portable (except for Etherpad instances).

If the paradigm interests you more than collective translation itself, you may find what you're looking for here: [pad2print](https://gitlab.com/Luuse/pad2print) by Luuse, [Ethertoff](http://osp.kitchen/tools/ethertoff/) or [Ether2html](http://osp.kitchen/tools/ether2html/) by Open Source Publishing, [Collabprint](https://gitlab.com/quentinjuhel/collabprint) by Quentin Juhel, [Octomode](https://git.vvvvvvaria.org/varia/octomode) by Varia, [Libreto](https://libreto.net/) by Pierre Tandille, or [Pink my pad!](https://pinkmypad.net/) by Nicolas Sauret[^julienb].

## Installation

Start by downloading the latest version of Padatrad [here](https://gitlab.com/editionsburnaout/padatrad/-/releases). Unzip the archive. From there, you only need an HTTP server. This can run on your local machine or be connected to the internet. In both cases, you don't need any other dependencies to install for Padatrad to work correctly. If everything is fine, you can open a web browser at the URL of your project; it should already work.

If you want to use Padatrad with others but don't have an internet-connected HTTP server, we also offer to host Padatrad instances for free at [padatrad.editionsburnaout.fr](https://padatrad.editionsburnaout.fr).

### `config.js` file

The `config.js` file allows you to customize your Padatrad instance. You can provide a title for your project, specify the target and source language for your translation, etc. The text in the `infoText` field is displayed in the pop-up window that appears when a user clicks the `Info` button in the sidebar. The `extraUrlLabel` and `extraUrl` fields allow you to add a button of your choice to the sidebar.

### Providing information for your pads

The `pads.json` file allows you to specify which pads contain your content. Padatrad recognizes two types of pads: `md` for pads containing your texts in Markdown format, and `css` for your CSS style sheets. You can use as many pads as you like. Each Markdown pad corresponds to a section of your document, and each CSS pad corresponds to a style sheet. The different pads are loaded in the order specified in this file. Now, regarding the other fields:

- `id` must be filled with a unique name.
- `string` will help you identify your pad in the sidebar.
- `url` must contain the URL of the corresponding pad.

A list of CHATONS that have deployed a public instance of Etherpad is available [here](https://wiki.chatons.org/doku.php/services/bureautique_en_ligne/etherpad).

> **Warning:** Be sure to use only one pad per server; otherwise, the servers may think you are attempting a DDOS and block your requests.

## Usage

Once your `config.js` and `pads.json` files are ready, you can start filling in your pads.

### File preparation and translation

The pads containing your source and translated texts should be written in Markdown. Padatrad uses the Markdown-it converter, whose syntax is explained [here](https://markdown-it.github.io/). Initially, each section of your source text must be placed in its respective pad after conversion to Markdown (protip: check out [Pandoc](https://pandoc.org/) for this). Let's now take the example of translating from English to French with a single pad containing a level 1 title and two paragraphs:

```markdown
# Example text

This is an example for a translation from English to French.

There is not much else to say about this example.
```

Once the text is ready in your pad, it should also appear in the Padatrad preview. You can then begin the translation. For example, to translate the first paragraph, add your translation below the relevant source text and specify that it is the target text by adding the class `{.fr}` at the end of the paragraph:

```markdown
This is an example for a translation from English to French.

Ceci est un example de traduction de l'anglais vers le français. {.fr}
```

In the preview, your translation should replace the source paragraph and be highlighted with a yellow background. A yellow highlight indicates that the text has been translated but not yet validated. You can disable the highlight by clicking on the translation completion percentage in the sidebar. To validate the translation, add the `.accepted` class to your proposal:

```markdown
Ceci est un example de traduction de l'anglais vers le français. {.fr .accepted}
```

Now that you know how to translate a paragraph, you virtually know how to translate any type of document. Padatrad also has a feature that allows you to specify translation variants. For example, you might want to have two translations coexisting for the previous sentence; in addition to the first one, one could imagine "Ceci est un example de traduction de la langue de Shakespeare vers celle de Molière." This is possible by following this syntax:

```markdown
Ceci est un example de traduction de [l'anglais vers le français]{alt="la langue de Shakespeare vers celle de Molière"}. {.fr .accepted}
```

The text will then appear highlighted in red, and one of the two versions will be randomly chosen during preview generation. If you want to add more alternatives, you can add them after the first one, between the braces, preceding the proposition not with `alt` but with `alt1`, `alt2`, `alt3`, etc. You can cycle through the alternatives in the preview by clicking on the corresponding text.

If you want to avoid random selection in the preview, then add the keyword `default` between the braces. In the following example, _traduction_ will always appear first, but the word remains clickable to reveal its variants:

```markdown
[traduction]{default alt="thème" alt2="transposition"}
```

> We have added the [markdown-it-attrs](https://www.npmjs.com/package/markdown-it-attrs) and [markdown-it-bracketed-spans](https://www.npmjs.com/package/markdown-it-bracketed-spans) extensions to markdown-it, which allow users a significant latitude to fulfill many layout and semantic needs.

### Save and backups

To save the current state of your translation, click on the `Save` button in the sidebar. An archive of your pads in `zip` format is saved to your machine. You can integrate this archive into your Padatrad backups and preview it later. To do this, follow these steps:

1. Add the archive to the `backups/zip` folder.
2. Add the filename (without the extension) to your `backups.json` file.
3. Provide information for the other fields in your new entry in the `backups.json` file.

All your backups are accessible via the `Backups` button in the sidebar.

### Export to PDF

Having archives of your pads is cool, but being able to export your work in PDF format is even better. PagedJS allows previewing what happens when trying to print a web page; so, simply print your web page from your browser to get a PDF export.

> **Warning:** PagedJS is designed to work primarily with the Blink rendering engine. This engine is used by Google Chrome, Chromium, or ungoogled-chromium. If your PDF doesn't look like what you see in the preview, start by using one of these browsers to export your work.

### Implementation of your own hooks for PagedJS

To automate certain processes in your translation, the simplest way is probably to use a hook with PagedJS. Hooks are plugins that allow you to modify the behavior of PagedJS. Many hooks have already been developed by the community. To integrate them into your project, add the JavaScript file containing your hook to the `scripts/hooks` folder and modify the `hooks.js` file by adding the line corresponding to the import of your hook.

#### Already installed hooks

Some hooks have already been installed in Padatrad:
- [reload_in_place](https://gitlab.com/nicolastaf/pagedjs-reload-in-place) by [Nicolas Taffin](https://polylogue.org/);
- [regex_typo](https://gitlab.com/JulieBlanc/typesetting-tools) by [Julie Blanc](https://julie-blanc.fr/);
- [ragadjustfr](https://github.com/yanntrividic/ragadjustfr) by Yann Trividic;

## Contribute

Any contribution is welcome. To get an idea of what we'll be working on in future versions, take a look at our [to-do list](https://gitlab.com/editionsburnaout/padatrad/-/blob/master/CONTRIBUTING.md). You are invited to submit a pull request or [contact the maintainer](mailto:bonjour@yanntrividic.fr) of the project.

## Author and acknowledgments

This program was developed and is maintained by [Yann Trividic](https://yanntrividic.fr) on behalf of [Éditions Burn~Août](https://editionsburnaout.fr/).

Thanks to [Julien Taquet](https://twitter.com/John_Tax) and Nicolas Taffin for their assistance with PagedJS. And, most importantly, thanks to all the people who participated in the translation workshops of [_La Morale de la Xerox_](https://gitlab.com/yanntrividic/the-moral-of-the-xerox-vf), who cheerfully tested the early versions of this software and helped us improve it.

## License

This software is distributed under the GNU-GPL3 license. The rules of this license do not require you to inform us of your use of the software, but if you do use it, [let us know](mailto:burnaout@riseup.net); it would make us very happy!
