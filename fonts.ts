import type { AstroUserConfig, FontProvider } from "astro";
import { fontProviders } from "astro/config";

const local = fontProviders.local();

type ExtractOptions<Type> = Type extends FontProvider<infer Options> ? Options : never;
type LocalFamilyOptions = ExtractOptions<typeof local>;
type Variants = LocalFamilyOptions["variants"];
type Variant = Variants[0];
type Weight = Variant["weight"];
type Style = Variant["style"];

const IosevkaWeights: [Weight, string][] = [
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

const IosevkaStyles: [Style, string][] = [
    ["normal", ""],
    ["italic", "Italic"],
];

function IosevkaVariants(fontsDir: string, name: string): Variants {
    return IosevkaWeights.flatMap<Variant>(([weight, weightName]) => {
        return IosevkaStyles.map(([style, styleName]) => {
            return {
                src: [fontsDir + `/${name}/${name}-${weightName}${styleName}.woff2`],
                style,
                weight,
            };
        });
    }) as Variants;
}

export default function fonts(fontsDir: string): Exclude<AstroUserConfig<never, never, Array<typeof local>>["fonts"], undefined> {
    return [
        {
            fallbacks: ["sans-serif"],
            optimizedFallbacks: false,
            provider: local,
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
            fallbacks: ["serif"],
            optimizedFallbacks: false,
            provider: local,
            name: "Besley",
            cssVariable: "--font-besley",
            options: {
                variants: [
                    {
                        style: "normal",
                        src: [fontsDir + "/Besley/Besley-VariableFont_wght.woff2"],
                        weight: "100 900",
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/Besley/Besley-Italic-VariableFont_wght.woff2"],
                        weight: "100 900",
                    },
                ],
            },
        },
        {
            fallbacks: ["monospace"],
            optimizedFallbacks: false,
            provider: local,
            name: "Iosevka Fixed Curly",
            cssVariable: "--font-iosevka-curly",
            options: {
                variants: IosevkaVariants(fontsDir, "IosevkaFixedCurly"),
            },
        },

        {
            fallbacks: [],
            provider: local,
            name: "IBM Plex Sans",
            cssVariable: "--font-ibm-plex-sans",
            options: {
                variants: [
                    {
                        style: "normal",
                        src: [fontsDir + "/IBM_Plex_Sans/IBMPlexSans-VariableFont_wdth,wght.woff2"],
                        weight: "100 900",
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/IBM_Plex_Sans/IBMPlexSans-Italic-VariableFont_wdth,wght.woff2"],
                        weight: "100 900",
                    },
                ],
            },
        },
        {
            fallbacks: [],
            provider: local,
            name: "Inter",
            cssVariable: "--font-inter",
            options: {
                variants: [
                    {
                        style: "normal",
                        src: [fontsDir + "/Inter/Inter-VariableFont_opsz,wght.woff2"],
                        weight: "100 900",
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/Inter/Inter-Italic-VariableFont_opsz,wght.woff2"],
                        weight: "100 900",
                    },
                ],
            },
        },
        {
            fallbacks: [],
            provider: local,
            name: "Noto Sans",
            cssVariable: "--font-noto-sans",
            options: {
                variants: [
                    {
                        style: "normal",
                        src: [fontsDir + "/Noto_Sans/NotoSans-VariableFont_wdth,wght.woff2"],
                        weight: "100 900",
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/Noto_Sans/NotoSans-Italic-VariableFont_wdth,wght.woff2"],
                        weight: "100 900",
                    },
                ],
            },
        },
        {
            fallbacks: [],
            provider: local,
            name: "Roboto",
            cssVariable: "--font-roboto",
            options: {
                variants: [
                    {
                        style: "normal",
                        src: [fontsDir + "/Roboto/Roboto-VariableFont_wdth,wght.woff2"],
                        weight: "100 900",
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/Roboto/Roboto-Italic-VariableFont_wdth,wght.woff2"],
                        weight: "100 900",
                    },
                ],
            },
        },
    ];
}
