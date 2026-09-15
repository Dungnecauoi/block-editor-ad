import type { BlockNoteEditor, Block } from "@blocknote/core";
import { dragStart } from "@blocknote/core/extensions";

export interface SideMenuOptions {
  container: HTMLElement;
  editor: BlockNoteEditor<any, any, any>;
}

export function createSideMenu(options: SideMenuOptions) {
  const { container, editor } = options;

  const sideMenuEl = document.createElement("div");
  sideMenuEl.className = "bn-side-menu bn-ui-side";
  sideMenuEl.style.display = "none";

  // Nút Thêm khối (+)
  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "bn-side-btn bn-side-add";
  addBtn.title = "Thêm khối ở bên dưới (+)";
  addBtn.innerHTML = "+";

  // Nút 6 chấm kéo thả (⋮⋮)
  const dragHandle = document.createElement("div");
  dragHandle.className = "bn-side-btn bn-side-drag";
  dragHandle.title = "Kéo để di chuyển khối, hoặc click để mở menu";
  dragHandle.setAttribute("draggable", "true");
  dragHandle.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
      <circle cx="5" cy="3" r="1.5"/>
      <circle cx="11" cy="3" r="1.5"/>
      <circle cx="5" cy="8" r="1.5"/>
      <circle cx="11" cy="8" r="1.5"/>
      <circle cx="5" cy="13" r="1.5"/>
      <circle cx="11" cy="13" r="1.5"/>
    </svg>
  `;

  sideMenuEl.appendChild(addBtn);
  sideMenuEl.appendChild(dragHandle);
  container.appendChild(sideMenuEl);

  let currentBlock: Block<any, any, any> | null = null;
  let currentBlockEl: HTMLElement | null = null;

  // Xử lý Click nút (+)
  addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!currentBlock) return;

    const newBlock = editor.insertBlocks(
      [{ type: "paragraph" }],
      currentBlock,
      "after"
    )[0];
    editor.setTextCursorPosition(newBlock, "end");
  });

  // Xử lý Kéo thả 6 chấm
  dragHandle.addEventListener("dragstart", (e) => {
    if (!currentBlock) return;
    dragStart(e as any, currentBlock, editor);
  });

  // Theo dõi vị trí chuột trên editor để gắn 6 chấm vào dòng tương ứng
  const onMouseMove = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    // Tìm blockContainer gần nhất
    const blockEl = target.closest<HTMLElement>(".bn-block") || 
                    target.closest<HTMLElement>("[data-node-type=blockContainer]") ||
                    target.closest<HTMLElement>("[data-id]");

    if (!blockEl || !container.contains(blockEl)) {
      return;
    }

    currentBlockEl = blockEl;
    const blockId = blockEl.getAttribute("data-id");
    if (blockId) {
      currentBlock = editor.getBlock(blockId) || null;
    }

    const blockRect = blockEl.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Đặt side menu vào lề trái của block đó
    const top = blockRect.top - containerRect.top + (blockRect.height > 40 ? 4 : (blockRect.height - 24) / 2);
    const left = blockRect.left - containerRect.left - 54; // lùi về lề trái

    sideMenuEl.style.top = `${Math.max(0, top)}px`;
    sideMenuEl.style.left = `${Math.max(0, left)}px`;
    sideMenuEl.style.display = "flex";
  };

  const onMouseLeave = (e: MouseEvent) => {
    const related = e.relatedTarget as HTMLElement;
    if (!container.contains(related)) {
      sideMenuEl.style.display = "none";
    }
  };

  container.addEventListener("mousemove", onMouseMove);
  container.addEventListener("mouseleave", onMouseLeave);

  return {
    element: sideMenuEl,
    destroy() {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      sideMenuEl.remove();
    },
  };
}
