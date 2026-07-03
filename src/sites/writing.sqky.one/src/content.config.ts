import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

import { collections as parent } from "$content.config";

const ROOT = "./src/sites/writing.sqky.one";

const writings = defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: `${ROOT}/src/entries/writings` }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            cover: image().nullable().default(null),
            thumbnail: image().nullable().default(null),
            description: z.string().nullable().default(null),
            date: z.coerce.date().default(new Date(0)),
            authors: z.array(z.string()).default(["Stella Sparkles"]),
            tags: z.array(z.string()).default([]),
            cw: z.string().nullable().default(null),
            redirect: z.string().nullable().default(null),
            relations: z.record(z.string(), z.string()).default({}),
            wip: z.boolean().default(false),
        }),
});

const notes = defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: `${ROOT}/src/entries/notes` }),
    schema: z.object({
        title: z.string(),
        relations: z.record(z.string(), z.string()).default({}),
    }),
});

const people = defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: `${ROOT}/src/entries/people` }),
    schema: z.object({
        name: z.string(),
        bluesky: z.string().nullable().default(null),
    }),
});

export const collections = { writings, notes, people, ...parent };
