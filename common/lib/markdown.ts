import type { SatteriProcessorOptions } from "@astrojs/markdown-satteri";

import hardBreaks from "./mdast-hard-breaks";
import preserveBlankSpace from "./mdast-preserve-blank-space";
import sectionize, { type Options as SectionizeOptions } from "./mdast-sectionize";

export type Options = {
    sectionize: SectionizeOptions;
};

export function createMarkdownConfig(options: Options = { sectionize: { maxDepth: 6 } }): SatteriProcessorOptions {
    return {
        mdastPlugins: [hardBreaks, preserveBlankSpace, sectionize(options.sectionize)],
        features: {
            subscript: true,
            superscript: true,
        },
    };
}

export const defaultMarkdownConfig = createMarkdownConfig();
