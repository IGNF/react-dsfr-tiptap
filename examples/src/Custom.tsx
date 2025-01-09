import { useState } from "react";
import { RichTextEditor } from "@ignf/react-dsfr-tiptap";
import { ControlImage, ControlLink, ControlUnlink, ControlYoutube } from "@ignf/react-dsfr-tiptap/dialog";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

import { CustomControl1, CustomControl2, CustomControl3 } from "./TiptapCustomButtons";

const Custom = () => {
    const [content, setContent] = useState(`
<p>
this is a basic example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor?
</p>
`);

    return (
        <>
            <RichTextEditor.Provider content={content} extensions={[StarterKit, Link]} onUpdate={({ editor }) => setContent(editor.getHTML())}>
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
