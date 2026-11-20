import { readFile } from "node:fs/promises";
import { basename, dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { defineMdastPlugin, type LeafDirective, type MdastVisitorContext } from "satteri";

export default function plugin() {
    const visitNode = async (node: Readonly<LeafDirective>, ctx: MdastVisitorContext) => {
        if (!ctx.fileURL) return;
        const srcPath = fileURLToPath(ctx.fileURL);

        if (node.name == "import") {
            // try explicit path first
            const path = node.attributes?.["path"];
            if (path) {
                const content = (await readFile(join(dirname(srcPath), path))).toString();
                ctx.replaceNode(node, {
                    raw: content,
                });
            }

            // then try implicit file name
            const name = node.attributes?.["name"];
            if (name) {
                const srcName = basename(srcPath, extname(srcPath)).split("_");
                const content = (await readFile(join(dirname(srcPath), "files", srcName.length > 1 ? srcName[1] : srcName[0], name))).toString();
                ctx.replaceNode(node, {
                    raw: content,
                });
            }
        }
    };

    return defineMdastPlugin({
        name: "file-import-directive",
        leafDirective: visitNode,
    });
}
