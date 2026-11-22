// @ts-check
import { satteri } from "@astrojs/markdown-satteri";
import node from "@astrojs/node";
import { defaultMarkdownConfig } from "@sqky-one/common/lib/markdown";
import { defineConfig } from "astro/config";

const filesServerName = process.env["FILES_SERVER_NAME"];

// https://astro.build/config
export const config = defineConfig({
    site: `https://${filesServerName}.sqky.one`,
    output: "server",
    adapter: node({
        mode: "standalone",
    }),
    prefetch: {
        prefetchAll: false,
        defaultStrategy: "load",
    },
});

export const markdownProcessor = satteri({
    ...defaultMarkdownConfig,
});

export default { config, markdownProcessor };
