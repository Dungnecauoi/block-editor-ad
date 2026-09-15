import { PropType } from 'vue';
import { BlockNoteEditor } from '../../../core/src';
export interface BlockNoteViewProps {
    editor: BlockNoteEditor<any, any, any>;
    theme?: "light" | "dark";
    editable?: boolean;
    className?: string;
    formattingToolbar?: boolean;
    slashMenu?: boolean;
    sideMenu?: boolean;
}
export declare const BlockNoteView: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    editor: {
        type: PropType<BlockNoteEditor<any, any, any>>;
        required: true;
    };
    theme: {
        type: PropType<"light" | "dark">;
        default: string;
    };
    editable: {
        type: BooleanConstructor;
        default: boolean;
    };
    className: {
        type: StringConstructor;
        default: string;
    };
    formattingToolbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    slashMenu: {
        type: BooleanConstructor;
        default: boolean;
    };
    sideMenu: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("change" | "selectionChange")[], "change" | "selectionChange", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    editor: {
        type: PropType<BlockNoteEditor<any, any, any>>;
        required: true;
    };
    theme: {
        type: PropType<"light" | "dark">;
        default: string;
    };
    editable: {
        type: BooleanConstructor;
        default: boolean;
    };
    className: {
        type: StringConstructor;
        default: string;
    };
    formattingToolbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    slashMenu: {
        type: BooleanConstructor;
        default: boolean;
    };
    sideMenu: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    onSelectionChange?: ((...args: any[]) => any) | undefined;
}>, {
    formattingToolbar: boolean;
    editable: boolean;
    sideMenu: boolean;
    theme: "light" | "dark";
    className: string;
    slashMenu: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default BlockNoteView;
