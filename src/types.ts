/**
 * 站点基础信息类型 / Site basic information type
 * @description 包含站点标题和描述 / Contains site title and description
 * @property {string} title - 站点标题 / Site title
 * @property {string} description - 站点描述 / Site description
 * @property {string} author - 作者名称 / Author name
 */
export type Site = {
  title: string
  description: string
  author: string
}

/**
 * 文章封面图宽高比类型 / Hero image aspect ratio type
 * @description 可选值为 '16/9' 和 '3/4' / Possible values: '16/9' and '3/4'
 */
export type HeroImageAspectRatio = '16/9' | '3/4'

/**
 * 文章封面图布局类型 / Hero image layout type
 * @description 可选值为 'left' 和 'right' / Possible values: 'left' and 'right'
 */
export type HeroImageLayout = 'left' | 'right'

/**
 * 文章配置接口 / Post configuration interface
 * @property {string} title - 文章标题 / Post title
 * @property {string} description - 文章描述 / Post description
 * @property {string} author - 作者名称 / Author name
 * @property {number} homePageSize - 首页显示文章数量 / Number of posts on home page
 * @property {number} postsPageSize - 文章列表页每页数量 / Posts per page on posts list
 * @property {boolean} enableImage - 是否启用文章图片 / Whether to enable post images
 * @property {string} defaultHeroImage - 默认文章封面图 / Default hero image for posts
 * @property {HeroImageAspectRatio} defaultHeroImageAspectRatio - 默认图片宽高比 / Default image aspect ratio
 */
export interface PostConfig {
  title: string
  description: string
  author: string
  homePageSize: number
  postsPageSize: number
  enableImage: boolean
  defaultHeroImage: string
  defaultHeroImageAspectRatio: HeroImageAspectRatio
}

/**
 * 标签配置接口 / Tags configuration interface
 * @property {string} title - 标签页标题 / Tags page title
 * @property {string} description - 标签页描述 / Tags page description
 */
export interface TagsConfig {
  title: string
  description: string
}

/**
 * GitHub配置类型 / GitHub configuration type
 * @property {boolean} ENABLED - 是否启用GitHub功能 / Whether to enable GitHub features
 * @property {number} CACHE_DURATION - 缓存持续时间(秒) / Cache duration in seconds
 * @property {boolean} USE_MOCK_DATA_FOR_DEVELOPMENT - 开发时使用模拟数据 / Use mock data in development
 */
export type GithubConfig = {
  ENABLED: boolean
  CACHE_DURATION: number
  USE_MOCK_DATA_FOR_DEVELOPMENT: boolean
}

/**
 * 链接类型 / Link type
 * @property {string} name - 链接显示名称 / Link display name
 * @property {string} url - 链接URL / Link URL
 */
export type Link = {
  name: string
  url: string
}

/**
 * 社交媒体链接类型 / Social media link type
 * @property {string} name - 平台名称 / Platform name
 * @property {string} url - 个人主页URL / Profile URL
 * @property {string} icon - 图标类名 / Icon class name
 * @property {number} [count] - 可选计数 / Optional count
 */
export type SocialLink = {
  name: string
  url: string
  icon: string
  count?: number
}
