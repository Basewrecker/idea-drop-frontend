import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackRouter } from "@tanstack/router-plugin/vite";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const config = defineConfig(() => {
  const proxyTarget =
    process.env.VITE_API_PROXY_TARGET || "http://localhost:9000";
  const stripApiPrefix =
    process.env.VITE_API_PROXY_STRIP_PREFIX === "true";

  return {
    resolve: { tsconfigPaths: true },
    plugins: [
      devtools(),
      tailwindcss(),
      tanstackRouter({ target: "react", autoCodeSplitting: true }),
      viteReact(),
    ],
    server: {
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: stripApiPrefix
            ? (path) => path.replace(/^\/api/, "")
            : undefined,
        },
      },
    },
  };
});

export default config;
