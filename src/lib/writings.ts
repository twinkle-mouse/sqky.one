import { getContainerRenderer } from "@astrojs/mdx/container-renderer";
import { count } from "@wordpress/wordcount";
import { experimental_AstroContainer } from "astro/container";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { loadRenderers } from "astro:container";
import { type CollectionEntry, getCollection } from "astro:content";
import { Node, NodeType, parse } from "node-html-parser";

import { markdownProcessor } from "../sites/writing.sqky.one/astro.config";

const renderers = await loadRenderers([getContainerRenderer()]);
const container = await experimental_AstroContainer.create({ renderers });
const mdRenderer = await markdownProcessor.createRenderer({});

export const siteName = "Stardew Library";
export const siteDesc =
    "Stories of the stars in your heart, lyrics of the twinkles in your eyes — Inherit the earth like it was meant to be, welcome to the Stardew Library 💖";

const defaultDescription = "(no description)";

function flattenTreeDepthFirst(rootNode: Node) {
    const nodes = [];
    const queue: Node[][] = [];

    if (rootNode.childNodes) {
        queue.push(rootNode.childNodes);
    }

    while (queue.length > 0) {
        const children = queue[0];
        if (children.length > 0) {
            const child = children.shift()!;
            if (children.length < 1) {
                queue.shift();
            }
            if (child.childNodes && child.childNodes.length > 0) {
                queue.unshift(child.childNodes);
            }
            nodes.push(child);
        }
    }

    return nodes;
}

export function normalizeHtml(content: string | undefined | null) {
    return (content ?? "")
        .trim()
        .replaceAll("&lt;", "<") // unescape
        .replaceAll("&gt;", ">")
        .replaceAll("\r", "") // remove \r
        .replaceAll("\n", " "); // replace \n with a space, it wouldn't render in HTML but it can be used in `htmlToTextContent`;
}

export async function renderMd(content: string | undefined | null) {
    const rendered = await mdRenderer.render(content ?? "");

    return normalizeHtml(rendered.code);
}

export function htmlToTextContent(content: string | undefined | null) {
    const element = parse(content ?? "");
    const flatChildren = flattenTreeDepthFirst(element);

    let text = "";
    for (const child of flatChildren) {
        if (child.rawTagName == "br") {
            text += "\n";
            continue;
        }

        if (child.nodeType == NodeType.TEXT_NODE) {
            text += child.textContent;
        }

        if (child.rawTagName == "p") {
            text += "\n\n";
        }
    }

    return text.trim();
}

export async function countWords(Content: AstroComponentFactory) {
    const body = htmlToTextContent(await container.renderToString(Content));

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

export async function getAllTags() {
    const tags = [...new Set((await getValidWritingEntires()).flatMap((entry) => entry.data.tags)).values()];
    tags.sort();

    return tags;
}

export function coverArtAlt(entry: CollectionEntry<"writings">) {
    return `Cover art for '${entry.data.title}'`;
}
