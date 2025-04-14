// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import { remarkPlugins, rehypePlugins } from './plugins'
import { SITE } from './src/config'

export default defineConfig({
  site: SITE.website,
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
    envDir: '.',
  },
  markdown: {
    remarkPlugins,
    rehypePlugins,
  },
  integrations: [react(), mdx()],
})
