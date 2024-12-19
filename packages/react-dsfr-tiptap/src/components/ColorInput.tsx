import { fr } from "@codegouvfr/react-dsfr";
import { Editor } from "@tiptap/react";
import { tss } from "tss-react";

interface IColorInputProps {
    editor: Editor;
}

function ColorInput(props: IColorInputProps) {
    const { editor } = props;
    const { classes, cx } = useStyles();

    return (
        <input
            type="color"
            className={cx(fr.cx("fr-btn", "fr-btn--tertiary-no-outline", "fr-btn--sm"), classes.root)}
            onInput={(event) =>
                editor
                    .chain()
                    .focus()
                    .setColor((event.target as HTMLInputElement).value)
                    .run()
            }
            value={editor.getAttributes("textStyle").color}
        />
    );
}

const useStyles = tss.withName(ColorInput.name).create(() => ({
    root: {
        minWidth: fr.spacing("4w"),
        padding: fr.spacing("1v"),
    },
}));

export default ColorInput;
