import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@codegouvfr/react-dsfr/Input.js";
import { yupResolver } from "@hookform/resolvers/yup";
import isURL from "validator/lib/isURL";
import * as yup from "yup";

import { useDialog } from "../contexts/dialog";
import { useEditor } from "../contexts/editor";

interface IImageForm {
    src: string;
    alt?: string;
    title?: string;
}

function ImageDialog() {
    const { isOpened, modal, onClose } = useDialog();
    const editor = useEditor();

    const schema = yup.object({
        src: yup
            .string()
            .test("check-url", "La chaîne doit être une url valide", (value) => isURL(value ?? ""))
            .required(),
        alt: yup.string(),
        title: yup.string(),
    });

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        setValue,
    } = useForm<IImageForm>({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (isOpened) {
            const { src, alt, title } = editor.getAttributes("image");
            if (src) {
                setValue("src", src);
                setValue("alt", alt);
                setValue("title", title);
            } else {
                setValue("src", "");
                setValue("alt", "");
                setValue("title", "");
            }
        }
    }, [editor, isOpened, setValue]);

    const onSubmit = handleSubmit(() => {
        const { src, alt, title } = getValues();

        editor.chain().focus().setImage({ src, alt, title }).run();

        onClose();
    });

    return (
        <modal.Component
            title="Définir l'image"
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
            <form data-testid="ImageDialog" onSubmit={onSubmit}>
                <Input
                    label={"URL"}
                    state={errors.src ? "error" : "default"}
                    stateRelatedMessage={errors?.src?.message?.toString()}
                    nativeInputProps={{
                        ...register("src"),
                        placeholder: "http://www.example.com, mailto:name@email.com",
                    }}
                />
                <Input
                    label={"Alt"}
                    state={errors.alt ? "error" : "default"}
                    stateRelatedMessage={errors?.alt?.message?.toString()}
                    nativeInputProps={{
                        ...register("alt"),
                    }}
                />
                <Input
                    label={"Titre"}
                    state={errors.title ? "error" : "default"}
                    stateRelatedMessage={errors?.title?.message?.toString()}
                    nativeInputProps={{
                        ...register("title"),
                    }}
                />
                <input type="submit" hidden />
            </form>
        </modal.Component>
    );
}

export default ImageDialog;
