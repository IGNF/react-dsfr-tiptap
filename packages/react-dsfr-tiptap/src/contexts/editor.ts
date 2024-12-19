import { createContext, useContext } from "react";
import { Editor } from "@tiptap/react";

export const editorContext = createContext<Editor | null>(null);

export function useEditor(): Editor {
    const editor = useContext(editorContext);
    if (!editor) {
        throw new Error("Missing editor context");
    }
    return editor;
}
