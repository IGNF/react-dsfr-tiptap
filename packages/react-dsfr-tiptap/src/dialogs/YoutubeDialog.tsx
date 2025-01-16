import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@codegouvfr/react-dsfr/Input.js";
import { yupResolver } from "@hookform/resolvers/yup";
import isURL from "validator/lib/isURL";
import * as yup from "yup";

import { useDialog } from "../contexts/dialog";
import { useEditor } from "../contexts/editor";

interface IYoutubeForm {
    src: string;
    width?: number;
    height?: number;
}

function YoutubeDialog() {
    const { isOpened, modal, onClose } = useDialog();
    const editor = useEditor();

    const schema = yup.object({
        src: yup
            .string()
            .test("check-url", "La chaîne doit être une url valide", (value) => isURL(value ?? ""))
            .required(),
        width: yup.number(),
        height: yup.number(),
    });

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        setValue,
    } = useForm<IYoutubeForm>({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    const extension = useMemo(() => editor.extensionManager.extensions.find((extension) => extension.name === "youtube"), [editor]);
    useEffect(() => {
        if (isOpened) {
            const { src, width, height } = editor.getAttributes("youtube");
            if (src) {
                setValue("src", src);
                setValue("width", width);
                setValue("height", height);
            } else {
                setValue("src", "");
                setValue("width", extension?.options.width ?? 640);
                setValue("height", extension?.options.height ?? 480);
            }
        }
    }, [editor, extension, isOpened, setValue]);

    const onSubmit = handleSubmit(() => {
        const { src, width, height } = getValues();

        editor.chain().focus().setYoutubeVideo({ src, width, height }).run();

        onClose();
    });

    return (
        <modal.Component
            title="Définir la vidéo"
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
                    state={errors.src ? "error" : "default"}
                    stateRelatedMessage={errors?.src?.message?.toString()}
                    nativeInputProps={{
                        ...register("src"),
                        placeholder: "http://www.example.com, mailto:name@email.com",
                    }}
                />
                <Input
                    label="Largeur"
                    state={errors.width ? "error" : "default"}
                    stateRelatedMessage={errors?.width?.message?.toString()}
                    nativeInputProps={{
                        ...register("width"),
                        type: "number",
                    }}
                />
                <Input
                    label="Hauteur"
                    state={errors.height ? "error" : "default"}
                    stateRelatedMessage={errors?.height?.message?.toString()}
                    nativeInputProps={{
                        ...register("height"),
                        type: "number",
                    }}
                />
                <input type="submit" hidden />
            </form>
        </modal.Component>
    );
}

export default YoutubeDialog;
