# Evaluate Reverse Polish Notation

## Problem
You get a math expression as a list of tokens written in **Reverse Polish Notation** (RPN). In RPN the operator comes **after** its two numbers, so `3 + 4` is written `3 4 +`. Work out the answer. Division cuts off the decimal part, rounding toward zero.

- Input: `["2", "1", "+", "3", "*"]` → means `(2 + 1) * 3`
- Output: `9`

## Idea (Intuition)
Read the tokens from left to right and keep a **stack** (a pile where you only add to and take from the top).

- A number waits on the stack.
- An operator takes the **two most recent numbers** off the top, combines them, and puts the result back on the stack.

RPN needs no brackets, because the order of the tokens already says what to compute first. When all tokens are used, the one number left on the stack is the answer.

## Approach
1. Make an `operators` map from each symbol (`+ - * /`) to a function that does that math.
2. Go through each token:
   - If it is a number (the regex matches), turn it into a `Number` and push it.
   - Otherwise it is an operator:
     - Pop `n2` (the **right** number) first, then `n1` (the **left** number).
     - Compute `operators[token](n1, n2)` and cut off the decimal with `Math.trunc`.
     - Push the result.
3. Return `stack[0]`, the only value left.

## Dry Run
Input: `["4", "13", "5", "/", "+"]` (means `4 + (13 / 5)`)

| Token | Action | Stack after |
|---|---|---|
| `"4"` | number → push 4 | `[4]` |
| `"13"` | number → push 13 | `[4, 13]` |
| `"5"` | number → push 5 | `[4, 13, 5]` |
| `"/"` | pop n2 = 5, n1 = 13 → `13 / 5 = 2.6` → trunc → 2 | `[4, 2]` |
| `"+"` | pop n2 = 2, n1 = 4 → `4 + 2 = 6` | `[6]` |

Answer: `6` ✓

## Code Walkthrough
- `const operators = { "+": (a, b) => a + b, ... }` is a lookup table. Instead of an `if/else` chain, `operators[char](n1, n2)` calls the right function directly.
- `/^[-+]?\d+$/` matches a whole number with an optional sign, such as `"5"` or `"-11"`. The token `"-"` alone has no digits, so it is treated as an operator, not as a number.
- `const n2 = stack.pop(); const n1 = stack.pop();` the order matters. The number on top is the **right** side, so `["4", "2", "-"]` gives `4 - 2 = 2`, not `2 - 4`.
- `Math.trunc(...)` drops the decimal part and rounds toward zero. So `-7 / 2 = -3.5` becomes `-3`, not `-4` (which `Math.floor` would give).
- `return stack[0];` for a valid expression, exactly one number is left.

> Note: The `/` function returns the string `"Cannot divide by zero"` when `b` is 0. `Math.trunc` turns that string into `NaN`, and `NaN` is pushed on the stack, so the message is never shown. LeetCode promises there is no division by zero, so this branch is not needed. If you want to handle it, `throw new Error(...)` instead.

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | one loop over n tokens; the regex test, push, pop, and map lookup are O(1) for each token (numbers are short) |
| Space | O(n) | the stack can hold about half the tokens when all numbers come first (e.g. `["1","2","3","+","+"]`) |

## Edge Cases
- Single number `["42"]` → `42` (no operator, so the number is just returned).
- Negative numbers like `"-11"`: the regex reads them as numbers, not as the `-` operator.
- Order for `-` and `/`: `n1` is the left number and `n2` the right one, so `["4", "2", "-"]` → `2`.
- Negative division `["-7", "2", "/"]` → `-3` (truncate toward zero).
- Divide by zero: becomes `NaN` (see the note above).
- An unknown operator such as `"%"`: `operators["%"]` is `undefined`, so calling it throws a `TypeError`.

## Key Takeaway
To evaluate postfix (RPN) expressions, use a stack: push numbers, and on each operator pop two, compute, and push the result back.
