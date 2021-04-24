import {types, rulesList, Rule, UNKNOWN, UNKNOWN_RULE} from './rules';

// config: {rules: Rule[]}=rulesList, 
function tokenize(input: string) {
    const rules: Rule[] = rulesList.rules;

    let output: string[];

    output = rules.reduce(applyRules, [input]);
    console.log('output', output);

    // output = output.filter((current) => !isUnknown(current));
}

function applyRules(targets: [string], rule: Rule): [string] {
    return ['h'];
}

function applyRule(target: string, rule: Rule) {
    
}

function isUnknown(val: Rule): boolean {
    return true;
}

type Token = {
    type: string,
    value: string
};

function createToken(type: string, value: string): Token {
    return {
        type: type,
        value: value
    };
}

export {tokenize};

// assumes valid input string
// function getTokens(inputStr: string) {
//     const result: Token[] = [];
//     inputStr.replace(/\s+/g, ''); // remove whitespace   
//     const inputStrArray = inputStr.split("");
    
//     inputStrArray.forEach(function (char, i) {
//         if (isDigit(char)) {
//             result.push(createToken('Literal', char));
//         } else if (isLetter(char)) {
//             result.push(createToken('Variable', char));
//         } else if (isOperator(char)) {
//             result.push(createToken('Operator', char));
//         } else if (isLeftParenthesis(char)) {
//             result.push(createToken('Left Parenthesis', char));
//         } else if (isRightParenthesis(char)) {
//             result.push(createToken('Right Parenthesis', char));
//         } else if (isComma(char)) {
//             result.push(createToken('Function Arg Separator', char));
//         }
//     });
    
//     return result;
// }

// function isDigit(char: string) { 
//     return /\d/.test(char);
// }

// function isLetter(char: string) { 
//     return /[a-z]/i.test(char);
// }

// function isOperator(char: string) { 
//     return /\+|-|\*|\/|\^/.test(char);
// }

// function isLeftParenthesis(char: string) { 
//     return (char === "(");
// }

// function isRightParenthesis(char: string) { 
//     return (char === ")");
// }

// function isComma(char: string) { 
//     return (char === ",");
// }

// // untested function
// function isWhitespace(char: string) {
//     return /\s+/g.test(char);
// }