import { forwardRef, ReactNode, useCallback, useId, useImperativeHandle, useMemo, useRef } from "react";
import { createModal } from "@codegouvfr/react-dsfr/Modal/index.js";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen.js";
import { createPortal } from "react-dom";

import { dialogContext } from "../contexts/dialog";

export interface IDialogHandle {
    close: () => void;
    open: () => void;
}

export interface IDialogProps {
    children: ReactNode;
    container?: Element | DocumentFragment;
}

const Dialog = forwardRef<IDialogHandle, IDialogProps>((props, ref) => {
    const { children, container = document.body } = props;

    const id = useId();
    const { current: modal } = useRef(
        createModal({
            id,
            isOpenedByDefault: false,
        })
    );

    const open = useCallback(() => {
        modal.open();
    }, [modal]);

    const close = useCallback(() => {
        modal.close();
    }, [modal]);

    useImperativeHandle(ref, () => ({ close, open }));

    const isOpened = useIsModalOpen(modal);

    const context = useMemo(
        () => ({
            isOpened,
            modal,
            onClose: close,
        }),
        [close, isOpened, modal]
    );

    return <dialogContext.Provider value={context}>{createPortal(children, container)}</dialogContext.Provider>;
});

export default Dialog;
