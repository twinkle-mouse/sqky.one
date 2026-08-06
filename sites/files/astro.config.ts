// @ts-check
import { satteri } from "@astrojs/markdown-satteri";
import node from "@astrojs/node";
import { defaultMarkdownConfig } from "@sqky-one/common/lib/markdown";
import { defineConfig, envField } from "astro/config";

const filesServerName = process.env["FILES_SERVER_NAME"];

// https://astro.build/config
export const config = defineConfig({
    site: `https://${filesServerName}.sqky.one`,
    output: "server",
    env: {
        schema: {
            ROOT_DIR: envField.string({ context: "server", access: "public", optional: false }),
            FILES_SERVER_NAME: envField.string({ context: "server", access: "public", optional: false }),
        },
    },
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
