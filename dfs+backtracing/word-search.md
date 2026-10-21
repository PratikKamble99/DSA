# Word Search

## Problem
You get a 2D grid of letters (`board`) and a `word`. Return `true` if you can spell the word by moving between cells that touch **up, down, left, or right**, using each cell **at most once**.

```
board = [["A","B","C","E"],
         ["S","F","C","S"],
         ["A","D","E","E"]]

word = "ABCCED"  →  true
word = "SEE"     →  true
word = "ABCB"    →  false   (would need to reuse the "B")
```

Below, **m × n** = the size of the board and **L** = the length of the word.

## Idea (Intuition)
Try every cell as a starting point. From a cell that matches the current letter, walk to a neighbor that matches the next letter, and keep going. This "go as deep as you can" walk is **DFS** (depth-first search).

If a path hits a dead end, step back and try another direction. That stepping back is **backtracking**. To stop the path from using the same cell twice, the code temporarily overwrites the cell with `"&"` while it is on the path, and puts the real letter back when it leaves.

## Approach
1. Loop over every cell `(r, c)` and call `dfs(board, r, c, word, 0)`. If any call returns `true`, return `true`.
2. Inside `dfs(r, c, wordIndex)`:
   - If `wordIndex >= word.length`, every letter was matched. Return `true`.
   - If `(r, c)` is outside the grid, return `false`.
   - If the cell doesn't match `word[wordIndex]`, return `false`. (A cell marked `"&"` never matches a letter, so visited cells are skipped automatically.)
   - Save the letter, then mark the cell as visited with `"&"`.
   - Try all 4 neighbors with `wordIndex + 1`. If any returns `true`, return `true`.
   - Otherwise restore the letter (backtrack) and return `false`.
3. If no starting cell works, return `false`.

## Dry Run
`word = "SEE"` on the board above. Only cells containing `S` can pass the first check.

| Step | Cell (r, c) | Letter | wordIndex | Result |
|---|---|---|---|---|
| 1 | (1, 0) | S | 0 | matches `S`, mark `&`, try neighbors |
| 2 | (0, 0) / (2, 0) / (1, 1) / (1, -1) | A / A / F / out | 1 | none is `E` → restore `S`, return `false` |
| 3 | (1, 3) | S | 0 | matches `S`, mark `&` |
| 4 | (0, 3) up | E | 1 | matches `E`, mark `&` |
| 5 | neighbors of (0, 3) | out / `&` / out / C | 2 | none is `E` → restore, return `false` |
| 6 | (2, 3) down | E | 1 | matches `E`, mark `&` |
| 7 | (1, 3) up | `&` | 2 | visited → `false` |
| 8 | (3, 3) down | out | 2 | `false` |
| 9 | (2, 4) right | out | 2 | `false` |
| 10 | (2, 2) left | E | 2 | matches `E` → call with wordIndex 3 |
| 11 | any | | 3 | `3 >= 3` → `true` all the way up |

## Code Walkthrough
```js
if (wordIndex >= word.length) return true;
```
The success check comes **first**, before the bounds check. So a word that ends at the edge of the grid still works: the call after the last letter returns `true` even if its `(r, c)` is out of bounds.

```js
const char = board[r][c];
board[r][c] = "&";
```
Marks the cell as "on the current path" without needing a separate `visited` grid. This saves memory.

```js
board[r][c] = char;
return false;
```
This is the backtracking step. It undoes the mark so other paths can use this cell.

`dfs` is defined inside `exist`, so it can read `m` and `n` directly.

> Note: when a match is found, the function returns before restoring the letters, so the cells on the winning path stay as `"&"` in the caller's `board`. The answer is still correct, but the input is changed. Restore the cell before returning `true` if the board must stay untouched.

> Note: the `board[r][c] == " "` check does nothing useful here. The visited mark is `"&"`, not a space, and a `"&"` cell already fails the letter comparison.

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(m · n · 4^L) | Up to m·n starting cells; from each, the DFS branches into 4 directions for up to L levels. (In practice it's closer to 3^L, since one direction is always the cell you came from, which is marked.) |
| Space | O(L) | The recursion goes at most L + 1 calls deep. No extra grid is used, because cells are marked in place. |

## Edge Cases
- **Word longer than m·n**: can never fit; the DFS just fails everywhere.
- **Reusing a cell** (`"ABCB"`): blocked by the `"&"` mark.
- **Word ends on the border**: works because the success check runs before the bounds check.
- **One-cell board**: works; the 4 neighbors are all out of bounds.

## Key Takeaway
**Grid path search = DFS + backtracking**: mark the cell, explore the 4 neighbors, then unmark it on the way back.
