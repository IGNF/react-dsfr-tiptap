import { useState } from "react";
import { RichTextEditor } from "react-dsfr-tiptap";
import StarterKit from "@tiptap/starter-kit";

import { CustomControl1, CustomControl2 } from "./TiptapCustomButtons";

const Custom = () => {
    const [content, setContent] = useState(`
<p>
this is a basic example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor?
</p>
`);

    return (
        <>
            <RichTextEditor.Provider content={content} extensions={[StarterKit]} onUpdate={({ editor }) => setContent(editor.getHTML())}>
                <RichTextEditor.Menu first>
                    <RichTextEditor.Group>
                        <RichTextEditor.Bold />
                    </RichTextEditor.Group>
                    <RichTextEditor.Group>
                        <CustomControl1 />
                        <CustomControl2 />
                    </RichTextEditor.Group>
                </RichTextEditor.Menu>
                <RichTextEditor.Content />
            </RichTextEditor.Provider>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </>
    );
};

export default Custom;
