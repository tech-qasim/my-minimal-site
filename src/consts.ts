type Site = {
  title: string;
  description: string;
};

type Link = {
  name: string;
  url: string;
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
