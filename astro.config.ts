import path from "node:path";

import mdx from "@astrojs/mdx";
import type { AstroUserConfig } from "astro";
import { defineConfig, envField } from "astro/config";
import type { MarkdownProcessor } from "astro/markdown";
import compressor from "astro-compressor";
import icon from "astro-icon";

import fonts from "./fonts";

const SITE_CONFIGS = new Map(Object.entries((await import("./site-configs.json")).default));
const SITE_CONFIG = process.env["SITE_CONFIG"] || "Main_SqkyOne";

const projectRoot = process.cwd();
const fontsDir = path.join(projectRoot, "fonts");
const sitesDir = path.join(projectRoot, "sites");

const sites = new Map(
    Object.entries(
        import.meta.glob<{
            config: AstroUserConfig;
            markdownProcessor: MarkdownProcessor;
        }>(`./*/astro.config.ts`, {
            base: "./sites",
        }),
    ).map(([path, value]) => [path.replace("./", "").split("/")[0], value]),
);

const sitePath = SITE_CONFIGS.get(SITE_CONFIG);
if (sitePath == undefined) {
    throw new Error(`Invalid site selection (couldn't get site path): ${SITE_CONFIG}`);
}

const resolvedSite = await sites.get(sitePath)?.();
if (resolvedSite == undefined) {
    throw new Error(`Invalid site selection (couldn't resolve config): ${SITE_CONFIG}`);
}

const { config, markdownProcessor } = resolvedSite;
if (config == undefined || markdownProcessor == undefined) {
    throw new Error(`Invalid site selection (config incomplete): ${SITE_CONFIG}`);
}

if (import.meta.env.DEV) {
    config.site = "https://testing.the.sqky.one";
}

export default defineConfig({
    ...config,

    srcDir: path.join(sitesDir, sitePath, "src"),
    publicDir: path.join(projectRoot, "public"),
    outDir: path.join(sitesDir, sitePath, "dist"),
    cacheDir: path.join(projectRoot, "node_modules", ".astro", sitePath),

    env: {
        schema: {
            FILES_ROOT_DIR: envField.string({ context: "server", access: "public", optional: true, default: "/mnt/shared/public/" }),
        },
    },

    experimental: {
        contentIntellisense: true,
        parallelPrerender: true,
    },

    devToolbar: {
        enabled: false,
    },

    i18n: undefined,

    image: {
        service: {
            entrypoint: "astro/assets/services/sharp",
            config: {
                png: {
                    compressionLevel: 9,
                },
                avif: {
                    chromaSubsampling: "4:2:0",
                    quality: 90,
                },
                webp: {
                    preset: "drawing",
                    nearLossless: true,
                    smartSubsample: true,
                    smartDeblock: true,
                    effort: 6,
                },
            },
        },
    },

    vite: {
        css: {
            transformer: "postcss",
        },
        cacheDir: path.join(projectRoot, "node_modules", ".vite"),
    },

    markdown: {
        ...(config.markdown || {}),
        processor: markdownProcessor,
    },

    integrations: [
        ...(config.integrations || []),
        mdx({}),
        icon({
            iconDir: path.join(projectRoot, "common", "icons"),
            svgoOptions: {
                plugins: ["preset-default", "removeTitle", "removeXMLNS", "removeXlink"],
            },
        }),
        compressor(),
    ],

    fonts: fonts(fontsDir),
});
