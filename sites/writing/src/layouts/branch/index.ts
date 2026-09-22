export type Choice = {
    text: string;
    content: string;
    flags: string[];
    attributes: Record<string, string>;
};

export type Branch = {
    type: "branch";
    name: string;
    class: string;
    data: {
        choices: Choice[];
    };
    attributes?: Record<string, string>;
};

export type Continue = {
    type: "continue";
    name: string;
    class: string;
    data: {
        text: string;
    };
};

export type Tangent = {
    type: "tangent";
    name: string;
    class: string;
    required: boolean;
    data: {
        text: string;
        content: string;
        attributes: Record<string, string>;
    };
};

export type Element = Branch | Continue | Tangent;
