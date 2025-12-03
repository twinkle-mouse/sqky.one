import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

import { collections as parent } from "$src/content.config";

const ROOT = "./src/sites/writing.sqky.one";

const writings = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: `${ROOT}/src/writings` }),
    schema: z.object({
        title: z.string(),
        description: z.string().nullable().default(null),
        date: z.coerce.date(),
        authors: z.array(z.string()).default(["Stella Sparkles"]),
        tags: z.array(z.string()).default([]),
    }),
});

export const collections = { writings, ...parent };
