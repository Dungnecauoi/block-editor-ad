import { aA as u, aB as f, aC as d, aD as b, aE as g, aF as p, aG as E, aH as m, aI as h, aJ as S, aK as v, aL as O, aM as j, aN as P, aO as y, aP as B } from "./index-ZWtiU4Fg.js";
import { C as D, d as F, c as I } from "./confirmDiscardUnsavedComment-BbcYiUg1.js";
const U = p.memo(
  ({ isEmpty: e, onSave: n, Components: o, dict: t }) => /* @__PURE__ */ m.jsx(
    o.Generic.Toolbar.Root,
    {
      className: h("bn-action-toolbar", "bn-comment-actions"),
      variant: "action-toolbar",
      children: /* @__PURE__ */ m.jsx(
        o.Generic.Toolbar.Button,
        {
          className: "bn-button",
          mainTooltip: t.comments.save_button_text,
          variant: "compact",
          isDisabled: e,
          onClick: n,
          children: t.comments.save_button_text
        }
      )
    }
  )
);
function _(e) {
  const n = u(), o = e.newCommentEditor, t = f(d), s = b(), c = g(), r = p.useCallback(async () => {
    await t.createThread({
      initialComment: {
        body: o.document
      }
    }), t.stopPendingComment(), n.transact((a) => {
      a.setSelection(E.create(a.doc, a.selection.to));
    }), n.focus();
  }, [t, o, n]);
  return /* @__PURE__ */ m.jsx(s.Comments.Card, { className: "bn-thread", children: /* @__PURE__ */ m.jsx(
    D,
    {
      autoFocus: !0,
      editable: !0,
      editor: o,
      actions: ({ isFocused: a, isEmpty: l }) => /* @__PURE__ */ m.jsx(
        U,
        {
          isFocused: a,
          isEmpty: l,
          onSave: r,
          Components: s,
          dict: c
        }
      )
    }
  ) });
}
function k(e) {
  const n = u(), o = g(), t = f(d), s = S(d, {
    editor: n,
    selector: (i) => i.pendingComment
  }), c = v(
    {
      trailingBlock: !1,
      dictionary: {
        ...o,
        placeholders: {
          emptyDocument: o.placeholders.new_comment
        }
      },
      schema: t.commentEditorSchema || F
    },
    [s]
  ), r = O({
    editor: n,
    selector: ({ editor: i }) => s ? {
      from: i.prosemirrorState.selection.from,
      to: i.prosemirrorState.selection.to
    } : void 0
  }), a = p.useMemo(
    () => {
      var i, C;
      return {
        ...e.floatingUIOptions,
        useFloatingOptions: {
          open: !!s,
          // Needed as hooks like `useDismiss` call `onOpenChange` to change the
          // open state.
          onOpenChange: (x) => {
            if (!x) {
              if (!I({
                hasUnsavedContent: !c.isEmpty,
                confirmBeforeDiscard: t.confirmBeforeDiscard,
                message: o.comments.discard_pending_comment
              }))
                return;
              t.stopPendingComment(), n.focus();
            }
          },
          placement: "bottom",
          middleware: [j(10), P(), y()],
          ...(i = e.floatingUIOptions) == null ? void 0 : i.useFloatingOptions
        },
        focusManagerProps: {
          disabled: !1
        },
        elementProps: {
          style: {
            zIndex: 60
          },
          ...(C = e.floatingUIOptions) == null ? void 0 : C.elementProps
        }
      };
    },
    [
      t,
      o,
      n,
      c,
      s,
      e.floatingUIOptions
    ]
  ), l = e.floatingComposer || _;
  return /* @__PURE__ */ m.jsx(
    B,
    {
      position: r,
      portalElement: e.portalElement,
      ...a,
      children: /* @__PURE__ */ m.jsx(l, { newCommentEditor: c })
    }
  );
}
export {
  k as default
};
