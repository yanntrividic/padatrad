# Contributions

Ce projet est en développement, et présente encore de nombreuses potentialités d'améliorations. Vous voulez y contribuer ? Dans ce cas, n'hésitez pas à par exemple soumettre une _issue_ pour répertorier un bug ou une _pull request_ pour ajouter une fonctionnalité. Si vous voulez vous investir plus que ça dans le projet, n'hésitez pas à [nous contacter](mailto:burnaout@riseup.net), on serait ravi·es d'en discuter plus en détails avec vous.

En manque d'idées sur où commencer ? Vous trouverez ci-dessous une liste de choses à faire pour améliorer Padatrad.

## Fonctionnalités à implémenter pour Padatrad

- [ ] Ajouter la possibilité d'uploader des PDF et des ZIP via une GUI plutôt que directement les intégrer dans le code source.
- [ ] Intégrer hyphenopoly aux typesetting options (voir `padatrad.js`)
- [ ] Transformer `extraUrlLabel` et `extraUrl` en une liste
- [ ] Ajouter `Participants` avant la liste de participants dans les backups
- [X] Intégrer les hooks
    - [X] regex-typo
    - [X] ragadjust
- [ ] Proposer une version avec le hook FacingSections
- [ ] Diviser les `p` en `span` pour un gestion plus fine des chunks de traduction (voir `replace-translation.js`). Est-ce pertinent ?
- [X] Associer un tooltip aux `.target` qui contient le texte source (augmenter `replace-translation.js`)
- [ ] Modifications en temps-réel plutôt qu'avoir à refresh : faire des recherches sur une possible API pour changer le contenu des pads à distance, en utilisant notamment la propriété `contentEditable`. (Voir la fonction `setText` [ici](https://etherpad.org/doc/v1.8.4/#index_what_can_i_do_with_this_api))
- [ ] Ou alors, au lieu du temps-réel, avoir un bouton "refresh" qui rechargerait juste les pads et la preview
- [X] Régler le bug concernant le surlignage
- [ ] Ajouter le support pour le plugin [`ep_markdown`](https://npmjs.org/package/ep_markdown) quand mon [`issue`](https://github.com/ether/ep_markdown/issues/139) aura été fermée. Ou alors proposer une PR pour `ep_markdown`
- [ ] Améliorer le menu de configuration afin de permettre de changer le format du document, et charger des polices
- [ ] Ajouter au formulaire de configuration la possibilité de renommer le fichier `index.php` plutôt que d'avoir à le faire côté serveur
- [ ] Améliorer le drag-and-drop pour les pads dans le menu de configuration. Ajouter la possibilité d'assigner une position où inserer le pad dans un champ
- [ ] Augmenter le parser de Markdown afin de supporter des front-matter, notamment pour assigner des classes à la section toute entière (ou alors les assigner depuis la configuration ?) 
- [ ] Développer une extension d'Etherpad pour Padatrad (dans un premier temps, simplement changer le style de l'éditeur pour mettre en valeur les parties traduites)

## Cosmétique

- [ ] Améliorer l'UI
    - [ ] Graphisme du menu latéral
    - [ ] Responsivité
- [ ] Ajouter la possibilité de choisir les couleurs de surlignage
- [ ] Ajouter un bouton vers la configuration dans l'overlay

## Documentation

- [ ] Traduire l'app en anglais et permettre le choix de différentes langues dans l'app (voir [i18n](https://developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions/API/i18n))
- [ ] Publier un issue sur PagedJS pour les gros chunks de texte qui font totalement ramer Firefox (et pas Chrome)
- [ ] Traduire le dépôt en anglais
- [ ] Faire une PR sur regex-typo
- [ ] Déployer une démo sur padatrad.editionsburnaout.fr, faire en sorte qu'elle soit pérenne
- [X] Mettre à jour la documentation concernant la configuration
- [X] Mettre à jour la documentation en parlant du [importExportRateLimiting](https://github.com/ether/etherpad-lite/blob/06d7d12fbd6570a73b0bfc972ec59e6667d03cd5/settings.json.template#L573)
- [X] Faire un meilleur CSS pour la demo histoire qu'on puisse se rendre mieux compte du potentiel de la chose