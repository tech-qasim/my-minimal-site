import { visit } from 'unist-util-visit'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import remarkDirective from 'remark-directive'
import remarkDirectiveSugar from 'remark-directive-sugar'
import remarkImgAttr from 'remark-imgattr'
import remarkMath from 'remark-math'
import remarkReadingTime from './remark-reading-time'

import rehypeSlug from 'rehype-slug'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCallouts from 'rehype-callouts'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'

import type { RemarkPlugin, RehypePlugin } from '@astrojs/markdown-remark'
import { type CreateProperties } from 'rehype-external-links'

export const remarkPlugins = [
  remarkGfm,
  remarkSmartypants,
  remarkDirective,
  remarkDirectiveSugar,
  remarkImgAttr,
  remarkMath,
  remarkReadingTime,
] as RemarkPlugin[]

export const rehypePlugins = [
  rehypeSlug,
  rehypeUnwrapImages,
  [
    rehypeAutolinkHeadings,
    {
      behavior: 'append',
      properties: (el: Parameters<CreateProperties>[0]) => {
        let text = ''
        visit(el, 'text', (textNode) => {
          text += textNode.value
        })
        return {
          'class': 'header-anchor',
          'aria-hidden': 'false',
          'aria-label': text ? `Link to ${text}` : undefined,
        }
      },
      content: {
        type: 'text',
        value: '#',
      },
    },
  ],
  [rehypeCallouts, { theme: 'vitepress' }],
  rehypeExternalLinks,
  rehypeKatex,
] as RehypePlugin[]
