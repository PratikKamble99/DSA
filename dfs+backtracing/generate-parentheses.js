var generateParenthesis = function (n) {
    const stack = []; // characters of the string being built right now
    const res = [];

    // A valid string has exactly n "(" and n ")" (length 2n).
    // e.g. n=3 -> 3 opening and 3 closing brackets
    // o = "(" used so far, c = ")" used so far

    function dfs(o, c) {
        // used all n openings and all n closings -> one complete valid string
        if (o === n && c == n && o == c) {
            res.push(stack.join(""));
            return;
        }

        // can still open a bracket while fewer than n "(" are used
        if (o < n) {
            stack.push("(");
            dfs(o + 1, c);
            // backtrack: undo the "(" so the ")" branch below starts from the same prefix
            stack.pop();
        }

        // can close only if there is an unmatched "(" (closing < opening), so add ")"
        if (c < o) {
            stack.push(")");
            dfs(o, c + 1);
            stack.pop(); // backtrack
        }
    }
    dfs(0, 0);
    return res;
};
