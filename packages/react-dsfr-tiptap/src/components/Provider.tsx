import { fr } from "@codegouvfr/react-dsfr";
import { useEditor, UseEditorOptions } from "@tiptap/react";
import { ReactNode, useEffect } from "react";
import { tss } from "tss-react";

import { editorContext } from "../contexts/editor";

export interface IProviderProps extends UseEditorOptions {
    children?: ReactNode;
    markdown?: boolean;
}

function Provider(props: IProviderProps) {
    const { children, markdown, ...rest } = props;
    const { content } = rest;
    const editor = useEditor(rest);
    const { classes } = useStyles();

    useEffect(() => {
        if (content != null && editor != null) {
            const oldContent = markdown ? editor.storage.markdown.getMarkdown() : editor.getHTML();
            if (oldContent !== content) {
                editor.commands.setContent(content);
            }
        }
    }, [content, editor, markdown]);

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
