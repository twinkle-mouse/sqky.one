import type { Node, Nodes, Paragraph, Parents } from "mdast";
import { defineMdastPlugin, type MdastVisitorContext } from "satteri";

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
            const p: Paragraph = {
                type: "paragraph",
                children: [{ type: "break" }],
            };

            toAdd.push(p);
        }

        ctx.insertChildAt(parent, index, toAdd);
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
        options: { position: true },
        after(root, ctx) {
            const children = [];
            children.push(...root.children);
            for (const child of children) {
                visitNode(child, ctx);
                if ("children" in child) {
                    children.push(...child.children);
                }
            }
        },
    });
}
