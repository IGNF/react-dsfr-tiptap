import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@codegouvfr/react-dsfr/Input.js";
import { yupResolver } from "@hookform/resolvers/yup";
import isURL from "validator/lib/isURL.js";
import isMailto from "validator/lib/isMailtoURI.js";
import * as yup from "yup";

import { useDialog } from "../contexts/dialog";
import { useEditor } from "../contexts/editor";
import { getSelectedText } from "../utils/tiptap";

interface ILinkForm {
    label: string;
    href: string;
}

function LinkDialog() {
    const { isOpened, modal, onClose } = useDialog();
    const editor = useEditor();

    const schema = yup.object({
        label: yup.string().required(),
        href: yup
            .string()
            .test("check-url", "La chaîne doit être un mailto ou une url valide", (value) => isURL(value ?? "") || isMailto(value ?? ""))
            .required(),
    });

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        setValue,
    } = useForm<ILinkForm>({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (isOpened) {
            const { href } = editor.getAttributes("link");
            if (href) {
                setValue("href", href);
                editor.chain().focus().extendMarkRange("link").run();
            } else {
                setValue("href", "");
            }
            setValue("label", getSelectedText(editor));
        }
    }, [editor, isOpened, setValue]);

    const onSubmit = handleSubmit(() => {
        const { href, label } = getValues();
        const external = true;

        editor.chain().focus().extendMarkRange("link").run();
        const { from } = editor.state.selection;
        editor
            .chain()
            .insertContent(label)
            .setTextSelection({ from, to: from + label.length })
            .setLink({ href, target: external ? "_blank" : null })
            .run();

        onClose();
    });

    return (
        <modal.Component
            title="Définir le lien"
            size="medium"
            buttons={[
                {
                    doClosesModal: true,
                    children: "Annuler",
                },
                {
                    doClosesModal: false,
                    children: "Ajouter",
                    onClick: onSubmit,
                },
            ]}
        >
            <form onSubmit={onSubmit}>
                <Input
                    label="URL"
                    state={errors.href ? "error" : "default"}
                    stateRelatedMessage={errors?.href?.message?.toString()}
                    nativeInputProps={{
                        ...register("href"),
                        placeholder: "http://www.example.com, mailto:name@email.com",
                    }}
                />
                <Input
                    label="Label"
                    state={errors.label ? "error" : "default"}
                    stateRelatedMessage={errors?.label?.message?.toString()}
                    nativeInputProps={{
                        ...register("label"),
                    }}
                />
                <input type="submit" hidden />
            </form>
        </modal.Component>
    );
}

export default LinkDialog;
