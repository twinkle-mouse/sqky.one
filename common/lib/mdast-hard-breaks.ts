import type { Break, Text } from "mdast";
import { defineMdastPlugin } from "satteri";

export default function plugin() {
    return defineMdastPlugin({
        name: "hard-breaks",
        text(text, ctx) {
            const split = text.value.split(/\r?\n|\r/);
            if (split.length <= 1) return;

            const newContent: (Break | Text)[] = [];
            for (let i = 0; i < split.length; i++) {
                // ignore empty strings
                if (split[i]) {
                    newContent.push({ type: "text", value: split[i] });
                }
                if (i < split.length - 1) {
                    newContent.push({ type: "break" });
                }
            }

            ctx.replaceNode(text, newContent);
        },
    });
}
