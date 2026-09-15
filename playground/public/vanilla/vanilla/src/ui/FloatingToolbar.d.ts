import { BlockNoteEditor } from '../../../core/src';
export interface FloatingToolbarOptions {
    container: HTMLElement;
    editor: BlockNoteEditor<any, any, any>;
}
export declare function createFloatingToolbar(options: FloatingToolbarOptions): {
    element: HTMLDivElement;
    destroy(): void;
};
