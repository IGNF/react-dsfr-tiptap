import { fr } from "@codegouvfr/react-dsfr";
import { EditorContent, EditorContentProps } from "@tiptap/react";
import { tss } from "tss-react";

import { useEditor } from "../contexts/editor";
import { ForwardedRef } from "react";

export interface IContentProps extends Omit<EditorContentProps, "editor" | "innerRef" | "ref"> {
    ref?: ForwardedRef<HTMLDivElement | null>;
}

function Content(props: IContentProps) {
    const editor = useEditor();
    const { classes } = useStyles();

    return <EditorContent className={classes.root} editor={editor} {...props} />;
}

const useStyles = tss.withName(Content.name).create(() => ({
    root: {
        padding: fr.spacing("2w"),
        "img.ProseMirror-selectednode, .ProseMirror-selectednode iframe": {
            outline: "1px solid #0a76f6",
        },
        "hr.ProseMirror-selectednode": {
            backgroundImage: "linear-gradient(0deg, #0a76f6, #0a76f6)",
        },
        "span > mark": {
            color: "inherit",
        },
        table: {
            width: "100%",
            display: "block",
            overflow: "auto",
            borderSpacing: 0,
        },
        "table thead": {
            "--idle": "transparent",
            "--hover": "var(--background-alt-grey-hover)",
            "--active": "var(--background-alt-grey-active)",
            backgroundSize: "100% 1px",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            backgroundImage: "linear-gradient(0deg, var(--border-plain-grey), var(--border-plain-grey))",
            backgroundColor: "var(--background-alt-grey)",
            color: "var(--text-title-grey)",
            position: "relative",
        },
        "table tbody": {
            "--idle": "transparent",
            "--hover": "var(--background-default-grey-hover)",
            "--active": "var(--background-default-grey-active)",
            backgroundColor: "var(--background-default-grey)",
            position: "relative",
        },
        "table td, table th": {
            textAlign: "left",
            verticalAlign: "middle",
            display: "table-cell",
            border: 0,
            padding: "0.75rem",
            fontSize: "0.875rem",
            lineHeight: "1.5rem",
        },
        "table thead td, table thead th": {
            fontWeight: 700,
            paddingBottom: "0.875rem",
        },
        "@media (min-width: 48em)": {
            "table td, table th": {
                padding: "1rem",
            },
            "table thead td, table thead th": {
                paddingBottom: "1.125rem",
            },
        },
        "li > p": {
            margin: 0,
        },
    },
}));

export default Content;
