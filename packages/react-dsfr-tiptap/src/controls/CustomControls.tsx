import type { ReactNode } from "react";
import { createCustomControl } from "./createControls";
import ColorInput from "../components/ColorInput";

export const ControlColor: () => ReactNode = createCustomControl({
    Control: (editor) => <ColorInput editor={editor} />,
});
