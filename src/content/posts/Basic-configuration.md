---
title: 'Basic configuration'
description: 'Basic setup instructions for Litos theme'
pubDate: 2025-05-03
tags: ['Configuration']
recommend: true
heroImage: 'Basic-configuration.png'
ogImage: 'Basic-configuration.png'
---

Welcome to the Litos theme configuration guide. All essential settings for your website are managed through the `src/config.ts` file. This comprehensive guide will walk you through each configuration section to help you customize your site effectively.

## Core Site Configuration

The `SITE` object contains fundamental settings that define your website's identity and metadata:

```ts title="src/config.ts"
export const SITE: Site = {
  title: 'Litos',        // Your website title
  description: 'Litos is a blog theme built with Astro.js and Dnzzk2.',  // Site description
  website: 'https://litos.vercel.app/',  // Your website URL
  base: '/',             // Base URL path (change if not deployed at root)
  author: 'Dnzzk2',      // Author name
  ogImage: '/og-image.jpg'  // Default Open Graph image for social sharing
}
```

Here's a detailed explanation of each configuration property:

| Property | Description | Details |
|---|---|---|
| **title** | Website Title | Displayed in browser tabs and search results, crucial for SEO and brand identity |
| **description** | Site Overview | Shown in search results and social media shares, should include keywords for SEO optimization |
| **website** | Production URL | Used for generating canonical links and ensuring proper URL resolution |
| **base** | Base Path | Keep as '/' when deployed at root, or set subdirectory (e.g., '/blog/') |
| **author** | Author Name | Used in meta tags and attribution information |
| **ogImage** | Default Social Media Preview Image | Image displayed when shared on social platforms (recommended size: 1200×630px) |

## Navigation Structure

Litos provides a dual-navigation system to enhance user experience and site accessibility. The navigation is split into two main components: header navigation (`HEADER_LINKS`) for primary routes and footer navigation (`FOOTER_LINKS`) for comprehensive site mapping.

### Header Navigation

The header navigation contains your most important and frequently accessed pages:

```ts title="src/config.ts"
export const HEADER_LINKS: Link[] = [
  {
    name: 'Posts',    // Display text in navigation
    url: '/posts',    // Route path
  },
  {
    name: 'Projects',
    url: '/projects',
  },
]
```

### Footer Navigation

The footer navigation provides a complete sitemap and additional important links:

```ts title="src/config.ts"
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

### Navigation Configuration Guide

Navigation Link Configuration Details:

| Property | Description | Usage |
|------|------|------|
| **name** | Display Text | The text shown in the navigation menu |
| **url** | Target Path | Must start with '/' for the target page path |

>[!tip]
>
> 1. Header Navigation: Focus on primary content sections
> 2. Footer Navigation: Include secondary pages and site resources
> 3. Path Settings: All paths are relative to the site root
> 4. Link Consistency: Ensure consistency between header and footer navigation links

## Social Media Integration

Litos includes a built-in social media integration feature that allows you to showcase your social media presence. The social links appear in a designated area of your site:

:::image-figure
![Social links appearance in light mode](~/assets/images/Basic-configuration/social-link-dark.png)(class:img-light)

![Social links appearance in dark mode](~/assets/images/Basic-configuration/social-link-light.png)(class:img-dark)
:::

Configure your social media links in the `src/config.ts` file:

```ts title="src/config.ts"
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'github',    // Platform identifier
    url: 'https://github.com/yourname',    // Your profile URL
    icon: 'icon-[ri--github-fill]',    // Iconify icon class
    count: 9    // Optional: follower count
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

Each social link object supports the following properties:

