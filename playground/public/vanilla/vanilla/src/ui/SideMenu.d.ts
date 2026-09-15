import { BlockNoteEditor } from '../../../core/src';
export interface SideMenuOptions {
    container: HTMLElement;
    editor: BlockNoteEditor<any, any, any>;
}
export declare function createSideMenu(options: SideMenuOptions): {
    element: HTMLDivElement;
    destroy(): void;
};
