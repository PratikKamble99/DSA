# Plus One

## Problem
A big number is stored as an array of digits, most significant digit first. Add 1 to it and return the new array of digits.

Example: `digits = [1, 2, 3]` (123) → `[1, 2, 4]` (124)
Example: `digits = [9, 9]` (99) → `[1, 0, 0]` (100)

## Idea (Intuition)
Think of how you add 1 by hand. Start at the last digit:
- If it is less than 9, just add 1 and you are done. Nothing else changes.
- If it is 9, it becomes 0 and you carry 1 to the digit on its left. Repeat there.

If every digit was 9 (like 999), they all turn into 0 and you need one new digit `1` at the front: `1000`.

The key point: you stop as soon as you find a digit that is not 9. Most of the time that is the very last digit.

## Approach
1. Walk the array from the last index to the first.
2. If `digits[i] < 9`: add 1 to it and return the array right away.
3. Otherwise (it is 9): set it to 0 and keep going left (this is the carry).
4. If the loop finishes, every digit was 9 and is now 0. Put `1` at the front and return.

## Dry Run
`digits = [1, 2, 9]`

| i | digits[i] | < 9? | Action | digits after |
|---|---|---|---|---|
| 2 | 9 | no | set to 0, carry left | [1, 2, 0] |
| 1 | 2 | yes | add 1, return | [1, 3, 0] |

Result: `[1, 3, 0]` (129 + 1 = 130).

`digits = [9, 9]`

| i | digits[i] | < 9? | Action | digits after |
|---|---|---|---|---|
| 1 | 9 | no | set to 0 | [9, 0] |
| 0 | 9 | no | set to 0 | [0, 0] |
| — | — | — | loop ends, `unshift(1)` | [1, 0, 0] |

Result: `[1, 0, 0]` (99 + 1 = 100).

## Code Walkthrough
- `for (let i = digits.length - 1; i >= 0; i--)`
  Go right to left, like adding by hand.
- `if (digits[i] < 9) { digits[i]++; return digits; }`
  No carry needed, so the answer is ready. This early return is what keeps the common case fast.
- `digits[i] = 0;`
  The digit was 9. 9 + 1 = 10, so write 0 and let the loop carry 1 to the next digit.
- `digits.unshift(1);`
  Only reached when all digits were 9. `unshift` adds `1` at the start of the array.

> Note: the function changes the input array in place (`digits[i]++`, `digits[i] = 0`, `unshift`). That is fine on LeetCode, but the caller's original array is modified.

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | in the worst case (all 9s) the loop visits every digit, and `unshift` also shifts all n items once |
| Space | O(1) | works in place; only the all-9s case grows the array by one digit, which is the output itself |

## Edge Cases
- **Last digit is not 9** (`[1, 2, 3]`): one step, return immediately.
- **Trailing 9s** (`[1, 9, 9]` → `[2, 0, 0]`): carry moves left until a non-9 digit.
- **All 9s** (`[9]`, `[9, 9, 9]`): every digit becomes 0, then a `1` is added at the front.
- **Single digit `[0]`**: becomes `[1]`.
- **Very long arrays**: the code never converts to a number, so there is no overflow. Converting with `Number(digits.join(''))` would break for numbers bigger than `2^53`.

## Key Takeaway
Simulate carrying from the right, and stop early as soon as a digit can absorb the +1.
