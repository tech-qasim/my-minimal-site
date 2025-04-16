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
import { type PropertiesFromTextDirective } from 'remark-directive-sugar'
import { type CreateProperties } from 'rehype-external-links'

export const remarkPlugins = [
  remarkGfm,
  remarkSmartypants,
  remarkDirective,
  [
    remarkDirectiveSugar,
    {
      // 徽章配置
      badge: {
        presets: {
          n: {
            text: 'NEW',
            style: 'background-color: #22c55e; color: white; padding: 0.2em 0.5em; border-radius: 4px;',
          },
          a: {
            text: 'ARTICLE',
            style: 'background-color: #3b82f6; color: white; padding: 0.2em 0.5em; border-radius: 4px;',
          },
          v: {
            text: 'VIDEO',
            style: 'background-color: #ef4444; color: white; padding: 0.2em 0.5em; border-radius: 4px;',
          },
        },
      },
      // 链接配置
      link: {
        // 网站图标 URL 模板
        faviconSourceUrl: 'https://icon.horse/icon/{domain}',
        // 图标属性配置
        imgProps: (node: Parameters<PropertiesFromTextDirective>[0]) => ({
          'aria-hidden': 'true',
          'style': 'height: 1em; width: 1em; margin-right: 0.2em; vertical-align: -0.1em;',
          'loading': 'lazy',
        }),
        // 特定网站配置
        github: {
          icon: true, // 使用 GitHub 图标
          className: 'github-link',
        },
        npm: {
          icon: true, // 使用 NPM 图标
          className: 'npm-link',
        },
      },
      // 图片配置
      image: {
        figure: true, // 启用 figure 包装
        figureClassName: 'image-figure',
        captionClassName: 'image-caption',
        link: true, // 图片可点击
        stripParagraph: false, // 不移除外层段落
      },
      // 视频配置
      video: {
        youtube: {
          width: '100%',
          height: 'auto',
          loading: 'lazy',
        },
        bilibili: {
          width: '100%',
          height: 'auto',
          loading: 'lazy',
        },
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
      properties: {
        className: ['external-link'],
      },
    },
  ],
  rehypeKatex,
] as RehypePlugin[]
