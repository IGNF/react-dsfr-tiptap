# react-dsfr-tiptap

Composant de texte riche React pour le [System de design du gouvernement français (alias DSFR) 🇫🇷](https://www.systeme-de-design.gouv.fr/).

## Examples

Vous pouvez trouver des examples d'utilisations ici: https://ignf.github.io/react-dsfr-tiptap/

## Description

Ce dépôt contient :

- la documentation (ce fichier Readme)
- la librairie du composant de texte riche dans `packages/react-dsfr-tiptap`
- des examples d'intégration dans `examples`

## Installation

### Texte Riche

Pour installer ce package dans votre projet React lancez la commande:

```bash
npm i react-dsfr-tiptap
```

(ou installez avec le package manager de votre choix)

Vous devez également avoir installé les dépendances suivantes sur votre projet pour que ce package fonctionne:

- `react`
- `react-dom`
- `@codegouvfr/react-dsfr`
- `tss-react`

### Editeur Markdown

Pour utiliser l'éditeur markdown, installez les dépendances supplémentaires avec la commande:

```bash
npm i tiptap-markdown
```

(ou installez avec le package manager de votre choix)

## Utilisation

### Texte Riche

Une fois installée vous pouvez utilisé le composant `RichTextEditor` de cette manière:

```tsx
import { RichTextEditor } from "react-dsfr-tiptap";

function MyComponent() {
    const [content, setContent] = useState(`<h2>Content title</h2>`);
    return (
        <>
            <RichTextEditor content={content} onContentUpdate={setContent} />
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </>
    );
}
```

### Editeur Markdown

Utilisez l'éditeur markdown en important le composant `MarkdownEditor` depuis `react-dsfr-tiptap/markdown`

```tsx
import { MarkdownEditor } from "react-dsfr-tiptap/markdown";

function MyComponent() {
    const [content, setContent] = useState(`## Markdown title`);
    return (
        <>
            <MarkdownEditor content={content} onContentUpdate={setContent} />
            <pre>{content}</pre>
        </>
    );
}
```

### Utilisation avancée

Vous pouvez également utiliser les composants de plus bas niveau pour construire votre composant de texte riche:

```tsx
import StarterKit from "@tiptap/starter-kit";
import { RichTextEditor } from "react-dsfr-tiptap";

function MyComponent() {
    const [content, setContent] = useState(`## Markdown title`);

    return (
        <RichTextEditor.Provider content={content} extensions={[StarterKit]} onUpdate={({ editor }) => editor.getHTML()}>
            <RichTextEditor.Menu first>
                <RichTextEditor.Group>
                    <RichTextEditor.Bold />
                </RichTextEditor.Group>
                <RichTextEditor.Group>
                    <CustomControl />
                </RichTextEditor.Group>
            </RichTextEditor.Menu>
            <RichTextEditor.Content />
        </RichTextEditor.Provider>
    );
}
```

Ils vous faudra fournir alors les extensions et configurer le menu par vous même.

## Ajout d'extensions

### Boutons classiques

Les extensions tiptap suivantes sont prise en charge par le composant `RichTextEditor`.

Pour les utiliser, installez les extensions que vous souhaitez:

- `@tiptap/extension-color`
- `@tiptap/extension-highlight`
- `@tiptap/extension-subscript`
- `@tiptap/extension-superscript`
- `@tiptap/extension-text-align`
- `@tiptap/extension-text-style` (nécessaire pour le bouton de changement de couleur)
- `@tiptap/extension-underline`

Puis configurez le composant `<RichTextEditor>` en lui ajoutant les extensions et la liste des boutons du menu:

```tsx
import { RichTextEditor } from "react-dsfr-tiptap";
import StarterKit from "@tiptap/extension-starter-kit";

import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";

