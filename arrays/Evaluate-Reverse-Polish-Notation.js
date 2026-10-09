const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => (b !== 0 ? a / b : "Cannot divide by zero"),
};

function evalRPN(tokens) {
    const regex = /^[-+]?\d+$/;
    const stack = [];

    for (let char of tokens) {
        if (regex.test(char)) stack.push(Number(char));
        else {
            // pop last two
            const n2 = stack.pop();
            const n1 = stack.pop();
            const res = Math.trunc(operators[char](n1, n2));
            stack.push(res);
        }
    }
    return stack[0];
}

console.log(evalRPN(["2", "1", "+", "3", "*"])); // 9
console.log(evalRPN(["4", "13", "5", "/", "+"])); // 6
console.log(
    evalRPN([
        "10",
        "6",
        "9",
        "3",
        "+",
        "-11",
        "*",
        "/",
        "*",
        "17",
        "+",
        "5",
        "+",
    ]),
); // 22
console.log(evalRPN(["42"])); // 42
console.log(evalRPN(["4", "2", "-"])); // 2
console.log(evalRPN(["-7", "2", "/"])); // -3
console.log(evalRPN(["3", "-4", "+"])); // -1
