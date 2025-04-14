import type { RemarkPlugin, RehypePlugin } from '@astrojs/markdown-remark'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import rehypeUnwrapImages from 'rehype-unwrap-images' // 修改这里
import remarkDirective from 'remark-directive'
import remarkDirectiveSugar from 'remark-directive-sugar'
import remarkImgAttr from 'remark-imgattr'
import remarkMath from 'remark-math'
import remarkReadingTime from './remark-reading-time'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeCallouts from 'rehype-callouts'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'

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
      properties: { className: ['anchor'] },
      content: {
        type: 'element',
        tagName: 'span',
        properties: { className: ['anchor-icon'] },
        children: [{ type: 'text', value: '#' }],
      },
    },
  ],
  [
    rehypePrettyCode,
    {
      theme: 'github-dark',
      onVisitLine(node: any) {
        if (node.children.length === 0) {
          node.children = [{ type: 'text', value: ' ' }]
        }
      },
      onVisitHighlightedLine(node: any) {
        node.properties.className.push('highlighted')
      },
    },
  ],
  rehypeCallouts,
  [
    rehypeExternalLinks,
    {
      target: '_blank',
      rel: ['nofollow', 'noopener', 'noreferrer'],
      content: {
        type: 'element',
        tagName: 'span',
        properties: { className: ['external-link-icon'] },
        children: [{ type: 'text', value: '↗' }],
      },
    },
  ],
  rehypeKatex,
] as RehypePlugin[]
