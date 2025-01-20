export type MarkdownControl =
    | "Bold"
    | "Italic"
    | "Strike"
    | "Code"
    | "ClearFormatting"
    | "H1"
    | "H2"
    | "H3"
    | "H4"
    | "H5"
    | "H6"
    | "Paragraph"
    | "BulletList"
    | "OrderedList"
    | "CodeBlock"
    | "Blockquote"
    | "HorizontalRule"
    | "Link"
    | "Unlink"
    | "Undo"
    | "Redo"
    | "Image";

export type Control =
    | MarkdownControl
    | "Color"
    | "Underline"
    | "Subscript"
    | "Superscript"
    | "Highlight"
    | "AlignLeft"
    | "AlignCenter"
    | "AlignRight"
    | "AlignJustify"
    | "Youtube";

export type DialogControl = "Link" | "Unlink" | "Image" | "Youtube";