function MyComponent() {
    const [content, setContent] = useState(`<h2>Content title</h2>`);
    return (
        <RichTextEditor
            content={content}
            controls={[
                ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "Code", "Highlight", "Color", "ClearFormatting"],
                ["H1", "H2", "H3", "H4", "H5", "H6", "Paragraph"],
                ["BulletList", "OrderedList", "CodeBlock", "Blockquote", "HorizontalRule"],
                ["AlignLeft", "AlignCenter", "AlignRight", "AlignJustify"],
                ["Undo", "Redo"],
            ]}
            extensions={[StarterKit, Color, Highlight, Subscript, Superscript, TextAlign, TextStyle, Underline]}
            onContentUpdate={setContent}
        />
    );
}
```

N'oubliez pas d'y inclure l'extension `StarterKit` dans ce cas.

Ces extensions ne fonctionnent qu'avec le composant `RichTextEditor` et pas le composant `MarkdownEditor`.

### Boutons avec modale

Les extensions suivantes sont également prise en charge mais nécessite une configuration supplémentaire:

- `@tiptap/extension-image`
- `@tiptap/extension-link`
- `@tiptap/extension-youtube`

Pour utiliser ces extensions installez les packages supplémentaires suivants:

```bash
npm i react-hook-form @hookform/resolvers yup validator
```

et activez les boutons dans le menu:

```tsx
import { markdownEditorDefaultControls, RichTextEditor } from "react-dsfr-tiptap";
import { ControlImage, ControlLink, ControlUnlink, ControlYoutube } from "react-dsfr-tiptap/dialog";
import StarterKit from "@tiptap/extension-starter-kit";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";

function MyComponent() {
    const [content, setContent] = useState(`<h2>Content title</h2>`);
    return (
        <>
            <RichTextEditor
                content={content}
                controls={[...markdownEditorDefaultControls, [ControlLink, ControlUnlink], [ControlImage, ControlImage]]}
                extensions={[StarterKit, Image, Link, Youtube]}
                onContentUpdate={setContent}
            />
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </>
    );
}
```

ou via la props `controlMap`:

```tsx
import { RichTextEditor } from "react-dsfr-tiptap";
import { ControlImage, ControlLink, ControlUnlink, ControlYoutube } from "react-dsfr-tiptap/dialog";
import StarterKit from "@tiptap/extension-starter-kit";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";

function MyComponent() {
    const [content, setContent] = useState(`<h2>Content title</h2>`);
    return (
        <>
            <RichTextEditor
                content={content}
                controlMap={{ Link: ControlLink, Unlink: ControlUnlink, Image: ControlImage, Youtube: ControlYoutube }}
                controls={[...markdownEditorDefaultControls, ["Link", "Unlink"], ["Image", "Youtube"]]}
                extensions={[StarterKit, Image, Link, Youtube]}
                onContentUpdate={setContent}
            />
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </>
    );
}
```

Cela fonctionne de la même manière pour le composant `MarkdownEditor` sauf qu'il ne supporte que les liens et les images (et pas les vidéos).

### Chargement dynamique

Si vous utilisez plusieurs editeurs de texte riche ou markdown, nécessitant différentes extensions, vous pouvez utiliser le chargement dynamique d'extension via la props `extensionLoader`.

Par exemple:

```tsx
import { markdownEditorDefaultControls, RichTextEditor } from "react-dsfr-tiptap";
import { ControlImage, ControlLink, ControlUnlink, ControlYoutube } from "react-dsfr-tiptap/dialog";
import StarterKit from "@tiptap/extension-starter-kit";

const extensionLoader = {
    color: () =>
        Promise.all([
            import("@tiptap/extension-color").then((module) => module.default),
            import("@tiptap/extension-text-style").then((module) => module.default),
        ]),
    highlight: () => import("@tiptap/extension-highlight").then((module) => module.default),
    image: () => import("@tiptap/extension-image").then((module) => module.default),
    link: () => import("@tiptap/extension-link").then((module) => module.default),
    subscript: () => import("@tiptap/extension-subscript").then((module) => module.default),
    superscript: () => import("@tiptap/extension-superscript").then((module) => module.default),
    textAlign: () => import("@tiptap/extension-text-align").then((module) => module.default),
    underline: () => import("@tiptap/extension-underline").then((module) => module.default),
    youtube: () => import("@tiptap/extension-youtube").then((module) => module.default),
};

