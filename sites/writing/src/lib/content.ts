import { readFile } from "node:fs/promises";

import { getContainerRenderer } from "@astrojs/mdx/container-renderer";
import { count } from "@wordpress/wordcount";
import { experimental_AstroContainer } from "astro/container";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { loadRenderers } from "astro:container";
import { type CollectionEntry, getCollection } from "astro:content";
import { Node, NodeType, parse } from "node-html-parser";
import sanitizeHtml, { type Attributes, type IOptions as SanitizeHtmlConfig, type Tag } from "sanitize-html";

import { markdownProcessor } from "../../astro.config";

const renderers = await loadRenderers([getContainerRenderer()]);
const container = await experimental_AstroContainer.create({ renderers });
const mdRenderer = await markdownProcessor.createRenderer({});

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
    const map = new Map<string, number>();

    const entires = await getValidWritingEntires();

    for (const entry of entires) {
        for (const tag of entry.data.tags) {
            map.set(tag, map.getOrInsert(tag, 0) + 1);
        }
    }

    const tags = [...map.entries()];
    tags.sort((a, b) => a[0].localeCompare(b[0], undefined));

    return tags;
}

export function coverArtAlt(entry: CollectionEntry<"writings">) {
    return `Cover art for '${entry.data.title}'`;
}

function transformAnchors(site: URL | string | undefined, tagName: string, attribs: Attributes): Tag {
    if (tagName == "a") {
        attribs["href"] = new URL(attribs["href"] ?? "", site).href;
    }

    return {
        tagName,
        attribs,
    };
}

function transformImages(site: URL | string | undefined, srcset: boolean, tagName: string, attribs: Attributes): Tag {
    if (tagName == "img" || tagName == "source") {
        if (attribs["src"]) {
            attribs["src"] = new URL(attribs["src"], site).href;
        }
        if (srcset && attribs["srcset"]) {
            attribs["srcset"] = attribs["srcset"]
                .split(",")
                .map((v) => {
                    const [uri, dim] = v.trim().split(" ");

                    return `${new URL(uri, site).href} ${dim}`;
                })
                .join(", ");
        }
    }

    return {
        tagName,
        attribs,
    };
}

export function sanitizeHtmlConfig(config: { site: URL | string | undefined; allowedTags?: string[]; srcset?: boolean }): SanitizeHtmlConfig {
    return {
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            img: (sanitizeHtml.defaults.allowedAttributes.img ?? []).concat(["data-original-src"]),
            source: (sanitizeHtml.defaults.allowedAttributes.source ?? []).concat(["srcset", "type"]),
        },
        transformTags: config.site
            ? {
                  a: (tagName, attribs) => transformAnchors(config.site, tagName, attribs),
                  img: (tagName, attribs) => transformImages(config.site, config.srcset ?? true, tagName, attribs),
              }
            : {},
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "details", "summary"]).concat(config.allowedTags ?? []),
    };
}

export const contentStyles = (await readFile("./common/assets/content.css")).toString();
