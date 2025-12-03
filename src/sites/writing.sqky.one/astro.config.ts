// @ts-check
import { defineConfig } from "astro/config";

import remarkSectionize from "./remark-sectionize";

// https://astro.build/config
export default defineConfig({
    site: "https://writing.sqky.one",
    markdown: {
        remarkPlugins: [remarkSectionize],
    },
});
