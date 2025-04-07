import { defineCollection, z } from "astro:content";

import { POSTS_CONFIG } from "@consts";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    choice: z.boolean().default(false),
    author: z.string().default(POSTS_CONFIG.author),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts };
