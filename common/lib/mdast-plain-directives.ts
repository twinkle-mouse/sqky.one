import { defineMdastPlugin, type MdastNode, type MdastVisitorContext } from "satteri";

type ContainerDirective = Extract<MdastNode, { type: "containerDirective" }>;
type LeafDirective = Extract<MdastNode, { type: "leafDirective" }>;

export default function plugin() {
    const visitNode = (node: Readonly<ContainerDirective | LeafDirective>, ctx: MdastVisitorContext) => {
        ctx.replaceNode(node, {
            ...node,
            data: {
                hName: node.data?.hName ?? node.name,
                hProperties: { ...node.data?.hProperties, ...node.attributes, className: node.attributes?.["class"]?.split(" ") },
            },
        });
    };

    return defineMdastPlugin({
        name: "plain-directives",
        containerDirective: visitNode,
        leafDirective: visitNode,
        // don't consume textDirective because they're incredibly bad at parsing *actual* colons (like :D)
    });
}
