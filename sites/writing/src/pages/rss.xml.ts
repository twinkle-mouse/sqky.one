import mdx from "@astrojs/mdx/server.js";
import rss from "@astrojs/rss";
import Picture from "@sqky-one/common/components/Picture.astro";
import WritingDetails from "@sqky-one/writing/components/WritingDetails.astro";
import { coverArtAlt, getValidWritingEntires, htmlToTextContent, normalizeHtml, sanitizeHtmlConfig } from "@sqky-one/writing/lib/content";
import { siteDesc, siteName } from "@sqky-one/writing/lib/page";
import type { AstroGlobal } from "astro";
import { experimental_AstroContainer } from "astro/container";
import { render } from "astro:content";
import sanitizeHtml from "sanitize-html";

const container = await experimental_AstroContainer.create();
container.addServerRenderer({ renderer: mdx });

export async function GET(context: AstroGlobal) {
    const writings = await getValidWritingEntires();

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
                        props: {},
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
                        ...sanitizeHtmlConfig({ site: context.site }),
                    }),
                    customData: [...entry.data.authors.map((author) => `<dc:creator>${author}</dc:creator>`)].join(""),
                };
            }),
        ),
    });
}
