// @ts-check
import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";

import remarkSectionize from "./remark-sectionize";

// https://astro.build/config
export default defineConfig({
    site: "https://writing.sqky.one",
    markdown: {
        remarkPlugins: [remarkSectionize],
    },
    integrations: [mdx({})],
});
