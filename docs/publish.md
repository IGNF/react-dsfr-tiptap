# Publication

La publication sur npm passe par GitHub Actions (workflow `.github/workflows/publish.yml`), avec le « trusted publishing » de npm : aucun jeton npm n’est stocké, et npm associe à chaque version une attestation de provenance (le commit et le workflow qui l’ont construite).

Voir la documentation sur [semver](https://semver.org/) pour choisir le numéro de version.

## 1. Préparer la version

Sur une branche (ex. `chore/release-3.0.0`) :

```bash
npm version <patch|minor|major> --no-git-tag-version -w packages/react-dsfr-tiptap
```

Ouvrir une PR avec ce changement de version, attendre la CI, puis la fusionner dans `main`.

## 2. Créer la release GitHub

1. Sur GitHub : Releases → « Draft a new release ».
2. Tag : `v<version>` (ex. `v3.0.0`), nouveau tag créé sur `main`.
3. Cliquer sur « Generate release notes », relire et compléter si besoin.
4. Pour une préversion (ex. `v3.0.0-alpha.0`), cocher « Set as a pre-release » : elle est publiée sur npm avec le dist-tag `next`, et `latest` reste sur la dernière version stable.
5. Publier la release.

Le workflow `publish.yml` vérifie que le tag correspond à la version du `package.json`, lance lint, tests, type-check, build et check-exports, puis publie sur npm.

## Notes de version

Le bouton « Generate release notes » liste les PR fusionnées depuis la release précédente, classées par label selon `.github/release.yml`. Le workflow `.github/workflows/labeler.yml` pose ces labels à partir du nom de branche (`feat/`, `fix/`, `docs/`, `chore/`...) et des fichiers modifiés. Le label `breaking` (changement majeur) se pose à la main. Les commits poussés directement sur `main` n’apparaissent pas dans les notes.

## Configuration npm (une seule fois)

Sur [la page des paramètres du paquet](https://www.npmjs.com/package/react-dsfr-tiptap/access) :

- Trusted Publisher → GitHub Actions : `IGNF` / `react-dsfr-tiptap` / `publish.yml`, sans environnement, action autorisée : `npm publish`.
- Publishing access : « Require two-factor authentication and disallow bypass 2fa tokens ».

Le `repository.url` du `package.json` doit rester `https://github.com/IGNF/react-dsfr-tiptap`, sinon npm refuse la publication.

## En cas d’échec

Si le workflow échoue avant l’étape « Publish », rien n’est publié : corriger, supprimer la release et son tag, puis recommencer l’étape 2.

En dernier recours, un mainteneur peut publier depuis son poste avec `npm publish -w react-dsfr-tiptap` (code 2FA demandé), depuis `main` à jour et après `npm ci && npm run build`. Cette version n’aura pas d’attestation de provenance.
