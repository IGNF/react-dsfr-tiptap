import { describe, test } from "@jest/globals";
import { renderHook } from "@testing-library/react";

import { renderHookWithError } from "../test-utils";

import { dialogContext, useDialog } from "./dialog";

describe("useDialog hook", () => {
    test("it should throw an error if the context is not present", async () => {
        expect(() => {
            renderHookWithError(() => useDialog());
        }).toThrow(Error);
    });

    test("it should throw an error if the modal is missing in the context", async () => {
        const dialog = {
            isOpened: false,
            onClose: () => null,
        };
        expect(() => {
            renderHookWithError(() => useDialog(), {
                wrapper({ children }) {
                    return <dialogContext.Provider value={dialog}>{children}</dialogContext.Provider>;
                },
            });
        }).toThrow(Error);
    });

    test("it should return the context", async () => {
        const dialog = {
            isOpened: false,
            modal: {
                buttonProps: {
                    id: "test",
                    "aria-controls": "test",
                    "data-fr-opened": false,
                },
                Component: () => <></>,
                close: () => null,
                open: () => null,
                isOpenedByDefault: false,
                id: "test",
            },
            onClose: () => null,
        };
        const { result } = renderHook(() => useDialog(), {
            wrapper({ children }) {
                return <dialogContext.Provider value={dialog}>{children}</dialogContext.Provider>;
            },
        });
        expect(result.current).toEqual(dialog);
    });
});
