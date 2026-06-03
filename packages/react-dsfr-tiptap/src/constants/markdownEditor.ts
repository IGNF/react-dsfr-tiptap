import { AnyExtension } from "@tiptap/core";
import { Markdown } from "@tiptap/markdown";
import StarterKit from "@tiptap/starter-kit";

import { MarkdownControl } from "../types/controls";

export const markdownEditorDefaultControls: MarkdownControl[][] = [
    ["Bold", "Italic", "Strike", "Code", "ClearFormatting"],
    ["H1", "H2", "H3", "H4", "H5", "H6", "Paragraph"],
    ["BulletList", "OrderedList", "CodeBlock", "Blockquote", "HorizontalRule"],
    ["Undo", "Redo"],
];

// StarterKit v3 bundles Link. Disable it here so Loader can import the dedicated
// DSFR-configured version without triggering a duplicate extension warning.
// Underline is also disabled for consistency (no markdown underline control exists).
export const markdownEditorDefaultExtensions: AnyExtension[] = [
    StarterKit.configure({ link: false, underline: false }),
    Markdown.configure({
        markedOptions: {
            breaks: true,
        },
    }),
];
