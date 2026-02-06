# 1.2

### Corrections de bugs

* L'extension `typesetting` concernant l'orthotypographie ne s'applique à présent que sur les éléments en langue française (soit les éléments donc la langue source ou cible est `fr`, `fr-fr`, `fra`, `francais`, `français` -- insensible à la casse). Réalisé pour répondre au besoins du projet de recherche [« Nouveaux habits du colportage »](https://lesnouveauxhabitsducolportage.be/) (Léonard Mabille, Alice Néron et Alexia de Visscher).

# 1.1

### Améliorations notables

* Ajout d'un menu de configuration pour Padatrad à `config/index.php`.
* Ajout du support pour le plugin Etherpad `ep_markdown`. [**Attention ! L'entête `Access-Control-Allow-Origin` doit être activé !**](https://github.com/ether/ep_markdown/pull/26)
* Une démo de Padatrad est maintenant [accessible en ligne](https://padatrad.editionsburnaout.fr/demo), et un espace dédié à Padatrad est maintenant disponible sur le site des éditions Burn~Août : https://padatrad.editionsburnaout.fr.
* L'_overlay_ contient maintenant des liens vers des ancres pour chaque section pour faciliter la navigation dans le texte.
* Des _tooltips_ sont maintenant accessible au survol des textes traduits, donnant un accès plus intuitif au texte source remplacé.
* Le README est maintenant disponible en anglais.

### Corrections de bugs

* La couleur au survol des liens sections est maintenant en `!important`, ce qui permet de garder ce feedback même quand la couleur du texte est modifiée.
* Lorsque `sourceLanguage` et `targetLanguage` avait pour valeurs respectives `source` et `target`, des comportements indésirables se manifestaient ; ce n'est plus le cas à présent.