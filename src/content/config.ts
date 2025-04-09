import { defineCollection, z } from "astro:content";

import { POSTS_CONFIG } from "@consts";
import type { HeroImageAspectRatio, HeroImageLayout } from "@types";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    recommend: z.boolean().default(false),
    author: z.string().default(POSTS_CONFIG.author),
    heroImage: z.string().optional().default(POSTS_CONFIG.defaultHeroImage),
    heroImageLayout: z.custom<HeroImageLayout>().optional(),
    heroImageAspectRatio: z.custom<HeroImageAspectRatio>().default(POSTS_CONFIG.defaultHeroImageAspectRatio),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts };
