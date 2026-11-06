# Multiply Strings

## Problem
You get two non-negative numbers as strings. Return their product, also as a string. You can't convert the whole strings to numbers, because they can be too big.

Example: `num1 = "12"`, `num2 = "34"` → `"408"`

## Idea (Intuition)
Do it the way you learned in school: multiply digit by digit, write each result in the right column, and carry the extra over to the next column.

The key fact: if a digit sits at position `p` from the right in `num1`, and another sits at position `q` from the right in `num2`, their product lands in column `p + q` (counting from the right, starting at 0). Its carry goes to column `p + q + 1`.

The answer has at most `num1.length + num2.length` digits, so one array of that size holds every column.

## Approach
1. If either number is `"0"`, return `"0"`.
2. Make an array `res` of size `m + n` filled with 0. `res[0]` is the ones column, `res[1]` the tens column, and so on. The number is stored backwards.
3. Loop over `num2` from right to left (index `i`), and inside that loop over `num1` from right to left (index `j`).
4. Work out the column: `currInx = (positions from right of i) + (positions from right of j)`. The carry column is `currInx + 1`.
5. `result = digit1 * digit2 + res[currInx]` (add what is already in that column).
6. Keep the last digit in `res[currInx]`. Add the carry (`result / 10`, rounded down) to `res[currInx + 1]`.
7. When done, reverse `res` so the biggest column comes first.
8. Skip leading zeros, then join the digits into a string.

## Dry Run
`num1 = "12"`, `num2 = "34"`. `m = 2`, `n = 2`, so `res = [0, 0, 0, 0]`.

| i (num2 digit) | j (num1 digit) | currInx | result = d1·d2 + res[currInx] | res[currInx] | carry → res[currInx+1] | res after |
|---|---|---|---|---|---|---|
| 1 ('4') | 1 ('2') | 0 | 8 + 0 = 8 | 8 | 0 | [8, 0, 0, 0] |
| 1 ('4') | 0 ('1') | 1 | 4 + 0 = 4 | 4 | 0 | [8, 4, 0, 0] |
| 0 ('3') | 1 ('2') | 1 | 6 + 4 = 10 | 0 | 1 → res[2] | [8, 0, 1, 0] |
| 0 ('3') | 0 ('1') | 2 | 3 + 1 = 4 | 4 | 0 | [8, 0, 4, 0] |

Reverse: `[0, 4, 0, 8]`. Skip one leading zero → `"408"`. ✅

## Code Walkthrough
- `if ([num1, num2].includes("0")) return "0";` handles the zero case early. Otherwise the result would be all zeros and the leading-zero loop would strip everything, returning `""`.
- `Array.from({ length: num1.length + num2.length }).fill(0)` makes the column array. `m + n` digits is always enough.
- `num2.length - 1 - i` is how far digit `i` is from the right end of `num2`. The same goes for `j` in `num1`. Adding them gives the column.
- `num1[j] * num2[i]`: JavaScript turns the digit characters into numbers when you multiply them, so `'2' * '4'` is `8`.
- `res[currInx] = result % 10;` keeps the last digit. `res[carryInx] += Math.trunc(result / 10);` pushes the carry left. A column can briefly hold a value above 9, but it gets fixed when that column becomes `currInx` later.
- `res.reverse()` then `while (res[i] == "0") i++;` removes leading zeros. `==` works here because `0 == "0"` is true in JS.
- `res.slice(i).join("")` builds the final string.

> Note: the last line, `multiply("2", "3");`, runs a test call when the file loads and ignores the result. It doesn't change the answer, but you can delete it or wrap it in `console.log`.

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(m · n) | two nested loops, one over each string; every step is O(1) work |
| Space | O(m + n) | the `res` array has `m + n` slots |

## Edge Cases
- One input is `"0"`: return `"0"` right away.
- Single digits (`"2"`, `"3"`): one loop step, then one leading zero is stripped → `"6"`.
- Lots of carries (`"999"`, `"999"`): carries keep moving left, and the answer fills all `m + n` columns → `"998001"`.
- The product may need fewer than `m + n` digits, so the leading-zero skip is needed.

## Key Takeaway
Digit at position `i` times digit at position `j` (both counted from the right) goes into column `i + j`. One array of size `m + n` is enough for any grade-school multiplication.
