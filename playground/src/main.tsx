import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import { filterSuggestionItems } from "@blocknote/core/extensions";
import { BlockNoteView as MantineBlockNoteView } from "@blocknote/mantine";
import { BlockNoteView as ShadcnBlockNoteView } from "@blocknote/shadcn";
import { BlockNoteView as AriakitBlockNoteView } from "@blocknote/ariakit";
import {
  useCreateBlockNote,
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
} from "@blocknote/react";
import { syntaxHighlighter } from "@blocknote/code-block";
import {
  createReactMathBlockSpec,
  getMathSlashMenuItems,
} from "@blocknote/math-block";
import {
  createReactDiagramBlockSpec,
  getDiagramSlashMenuItems,
} from "@blocknote/diagram-block";
import {
  ColumnBlock,
  ColumnListBlock,
  multiColumnDropCursor,
  getMultiColumnSlashMenuItems,
} from "@blocknote/xl-multi-column";
import {
  MantineProvider,
  Button,
  Group,
  Title,
  Paper,
  Badge,
  Text,
  Tooltip,
  SegmentedControl,
  Box,
} from "@mantine/core";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import "@mantine/core/styles.css";
import "katex/dist/katex.min.css";
import "./style.css";

// 1. Khởi tạo schema đầy đủ với tất cả các khối nâng cao
const fullSchema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    mathBlock: createReactMathBlockSpec(),
    diagram: createReactDiagramBlockSpec(),
    column: ColumnBlock,
    columnList: ColumnListBlock,
  },
});

const initialDemoContent: any[] = [
  {
    type: "heading",
    props: { level: 1 },
    content: "🚀 So sánh 3 Giao diện: Mantine vs Shadcn vs Ariakit",
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "Hiện tại bạn đang thử nghiệm phiên bản tuỳ biến bởi ",
        styles: {},
      },
      {
        type: "text",
        text: "duxbo",
        styles: { bold: true, textColor: "blue" },
      },
      {
        type: "text",
        text: ". Hãy bấm vào các nút ",
        styles: {},
      },
      {
        type: "text",
        text: "[ Mantine | Shadcn | Ariakit ]",
        styles: { code: true },
      },
      {
        type: "text",
        text: " ở thanh công cụ phía trên để xem sự khác biệt về phong cách thiết kế của từng giao diện!",
        styles: {},
      },
    ],
  },
  {
    type: "heading",
    props: { level: 2 },
    content: "1. Danh sách công việc (To-do List)",
  },
  {
    type: "checkListItem",
    props: { checked: true },
    content: "Bôi đen đoạn văn bản để xem thanh Floating Toolbar của từng giao diện",
  },
  {
    type: "checkListItem",
    props: { checked: true },
    content: "Gõ phím tắt / để so sánh Slash Menu của Mantine vs Shadcn vs Ariakit",
  },
  {
    type: "checkListItem",
    props: { checked: false },
    content: "Rê chuột vào icon 6 chấm bên trái dòng để so sánh Side Menu & Dropdown chọn màu",
  },
  {
    type: "heading",
    props: { level: 2 },
    content: "2. Bảng dữ liệu tương tác (Table)",
  },
  {
    type: "table",
    content: {
      type: "tableContent",
      rows: [
        {
          cells: [
            ["Giao diện (Skin)"],
            ["Phong cách thiết kế"],
            ["Đặc điểm nổi bật"]
          ],
        },
        {
          cells: [
            ["Mantine UI"],
            ["Chuẩn Notion gốc"],
            ["Bo góc mềm mại, icon trực quan, hỗ trợ theme dễ dàng"]
          ],
        },
        {
          cells: [
            ["Shadcn UI"],
            ["Tối giản, Hiện đại (Tailwind)"],
            ["Phong cách Linear/Vercel, viền mảnh sắc nét, nền mờ kính"]
          ],
        },
        {
          cells: [
            ["Ariakit UI"],
            ["Chuẩn WAI-ARIA"],
            ["Siêu nhẹ, tối ưu hỗ trợ phím tắt và tiếp cận (Accessibility)"]
          ],
        },
      ],
    },
  },
  {
    type: "heading",
    props: { level: 2 },
    content: "3. Khối Code Highlight (Shiki)",
  },
  {
    type: "codeBlock",
    props: { language: "typescript" },
    content: [
      {
        type: "text",
        text: `// 3 Giao diện dùng chung 1 Lõi Core của duxbo
import { BlockNoteEditor } from "@blocknote/core";

export function getEditorStats(editor: BlockNoteEditor) {
  return {
    author: "duxbo",
    blockCount: editor.document.length,
  };
}`,
        styles: {},
      },
    ],
  },
  {
    type: "heading",
    props: { level: 2 },
    content: "4. Khối Công thức Toán học (KaTeX LaTeX)",
  },
  {
    type: "mathBlock",
    content: "E = mc^2 \\quad \\text{và} \\quad \\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}",
  },
  {
    type: "heading",
    props: { level: 2 },
    content: "5. Khối Sơ đồ Tư duy (Mermaid Diagram)",
  },
  {
    type: "diagram",
    content: `graph TD
    Core([Core Engine - duxbo]) --> React[React Adapter]
    React --> Mantine[Giao diện Mantine]
    React --> Shadcn[Giao diện Shadcn]
    React --> Ariakit[Giao diện Ariakit]`,
  },
  {
    type: "divider",
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "💡 Bôi đen bất kỳ dòng chữ nào để thấy thanh công cụ đổi style ngay lập tức!",
        styles: { italic: true },
      },
    ],
  },
];

