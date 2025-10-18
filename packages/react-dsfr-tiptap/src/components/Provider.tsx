import { fr } from "@codegouvfr/react-dsfr";
import { useEditor, UseEditorOptions } from "@tiptap/react";
import { ReactNode } from "react";
import { tss } from "tss-react";

import { editorContext } from "../contexts/editor";

export interface IProviderProps extends UseEditorOptions {
    children?: ReactNode;
}

function Provider(props: IProviderProps) {
    const { children, ...rest } = props;
    const editor = useEditor(rest);
    const { classes } = useStyles();

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
