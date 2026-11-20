import { defineMdastPlugin, type MdastVisitorContext, type TextDirective } from "satteri";

export default function plugin() {
    return defineMdastPlugin({
        name: "text-directives-as-plaintext",
        textDirective: (node: Readonly<TextDirective>, ctx: MdastVisitorContext) => {
            ctx.replaceNode(node, { type: "text", value: ":" + node.name });
        },
    });
}
