import { describe, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import StarterKit from "@tiptap/starter-kit";

import Provider from "../components/Provider";

import { createControl, createCustomControl, createDialogControl } from "./createControls";

describe("createControls util", () => {
    describe("createControl", () => {
        test("it should return a React component", () => {
            const Component = createControl({
                buttonProps: { iconId: "ri-bold", title: "Gras" },
                isActive: { name: "bold" },
                operation: { name: "toggleBold" },
            });
            render(<Component />, {
                wrapper({ children }) {
                    return <Provider extensions={[StarterKit]}>{children}</Provider>;
                },
            });
            const buttons = screen.getAllByRole("button");
            expect(buttons.length).toEqual(1);
            expect(buttons[0].getAttribute("title")).toEqual("Gras");
        });
    });

    describe("createCustomControl", () => {
        test("it should return a React component", () => {
            const Component = createCustomControl({
                Control: () => <button title="Test">Test</button>,
            });
            render(<Component />, {
                wrapper({ children }) {
                    return <Provider extensions={[StarterKit]}>{children}</Provider>;
                },
            });
            const buttons = screen.getAllByRole("button");
            expect(buttons.length).toEqual(1);
            expect(buttons[0].getAttribute("title")).toEqual("Test");
        });
    });

    describe("createDialogControl", () => {
        test("it should return a React component", () => {
            const Component = createDialogControl({
                buttonProps: { iconId: "ri-image-line", title: "Insérer une image" },
                DialogContent: () => <></>,
                onClick: (_editor, ref) => ref.current?.open(),
            });
            render(<Component />, {
                wrapper({ children }) {
                    return <Provider extensions={[StarterKit]}>{children}</Provider>;
                },
            });
            const buttons = screen.getAllByRole("button");
            expect(buttons.length).toEqual(1);
            expect(buttons[0].getAttribute("title")).toEqual("Insérer une image");
        });
    });
});
