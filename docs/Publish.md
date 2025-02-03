# Publication

Pour créer une nouvelle version il suffit de lancer l'une des commandes suivante (à la racine):

- `npm run release:patch`: pour générer une nouvelle version de patch
- `npm run release:minor`: pour générer une nouvelle version de mineure
- `npm run release:major`: pour générer une nouvelle version de majeure

Voir la documentation sur [semver](https://semver.org/) pour les numéros de version.

Ces commandes permettent de:

1. Mettre à jour le fichier CHANGELOG.md
2. Créer un commit pour l'ajout du changelog
3. Incrémenter le numéro de version du package react-dsfr-tiptap
4. Créer un commit pour la version ainsi qu'un tag
5. Push tout cela sur le repository

Ensuite pour publier la nouvelle version sur npm lancer les commandes:

```bash
cd packages/react-dsfr-tiptap/
npm publish
```

Si nécessaire, vous devez préalablement vous authentifiez avec la commande `npm login`.
