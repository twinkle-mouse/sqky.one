import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const WRITING = "./src/sites/writing.sqky.one";

const writings = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: `${WRITING}/src/writings` }),
    schema: z.object({
        title: z.string(),
        description: z.string().nullable().default(null),
        date: z.coerce.date(),
        authors: z.array(z.string()).default(["Madeline Sparkles"]),
        tags: z.array(z.string()).default([]),
    }),
});

export const collections = { writings };
