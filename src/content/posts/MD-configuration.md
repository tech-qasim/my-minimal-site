---
title: 'Markdown Configuration'
description: 'Comprehensive guide for Markdown configuration in Litos theme'
pubDate: 2025-05-01
tags: ['Configuration']
heroImage: 'MD-Configuration.png'
ogImage: 'MD-Configuration.png'
---

This document provides a comprehensive guide for Markdown configuration in the Litos theme, including front matter settings and image display options.

## Create a New Post

To create a new Markdown file, follow these steps:

1. Navigate to the `src/content/posts` directory.
2. Create a new Markdown file with a `.md` extension.

## Front Matter Configuration

The front matter in Markdown files is managed through Astro Content Collections, which enforces a consistent structure across all posts. Below is a detailed specification of available front matter properties:

```md
---
title: 'Your Post Title'
description: 'A brief description of your post'
pubDate: 2025-05-01
updatedDate: 2025-05-01
author: 'Dnzzk2' 
recommend: false 
heroImage: 'image-filename.png'
ogImage: 'og-image-filename.png'
heroImageLayout: 'left'
heroImageAspectRatio: '16/9'
tags: ['tag1', 'tag2']
---
```

### Property Specifications

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| title | string | Yes | - | The main heading of your article, displayed prominently on the article page and in post listings |
| description | string | Yes | - | A concise summary of your post, used for SEO optimization and social media preview cards |
| pubDate | Date | Yes | - | Publication date in YYYY-MM-DD format |
| updatedDate | Date | No | - | Last modification date in YYYY-MM-DD format |
| author | string | No | - | Content creator's name; falls back to site's default author if unspecified |
| recommend | boolean | No | false | Enables featured status for the post, adding a special recommendation indicator |
| heroImage | string | No | - | Featured image filename (stored in `public/hero-images/`) or external URL |
| ogImage | string | No | - | Social media preview image (stored in `public/og-images/`) or external URL |
| heroImageLayout | string | No | - | Image positioning ('left' or 'right') for post listings; takes precedence when post list type is 'image' |
| heroImageAspectRatio | string | No | '16/9' | Image aspect ratio, supports '16/9' or '3/4' |
| tags | string[] | No | [] | Array of keywords for content categorization and navigation |

## Image Display Configuration

When the post list type is set to `image`, the theme provides flexible image handling:

- If `heroImage` is not specified, the system uses `defaultHeroImage` from `POSTS_CONFIG` in `config.ts`
- If `ogImage` is omitted, the site's default `ogimage` is applied

### Display Variations

The theme supports three distinct image display styles based on the `heroImage` configuration:

1. Without Hero Image:
:::image-figure[noImage]
![](~/assets/images/md-configuration/noImage-dark.png)(class:img-light)

![](~/assets/images/md-configuration/noImage-light.png)(class:img-dark)
:::

2. With Hero Image (Default 16/9 Ratio):
:::image-figure[16/9]
![](~/assets/images/md-configuration/image-16-9-dark.png)(class:img-light)

![](~/assets/images/md-configuration/image-16-9-light.png)(class:img-dark)
:::

3. With Hero Image (3/4 Ratio):
:::image-figure[3/4]
![](~/assets/images/md-configuration/image-3-4-dark.png)(class:img-light)

![](~/assets/images/md-configuration/image-3-4-light.png)(class:img-dark)
:::

> [!note]
> The aspect ratios '3/4' and '16/9' serve as indicators for vertical or horizontal orientation rather than strict dimensional requirements. However, using images that closely match these ratios will prevent distortion.
>
> For consistency in post listings, the theme enforces fixed 3/4 or 16/9 ratios regardless of the original image dimensions.
