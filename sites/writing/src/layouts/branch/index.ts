export type Root = {
    type: "root";
    name: "root";
};

export type Branch = {
    type: "branch";
    name: string;
    class: string;
    data: {
        choices: {
            text: string;
            content: string;
            flags: string[];
            attributes: Record<string, string>;
        }[];
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

export type Raw = {
    type: "raw";
    name: string;
    data: {
        html: string;
    };
};

export type Element = Root | Branch | Continue | Tangent | Raw;
