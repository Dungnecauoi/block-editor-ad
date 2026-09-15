import { BlockNoteEditor, BlockNoteEditorOptions, CustomBlockNoteSchema, DefaultBlockSchema, DefaultInlineContentSchema, DefaultStyleSchema } from '../../../core/src';
import { ShallowRef } from 'vue';
export type BlockNoteEditorType<Options> = Options extends {
    schema: CustomBlockNoteSchema<infer BSchema, infer ISchema, infer SSchema>;
} ? BlockNoteEditor<BSchema, ISchema, SSchema> : BlockNoteEditor<DefaultBlockSchema, DefaultInlineContentSchema, DefaultStyleSchema>;
/**
 * Vue 3 Composable to instantiate a BlockNote Editor instance.
 * Uses shallowRef to avoid deep reactive wrapping which interferes with ProseMirror's state machine.
 */
export declare function useCreateBlockNote<Options extends Partial<BlockNoteEditorOptions<any, any, any>> | undefined>(options?: Options): ShallowRef<BlockNoteEditorType<Options>>;
