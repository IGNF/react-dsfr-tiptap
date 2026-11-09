import { Editor } from "@tiptap/react";

export function getSelectedText(editor: Editor): string {
    const { from, to, empty } = editor.state.selection;

    if (empty) {
        return "";
    }

    return editor.state.doc.textBetween(from, to, " ");
}
