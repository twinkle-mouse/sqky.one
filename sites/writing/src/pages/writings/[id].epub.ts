import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";

import mdx from "@astrojs/mdx/server.js";
import { contentStyles, getWritingEntries, htmlToTextContent, renderWritingFrontmatterMd, sanitizeHtmlConfig } from "@sqky-one/writing/lib/content";
import { normalizeHtml } from "@sqky-one/writing/lib/content";
import { siteName } from "@sqky-one/writing/lib/page";
import type { AstroGlobal } from "astro";
import { experimental_AstroContainer } from "astro/container";
import { getEntry, render } from "astro:content";
import { type Chapter, EPub } from "epub-gen-memory";
import parse from "node-html-parser";
import sanitizeHtml from "sanitize-html";

export async function getStaticPaths() {
    return (await getWritingEntries()).map((entry) => {
        return { params: { id: entry.id } };
    });
}

const container = await experimental_AstroContainer.create();
container.addServerRenderer({ renderer: mdx });

export async function GET(context: AstroGlobal) {
    const { id } = context.params;
    if (!id) {
        return context.redirect("/404");
    }

    const entry = await getEntry("writings", id);
    if (entry === undefined) {
        return context.redirect("/404");
    }
    if (entry.data.redirect) {
        return context.redirect(`${entry.data.redirect}.epub`);
    }
    renderWritingFrontmatterMd(entry);

    const { Content } = await render(entry);
    const content = normalizeHtml(
        await container.renderToString(Content, {
            props: {},
        }),
    );

    const desc = htmlToTextContent(entry.data.description).replaceAll("\n", " ").replaceAll("   ", " - ");

    const writingsOutDir = join(cwd(), "sites/writing/dist");

    let cover: File | undefined = undefined;
    if (entry.data.cover?.src) {
        const path = entry.data.cover.src;
        if (import.meta.env.DEV) {
            const url = new URL(path.replace("/@fs", "file://"));
            cover = new File([await readFile(url.pathname)], url.pathname.split("/").at(-1)!);
        } else {
            cover = new File([await readFile(join(writingsOutDir, path))], path.split("/").at(-1)!);
        }
    }

    const element = parse(
        sanitizeHtml(content, {
            ...sanitizeHtmlConfig({ site: context.site, srcset: false }),
        }),
    ).removeWhitespace();
    if (!import.meta.env.DEV) {
        for (const image of element.querySelectorAll("img")) {
            image.setAttribute("src", `file://${writingsOutDir}${image.attributes["data-original-src"]}`);
        }
    } else {
        for (const image of element.querySelectorAll("img")) {
            image.setAttribute("src", `file://${image.attributes["data-original-src"].replace("/@fs", "")}`);
        }
    }
    const sections = element.querySelectorAll("section");

    const chapters: Chapter[] = [];
    if (sections.length <= 0) {
        chapters.push({
            title: entry.data.title,
            content: `<div id="content">${element}</div>`,
        });
    } else {
        for (const section of sections) {
            const heading = section.querySelector("h1, h2, h3, h4, h5, h6");
            chapters.push({
                title: heading?.textContent,
                content: `<div id="content">${section}</div>`,
            });
        }
    }

    const epub = new EPub(
        {
            title: entry.data.title,
            author: entry.data.authors.join(", "),
            publisher: siteName,
            description: desc,
            cover,
            date: entry.data.date.toISOString(),
            prependChapterTitles: false,
            css: contentStyles,
        },
        chapters,
    );
    const buffer = await epub.genEpub();

    return new Response(buffer as BodyInit);
}
