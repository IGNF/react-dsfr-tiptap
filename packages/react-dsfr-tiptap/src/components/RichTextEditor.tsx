import { LazyExoticComponent, ReactNode } from "react";
import { EditorEvents } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Control } from "../types/controls";
import { richTextEditorControls } from "../utils/controls";

import RichTextEditorProvider from "./Provider";
import RichTextEditorLoader, { ILoaderProps } from "./Loader";
import RichTextEditorContent from "./Content";
import RichTextEditorMenu from "./Menu";
import RichTextEditorGroup from "./Group";

export interface IRichTextEditorProps extends Omit<ILoaderProps, "controls"> {
    controls?: (Control | (() => ReactNode) | LazyExoticComponent<() => ReactNode>)[][];
    onContentUpdate?: (content: string) => void;
}

const defaultControls: Control[][] = [
    ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "Code", "Highlight", "Color", "ClearFormatting"],
    ["H1", "H2", "H3", "H4", "H5", "H6", "Paragraph"],
    ["BulletList", "OrderedList", "CodeBlock", "Blockquote", "HorizontalRule"],
    ["AlignLeft", "AlignCenter", "AlignRight", "AlignJustify"],
    ["Undo", "Redo"],
    ["Link", "Unlink"],
    ["Image", "Youtube"],
];

type RichTextEditorControls = {
    [key in Control]: (() => ReactNode) | LazyExoticComponent<() => ReactNode>;
};

interface IRichTextEditor extends RichTextEditorControls {
    (props: IRichTextEditorProps): ReactNode;
    Content: typeof RichTextEditorContent;
    Group: typeof RichTextEditorGroup;
    Menu: typeof RichTextEditorMenu;
    Provider: typeof RichTextEditorProvider;
}
const RichTextEditor = ((props: IRichTextEditorProps) => {
    const { onContentUpdate, onUpdate, ...rest } = props;

    function handleUpdate(props: EditorEvents["update"]) {
        onUpdate?.(props);
        onContentUpdate?.(props.editor.getHTML());
    }

    return <RichTextEditorLoader controls={defaultControls} extensions={[StarterKit]} onUpdate={handleUpdate} {...rest} />;
}) as IRichTextEditor;

Object.entries(richTextEditorControls).forEach(([key, component]) => {
    RichTextEditor[key as Control] = component;
});
RichTextEditor.Content = RichTextEditorContent;
RichTextEditor.Group = RichTextEditorGroup;
RichTextEditor.Menu = RichTextEditorMenu;
RichTextEditor.Provider = RichTextEditorProvider;

export default RichTextEditor;
