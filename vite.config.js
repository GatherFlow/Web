import { defineConfig, loadEnv } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { resolve } from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      TanStackRouterVite({ autoCodeSplitting: true }),
      viteReact(),
      tailwindcss(),
      svgr()
    ],
    base: '/',
    test: {
      globals: true,
      environment: "jsdom",
    },
    preview: {
      port: 9091,
      strictPort: true,
      allowedHosts: ['gather.onelil.tech']
    },
    server: {
      port: 9091,
      strictPort: true,
      host: true,
      origin: `http://localhost:9091`,
      proxy: {
        '/api': {
          target: 'https://bots.innova.ua/api/user',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false,
        },
        '/events': {
          target: 'https://bots.innova.ua/api/event',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/events/, ''),
          secure: false,
        }
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    }
  }
});
