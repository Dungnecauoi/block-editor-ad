import { BlockNoteEditor } from "@blocknote/core";
import { en } from "./locales/en.js";

export function getMultiColumnDictionary(
  editor: BlockNoteEditor<any, any, any>,
): MultiColumnDictionary {
  return (
    ((editor.dictionary as any).multi_column as MultiColumnDictionary | undefined) ?? en
  );
}

export type MultiColumnDictionary = typeof en;
