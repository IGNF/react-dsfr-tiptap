import { describe, test } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";

import RichTextEditor from "./RichTextEditor";

describe("RichTextEditor component", () => {
    test("it render the RichTextEditor component", async () => {
        render(<RichTextEditor content="<h1>Hello World<h1>" />);
        // Wait for the loader
        await waitFor(() => expect(screen.queryAllByRole("button").length).toEqual(19));
        const title = screen.getByText("Hello World");
        expect(title).toBeInTheDocument();
        expect(title instanceof HTMLHeadingElement).toBe(true);
    });

    test("updates editor when content prop changes", async () => {
        const { rerender } = render(<RichTextEditor content="<p>First</p>" />);
        await waitFor(() => expect(screen.queryAllByRole("button").length).toBeGreaterThan(0));
        expect(screen.getByText("First")).toBeInTheDocument();

        // Change content prop simulating a reset
        rerender(<RichTextEditor content="<h2>Second</h2>" />);
        // The new heading should appear, old text should be gone
        await waitFor(() => expect(screen.getByText("Second")).toBeInTheDocument());
    });
});
