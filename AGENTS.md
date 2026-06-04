# cartes.gouv.fr

## Overview

`react-dsfr-tiptap` is a React rich-text / markdown editor library implementing the French
government Design System (DSFR, `@codegouvfr/react-dsfr`) on top of **Tiptap v3**. It is an
npm-workspaces + Lerna monorepo:

- `packages/react-dsfr-tiptap/` — the published library
- `examples/` — a Vite demo app (deployed to GitHub Pages)

UI strings, button titles, and docs are in **French**. Icons are remixicon (`ri-*`) via DSFR.

## Commands

Run from the repo root (workspace-aware):

| Task                           | Command                             |
| ------------------------------ | ----------------------------------- |
| Build the library              | `npm run build` (tsup)              |
| Run tests                      | `npm run test`                      |
| Run examples dev server        | `npm run examples` (vite)           |
| Build examples (GH Pages base) | `npm run build:examples`            |
| Lint                           | `npm run lint` / `npm run lint:fix` |
| Type-check (all workspaces)    | `npm run check-types`               |

**Single test:** `cd packages/react-dsfr-tiptap && npx jest src/components/ColorInput.test.tsx`
(or filter by name: `npx jest -t "color"`).

**Release** (maintainers): `npm run release:patch|minor|major` — regenerates CHANGELOG via
`generate-changelog`, commits, then `lerna version --no-private`.

CI (`.github/workflows/test.yml`, on every push) runs, in order: lint → test → build →
build:examples. Keep all four green.

## Build & package layout

`tsup` produces dual CJS/ESM + `.d.ts` from three entry points, exposed as subpath exports:

- `react-dsfr-tiptap` → `src/index.ts` — `RichTextEditor`, all controls, `createControl*`
  utilities, editor context, constants
- `react-dsfr-tiptap/markdown` → `src/markdown.ts` — `MarkdownEditor` + markdown constants
- `react-dsfr-tiptap/dialog` → `src/dialog.ts` — dialog controls (Link/Unlink/Image/Youtube),
  `Dialog` primitives, dialog context
- `react-dsfr-tiptap/index.css` — the `.fr-tiptap` stylesheet for rendering generated HTML

When adding a new exported symbol, wire it through the correct entry file **and** the
`exports`/`files` maps in `packages/react-dsfr-tiptap/package.json`. Run `npm run check-exports`
(`attw`) to validate the published type/export shape.

## Architecture

Composition is layered:
`RichTextEditor` / `MarkdownEditor` → `Loader` → `Provider` → Tiptap `useEditor` + `editorContext`,
then `Menu` (groups of control buttons) + `Content`.

1. **Compound component** (`components/RichTextEditor.tsx`). `RichTextEditor` is a function with
   statics attached: `.Provider`, `.Menu`, `.Group`, `.Content`, plus every named control
   (`.Bold`, `.Italic`, …) attached from the `richTextEditorControls` map. This supports both the
   all-in-one API and the low-level composable API shown in the README.

2. **Control system** (`controls/`). Controls are built declaratively by three factories in
   `controls/createControls.tsx`:
    - `createControl({ buttonProps, isActive, operation })` — runs a Tiptap command, auto-derives
      `disabled` from `editor.can()…`
    - `createDialogControl({ buttonProps, DialogContent, onClick })` — opens a DSFR Modal
    - `createCustomControl({ Control, DialogContent, isActive, isDisabled })` — fully custom render

    Concrete controls live in `Controls.tsx` (basic), `CustomControls.tsx` (Color),
    `DialogControls.tsx` (Link/Image/Youtube). They are aggregated into `richTextEditorControls`
    and `markdownControls` in `utils/controls.ts`. **Add a new built-in control here**, and add its
    name to `types/controls.ts` and the `extensionMapping` in `Loader.tsx`.
    The `controls` prop is `(Control | ControlComponent)[][]`: outer array = visual groups; string
    entries resolve via `controlMap` (caller override) first, then the built-in map.

3. **Extension lazy-loading** (`components/Loader.tsx`) — the subtlest piece. `extensionMapping`
   maps each control → the Tiptap extension it needs (most → `starterKit`; e.g. `Color` → `color`,
   `AlignLeft` → `textAlign`). If the caller passes `extensionLoader`, Loader computes which
   extensions the active `controls` require, dynamically imports only those, applies
   `extensionDefaultConfiguration` (image `inline`, link `openOnClick:false`, textAlign types,
   youtube `nocookie`), and renders `null` until they resolve. A needed extension that is neither
   loaded nor in `extensionLoader` triggers a `console.warn` with a copy-paste fix — do not turn
   this into a throw.

4. **Editor context** (`contexts/editor.ts`). `useEditor()` reads `editorContext` and throws if
   used outside a `Provider`. Custom controls combine `useEditor()` with Tiptap's `useEditorState`
   to derive `disabled`/`isActive`. `Provider.tsx` wraps Tiptap's `useEditor`, syncs the `content`
   prop into the editor (HTML, or markdown when `contentType === "markdown"`), and applies the
   DSFR border via `tss-react`.

5. **Dialogs** (`dialogs/`). `Dialog.tsx` wraps `@codegouvfr/react-dsfr` `createModal` behind a
   `forwardRef` `open/close` handle exposed through `dialogContext`. `LinkDialog`/`ImageDialog`/
   `YoutubeDialog` use `react-hook-form` + `yup` + `validator` for form validation.

## Conventions

- **Optional peer deps.** Tiptap extensions, `react-hook-form`, `yup`, `validator` are optional
  peers — only required when the corresponding control is used. Code must degrade gracefully
  (warn, not crash) when an extension is absent.
- **Explicit DSFR import suffixes.** Import from `@codegouvfr/react-dsfr` with explicit `.js` /
  `/index.js` (e.g. `@codegouvfr/react-dsfr/Button.js`) for ESM resolution.
- **Tiptap v3 StarterKit** includes `Link` and `Underline`. When providing your own versions,
  disable them: `StarterKit.configure({ link: false, underline: false })`.
- **Prettier:** tabWidth 4, printWidth 160, trailingComma `es5`. **Commits:** Conventional Commits
  (enforced by commitlint via the husky `commit-msg` hook). pre-commit runs lint-staged
  (prettier on all files, eslint on `*.{js,ts,jsx,tsx}`).

## Testing

Jest + ts-jest + jsdom + Testing Library. `jest.config.js` sets `transformIgnorePatterns` to
transform the ESM deps `@codegouvfr`, `@tiptap/markdown`, `marked` — extend this list if a new ESM
dependency fails to parse. CSS imports are mocked via `__mocks__/styleMock.ts`. Use
`src/test-utils.ts` (`suppressConsoleError`, `renderHookWithError`) when testing hooks that throw
(e.g. context guards).
