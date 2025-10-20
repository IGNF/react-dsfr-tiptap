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

export const markdownEditorDefaultExtensions: AnyExtension[] = [
    StarterKit,
    Markdown.configure({
        markedOptions: {
            breaks: true,
        },
    }),
];
