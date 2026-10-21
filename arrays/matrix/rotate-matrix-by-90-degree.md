# Rotate Image (Rotate Matrix by 90°)

## Problem
You get an `n x n` matrix (a square grid). Rotate it **90° clockwise**, ideally **in place**, which means you change the given matrix directly instead of building a new one.

```
Input:  [[1,2,3],        Output: [[7,4,1],
         [4,5,6],                 [8,5,2],
         [7,8,9]]                 [9,6,3]]
```

The file has two versions:
- `rotate`: brute force with a second matrix.
- `rotateOpt`: in place, using transpose + reverse.

Below, **n** = the number of rows (which equals the number of columns).

---

## Approach 1: Extra matrix (`rotate`)

### Idea
Look at where each cell ends up. After a clockwise turn, **row `i` becomes column `n - 1 - i`**. The first row turns into the last column, the last row turns into the first column. Inside that row, column `j` becomes row `j`.

So `matrix[i][j]` moves to `newMatrix[j][n - 1 - i]`.

### Approach
1. Create an `n x n` matrix `newMatrix` filled with `0`.
2. For every cell `(i, j)`, copy `matrix[i][j]` into `newMatrix[j][n - 1 - i]`.
3. Print `newMatrix`.

### Dry Run (3 x 3, so `n - 1 = 2`)

| i | j | value | goes to `[j][2 - i]` |
|---|---|---|---|
| 0 | 0 | 1 | `[0][2]` |
| 0 | 1 | 2 | `[1][2]` |
| 0 | 2 | 3 | `[2][2]` |
| 1 | 0 | 4 | `[0][1]` |
| 2 | 0 | 7 | `[0][0]` |
| ... | ... | ... | ... |

Row 0 is now `[7, 4, 1]`, as expected.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n²) | Two nested loops visit each of the n² cells once. |
| Space | O(n²) | `newMatrix` is a full second copy of the grid. |

> **Note:** `rotate` does not solve the problem as stated. It never changes `matrix`. It only `console.log`s `newMatrix` and returns `undefined`, so the caller's matrix stays unrotated. To be accepted, copy `newMatrix` back into `matrix` at the end (and it still breaks the "no extra matrix" rule).

---

## Approach 2: Transpose, then reverse each row (`rotateOpt`) ⭐

### Idea
A clockwise rotation is the same as two simple moves:
1. **Transpose**: flip the grid over its main diagonal (top-left to bottom-right). Rows become columns, so `matrix[i][j]` swaps with `matrix[j][i]`.
2. **Reverse each row**: mirror it left to right.

Both moves can be done by swapping values inside the same matrix, so no extra grid is needed.

### Approach
1. For each `i` from `0` to `n - 2`, and each `j` from `i + 1` to `n - 1`, swap `matrix[i][j]` and `matrix[j][i]`. Only the cells **above** the diagonal are visited, so each pair is swapped once.
2. For each row, call `matrix[i].reverse()`.

### Dry Run
```
Start          After transpose     After reversing each row
1 2 3          1 4 7               7 4 1
4 5 6    →     2 5 8         →     8 5 2
7 8 9          3 6 9               9 6 3
```

Transpose swaps:

| i | j | swap |
|---|---|---|
| 0 | 1 | 2 ↔ 4 |
| 0 | 2 | 3 ↔ 7 |
| 1 | 2 | 6 ↔ 8 |

### Code Walkthrough
```js
for (let j = i+1; j < n; j++)
```
Starting `j` at `i + 1` is the key detail. If `j` started at `0`, every pair would be swapped twice and the matrix would go back to how it started.

```js
[matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
```
A destructuring swap. It does the same job as the commented-out `temp` version.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n²) | The transpose touches about n²/2 cells, and reversing n rows of length n is n² more. |
| Space | O(1) | Swaps happen inside the matrix. Only loop variables are used. |

---

## Comparison

| Approach | In place? | Time | Space |
|---|---|---|---|
| 1. Extra matrix | No (and doesn't write back) | O(n²) | O(n²) |
| 2. Transpose + reverse | Yes | O(n²) | O(1) |

## Edge Cases
- **1 x 1 matrix**: the transpose loop runs zero times and reversing one item does nothing. Correct.
- **Empty matrix** (`[]`): `n = 0`, both loops are skipped. Fine.
- **Not square**: the problem guarantees `n x n`. A rectangle can't be rotated in place, because its shape changes.
- **Counter-clockwise**: reverse each row first, then transpose (or transpose, then reverse each column).

## Key Takeaway
**Rotate clockwise = transpose + reverse each row.** Two easy in-place passes replace one hard one.
