// @ts-check
import { satteri } from "@astrojs/markdown-satteri";
import { defineConfig } from "astro/config";

import { defaultMarkdownConfig } from "../../lib/markdown";

// https://astro.build/config
export default defineConfig({
    site: "https://writing.sqky.one",
});

export const markdownProcessor = satteri({
    ...defaultMarkdownConfig,
});
