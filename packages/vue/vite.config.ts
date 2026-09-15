import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ["src/**/*.ts"],
    }),
  ],
  resolve: {
    alias: {
      "@blocknote/core": resolve(__dirname, "../core/src"),
      "@blocknote/vanilla": resolve(__dirname, "../vanilla/src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "BlockNoteVue",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: [
        "vue",
        "@blocknote/core",
        "@blocknote/vanilla",
      ],
      output: {
        globals: {
          vue: "Vue",
          "@blocknote/core": "BlockNoteCore",
          "@blocknote/vanilla": "BlockNoteVanilla",
        },
      },
    },
  },
});
