import { fr } from "@codegouvfr/react-dsfr";
import { useEditor, UseEditorOptions } from "@tiptap/react";
import { ReactNode, useEffect } from "react";
import { tss } from "tss-react";

import { editorContext } from "../contexts/editor";

export interface IProviderProps extends UseEditorOptions {
    children?: ReactNode;
}

function Provider(props: IProviderProps) {
    const { children, ...rest } = props;
    const editor = useEditor(rest);
    const { classes } = useStyles();

    // Keep the TipTap editor content in sync when the `content` prop changes.
    // TipTap only uses `content` at initialization; updates require an explicit command.
    useEffect(() => {
        if (!editor) return;
        const next = props.content;
        if (typeof next !== "string") return;
        const ct = props.contentType;
        // Determine current content based on contentType (markdown/html)
        type MaybeMarkdownEditor = typeof editor & { getMarkdown?: () => string };
        const mdEditor = editor as MaybeMarkdownEditor;
        const current = ct === "markdown" && typeof mdEditor.getMarkdown === "function" ? mdEditor.getMarkdown() : editor.getHTML();
        if (current !== next) {
            // Update without emitting an update event to avoid feedback loops.
            const commands = editor.commands as unknown as { setMarkdown?: (md: string, opts?: { emitUpdate?: boolean }) => void };
            if (ct === "markdown" && typeof commands.setMarkdown === "function") {
                commands.setMarkdown(next, { emitUpdate: false });
            } else {
                editor.commands.setContent(next, { emitUpdate: false });
            }
        }
    }, [editor, props.content, props.contentType]);

    return (
        <div className={classes.root}>
            <editorContext.Provider value={editor}>{children}</editorContext.Provider>
        </div>
    );
}

const useStyles = tss.withName(Provider.name).create(() => ({
    root: {
        border: "1px solid var(--border-contrast-grey)",
        margin: `${fr.spacing("2w")} 0`,
    },
}));

export default Provider;
