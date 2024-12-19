export type MarkdownControl =
    | "Bold"
    | "Italic"
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
    // | "Link"
    // | "Unlink"
    | "Undo"
    | "Redo";
// | "Image";

export type Control =
    | MarkdownControl
    | "Color"
    | "Underline"
    | "Strike"
    | "Subscript"
    | "Superscript"
    | "Highlight"
    | "AlignLeft"
    | "AlignCenter"
    | "AlignRight"
    | "AlignJustify";
// | "Youtube";
