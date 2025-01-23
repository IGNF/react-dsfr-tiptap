import { useState } from "react";
import { RichTextEditor } from "react-dsfr-tiptap";
import { ControlImage, ControlLink, ControlUnlink, ControlYoutube } from "react-dsfr-tiptap/dialog";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

import { CustomControl1, CustomControl2, CustomControl3 } from "./TiptapCustomButtons";
import "./custom.css";

const Custom = () => {
    const [content, setContent] = useState("");

    return (
        <>
            <RichTextEditor.Provider
                content={content}
                extensions={[
                    StarterKit,
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
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </>
    );
};

export default Custom;
