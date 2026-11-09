# AGENTS.md

Instructions for AI coding agents working on this repository. This is the single source of truth: `CLAUDE.md` and `.github/copilot-instructions.md` defer to this file.

## Project

`react-dsfr-tiptap` is a React rich-text / markdown editor library implementing the French government Design System (DSFR, `@codegouvfr/react-dsfr`) on top of **Tiptap v3**. It is an npm-workspaces monorepo:

- `packages/react-dsfr-tiptap/`: the published library
- `examples/`: a Vite demo app, deployed to GitHub Pages

Icons are remixicon (`ri-*`) and DSFR (`fr-icon-*`).

## Language

- Code identifiers and code comments in English.
- UI text (button titles, dialog labels, error messages) and docs (`README.md`) in French.
- User-visible French text uses the typographic apostrophe `’` (U+2019), never `'`.
- Never use the em dash "—" anywhere (comments, docs, PR descriptions/comments, UI text): use a simple "-".

## Git

- Commit messages: simple French, Conventional Commits (`feat:`, `fix:`, `chore:`...), one short line, no body unless truly necessary: the PR description carries the details. commitlint enforces the format via the husky `commit-msg` hook.
- Small atomic commits: one logical concern per commit.
- AI-assisted commits end with the trailer `Assisted-by: <model name and version> <noreply@anthropic.com>`, naming the model that actually generated the code (e.g. `Assisted-by: Claude Opus 5.5 <noreply@anthropic.com>`), instead of `Co-Authored-By: Claude...`.
- Never commit on `main`: create a branch first. Branch names are short, in conventional-commit type/scope style, with the issue number when relevant (`feat/empty-paragraph`, `fix/dialog-portals`). The branch prefix sets the PR label, and the label sets the section of the release notes (`.github/labeler.yml`): use `feat/`, `fix/`, `docs/`, `chore/`, `ci/`, `build/`, `test/`, `refactor/` or `perf/`. Add the `breaking` label by hand for a breaking change.
- Never commit, push, publish to npm, or post PR descriptions/comments without a human explicitly validating the content first.
- PR titles: conventional-commit style, issue number when relevant. PR descriptions in French: concise, simple wording, no AI-sounding or corporate jargon. Don't repeat what the linked issue already says. Structure: `Closes #N`, a short "Changements" bullet list, "Validation" when relevant, and an explicit call-out for any deliberate behavior change or public API change.

## Agent workflow

- Do not modify CI workflows or `package.json` peer ranges beyond the agreed scope; surface the need and ask first.
- Any deviation from an approved design or plan must be validated before coding. Factual corrections are fine; behavior choices (error paths, public API, peer ranges) are not.
- This is a published library: a change to an exported symbol, a prop, or a peer dependency range is a public API change. Flag it and state whether it is breaking (semver major).

## Commands

Run from the repo root (workspace-aware):

| Task                           | Command                                      |
| ------------------------------ | -------------------------------------------- |
| Build the library              | `npm run build` (tsup)                       |
| Run tests                      | `npm run test`                               |
| Run examples dev server        | `npm run examples` (vite)                    |
| Build examples (GH Pages base) | `npm run build:examples`                     |
| Lint                           | `npm run lint` / `npm run lint:fix`          |
| Type-check (all workspaces)    | `npm run check-types`                        |
| Validate published exports     | `npm run check-exports -w react-dsfr-tiptap` |

**Single test:** `cd packages/react-dsfr-tiptap && npx jest src/components/ColorInput.test.tsx` (or filter by name: `npx jest -t "color"`).

**Release** (maintainers): see `docs/publish.md`. A version bump PR (`npm version <patch|minor|major> --no-git-tag-version -w packages/react-dsfr-tiptap`), then a GitHub Release `v<version>`: `publish.yml` publishes to npm through trusted publishing (OIDC, no npm token). Release notes live in GitHub Releases; `CHANGELOG.md` is frozen at 2.2.0.

GitHub Actions are pinned to a full commit SHA with the version in a comment (`actions/checkout@<sha> # v7.0.1`). Keep this format when adding or updating an action.

CI (`.github/workflows/test.yml`, on every push, Node 22 / 24 / 26) runs, in order: lint, test, check-types, build, check-exports, build:examples. Keep them all green. `deploy.yml` deploys the examples app to GitHub Pages on push to `main`. `labeler.yml` labels PRs.

## Build & package layout

`tsup` produces dual CJS/ESM + `.d.ts` from three entry points, exposed as subpath exports:

- `react-dsfr-tiptap` → `src/index.ts`: `RichTextEditor`, all controls, `createControl*` utilities, editor context, constants
- `react-dsfr-tiptap/markdown` → `src/markdown.ts`: `MarkdownEditor` + markdown constants
- `react-dsfr-tiptap/dialog` → `src/dialog.ts`: dialog controls (Link/Unlink/Image/Youtube), `Dialog` primitives, dialog context
- `react-dsfr-tiptap/index.css`: the `.fr-tiptap` stylesheet for rendering generated HTML

When adding a new exported symbol, wire it through the correct entry file **and** the `exports`/`files` maps in `packages/react-dsfr-tiptap/package.json`, then run `check-exports` (`attw`).

## Architecture

Composition is layered: `RichTextEditor` / `MarkdownEditor` → `Loader` → `Provider` → Tiptap `useEditor` + `editorContext`, then `Menu` (groups of control buttons) + `Content`.

1. **Compound component** (`components/RichTextEditor.tsx`). `RichTextEditor` is a function with statics attached: `.Provider`, `.Menu`, `.Group`, `.Content`, plus every named control (`.Bold`, `.Italic`, ...) attached from the `richTextEditorControls` map. This supports both the all-in-one API and the low-level composable API shown in the README.

