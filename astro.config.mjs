// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://litos.vercel.app/",
  prefetch: true, // 启用预取
  vite: {
    plugins: [tailwindcss()],
    envDir: ".",
  },
  integrations: [react(), mdx()],
});
