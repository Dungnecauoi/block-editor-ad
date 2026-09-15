import { BlockNoteEditor, BlockNoteEditorOptions, Block, BlockNoteSchema } from '../../core/src';
export declare const defaultFullSchema: BlockNoteSchema<import('../../core/src').BlockSchemaFromSpecs<{
    column: import('../../core/src').LooseBlockSpec<"column", {
        width: {
            default: number;
        };
    }, "none">;
    columnList: import('../../core/src').LooseBlockSpec<"columnList", {}, "none">;
    audio: import('../../core/src').BlockSpec<"audio", {
        readonly backgroundColor: {
            default: "default";
        };
        readonly name: {
            readonly default: "";
        };
        readonly url: {
            readonly default: "";
        };
        readonly caption: {
            readonly default: "";
        };
        readonly showPreview: {
            readonly default: true;
        };
    }, "none">;
    bulletListItem: import('../../core/src').BlockSpec<"bulletListItem", {
        readonly backgroundColor: {
            default: "default";
        };
        readonly textColor: {
            default: "default";
        };
        readonly textAlignment: {
            default: "left";
            values: readonly ["left", "center", "right", "justify"];
        };
    }, "inline">;
    checkListItem: import('../../core/src').BlockSpec<"checkListItem", {
        readonly checked: {
            readonly default: false;
            readonly type: "boolean";
        };
        readonly backgroundColor: {
            default: "default";
        };
        readonly textColor: {
            default: "default";
        };
        readonly textAlignment: {
            default: "left";
            values: readonly ["left", "center", "right", "justify"];
        };
    }, "inline">;
    codeBlock: import('../../core/src').BlockSpec<"codeBlock", {
        readonly language: {
            readonly default: string;
        };
    }, "plain">;
    divider: import('../../core/src').BlockSpec<"divider", {}, "none">;
    file: import('../../core/src').BlockSpec<"file", {
        readonly backgroundColor: {
            default: "default";
        };
        readonly name: {
            readonly default: "";
        };
        readonly url: {
            readonly default: "";
        };
        readonly caption: {
            readonly default: "";
        };
    }, "none">;
    heading: import('../../core/src').BlockSpec<"heading", {
        readonly isToggleable?: {
            readonly default: false;
            readonly optional: true;
        } | undefined;
        readonly level: {
            readonly default: 1 | 4 | 2 | 3 | 5 | 6;
            readonly values: readonly number[];
        };
        readonly backgroundColor: {
            default: "default";
        };
        readonly textColor: {
            default: "default";
        };
        readonly textAlignment: {
            default: "left";
            values: readonly ["left", "center", "right", "justify"];
        };
    }, "inline">;
    image: import('../../core/src').BlockSpec<"image", {
        readonly textAlignment: {
            default: "left";
            values: readonly ["left", "center", "right", "justify"];
        };
        readonly backgroundColor: {
            default: "default";
        };
        readonly name: {
            readonly default: "";
        };
        readonly url: {
            readonly default: "";
        };
        readonly caption: {
            readonly default: "";
        };
        readonly showPreview: {
            readonly default: true;
        };
        readonly previewWidth: {
            readonly default: undefined;
            readonly type: "number";
        };
    }, "none">;
    numberedListItem: import('../../core/src').BlockSpec<"numberedListItem", {
        readonly start: {
            readonly default: undefined;
            readonly type: "number";
        };
        readonly backgroundColor: {
            default: "default";
        };
        readonly textColor: {
            default: "default";
        };
        readonly textAlignment: {
            default: "left";
            values: readonly ["left", "center", "right", "justify"];
        };
    }, "inline">;
    paragraph: import('../../core/src').BlockSpec<"paragraph", {
        backgroundColor: {
            default: "default";
        };
        textColor: {
            default: "default";
        };
        textAlignment: {
            default: "left";
            values: readonly ["left", "center", "right", "justify"];
        };
    }, "inline">;
    quote: import('../../core/src').BlockSpec<"quote", {
        readonly backgroundColor: {
            default: "default";
        };
        readonly textColor: {
            default: "default";
        };
    }, "inline">;
    table: import('../../core/src').LooseBlockSpec<"table", {
        textColor: {
            default: "default";
        };
    }, "table">;
    toggleListItem: import('../../core/src').BlockSpec<"toggleListItem", {
        readonly backgroundColor: {
            default: "default";
        };
        readonly textColor: {
            default: "default";
        };
        readonly textAlignment: {
            default: "left";
            values: readonly ["left", "center", "right", "justify"];
        };
    }, "inline">;
    video: import('../../core/src').BlockSpec<"video", {
        textAlignment: {
            default: "left";
            values: readonly ["left", "center", "right", "justify"];
        };
        backgroundColor: {
            default: "default";
        };
        name: {
            default: "";
        };
        url: {
            default: "";
        };
        caption: {
            default: "";
        };
        showPreview: {
            default: boolean;
        };
        previewWidth: {
            default: undefined;
            type: "number";
        };
    }, "none">;
}>, import('../../core/src').InlineContentSchemaFromSpecs<{
    text: {
        config: "text";
        implementation: any;
    };
    link: {
        config: "link";
        implementation: any;
    };
}>, import('../../core/src').StyleSchemaFromSpecs<{
    bold: {
        config: {
            type: string;
            propSchema: "boolean";
        };
        implementation: import('../../core/src').StyleImplementation<{
            type: string;
            propSchema: "boolean";
        }>;
    };
    italic: {
        config: {
            type: string;
            propSchema: "boolean";
        };
        implementation: import('../../core/src').StyleImplementation<{
            type: string;
            propSchema: "boolean";
        }>;
    };
    underline: {
        config: {
            type: string;
            propSchema: "boolean";
        };
        implementation: import('../../core/src').StyleImplementation<{
            type: string;
            propSchema: "boolean";
        }>;
    };
    strike: {
        config: {
            type: string;
            propSchema: "boolean";
        };
        implementation: import('../../core/src').StyleImplementation<{
            type: string;
            propSchema: "boolean";
        }>;
    };
    code: {
        config: {
            type: string;
            propSchema: "boolean";
        };
        implementation: import('../../core/src').StyleImplementation<{
            type: string;
            propSchema: "boolean";
        }>;
    };
    textColor: import('../../core/src').StyleSpec<{
        readonly type: "textColor";
        readonly propSchema: "string";
    }>;
    backgroundColor: import('../../core/src').StyleSpec<{
        readonly type: "backgroundColor";
        readonly propSchema: "string";
    }>;
}>>;
export interface VanillaEditorOptions extends Partial<BlockNoteEditorOptions<any, any, any>> {
    element: HTMLElement | string;
    theme?: "light" | "dark";
    editable?: boolean;
    formattingToolbar?: boolean;
    slashMenu?: boolean;
    sideMenu?: boolean;
}
export interface VanillaEditorInstance {
    editor: BlockNoteEditor<any, any, any>;
    container: HTMLElement;
    setTheme: (theme: "light" | "dark") => void;
    getMarkdown: () => Promise<string>;
    getHTML: () => Promise<string>;
    getJSON: () => Block<any, any, any>[];
    destroy: () => void;
}
export declare function createBlockEditor(options: VanillaEditorOptions): Promise<VanillaEditorInstance>;
