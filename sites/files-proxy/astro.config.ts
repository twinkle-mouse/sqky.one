// @ts-check
import { satteri } from "@astrojs/markdown-satteri";
import node from "@astrojs/node";
import { defaultMarkdownConfig } from "@sqky-one/common/lib/markdown";
import { defineConfig } from "astro/config";

// https://astro.build/config
export const config = defineConfig({
    site: "https://the.sqky.one",
    output: "server",
    adapter: node({
        mode: "standalone",
    }),
});

export const markdownProcessor = satteri({
    ...defaultMarkdownConfig,
});

export default { config, markdownProcessor };
