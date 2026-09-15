import { BlockNoteEditor } from '../../../core/src';
export interface SlashMenuOptions {
    container: HTMLElement;
    editor: BlockNoteEditor<any, any, any>;
}
export interface MenuItem {
    title: string;
    subtext: string;
    icon: string;
    keywords: string[];
    action: (editor: BlockNoteEditor<any, any, any>) => void;
}
export declare function createSlashMenu(options: SlashMenuOptions): {
    element: HTMLDivElement;
    destroy(): void;
};
