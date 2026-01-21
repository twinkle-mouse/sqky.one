export class Site {
    static Main = "Main_SqkyOne";
    static Writing = "Writing_SqkyOne";
    static Files = "Files_TheSqkyOne";
}
export const site = process.env["SITE_CONFIG"] || Site.Main;

import path from "node:path";

import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";
import compressor from "astro-compressor";
import icon from "astro-icon";

import mainSite from "./src/sites/sqky.one/astro.config";
import theSqkyOne from "./src/sites/the.sqky.one/astro.config";
import writing from "./src/sites/writing.sqky.one/astro.config";

const dir = process.cwd();
const fontsDir = path.join(dir, "fonts");
const sitesDir = path.join(dir, "src", "sites");

function getConfig(): object {
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
        //@ts-expect-error astro config type doesn't make sense to import
        ...(config.integrations || []),
        mdx({}),
        icon({
            iconDir: "./icons",
        }),
        compressor(),
    ],

    experimental: {
        preserveScriptOrder: true,
        fonts: [
            {
                fallbacks: [],
                provider: "local",
                name: "noseyrodent",
                cssVariable: "--font-noseyrodent",
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
            {
                fallbacks: [],
                provider: "local",
                name: "Iosevka Aile",
                cssVariable: "--font-iosevka-aile",
                variants: [
                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-Thin.woff2"],
                        weight: 100,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-ThinItalic.woff2"],
                        weight: 100,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-ThinOblique.woff2"],
                        weight: 100,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-ExtraLight.woff2"],
                        weight: 200,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-ExtraLightItalic.woff2"],
                        weight: 200,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-ExtraLightOblique.woff2"],
                        weight: 200,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-Light.woff2"],
                        weight: 300,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-LightItalic.woff2"],
                        weight: 300,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-LightOblique.woff2"],
                        weight: 300,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-Regular.woff2"],
                        weight: 400,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-Italic.woff2"],
                        weight: 400,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-Oblique.woff2"],
                        weight: 400,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-Medium.woff2"],
                        weight: 500,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-MediumItalic.woff2"],
                        weight: 500,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-MediumOblique.woff2"],
                        weight: 500,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-SemiBold.woff2"],
                        weight: 600,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-SemiBoldItalic.woff2"],
                        weight: 600,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-SemiBoldOblique.woff2"],
                        weight: 600,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-Bold.woff2"],
                        weight: 700,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-BoldItalic.woff2"],
                        weight: 700,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-BoldOblique.woff2"],
                        weight: 700,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-ExtraBold.woff2"],
                        weight: 800,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-ExtraBoldItalic.woff2"],
                        weight: 800,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-ExtraBoldOblique.woff2"],
                        weight: 800,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-Heavy.woff2"],
                        weight: 900,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-HeavyItalic.woff2"],
                        weight: 900,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaAile/WOFF2/IosevkaAile-HeavyOblique.woff2"],
                        weight: 900,
                    },
                ],
            },
            {
                fallbacks: [],
                provider: "local",
                name: "Iosevka Fixed Curly",
                cssVariable: "--font-iosevka-curly",
                variants: [
                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-Thin.woff2"],
                        weight: 100,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-ThinItalic.woff2"],
                        weight: 100,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-ThinOblique.woff2"],
                        weight: 100,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-ExtraLight.woff2"],
                        weight: 200,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-ExtraLightItalic.woff2"],
                        weight: 200,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-ExtraLightOblique.woff2"],
                        weight: 200,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-Light.woff2"],
                        weight: 300,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-LightItalic.woff2"],
                        weight: 300,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-LightOblique.woff2"],
                        weight: 300,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-Regular.woff2"],
                        weight: 400,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-Italic.woff2"],
                        weight: 400,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-Oblique.woff2"],
                        weight: 400,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-Medium.woff2"],
                        weight: 500,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-MediumItalic.woff2"],
                        weight: 500,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-MediumOblique.woff2"],
                        weight: 500,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-SemiBold.woff2"],
                        weight: 600,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-SemiBoldItalic.woff2"],
                        weight: 600,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-SemiBoldOblique.woff2"],
                        weight: 600,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-Bold.woff2"],
                        weight: 700,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-BoldItalic.woff2"],
                        weight: 700,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-BoldOblique.woff2"],
                        weight: 700,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-ExtraBold.woff2"],
                        weight: 800,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-ExtraBoldItalic.woff2"],
                        weight: 800,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-ExtraBoldOblique.woff2"],
                        weight: 800,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-Heavy.woff2"],
                        weight: 900,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-HeavyItalic.woff2"],
                        weight: 900,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-HeavyOblique.woff2"],
                        weight: 900,
                    },
                ],
            },
        ],
    },
});
