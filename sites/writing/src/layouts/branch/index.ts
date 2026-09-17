export type Root = {
    type: "root";
    name: "root";
};

export type Branch = {
    type: "branch";
    name: string;
    data: {
        choices: {
            text: string;
            content: string;
            flag: string | undefined;
            attributes: Record<string, string>;
        }[];
    };
};

export type Continue = {
    type: "continue";
    name: string;
    data: {
        text: string;
    };
};

export type Tangent = {
    type: "tangent";
    name: string;
    data: {
        text: string;
        attributes: Record<string, string>;
        content: string;
    };
};

export type Text = {
    type: "text";
    name: string;
    data: {
        html: string;
    };
};

export type Element = Root | Branch | Continue | Tangent | Text;
