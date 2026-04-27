import { defineConfig } from "vite"
import solid from "vite-plugin-solid"
import { resolve } from "path"

export default defineConfig({
  plugins: [solid()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: [
        "solid-js",
        "solid-js/web",
        "solid-js/store",
        "@solidjs/start",
        "@kobalte/core",
        "@a2ui-sdk/types",
        "@a2ui-sdk/utils",
      ],
      output: {
        preserveModules: true,  // ← penting agar tree-shaking bekerja
        preserveModulesRoot: "src",
      },
    },
  },
})