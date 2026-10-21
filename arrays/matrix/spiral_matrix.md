# Spiral Matrix

## Problem
Given an `m x n` matrix, return all its elements in **spiral order**: go right along the top, down the right side, left along the bottom, up the left side, then repeat on the inner part.

```
Input:  [[1,2,3],
         [4,5,6],
         [7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
```

Below, **m** = number of rows and **n** = number of columns.

## Idea (Intuition)
Imagine peeling an onion. Keep four **boundaries** (walls) around the part you haven't read yet:
- `top`: the first unread row
- `bottom`: the last unread row
- `left`: the first unread column
- `right`: the last unread column

Walk one side, then move that wall inward by one. Keep going until the walls cross.

## Approach
1. Start with `top = 0`, `bottom = m - 1`, `left = 0`, `right = n - 1`.
2. While `top <= bottom` and `left <= right`:
   1. **Right**: read row `top` from `left` to `right`. Then `top++`.
   2. **Down**: read column `right` from `top` to `bottom`. Then `right--`.
   3. **Left**: if `top <= bottom` (a row is still left), read row `bottom` from `right` to `left`. Then `bottom--`.
   4. **Up**: if `left <= right` (a column is still left), read column `left` from `bottom` to `top`. Then `left++`.

## Dry Run (`[[1,2,3],[4,5,6],[7,8,9]]`)

| Step | Walls before (top, bottom, left, right) | Reads | result so far |
|---|---|---|---|
| Right | 0, 2, 0, 2 | 1, 2, 3 | `[1,2,3]` |
| Down | 1, 2, 0, 2 | 6, 9 | `[1,2,3,6,9]` |
| Left | 1, 2, 0, 1 | 8, 7 | `[1,2,3,6,9,8,7]` |
| Up | 1, 1, 0, 1 | 4 | `[1,2,3,6,9,8,7,4]` |
| Right | 1, 1, 1, 1 | 5 | `[1,2,3,6,9,8,7,4,5]` |
| Down | 2, 1, 1, 1 | nothing (`top > bottom`) | |

After `right--`, `left > right` and `top > bottom`, so the loop ends.

## Code Walkthrough
```js
if (top <= bottom) { ... }   // before the "left" pass
if (left <= right) { ... }   // before the "up" pass
```
These two checks matter for non-square matrices. After `top++` and `right--`, the remaining area might be a single row or column. Without the checks, that row or column would be read **twice**. Example: for `[[1,2,3]]` you would get `[1,2,3,2,1]` instead of `[1,2,3]`.

The first two passes need no check because the `while` condition already guarantees there is at least one row and one column.

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(m × n) | Each cell is pushed exactly once. |
| Space | O(1) extra | Only four boundary variables. The `result` array (m × n items) is the required output, so it usually isn't counted. |

> **Note: bug.** `spiralOrder` never returns `result`, so `console.log(spiralOrder(matrix))` prints `undefined`. Add `return result;` after the `while` loop. There is also a leftover `console.log(result)` inside the loop that prints the partial result on every round.

> **Note:** `matrix[0].length` throws an error on an empty matrix (`[]`). Add `if (!matrix.length) return [];` at the start if empty input is possible.

## Edge Cases
- **Single row** (`[[1,2,3]]`): the `top <= bottom` check stops the row from being read backwards. Output `[1,2,3]`.
- **Single column** (`[[1],[2],[3]]`): the `left <= right` check stops the column from being read upwards. Output `[1,2,3]`.
- **Rectangle** (`3 x 4`, as at the bottom of the file): gives `[1,2,3,4,8,12,11,10,9,5,6,7]`.
- **Empty matrix**: crashes, see the note above.

## Key Takeaway
**Keep four walls (top, bottom, left, right), walk one side, then shrink that wall.** Re-check `top <= bottom` and `left <= right` before the return trips.
