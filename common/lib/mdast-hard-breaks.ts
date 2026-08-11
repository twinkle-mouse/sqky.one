import { defineMdastPlugin } from "satteri";

export default function plugin() {
    return defineMdastPlugin({
        name: "hard-breaks",
        text(text, ctx) {
            ctx.setProperty(text, "value", text.value.replaceAll(/\r?\n|\r/g, "<br>"));
        },
    });
}
