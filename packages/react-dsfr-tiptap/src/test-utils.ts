import { jest } from "@jest/globals";
import { renderHook, RenderHookOptions } from "@testing-library/react";

export function suppressConsoleError(): () => void {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    return () => errorSpy.mockRestore();
}

export function renderHookWithError<Result, Props>(render: (initialProps: Props) => Result, options?: RenderHookOptions<Props>): void {
    const restore = suppressConsoleError();
    try {
        renderHook(render, options);
    } finally {
        restore();
    }
}
