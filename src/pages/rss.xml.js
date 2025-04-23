import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE } from '~/config' // 确保你的站点配置路径正确
import sanitizeHtml from 'sanitize-html' // 需要安装 sanitize-html
import MarkdownIt from 'markdown-it' // 需要安装 markdown-it

const parser = new MarkdownIt()

export async function GET(context) {
  const posts = await getCollection('posts')

  const sortedPosts = posts.sort((a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf())

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
      content: sanitizeHtml(parser.render(post.body)),
      customData: `<author>${post.data.author || SITE.author}</author>`,
      updatedDate: post.data.updatedDate,
    })),
    stylesheet: '/rss/styles.xsl',
  })
}
