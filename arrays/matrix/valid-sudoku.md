# Valid Sudoku

## Problem
You get a 9×9 Sudoku board that is partly filled. Empty cells are `"."`. The board is **valid** if no digit repeats in:

- any **row**,
- any **column**,
- any of the nine **3×3 boxes**.

You don't have to solve the puzzle, only check the cells that are already filled.

Example: the board in the file (LeetCode example 1) → `true`. If its top-left `"5"` were an `"8"`, column 0 would have two 8s (rows 0 and 3) → `false`.

The file has two versions of the same idea:

1. **Using arrays + `includes`** (the commented-out lines 16–19 and 29–30)
2. **Using Sets + `has`** (the live code)

---

## Common Idea (Intuition)
Imagine 27 small notebooks: one for each row, one for each column, and one for each box. Walk through the board cell by cell. For each digit:

1. Look in the notebook for its row, its column, and its box.
2. If the digit is already written in **any** of the three, it's a repeat, so the board is invalid.
3. Otherwise, write the digit in all three notebooks and move on.

If you reach the end with no repeat, the board is valid.

**Which box is a cell in?** Divide the row and column by 3 and drop the decimal part:

```
box row = Math.trunc(r / 3)     box col = Math.trunc(c / 3)

 c: 0 1 2 | 3 4 5 | 6 7 8
r0  (0,0) | (0,1) | (0,2)
r3  (1,0) | (1,1) | (1,2)
r6  (2,0) | (2,1) | (2,2)
```

So cell `(4, 7)` is in box `"1,2"`. The code uses the string `"boxRow,boxCol"` as the key for the box notebook.

## Common Approach
1. Make one "seen" store per row (9), per column (9), and per box (keyed by `"boxRow,boxCol"`).
2. Loop `r` from 0 to 8, and `c` from 0 to 8.
3. Skip `"."`.
4. If the digit is already in `rows[r]`, `cols[c]`, or the cell's box → return `false`.
5. Otherwise add the digit to all three.
6. After the loops, return `true`.

## Dry Run (first few filled cells of the example)

| Cell | Digit | In row? | In col? | In box? | After adding |
|---|---|---|---|---|---|
| (0,0) | 5 | no | no | no | rows[0]={5}, cols[0]={5}, box "0,0"=[5] |
| (0,1) | 3 | no | no | no | rows[0]={5,3}, cols[1]={3}, box "0,0"=[5,3] |
| (0,4) | 7 | no | no | no | rows[0]={5,3,7}, cols[4]={7}, box "0,1"=[7] |
| (1,0) | 6 | no | no | no | rows[1]={6}, cols[0]={5,6}, box "0,0"=[5,3,6] |
| (1,3) | 1 | no | no | no | rows[1]={6,1}, cols[3]={1}, box "0,1"=[7,1] |
| … | | | | | |

No repeats anywhere, so the result is **`true`**.

**Invalid version** (top-left changed to `"8"`): at `(0,0)`, `cols[0]` gets `8`. Later at `(3,0)` the digit is `8`, and `cols[0].has("8")` is true, so the function returns **`false`**.

---

## Approach 1: Arrays + `includes` (commented-out code)

### Idea
Each notebook is a plain **array**. To check for a digit, scan the array with `includes`. To add one, build a new array with the digit on the end.

### Code Walkthrough
- `rows[r] && rows[r].includes(board[r][c])`: `rows[r]` may still be `undefined` (no digit seen in that row yet), so `&&` guards before calling `includes`.
- `rows[r] = [...rows[r] || [], board[r][c]]`: "take the old array, or an empty one if there isn't one yet, and copy it with the new digit added". The `...` spread makes a full copy every time.
- `includes` walks the array from the start, so a lookup costs up to the number of stored digits (at most 9).

### Complexity (general n×n board; Sudoku has n = 9)
| | Complexity | Why |
|---|---|---|
| Time | O(n³) | For n² cells, `includes` scans up to n items and the spread copy copies up to n items. |
| Space | O(n²) | 3 groups of n arrays, each holding up to n digits. |

For a real 9×9 board, n is fixed, so this is really **O(1)**: at most 81 cells × a few small scans.

---

## Approach 2: Sets + `has` (live code)

### Idea
Same notebooks, but each row and column notebook is a **Set**. A Set is a collection that stores each value only once and answers "is this in here?" in O(1) on average, without scanning.

### Code Walkthrough
- `Array.from({ length: 9 }).map(() => new Set())`: makes 9 **separate** empty Sets. (`new Array(9).fill(new Set())` would put the **same** Set in all 9 slots. That's a classic trap.)
- `rows[r].has(board[r][c])`: O(1) lookup. The `rows[r] &&` guard is no longer needed, because every Set exists from the start.
- `rows[r].add(...)` / `cols[c].add(...)`: O(1) insert, no copying.
- The **box** check still uses the array style (`includes` plus spread copy). `sqaure` is created as a `new Set()` but is only used as a plain object with string keys like `"0,1"`. A `{}` would be clearer.

> Note: **Bug (affects both approaches):** the box **check** uses the key `` `${r / 3},${c / 3}` `` with no `Math.trunc`, but the box **write** uses `` `${Math.trunc(r / 3)},${Math.trunc(c / 3)}` ``. For cell `(1,1)` the check looks for `"0.333…,0.333…"` while the digit was stored under `"0,0"`, so they never match. The box check never catches a repeat. For example, a board with `"5"` at `(0,0)` and `"5"` at `(1,1)` (same box, different row and column) returns `true`, but it should be `false`. **Fix:** use `Math.trunc` in the check too, ideally by computing `const key = \`${Math.trunc(r/3)},${Math.trunc(c/3)}\`` once and reusing it.

> Note: The example call at the bottom doesn't print anything. Wrap it in `console.log(...)` to see the result.

> Note: The inner loop uses `c < board.length` (row count) instead of `board[r].length`. It works here only because the board is square.

### Complexity (general n×n board)
| | Complexity | Why |
|---|---|---|
| Time | O(n²) with Sets everywhere | Each of the n² cells does O(1) `has` and `add`. As written, the box part still uses arrays, so it's O(n³) until the box store is also a Set. |
| Space | O(n²) | 3 groups of n Sets, each holding up to n digits. |

For 9×9 this is again O(1) in practice.

---

## Edge Cases
- **Empty board (all `"."`):** every cell is skipped, so the result is `true`.
- **Repeat in the same row or column:** caught by `rows` / `cols`.
- **Repeat only inside a box:** **missed** by the current code (see the bug note).
- **Valid but unsolvable board:** still `true`. The problem only checks for repeats.

## Comparison
| | Arrays + `includes` | Sets + `has` |
|---|---|---|
| Lookup | O(n) scan | O(1) average |
| Insert | O(n) (spread copies the array) | O(1) |
| Needs `undefined` guard | Yes (`rows[r] && …`) | No (Sets created upfront) |
| Time (n×n) | O(n³) | O(n²) |
| For 9×9 Sudoku | Fine, tiny | Fine, cleaner |

## Key Takeaway
To check "no repeats per group", keep one Set per group (row, column, box) and check before adding. A cell's box is `(Math.trunc(r/3), Math.trunc(c/3))`, and you must use the same box key when checking and when storing.
