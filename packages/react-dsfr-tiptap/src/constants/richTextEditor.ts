import { AnyExtension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Control } from "../types/controls";

export const richTextEditorDefaultControls: Control[][] = [
    ["Bold", "Italic", "Strike", "Code", "ClearFormatting"],
    ["H1", "H2", "H3", "H4", "H5", "H6", "Paragraph"],
    ["BulletList", "OrderedList", "CodeBlock", "Blockquote", "HorizontalRule"],
    ["Undo", "Redo"],
];

export const richTextEditorDefaultExtensions: AnyExtension[] = [StarterKit];
