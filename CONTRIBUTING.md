# TODO

<!-- [x] [~] [ ] -->

## Backend

- [X] Intégrer les hooks
    - [X] regex-typo
    - [X] ragadjust
- [ ] Intégrer hyphenopoly aux typesetting options (voir `padatrad.js`)
- [ ] Transformer `extraUrlLabel` et `extraUrl` en une liste
- [ ] Proposer une version avec le hook FacingSections
- [ ] Diviser les `p` en `span` pour un gestion plus fine des chunks de traduction (voir `replace-translation.js`). Est-ce pertinent ?
- [ ] Associer un tooltip aux `.target` qui contient le texte source
- [ ] Modifications en temps-réel plutôt qu'avoir à refresh : faire des recherches sur une possible API pour changer le contenu des pads à distance, en utilisant notamment la propriété `contentEditable`. (Voir la fonction `setText` [ici](https://etherpad.org/doc/v1.8.4/#index_what_can_i_do_with_this_api)). ;
- [ ] Ou alors, au lieu du temps-réel, avoir un bouton "refresh" qui rechargerait juste les pads et la preview. 

## Frontend

- [ ] Traduire l'app en anglais et permettre le choix de différentes langues dans l'app
- [ ] Améliorer l'UI
    - [ ] Graphisme du menu latéral
    - [ ] Responsivité
- [ ] Ajouter `Participants` avant la liste de participants dans les backups

## Documentation

- [ ] Publier un issue sur PagedJS pour les gros chunks qui font totalement ramer Firefox
- [ ] Traduire le dépôt en anglais
- [ ] Faire une PR sur regex-typo
