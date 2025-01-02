import { describe, expect, test } from "@jest/globals";
import { Editor } from "@tiptap/react";

import { getSelectedText } from "./tiptap";

describe("tiptap utils", () => {
    describe("getSelectedText", () => {
        test("should return selected text", () => {
            expect(
                getSelectedText({
                    state: {
                        doc: {
                            textBetween: () => "42",
                        },
                        selection: {},
                    },
                } as unknown as Editor)
            ).toEqual("42");
        });

        test("should return empty string", () => {
            expect(
                getSelectedText({
                    state: {
                        selection: { empty: true },
                    },
                } as unknown as Editor)
            ).toEqual("");
        });
    });
});
