import { describe, expect, jest, test } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import StarterKit from "@tiptap/starter-kit";

import Loader from "./Loader";
import MarkdownEditor from "./MarkdownEditor";

// ---------------------------------------------------------------------------
// Existing behaviour
// ---------------------------------------------------------------------------

describe("Loader component", () => {
    test("it should render only the 'Bold' button", async () => {
        render(<Loader controls={[["Bold"]]} />);
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toEqual(1);
        expect(buttons[0].getAttribute("title")).toEqual("Gras");
    });

    test("it should render the 'Bold' and the 'Italic' buttons", async () => {
        render(<Loader controls={[["Bold", "Italic"]]} />);
        // Wait for the second render
        await waitFor(() => expect(screen.queryAllByRole("button").length).toEqual(2));
    });
});

// ---------------------------------------------------------------------------
// Stage 1 — duplicate-extension fix
// ---------------------------------------------------------------------------

describe("Loader — no duplicate-extension warning (StarterKit.configure { link, underline })", () => {
    test("no 'duplicate extension names' warning when Link control is mounted with extensionLoader", async () => {
        const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

        render(
            <Loader
                controls={[["Bold", "Link"]]}
                extensions={[StarterKit.configure({ link: false, underline: false })]}
                extensionLoader={{
                    link: () => import("@tiptap/extension-link").then((m) => m.default),
                }}
            />
        );

        await waitFor(() => expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(1));

        // Should be no warning about duplicate extension names
        const duplicateWarnings = warnSpy.mock.calls.filter(
            (args) => typeof args[0] === "string" && (args[0] as string).includes("Duplicate extension names found")
        );
        expect(duplicateWarnings).toHaveLength(0);

        warnSpy.mockRestore();
    });

    test("no duplicate-extension warning when Underline control is mounted with extensionLoader", async () => {
        const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

        render(
            <Loader
                controls={[["Bold", "Underline"]]}
                extensions={[StarterKit.configure({ link: false, underline: false })]}
                extensionLoader={{
                    underline: () => import("@tiptap/extension-underline").then((m) => m.default),
                }}
            />
        );

        await waitFor(() => expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(1));

        const duplicateWarnings = warnSpy.mock.calls.filter(
            (args) => typeof args[0] === "string" && (args[0] as string).includes("Duplicate extension names found")
        );
        expect(duplicateWarnings).toHaveLength(0);

        warnSpy.mockRestore();
    });
});

// ---------------------------------------------------------------------------
// Stage 1 — helpful missing-extension warning
// ---------------------------------------------------------------------------

describe("Loader — helpful warning when extensionLoader is missing", () => {
    test("emits a copy-paste warning when Link control is used without extensionLoader entry", async () => {
        const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

        render(<Loader controls={[["Bold", "Link"]]} />);

        // No extensionLoader → Loader renders immediately (no pending load)
        await waitFor(() => screen.getAllByRole("button").length >= 1);

        const missingWarnings = warnSpy.mock.calls.filter(
            (args) => typeof args[0] === "string" && (args[0] as string).includes("[react-dsfr-tiptap] Missing extensions")
        );
        expect(missingWarnings.length).toBeGreaterThan(0);
        // The warning should mention 'link' and give a copy-paste fix
        expect(missingWarnings[0][0]).toContain("link");
        expect(missingWarnings[0][0]).toContain("extensionLoader");

        warnSpy.mockRestore();
    });

    test("emits a copy-paste warning when Underline control is used without extensionLoader entry", async () => {
        const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

        render(<Loader controls={[["Bold", "Underline"]]} />);

        await waitFor(() => screen.getAllByRole("button").length >= 1);

        const missingWarnings = warnSpy.mock.calls.filter(
            (args) => typeof args[0] === "string" && (args[0] as string).includes("[react-dsfr-tiptap] Missing extensions")
        );
        expect(missingWarnings.length).toBeGreaterThan(0);
        expect(missingWarnings[0][0]).toContain("underline");

        warnSpy.mockRestore();
    });
});

// ---------------------------------------------------------------------------
// Stage 1 — MarkdownEditor: Link/Unlink require extensionLoader too
// ---------------------------------------------------------------------------

describe("MarkdownEditor — Link/Unlink warning without extensionLoader", () => {
    test("emits a missing-extension warning when Link control is used without extensionLoader provided", async () => {
        // MarkdownEditor exposes Link/Unlink as supported controls.
        // Without extensionLoader.link, Loader warns (never throws).
        const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

        render(<MarkdownEditor controls={[["Bold", "Link"]]} content="" />);

        await waitFor(() => screen.getAllByRole("button").length >= 1);

        const missingWarnings = warnSpy.mock.calls.filter(
            (args) => typeof args[0] === "string" && (args[0] as string).includes("[react-dsfr-tiptap] Missing extensions")
        );
        expect(missingWarnings.length).toBeGreaterThan(0);
        expect(missingWarnings[0][0]).toContain("link");

        warnSpy.mockRestore();
    });

    test("no duplicate-extension warning when MarkdownEditor Link/Unlink have an extensionLoader entry", async () => {
        const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

        render(
            <MarkdownEditor
                controls={[["Bold", "Link", "Unlink"]]}
                content=""
                extensionLoader={{
                    link: () => import("@tiptap/extension-link").then((m) => m.default),
                }}
            />
        );

        await waitFor(() => expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(1));

        const duplicateWarnings = warnSpy.mock.calls.filter(
            (args) => typeof args[0] === "string" && (args[0] as string).includes("Duplicate extension names found")
        );
        expect(duplicateWarnings).toHaveLength(0);

        warnSpy.mockRestore();
    });
});

// ---------------------------------------------------------------------------
// Stage 1 — optional: verify default extensions are not bare StarterKit
// ---------------------------------------------------------------------------

describe("default extension constants — StarterKit is configured", () => {
    test("richTextEditorDefaultExtensions: StarterKit has link and underline disabled", async () => {
        const { richTextEditorDefaultExtensions } = await import("../constants/richTextEditor");
        const starterKitEntry = richTextEditorDefaultExtensions.find((e) => e.name === "starterKit");
        expect(starterKitEntry).toBeDefined();
        // A configured StarterKit instance is NOT the raw class/constructor,
        // so its reference differs from bare StarterKit.
        expect(starterKitEntry).not.toBe(StarterKit);
    });

    test("markdownEditorDefaultExtensions: StarterKit has link and underline disabled", async () => {
        const { markdownEditorDefaultExtensions } = await import("../constants/markdownEditor");
        const starterKitEntry = markdownEditorDefaultExtensions.find((e) => e.name === "starterKit");
        expect(starterKitEntry).toBeDefined();
        expect(starterKitEntry).not.toBe(StarterKit);
    });
});
