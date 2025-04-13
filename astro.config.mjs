// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import { remarkPlugins } from './plugins'

// https://astro.build/config
export default defineConfig({
  site: 'https://litos.vercel.app/',
  prefetch: true, // 启用预取
  vite: {
    plugins: [tailwindcss()],
    envDir: '.',
  },
  markdown: {
    remarkPlugins: remarkPlugins,
  },
  integrations: [react(), mdx({ remarkPlugins: remarkPlugins })],
})
