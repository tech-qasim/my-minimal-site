type Site = {
  title: string;
  description: string;
};

type Link = {
  name: string;
  url: string;
};

type SocialLink = {
  name: string;
  url: string;
  icon: string;
  count?: number;
};

// Control whether to enable GitHub API and some related parameters
// 控制是否启用 GitHub API 和一些相关参数
// 启用：显示github的follower数量 和 最新的github graph
export const GITHUB_CONFIG = {
  ENABLED: true,
  CACHE_DURATION: 60 * 60 * 1.5,
  USE_MOCK_DATA_FOR_DEVELOPMENT: true,
};

export const SITE: Site = {
  title: "Astro Dk2",
  description: "Astro Dk2 is a blog theme built with Astro.js and Dnzzk2.",
};

export const HEADER_LINKS: Link[] = [
  {
    name: "Posts",
    url: "/posts",
  },
  {
    name: "Projects",
    url: "/Projects",
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

// You can obtain icons from the website: https://icon-sets.iconify.design/
// 你可以从网站获取图标：https://icon-sets.iconify.design/
// You can also use count to display the number of followers. If the Github API is enabled, the priority of the API is higher than count
// 你也可以使用 count 来显示关注者数量，如果开启了Github API，API的优先级比count高
// Use the group over: text portrait and text color attributes in tailwindcss to overwrite the original color and hover color
// 可以使用tailwindcss中的group-hover:text-xxx属性和text-xxx属性来重写原始颜色和hover颜色
// example: "icon-[ri--github-fill] text-muted-foreground group-hover:text-primary"
// 例子："icon-[ri--github-fill] text-muted-foreground group-hover:text-primary"
export const SOLUTION_LINKS: SocialLink[] = [
  { name: "github", url: "https://github.com/yourname", icon: "icon-[ri--github-fill]" },
  { name: "twitter", url: "https://x.com/yourname", icon: "icon-[ri--twitter-x-fill]" },
  { name: "bilibili", url: "https://space.bilibili.com/yourSpaceId", icon: "icon-[ri--bilibili-fill]" },
];
