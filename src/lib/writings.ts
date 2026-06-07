import { getContainerRenderer } from "@astrojs/mdx/container-renderer";
import { count } from "@wordpress/wordcount";
import { experimental_AstroContainer } from "astro/container";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { loadRenderers } from "astro:container";
import { getCollection } from "astro:content";

const renderers = await loadRenderers([getContainerRenderer()]);
const container = await experimental_AstroContainer.create({ renderers });

export const siteName = "Books of Squeaks";
export const siteDesc =
    "A place where I put all of my writings, or at least the ones I care enough to format and upload <3. Expect lots of emotions and vulnerability, and expect a hot personality.";

export const defaultDescription = "(no description)";

export async function countWords(Content: AstroComponentFactory) {
    const body = await container.renderToString(Content);

    return count(body, "words", {});
}

export function cmpEntry<T extends { data: { date: Date } }>(a: T, b: T) {
    return b.data.date.valueOf() - a.data.date.valueOf();
}

export async function getWritingEntries() {
    return (await getCollection("writings")).filter((writing) => !writing.data.wip).sort(cmpEntry);
}

export async function getNotesEntries() {
    return await getCollection("notes");
}
