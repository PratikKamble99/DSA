# Set Matrix Zeroes

## Problem
Given an `n x m` matrix, if a cell is `0`, set its **whole row and whole column** to `0`. Do it in place (change the given matrix).

```
Input:  [[1,1,1],        Output: [[1,0,1],
         [1,0,1],                 [0,0,0],
         [1,1,1]]                 [1,0,1]]
```

The tricky part: if you set zeros **while** you are still scanning, those new zeros look like original zeros, and they wipe out more rows and columns than they should. Every approach below is a different way to "remember" which rows and columns to clear without getting confused by that.

The file has four versions. Below, **n** = rows, **m** = columns.

---

## Approach 1: Mark with a placeholder (`setZeroesBrute`)

### Idea
When you find a `0`, don't write zeros yet. Write a **placeholder** (`"-"`) in its row and column instead, so it can't be mistaken for an original zero. At the end, turn every `"-"` into `0`.

### Approach
1. Scan every cell. When `matrix[i][j] == 0`:
   - `markRow`: in row `i`, change every non-zero cell to `"-"`.
   - `markColumn`: in column `j`, change every non-zero cell to `"-"`.
2. Scan again and replace every `"-"` with `0`.

### Dry Run (`[[1,1,1],[1,0,1],[1,1,1]]`)
The only zero is at `(1,1)`.
```
After marking        After replacing "-"
1 - 1                1 0 1
- 0 -       →        0 0 0
1 - 1                1 0 1
```

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n·m·(n + m)) | For each of the n·m cells, a zero can trigger a row walk (m) and a column walk (n). |
| Space | O(1) | Marks are written inside the matrix. |

> **Note:** The `"-"` trick only works in JavaScript because an array can hold mixed types. It also fails if the matrix could legitimately contain `"-"`.

---

## Approach 2: Row and column flag arrays (`setZeroesBetter`)

### Idea
Use two small arrays as checklists: `rows[i] = 1` means "row `i` must become zero", `cols[j] = 1` means "column `j` must become zero". Fill them in one pass, then apply them in a second pass.

### Approach
1. Create `rows` (length n) and `cols` (length m), filled with `0`.
2. Pass 1: for every zero at `(i, j)`, set `rows[i] = 1` and `cols[j] = 1`.
3. Pass 2: set `matrix[i][j] = 0` if `rows[i] == 1` or `cols[j] == 1`.

### Dry Run (`[[0,1,2,0],[3,4,5,2],[1,3,1,5]]`)
Zeros at `(0,0)` and `(0,3)`, so `rows = [1,0,0]` and `cols = [1,0,0,1]`.

| cell | rows[i] or cols[j] set? | result |
|---|---|---|
| any in row 0 | rows[0] = 1 | 0 |
| (1,0), (2,0) | cols[0] = 1 | 0 |
| (1,3), (2,3) | cols[3] = 1 | 0 |
| (1,1) = 4 | no | stays 4 |

Output `[[0,0,0,0],[0,4,5,0],[0,3,1,0]]`.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n·m) | Two full passes over the grid. |
| Space | O(n + m) | The `rows` and `cols` arrays. |

---

## Approach 3: Store zero positions in a Map (`setZeroesWithHash`)

### Idea
Save the position of every original zero as a key like `"1,1"`. Then, for each saved position, clear its row and column.

### Approach
1. Scan the grid. For every zero, `hashMap.set(i + "," + j, 0)`.
2. For each key, split it back into `row` and `col`, then walk the **whole grid** and zero any cell in that row or column.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n·m + k·n·m) | For each of the k zeros, the code walks the entire grid instead of one row and one column. |
| Space | O(k) | One map entry per original zero. |

The second part walks the full grid once **per zero**, so in the worst case (k = n·m) it is O((n·m)²). Only walking row `row` and column `col` would bring it down to O(k·(n + m)).

> **Note:** `hashMap.keys().forEach(...)` uses iterator helpers, which are new (Node 22+, recent browsers). On older runtimes it throws `TypeError: forEach is not a function`. `hashMap.forEach((_, key) => ...)` works everywhere.

---

## Approach 4: Use the first row and column as flags (`setZeroesOpt`) ⭐

### Idea
Approach 2 needs two extra arrays. But the matrix already has a spare row and column we can borrow: **row 0** and **column 0**.
- `matrix[r][0] = 0` means "row `r` must be zeroed".
- `matrix[0][c] = 0` means "column `c` must be zeroed".

One problem: `matrix[0][0]` sits in both, so it can't stand for "row 0" and "column 0" at the same time. The code lets `matrix[0][0]` mean **row 0**, and uses a separate boolean, `ColZero`, for **column 0**.

### Approach
1. **Mark.** For every zero at `(r, c)`:
   - set `matrix[r][0] = 0` (row flag),
   - if `c !== 0`, set `matrix[0][c] = 0` (column flag), else set `ColZero = true`.
2. **Fill the inside.** For every cell with `r ≥ 1` and `c ≥ 1`, set it to `0` if its row flag or column flag is `0`.
3. **Row 0.** If `matrix[0][0] === 0`, zero the whole first row.
4. **Column 0.** If `ColZero`, zero the whole first column.

Steps 3 and 4 come **last** because row 0 and column 0 hold the flags. Clearing them earlier would destroy the information step 2 needs.

### Dry Run (`[[0,1,2,0],[3,4,5,2],[1,3,1,5]]`)

Step 1 (marking):

| zero at | row flag | column flag |
|---|---|---|
| (0,0) | `matrix[0][0] = 0` | `c = 0` → `ColZero = true` |
| (0,3) | `matrix[0][0] = 0` | `matrix[0][3] = 0` |

Step 2: inside cells `(1..2, 1..3)`. Only column 3 has its flag set, so `(1,3)` and `(2,3)` become 0.
```
0 1 2 0
3 4 5 0
1 3 1 0
```
Step 3: `matrix[0][0] === 0`, so row 0 becomes `[0,0,0,0]`.
Step 4: `ColZero` is true, so column 0 becomes 0.
```
0 0 0 0
0 4 5 0
0 3 1 0
```

### Code Walkthrough
```js
matrix[r][0] = 0;
if (c !== 0) matrix[0][c] = 0;
else ColZero = true;
```
Writing these flags during the scan is safe. `matrix[r][0]` is in the current row, which the scan already passed (column 0 is read first). `matrix[0][c]` is in row 0, which was fully read already (or, when `r = 0`, it is the cell that is already 0). So the scan never sees a fake zero.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n·m) | One marking pass, one fill pass, plus one row and one column. |
| Space | O(1) | Flags live inside the matrix, plus one boolean. |

---

## Comparison

| Approach | Time | Extra space |
|---|---|---|
| 1. Placeholder `"-"` | O(n·m·(n + m)) | O(1) |
| 2. Row/column arrays | O(n·m) | O(n + m) |
| 3. Map of zero positions | O(k·n·m) | O(k) |
| 4. First row/column as flags | O(n·m) | O(1) |

## Edge Cases
- **No zeros**: nothing changes in any approach.
- **Zero in the first row or column**: the reason approach 4 needs `ColZero` and the "do row 0 and column 0 last" order.
- **Zero at `(0,0)`**: sets both `matrix[0][0]` (row 0) and `ColZero` (column 0), so both get cleared.
- **All zeros**: every approach returns all zeros. Approach 3 is slowest here.
- **Single row or column**: all approaches work, since the loops simply have length 1 in one direction.

## Key Takeaway
**Don't zero while you scan. First record which rows and columns to clear, then clear them.** For O(1) space, store those flags in row 0 and column 0, and handle row 0 and column 0 last.