2. **Control system** (`controls/`). Controls are built declaratively by three factories in `controls/createControls.tsx`:
    - `createControl({ buttonProps, isActive, operation })`: runs a Tiptap command, auto-derives `disabled` from `editor.can()...`
    - `createDialogControl({ buttonProps, DialogContent, onClick })`: opens a DSFR Modal
    - `createCustomControl({ Control, DialogContent, isActive, isDisabled })`: fully custom render

    Concrete controls live in `Controls.tsx` (basic), `CustomControls.tsx` (Color), `DialogControls.tsx` (Link/Image/Youtube). They are aggregated into `richTextEditorControls` and `markdownControls` in `utils/controls.ts`. **Add a new built-in control here**, and add its name to `types/controls.ts` and the `extensionMapping` in `Loader.tsx`. The `controls` prop is `(Control | ControlComponent)[][]`: outer array = visual groups; string entries resolve via `controlMap` (caller override) first, then the built-in map.

3. **Extension lazy-loading** (`components/Loader.tsx`), the subtlest piece. `extensionMapping` maps each control to the Tiptap extension it needs (most map to `starterKit`; e.g. `Color` → `color`, `AlignLeft` → `textAlign`). If the caller passes `extensionLoader`, Loader computes which extensions the active `controls` require, dynamically imports only those, applies `extensionDefaultConfiguration` (image `inline`, link `openOnClick:false`, textAlign types, youtube `nocookie`), and renders `null` until they resolve. A needed extension that is neither loaded nor in `extensionLoader` triggers a `console.warn` with a copy-paste fix: do not turn this into a throw.

4. **Editor context** (`contexts/editor.ts`). `useEditor()` reads `editorContext` and throws if used outside a `Provider`. Custom controls combine `useEditor()` with Tiptap's `useEditorState` to derive `disabled`/`isActive`. `Provider.tsx` wraps Tiptap's `useEditor`, syncs the `content` prop into the editor (HTML, or markdown when `contentType === "markdown"`), and applies the DSFR border via `tss-react`.

5. **Dialogs** (`dialogs/`). `Dialog.tsx` wraps `@codegouvfr/react-dsfr` `createModal` behind a `forwardRef` `open/close` handle exposed through `dialogContext`. `LinkDialog`/`ImageDialog`/`YoutubeDialog` use `react-hook-form` + `yup` + `validator` for form validation.

## Conventions

- **Optional peer deps.** Tiptap extensions, `react-hook-form`, `@hookform/resolvers`, `yup`, `validator` are optional peers, only required when the corresponding control is used. Code must degrade gracefully (warn, not crash) when an extension is absent.
- **Peer ranges are a contract.** Raising a peer floor forces consumers to upgrade: treat it as a public API change (see Agent workflow). The examples app must install versions inside the library's peer ranges.
- **Explicit DSFR import suffixes.** Import from `@codegouvfr/react-dsfr` with explicit `.js` / `/index.js` (e.g. `@codegouvfr/react-dsfr/Button.js`) for ESM resolution.
- **Tiptap v3 StarterKit** includes `Link` and `Underline`. When providing your own versions, disable them: `StarterKit.configure({ link: false, underline: false })`.
- **Styling:** DSFR classes first (`fr.cx()`, `fr-icon-*`/`ri-*` icons, DSFR utilities). When DSFR CSS isn't enough, use `tss-react`, which also takes dynamic values. Do not add stylesheets: `Content.css` (published as `index.css`) only styles the generated HTML.
- **Forms:** React Hook Form + `yupResolver`. yup `.test()` callbacks must handle `undefined` values.
- Never pass a state setter/toggle directly as a DOM event handler (it would receive the event object): write `onClick={() => toggle()}`. Buttons inside forms that don't submit need `type="button"`.
- Import order: third-party, then project (relative), then CSS.
- **Prettier:** tabWidth 4, printWidth 160, trailingComma `es5`. pre-commit runs lint-staged (prettier on all files, eslint on `*.{js,ts,jsx,tsx}`).

## Comments

- Comment only where the code is not self-explanatory: one line max, plain wording stating the intent. No docblocks that paraphrase a component or prop name.
- When a change alters a documented contract (props, thrown errors, warnings), update the README in the same change.

## Testing

Jest + ts-jest + jsdom + Testing Library. `jest.config.js` sets `transformIgnorePatterns` to transform the ESM deps `@codegouvfr`, `@tiptap/markdown`, `marked`: extend this list if a new ESM dependency fails to parse. CSS imports are mocked via `__mocks__/styleMock.ts`. Use `src/test-utils.ts` (`suppressConsoleError`, `renderHookWithError`) when testing hooks that throw (e.g. context guards).

## Writing style

Applies to all prose: chat responses, PR descriptions, commit bodies, comments, docs.

- One idea per sentence. Target under 25 words per sentence.
- Active voice. Name the actor ("the hook rejects the commit", not "the commit is rejected").
- Use concrete verbs. Banned words: leverage, robust, seamless(ly), streamline, comprehensive, powerful, simply, easily, crucial, delve.
- No unmeasurable adjectives. "Fast" needs a number or a comparison, or delete it.
- One term per concept. Do not rotate synonyms for variety.
- Define a term at first use if it is not in the codebase or a linked doc.
- Hedging is allowed only when it carries information: "might" must mean real uncertainty, never politeness.
- No summary paragraphs that restate what was just said. End when done.
- If a sentence survives with nothing lost after deletion, delete it.
