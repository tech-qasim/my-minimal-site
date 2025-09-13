import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'
import expressiveCode from 'astro-expressive-code'
import { remarkPlugins, rehypePlugins } from './plugins'
import { SITE } from './src/config'

import netlify from '@astrojs/netlify'

export default defineConfig({
  site: SITE.website,
  base: SITE.base,

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  vite: {
    // @ts-expect-error Vite plugin type mismatch (fixed in Astro 6 / Vite 7)
    plugins: [tailwindcss()],
  },

  markdown: {
    syntaxHighlight: false,
    remarkPlugins,
    rehypePlugins,
  },

  integrations: [expressiveCode(), mdx(), react(), sitemap(), robotsTxt()],
  adapter: netlify(),
})
