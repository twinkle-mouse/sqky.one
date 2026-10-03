import type { SatteriProcessorOptions } from "@astrojs/markdown-satteri";

import hastCleanBreaks from "./hast-clean-breaks";
import hardBreaks from "./mdast-hard-breaks";
import plainDirectives from "./mdast-plain-directives";
import preserveBlankSpace from "./mdast-preserve-blank-space";
import sectionize, { type Options as SectionizeOptions } from "./mdast-sectionize";

export type Options = {
    sectionize: SectionizeOptions;
};

export function createMarkdownConfig(options: Options = { sectionize: { maxDepth: 6 } }): SatteriProcessorOptions {
    return {
        mdastPlugins: [hardBreaks, preserveBlankSpace, plainDirectives, () => sectionize(options.sectionize)],
        hastPlugins: [hastCleanBreaks],
        features: {
            subscript: true,
            superscript: true,
            directive: true,
        },
    };
}

export const defaultMarkdownConfig = createMarkdownConfig();
