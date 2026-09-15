import { aF as m, bt as L, aD as g, bu as $, aH as o, aB as j, aC as p, bv as J, aE as y, aI as C, aK as T, bw as G, bx as K, by as H, bz as q, bA as Q, bB as V, aA as W, aJ as X, aM as Y, aN as Z, aO as ee, aP as te } from "./index-ZWtiU4Fg.js";
import { d as k, C as P, c as oe } from "./confirmDiscardUnsavedComment-BbcYiUg1.js";
let S;
async function ne() {
  return S || (S = (async () => {
    const [e, t] = await Promise.all([
      import("./module-_aKf_I-D.js"),
      // use a dynamic import to encourage bundle-splitting
      // and a smaller initial client bundle size
      import("./native-CDi4YD_s.js")
    ]), s = "default" in e ? e.default : e, a = "default" in t ? t.default : t;
    return await s.init({ data: a }), { emojiMart: s, emojiData: a };
  })(), S);
}
function se(e) {
  const t = m.useRef(null), s = m.useRef(null);
  return s.current && s.current.update(e), m.useEffect(() => ((async () => {
    const { emojiMart: a } = await ne();
    s.current = new a.Picker({ ...e, ref: t });
  })(), () => {
    s.current = null;
  }), []), L.createElement("div", { ref: t });
}
const D = (e) => {
  var i;
  const [t, s] = m.useState(!1), a = g(), n = $(), r = (i = n.editor) == null ? void 0 : i.portalElement;
  if (!r)
    throw new Error("Portal root not found");
  return /* @__PURE__ */ o.jsxs(a.Generic.Popover.Root, { open: t, portalRoot: r, children: [
    /* @__PURE__ */ o.jsx(a.Generic.Popover.Trigger, { children: /* @__PURE__ */ o.jsx(
      "div",
      {
        onClick: (l) => {
          var d;
          l.preventDefault(), l.stopPropagation(), s(!t), (d = e.onOpenChange) == null || d.call(e, !t);
        },
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        },
        children: e.children
      }
    ) }),
    /* @__PURE__ */ o.jsx(
      a.Generic.Popover.Content,
      {
        className: "bn-emoji-picker-popover",
        variant: "panel-popover",
        children: /* @__PURE__ */ o.jsx(
          se,
          {
            perLine: 7,
            onClickOutside: () => {
              var l;
              s(!1), (l = e.onOpenChange) == null || l.call(e, !1);
            },
            onEmojiSelect: (l) => {
              var d;
              e.onEmojiSelect(l), s(!1), (d = e.onOpenChange) == null || d.call(e, !1);
            },
            theme: n == null ? void 0 : n.colorSchemePreference
          }
        )
      }
    )
  ] });
};
function w(e) {
  const { userStore: t } = j(p), s = e.join(",");
  return m.useEffect(() => {
    t.loadUsers(e);
  }, [t, s]), J(t.store, (a) => {
    const n = /* @__PURE__ */ new Map();
    for (const r of e) {
      const i = a.get(r);
      i && n.set(r, i);
    }
    return n;
  });
}
function ae(e) {
  return w([e]).get(e);
}
const ie = (e) => {
  const t = g(), s = y(), a = j(p), n = e.comment.reactions.find(
    (d) => d.emoji === e.emoji
  );
  if (!n)
    throw new Error(
      "Trying to render reaction badge for non-existing reaction"
    );
  const [r, i] = m.useState([]), l = w(r);
  return /* @__PURE__ */ o.jsx(
    t.Generic.Badge.Root,
    {
      className: C("bn-badge", "bn-comment-reaction"),
      text: n.userIds.length.toString(),
      icon: n.emoji,
      isSelected: a.threadStore.auth.canDeleteReaction(
        e.comment,
        n.emoji
      ),
      onClick: () => e.onReactionSelect(n.emoji),
      onMouseEnter: () => i(n.userIds),
      mainTooltip: s.comments.reactions.reacted_by,
      secondaryTooltip: `${Array.from(l.values()).map((d) => d.username).join(`
`)}`
    },
    n.emoji
  );
}, ce = m.memo(
  ({
    isEmpty: e,
    comment: t,
    isEditing: s,
    threadStore: a,
    onReactionSelect: n,
    onEditSubmit: r,
    onEditCancel: i,
    onEmojiPickerOpenChange: l,
    Components: d,
    dict: h
  }) => {
    const u = a.auth.canAddReaction(t);
    return /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
      t.reactions.length > 0 && !s && /* @__PURE__ */ o.jsxs(
        d.Generic.Badge.Group,
        {
          className: C(
            "bn-badge-group",
            "bn-comment-reactions"
          ),
          children: [
            t.reactions.map((c) => /* @__PURE__ */ o.jsx(
              ie,
              {
                comment: t,
                emoji: c.emoji,
                onReactionSelect: n
              },
              c.emoji
            )),
            u && /* @__PURE__ */ o.jsx(
              D,
              {
                onEmojiSelect: (c) => n(c.native),
                onOpenChange: l,
                children: /* @__PURE__ */ o.jsx(
                  d.Generic.Badge.Root,
                  {
                    className: C(
                      "bn-badge",
                      "bn-comment-add-reaction"
                    ),
                    text: "+",
                    icon: /* @__PURE__ */ o.jsx(G, { size: 16 }),
                    mainTooltip: h.comments.actions.add_reaction
                  }
                )
              }
            )
          ]
        }
      ),
      s && /* @__PURE__ */ o.jsxs(
        d.Generic.Toolbar.Root,
        {
          variant: "action-toolbar",
          className: C(
            "bn-action-toolbar",
            "bn-comment-actions"
          ),
          children: [
            /* @__PURE__ */ o.jsx(
              d.Generic.Toolbar.Button,
              {
                mainTooltip: h.comments.save_button_text,
                variant: "compact",
                onClick: r,
                isDisabled: e,
                children: h.comments.save_button_text
              }
            ),
            /* @__PURE__ */ o.jsx(
              d.Generic.Toolbar.Button,
              {
                className: "bn-button",
                mainTooltip: h.comments.cancel_button_text,
                variant: "compact",
                onClick: i,
                children: h.comments.cancel_button_text
              }
            )
          ]
        }
      )
    ] });
  }
), re = ({
  comment: e,
  thread: t,
  showResolveButton: s
}) => {
  const a = j(p), n = y(), r = T({
    initialContent: e.body,
    trailingBlock: !1,
    dictionary: {
      ...n,
      placeholders: {
        emptyDocument: n.placeholders.edit_comment
      }
    },
    schema: a.commentEditorSchema || k
  }), i = g(), [l, d] = m.useState(!1), [h, u] = m.useState(!1), c = a.threadStore, x = m.useCallback(() => {
    d(!0);
  }, []), b = m.useCallback(() => {
    r.replaceBlocks(r.document, e.body), d(!1);
  }, [r, e.body]), E = m.useCallback(
    async (f) => {
      await c.updateComment({
        commentId: e.id,
        comment: {
          body: r.document
        },
        threadId: t.id
      }), d(!1);
    },
    [e, t.id, r, c]
  ), v = m.useCallback(async () => {
    await c.deleteComment({
      commentId: e.id,
      threadId: t.id
    });
  }, [e, t.id, c]), R = m.useCallback(
    async (f) => {
      c.auth.canAddReaction(e, f) ? await c.addReaction({
        threadId: t.id,
        commentId: e.id,
        emoji: f
      }) : c.auth.canDeleteReaction(e, f) && await c.deleteReaction({
        threadId: t.id,
        commentId: e.id,
        emoji: f
      });
    },
    [c, e, t.id]
  ), N = m.useCallback(async () => {
    await c.resolveThread({
      threadId: t.id
    });
  }, [t.id, c]), O = m.useCallback(async () => {
    await c.unresolveThread({
      threadId: t.id
    });
  }, [t.id, c]), A = ae(e.userId);
  if (!e.body)
    return null;
  let B;
  const U = c.auth.canAddReaction(e), I = c.auth.canDeleteComment(e), _ = c.auth.canUpdateComment(e), M = s && (t.resolved ? c.auth.canUnresolveThread(t) : c.auth.canResolveThread(t));
  l || (B = /* @__PURE__ */ o.jsxs(
    i.Generic.Toolbar.Root,
    {
      className: C("bn-action-toolbar", "bn-comment-actions"),
      variant: "action-toolbar",
      children: [
        U && /* @__PURE__ */ o.jsx(
          D,
          {
            onEmojiSelect: (f) => R(f.native),
            onOpenChange: u,
            children: /* @__PURE__ */ o.jsx(
              i.Generic.Toolbar.Button,
              {
                mainTooltip: n.comments.actions.add_reaction,
                variant: "compact",
                children: /* @__PURE__ */ o.jsx(G, { size: 16 })
              },
              "add-reaction"
            )
          }
        ),
        M && (t.resolved ? /* @__PURE__ */ o.jsx(
          i.Generic.Toolbar.Button,
          {
            mainTooltip: n.comments.actions.reopen,
            variant: "compact",
            onClick: O,
            children: /* @__PURE__ */ o.jsx(K, { size: 16 })
          },
          "reopen"
        ) : /* @__PURE__ */ o.jsx(
          i.Generic.Toolbar.Button,
          {
            mainTooltip: n.comments.actions.resolve,
            variant: "compact",
            onClick: N,
            children: /* @__PURE__ */ o.jsx(H, { size: 16 })
          },
          "resolve"
        )),
        (I || _) && /* @__PURE__ */ o.jsxs(i.Generic.Menu.Root, { position: "bottom-start", children: [
          /* @__PURE__ */ o.jsx(i.Generic.Menu.Trigger, { children: /* @__PURE__ */ o.jsx(
            i.Generic.Toolbar.Button,
            {
              mainTooltip: n.comments.actions.more_actions,
              variant: "compact",
              children: /* @__PURE__ */ o.jsx(q, { size: 16 })
            },
            "more-actions"
          ) }),
          /* @__PURE__ */ o.jsxs(i.Generic.Menu.Dropdown, { className: "bn-menu-dropdown", children: [
            _ && /* @__PURE__ */ o.jsx(
              i.Generic.Menu.Item,
              {
                icon: /* @__PURE__ */ o.jsx(Q, {}),
                onClick: x,
                children: n.comments.actions.edit_comment
              },
              "edit-comment"
            ),
            I && /* @__PURE__ */ o.jsx(
              i.Generic.Menu.Item,
              {
                icon: /* @__PURE__ */ o.jsx(V, {}),
                onClick: v,
                children: n.comments.actions.delete_comment
              },
              "delete-comment"
            )
          ] })
        ] })
      ]
    }
  ));
  const F = e.createdAt.toLocaleDateString(void 0, {
    month: "short",
    day: "numeric"
  });
  if (!e.body)
    throw new Error("soft deletes are not yet supported");
  return /* @__PURE__ */ o.jsx(
    i.Comments.Comment,
    {
      authorInfo: A ?? "loading",
      timeString: F,
      edited: e.updatedAt.getTime() !== e.createdAt.getTime(),
      showActions: "hover",
      actions: B,
      className: "bn-thread-comment",
      emojiPickerOpen: h,
      children: /* @__PURE__ */ o.jsx(
        P,
        {
          autoFocus: l,
          editor: r,
          editable: l,
          actions: e.reactions.length > 0 || l ? ({ isFocused: f, isEmpty: z }) => /* @__PURE__ */ o.jsx(
            ce,
            {
              isFocused: f,
              isEmpty: z,
              comment: e,
              isEditing: l,
              threadStore: c,
              onReactionSelect: R,
              onEditSubmit: E,
              onEditCancel: b,
              onEmojiPickerOpenChange: u,
              Components: i,
              dict: n
            }
          ) : void 0
        }
      )
    }
  );
}, le = ({
  thread: e,
  maxCommentsBeforeCollapse: t
}) => {
  const s = g(), a = y(), n = w(e.resolvedBy ? [e.resolvedBy] : []), r = e.comments.map((i, l) => /* @__PURE__ */ o.jsx(
    re,
    {
      thread: e,
      comment: i,
      showResolveButton: l === 0
    },
    i.id + JSON.stringify(i.body || "{}")
  ));
  if (e.resolved && e.resolvedUpdatedAt && e.resolvedBy) {
    if (!n.get(e.resolvedBy))
      throw new Error(
        `User ${e.resolvedBy} resolved thread ${e.id}, but their data could not be found.`
      );
    const l = e.comments.findLastIndex(
      (d) => e.resolvedUpdatedAt.getTime() > d.createdAt.getTime()
    ) + 1;
    r.splice(
      l,
      0,
      /* @__PURE__ */ o.jsx(
        s.Comments.Comment,
        {
          className: "bn-thread-comment",
          authorInfo: e.resolvedBy && n.get(e.resolvedBy) || "loading",
          timeString: e.resolvedUpdatedAt.toLocaleDateString(void 0, {
            month: "short",
            day: "numeric"
          }),
          edited: !1,
          showActions: !1,
          children: /* @__PURE__ */ o.jsx("div", { className: "bn-resolved-text", children: a.comments.sidebar.marked_as_resolved })
        },
        "resolved-comment"
      )
    );
  }
  return t && r.length > t && r.splice(
    1,
    r.length - 2,
    /* @__PURE__ */ o.jsx(
      s.Comments.ExpandSectionsPrompt,
      {
        className: "bn-thread-expand-prompt",
        children: a.comments.sidebar.more_replies(e.comments.length - 2)
      },
      "expand-prompt"
    )
  ), r;
}, de = m.memo(
  ({ isEmpty: e, onNewCommentSave: t, Components: s, dict: a }) => e ? null : /* @__PURE__ */ o.jsx(
    s.Generic.Toolbar.Root,
    {
      variant: "action-toolbar",
      className: C("bn-action-toolbar", "bn-comment-actions"),
      children: /* @__PURE__ */ o.jsx(
        s.Generic.Toolbar.Button,
        {
          mainTooltip: a.comments.save_button_text,
          variant: "compact",
          isDisabled: e,
          onClick: t,
          children: a.comments.save_button_text
        }
      )
    }
  )
), me = ({
  thread: e,
  selected: t,
  orphaned: s,
  referenceText: a,
  maxCommentsBeforeCollapse: n,
  onFocus: r,
  onBlur: i,
  tabIndex: l,
  newCommentEditor: d
}) => {
  const h = g(), u = y(), c = j(p), x = T({
    trailingBlock: !1,
    dictionary: {
      ...u,
      placeholders: {
        emptyDocument: u.placeholders.comment_reply
      }
    },
    schema: c.commentEditorSchema || k
  }), b = d ?? x, E = m.useCallback(async () => {
    await c.threadStore.addComment({
      comment: {
        body: b.document
      },
      threadId: e.id
    }), b.removeBlocks(b.document);
  }, [c, b, e.id]);
  return /* @__PURE__ */ o.jsxs(
    h.Comments.Card,
    {
      className: C("bn-thread", s && "bn-thread-orphaned"),
      headerText: a,
      onFocus: r,
      onBlur: i,
      selected: t,
      tabIndex: l,
      children: [
        /* @__PURE__ */ o.jsx(h.Comments.CardSection, { className: "bn-thread-comments", children: /* @__PURE__ */ o.jsx(
          le,
          {
            thread: e,
            maxCommentsBeforeCollapse: t ? void 0 : n || 5
          }
        ) }),
        t && /* @__PURE__ */ o.jsx(h.Comments.CardSection, { className: "bn-thread-composer", children: /* @__PURE__ */ o.jsx(
          P,
          {
            autoFocus: !1,
            editable: !0,
            editor: b,
            actions: ({ isFocused: v, isEmpty: R }) => /* @__PURE__ */ o.jsx(
              de,
              {
                isFocused: v,
                isEmpty: R,
                onNewCommentSave: E,
                Components: h,
                dict: u
              }
            )
          }
        ) })
      ]
    }
  );
};
function ue() {
  const t = j(p).threadStore, s = m.useRef(void 0);
  s.current || (s.current = t.getThreads());
  const a = m.useCallback(
    (n) => t.subscribe((r) => {
      s.current = r, n();
    }),
    [t]
  );
  return m.useSyncExternalStore(a, () => s.current);
}
function fe(e) {
  const t = W(), s = y(), a = j(p), n = X(p, {
    editor: t,
    selector: (u) => u.selectedThreadId ? {
      id: u.selectedThreadId,
      position: u.threadPositions.get(u.selectedThreadId)
    } : void 0
  }), r = T(
    {
      trailingBlock: !1,
      dictionary: {
        ...s,
        placeholders: {
          emptyDocument: s.placeholders.comment_reply
        }
      },
      schema: a.commentEditorSchema || k
    },
    [n == null ? void 0 : n.id]
  ), i = ue(), l = m.useMemo(
    () => n ? i.get(n.id) : void 0,
    [n, i]
  ), d = m.useMemo(
    () => {
      var u, c, x;
      return {
        ...e.floatingUIOptions,
        useFloatingOptions: {
          open: !!n,
          // Needed as hooks like `useDismiss` call `onOpenChange` to change the
          // open state.
          onOpenChange: (b, E, v) => {
            if (!b) {
              if (!oe({
                hasUnsavedContent: !r.isEmpty,
                confirmBeforeDiscard: a.confirmBeforeDiscard,
                message: s.comments.discard_pending_comment
              }))
                return;
              v === "escape-key" && t.focus(), a.selectThread(void 0);
            }
          },
          placement: "bottom",
          middleware: [Y(10), Z(), ee()],
          ...(u = e.floatingUIOptions) == null ? void 0 : u.useFloatingOptions
        },
        focusManagerProps: {
          disabled: !0,
          ...(c = e.floatingUIOptions) == null ? void 0 : c.focusManagerProps
        },
        elementProps: {
          style: {
            zIndex: 30
          },
          ...(x = e.floatingUIOptions) == null ? void 0 : x.elementProps
        }
      };
    },
    [
      a,
      s,
      t,
      r,
      e.floatingUIOptions,
      n
    ]
  ), h = e.floatingThread || me;
  return /* @__PURE__ */ o.jsx(
    te,
    {
      position: n == null ? void 0 : n.position,
      portalElement: e.portalElement,
      ...d,
      children: l && /* @__PURE__ */ o.jsx(
        h,
        {
          thread: l,
          selected: !0,
          newCommentEditor: r
        }
      )
    }
  );
}
export {
  fe as default
};
