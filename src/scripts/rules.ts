const types = {
    CONSTANT: "CONSTANT",
    NAMED_FUNCTION: "NAMED_FUNCTION",
    OPERATOR: "OPERATOR",
    VARIABLE: "VARIABLE",
    NUMBER: "NUMBER",
    LEFT_PARENTHESIS: "LEFT_PARENTHESIS",
    RIGHT_PARENTHESIS: "RIGHT_PARENTHESIS",
};

const UNKNOWN = 'UNKNOWN';

const UNKNOWN_RULE: Rule = {
    key: '.+',
    data: {
        type: UNKNOWN
    }
};

type Rule = {
    key: string,
    data: {
        type: string
    }
}

const rulesList: {rules: Rule[]} = {
    rules: [
        {
            key: "sin|cos|tan|log|ln|sqrt",
            data: {
                type: types.NAMED_FUNCTION,
            },
        },
        {
            key: "PI|E|pi|e",
            data: {
                type: types.CONSTANT,
            },
        },
        {
            key: "[\\+\\-\\*\\/\\^]",
            data: {
                type: types.OPERATOR,
            },
        },
        {
            key: "[(\\[]",
            data: {
                type: types.LEFT_PARENTHESIS,
            },
        },
        {
            key: "[)\\]]",
            data: {
                type: types.RIGHT_PARENTHESIS,
            },
        },
        {
            key: "[0-9.,]+",
            data: {
                type: types.NUMBER,
            },
        },
        {
            key: "[a-zA-Z]+",
            data: {
                type: types.VARIABLE,
            },
        },
    ],
};

export { 
    types, 
    rulesList,
    Rule,
    UNKNOWN,
    UNKNOWN_RULE
};
