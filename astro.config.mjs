// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-dk2.vercel.app/",
  prefetch: true, // 启用预取
  vite: {
    plugins: [tailwindcss()],
    envDir: ".",
  },

  integrations: [react()],
});
