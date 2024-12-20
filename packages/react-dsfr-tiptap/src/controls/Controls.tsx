import { createControl } from "./createControls";

export const ControlBold = createControl({
    buttonProps: { iconId: "ri-bold", title: "Gras" },
    isActive: { name: "bold" },
    operation: { name: "toggleBold" },
});

export const ControlItalic = createControl({
    buttonProps: { iconId: "ri-italic", title: "Italique" },
    isActive: { name: "italic" },
    operation: { name: "toggleItalic" },
});

export const ControlUnderline = createControl({
    buttonProps: { iconId: "ri-underline", title: "Souligné" },
    isActive: { name: "underline" },
    operation: { name: "toggleUnderline" },
});

export const ControlStrike = createControl({
    buttonProps: { iconId: "ri-strikethrough", title: "Barré" },
    isActive: { name: "strike" },
    operation: { name: "toggleStrike" },
});

export const ControlCode = createControl({
    buttonProps: { iconId: "ri-code-s-slash-line", title: "Code" },
    isActive: { name: "code" },
    operation: { name: "toggleCode" },
});

export const ControlParagraph = createControl({
    buttonProps: { iconId: "ri-paragraph", title: "Paragraphe" },
    isActive: { name: "paragraph" },
    operation: { name: "setParagraph" },
});

export const ControlBulletList = createControl({
    buttonProps: { iconId: "ri-list-unordered", title: "Liste à puces" },
    isActive: { name: "bulletList" },
    operation: { name: "toggleBulletList" },
});

export const ControlOrderedList = createControl({
    buttonProps: { iconId: "ri-list-ordered", title: "Liste ordonnée" },
    isActive: { name: "orderedList" },
    operation: { name: "toggleOrderedList" },
});

export const ControlCodeBlock = createControl({
    buttonProps: { iconId: "ri-code-block", title: "Bloc de code" },
    isActive: { name: "codeBlock" },
    operation: { name: "toggleCodeBlock" },
});

export const ControlBlockquote = createControl({
    buttonProps: { iconId: "ri-double-quotes-l", title: "Citation" },
    isActive: { name: "blockquote" },
    operation: { name: "toggleBlockquote" },
});

export const ControlUndo = createControl({
    buttonProps: { iconId: "ri-arrow-go-back-line", title: "Défaire" },
    isDisabled: (editor) => !editor?.can().undo(),
    operation: { name: "undo" },
});

export const ControlRedo = createControl({
    buttonProps: { iconId: "ri-arrow-go-forward-line", title: "Refaire" },
    isDisabled: (editor) => !editor?.can().redo(),
    operation: { name: "redo" },
});

export const ControlH1 = createControl({
    buttonProps: { iconId: "fr-icon-h-1", title: "Titre 1" },
    isActive: { name: "heading", attributes: { level: 1 } },
    operation: { name: "toggleHeading", attributes: { level: 1 } },
});

export const ControlH2 = createControl({
    buttonProps: { iconId: "fr-icon-h-2", title: "Titre 2" },
    isActive: { name: "heading", attributes: { level: 2 } },
    operation: { name: "toggleHeading", attributes: { level: 2 } },
});

export const ControlH3 = createControl({
    buttonProps: { iconId: "fr-icon-h-3", title: "Titre 3" },
    isActive: { name: "heading", attributes: { level: 3 } },
    operation: { name: "toggleHeading", attributes: { level: 3 } },
});

export const ControlH4 = createControl({
    buttonProps: { iconId: "fr-icon-h-4", title: "Titre 4" },
    isActive: { name: "heading", attributes: { level: 4 } },
    operation: { name: "toggleHeading", attributes: { level: 4 } },
});

export const ControlH5 = createControl({
    buttonProps: { iconId: "fr-icon-h-5", title: "Titre 5" },
    isActive: { name: "heading", attributes: { level: 5 } },
    operation: { name: "toggleHeading", attributes: { level: 5 } },
});

export const ControlH6 = createControl({
    buttonProps: { iconId: "fr-icon-h-6", title: "Titre 6" },
    isActive: { name: "heading", attributes: { level: 6 } },
    operation: { name: "toggleHeading", attributes: { level: 6 } },
});

export const ControlHorizontalRule = createControl({
    buttonProps: { iconId: "ri-separator", title: "Ligne horizontale" },
    operation: { name: "setHorizontalRule" },
});

export const ControlClearFormatting = createControl({
    buttonProps: { iconId: "ri-format-clear", title: "Supprimer le formatage" },
    operation: { name: "unsetAllMarks" },
});

export const ControlHighlight = createControl({
    buttonProps: { iconId: "fr-icon-mark-pen-line", title: "Surligner" },
    isActive: { name: "highlight" },
    operation: { name: "toggleHighlight" },
});
export const ControlSubscript = createControl({
    buttonProps: { iconId: "ri-subscript", title: "Indice" },
    isActive: { name: "subscript" },
    operation: { name: "toggleSubscript" },
});

export const ControlSuperscript = createControl({
    buttonProps: { iconId: "ri-superscript", title: "Exposant" },
    isActive: { name: "superscript" },
    operation: { name: "toggleSuperscript" },
});

export const ControlAlignLeft = createControl({
    buttonProps: { iconId: "ri-align-left", title: "Aligner à gauche" },
    operation: { name: "setTextAlign", attributes: "left" },
});

export const ControlAlignCenter = createControl({
    buttonProps: { iconId: "ri-align-center", title: "Centrer" },
    operation: { name: "setTextAlign", attributes: "center" },
});

export const ControlAlignRight = createControl({
    buttonProps: { iconId: "ri-align-right", title: "Aligner à droite" },
    operation: { name: "setTextAlign", attributes: "right" },
});

export const ControlAlignJustify = createControl({
    buttonProps: { iconId: "ri-align-justify", title: "Justifier" },
    operation: { name: "setTextAlign", attributes: "justify" },
});
