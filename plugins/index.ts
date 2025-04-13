import type { RemarkPlugin } from '@astrojs/markdown-remark'
import remarkReadingTime from './remark-reading-time'

export const remarkPlugins: RemarkPlugin[] = [remarkReadingTime]
