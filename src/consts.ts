import type { GithubConfig, Link, PostConfig, Site, SocialLink } from "@types";

// 站点基础配置
export const SITE: Site = {
  title: "Litos",
  description: "Litos is a blog theme built with Astro.js and Dnzzk2.",
};

// 文章相关配置
export const POSTS_CONFIG: PostConfig = {
  author: "Litos",
  homePageSize: 5,
  postsPageSize: 10,
};

// 导航配置
export const HEADER_LINKS: Link[] = [
  {
    name: "Posts",
    url: "/posts",
  },
  {
    name: "Projects",
    url: "/projects", // 修正大小写一致性
  },
];

export const FOOTER_LINKS: Link[] = [
  {
    name: "Readme",
    url: "/",
  },
  {
    name: "Posts",
    url: "/posts",
  },
  {
    name: "Projects",
    url: "/projects",
  },
];

// 社交媒体链接配置
export const SOLUTION_LINKS: SocialLink[] = [
  {
    name: "github",
    url: "https://github.com/yourname",
    icon: "icon-[ri--github-fill]",
  },
  {
    name: "twitter",
    url: "https://x.com/yourname",
    icon: "icon-[ri--twitter-x-fill]",
  },
  {
    name: "bilibili",
    url: "https://space.bilibili.com/yourSpaceId",
    icon: "icon-[ri--bilibili-fill]",
  },
];

// GitHub 功能配置
export const GITHUB_CONFIG: GithubConfig = {
  ENABLED: true,
  CACHE_DURATION: 60 * 60 * 1.5 + 60 * 5, // 1.5小时 + 5分钟的缓存时间
  USE_MOCK_DATA_FOR_DEVELOPMENT: true,
};
