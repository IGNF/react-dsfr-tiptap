import type { ReactNode } from "react";
import YoutubeDialog from "../dialogs/YoutubeDialog";

import { createDialogControl } from "./createControls";

const ControlYoutube: () => ReactNode = createDialogControl({
    buttonProps: { iconId: "ri-video-line", title: "Insérer une vidéo" },
    DialogContent: YoutubeDialog,
    onClick: (_editor, ref) => ref.current?.open(),
});

export default ControlYoutube;
