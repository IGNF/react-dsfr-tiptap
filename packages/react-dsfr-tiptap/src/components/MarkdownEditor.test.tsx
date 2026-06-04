import { afterEach, describe, expect, jest, test } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";

import MarkdownEditor from "./MarkdownEditor";

describe("MarkdownEditor component", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("it render the MarkdownEditor component", async () => {
        render(<MarkdownEditor content="# Hello World" />);
        // Wait for the loader
        await waitFor(() => expect(screen.queryAllByRole("button").length).toEqual(19));
        const title = screen.getByText("Hello World");
        expect(title).toBeInTheDocument();
        expect(title instanceof HTMLHeadingElement).toBe(true);
    });

    test("loads link without duplicate extension warning", async () => {
        const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => undefined);

        render(
            <MarkdownEditor
                content="# Hello"
                controls={[["Link"]]}
                extensionLoader={{
                    link: async () => (await import("@tiptap/extension-link")).default,
                }}
            />
        );

        // Wait for the editor to mount (Loader returns null while extensions load)
        await waitFor(() => expect(screen.getByText("Hello")).toBeInTheDocument());
        expect(
            warnSpy.mock.calls.some(
                ([message]) => typeof message === "string" && message.includes("Duplicate extension names found") && message.includes("link")
            )
        ).toBe(false);
    });
});
