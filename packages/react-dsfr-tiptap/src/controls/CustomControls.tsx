import { createCustomControl } from "./createControls";
import ColorInput from "../components/ColorInput";

export const ControlColor = createCustomControl({
    Control: (editor) => <ColorInput editor={editor} />,
});
