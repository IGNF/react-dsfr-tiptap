import { describe, jest, test } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import { Editor } from "@tiptap/react";

import ColorInput from "./ColorInput";

describe("ColorInput component", () => {
    test("it should pass the selected color to the editor object", async () => {
        const editor = {
            chain: jest.fn(() => editor),
            focus: jest.fn(() => editor),
            getAttributes: jest.fn(() => ({ color: "#333333" })),
            off: jest.fn(() => editor),
            on: jest.fn(() => editor),
            run: jest.fn(() => editor),
            setColor: jest.fn(() => editor),
        };
        render(<ColorInput editor={editor as unknown as Editor} />);
        const el = await screen.getByTestId("ColorInput");
        fireEvent.input(el, { target: { value: "#333333" } });
        expect(editor.setColor).toHaveBeenCalledWith("#333333");
    });
});
