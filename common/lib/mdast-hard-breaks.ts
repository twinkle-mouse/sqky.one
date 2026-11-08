import { defineMdastPlugin } from "satteri";

export default function plugin() {
    return defineMdastPlugin({
        name: "hard-breaks",
        text(text, ctx) {
            ctx.setField(text, "value", text.value.replaceAll(/\r?\n|\r/g, "<br>"));
        },
    });
}
