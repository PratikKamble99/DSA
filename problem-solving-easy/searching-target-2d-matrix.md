# Search a 2D Matrix

## Problem
You get a matrix where each row is sorted, and the first number of each row is bigger than the last number of the row above. Return `true` if `target` is in the matrix, otherwise `false`.

```
matrix = [[1, 4, 6],
          [7, 8, 10],
          [12, 18, 29],
          [34, 36, 40]]

target = 8   →  true
target = 31  →  false
```

Below, **n** = number of rows and **m** = number of columns.

## Idea (Intuition)
If you read the matrix row by row, left to right, you get one long **sorted** list:

```
1, 4, 6, 7, 8, 10, 12, 18, 29, 34, 36, 40
0  1  2  3  4  5   6   7   8   9   10  11   ← position in that list
```

So you can run normal binary search on positions `0` to `n*m - 1`, without actually building the list. You just turn a position back into a row and column:

- `row = Math.floor(position / m)` (how many full rows come before it)
- `col = position % m` (how far into that row)

Example: position 7 → row `7 / 3 = 2`, col `7 % 3 = 1` → `matrix[2][1] = 18`.

## Approach
1. Set `low = 0` and `high = n * m - 1`.
2. While `low <= high`:
   - `mid = Math.floor((low + high) / 2)`.
   - Turn `mid` into `row` and `col`.
   - If `matrix[row][col] == target`, return `true`.
   - If it's smaller than `target`, search to the right: `low = mid + 1`.
   - Otherwise search to the left: `high = high - 1` (see the Note below; this should be `mid - 1`).
3. Return `false`.

## Dry Run (target = 8)

| low | high | mid | (row, col) | value | Action |
|---|---|---|---|---|---|
| 0 | 11 | 5 | (1, 2) | 10 | 10 > 8 → `high = 10` (bug; should be 4) |
| 0 | 10 | 5 | (1, 2) | 10 | 10 > 8 → `high = 9` |
| 0 | 9 | 4 | (1, 1) | 8 | ✅ return `true` |

With the fix (`high = mid - 1`), the second row would be `low 0, high 4, mid 2 → 6 < 8 → low 3`, then `mid 3 → 7 < 8 → low 4`, then `mid 4 → 8` found. Each step halves the range instead of shrinking it by one.

## Dry Run (target = 31, the file's demo)

| low | high | mid | (row, col) | value | Action |
|---|---|---|---|---|---|
| 0 | 11 | 5 | (1, 2) | 10 | 10 < 31 → `low = 6` |
| 6 | 11 | 8 | (2, 2) | 29 | 29 < 31 → `low = 9` |
| 9 | 11 | 10 | (3, 1) | 36 | 36 > 31 → `high = 10` |
| 9 | 10 | 9 | (3, 0) | 34 | 34 > 31 → `high = 9` |
| 9 | 9 | 9 | (3, 0) | 34 | 34 > 31 → `high = 8` |
| 9 | 8 | - | - | - | `low > high`, return `false` |

## Code Walkthrough
```js
let row = Math.floor(mid / m);
let col = mid % m;
```
This is the key trick: a 1D position becomes a 2D cell. Note it divides by `m` (the number of **columns**), not `n`.

```js
else high = high - 1;
```
This is the bug. It drops only **one** item from the right end instead of throwing away the whole right half.

## Complexity
| | Complexity | Why |
|---|---|---|
| Time (as written) | O(n · m) worst case | When the target is small, `high` moves left one step at a time, so it can check almost every cell. |
| Time (with fix) | O(log(n · m)) | Each step halves the range of `n * m` positions. |
| Space | O(1) | Only a few index variables. |

> Note: **Bug on line 15.** `high = high - 1` should be `high = mid - 1`. The answer is still correct (the element at `high` is ≥ `matrix[mid]` > target, so dropping it is safe), but the search is no longer binary search: in the worst case (e.g. searching for `1` or `0`) it shrinks the range by one each time, making it O(n · m) instead of O(log(n · m)).

> Note: `matrix[0].length` throws an error if the matrix is empty (`[]`). Add `if (!matrix.length || !matrix[0].length) return false;` if empty input is possible.

## Edge Cases
- **Empty matrix** `[]`: crashes on `matrix[0].length` (see Note).
- **One row or one column**: works, it's just a normal sorted list.
- **Target smaller than `matrix[0][0]` or bigger than the last cell**: returns `false` (slowly for small targets, because of the bug).
- **Target at a row boundary** (e.g. `6` or `7`): found correctly, since row/col math handles the wrap-around.

## Key Takeaway
A matrix that is sorted row after row is really one sorted list in disguise: binary search over positions `0 … n*m - 1` and convert with `row = mid / m`, `col = mid % m`.
