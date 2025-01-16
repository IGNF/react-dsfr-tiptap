import { ModalProps } from "@codegouvfr/react-dsfr/Modal/index.js";
import { createContext, useContext } from "react";

interface Modal {
    buttonProps: {
        /** Only for analytics, feel free to overwrite */
        id: string;
        "aria-controls": string;
        "data-fr-opened": boolean;
    };
    Component: (props: ModalProps) => JSX.Element;
    close: () => void;
    open: () => void;
    isOpenedByDefault: boolean;
    id: string;
}

export interface IDialogContext {
    isOpened: boolean;
    modal?: Modal;
    onClose: () => void;
}

export const dialogContext = createContext<IDialogContext>({ isOpened: false, onClose: () => null });

export function useDialog(): Required<IDialogContext> {
    const { isOpened, onClose, modal } = useContext(dialogContext);
    if (!modal) {
        throw new Error("Missing modal context");
    }
    return { isOpened, onClose, modal };
}
