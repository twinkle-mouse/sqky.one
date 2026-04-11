import { getContainerRenderer } from "@astrojs/mdx";
import { count } from "@wordpress/wordcount";
import { experimental_AstroContainer } from "astro/container";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { loadRenderers } from "astro:container";

const renderers = await loadRenderers([getContainerRenderer()]);
const container = await experimental_AstroContainer.create({ renderers });

export const siteName = "Books of Squeaks";
export const siteDesc =
    "A place where I put all of my writings, or at least the ones I care enough to format and upload <3. Expect lots of emotions and vulnerability, and expect a hot personality.";

export async function countWords(Content: AstroComponentFactory) {
    const body = await container.renderToString(Content);

    return count(body, "words", {});
}
