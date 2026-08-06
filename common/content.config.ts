import fs from "node:fs/promises";
import path from "node:path";

import { defineCollection } from "astro:content";

const emojis = defineCollection({
    loader: async () => {
        const emojis: Record<string, { src: string }> = {};

        for await (const p of fs.glob("noto-emoji/**/emoji_*.svg")) {
            try {
                const data = await fs.readFile(p, { encoding: "utf8" });
                const str = data.trim().replaceAll("\n", "");

                emojis[path.basename(p, ".svg")] = { src: str };
            } catch (err) {
                console.error(err);
            }
        }

        return emojis;
    },
});

export const collections = { emojis };
