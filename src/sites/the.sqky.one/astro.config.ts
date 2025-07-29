// @ts-check
import node from "@astrojs/node";
import { defineConfig, envField } from "astro/config";

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
