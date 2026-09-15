import { BlockNoteEditor } from '../../../core/src';
export interface BlockNoteViewProps {
    editor: BlockNoteEditor<any, any, any>;
    theme?: "light" | "dark";
    editable?: boolean;
    className?: string;
    formattingToolbar?: boolean;
    slashMenu?: boolean;
    sideMenu?: boolean;
    linkToolbar?: boolean;
    tableHandles?: boolean;
    filePanel?: boolean;
    emojiPicker?: boolean;
}
declare const _default: import('vue').DefineComponent<BlockNoteViewProps, {
    editor: BlockNoteEditor<any, any, any>;
    containerRef: import('vue').Ref<HTMLDivElement | null, HTMLDivElement | null>;
    getMarkdown(): Promise<string>;
    getHTML(): Promise<string>;
    getJSON(): import('../../../core/src').Block<any, any, any>[];
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    change: (editor: BlockNoteEditor<any, any, any>) => any;
    selectionChange: (editor: BlockNoteEditor<any, any, any>) => any;
}, string, import('vue').PublicProps, Readonly<BlockNoteViewProps> & Readonly<{
    onChange?: ((editor: BlockNoteEditor<any, any, any>) => any) | undefined;
    onSelectionChange?: ((editor: BlockNoteEditor<any, any, any>) => any) | undefined;
}>, {
    filePanel: boolean;
    formattingToolbar: boolean;
    linkToolbar: boolean;
    editable: boolean;
    sideMenu: boolean;
    theme: "light" | "dark";
    tableHandles: boolean;
    className: string;
    slashMenu: boolean;
    emojiPicker: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    containerRef: HTMLDivElement;
}, HTMLDivElement>;
export default _default;
