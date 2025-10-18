import { useState } from "react";
import { RichTextEditor } from "react-dsfr-tiptap";
import { ControlImage, ControlLink, ControlUnlink, ControlYoutube } from "react-dsfr-tiptap/dialog";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Button from "@codegouvfr/react-dsfr/Button";
import { fr } from "@codegouvfr/react-dsfr";

import { CustomControl1, CustomControl2, CustomControl3 } from "./TiptapCustomButtons";
import "./custom.css";

const initialContent = `<p>Hello, <strong>World!</strong></p>`;

const Custom = () => {
    const [content, setContent] = useState(initialContent);

    function reset() {
        setContent(initialContent);
    }

    return (
        <>
            <Button className={fr.cx("fr-mt-2w")} type="button" onClick={reset}>
                Reset content
            </Button>
            <RichTextEditor.Provider
                content={content}
                extensions={[
                    StarterKit.configure({
                        link: false, // Disable link from StarterKit to avoid conflicts with our custom one
                    }),
                    Link,
                    Placeholder.configure({
                        placeholder: "Write something …",
                    }),
                ]}
                onUpdate={({ editor }) => setContent(editor.getHTML())}
            >
                <RichTextEditor.Menu first>
                    <RichTextEditor.Group>
                        <RichTextEditor.Bold />
                    </RichTextEditor.Group>
                    <RichTextEditor.Group>
                        <CustomControl1 />
                        <CustomControl2 />
                        <CustomControl3 />
                    </RichTextEditor.Group>
                    <RichTextEditor.Group>
                        <ControlLink />
                        <ControlUnlink />
                    </RichTextEditor.Group>
                    <RichTextEditor.Group>
                        <ControlImage />
                        <ControlYoutube />
                    </RichTextEditor.Group>
                </RichTextEditor.Menu>
                <RichTextEditor.Content />
            </RichTextEditor.Provider>
            <div className="fr-tiptap" dangerouslySetInnerHTML={{ __html: content }}></div>
        </>
    );
};

export default Custom;
