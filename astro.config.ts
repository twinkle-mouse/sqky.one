export class Site {
    static Main = "Main_SqkyOne";
    static Writing = "Writing_SqkyOne";
    static Files = "Files_SqkyOne";
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
