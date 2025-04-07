export type Site = {
  title: string;
  description: string;
};

export type Link = {
  name: string;
  url: string;
};

export type SocialLink = {
  name: string;
  url: string;
  icon: string;
  count?: number;
};

export type GithubConfig = {
  ENABLED: boolean;
  CACHE_DURATION: number;
  USE_MOCK_DATA_FOR_DEVELOPMENT: boolean;
};

export type PostConfig = {
  author: string;
  homePageSize: number;
  postsPageSize: number;
};
