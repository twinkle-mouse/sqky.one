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
