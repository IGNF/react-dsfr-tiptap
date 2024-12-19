import { forwardRef, ReactNode, useCallback, useId, useImperativeHandle, useMemo, useRef } from "react";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";

import { dialogContext } from "../contexts/dialog";

export interface IDialogHandle {
    close: () => void;
    open: () => void;
}

interface IDialogProps {
    children: ReactNode;
}

const Dialog = forwardRef<IDialogHandle, IDialogProps>((props, ref) => {
    const { children } = props;

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

    return <dialogContext.Provider value={context}>{children}</dialogContext.Provider>;
});

export default Dialog;