| Property | Description | Details |
|------|------|------|
| **name** | Platform Identifier | Used for internal reference and accessibility |
| **url** | Profile URL | Direct link to your profile page on the platform |
| **icon** | Icon Class Name | Icon class from [Iconify](https://icon-sets.iconify.design/), customizable through Tailwind CSS |
| **count** | Follower Count | Optional, displays follower count; automatically updates GitHub followers when GitHub integration is enabled |

> [!TIP]
>
> 1. Browse and select your preferred social media icons from [Iconify](https://icon-sets.iconify.design/)
> 2. Maintain consistent icon styles across all social links
> 3. Enable GitHub integration for automatic follower count updates
> 4. Test social links visibility in both light and dark theme modes

## Github configuration

:::image-figure
![spotlight.png](~/assets/images/Basic-configuration/spotlight-dark.png)(class:img-light)

![spotlight.png](~/assets/images/Basic-configuration/spotlight-light.png)(class:img-dark)
:::

When you visit the homepage, you'll notice the GitHub data display area (Spotlight) as shown in the image. This feature can be enabled through the following configuration.

### Obtaining a Github Token

1. Visit the [Github Token settings page](https://github.com/settings/tokens)
2. Click "Generate new token" > "Generate new token (classic)"
3. Set a Token name (Note)
4. Select the following required permissions:
   - `repo`: Full repository access permissions
   - `user`: Read user information permissions
5. Set an appropriate expiration time (Token expiration)
6. Click "Generate token" and save the generated Token

Create a `.env` file in the project root directory and add the following content:

```ts title=".env"
SECRET_GITHUB_TOKEN=YOUR_GITHUB_TOKEN
```

Replace `YOUR_GITHUB_TOKEN` with the Github Token you just generated.

### Configuration Details

Configure GitHub-related features in the `src/config.ts` file:

```ts title="src/config.ts"
export const GITHUB_CONFIG: GithubConfig = {
  ENABLED: true,
  CACHE_DURATION: 60 * 60 * 1.5 + 60 * 5,
  USE_MOCK_DATA_FOR_DEVELOPMENT: true,
}
```

Configuration options explained:

| Property | Description | Details |
|---|---|---|
| **ENABLED** | Enable GitHub Features | Type: boolean, Default: true. When enabled, displays Spotlight and automatically updates GitHub follower count in Social Links |
| **CACHE_DURATION** | GitHub Data Cache Duration | Type: number, Default: 5700 seconds. Calculated as: 1.5 hours (5400 seconds) + 5 minutes (300 seconds) |
| **USE_MOCK_DATA_FOR_DEVELOPMENT** | Development Mode Data Source | Type: boolean, Default: true. When enabled, uses mock data to avoid frequent GitHub API requests |

### Mock Data Configuration

If you choose to use mock data (`USE_MOCK_DATA_FOR_DEVELOPMENT: true`), you can set the data format in the `DEFAULT_GITHUB_RESPONSE` constant within the `src/pages/api/github.ts` file.

> [!TIP]
> To ensure correct mock data format, it's recommended to first fetch real data using an actual Token and copy the returned data structure as a template for mock data. This prevents display issues caused by mismatched data structures.
>
> Note: When GitHub integration is enabled, the actual follower count from your GitHub account takes precedence and automatically overrides github manually configured count in SOCIAL_LINKS configuration.

## Posts Configuration

Litos provides comprehensive configuration options for blog posts through the `POSTS_CONFIG` object in `src/config.ts`. This section covers post display settings, pagination, and layout options.

```ts title="src/config.ts"
export const POSTS_CONFIG: PostConfig = {
  title: 'Posts',
  description: 'Posts by Dnzzk2',
  author: 'Dnzzk2',
  homePageConfig: {
    size: 5,
    type: 'compact',
  },
  postPageConfig: {
    size: 10,
    type: 'image',
  },
  tagsPageConfig: {
    size: 10,
    type: 'time-line',
  },
  defaultHeroImage: '/og-image.jpg',
  defaultHeroImageAspectRatio: '16/9',
  imageDarkenInDark: true,
  readMoreText: 'Read more',
  prevPageText: 'Previous',
  nextPageText: 'Next',
  tocText: 'Catalogue',
  backToPostsText: 'Back to Posts',
  nextPostText: 'Next Post',
  prevPostText: 'Previous Post',
}
```

The following is a detailed explanation of the various properties in the POSTSCONFIG configuration object:

| Property | Description | Details |
|---|---|---|
| **title** | Posts Page Title | Displayed in the browser tab and search results |
| **description** | Posts Page Description | Used for SEO |
| **author** | Posts Author | Used in meta tags and attribution information |
| **homePageConfig** | Homepage Post Display Settings | Configures the display of posts on the homepage |
| &nbsp;&nbsp;size | Number of Posts per Page | The upper limit of displayed posts |
| &nbsp;&nbsp;type | Post Display Type | The card types displayed in the post list |
| **postPageConfig** | Individual Post Display Settings | Configures the display of individual posts |
| &nbsp;&nbsp;size | Number of Posts per Page | The number of pages in pagination |
| &nbsp;&nbsp;type | Post Display Type | The card types displayed in the post list |
| **tagsPageConfig** | Tags Page Display Settings | Configures the display of posts by tags |
| &nbsp;&nbsp;size | Number of Posts per Page | The number of pages in pagination |
| &nbsp;&nbsp;type | Post Display Type | The card types displayed in the post list |
| **defaultHeroImage** | Default Hero Image | The default cover image displayed in image mode in the post list |
| **defaultHeroImageAspectRatio** | Default Hero Image Aspect Ratio | The aspect ratio of the default cover image |
| **imageDarkenInDark** | Darken Hero Image in Dark Mode | Whether to darken the cover image in dark mode |
| **readMoreText** | Read More Text | The text content of "Read More" under the picture card |
| **prevPageText** | Previous Page Text | The text displayed on the previous page button |
| **nextPageText** | Next Page Text | The text displayed on the next page button |
| **tocText** | Table of Contents Text | The text displayed in the table of contents |
| **backToPostsText** | Back to Posts Text | The text displayed on the back to posts button |
| **nextPostText** | Next Post Text | The text displayed on the next post button |
| **prevPostText** | Previous Post Text | The text displayed on the previous post button |
