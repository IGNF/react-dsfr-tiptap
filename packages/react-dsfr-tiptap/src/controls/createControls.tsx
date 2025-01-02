import Button, { ButtonProps } from "@codegouvfr/react-dsfr/Button";

import { useEditor } from "../contexts/editor";
import { Editor, useEditorState } from "@tiptap/react";
import { ElementType, ReactNode, RefObject, useRef } from "react";
import Dialog, { IDialogHandle } from "../dialogs/Dialog";

interface IEditorState {
    disabled: boolean;
    isActive: boolean;
}

interface ICreateCustomControlProps {
    Control: (editor: Editor, editorState: IEditorState, ref: RefObject<IDialogHandle | null>) => ReactNode;
    DialogContent?: ElementType;
    isActive?: { name: string; attributes?: Record<string, unknown> | string };
    isDisabled?: (editor: Editor) => boolean;
}

export function createCustomControl(configuration: ICreateCustomControlProps) {
    const { Control, DialogContent, isActive, isDisabled } = configuration;
    return function CustomControl(): ReactNode {
        const editor = useEditor();
        const ref = useRef<IDialogHandle>(null);
        const editorState = useEditorState({
            editor,
            selector: ({ editor }: { editor: Editor }) => ({
                disabled: isDisabled ? isDisabled(editor) : false,
                isActive: isActive ? editor.isActive(isActive.name, isActive.attributes) : false,
            }),
        });

        return (
            <>
                {Control(editor, editorState, ref)}
                {DialogContent && (
                    <Dialog ref={ref}>
                        <DialogContent />
                    </Dialog>
                )}
            </>
        );
    };
}

interface ICreateDialogControlProps extends Omit<ICreateCustomControlProps, "Control"> {
    buttonProps: ButtonProps;
    onClick: (editor: Editor, ref: RefObject<IDialogHandle | null>) => void;
}

export function createDialogControl(configuration: ICreateDialogControlProps) {
    const { buttonProps, onClick, ...rest } = configuration;
    return createCustomControl({
        Control: (editor, editorState, ref) => {
            const props = {
                disabled: editorState.disabled,
                onClick: () => onClick(editor, ref),
                priority: editorState.isActive ? "primary" : "tertiary no outline",
                size: "small",
                type: "button",
                ...buttonProps,
            } as ButtonProps;
            return <Button {...props} />;
        },
        ...rest,
    });
}

interface ICreateControlProps extends Omit<ICreateDialogControlProps, "Dialog" | "onClick"> {
    operation: { name: string; attributes?: Record<string, unknown> | string };
}

export function createControl(configuration: ICreateControlProps) {
    const { isDisabled, operation, ...rest } = configuration;
    return createDialogControl({
        ...rest,
        // @ts-expect-error missing type for operation
        isDisabled: isDisabled ?? ((editor) => !editor?.can().chain().focus()[operation.name](operation.attributes).run()),
        // @ts-expect-error missing type for operation
        onClick: (editor) => editor?.chain().focus()[operation.name](operation.attributes).run(),
    });
}
