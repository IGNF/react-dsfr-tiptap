import { useState } from "react";
import { RichTextEditor } from "react-dsfr-tiptap";
import { ControlImage, ControlLink, ControlUnlink, ControlYoutube } from "react-dsfr-tiptap/dialog";

import { CustomControl1, CustomControl2, CustomControl3 } from "./TiptapCustomButtons";

const extensionLoader = {
    color: () =>
        Promise.all([
            import("@tiptap/extension-color").then((module) => module.default),
            import("@tiptap/extension-text-style").then((module) => module.default),
        ]),
    highlight: () => import("@tiptap/extension-highlight").then((module) => module.default),
    image: () => import("@tiptap/extension-image").then((module) => module.default),
    link: () => import("@tiptap/extension-link").then((module) => module.default),
    subscript: () => import("@tiptap/extension-subscript").then((module) => module.default),
    superscript: () => import("@tiptap/extension-superscript").then((module) => module.default),
    textAlign: () => import("@tiptap/extension-text-align").then((module) => module.default),
    underline: () => import("@tiptap/extension-underline").then((module) => module.default),
    youtube: () => import("@tiptap/extension-youtube").then((module) => module.default),
};

const initialContent = `
<h2>
Hi there,
</h2>
<p>
this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor?. But wait until you see the lists:
</p>
<ul>
<li>
  That’s a bullet list with one …
</li>
<li>
  … or two list items.
</li>
</ul>
<p>
Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
Wow, that’s amazing. Good work, boy! 👏
<br />
— Mom
</blockquote>
`;

const Tiptap = () => {
    const [content, setContent] = useState(initialContent);

    return (
        <>
            <RichTextEditor
                content={content}
                controlMap={{ Link: ControlLink, Unlink: ControlUnlink, Image: ControlImage, Youtube: ControlYoutube }}
                controls={[
                    ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "Code", "Highlight", "Color", "ClearFormatting"],
                    ["H1", "H2", "H3", "H4", "H5", "H6", "Paragraph"],
                    ["BulletList", "OrderedList", "CodeBlock", "Blockquote", "HorizontalRule"],
                    ["AlignLeft", "AlignCenter", "AlignRight", "AlignJustify"],
                    ["Undo", "Redo"],
                    ["Link", "Unlink"],
                    ["Image", "Youtube"],
                    [CustomControl1, CustomControl2, CustomControl3],
                ]}
                extensionLoader={extensionLoader}
                onContentUpdate={setContent}
            />
            <div className="fr-tiptap" dangerouslySetInnerHTML={{ __html: content }}></div>
        </>
    );
};

export default Tiptap;
