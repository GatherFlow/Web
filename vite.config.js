import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [TanStackRouterVite({ autoCodeSplitting: true }), viteReact(), tailwindcss()],
  base: '/',
  test: {
    globals: true,
    environment: "jsdom",
  },
  preview: {
    port: 4000,
    strictPort: true,
    allowedHosts: ['onelil.tech']
  },
  server: {
    port: 4000,
    strictPort: true,
    host: true,
    origin: 'http://0.0.0.0:8080'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  }
});
