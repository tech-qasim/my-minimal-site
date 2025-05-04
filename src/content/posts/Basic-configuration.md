---
title: 'Basic configuration'
description: 'Basic setup instructions for Litos theme'
pubDate: 2025-05-03
tags: ['Configuration']
recommend: true
heroImage: 'Basic-configuration.png'
ogImage: 'Basic-configuration.png'
---

The basic configuration is in the `src/config.ts` file. This file contains all the essential settings for your Litos theme website.

## Basic configuration of the site

```ts
export const SITE: Site = {
  title: 'Litos',        // Your website title
  description: 'Litos is a blog theme built with Astro.js and Dnzzk2.',  // Site description
  website: 'https://litos.vercel.app/',  // Your website URL
  base: '/',             // Base URL path (change if not deployed at root)
  author: 'Dnzzk2',      // Author name
  ogImage: '/og-image.jpg'  // Default Open Graph image for social sharing
}
```

Each field serves a specific purpose:

- **title** : Essential for SEO and branding - displayed in browser tabs, search results, and social sharing.
- **description** : Critical for SEO - provides a concise summary of your site for search engines and social sharing.
- **website** : Your production URL - required for canonical links and absolute URL generation.
- **base** : Important for deployment configuration - set this if your site is not at the domain root.
- **author** : Attribution information - used in meta tags.
- **ogImage** : Social media presence - preview image when sharing on platforms like Twitter, Facebook (1200×630px recommended).

## Navigation configuration

The website navigation is divided into two parts: top navigation (`HEADER_LINKS`) and bottom navigation (`FOOTER-LINKS`).

```ts
export const HEADER_LINKS: Link[] = [
  {
    name: 'Posts',
    url: '/posts',
  },
  {
    name: 'Projects',
    url: '/projects',
  },
]

export const FOOTER_LINKS: Link[] = [
  {
    name: 'Readme',
    url: '/',
  },
  {
    name: 'Posts',
    url: '/posts',
  },
  {
    name: 'Projects',
    url: '/projects',
  },
  {
    name: 'Tags',
    url: '/tags',
  },
]

```

Configuration Description:

- **HEADER_LINKS**: Configure the main navigation bar at the top of the website, usually placing the most important and frequently used page links.
- **FOOTER-LINKS**: Configure the navigation links at the bottom of the website to include more auxiliary links and secondary entrances.
- Each navigation item is an object containing a name (display text) and a URL (link address).
- The link address should start with/, indicating the path relative to the website root directory.

## Social links

:::image-figure
![socia-link.png](~/assets/images/Basic-configuration/socia-link-light.png)(class:img-light)

![socia-link.png](~/assets/images/Basic-configuration/socia-link-dark.png)(class:img-dark noDarken)
:::

```ts
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'github',
    url: 'https://github.com/yourname',
    icon: 'icon-[ri--github-fill]',
    count: 9
  },
  {
    name: 'twitter',
    url: 'https://x.com/yourname',
    icon: 'icon-[ri--twitter-x-fill]',
  },
  {
    name: 'bilibili',
    url: 'https://space.bilibili.com/yourSpaceId',
    icon: 'icon-[ri--bilibili-fill]',
  },
]
```
