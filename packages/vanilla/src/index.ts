import { createBlockEditor } from "./createBlockEditor.js";
import { BlockNoteEditor } from "@blocknote/core";

export { createBlockEditor } from "./createBlockEditor.js";
export type { VanillaEditorOptions, VanillaEditorInstance } from "./createBlockEditor.js";
export { createFloatingToolbar } from "./ui/FloatingToolbar.js";
export { createSlashMenu } from "./ui/SlashMenu.js";
export { createSideMenu } from "./ui/SideMenu.js";
export * from "@blocknote/core";

// Auto-register on window.BlockNote for CDN script tag users
if (typeof window !== "undefined") {
  (window as any).BlockNote = {
    create: createBlockEditor,
    BlockNoteEditor,
  };
}
