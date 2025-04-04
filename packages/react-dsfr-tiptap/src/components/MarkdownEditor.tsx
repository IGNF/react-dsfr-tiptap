import { ReactNode } from "react";
import { EditorEvents } from "@tiptap/react";

import { markdownEditorDefaultControls, markdownEditorDefaultExtensions } from "../constants/markdownEditor";
import { MarkdownControl } from "../types/controls";
import { ControlComponent, markdownControls } from "../utils/controls";

import RichTextEditorProvider from "./Provider";
import RichTextEditorLoader, { ILoaderProps } from "./Loader";
import RichTextEditorMenu from "./Menu";
import RichTextEditorContent from "./Content";
import RichTextEditorGroup from "./Group";

export interface IMarkdownEditorProps extends Omit<ILoaderProps, "controls"> {
    controls?: (MarkdownControl | ControlComponent)[][];
    onContentUpdate?: (content: string) => void;
}

type MarkdownControls = {
    [key in MarkdownControl]: ControlComponent;
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
            controls={markdownEditorDefaultControls}
            extensions={markdownEditorDefaultExtensions}
            markdown
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
