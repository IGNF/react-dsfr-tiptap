// import ImageDialog from "../dialogs/ImageDialog";
// import LinkDialog from "../dialogs/LinkDialog";
// import YoutubeDialog from "../dialogs/YoutubeDialog";

import { createControl, createCustomControl } from "./createControls";
import ColorInput from "./ColorInput";

export const RichTextEditorBold = createControl({
    buttonProps: { iconId: "ri-bold", title: "Gras" },
    isActive: { name: "bold" },
    operation: { name: "toggleBold" },
});

export const RichTextEditorItalic = createControl({
    buttonProps: { iconId: "ri-italic", title: "Italique" },
    isActive: { name: "italic" },
    operation: { name: "toggleItalic" },
});

export const RichTextEditorUnderline = createControl({
    buttonProps: { iconId: "ri-underline", title: "Souligné" },
    isActive: { name: "underline" },
    operation: { name: "toggleUnderline" },
});

export const RichTextEditorStrike = createControl({
    buttonProps: { iconId: "ri-strikethrough", title: "Barré" },
    isActive: { name: "strike" },
    operation: { name: "toggleStrike" },
});

export const RichTextEditorCode = createControl({
    buttonProps: { iconId: "ri-code-s-slash-line", title: "Code" },
    isActive: { name: "code" },
    operation: { name: "toggleCode" },
});

export const RichTextEditorParagraph = createControl({
    buttonProps: { iconId: "ri-paragraph", title: "Paragraphe" },
    isActive: { name: "paragraph" },
    operation: { name: "setParagraph" },
});

export const RichTextEditorBulletList = createControl({
    buttonProps: { iconId: "ri-list-unordered", title: "Liste à puces" },
    isActive: { name: "bulletList" },
    operation: { name: "toggleBulletList" },
});

export const RichTextEditorOrderedList = createControl({
    buttonProps: { iconId: "ri-list-ordered", title: "Liste ordonnée" },
    isActive: { name: "orderedList" },
    operation: { name: "toggleOrderedList" },
});

export const RichTextEditorCodeBlock = createControl({
    buttonProps: { iconId: "ri-code-block", title: "Bloc de code" },
    isActive: { name: "codeBlock" },
    operation: { name: "toggleCodeBlock" },
});

export const RichTextEditorBlockquote = createControl({
    buttonProps: { iconId: "ri-double-quotes-l", title: "Citation" },
    isActive: { name: "blockquote" },
    operation: { name: "toggleBlockquote" },
});

export const RichTextEditorUndo = createControl({
    buttonProps: { iconId: "ri-arrow-go-back-line", title: "Défaire" },
    isDisabled: (editor) => !editor?.can().undo(),
    operation: { name: "undo" },
});

export const RichTextEditorRedo = createControl({
    buttonProps: { iconId: "ri-arrow-go-forward-line", title: "Refaire" },
    isDisabled: (editor) => !editor?.can().redo(),
    operation: { name: "redo" },
});

export const RichTextEditorH1 = createControl({
    buttonProps: { iconId: "fr-icon-h-1", title: "Titre 1" },
    isActive: { name: "heading", attributes: { level: 1 } },
    operation: { name: "toggleHeading", attributes: { level: 1 } },
});

export const RichTextEditorH2 = createControl({
    buttonProps: { iconId: "fr-icon-h-2", title: "Titre 2" },
    isActive: { name: "heading", attributes: { level: 2 } },
    operation: { name: "toggleHeading", attributes: { level: 2 } },
});

export const RichTextEditorH3 = createControl({
    buttonProps: { iconId: "fr-icon-h-3", title: "Titre 3" },
    isActive: { name: "heading", attributes: { level: 3 } },
    operation: { name: "toggleHeading", attributes: { level: 3 } },
});

export const RichTextEditorH4 = createControl({
    buttonProps: { iconId: "fr-icon-h-4", title: "Titre 4" },
    isActive: { name: "heading", attributes: { level: 4 } },
    operation: { name: "toggleHeading", attributes: { level: 4 } },
});

export const RichTextEditorH5 = createControl({
    buttonProps: { iconId: "fr-icon-h-5", title: "Titre 5" },
    isActive: { name: "heading", attributes: { level: 5 } },
    operation: { name: "toggleHeading", attributes: { level: 5 } },
});

export const RichTextEditorH6 = createControl({
    buttonProps: { iconId: "fr-icon-h-6", title: "Titre 6" },
    isActive: { name: "heading", attributes: { level: 6 } },
    operation: { name: "toggleHeading", attributes: { level: 6 } },
});

export const RichTextEditorHorizontalRule = createControl({
    buttonProps: { iconId: "ri-separator", title: "Ligne horizontale" },
    operation: { name: "setHorizontalRule" },
});

export const RichTextEditorClearFormatting = createControl({
    buttonProps: { iconId: "ri-format-clear", title: "Supprimer le formatage" },
    operation: { name: "unsetAllMarks" },
});

export const RichTextEditorHighlight = createControl({
    buttonProps: { iconId: "fr-icon-mark-pen-line", title: "Surligner" },
    isActive: { name: "highlight" },
    operation: { name: "toggleHighlight" },
});
export const RichTextEditorSubscript = createControl({
    buttonProps: { iconId: "ri-subscript", title: "Indice" },
    isActive: { name: "subscript" },
    operation: { name: "toggleSubscript" },
});

export const RichTextEditorSuperscript = createControl({
    buttonProps: { iconId: "ri-superscript", title: "Exposant" },
    isActive: { name: "superscript" },
    operation: { name: "toggleSuperscript" },
});

export const RichTextEditorAlignLeft = createControl({
    buttonProps: { iconId: "ri-align-left", title: "Aligner à gauche" },
    operation: { name: "setTextAlign", attributes: "left" },
});

export const RichTextEditorAlignCenter = createControl({
    buttonProps: { iconId: "ri-align-center", title: "Centrer" },
    operation: { name: "setTextAlign", attributes: "center" },
});

export const RichTextEditorAlignRight = createControl({
    buttonProps: { iconId: "ri-align-right", title: "Aligner à droite" },
    operation: { name: "setTextAlign", attributes: "right" },
});

export const RichTextEditorAlignJustify = createControl({
    buttonProps: { iconId: "ri-align-justify", title: "Justifier" },
    operation: { name: "setTextAlign", attributes: "justify" },
});

// export const RichTextEditorUnlink = createControl({
//     buttonProps: { iconId: "ri-link-unlink", title: "Supprimer le lien" },
//     operation: { name: "unsetLink" },
// });

// export const RichTextEditorLink = createDialogControl({
//     buttonProps: { iconId: "ri-link", title: "Ajouter un lien" },
//     DialogContent: LinkDialog,
//     onClick: (editor, ref) => ref.current?.open(),
// });

// export const RichTextEditorImage = createDialogControl({
//     buttonProps: { iconId: "ri-image-line", title: "Insérer une image" },
//     DialogContent: ImageDialog,
//     onClick: (editor, ref) => ref.current?.open(),
// });

// export const RichTextEditorYoutube = createDialogControl({
//     buttonProps: { iconId: "ri-video-line", title: "Insérer une vidéo" },
//     DialogContent: YoutubeDialog,
//     onClick: (editor, ref) => ref.current?.open(),
// });

export const RichTextEditorColor = createCustomControl({
    Control: (editor) => <ColorInput editor={editor} />,
});
