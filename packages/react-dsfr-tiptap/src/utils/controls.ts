import { LazyExoticComponent, ReactNode } from "react";

import { Control, DialogControl, MarkdownControl } from "../types/controls";

import {
    ControlAlignCenter,
    ControlAlignJustify,
    ControlAlignLeft,
    ControlAlignRight,
    ControlBlockquote,
    ControlBold,
    ControlBulletList,
    ControlClearFormatting,
    ControlCode,
    ControlCodeBlock,
    ControlH1,
    ControlH2,
    ControlH3,
    ControlH4,
    ControlH5,
    ControlH6,
    ControlHighlight,
    ControlHorizontalRule,
    ControlItalic,
    ControlOrderedList,
    ControlParagraph,
    ControlRedo,
    ControlStrike,
    ControlSubscript,
    ControlSuperscript,
    ControlUnderline,
    ControlUndo,
} from "../controls/Controls";
import { ControlColor } from "../controls/CustomControls";

export type ControlComponent = (() => ReactNode) | LazyExoticComponent<() => ReactNode>;

export const markdownControls: Record<Exclude<MarkdownControl, DialogControl>, ControlComponent> = {
    Blockquote: ControlBlockquote,
    Bold: ControlBold,
    BulletList: ControlBulletList,
    ClearFormatting: ControlClearFormatting,
    Code: ControlCode,
    CodeBlock: ControlCodeBlock,
    H1: ControlH1,
    H2: ControlH2,
    H3: ControlH3,
    H4: ControlH4,
    H5: ControlH5,
    H6: ControlH6,
    HorizontalRule: ControlHorizontalRule,
    Italic: ControlItalic,
    OrderedList: ControlOrderedList,
    Paragraph: ControlParagraph,
    Redo: ControlRedo,
    Strike: ControlStrike,
    Undo: ControlUndo,
};

export const richTextEditorControls: Record<Exclude<Control, DialogControl>, ControlComponent> = {
    ...markdownControls,
    AlignCenter: ControlAlignCenter,
    AlignJustify: ControlAlignJustify,
    AlignLeft: ControlAlignLeft,
    AlignRight: ControlAlignRight,
    Color: ControlColor,
    Highlight: ControlHighlight,
    Subscript: ControlSubscript,
    Superscript: ControlSuperscript,
    Underline: ControlUnderline,
};
