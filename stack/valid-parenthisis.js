// Ques 2 : Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
//          determine if the input string is valid.
// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.

// Input: "()"             ----->>>>>        Output: true
// Input: "([]{})"         ----->>>>>        Output: true
// Input: "(]"             ----->>>>>        Output: false

function validParenthisis(s) {
    const stack = [];

    if (s.length == 1) return false;

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (char == "[" || char == "(" || char == "{") {
            stack.push(char);
        } else {
            stack.push(char);
            const lastChar = stack[stack.length - 2];
            if (
                (char == ")" && lastChar == "(") ||
                (char == "}" && lastChar == "{") ||
                (char == "]" && lastChar == "[")
            ) {
                stack.pop();
                stack.pop();
            }
        }
    }

    if (stack.length == 0) return true;
    return false;
}

function validParenthisis(s) {
    if (s.length % 2 !== 0) return false;

    const stack = [];

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        switch (char) {
            case "(":
                stack.push(")");
                break;
            case "[":
                stack.push("]");
                break;
            case "{":
                stack.push("}");
                break;
            default:
                if (char !== stack.pop()) return false;
        }
    }
    return stack.length == 0;
}

console.log(validParenthisis("([]{})"));
console.log(validParenthisis("()"));
console.log(validParenthisis("(]"));
console.log(validParenthisis(")[]"));
