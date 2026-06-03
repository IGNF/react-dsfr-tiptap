import { AnyExtension } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

import { Control } from "../types/controls";

export const richTextEditorDefaultControls: Control[][] = [
    ["Bold", "Italic", "Strike", "Code", "ClearFormatting"],
    ["H1", "H2", "H3", "H4", "H5", "H6", "Paragraph"],
    ["BulletList", "OrderedList", "CodeBlock", "Blockquote", "HorizontalRule"],
    ["Undo", "Redo"],
];

// StarterKit v3 bundles Link and Underline. Disable them here so Loader can
// import the dedicated, DSFR-configured versions without triggering a duplicate
// extension warning. Consumers who rely on Link or Underline must provide an
// extensionLoader entry (Loader will warn with a copy-paste fix if they don't).
export const richTextEditorDefaultExtensions: AnyExtension[] = [StarterKit.configure({ link: false, underline: false })];
