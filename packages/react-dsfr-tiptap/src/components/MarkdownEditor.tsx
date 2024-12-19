import { ReactNode } from "react";
import { EditorEvents } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";

import { MarkdownControl } from "../types/controls";
import { markdownControls } from "../utils/controls";

import RichTextEditorProvider from "./Provider";
import RichTextEditorLoader, { ILoaderProps } from "./Loader";
import RichTextEditorMenu from "./Menu";
import RichTextEditorContent from "./Content";
import RichTextEditorGroup from "./Group";

export interface IMarkdownEditorProps extends Omit<ILoaderProps, "controls"> {
    controls?: MarkdownControl[][];
    onContentUpdate?: (content: string) => void;
}

const defaultControls: MarkdownControl[][] = [
    ["Bold", "Italic", "Code", "ClearFormatting"],
    ["H1", "H2", "H3", "H4", "H5", "H6", "Paragraph"],
    ["BulletList", "OrderedList", "CodeBlock", "Blockquote", "HorizontalRule"],
    // ["Link", "Unlink"],
    ["Undo", "Redo"],
    // ["Image"],
];

type MarkdownControls = {
    [key in MarkdownControl]: () => ReactNode;
};

interface IMarkdownEditor extends MarkdownControls {
    (props: IMarkdownEditorProps): ReactNode;
    Content: typeof RichTextEditorContent;
    Group: typeof RichTextEditorGroup;
    Menu: typeof RichTextEditorMenu;
    Provider: typeof RichTextEditorProvider;
}
const MarkdownEditor = ((props: IMarkdownEditorProps) => {
    const { onContentUpdate, onUpdate, ...rest } = props;

    function handleUpdate(props: EditorEvents["update"]) {
        onUpdate?.(props);
        onContentUpdate?.(props.editor.storage.markdown.getMarkdown());
    }

    return (
        <RichTextEditorLoader
            controls={defaultControls}
            extensions={[
                StarterKit,
                Markdown.configure({
                    html: false,
                    linkify: true,
                    breaks: true,
                    transformPastedText: true,
                    transformCopiedText: true,
                }),
            ]}
            onUpdate={handleUpdate}
            {...rest}
        />
    );
}) as IMarkdownEditor;

Object.entries(markdownControls).forEach(([key, component]) => {
    MarkdownEditor[key as MarkdownControl] = component;
});
MarkdownEditor.Content = RichTextEditorContent;
MarkdownEditor.Group = RichTextEditorGroup;
MarkdownEditor.Menu = RichTextEditorMenu;
MarkdownEditor.Provider = RichTextEditorProvider;

export default MarkdownEditor;
