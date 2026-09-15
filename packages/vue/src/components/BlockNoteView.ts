import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  h,
  type PropType,
} from "vue";
import type { BlockNoteEditor } from "@blocknote/core";
import {
  createFloatingToolbar,
  createSlashMenu,
  createSideMenu,
} from "@blocknote/vanilla";

export interface BlockNoteViewProps {
  editor: BlockNoteEditor<any, any, any>;
  theme?: "light" | "dark";
  editable?: boolean;
  className?: string;
  formattingToolbar?: boolean;
  slashMenu?: boolean;
  sideMenu?: boolean;
}

export const BlockNoteView = defineComponent({
  name: "BlockNoteView",
  props: {
    editor: {
      type: Object as PropType<BlockNoteEditor<any, any, any>>,
      required: true,
    },
    theme: {
      type: String as PropType<"light" | "dark">,
      default: "light",
    },
    editable: {
      type: Boolean,
      default: true,
    },
    className: {
      type: String,
      default: "",
    },
    formattingToolbar: {
      type: Boolean,
      default: true,
    },
    slashMenu: {
      type: Boolean,
      default: true,
    },
    sideMenu: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["change", "selectionChange"],
  setup(props, { emit, expose }) {
    const containerRef = ref<HTMLDivElement | null>(null);
    const mountRef = ref<HTMLDivElement | null>(null);

    let floatingToolbar: ReturnType<typeof createFloatingToolbar> | undefined;
    let slashMenu: ReturnType<typeof createSlashMenu> | undefined;
    let sideMenu: ReturnType<typeof createSideMenu> | undefined;

    let unsubscribeChange: (() => void) | undefined;
    let unsubscribeSelection: (() => void) | undefined;

    onMounted(() => {
      if (!containerRef.value || !mountRef.value || !props.editor) return;

      // Mount core editor directly to DOM
      props.editor.mount(mountRef.value);

      // Attach pure UI components
      if (props.formattingToolbar !== false) {
        floatingToolbar = createFloatingToolbar({
          container: containerRef.value,
          editor: props.editor,
        });
      }

      if (props.slashMenu !== false) {
        slashMenu = createSlashMenu({
          container: containerRef.value,
          editor: props.editor,
        });
      }

      if (props.sideMenu !== false) {
        sideMenu = createSideMenu({
          container: containerRef.value,
          editor: props.editor,
        });
      }

      unsubscribeChange = props.editor.onChange(() => {
        emit("change", props.editor);
      });

      unsubscribeSelection = props.editor.onSelectionChange(() => {
        emit("selectionChange", props.editor);
      });
    });

    watch(
      () => props.theme,
      (newTheme) => {
        if (containerRef.value) {
          containerRef.value.setAttribute("data-theme", newTheme || "light");
        }
      }
    );

    onBeforeUnmount(() => {
      if (unsubscribeChange) unsubscribeChange();
      if (unsubscribeSelection) unsubscribeSelection();
      floatingToolbar?.destroy();
      slashMenu?.destroy();
      sideMenu?.destroy();
      props.editor.unmount();
    });

    expose({
      editor: props.editor,
      containerRef,
      async getMarkdown() {
        return await props.editor.blocksToMarkdownLossy(props.editor.document);
      },
      async getHTML() {
        return await props.editor.blocksToHTMLLossy(props.editor.document);
      },
      getJSON() {
        return props.editor.document;
      },
    });

    return function render() {
      return h(
        "div",
        {
          ref: containerRef,
          class: ["bn-vanilla-root", props.className].filter(Boolean).join(" "),
          "data-theme": props.theme || "light",
          style: { width: "100%", position: "relative" },
        },
        [
          h("div", {
            ref: mountRef,
            class: "bn-editor-mount",
          }),
        ]
      );
    };
  },
});

export default BlockNoteView;