type UiSkin = "mantine" | "shadcn" | "ariakit";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [uiSkin, setUiSkin] = useState<UiSkin>("mantine");
  const [stats, setStats] = useState({ words: 0, chars: 0, blocks: 0 });

  const editor = useCreateBlockNote({
    schema: fullSchema,
    dropCursor: multiColumnDropCursor,
    extensions: [syntaxHighlighter],
    initialContent: initialDemoContent,
  });

  // Cập nhật thống kê khi nội dung thay đổi
  useEffect(() => {
    if (!editor) return;

    const updateStats = () => {
      const blocks = editor.document;
      let text = "";
      const traverse = (blockList: any[]) => {
        for (const b of blockList) {
          if (Array.isArray(b.content)) {
            for (const c of b.content) {
              if (c.text) text += c.text + " ";
            }
          }
          if (b.children) traverse(b.children);
        }
      };
      traverse(blocks);

      const cleanText = text.trim();
      const words = cleanText ? cleanText.split(/\\s+/).length : 0;
      setStats({
        words,
        chars: cleanText.length,
        blocks: blocks.length,
      });
    };

    updateStats();
    return editor.onChange(updateStats);
  }, [editor]);

  const exportJSON = () => {
    const json = JSON.stringify(editor.document, null, 2);
    downloadFile(json, "document.json", "application/json");
  };

  const exportMarkdown = async () => {
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    downloadFile(markdown, "document.md", "text/markdown");
  };

  const exportHTML = async () => {
    const html = await editor.blocksToHTMLLossy(editor.document);
    downloadFile(html, "document.html", "text/html");
  };

  const resetContent = () => {
    editor.replaceBlocks(editor.document, initialDemoContent);
  };

  const clearContent = () => {
    editor.replaceBlocks(editor.document, [
      {
        type: "paragraph",
        content: "",
      },
    ]);
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Component render Slash Menu dùng chung cho cả 3 giao diện
  const suggestionMenu = (
    <SuggestionMenuController
      triggerCharacter={"/"}
      getItems={async (query: string) =>
        filterSuggestionItems(
          [
            ...getDefaultReactSlashMenuItems(editor),
            ...getMathSlashMenuItems(editor),
            ...getDiagramSlashMenuItems(editor),
            ...getMultiColumnSlashMenuItems(editor),
          ],
          query
        )
      }
    />
  );

  return (
    <MantineProvider forceColorScheme={theme}>
      <div
        style={{
          minHeight: "100vh",
          background: theme === "dark" ? "#141517" : "#f4f5f7",
          color: theme === "dark" ? "#e9ecef" : "#212529",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          transition: "background 0.2s ease",
        }}
      >
        {/* Header Bar */}
        <Paper
          p="sm"
          shadow="sm"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: theme === "dark" ? "#1a1b1e" : "#ffffff",
            borderBottom: theme === "dark" ? "1px solid #2c2e33" : "1px solid #e9ecef",
          }}
        >
          <Group justify="space-between" align="center" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Group gap="xs">
              <span style={{ fontSize: "1.4rem" }}>🎨</span>
              <Title order={3} style={{ fontWeight: 700, fontSize: "1.15rem" }}>
                BlockNote Studio
              </Title>
              <Badge color="indigo" variant="light" size="sm">
                Author: duxbo
              </Badge>
            </Group>

            {/* Bộ chuyển đổi Giao diện Skin Switcher */}
            <Group gap="xs">
              <Text size="xs" fw={600} c="dimmed">
                Giao diện:
              </Text>
              <SegmentedControl
                size="xs"
                value={uiSkin}
                onChange={(val) => setUiSkin(val as UiSkin)}
                data={[
                  { label: "1. Mantine UI", value: "mantine" },
                  { label: "2. Shadcn UI", value: "shadcn" },
                  { label: "3. Ariakit UI", value: "ariakit" },
                ]}
                color={uiSkin === "mantine" ? "blue" : uiSkin === "shadcn" ? "dark" : "teal"}
              />
            </Group>

            {/* Các nút hành động */}
            <Group gap="xs">
              <Tooltip label="Chuyển đổi sáng / tối">
                <Button
                  size="xs"
                  variant="default"
                  onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
                >
                  {theme === "light" ? "🌙 Tối" : "☀️ Sáng"}
                </Button>
              </Tooltip>

              <Button
                component="a"
                href="/vue.html"
                size="xs"
                variant="light"
                color="green"
              >
                💚 Vue 3 Demo
              </Button>
              <Button
                component="a"
                href="/vanilla.html"
                size="xs"
                variant="light"
                color="orange"
              >
                🍦 Vanilla JS Demo
              </Button>
              <Button size="xs" variant="outline" color="blue" onClick={exportMarkdown}>
                ⬇️ Markdown
              </Button>
              <Button size="xs" variant="outline" color="cyan" onClick={exportHTML}>
                ⬇️ HTML
              </Button>
              <Button size="xs" variant="outline" color="violet" onClick={exportJSON}>
                ⬇️ JSON
              </Button>
              <Button size="xs" variant="subtle" color="gray" onClick={resetContent}>
                🔄 Mẫu
              </Button>
            </Group>
          </Group>
        </Paper>

        {/* Thanh ghi chú mô tả giao diện đang chọn */}
        <Box style={{ maxWidth: 960, margin: "16px auto 0 auto", padding: "0 16px" }}>
          <Paper p="xs" radius="sm" style={{ background: theme === "dark" ? "#25262b" : "#e7f5ff", border: "1px solid #74c0fc" }}>
            <Group justify="space-between">
              <Text size="xs">
                Đang hiển thị skin: <b>{uiSkin === "mantine" ? "Mantine UI (Mặc định)" : uiSkin === "shadcn" ? "Shadcn UI (Tailwind Style)" : "Ariakit UI (Accessible)"}</b>
                {" • "}
                {uiSkin === "mantine" && "Bo góc mềm mại, icon đầy đặn, thiết kế đặc trưng của Notion."}
                {uiSkin === "shadcn" && "Thiết kế tối giản theo trường phái Linear / Vercel, viền sắc nét, hiệu ứng tinh tế."}
                {uiSkin === "ariakit" && "Thiết kế phẳng nhẹ, tuân thủ nghiêm ngặt tiêu chuẩn trợ năng WAI-ARIA."}
              </Text>
              <Text size="xs" c="dimmed">
                <b>{stats.blocks}</b> khối • <b>{stats.words}</b> từ
              </Text>
            </Group>
          </Paper>
        </Box>

        {/* Khung Editor chính - Render linh hoạt theo UI Skin đã chọn */}
        <div style={{ maxWidth: 960, margin: "16px auto", padding: "0 16px 80px 16px" }}>
          <Paper
            p="xl"
            radius="md"
            shadow="md"
            style={{
              minHeight: 800,
              background: theme === "dark" ? "#1f2023" : "#ffffff",
              border: theme === "dark" ? "1px solid #2e3035" : "1px solid #e9ecef",
            }}
          >
            {uiSkin === "mantine" && (
              <MantineBlockNoteView editor={editor} theme={theme} slashMenu={false}>
                {suggestionMenu}
              </MantineBlockNoteView>
            )}

            {uiSkin === "shadcn" && (
              <ShadcnBlockNoteView editor={editor} theme={theme} slashMenu={false}>
                {suggestionMenu}
              </ShadcnBlockNoteView>
            )}

            {uiSkin === "ariakit" && (
              <AriakitBlockNoteView editor={editor} theme={theme} slashMenu={false}>
                {suggestionMenu}
              </AriakitBlockNoteView>
            )}
          </Paper>
        </div>
      </div>
    </MantineProvider>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
