import { useState } from "react";
import { ControlImage, ControlLink, ControlUnlink } from "react-dsfr-tiptap/dialog";
import { MarkdownEditor } from "react-dsfr-tiptap/markdown";
import Button from "@codegouvfr/react-dsfr/Button";
import { fr } from "@codegouvfr/react-dsfr";

const extensionLoader = {
    image: () => import("@tiptap/extension-image").then((module) => module.default),
    link: () => import("@tiptap/extension-link").then((module) => module.default),
};

const initialContent = `
# Tiptap Editor

The Tiptap Editor is a headless, framework-agnostic rich text editor that's customizable and extendable through extensions. Its headless nature means it comes without a set user interface, offering full design freedom (for a jumpstart, see linked [UI templates](#examples-codesandbox-and-ui-templates) below). Tiptap is based on the highly reliable [ProseMirror](https://github.com/ProseMirror/prosemirror) library.

Tiptap Editor is complemented by the collaboration open-source backend [Hocuspocus](https://github.com/ueberdosis/hocuspocus). Both the Editor and Hocuspocus form the foundation of the [Tiptap Suite](https://tiptap.dev/).

[![Build Status](https://github.com/ueberdosis/tiptap/actions/workflows/build.yml/badge.svg)](https://github.com/ueberdosis/tiptap/actions/workflows/build.yml)
[![Version](https://img.shields.io/npm/v/@tiptap/core.svg?label=version)](https://www.npmjs.com/package/@tiptap/core)

### How does the Tiptap Editor work?

- **Headless Framework:** Tiptap does not rely on a user interface. So there is no need for class overrides or code hacks. If you do need an example UI feel free to browse our [UI templates](#examples-codesandbox-and-ui-templates) linked below.
- **Framework-agnostic:** The Tiptap Editor is designed to work across different frontend frameworks. This means whether you're using Vue, React, or plain JavaScript, Tiptap integrates  without compatibility issues.
`;

const Markdown = () => {
    const [content, setContent] = useState(initialContent);

    function reset() {
        setContent(initialContent);
    }

    return (
        <>
            <Button className={fr.cx("fr-mt-2w")} type="button" onClick={reset}>
                Reset content
            </Button>
            <MarkdownEditor
                controlMap={{ Link: ControlLink, Unlink: ControlUnlink, Image: ControlImage }}
                content={content}
                extensionLoader={extensionLoader}
                onContentUpdate={setContent}
            />
            <pre
                style={{
                    whiteSpace: "pre-wrap",
                }}
            >
                <code>{content}</code>
            </pre>
        </>
    );
};

export default Markdown;
