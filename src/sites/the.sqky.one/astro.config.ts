// @ts-check
import { satteri } from "@astrojs/markdown-satteri";
import node from "@astrojs/node";
import { defineConfig, envField } from "astro/config";

import { defaultMarkdownConfig } from "../../lib/markdown";

// https://astro.build/config
export default defineConfig({
    site: "https://the.sqky.one",
    output: "server",
    env: {
        schema: {
            ROOT_DIR: envField.string({ context: "server", access: "public", optional: false }),
        },
    },
    adapter: node({
        mode: "standalone",
    }),
});

export const markdownProcessor = satteri({
    ...defaultMarkdownConfig,
});
