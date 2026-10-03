import { defineHastPlugin } from "satteri";

export default function plugin() {
    return defineHastPlugin({
        name: "clean-breaks",
        text(node, ctx) {
            ctx.setProperty(node, "value", node.value.replaceAll(/\r?\n|\r/g, "").replaceAll("<br>", "\n"));
        },
    });
}
