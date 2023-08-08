# Padatrad

Padatrad permet de traduire collectivement des textes et de les éditer depuis un navigateur web. Cette webapp est totalement rédigée en JavaScript ES6. Elle s'appuie sur les [Etherpads](https://fr.wikipedia.org/wiki/Etherpad), lit les contenus en [Markdown](https://fr.wikipedia.org/wiki/Markdown), et génère la prévisualisation pour l'impression avec la bibliothèque [PagedJS](https://pagedjs.org).

![Vue du logiciel](https://gitlab.com/editionsburnaout/padatrad/-/raw/main/screenshot1.png)

## Description

Ce projet s'intéresse au paradigme _fetch, convert & publish_ en mettant un accent sur la traduction collective. Étant donné qu'il n'existait à notre connaissance aucun logiciel libre facilitant l'édition de traductions à plusieurs, nous l'avons fait nous-même. Dans l'idée, nous avons cherché à faire une application qui serait la plus légère possible et la plus facile à installer. Tout est en JS vanille, pèse moins d'un demi mégaoctet, et est entièrement portable (à l'exception des instances d'Etherpad).

Si le paradigme vous intéresse plus que la traduction collective en tant que telle, peut-être trouverez vous votre bonheur ici : [pad2print](https://gitlab.com/Luuse/pad2print) de Luuse, [Ethertoff](http://osp.kitchen/tools/ethertoff/) ou [Ether2html](http://osp.kitchen/tools/ether2html/) d’Open Source Publishing, [Collabprint](https://gitlab.com/quentinjuhel/collabprint) de Quentin Juhel, [Octomode](https://git.vvvvvvaria.org/varia/octomode) de Varia, [Libreto](https://libreto.net/) de Pierre Tandille, ou encore [Pink my pad!](https://pinkmypad.net/) de Nicolas Sauret[^julienb].

[^julienb]: https://www.accentgrave.net/log/.

## Installation

Commencez par télécharger la dernière version de Padatrad [ici](https://gitlab.com/editionsburnaout/padatrad/-/tags). Décompressez l'archive. À partir de là, vous n'aurez besoin que d'un serveur HTTP. Celui-ci peut tourner sur votre machine en local, ou être connecté à Internet. Dans les deux cas, vous n'avez aucune autre dépendance à installer pour que Padatrad puisse fonctionner correctement. Si tout est bon, alors vous pouvez ouvrir un navigateur web à l'adresse de votre projet ; ça devrait fonctionner.

### Fichier `config.js`

Le fichier `config.js` vous permet de vous approprier votre instance de Padatrad. Vous pouvez renseigner un titre pour votre projet, spécifier la langue cible et la langue source de votre traduction, etc. Le texte contenu dans le champ `infoText` est affiché dans la fenêtre pop-up qui apparaît lorsqu'un·e utilisateurice clique sur le bouton `Infos` du menu latéral. Les champs `extraUrlLabel` et `extraUrl` permettent d'ajouter un bouton dans le menu latéral.

### Renseigner ses pads

Le fichier `pads.json` vous permet de préciser sur quels pads sont vos contenus. Il existe deux types de pads : `md` pour les pads contenant vos textes, au format Markdown ; `css` pour vos feuilles de style CSS. Les différents pads sont chargés dans l'ordre spécifié dans ce fichier. Maintenant, concernant les autres champs :

* `id` doit être rempli avec un nom unique ;
* `string` vous permettra de retrouver votre pad dans le menu latéral ;
* `url` doit contenir l'URL du pad correspondant.

Une liste des CHATONS ayant déployé une instance publique d'Etherpad est disponible [ici](https://wiki.chatons.org/doku.php/services/bureautique_en_ligne/etherpad). 

[!NOTE]
Faites attention à n'utiliser qu'un pad par serveur, autrement les serveurs concernés bloqueront vos requêtes.

## Usage

### Édition des fichiers

Markdownit et ses extensions

### Outils de traduction

Classes de langue source et langue cible

### Sauvegarde et backups

Installer un backup

### Exportation au format PDF

Pour l'exportation en PDF de votre travail, ça marche mieux avec les navigateurs Chrome ou Chromium.
Utilisation du script make_booklet

### Implémentation de _hooks_ pour PagedJS

Comment ajouter des hooks

#### _Hooks_ déjà installés 



## Contribuer

Voir le fichier [TODO.md](https://gitlab.com/yanntrividic/the-moral-of-the-xerox-vf/-/blob/main/TODO.md).
Si vous voulez contribuer, envoyez-moi un mail, je serais trop content d'avoir de l'aide ! Contact : bonjour@yanntrividic.fr.
Nous sommes ouverts à toute forme de contribution à condition qu'elles restent en JS vanille.

## Auteur et mentions

Ce programme a été développé par [Yann Trividic](https://yanntrividic.fr) pour le compte des [Éditions Burn~Août](https://editionsburnaout.fr/).

Merci à Julien Taquet et à Nicolas Taffin pour l'aide apportée sur PagedJS. Et surtout, merci à toutes les personnes ayant participé aux ateliers de traduction de [_La Morale de la Xerox_](https://gitlab.com/yanntrividic/the-moral-of-the-xerox-vf) qui ont éprouvé les premières version de ce logiciel et nous ont aidé à l'améliorer.

## Licence

Ce logiciel est distribué sous la licence GNU-GPL3.