function MyComponent() {
    const [content, setContent] = useState(`<h2>Content title</h2>`);
    return (
        <>
            <RichTextEditor
                content={content}
                controls={["Bold", "Italic", "Underline", "Strike", "Color"]}
                extensionLoader={extensionLoader}
                onContentUpdate={setContent}
            />
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </>
    );
}
```

Dans ce cas les extensions configurées dans `extensionLoader` ne seront chargés si cela est nécessaire en fonction des boutons que vous définissez dans la props `controls`.

Dans l'exemple ci-dessus, seul les extensions `@tiptap/extension-color`, `@tiptap/extension-text-style` et `@tiptap/extension-underline` (en plus de l'extension `@tiptap/extension-starter-kit` qui est chargée de base) ne seront chargées (car ces extensions sont nécéssaires pour les boutons `"Color"` et `"Underline"`).

Vous pouvez aussi réutiliser la configuration via cette variable `extensionLoader` dans plusieurs instances de `<RichTextEditor>` ou `<MarkdownEditor>`.

## Configuration

### Props

Les 2 composants `RichTextEditor` et `MarkdownEditor` fonctionne de la même manière et ont les mêmes props:

| Props             | Type                                                                                  | Valeur par défaut   | Description                                                       |
| ----------------- | ------------------------------------------------------------------------------------- | ------------------- | ----------------------------------------------------------------- |
| `content`         | `string`                                                                              | `""`                | Contenu de la zone de texte riche                                 |
| `controlMap`      | `Partial<Record<Control, (() => ReactNode) \| LazyExoticComponent<() => ReactNode>>>` | `{}`                | Permet de configurer les composants des boutons préconfigurés     |
| `controls`        | `(Control \| (() => ReactNode) \| LazyExoticComponent<() => ReactNode>)[][]`          | `defaultControls`   | Permet de configurer les boutons du menu                          |
| `extensionLoader` | `Partial<Record<Extension, () => Promise<AnyExtension \| AnyExtension[]>>>`           | `{}`                | Permet de charger dynamiquement des extensions                    |
| `extensions`      | `AnyExtension[]`                                                                      | `defaultExtensions` | Permet d'ajouter des extensions                                   |
| `menu`            | `"top" \| "bottom"`                                                                   | `"top"`             | Position du menu                                                  |
| `onContentUpdate` | `(content: string) => void`                                                           |                     | Fonction appelé quand le contenu est mis à jour par l'utilisateur |

Les autres props seront passé au hoos `useEditor` de [la librairie `@tiptap/react`](https://tiptap.dev/docs/editor/getting-started/install/react).

Pour le composant `RichTextEditor`:

- `defaultControls` est égal à:
    ```ts
    [
        ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "Code", "Highlight", "Color", "ClearFormatting"],
        ["H1", "H2", "H3", "H4", "H5", "H6", "Paragraph"],
        ["BulletList", "OrderedList", "CodeBlock", "Blockquote", "HorizontalRule"],
        ["AlignLeft", "AlignCenter", "AlignRight", "AlignJustify"],
        ["Undo", "Redo"],
        ["Link", "Unlink"],
        ["Image", "Youtube"],
    ];
    ```
- `defaultExtensions` est égal à: `[require("@tiptap/starter-kit")]`

Pour le composant `RichTextEditor`:

- `defaultControls` est égal à:
    ```ts
    [
        ["Bold", "Italic", "Code", "ClearFormatting"],
        ["H1", "H2", "H3", "H4", "H5", "H6", "Paragraph"],
        ["BulletList", "OrderedList", "CodeBlock", "Blockquote", "HorizontalRule"],
        ["Undo", "Redo"],
        ["Link", "Unlink"],
        ["Image"],
    ];
    ```
- `defaultExtensions` est égal à: `[require("@tiptap/starter-kit"), require("tiptap-markdown")]`

### Ajout de boutons personnalisés

Vous pouvez développer et ajouter vos propres boutons dans le composant de texte riche.

Exemple de bouton:

```tsx
import { Editor, useEditorState } from "@tiptap/react";
import Button from "@codegouvfr/react-dsfr/Button";
import { useEditor } from "react-dsfr-tiptap";

