import { describe, test } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";

import Loader from "./Loader";

describe("Loader component", () => {
    test("it should render only the 'Bold' button", async () => {
        render(<Loader controls={[["Bold"]]} />);
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toEqual(1);
        expect(buttons[0].getAttribute("title")).toEqual("Gras");
    });

    test("it should render the 'Bold' and the 'Underline' buttons", async () => {
        render(<Loader controls={[["Bold", "Underline"]]} />);
        // Wait for the second render
        await waitFor(() => expect(screen.queryAllByRole("button").length).toEqual(2));
    });
});
