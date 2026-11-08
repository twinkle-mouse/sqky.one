import { type ContainerDirective, type Custom, defineMdastPlugin, type LeafDirective, type MdastVisitorContext } from "satteri";

function createNode(node: Readonly<ContainerDirective | LeafDirective>): Custom {
    return {
        type: node.name,
        children: node.children,
        data: {
            hName: node.name,
            hProperties: { ...node.attributes, className: node.attributes?.["class"]?.split(" ") },
        },
        position: node.position,
    };
}

export default function plugin() {
    const visitNode = (node: Readonly<ContainerDirective | LeafDirective>, ctx: MdastVisitorContext) => {
        ctx.replaceNode(node, createNode(node));
    };

    return defineMdastPlugin({
        name: "plain-directives",
        options: { position: true },
        containerDirective: visitNode,
        leafDirective: visitNode,
        // don't consume textDirective because they're incredibly bad at parsing *actual* colons (like :D)
    });
}
