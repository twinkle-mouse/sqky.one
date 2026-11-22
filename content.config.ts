import fs from "node:fs/promises";
import path from "node:path";

import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const projectRoot = process.cwd();

const NOTO_EMOJI = path.join(projectRoot, "noto-emoji");
const WRITING_ENTRIES = path.join(projectRoot, "writing-entries");

const defaultWritingDescription = "(no description)";

const emojis = defineCollection({
    loader: async () => {
        const emojis: Record<string, object> = {};

        for await (const p of fs.glob(`${NOTO_EMOJI}/**/emoji_*.svg`)) {
            try {
                const id = path.basename(p, ".svg");
                const src = await fs.readFile(p, { encoding: "utf8" });

                emojis[id] = { src, optimized: false };
            } catch (err) {
                console.error(err);
            }
        }

        return emojis;
    },
    schema: () =>
        z.object({
            src: z.string(),
            optimized: z.boolean(),
        }),
});

const writings = defineCollection({
    loader: glob({ pattern: "*.mdx", base: `${WRITING_ENTRIES}/writings` }),
    schema: ({ image }) =>
        z
            .object({
                title: z.string(),
                cover: image().nullable().default(null),
                thumbnail: image().nullable().default(null),
                description: z.string().default(defaultWritingDescription),
                date: z.date().default(new Date(0)),
                mdate: z.date().optional(),
                authors: z.array(z.string()).default(["Stella Sparkles"]),
                tags: z.array(z.string()).default([]),
                cw: z.string().nullable().default(null),
                redirect: z.string().nullable().default(null),
                relations: z.record(z.string(), z.string()).default({}),
                ao3: z.number().nullable().default(null),
                web: z.boolean().default(false),
                wip: z.boolean().default(false),
            })
            .pipe(
                z.transform((val) => {
                    if (val.web) {
                        val.tags.unshift("should view on web");
                    }
                    return val;
                }),
            ),
});

const notes = defineCollection({
    loader: glob({ pattern: "*.mdx", base: `${WRITING_ENTRIES}/notes` }),
    schema: z.object({
        title: z.string(),
        relations: z.record(z.string(), z.string()).default({}),
        description: z.string().default(defaultWritingDescription),
    }),
});

const people = defineCollection({
    loader: glob({ pattern: "*.mdx", base: `${WRITING_ENTRIES}/people` }),
    schema: z.object({
        name: z.string(),
        bluesky: z.string().nullable().default(null),
        description: z.string().default(defaultWritingDescription),
    }),
});

export default { emojis, writings, notes, people };
