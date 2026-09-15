import type { BlockNoteEditor } from "@blocknote/core";

export interface FloatingToolbarOptions {
  container: HTMLElement;
  editor: BlockNoteEditor<any, any, any>;
}

export function createFloatingToolbar(options: FloatingToolbarOptions) {
  const { container, editor } = options;

  const toolbarEl = document.createElement("div");
  toolbarEl.className = "bn-floating-toolbar bn-ui-popup";
  toolbarEl.style.display = "none";

  // Actions definition
  const buttons = [
    {
      id: "h1",
      label: "H1",
      title: "Tiêu đề 1",
      action: () => {
        const block = editor.getTextCursorPosition().block;
        editor.updateBlock(block, { type: "heading", props: { level: 1 } });
      },
    },
    {
      id: "h2",
      label: "H2",
      title: "Tiêu đề 2",
      action: () => {
        const block = editor.getTextCursorPosition().block;
        editor.updateBlock(block, { type: "heading", props: { level: 2 } });
      },
    },
    {
      id: "p",
      label: "P",
      title: "Đoạn văn",
      action: () => {
        const block = editor.getTextCursorPosition().block;
        editor.updateBlock(block, { type: "paragraph" });
      },
    },
    {
      id: "divider-1",
      isDivider: true,
    },
    {
      id: "bold",
      label: "B",
      style: "font-weight: bold",
      title: "In đậm (Ctrl+B)",
      action: () => editor.toggleStyles({ bold: true }),
    },
    {
      id: "italic",
      label: "I",
      style: "font-style: italic",
      title: "In nghiêng (Ctrl+I)",
      action: () => editor.toggleStyles({ italic: true }),
    },
    {
      id: "underline",
      label: "U",
      style: "text-decoration: underline",
      title: "Gạch chân (Ctrl+U)",
      action: () => editor.toggleStyles({ underline: true }),
    },
    {
      id: "strike",
      label: "S",
      style: "text-decoration: line-through",
      title: "Gạch ngang",
      action: () => editor.toggleStyles({ strike: true }),
    },
    {
      id: "code",
      label: "</>",
      style: "font-family: monospace; font-size: 11px;",
      title: "Code nội dòng",
      action: () => editor.toggleStyles({ code: true }),
    },
    {
      id: "divider-2",
      isDivider: true,
    },
    {
      id: "link",
      label: "🔗",
      title: "Tạo liên kết (Link)",
      action: () => {
        const url = prompt("Nhập địa chỉ URL liên kết (https://...):");
        if (url) {
          editor.createLink(url);
        }
      },
    },
    {
      id: "color-blue",
      label: "🔵",
      title: "Màu xanh dương",
      action: () => editor.toggleStyles({ textColor: "blue" }),
    },
    {
      id: "color-red",
      label: "🔴",
      title: "Màu đỏ",
      action: () => editor.toggleStyles({ textColor: "red" }),
    },
    {
      id: "color-default",
      label: "⚪",
      title: "Màu mặc định",
      action: () => editor.toggleStyles({ textColor: "default" }),
    },
  ];

  const buttonElements: Map<string, HTMLButtonElement> = new Map();

  buttons.forEach((btn) => {
    if (btn.isDivider) {
      const sep = document.createElement("div");
      sep.className = "bn-toolbar-divider";
      toolbarEl.appendChild(sep);
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "bn-toolbar-button";
    button.title = btn.title || "";
    button.innerHTML = btn.label || "";
    if (btn.style) button.style.cssText = btn.style;

    button.addEventListener("mousedown", (e) => {
      e.preventDefault(); // Giữ selection trong editor
    });

    button.addEventListener("click", (e) => {
      e.preventDefault();
      if (btn.action) {
        btn.action();
        updateActiveStates();
      }
    });

    toolbarEl.appendChild(button);
    buttonElements.set(btn.id, button);
  });

  container.appendChild(toolbarEl);

  function updateActiveStates() {
    const activeStyles = editor.getActiveStyles() as Record<string, any>;

    const styleIds = ["bold", "italic", "underline", "strike", "code"];
    styleIds.forEach((id) => {
      const btn = buttonElements.get(id);
      if (btn) {
        if (activeStyles[id]) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      }
    });
  }

  function updatePosition() {
    const selection = window.getSelection();
    if (
      !selection ||
      selection.isCollapsed ||
      !container.contains(selection.anchorNode)
    ) {
      toolbarEl.style.display = "none";
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Hiển thị và định vị thanh toolbar phía trên vùng bôi đen
    toolbarEl.style.display = "flex";
    updateActiveStates();

    const toolbarRect = toolbarEl.getBoundingClientRect();
    const top = rect.top - containerRect.top - toolbarRect.height - 8;
    const left = rect.left - containerRect.left + (rect.width - toolbarRect.width) / 2;

    toolbarEl.style.top = `${Math.max(0, top)}px`;
    toolbarEl.style.left = `${Math.max(0, left)}px`;
  }

  const unsubSelection = editor.onSelectionChange(() => {
    setTimeout(updatePosition, 10);
  });

  return {
    element: toolbarEl,
    destroy() {
      unsubSelection();
      toolbarEl.remove();
    },
  };
}
