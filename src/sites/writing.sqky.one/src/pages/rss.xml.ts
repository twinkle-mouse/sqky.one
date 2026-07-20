import mdx from "@astrojs/mdx/server.js";
import rss from "@astrojs/rss";
import type { AstroGlobal } from "astro";
import { experimental_AstroContainer } from "astro/container";
import { render } from "astro:content";
import sanitizeHtml, { type Attributes, type Tag } from "sanitize-html";

import Picture from "$components/Picture.astro";
import { coverArtAlt, getValidWritingEntires, htmlToTextContent, normalizeHtml, siteDesc, siteName } from "$lib/writings";

import WritingDetails from "../components/WritingDetails.astro";

const container = await experimental_AstroContainer.create();
container.addServerRenderer({ renderer: mdx });

function transformLinks(context: AstroGlobal, tagName: string, attribs: Attributes): Tag {
    if (tagName == "a") {
        attribs["href"] = new URL(attribs["href"] ?? "", context.site).href;
    }

    if (tagName == "img" || tagName == "source") {
        if (attribs["src"]) {
            attribs["src"] = new URL(attribs["src"], context.site).href;
        }
        if (attribs["srcset"]) {
            attribs["srcset"] = attribs["srcset"]
                .split(",")
                .map((v) => {
                    const [uri, dim] = v.trim().split(" ");

                    return `${new URL(uri, context.site).href} ${dim}`;
                })
                .join(", ");
        }
    }

    return {
        tagName,
        attribs,
    };
}

export async function GET(context: AstroGlobal) {
    const writings = await getValidWritingEntires();
    const _transformLinks = (tagName: string, attribs: Attributes) => transformLinks(context, tagName, attribs);

    return rss({
        title: siteName,
        site: context.site!,
        description: siteDesc,
        xmlns: {
            atom: "http://www.w3.org/2005/Atom",
            dc: "http://purl.org/dc/elements/1.1/",
        },
        customData: [
            `<atom:link href="${new URL("rss.xml", context.site)}" rel="self" type="application/rss+xml" />`,
            "<webMaster>twinkle@sqky.one (Stella Sparkles)</webMaster>",
        ].join(""),
        items: await Promise.all(
            writings.map(async (entry) => {
                const { Content } = await render(entry);
                const content = normalizeHtml(
                    await container.renderToString(Content, {
                        props: { components: [] },
                    }),
                );
                const details = normalizeHtml(
                    await container.renderToString(WritingDetails, {
                        props: { entry: entry },
                    }),
                );

                let coverArt = "";
                if (entry.data.cover) {
                    coverArt = normalizeHtml(
                        await container.renderToString(Picture, {
                            props: {
                                src: entry.data.cover,
                                alt: coverArtAlt(entry),
                            },
                        }),
                    );
                }

                return {
                    title: entry.data.title,
                    description: htmlToTextContent(entry.data.description),
                    pubDate: entry.data.date,
                    categories: entry.data.tags,
                    link: `/writings/${entry.id}/`,
                    content: sanitizeHtml(details + coverArt + content, {
                        allowedAttributes: Object.fromEntries([
                            ...Object.entries(sanitizeHtml.defaults.allowedAttributes),
                            ...Object.entries({
                                source: ["srcset", "type"],
                            }),
                        ]),
                        transformTags: {
                            a: _transformLinks,
                            img: _transformLinks,
                            source: _transformLinks,
                        },
                        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "source", "picture", "details", "summary"]),
                    }),
                    customData: [...entry.data.authors.map((author) => `<dc:creator>${author}</dc:creator>`)].join(""),
                };
            }),
        ),
    });
}
