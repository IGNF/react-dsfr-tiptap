import { describe, expect, test } from "@jest/globals";
import { act, render, screen } from "@testing-library/react";
import { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { editorContext } from "../contexts/editor";
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

    describe("destroyed editor guard", () => {
        test("le sélecteur ne doit pas lever d'erreur quand l'éditeur est détruit", () => {
            // Régression : avant le correctif, editor.can() levait
            // "TypeError: can't access property 'can', this.commandManager is null"
            // quand le sélecteur de useEditorState s'exécutait après destroy().
            const ControlBold = createControl({
                buttonProps: { iconId: "ri-bold", title: "Gras" },
                isActive: { name: "bold" },
                operation: { name: "toggleBold" },
            });

            // On crée un éditeur réel de façon synchrone (sans Provider) afin de
            // contrôler son cycle de vie directement.
            const editor = new Editor({ extensions: [StarterKit] });

            const { rerender } = render(
                <editorContext.Provider value={editor}>
                    <ControlBold />
                </editorContext.Provider>
            );

            // Destruction de l'éditeur : commandManager est mis à null par @tiptap/core.
            // Le prochain render du sélecteur doit être neutre, sans erreur.
            act(() => {
                editor.destroy();
            });

            // On force un re-render pour que useEditorState rejoue le sélecteur
            // sur l'éditeur détruit.
            expect(() =>
                rerender(
                    <editorContext.Provider value={editor}>
                        <ControlBold />
                    </editorContext.Provider>
                )
            ).not.toThrow();

            // Le bouton doit exister et être désactivé (état neutre de sécurité).
            const button = screen.getByRole("button", { name: /Gras/i });
            expect(button).toBeDefined();
            expect(button.getAttribute("disabled") ?? button.getAttribute("aria-disabled")).not.toBeNull();
        });
    });
});
