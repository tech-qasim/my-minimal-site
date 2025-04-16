import { defineEcConfig } from 'astro-expressive-code'
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

export default defineEcConfig({
  defaultLocale: 'zh-CN',
  defaultProps: {
    wrap: false,
    collapseStyle: 'collapsible-auto',
    showLineNumbers: false,
    preserveIndent: true,
  },
  minSyntaxHighlightingColorContrast: 0,

  plugins: [pluginCollapsibleSections(), pluginLineNumbers()],

  themes: ['catppuccin-macchiato', 'catppuccin-latte'],
  themeCssSelector: (theme) => (theme.name === 'catppuccin-macchiato' ? '.dark' : ':root:not(.dark)'),
})