export default function CustomControl() {
    const editor = useEditor();
    const editorState = useEditorState({
        editor,
        selector: ({ editor }: { editor: Editor }) => ({
            disabled: !editor?.can().chain().focus().insertContent("[custom]").run(),
        }),
    });

    return (
        <Button
            disabled={editorState.disabled}
            onClick={() => editor?.chain().focus().insertContent("[custom]").run()}
            priority="tertiary no outline"
            size="small"
        >
            Insérer du contenu
        </Button>
    );
}
```

Dans ce cas vous pouvez ajoutez votre bouton personnalisé via la props `controls`:

```tsx
import { RichTextEditor } from "react-dsfr-tiptap";
import CustomControl from "./CustomControl";

function MyComponent() {
    const [content, setContent] = useState(`<h2>Content title</h2>`);
    return (
        <>
            <RichTextEditor
                content={content}
                controls={[
                    ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "Code", "Highlight", "Color", "ClearFormatting"],
                    ["H1", "H2", "H3", "H4", "H5", "H6", "Paragraph"],
                    ["BulletList", "OrderedList", "CodeBlock", "Blockquote", "HorizontalRule"],
                    ["AlignLeft", "AlignCenter", "AlignRight", "AlignJustify"],
                    ["Undo", "Redo"],
                    ["Link", "Unlink"],
                    ["Image", "Youtube"],
                    [CustomControl],
                ]}
                onContentUpdate={setContent}
            />
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </>
    );
}
```

Dans ce cas il vous faudra fournir la liste complète des contrôles.

### Utilitaire de création de boutons personalisés

Vous pouvez aussi utilisez les utilitaires suivants pour faciliter la création de boutons personalisées:

```tsx
import { createControl } from "react-dsfr-tiptap";

export default createControl({
    buttonProps: { children: "Insérer du contenu" },
    operation: { name: "insertContent", attributes: "[custom]" },
});
```

Cela créera exactement le même contrôle `CustomControl` que celui du chapitre précédent.

De la même manière il suffira ensuite de l'ajouter à la props `controls` du composant `RichTextEditor`.

Il y a également un utilitaire pour créer un bouton qui ouvre une modale:

```tsx
import { createDialogControl } from "react-dsfr-tiptap";

export default createDialogControl({
    buttonProps: { children: "Insérer du contenu" },
    DialogContent: CustomDialog, // Le composant de modale
    onClick: (editor, ref) => ref.current?.open(),
});
```

Pour un example plus complet regardez le fichier `examples/src/TiptapCustomButtons.tsx`.

## L'arborescence du projet

Exemple d'arborescence de projet :

- `.github/` : dossier contenant les modèles d'issues et github actions.
- `.husky/` : dossier contenant des scripts git hooks.
- `.vscode/` : dossier contenant une configuration vscode pour le projet.
- `doc/` : dossier contenant des fichiers .md de documentation (ex: install.md).
- `examples/` : dossier contenant une application avec des examples d'utilisation.
- `packages/` : dossier contenant le code source de la librarie.
- `README.md` : ce fichier.

## Contacts du projets

Ici on met la liste des personnes qui travaillent sur ce projet et le maintiennent à jour.

| Nom | Prénom | mail | fonction |
| --- | ------ | ---- | -------- |
|     |        |      |          |
|     |        |      |          |
|     |        |      |          |

## Troubleshooting

### Webpack Encore: Module not found

If you encounter an error similar to this one:

```
./node_modules/react-dsfr-tiptap/dist/chunk-XB7EBDH4.js" contains a reference to the file "@codegouvfr/react-dsfr/Modal".
This file can not be found, please check it for typos or update it if the file got moved.
```

Add this to your webpack config file (`webpack.config.js` or similar):

```js
module.exports.module.rules.push({
    test: /node_modules\/react-dsfr-tiptap\/.*\.js$/,
    resolve: {
        fullySpecified: false,
    },
});
```
