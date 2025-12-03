export class Site {
    static Main = "Main_SqkyOne";
    static Writing = "Writing_SqkyOne";
    static Files = "Files_TheSqkyOne";
}
export const site = process.env["SITE_CONFIG"] || Site.Main;

import path from "node:path";

import mdx from "@astrojs/mdx";
import { defineConfig, fontProviders } from "astro/config";
import compressor from "astro-compressor";
import icon from "astro-icon";

import mainSite from "./src/sites/sqky.one/astro.config";
import theSqkyOne from "./src/sites/the.sqky.one/astro.config";
import writing from "./src/sites/writing.sqky.one/astro.config";

const dir = process.cwd();
const fontsDir = path.join(dir, "fonts");
const sitesDir = path.join(dir, "src", "sites");

function getConfig() {
    if (site === Site.Main) {
        return { ...mainSite, srcDir: path.join(sitesDir, "sqky.one", "src") };
    }
    if (site === Site.Writing) {
        return { ...writing, srcDir: path.join(sitesDir, "writing.sqky.one", "src") };
    }
    if (site === Site.Files) {
        return { ...theSqkyOne, srcDir: path.join(sitesDir, "the.sqky.one", "src") };
    }

    throw new Error(`Invalid site selection: ${site}`);
}
const config = getConfig();

const IosevkaWeights: [number, string][] = [
    [100, "Thin"],
    [200, "ExtraLight"],
    [300, "Light"],
    [400, "Regular"],
    [500, "Medium"],
    [600, "SemiBold"],
    [700, "Bold"],
    [800, "ExtraBold"],
    [900, "Heavy"],
];

const IosevkaStyles: [string, string][] = [
    ["normal", ""],
    ["italic", "Italic"],
];

export default defineConfig({
    ...config,

    devToolbar: {
        enabled: false,
    },

    build: {
        inlineStylesheets: "always",
    },

    vite: {
        css: {
            transformer: "postcss",
        },
        cacheDir: path.join(dir, "node_modules", ".vite"),
    },

    integrations: [
        ...(config.integrations || []),
        mdx({}),
        icon({
            iconDir: "./icons",
            svgoOptions: { plugins: [] },
        }),
        compressor(),
    ],

    experimental: {
        preserveScriptOrder: true,
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
                name: "Iosevka Aile",
                cssVariable: "--font-iosevka-aile",
                options: {
                    variants: IosevkaWeights.flatMap(([weight, weightName]) => {
                        return IosevkaStyles.map(([style, styleName]) => {
                            return {
                                style,
                                src: [fontsDir + `/IosevkaAile/WOFF2/IosevkaAile-${weightName}${styleName}.woff2`],
                                weight,
                            };
                        });
                    }),
                },
            },
            {
                fallbacks: [],
                provider: fontProviders.local(),
                name: "Iosevka Fixed Curly",
                cssVariable: "--font-iosevka-curly",
                options: {
                    variants: IosevkaWeights.flatMap(([weight, weightName]) => {
                        return IosevkaStyles.map(([style, styleName]) => {
                            return {
                                style,
                                src: [fontsDir + `/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-${weightName}${styleName}.woff2`],
                                weight,
                            };
                        });
                    }),
                },
            },
        ],
    },
});
