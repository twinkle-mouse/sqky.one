import mdx from "@astrojs/mdx/server.js";
import rss from "@astrojs/rss";
import type { AstroGlobal } from "astro";
import { experimental_AstroContainer } from "astro/container";
import { getCollection } from "astro:content";
import { render } from "astro:content";
import sanitizeHtml from "sanitize-html";

import { defaultDescription, siteDesc, siteName } from "$lib/writings";

const container = await experimental_AstroContainer.create();
container.addServerRenderer({ renderer: mdx });

export async function GET(context: AstroGlobal) {
    const writings = await getCollection("writings");

    return rss({
        title: siteName,
        site: context.site!,
        description: siteDesc,
        customData: [`<atom:link href="${new URL("rss.xml", context.site)}" rel="self" type="application/rss+xml" />`].join(""),
        items: await Promise.all(
            writings.map(async (post) => {
                const { Content } = await render(post);
                const content = await container.renderToString(Content, {
                    props: { components: [] },
                });

                return {
                    title: post.data.title,
                    description: post.data.description || defaultDescription,
                    pubDate: post.data.date,
                    author: post.data.authors.join(", "),
                    categories: post.data.tags,
                    link: `/writings/${post.id}/`,
                    content: sanitizeHtml(content.trim(), {
                        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
                    }),
                };
            }),
        ),
    });
}
