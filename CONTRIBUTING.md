# TODO

<!-- [x] [~] [ ] -->

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
- [x] Associer un tooltip aux `.target` qui contient le texte source (augmenter `replace-translation.js`)
- [ ] Modifications en temps-réel plutôt qu'avoir à refresh : faire des recherches sur une possible API pour changer le contenu des pads à distance, en utilisant notamment la propriété `contentEditable`. (Voir la fonction `setText` [ici](https://etherpad.org/doc/v1.8.4/#index_what_can_i_do_with_this_api)). ;
- [ ] Ou alors, au lieu du temps-réel, avoir un bouton "refresh" qui rechargerait juste les pads et la preview
- [x] Régler le bug concernant le surlignage
- [ ] Ajouter le support pour le plugin [`ep_markdown`](https://npmjs.org/package/ep_markdown)

## Cosmétique

- [ ] Améliorer l'UI
    - [ ] Graphisme du menu latéral
    - [ ] Responsivité
- [ ] Ajouter la possibilité de choisir les couleurs de surlignage

## Documentation

- [ ] Traduire l'app en anglais et permettre le choix de différentes langues dans l'app (voir [i18n](https://developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions/API/i18n))
- [ ] Publier un issue sur PagedJS pour les gros chunks de texte qui font totalement ramer Firefox (et pas Chrome)
- [ ] Traduire le dépôt en anglais
- [ ] Faire une PR sur regex-typo
- [ ] Déployer une démo sur padatrad.editionsburnaout.fr, faire en sorte qu'elle soit pérenne
- [ ] Mettre à jour la documentation concernant la configuration
- [ ] Mettre à jour la documentation en parlant du [importExportRateLimiting](https://github.com/ether/etherpad-lite/blob/06d7d12fbd6570a73b0bfc972ec59e6667d03cd5/settings.json.template#L573).