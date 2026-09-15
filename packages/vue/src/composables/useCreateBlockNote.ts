import {
  BlockNoteEditor,
  BlockNoteEditorOptions,
  CustomBlockNoteSchema,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
} from "@blocknote/core";
import { onBeforeUnmount, shallowRef, type ShallowRef } from "vue";

export type BlockNoteEditorType<Options> = Options extends {
  schema: CustomBlockNoteSchema<infer BSchema, infer ISchema, infer SSchema>;
}
  ? BlockNoteEditor<BSchema, ISchema, SSchema>
  : BlockNoteEditor<
      DefaultBlockSchema,
      DefaultInlineContentSchema,
      DefaultStyleSchema
    >;

/**
 * Vue 3 Composable to instantiate a BlockNote Editor instance.
 * Uses shallowRef to avoid deep reactive wrapping which interferes with ProseMirror's state machine.
 */
export function useCreateBlockNote<
  Options extends Partial<BlockNoteEditorOptions<any, any, any>> | undefined,
>(
  options: Options = {} as Options,
): ShallowRef<BlockNoteEditorType<Options>> {
  const editor = shallowRef<any>(BlockNoteEditor.create(options as any));

  if (typeof window !== "undefined") {
    (window as any).ProseMirror = editor.value._tiptapEditor;
  }

  onBeforeUnmount(() => {
    // Unmount and cleanup editor if container still exists
    editor.value?.unmount();
  });

  return editor;
}
