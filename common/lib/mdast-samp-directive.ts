import type { Paragraph, PhrasingContent } from "mdast";
import { type ContainerDirective, type Custom, defineMdastPlugin, type MdastVisitorContext } from "satteri";

type SampContent = PhrasingContent;

export interface SampData {
    hName: "samp";
}

export type SampNode = Custom & {
    type: "samp";
    data: SampData;
    children: SampContent[];
};

function wrapInSamp(paragraph: Paragraph, ctx: MdastVisitorContext) {
    for (const content of paragraph.children) {
        // replace breaks as hard breaks without wrapping them in <samp>
        // replace it with a "mdxJsxTextElement" instead of a normal break to prevent further processing by other plugins
        if (content.type == "break" || (content.type == "text" && (content.value == "\n" || content.value == "\r" || content.value == "\r\n"))) {
            ctx.replaceNode(content, { type: "mdxJsxTextElement", name: "br", attributes: [], children: [] });
            continue;
        }

        const sampNode: SampNode = {
            type: "samp",
            data: { hName: "samp" },
            children: [content],
        };

        ctx.replaceNode(content, sampNode);
    }
}

export default function plugin() {
    const visitNode = async (node: Readonly<ContainerDirective>, ctx: MdastVisitorContext) => {
        if (node.name == "samp") {
            const elements = [];
            elements.push(...node.children);

            for (const element of elements) {
                if (element.type == "paragraph") {
                    wrapInSamp(element, ctx);
                }

                if ("children" in element) {
                    elements.push(...element.children);
                }
            }

            ctx.replaceNode(node, node.children);
        }
    };

    return defineMdastPlugin({
        name: "samp-directive",
        containerDirective: visitNode,
    });
}
