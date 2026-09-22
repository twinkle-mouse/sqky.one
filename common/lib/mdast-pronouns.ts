import { defineMdastPlugin, type MdastNode, type MdastVisitorContext } from "satteri";

type TextDirective = Extract<MdastNode, { type: "textDirective" }>;

export default function plugin() {
    return defineMdastPlugin({
        name: "pronouns",
        textDirective: (node: Readonly<TextDirective>, ctx: MdastVisitorContext) => {
            switch (node.name) {
                case "they":
                    return ctx.replaceNode(node, {
                        ...node,
                        name: "pronouns_nominative",
                        data: { hName: "pronouns_nominative", hProperties: { cap: false } },
                    });
                case "They":
                    return ctx.replaceNode(node, {
                        ...node,
                        name: "pronouns_nominative",
                        data: { hName: "pronouns_nominative", hProperties: { cap: true } },
                    });
                case "them":
                    return ctx.replaceNode(node, {
                        ...node,
                        name: "pronouns_accusative",
                        data: { hName: "pronouns_accusative", hProperties: { cap: false } },
                    });
                case "Them":
                    return ctx.replaceNode(node, {
                        ...node,
                        name: "pronouns_accusative",
                        data: { hName: "pronouns_accusative", hProperties: { cap: true } },
                    });
                case "their":
                    return ctx.replaceNode(node, {
                        ...node,
                        name: "pronouns_pronomial_possessive",
                        data: { hName: "pronouns_pronomial_possessive", hProperties: { cap: false } },
                    });
                case "Their":
                    return ctx.replaceNode(node, {
                        ...node,
                        name: "pronouns_pronomial_possessive",
                        data: { hName: "pronouns_pronomial_possessive", hProperties: { cap: true } },
                    });
                case "theirs":
                    return ctx.replaceNode(node, {
                        ...node,
                        name: "pronouns_predicative_possessive",
                        data: { hName: "pronouns_predicative_possessive", hProperties: { cap: false } },
                    });
                case "Theirs":
                    return ctx.replaceNode(node, {
                        ...node,
                        name: "pronouns_predicative_possessive",
                        data: { hName: "pronouns_predicative_possessive", hProperties: { cap: true } },
                    });
                case "themselves":
                    return ctx.replaceNode(node, {
                        ...node,
                        name: "pronouns_reflexive",
                        data: { hName: "pronouns_reflexive", hProperties: { cap: false } },
                    });
                case "Themselves":
                    return ctx.replaceNode(node, {
                        ...node,
                        name: "pronouns_reflexive",
                        data: { hName: "pronouns_reflexive", hProperties: { cap: true } },
                    });
            }
        },
    });
}
