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

export const LINKS: Link[] = [
  {
    name: "Posts",
    url: "/",
  },
  {
    name: "Works",
    url: "/works",
  },
];
