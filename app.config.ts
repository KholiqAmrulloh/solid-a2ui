import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@a2ui-sdk/solid": "/packages/@a2ui-sdk/src/index.ts",
      },
    },
  },
  ssr: false
});
