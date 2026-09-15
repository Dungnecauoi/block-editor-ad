import type { BlockNoteEditor } from "@blocknote/core";
import { insertOrUpdateBlockForSlashMenu } from "@blocknote/core/extensions";

export interface SlashMenuOptions {
  container: HTMLElement;
  editor: BlockNoteEditor<any, any, any>;
}

export interface MenuItem {
  title: string;
  subtext: string;
  icon: string;
  keywords: string[];
  action: (editor: BlockNoteEditor<any, any, any>) => void;
}

export function createSlashMenu(options: SlashMenuOptions) {
  const { container, editor } = options;

  const menuEl = document.createElement("div");
  menuEl.className = "bn-slash-menu bn-ui-popup";
  menuEl.style.display = "none";

  const listEl = document.createElement("div");
  listEl.className = "bn-slash-menu-list";
  menuEl.appendChild(listEl);
  container.appendChild(menuEl);

  let selectedIndex = 0;
  let isOpen = false;
  let query = "";
  let filteredItems: MenuItem[] = [];

  const items: MenuItem[] = [
    {
      title: "Đoạn văn (Paragraph)",
      subtext: "Văn bản thuần túy chuẩn",
      icon: "¶",
      keywords: ["paragraph", "text", "van ban", "doan van", "p"],
      action: (ed) => insertOrUpdateBlockForSlashMenu(ed, { type: "paragraph" }),
    },
    {
      title: "Tiêu đề 1 (Heading 1)",
      subtext: "Tiêu đề phần lớn nhất",
      icon: "H1",
      keywords: ["heading", "h1", "tieu de", "title"],
      action: (ed) => insertOrUpdateBlockForSlashMenu(ed, { type: "heading", props: { level: 1 } }),
    },
    {
      title: "Tiêu đề 2 (Heading 2)",
      subtext: "Tiêu đề phần vừa",
      icon: "H2",
      keywords: ["heading", "h2", "tieu de 2"],
      action: (ed) => insertOrUpdateBlockForSlashMenu(ed, { type: "heading", props: { level: 2 } }),
    },
    {
      title: "Tiêu đề 3 (Heading 3)",
      subtext: "Tiêu đề phần nhỏ",
      icon: "H3",
      keywords: ["heading", "h3", "tieu de 3"],
      action: (ed) => insertOrUpdateBlockForSlashMenu(ed, { type: "heading", props: { level: 3 } }),
    },
    {
      title: "Danh sách gạch đầu dòng",
      subtext: "Bullet list có dấu chấm",
      icon: "•",
      keywords: ["bullet", "list", "danh sach", "ul"],
      action: (ed) => insertOrUpdateBlockForSlashMenu(ed, { type: "bulletListItem" }),
    },
    {
      title: "Danh sách đánh số",
      subtext: "Numbered list 1, 2, 3...",
      icon: "1.",
      keywords: ["number", "numbered", "so", "ol"],
      action: (ed) => insertOrUpdateBlockForSlashMenu(ed, { type: "numberedListItem" }),
    },
    {
      title: "Danh sách công việc (Checklist)",
      subtext: "To-do checkbox có thể tích chọn",
      icon: "☑",
      keywords: ["check", "todo", "task", "cong viec"],
      action: (ed) => insertOrUpdateBlockForSlashMenu(ed, { type: "checkListItem" }),
    },
    {
      title: "Khối Code (Shiki Syntax)",
      subtext: "Tô màu cú pháp lập trình",
      icon: "</>",
      keywords: ["code", "lap trinh", "syntax", "js", "ts", "py"],
      action: (ed) => insertOrUpdateBlockForSlashMenu(ed, { type: "codeBlock" }),
    },
    {
      title: "Bảng dữ liệu (Table)",
      subtext: "Tạo bảng hàng và cột",
      icon: "⊞",
      keywords: ["table", "bang", "grid"],
      action: (ed) => insertOrUpdateBlockForSlashMenu(ed, { type: "table" }),
    },
    {
      title: "Đường kẻ phân cách (Divider)",
      subtext: "Đường ngang chia tách khối",
      icon: "—",
      keywords: ["divider", "hr", "line", "duong ke"],
      action: (ed) => insertOrUpdateBlockForSlashMenu(ed, { type: "divider" }),
    },
  ];

  function renderList() {
    listEl.innerHTML = "";
    filteredItems = items.filter((item) => {
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtext.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.includes(q))
      );
    });

    if (filteredItems.length === 0) {
      listEl.innerHTML = `<div class="bn-slash-menu-empty">Không tìm thấy khối phù hợp</div>`;
      return;
    }

    if (selectedIndex >= filteredItems.length) {
      selectedIndex = 0;
    }

    filteredItems.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = `bn-slash-menu-item ${index === selectedIndex ? "selected" : ""}`;

      const iconEl = document.createElement("div");
      iconEl.className = "bn-slash-menu-icon";
      iconEl.textContent = item.icon;

      const infoEl = document.createElement("div");
      infoEl.className = "bn-slash-menu-info";

      const titleEl = document.createElement("div");
      titleEl.className = "bn-slash-menu-title";
      titleEl.textContent = item.title;

      const subEl = document.createElement("div");
      subEl.className = "bn-slash-menu-subtext";
      subEl.textContent = item.subtext;

      infoEl.appendChild(titleEl);
      infoEl.appendChild(subEl);

      row.appendChild(iconEl);
      row.appendChild(infoEl);

      row.addEventListener("mousedown", (e) => {
        e.preventDefault();
        selectItem(index);
      });

      listEl.appendChild(row);
    });
  }

  function selectItem(index: number) {
    const item = filteredItems[index];
    if (!item) return;

    hide();
    item.action(editor);
  }

  function show(cursorCoords: { top: number; left: number }) {
    isOpen = true;
    query = "";
    selectedIndex = 0;
    renderList();

    const containerRect = container.getBoundingClientRect();
    const top = cursorCoords.top - containerRect.top + 24;
    const left = cursorCoords.left - containerRect.left;

    menuEl.style.top = `${top}px`;
    menuEl.style.left = `${Math.max(10, Math.min(left, containerRect.width - 280))}px`;
    menuEl.style.display = "block";
  }

  function hide() {
    isOpen = false;
    menuEl.style.display = "none";
  }

  // Lắng nghe phím gõ để mở menu khi nhấn /
  const keydownListener = (e: KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "/") {
        // Chờ 1 tick để ký tự / vào editor, sau đó lấy toạ độ con trỏ
        setTimeout(() => {
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            show({ top: rect.bottom, left: rect.left });
          }
        }, 10);
      }
      return;
    }

    // Khi menu đang mở
    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % Math.max(1, filteredItems.length);
      renderList();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + filteredItems.length) % Math.max(1, filteredItems.length);
      renderList();
    } else if (e.key === "Enter") {
      e.preventDefault();
      selectItem(selectedIndex);
    } else if (e.key === "Escape") {
      e.preventDefault();
      hide();
    } else if (e.key === "Backspace") {
      if (query.length > 0) {
        query = query.slice(0, -1);
        selectedIndex = 0;
        renderList();
      } else {
        hide();
      }
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      query += e.key;
      selectedIndex = 0;
      renderList();
    }
  };

  container.addEventListener("keydown", keydownListener);

  return {
    element: menuEl,
    destroy() {
      container.removeEventListener("keydown", keydownListener);
      menuEl.remove();
    },
  };
}
