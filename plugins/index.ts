import { visit } from 'unist-util-visit'
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
import { type PropertiesFromTextDirective } from 'remark-directive-sugar'
import { type CreateProperties } from 'rehype-external-links'

export const remarkPlugins = [
  remarkSmartypants,
  remarkDirective,
  [
    remarkDirectiveSugar,
    {
      badge: {
        presets: {
          n: { text: 'NEW' },
        },
      },
      // 链接配置
      link: {
        // 网站图标 URL 模板
        faviconSourceUrl: 'https://www.google.com/s2/favicons?domain={domain}&sz=128',
        // 图标属性配置
        imgProps: (node: Parameters<PropertiesFromTextDirective>[0]) => {
          const props: ReturnType<PropertiesFromTextDirective> = {
            'aria-hidden': 'true',
          }
          if (node.attributes?.class?.includes('github')) props.src = 'https://www.google.com/s2/favicons?domain=github.com&sz=128'

          return props
        },
      },
      image: {
        stripParagraph: false,
      },
    },
  ],
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
  [
    rehypeExternalLinks,
    {
      target: '_blank',
      rel: ['noopener', 'noreferrer'],
    },
  ],
  rehypeKatex,
] as RehypePlugin[]
