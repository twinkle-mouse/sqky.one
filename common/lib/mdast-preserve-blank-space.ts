import type { Node, Nodes, Parents } from "mdast";
import { defineMdastPlugin, type MdastContent, type MdastVisitorContext } from "satteri";

function preserve(ctx: MdastVisitorContext, node: Readonly<Node>, parent: Readonly<Parents> | undefined, index: number | undefined) {
    if (index === undefined || parent === undefined) return;

    const currentLine = node.position?.start.line;
    if (currentLine === undefined) return;

    const prevIndex = index - 1;
    const prevElement = parent.children[prevIndex];
    if (prevElement === undefined) return;

    const prevLine = prevElement.position?.end.line;
    if (prevLine === undefined) return;

    const diff = Math.floor((currentLine - prevLine - 2) / 2);
    if (diff > 0) {
        const toAdd = [];

        for (let i = 0; i < diff; i++) {
            const p: MdastContent = {
                type: "paragraph",
                children: [{ type: "break" }],
            };

            toAdd.push(p);
        }

        ctx.insertChildAt(parent, prevIndex + 1, toAdd);
    }
}

export default function plugin() {
    const visitNode = (node: Readonly<Nodes>, ctx: MdastVisitorContext) => {
        const parent = ctx.parent(node);
        const index = ctx.indexOf(node);

        preserve(ctx, node, parent, index);
    };

    return defineMdastPlugin({
        name: "preserve-blank-space",

        paragraph: visitNode,
        heading: visitNode,
        thematicBreak: visitNode,
        blockquote: visitNode,
        list: visitNode,
        listItem: visitNode,
        html: visitNode,
        code: visitNode,
        definition: visitNode,
        emphasis: visitNode,
        strong: visitNode,
        inlineCode: visitNode,
        break: visitNode,
        link: visitNode,
        image: visitNode,
        linkReference: visitNode,
        imageReference: visitNode,
        footnoteDefinition: visitNode,
        footnoteReference: visitNode,
        table: visitNode,
        tableRow: visitNode,
        tableCell: visitNode,
        delete: visitNode,
        yaml: visitNode,
        toml: visitNode,
        math: visitNode,
        inlineMath: visitNode,
        containerDirective: visitNode,
        leafDirective: visitNode,
        textDirective: visitNode,
        superscript: visitNode,
        subscript: visitNode,
        mdxJsxFlowElement: visitNode,
        mdxJsxTextElement: visitNode,
        mdxFlowExpression: visitNode,
        mdxTextExpression: visitNode,
        mdxjsEsm: visitNode,
    });
}
