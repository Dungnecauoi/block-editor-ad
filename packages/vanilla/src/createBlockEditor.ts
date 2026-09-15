import {
  BlockNoteEditor,
  BlockNoteEditorOptions,
  Block,
  BlockNoteSchema,
  defaultBlockSpecs,
} from "@blocknote/core";
import { syntaxHighlighter } from "@blocknote/code-block";
import {
  ColumnBlock,
  ColumnListBlock,
  multiColumnDropCursor,
} from "@blocknote/xl-multi-column";
import { createFloatingToolbar } from "./ui/FloatingToolbar.js";
import { createSlashMenu } from "./ui/SlashMenu.js";
import { createSideMenu } from "./ui/SideMenu.js";

import "./styles/vanilla.css";

export const defaultFullSchema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    column: ColumnBlock,
    columnList: ColumnListBlock,
  },
});

export interface VanillaEditorOptions
  extends Partial<BlockNoteEditorOptions<any, any, any>> {
  element: HTMLElement | string;
  theme?: "light" | "dark";
  editable?: boolean;
  formattingToolbar?: boolean;
  slashMenu?: boolean;
  sideMenu?: boolean;
  schema?: any;
  dropCursor?: any;
  initialContent?: any;
  extensions?: any[];
}

export interface VanillaEditorInstance {
  editor: BlockNoteEditor<any, any, any>;
  container: HTMLElement;
  setTheme: (theme: "light" | "dark") => void;
  getMarkdown: () => Promise<string>;
  getHTML: () => Promise<string>;
  getJSON: () => Block<any, any, any>[];
  destroy: () => void;
}

export function createBlockEditor(
  options: VanillaEditorOptions,
): Promise<VanillaEditorInstance> {
  const targetElement =
    typeof options.element === "string"
      ? document.querySelector<HTMLElement>(options.element)
      : options.element;

  if (!targetElement) {
    const elName = typeof options.element === "string" ? options.element : "HTMLElement";
    return Promise.reject(new Error(`Element not found: ${elName}`));
  }

  // Create container wrapper
  const container = document.createElement("div");
  container.className = "bn-vanilla-root";
  const theme = options.theme || "light";
  container.setAttribute("data-theme", theme);
  targetElement.appendChild(container);

  // Mount point for core editor
  const editorMountPoint = document.createElement("div");
  editorMountPoint.className = "bn-editor-mount";
  container.appendChild(editorMountPoint);

  // Initialize Core Editor
  const extensions = [
    syntaxHighlighter,
    ...(options.extensions || []),
  ];

  const editor = BlockNoteEditor.create({
    schema: options.schema || defaultFullSchema,
    dropCursor: options.dropCursor || multiColumnDropCursor,
    initialContent: options.initialContent,
    extensions,
    ...options,
  });

  // Mount editor to DOM element
  editor.mount(editorMountPoint);

  // UI components
  let floatingToolbar: ReturnType<typeof createFloatingToolbar> | undefined;
  if (options.formattingToolbar !== false) {
    floatingToolbar = createFloatingToolbar({ container, editor });
  }

  let slashMenu: ReturnType<typeof createSlashMenu> | undefined;
  if (options.slashMenu !== false) {
    slashMenu = createSlashMenu({ container, editor });
  }

  let sideMenu: ReturnType<typeof createSideMenu> | undefined;
  if (options.sideMenu !== false) {
    sideMenu = createSideMenu({ container, editor });
  }

  const instance: VanillaEditorInstance = {
    editor,
    container,
    setTheme(newTheme: "light" | "dark") {
      container.setAttribute("data-theme", newTheme);
    },
    async getMarkdown() {
      return await editor.blocksToMarkdownLossy(editor.document);
    },
    async getHTML() {
      return await editor.blocksToHTMLLossy(editor.document);
    },
    getJSON() {
      return editor.document;
    },
    destroy() {
      floatingToolbar?.destroy();
      slashMenu?.destroy();
      sideMenu?.destroy();
      editor.unmount();
      container.remove();
    },
  };

  return Promise.resolve(instance);
}
