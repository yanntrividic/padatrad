# Padatrad

Padatrad permet de traduire collectivement des textes et de les éditer depuis un navigateur web.

## Description

De mars à juin 2023, avec les Éditions Burn~Août, nous avons donné une série d'atelier dans l'objectif de traduire collectivement _The Morale of the Xerox_, un texte de Clara Lobregat Balaguer et de Floriant Cramer. Pour l'occasion de ces ateliers, nous nous sommes dit qu'il serait pratique de pouvoir s'appuyer sur un logiciel qui faciliterait la traduction collective. C'est de là que Padatrad est né !

Ce logiciel s'inscrit dans cette lignée de projets reposant sur le paradigme _fetch, convert & publish_. [pad2print](https://gitlab.com/Luuse/pad2print) de Luuse, [Ethertoff](http://osp.kitchen/tools/ethertoff/) ou [Ether2html](http://osp.kitchen/tools/ether2html/) d’Open Source Publishing, [Collabprint](https://gitlab.com/quentinjuhel/collabprint) de Quentin Juhel, [Octomode](https://git.vvvvvvaria.org/varia/octomode) de Varia, [Libreto](https://libreto.net/) de Pierre Tandille, ou encore [Pink my pad!](https://pinkmypad.net/) de Nicolas Sauret[^julienb].

Ce projet a pour particularité de s'intéresser à ce paradigme en mettant un accent sur la traduction collective, étant donné qu'il n'existait à notre connaissance aucun logiciel collaboratif et libre facilitant l'édition de traductions à plusieurs.

[^julienb]: https://www.accentgrave.net/log/.

Ajouter des screenshots.

## Installation et prérequis

Pointer vers un tag.
Un serveur HTTP, des serveurs pour héberger ses pads (qui peuvent être n'importe quel Chaton par exemple), et c'est tout, rien d'autre. \
Pour l'exportation en PDF de votre travail, ça marche mieux avec les navigateurs Chrome ou Chromium. \
Si vous avez des besoins spécifiques, je peux peut-être vous aider à les mettre en place.

## Usage

[Expliquer en quoi c'est pas mal.]

### Configuration

Le fichier de configuration, dire qu'il s'agit principalement d'éditer deux fichiers qui permettent différents trucs

<!-- 
// RESPONSIVE CHATONS PAD SERVERS
//    https://pads.domainepublic.net/ 62ms
//    https://ether.immae.eu/ 92ms
//    https://pad.vvvvvvaria.org/ 109ms
//    https://pad.liberta.vip/ 154ms
//    https://pad.kaz.bzh/ 155ms
//    https://pad.sequanux.org 163MS
//    https://pad.libretic.fr/ 194ms
//    https://pad.roflcopter.fr/ 211ms
//    https://pad.infini.fr/ 215ms
//    https://pad.devloprog.org/ 217ms
//    https://pad.evolix.org/ 263ms
//    https://pad.le-filament.com/ 288ms
//    https://pad.colibris-outilslibres.org/ 304ms
//    https://pad.picasoft.net/ 314ms
//    https://pad.libre-service.eu/ 325ms -->

### Édition des fichiers

Markdownit

### Outils de traduction

Classes de langue source et langue cible

### Sauvegarde et backups

Installer un backup

### Exportation au format PDF

Utilisation du script make_booklet

### Implémentation de _hooks_ pour PagedJS

Comment ajouter des hooks

#### _Hooks_ déjà installés 

## Feuille de route

Voir le fichier [TODO.md](https://gitlab.com/yanntrividic/the-moral-of-the-xerox-vf/-/blob/main/TODO.md).

## Contribuer

Si vous voulez contribuer, envoyez-moi un mail, je serais trop content d'avoir de l'aide ! Contact : bonjour@yanntrividic.fr.
Nous sommes ouverts à toute forme de contribution à condition qu'elles restent en JS vanille.

## Auteur et mentions

Ce programme a été développé par Yann Trividic pour le compte des Éditions Burn~Août.

Merci à Julien Taquet et à Nicolas Taffin pour l'aide apportée sur PagedJS. Et surtout, merci à tous les participants et participantes aux ateliers, qui nous ont aidé à penser ce logiciel. 

## Licence

Ce logiciel est distribué sous la licence GNU-GPL3.
