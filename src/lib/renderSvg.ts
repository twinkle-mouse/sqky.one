/// https://github.com/jasikpark/astro-svg-loader/blob/main/src/components/Svg/overrideSvgAttributes.ts

import type { HTMLAttributes } from "astro/types";
import { type Node, NodeType, parse } from "node-html-parser";

// Type guard to check if a node is an ElementNode with SVG tag
function isSvgElementNode(node: Node): node is Node & HTMLElement {
    return node.nodeType === NodeType.ELEMENT_NODE && typeof node.rawTagName === "string" && /svg/i.test(node.rawTagName);
}

const EMPTY_STRING_ERR = "`svgSource` must have content";

export function renderSvg(svgSource: string, attributeOverrides: HTMLAttributes<"svg"> = {}): HTMLElement {
    if (!svgSource) {
        throw new Error(EMPTY_STRING_ERR);
    }

    const doc = parse(svgSource);

    const firstSVGNode = (doc.children as Node[]).find(isSvgElementNode);

    if (!firstSVGNode) {
        throw new Error("No SVG element found in the provided source");
    }

    for (const [key, value] of Object.entries(attributeOverrides)) {
        firstSVGNode.setAttribute(key, value.toString());
    }

    return firstSVGNode;
}
