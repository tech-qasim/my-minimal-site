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
![social-link.png](~/assets/images/Basic-configuration/social-link-dark.png)(class:img-light)

![social-link.png](~/assets/images/Basic-configuration/social-link-light.png)(class:img-dark)
:::

The area enclosed by a rectangle in `social-link.png` is the location of Social-Links.

The following is the configuration of the content in this area:

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

- **name**: The name of the social media platform, used for display purposes.
- **url**: The URL of the social media platform.
- **icon**: The icon of the social media platform, using the [Iconify](https://icon-sets.iconify.design/). This is a class, and you can also modify the style of the icon through tailwindcss.
- **count?**: The number of followers or subscribers of the social media platform.

## Github Configuration

:::image-figure
![spotlight.png](~/assets/images/Basic-configuration/spotlight-dark.png)(class:img-light)

![spotlight.png](~/assets/images/Basic-configuration/spotlight-light.png)(class:img-dark)
:::

When you are on the homepage, you can see the spotlight in the picture, which is enabled through the settings below:

```ts
export const GITHUB_CONFIG: GithubConfig = {
  ENABLED: true,
  CACHE_DURATION: 60 * 60 * 1.5 + 60 * 5,
  USE_MOCK_DATA_FOR_DEVELOPMENT: true,
}
```

- **ENABLED**: Whether to enable the spotlight feature.
- **CACHE_DURATION**: The cache duration of the spotlight data, in seconds.
- **USE_MOCK_DATA_FOR_DEVELOPMENT**: Whether to use mock data for development.

If **ENABLED** is true, the spotlight will be displayed and the number of followers on GitHub in [**Social links**](/posts/basic-configuration#social-links) will replace the count set in the settings. That is to say, in this case, the count priority in the settings is the lowest. Of course, it only affects the number of followers on GitHub.

If **USE_MOCK_DATA_FOR_DEVELOPMENT** is true, Mock's GitHub data will be used for display. If false, then real GitHub data will be used.

You can set the mock data in the **DEFAULT_GITHUB_RESPONSE** constant in the `src/pages/api/github.ts` file.

> [!Warning]
> The format of the default data you set should be correct, just like the default data I set (which can be seen in the project code, so I won't go into detail here, it's too long 😊).
>
> If you want to obtain the correct data, my suggestion is to request and print the obtained data once, and then copy these data into mock data.

## Posts Configuration
