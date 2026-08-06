import path from "node:path";

import mdx from "@astrojs/mdx";
import type { AstroUserConfig } from "astro";
import { defineConfig, fontProviders } from "astro/config";
import type { MarkdownProcessor } from "astro/markdown";
import compressor from "astro-compressor";
import icon from "astro-icon";

function processSitePath(path: string) {
    return path.replace("./", "").split("/")[0];
}

const dir = process.cwd();
const fontsDir = path.join(dir, "fonts");
const sitesDir = path.join(dir, "sites");

const globbedSites = import.meta.glob<{ config: AstroUserConfig; markdownProcessor: MarkdownProcessor }>(`./*/astro.config.ts`, { base: "./sites" });
const sites = new Map(Object.entries(globbedSites).map(([key, value]) => [processSitePath(key), value]));

export class Site {
    static Main = "Main_SqkyOne";
    static Files = "Files_SqkyOne";
    static FilesProxy = "The_SqkyOne";
    static Writing = "Writing_SqkyOne";
}

export const siteConfig = process.env["SITE_CONFIG"] || Site.Main;
let sitePath = undefined;

if (siteConfig === Site.Main) {
    sitePath = "main";
}
if (siteConfig === Site.Writing) {
    sitePath = "writing";
}
if (siteConfig === Site.Files) {
    sitePath = "files";
}
if (siteConfig === Site.FilesProxy) {
    sitePath = "files-proxy";
}

if (sitePath == undefined) {
    throw new Error(`Invalid site selection: ${siteConfig}`);
}

const resolvedSite = await sites.get(sitePath)?.();

if (resolvedSite == undefined) {
    throw new Error(`Invalid site selection: ${siteConfig}`);
}

const { config, markdownProcessor } = resolvedSite;
config.srcDir = path.join(sitesDir, sitePath, "src");
config.outDir = path.join(sitesDir, sitePath, "dist");

if (config == undefined || markdownProcessor == undefined) {
    throw new Error(`Invalid site selection: ${siteConfig}`);
}

if (import.meta.env.DEV) {
    config.site = "https://testing.the.sqky.one";
}

const IosevkaWeights = {
    100: "Thin",
    200: "ExtraLight",
    300: "Light",
    400: "Regular",
    500: "Medium",
    600: "SemiBold",
    700: "Bold",
    800: "ExtraBold",
    900: "Heavy",
};

const IosevkaStyles = {
    normal: "",
    italic: "Italic",
};

type Source =
    | string
    | URL
    | {
          url: string | URL;
          tech?: string | undefined;
      };

type Variant = {
    src: [Source, ...Source[]];
    style: "normal" | "italic" | "oblique" | undefined;
    weight: string;
};

function IosevkaFixedCurlyVariants(): [Variant, ...Variant[]] {
    return Object.entries(IosevkaWeights).flatMap(([weight, weightName]) => {
        return Object.entries(IosevkaStyles).map(([style, styleName]) => {
            return {
                src: [fontsDir + `/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-${weightName}${styleName}.woff2`] as [Source, ...Source[]],
                style,
                weight,
            };
        });
    }) as [Variant, ...Variant[]];
}

export default defineConfig({
    ...config,

    devToolbar: {
        enabled: false,
    },

    i18n: undefined,

    build: {
        inlineStylesheets: "always",
    },

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
        cacheDir: path.join(dir, "node_modules", ".vite"),
    },

    markdown: {
        ...(config.markdown || {}),
        processor: markdownProcessor,
    },

    integrations: [
        ...(config.integrations || []),
        mdx({}),
        icon({
            iconDir: path.join(dir, "common/icons"),
        }),
        compressor(),
    ],

    fonts: [
        {
            fallbacks: [],
            provider: fontProviders.local(),
            name: "noseyrodent",
            cssVariable: "--font-noseyrodent",
            options: {
                variants: [
                    {
                        style: "normal",
                        src: [fontsDir + "/noseyrodent/noseyrodent-Regular.woff2"],
                        weight: 400,
                    },
                    {
                        style: "normal",
                        src: [fontsDir + "/noseyrodent/noseyrodent-Bold.woff2"],
                        weight: 700,
                    },
                ],
            },
        },
        {
            fallbacks: [],
            provider: fontProviders.local(),
            name: "Besley",
            cssVariable: "--font-besley",
            options: {
                variants: [
                    {
                        style: "normal",
                        src: [fontsDir + "/Besley/Besley-VariableFont_wght.ttf"],
                        weight: 400,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/Besley/Besley-Italic-VariableFont_wght.ttf"],
                        weight: 400,
                    },
                ],
            },
        },
        {
            fallbacks: [],
            provider: fontProviders.local(),
            name: "Iosevka Fixed Curly",
            cssVariable: "--font-iosevka-curly",
            options: {
                variants: IosevkaFixedCurlyVariants(),
            },
        },
    ],
});
