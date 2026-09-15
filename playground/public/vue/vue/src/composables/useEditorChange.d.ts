import { BlockNoteEditor } from '../../../core/src';
import { MaybeRef } from 'vue';
/**
 * Subscribes to editor content changes in Vue 3.
 * Automatically unregisters when the component unmounts.
 */
export declare function useEditorChange(callback: Parameters<BlockNoteEditor<any, any, any>["onChange"]>[0], editor: MaybeRef<BlockNoteEditor<any, any, any> | undefined>): void;
/**
 * Subscribes to editor selection changes in Vue 3.
 */
export declare function useEditorSelectionChange(callback: Parameters<BlockNoteEditor<any, any, any>["onSelectionChange"]>[0], editor: MaybeRef<BlockNoteEditor<any, any, any> | undefined>): void;
