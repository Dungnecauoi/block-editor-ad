import { defineComponent as g, ref as s, onMounted as b, watch as v, onBeforeUnmount as u, h as m, shallowRef as y, watchEffect as h } from "vue";
import { createFloatingToolbar as w, createSlashMenu as C, createSideMenu as B } from "@blocknote/vanilla";
import { BlockNoteEditor as M } from "@blocknote/core";
export * from "@blocknote/core";
const T = g({
  name: "BlockNoteView",
  props: {
    editor: {
      type: Object,
      required: !0
    },
    theme: {
      type: String,
      default: "light"
    },
    editable: {
      type: Boolean,
      default: !0
    },
    className: {
      type: String,
      default: ""
    },
    formattingToolbar: {
      type: Boolean,
      default: !0
    },
    slashMenu: {
      type: Boolean,
      default: !0
    },
    sideMenu: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["change", "selectionChange"],
  setup(e, { emit: t, expose: n }) {
    const o = s(null), i = s(null);
    let a, l, r, c, d;
    return b(() => {
      !o.value || !i.value || !e.editor || (e.editor.mount(i.value), e.formattingToolbar !== !1 && (a = w({
        container: o.value,
        editor: e.editor
      })), e.slashMenu !== !1 && (l = C({
        container: o.value,
        editor: e.editor
      })), e.sideMenu !== !1 && (r = B({
        container: o.value,
        editor: e.editor
      })), c = e.editor.onChange(() => {
        t("change", e.editor);
      }), d = e.editor.onSelectionChange(() => {
        t("selectionChange", e.editor);
      }));
    }), v(
      () => e.theme,
      (f) => {
        o.value && o.value.setAttribute("data-theme", f || "light");
      }
    ), u(() => {
      c && c(), d && d(), a == null || a.destroy(), l == null || l.destroy(), r == null || r.destroy(), e.editor.unmount();
    }), n({
      editor: e.editor,
      containerRef: o,
      async getMarkdown() {
        return await e.editor.blocksToMarkdownLossy(e.editor.document);
      },
      async getHTML() {
        return await e.editor.blocksToHTMLLossy(e.editor.document);
      },
      getJSON() {
        return e.editor.document;
      }
    }), function() {
      return m(
        "div",
        {
          ref: o,
          class: ["bn-vanilla-root", e.className].filter(Boolean).join(" "),
          "data-theme": e.theme || "light",
          style: { width: "100%", position: "relative" }
        },
        [
          m("div", {
            ref: i,
            class: "bn-editor-mount"
          })
        ]
      );
    };
  }
});
function E(e = {}) {
  const t = y(M.create(e));
  return typeof window < "u" && (window.ProseMirror = t.value._tiptapEditor), u(() => {
    var n;
    (n = t.value) == null || n.unmount();
  }), t;
}
function j(e, t) {
  let n;
  h((o) => {
    const i = typeof t == "object" && "value" in t ? t.value : t;
    i && (n = i.onChange(e), o(() => {
      n && n();
    }));
  }), u(() => {
    n && n();
  });
}
function L(e, t) {
  let n;
  h((o) => {
    const i = typeof t == "object" && "value" in t ? t.value : t;
    i && (n = i.onSelectionChange(e), o(() => {
      n && n();
    }));
  }), u(() => {
    n && n();
  });
}
export {
  T as BlockNoteView,
  T as BlockNoteViewComponent,
  E as useCreateBlockNote,
  j as useEditorChange,
  L as useEditorSelectionChange
};
