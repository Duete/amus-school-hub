import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tanstackStart(), tailwindcss(), tsconfigPaths(), viteReact()],
  optimizeDeps: {
    // @tanstack/react-store imports this CJS shim with a named ESM import; without
    // pre-bundling, the browser gets raw CJS and the client bundle never hydrates.
    include: ["use-sync-external-store/shim/with-selector"],
  },
});
