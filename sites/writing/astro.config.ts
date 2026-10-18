// @ts-check
import { satteri } from "@astrojs/markdown-satteri";
import sitemap from "@astrojs/sitemap";
import { defaultMarkdownConfig } from "@sqky-one/common/lib/markdown";
import { defineConfig } from "astro/config";

// https://astro.build/config
export const config = defineConfig({
    site: "https://writing.sqky.one",
    integrations: [
        sitemap({
            filter(page) {
                const pathname = new URL(page).pathname;
                if (pathname.startsWith("/wip")) {
                    return false;
                }
                return true;
            },
        }),
    ],
});

export const markdownProcessor = satteri({
    ...defaultMarkdownConfig,
});

export default { config, markdownProcessor };
