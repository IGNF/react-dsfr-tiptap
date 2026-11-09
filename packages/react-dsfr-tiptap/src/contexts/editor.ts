import { createContext, useContext, type Context } from "react";
import { Editor } from "@tiptap/react";

export const editorContext: Context<Editor | null> = createContext<Editor | null>(null);

export function useEditor(): Editor {
    const editor = useContext(editorContext);
    if (!editor) {
        throw new Error("Missing editor context");
    }
    return editor;
}
