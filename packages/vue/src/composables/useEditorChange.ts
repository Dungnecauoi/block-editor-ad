import type { BlockNoteEditor } from "@blocknote/core";
import { onBeforeUnmount, watchEffect, type MaybeRef } from "vue";

/**
 * Subscribes to editor content changes in Vue 3.
 * Automatically unregisters when the component unmounts.
 */
export function useEditorChange(
  callback: Parameters<BlockNoteEditor<any, any, any>["onChange"]>[0],
  editor: MaybeRef<BlockNoteEditor<any, any, any> | undefined>,
) {
  let unsubscribe: (() => void) | undefined;

  watchEffect((onCleanup) => {
    const editorInstance = typeof editor === "object" && "value" in editor ? editor.value : editor;
    if (editorInstance) {
      unsubscribe = editorInstance.onChange(callback);
      onCleanup(() => {
        if (unsubscribe) unsubscribe();
      });
    }
  });

  onBeforeUnmount(() => {
    if (unsubscribe) unsubscribe();
  });
}

/**
 * Subscribes to editor selection changes in Vue 3.
 */
export function useEditorSelectionChange(
  callback: Parameters<BlockNoteEditor<any, any, any>["onSelectionChange"]>[0],
  editor: MaybeRef<BlockNoteEditor<any, any, any> | undefined>,
) {
  let unsubscribe: (() => void) | undefined;

  watchEffect((onCleanup) => {
    const editorInstance = typeof editor === "object" && "value" in editor ? editor.value : editor;
    if (editorInstance) {
      unsubscribe = editorInstance.onSelectionChange(callback);
      onCleanup(() => {
        if (unsubscribe) unsubscribe();
      });
    }
  });

  onBeforeUnmount(() => {
    if (unsubscribe) unsubscribe();
  });
}
