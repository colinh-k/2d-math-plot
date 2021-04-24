"use strict";
export const __esModule = true;
const _UNKNOWN_RULE = exports.UNKNOWN = exports.rulesList = exports.types = void 0;
export { _UNKNOWN_RULE as UNKNOWN_RULE };
var types = {
    CONSTANT: "CONSTANT",
    NAMED_FUNCTION: "NAMED_FUNCTION",
    OPERATOR: "OPERATOR",
    VARIABLE: "VARIABLE",
    NUMBER: "NUMBER",
    LEFT_PARENTHESIS: "LEFT_PARENTHESIS",
    RIGHT_PARENTHESIS: "RIGHT_PARENTHESIS"
};
const _types = types;
export { _types as types };
var UNKNOWN = 'UNKNOWN';
const _UNKNOWN = UNKNOWN;
export { _UNKNOWN as UNKNOWN };
var UNKNOWN_RULE = {
    key: '.+',
    data: {
        type: UNKNOWN
    }
};
const _UNKNOWN_RULE = UNKNOWN_RULE;
export { _UNKNOWN_RULE as UNKNOWN_RULE };
var rulesList = {
    rules: [
        {
            key: "sin|cos|tan|log|ln|sqrt",
            data: {
                type: types.NAMED_FUNCTION
            }
        },
        {
            key: "PI|E|pi|e",
            data: {
                type: types.CONSTANT
            }
        },
        {
            key: "[\\+\\-\\*\\/\\^]",
            data: {
                type: types.OPERATOR
            }
        },
        {
            key: "[(\\[]",
            data: {
                type: types.LEFT_PARENTHESIS
            }
        },
        {
            key: "[)\\]]",
            data: {
                type: types.RIGHT_PARENTHESIS
            }
        },
        {
            key: "[0-9.,]+",
            data: {
                type: types.NUMBER
            }
        },
        {
            key: "[a-zA-Z]+",
            data: {
                type: types.VARIABLE
            }
        },
    ]
};
const _rulesList = rulesList;
export { _rulesList as rulesList };
