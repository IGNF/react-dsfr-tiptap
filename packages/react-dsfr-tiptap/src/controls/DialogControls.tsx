import type { ReactNode } from "react";
import ImageDialog from "../dialogs/ImageDialog";
import LinkDialog from "../dialogs/LinkDialog";
import YoutubeDialog from "../dialogs/YoutubeDialog";

import { createControl, createDialogControl } from "./createControls";

export const ControlImage: () => ReactNode = createDialogControl({
    buttonProps: { iconId: "ri-image-line", title: "Insérer une image" },
    DialogContent: ImageDialog,
    onClick: (_editor, ref) => ref.current?.open(),
});

export const ControlLink: () => ReactNode = createDialogControl({
    buttonProps: { iconId: "ri-link", title: "Ajouter un lien" },
    DialogContent: LinkDialog,
    onClick: (_editor, ref) => ref.current?.open(),
});

export const ControlUnlink: () => ReactNode = createControl({
    buttonProps: { iconId: "ri-link-unlink", title: "Supprimer le lien" },
    operation: { name: "unsetLink" },
});

export const ControlYoutube: () => ReactNode = createDialogControl({
    buttonProps: { iconId: "ri-video-line", title: "Insérer une vidéo" },
    DialogContent: YoutubeDialog,
    onClick: (_editor, ref) => ref.current?.open(),
});
