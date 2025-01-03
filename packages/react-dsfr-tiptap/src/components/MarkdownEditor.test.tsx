import { describe, test } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";

import MarkdownEditor from "./MarkdownEditor";

describe("MarkdownEditor component", () => {
    test("it render the MarkdownEditor component", async () => {
        render(<MarkdownEditor content="# Hello World" />);
        // Wait for the loader
        await waitFor(() => expect(screen.queryAllByRole("button").length).toEqual(18));
        const title = screen.getByText("Hello World");
        expect(title).toBeInTheDocument();
        expect(title instanceof HTMLHeadingElement).toBe(true);
    });
});
