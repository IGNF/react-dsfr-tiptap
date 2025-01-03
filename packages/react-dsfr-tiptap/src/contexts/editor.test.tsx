import { describe, test } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { Editor } from "@tiptap/react";

import { renderHookWithError } from "../test-utils";

import { editorContext, useEditor } from "./editor";

describe("useEditor hook", () => {
    test("it should throw an error if the context is not present", async () => {
        expect(() => {
            renderHookWithError(() => useEditor());
        }).toThrow(Error);
    });

    test("it should return the context", async () => {
        const editor = { test: 42 } as unknown as Editor;
        const { result } = renderHook(() => useEditor(), {
            wrapper({ children }) {
                return <editorContext.Provider value={editor}>{children}</editorContext.Provider>;
            },
        });
        expect(result.current).toEqual(editor);
    });
});
