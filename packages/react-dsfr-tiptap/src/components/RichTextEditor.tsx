import { LazyExoticComponent, ReactNode } from "react";
import { EditorEvents } from "@tiptap/react";

import { richTextEditorDefaultControls, richTextEditorDefaultExtensions } from "../constants/richTextEditor";
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

    return <RichTextEditorLoader controls={richTextEditorDefaultControls} extensions={richTextEditorDefaultExtensions} onUpdate={handleUpdate} {...rest} />;
}) as IRichTextEditor;

Object.entries(richTextEditorControls).forEach(([key, component]) => {
    RichTextEditor[key as Control] = component;
});
RichTextEditor.Content = RichTextEditorContent;
RichTextEditor.Group = RichTextEditorGroup;
RichTextEditor.Menu = RichTextEditorMenu;
RichTextEditor.Provider = RichTextEditorProvider;

export default RichTextEditor;
