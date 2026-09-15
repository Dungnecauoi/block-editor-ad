import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ["src/**/*"],
    }),
  ],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  resolve: {
    alias: {
      "@blocknote/core": resolve(__dirname, "../core/src"),
      "@blocknote/code-block": resolve(__dirname, "../code-block/src"),
      "@blocknote/xl-multi-column": resolve(__dirname, "../xl-multi-column/src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "BlockNote",
      formats: ["es", "umd"],
      fileName: (format) => `blocknote-vanilla.${format === "es" ? "js" : "min.js"}`,
    },
    rollupOptions: {
      output: {
        globals: {},
      },
    },
  },
});
