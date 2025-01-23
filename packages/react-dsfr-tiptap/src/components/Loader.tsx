import { ReactNode, useEffect, useMemo, useState } from "react";
import { AnyExtension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Control } from "../types/controls";
import { ControlComponent, richTextEditorControls } from "../utils/controls";

import RichTextEditorContent from "./Content";
import RichTextEditorMenu from "./Menu";
import RichTextEditorProvider, { IProviderProps } from "./Provider";
import RichTextEditorGroup from "./Group";

export type Extension =
    | "color"
    | "highlight"
    | "image"
    | "link"
    | "markdown"
    | "starterKit"
    | "subscript"
    | "superscript"
    | "textAlign"
    | "underline"
    | "youtube";

export interface ILoaderProps extends Omit<IProviderProps, "children"> {
    controlMap?: Partial<Record<Control, ControlComponent>>;
    controls: (Control | ControlComponent)[][];
    extensionLoader?: Partial<Record<Extension, () => Promise<AnyExtension | AnyExtension[]>>>;
    menu?: "top" | "bottom";
}

const extensionMapping: Record<Control, Extension> = {
    Bold: "starterKit",
    Color: "color",
    Italic: "starterKit",
    Underline: "underline",
    Strike: "starterKit",
    Subscript: "subscript",
    Superscript: "superscript",
    Code: "starterKit",
    Highlight: "highlight",
    ClearFormatting: "starterKit",
    H1: "starterKit",
    H2: "starterKit",
    H3: "starterKit",
    H4: "starterKit",
    H5: "starterKit",
    H6: "starterKit",
    Paragraph: "starterKit",
    BulletList: "starterKit",
    OrderedList: "starterKit",
    CodeBlock: "starterKit",
    Blockquote: "starterKit",
    HorizontalRule: "starterKit",
    AlignLeft: "textAlign",
    AlignCenter: "textAlign",
    AlignRight: "textAlign",
    AlignJustify: "textAlign",
    Link: "link",
    Unlink: "link",
    Undo: "starterKit",
    Redo: "starterKit",
    Image: "image",
    Youtube: "youtube",
};

const extensionDefaultConfiguration = {
    image: {
        inline: true,
    },
    link: { openOnClick: false },
    textAlign: {
        types: ["heading", "paragraph"],
    },
    youtube: {
        controls: false,
        nocookie: true,
    },
};

function Loader(props: ILoaderProps) {
    const { controlMap = {}, controls, extensionLoader = {}, menu = "top", ...rest } = props;
    const [extensions, setExtensions] = useState<Partial<Record<Extension, AnyExtension>>>(() =>
        Object.fromEntries(props.extensions?.map((extension) => [extension.name, extension]) ?? [["starterKit", StarterKit]])
    );
    const extensionsToLoad = useMemo(() => {
        const neededExtensions = [
            ...new Set(
                controls
                    .flat()
                    .filter((feature) => typeof feature === "string")
                    .map((feature) => extensionMapping[feature])
                    .filter((name) => extensionLoader[name])
            ),
        ];
        const loadedExtensions = Object.keys(extensions);
        return neededExtensions.filter((name) => !loadedExtensions.includes(name));
    }, [controls, extensionLoader, extensions]);

    useEffect(() => {
        if (extensionsToLoad.length > 0) {
            Promise.all(extensionsToLoad.map((name) => extensionLoader[name]!())).then((loadedExtensions) => {
                if (loadedExtensions.length > 0) {
                    setExtensions((extensions) => ({
                        ...extensions,
                        ...Object.fromEntries(
                            loadedExtensions
                                .flat()
                                .map((extension) => [
                                    extension.name,
                                    extension.name in extensionDefaultConfiguration
                                        ? extension.configure(extensionDefaultConfiguration[extension.name as keyof typeof extensionDefaultConfiguration])
                                        : extension,
                                ])
                        ),
                    }));
                }
            });
        }
    }, [controls, extensionLoader, extensionsToLoad]);

    if (extensionsToLoad.length > 0) {
        return null;
    }

    return (
        <RichTextEditorProvider {...rest} extensions={Object.values(extensions)}>
            {menu === "bottom" && <RichTextEditorContent />}
            <RichTextEditorMenu first={menu === "top"} last={menu === "bottom"}>
                {controls
                    .map((group) =>
                        group
                            .map((Component, j) => {
                                if (typeof Component !== "string") {
                                    return <Component key={j} />;
                                }
                                if (Component in controlMap) {
                                    const Cmp = controlMap[Component as keyof typeof controlMap] as () => ReactNode;
                                    return <Cmp key={j} />;
                                }
                                if (Component in richTextEditorControls) {
                                    const Cmp = richTextEditorControls[Component as keyof typeof richTextEditorControls] as () => ReactNode;
                                    return <Cmp key={j} />;
                                }
                                return null;
                            })
                            .filter((x) => x)
                    )
                    .filter((components) => components.length > 0)
                    .map((components, i) => (
                        <RichTextEditorGroup key={i}>{components}</RichTextEditorGroup>
                    ))}
            </RichTextEditorMenu>
            {menu === "top" && <RichTextEditorContent />}
        </RichTextEditorProvider>
    );
}

export default Loader;
