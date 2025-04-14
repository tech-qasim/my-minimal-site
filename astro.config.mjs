// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import { remarkPlugins, rehypePlugins } from './plugins'

export default defineConfig({
  site: 'https://litos.vercel.app/',
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
    envDir: '.',
  },
  markdown: {
    remarkPlugins,
    rehypePlugins,
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  integrations: [
    react(),
    mdx({
      remarkPlugins,
      rehypePlugins,
      shikiConfig: {
        theme: 'github-dark',
        wrap: true,
      },
    }),
  ],
})
