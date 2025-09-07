export class Site {
    static Main = "Main_SqkyOne";
    static Writing = "Writing_SqkyOne";
    static Files = "Files_TheSqkyOne";
}
export const site = process.env["SITE_CONFIG"] || Site.Main;

import path from "node:path";

import { defineConfig } from "astro/config";

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
    vite: {
        css: {
            transformer: "postcss",
        },
        cacheDir: path.join(dir, "node_modules", ".vite"),
    },
    experimental: {
        preserveScriptOrder: true,
        fonts: [
            {
                fallbacks: [],
                provider: "local",
                name: "Iosevka Aile Web",
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
                name: "Iosevka Curly Slab Web",
                cssVariable: "--font-iosevka-curly-slab",
                variants: [
                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-Thin.woff2"],
                        weight: 100,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-ThinItalic.woff2"],
                        weight: 100,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-ThinOblique.woff2"],
                        weight: 100,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-ExtraLight.woff2"],
                        weight: 200,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-ExtraLightItalic.woff2"],
                        weight: 200,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-ExtraLightOblique.woff2"],
                        weight: 200,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-Light.woff2"],
                        weight: 300,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-LightItalic.woff2"],
                        weight: 300,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-LightOblique.woff2"],
                        weight: 300,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-Regular.woff2"],
                        weight: 400,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-Italic.woff2"],
                        weight: 400,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-Oblique.woff2"],
                        weight: 400,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-Medium.woff2"],
                        weight: 500,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-MediumItalic.woff2"],
                        weight: 500,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-MediumOblique.woff2"],
                        weight: 500,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-SemiBold.woff2"],
                        weight: 600,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-SemiBoldItalic.woff2"],
                        weight: 600,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-SemiBoldOblique.woff2"],
                        weight: 600,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-Bold.woff2"],
                        weight: 700,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-BoldItalic.woff2"],
                        weight: 700,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-BoldOblique.woff2"],
                        weight: 700,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-ExtraBold.woff2"],
                        weight: 800,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-ExtraBoldItalic.woff2"],
                        weight: 800,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-ExtraBoldOblique.woff2"],
                        weight: 800,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-Heavy.woff2"],
                        weight: 900,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-HeavyItalic.woff2"],
                        weight: 900,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaCurlySlab/WOFF2/IosevkaCurlySlab-HeavyOblique.woff2"],
                        weight: 900,
                    },
                ],
            },
            {
                fallbacks: [],
                provider: "local",
                name: "Iosevka Etoile Web",
                cssVariable: "--font-iosevka-etoile",
                variants: [
                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-Thin.woff2"],
                        weight: 100,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-ThinItalic.woff2"],
                        weight: 100,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-ThinOblique.woff2"],
                        weight: 100,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-ExtraLight.woff2"],
                        weight: 200,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-ExtraLightItalic.woff2"],
                        weight: 200,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-ExtraLightOblique.woff2"],
                        weight: 200,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-Light.woff2"],
                        weight: 300,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-LightItalic.woff2"],
                        weight: 300,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-LightOblique.woff2"],
                        weight: 300,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-Regular.woff2"],
                        weight: 400,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-Italic.woff2"],
                        weight: 400,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-Oblique.woff2"],
                        weight: 400,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-Medium.woff2"],
                        weight: 500,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-MediumItalic.woff2"],
                        weight: 500,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-MediumOblique.woff2"],
                        weight: 500,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-SemiBold.woff2"],
                        weight: 600,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-SemiBoldItalic.woff2"],
                        weight: 600,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-SemiBoldOblique.woff2"],
                        weight: 600,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-Bold.woff2"],
                        weight: 700,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-BoldItalic.woff2"],
                        weight: 700,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-BoldOblique.woff2"],
                        weight: 700,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-ExtraBold.woff2"],
                        weight: 800,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-ExtraBoldItalic.woff2"],
                        weight: 800,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-ExtraBoldOblique.woff2"],
                        weight: 800,
                    },

                    {
                        style: "normal",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-Heavy.woff2"],
                        weight: 900,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-HeavyItalic.woff2"],
                        weight: 900,
                    },
                    {
                        style: "oblique",
                        src: [fontsDir + "/IosevkaEtoile/WOFF2/IosevkaEtoile-HeavyOblique.woff2"],
                        weight: 900,
                    },
                ],
            },
        ],
    },
});
