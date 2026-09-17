import { defineMdastPlugin, type MdastNode, type MdastVisitorContext } from "satteri";

type ContainerDirective = Extract<MdastNode, { type: "containerDirective" }>;
type LeafDirective = Extract<MdastNode, { type: "leafDirective" }>;
type TextDirective = Extract<MdastNode, { type: "textDirective" }>;

export default function plugin() {
    const visitNode = (node: Readonly<ContainerDirective | LeafDirective | TextDirective>, ctx: MdastVisitorContext) => {
        ctx.replaceNode(node, {
            ...node,
            data: {
                hName: node.name,
                hProperties: { ...node.attributes, className: node.attributes?.["class"]?.split(" ") },
            },
        });
    };

    return defineMdastPlugin({
        name: "plain-directives",
        containerDirective: visitNode,
        leafDirective: visitNode,
        //textDirective: visitNode,
        // ^ don't consume textDirective because they're incredibly bad at parsing *actual* colons (like :D)
    });
}
