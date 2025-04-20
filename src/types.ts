/**
 * 站点基础信息类型 / Site basic information type
 * @description 包含站点标题和描述 / Contains site title and description
 * @property {string} title - 站点标题 / Site title
 * @property {string} description - 站点描述 / Site description
 * @property {string} author - 作者名称 / Author name
 * @property {string} website - 网站地址 / Website address
 * @property {string} ogImage - OGP 图片地址 / OGP image address
 */
export type Site = {
  title: string
  description: string
  author: string
  website: string
  ogImage: string
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
 * 文章卡片类型 / PostCardType
 * @description 可选值为 'compact' 、'image' 和 'time-line' / Possible values: 'compact', 'image' and 'timeLine'
 */
export type PostCardType = 'compact' | 'image' | 'time-line'

/**
 * 文章卡片页面基础配置接口 / Post card page configuration interface
 * @description 用于配置文章卡片页面的显示方式 / Used to configure how post cards are displayed on pages
 * @property {PostCardType} type - 卡片展示类型 / Card display type
 * @property {number} size - 每页显示数量 / Number of items per page
 * @property {HeroImageLayout} heroImageLayout - 特色图片布局方式 / Hero image layout position
 */
export interface PostCardPageConfig {
  type: PostCardType
  size: number
  heroImageLayout?: HeroImageLayout
}

/**
 * 文章配置接口 / Post configuration interface
 * @description 用于配置博客文章相关的全局设置 / Used to configure global settings for blog posts
 * @property {string} title - 文章标题 / Post title
 * @property {string} description - 文章描述 / Post description
 * @property {string} author - 作者名称 / Author name
 * @property {PostCardPageConfig} homePageConfig - 首页文章展示配置 / Home page posts display configuration
 * @property {PostCardPageConfig} postPageConfig - 文章列表页展示配置 / Posts list page display configuration
 * @property {PostCardPageConfig} tagsPageConfig - 标签页文章展示配置 / Post display configuration for tags page
 * @property {string} defaultHeroImage - 默认文章封面图 / Default hero image for posts
 * @property {HeroImageAspectRatio} defaultHeroImageAspectRatio - 默认图片宽高比 / Default image aspect ratio
 * @property {string} tocText - 目录文本 / Table of contents text
 */
export interface PostConfig {
  title: string
  description: string
  author: string
  homePageConfig: PostCardPageConfig
  postPageConfig: PostCardPageConfig
  tagsPageConfig: PostCardPageConfig
  defaultHeroImage: string
  defaultHeroImageAspectRatio: HeroImageAspectRatio
  tocText: string
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
