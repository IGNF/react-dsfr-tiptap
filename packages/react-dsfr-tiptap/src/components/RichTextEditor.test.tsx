import { describe, test } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";

import RichTextEditor from "./RichTextEditor";

describe("RichTextEditor component", () => {
    test("it render the RichTextEditor component", async () => {
        render(<RichTextEditor content="<h1>Hello World<h1>" />);
        // Wait for the loader
        await waitFor(() => expect(screen.queryAllByRole("button").length).toEqual(27));
        const title = screen.getByText("Hello World");
        expect(title).toBeInTheDocument();
        expect(title instanceof HTMLHeadingElement).toBe(true);
    });
});
