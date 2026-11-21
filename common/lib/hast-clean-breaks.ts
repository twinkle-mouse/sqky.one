import type { Parents } from "hast";
import { defineHastPlugin } from "satteri";

export default function plugin() {
    const ignoredElements = new Set(["blockquote", "aside", "figcaption", "samp"]);
    const ignoredParents = new WeakSet<object>();
    const allowedParents = new WeakSet<object>();

    return defineHastPlugin({
        name: "clean-breaks",
        before(root, ctx) {
            const nodes = [];
            nodes.push(...root.children);
            for (const node of nodes) {
                if (node.type == "text") {
                    const newValue = node.value.replaceAll(/^[\r\n]+/g, "").replaceAll(/[\r\n]+$/g, "");

                    if (!newValue) {
                        ctx.removeNode(node);
                    } else {
                        ctx.setProperty(node, "value", newValue);
                    }
                } else if ("children" in node) {
                    nodes.push(...node.children);
                }
            }
        },
        element: [
            {
                filter: [],
                visit(node, ctx) {
                    // if frontmatter specifies hard-breaks: true, then skip processing entirely.
                    if (ctx.data.astro?.frontmatter["hard-breaks"] === true) {
                        return;
                    }

                    // check validity
                    {
                        let parent: Readonly<Parents> | undefined = ctx.parent(node);
                        if (!parent) return;

                        if (ignoredParents.has(parent)) return;
                        if (!allowedParents.has(parent)) {
                            const traversedParents: Readonly<Parents>[] = [];
                            for (let i = 0; i < 2; i++) {
                                if (!parent) break;

                                traversedParents.push(parent);
                                if (
                                    (parent.type == "element" && ignoredElements.has(parent.tagName)) ||
                                    (parent.type == "mdxJsxFlowElement" && parent.name && ignoredElements.has(parent.name))
                                ) {
                                    for (const traversedParent of traversedParents) {
                                        ignoredParents.add(traversedParent);
                                    }
                                    return;
                                }

                                parent = ctx.parent(parent);
                            }

                            allowedParents.add(ctx.parent(node));
                        }
                    }

                    const parent = ctx.parent(node);
                    if (node.tagName == "br") {
                        if (
                            // don't turn it into a soft break if it's the only content
                            parent.children.length > 1
                        ) {
                            ctx.replaceNode(node, { type: "text", value: "\n" });
                        }
                    }
                },
            },
        ],
    });
}
