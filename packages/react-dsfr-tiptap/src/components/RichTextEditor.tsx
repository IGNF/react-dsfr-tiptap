import { ReactNode } from "react";
import { EditorEvents } from "@tiptap/react";

import { richTextEditorDefaultControls, richTextEditorDefaultExtensions } from "../constants/richTextEditor";
import { Control } from "../types/controls";
import { ControlComponent, richTextEditorControls } from "../utils/controls";

import RichTextEditorProvider from "./Provider";
import RichTextEditorLoader, { ILoaderProps } from "./Loader";
import RichTextEditorContent from "./Content";
import RichTextEditorMenu from "./Menu";
import RichTextEditorGroup from "./Group";

export interface IRichTextEditorProps extends Omit<ILoaderProps, "controls"> {
    controls?: (Control | ControlComponent)[][];
    onContentUpdate?: (content: string) => void;
    removeEmptyParagraph?: boolean;
}

type RichTextEditorControls = {
    [key in Control]: ControlComponent;
};

interface IRichTextEditor extends RichTextEditorControls {
    (props: IRichTextEditorProps): ReactNode;
    Content: typeof RichTextEditorContent;
    Group: typeof RichTextEditorGroup;
    Menu: typeof RichTextEditorMenu;
    Provider: typeof RichTextEditorProvider;
}
const RichTextEditor = ((props: IRichTextEditorProps) => {
    const { onContentUpdate, onUpdate, removeEmptyParagraph = false, ...rest } = props;

    function handleUpdate(props: EditorEvents["update"]) {
        onUpdate?.(props);
        let content = props.editor.getHTML();
        if (removeEmptyParagraph && content === "<p></p>") {
            content = "";
        }
        onContentUpdate?.(content);
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
