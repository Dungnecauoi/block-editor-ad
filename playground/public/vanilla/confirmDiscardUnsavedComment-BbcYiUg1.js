import { aF as o, aL as d, aD as u, aH as a, aQ as l, aR as f, aS as C } from "./index-ZWtiU4Fg.js";
const S = (e) => {
  const [c, t] = o.useState(!1), s = d({
    editor: e.editor,
    selector: ({ editor: m }) => m.isEmpty
  }), n = u(), r = o.useCallback(() => {
    t(!0);
  }, []), i = o.useCallback(() => {
    t(!1);
  }, []);
  return o.useEffect(() => {
    e.editable && e.autoFocus && e.editor.focus();
  }, [e.autoFocus, e.editable, e.editor]), /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsx(
      n.Comments.Editor,
      {
        autoFocus: e.autoFocus,
        className: "bn-comment-editor",
        editor: e.editor,
        onFocus: r,
        onBlur: i,
        editable: e.editable
      }
    ),
    e.actions && /* @__PURE__ */ a.jsx("div", { className: "bn-comment-actions-wrapper", children: e.actions({ isFocused: c, isEmpty: s }) })
  ] });
}, {
  textColor: E,
  backgroundColor: F,
  ...b
} = f, h = l.create({
  blockSpecs: {
    paragraph: C()
  },
  styleSpecs: b
});
function k(e) {
  return !e.hasUnsavedContent || !e.confirmBeforeDiscard ? !0 : (e.confirm ?? ((t) => window.confirm(t)))(e.message);
}
export {
  S as C,
  k as c,
  h as d
};
