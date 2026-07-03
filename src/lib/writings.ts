import { getContainerRenderer } from "@astrojs/mdx/container-renderer";
import { count } from "@wordpress/wordcount";
import { experimental_AstroContainer } from "astro/container";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { loadRenderers } from "astro:container";
import { type CollectionEntry, getCollection } from "astro:content";
import { parse } from "node-html-parser";

import { markdownProcessor } from "../sites/writing.sqky.one/astro.config";

const renderers = await loadRenderers([getContainerRenderer()]);
const container = await experimental_AstroContainer.create({ renderers });
const mdRenderer = await markdownProcessor.createRenderer(markdownProcessor.options);

export const siteName = "Stardew Library";
export const siteDesc =
    "Stories of the stars in your heart, lyrics of the twinkles in your eyes — Inherit the earth like it was meant to be, welcome to the Stardew Library 💖";

const defaultDescription = "(no description)";

export async function renderMd(content: string | undefined | null) {
    return (await mdRenderer.render(content ?? "")).code.replaceAll("\n", "").replaceAll("\r", "");
}

export function htmlToTextContent(content: string | undefined | null) {
    const element = parse(content ?? "");
    return element.textContent;
}

export async function countWords(Content: AstroComponentFactory) {
    const body = await container.renderToString(Content);

    return count(body, "words", {});
}

export function cmpEntry<T extends { data: { date: Date } }>(a: T, b: T) {
    return b.data.date.valueOf() - a.data.date.valueOf();
}

export async function renderWritingFrontmatterMd(entry: CollectionEntry<"writings">) {
    entry.data.description = await renderMd(entry.data.description || defaultDescription);
    entry.data.cw = entry.data.cw ? await renderMd(entry.data.cw) : null;
}

export async function getWritingEntries() {
    const entries = (await getCollection("writings")).sort(cmpEntry);

    for (const entry of entries) {
        renderWritingFrontmatterMd(entry);
    }

    return entries;
}

export async function getValidWritingEntires() {
    return (await getWritingEntries()).filter((entry) => !entry.data.wip && !entry.data.redirect && entry.data.date.getTime() > 0);
}

export async function getNotesEntries() {
    return await getCollection("notes");
}

export function coverArtAlt(entry: CollectionEntry<"writings">) {
    return `Cover art for '${entry.data.title}'`;
}
