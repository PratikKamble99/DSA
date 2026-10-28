# Rotting Oranges

## Problem
You get a grid where `0` = empty cell, `1` = fresh orange, `2` = rotten orange. Every minute, a rotten orange makes its fresh neighbours (up, down, left, right) rotten. Return the minimum minutes until no fresh orange is left, or `-1` if some orange can never rot.

Example: `[[2,1,1],[1,2,0],[0,1,1]]` → `2`

```
2 1 1        minute 1        minute 2
1 2 0   →    2 2 1     →     2 2 2
0 1 1        2 2 0           2 2 0
             0 2 1           0 2 2
```

The file has two solutions:

1. **DFS with a time grid**: `orangesRotting` (lines 5–41)
2. **Multi-source BFS**: `orangesRotting_2` (lines 44–69)

> Note: `print(orangesRotting(grid))` at the bottom runs only the **DFS** version, which prints the time grid and `2`, then `None` (see the bug below). To run the BFS version, call `orangesRotting_2(grid)`. Pass it a copy, such as `[row[:] for row in grid]`, because it changes the grid.

---

## Approach 1: DFS with a time grid: `orangesRotting`

### Idea (Intuition)
Every cell asks: "How soon can rot reach me?" The answer is its shortest distance (in steps) to the nearest rotten orange.

DFS (depth-first search: keep walking in one direction until you can't, then back up) starts from each rotten orange and writes "you rot on minute X" into a `time` grid. If a cell already holds a smaller or equal minute, the walk stops there. If the new minute is smaller, the cell is overwritten and the walk continues.

At the end, the answer is the largest minute on any fresh orange. If a fresh orange still holds "infinity", rot never reached it, so the answer is `-1`.

### Approach
1. If the grid is empty, return `-1`.
2. Build a `time` grid: oranges start at `inf` (not reached yet), empty cells start at `-inf` (acts as a wall).
3. For every rotten orange, run `dfs(r, c, 0)`.
4. In `dfs`, stop if out of bounds or `time[r][c] <= currentDays`. Otherwise write `currentDays` and recurse to all 4 neighbours with `currentDays + 1`.
5. Scan the fresh oranges. If any has `time == inf`, return `-1`. Otherwise take the max time.

### Dry Run
Rotten oranges are at `(0,0)` and `(1,1)`.

**DFS from (0,0).** It goes down first, so some cells are reached by a long path before a short one:

| Step | Cell | Days | What happens |
|---|---|---|---|
| 1 | (0,0) | 0 | set 0 |
| 2 | (1,0) | 1 | set 1 |
| 3 | (1,1) | 2 | inf > 2, set 2 (long way round) |
| 4 | (0,1) | 3 | set 3 |
| 5 | (0,2) | 4 | set 4 |
| 6 | (2,1) | 3 | set 3 |
| 7 | (2,2) | 4 | set 4 |
| 8 | (0,1) | 1 | 3 > 1, overwrite with 1 |
| 9 | (0,2) | 2 | 4 > 2, overwrite with 2 |

**DFS from (1,1).**

| Step | Cell | Days | What happens |
|---|---|---|---|
| 1 | (1,1) | 0 | 2 > 0, set 0 |
| 2 | (0,1) | 1 | 1 <= 1, stop |
| 3 | (2,1) | 1 | 3 > 1, set 1 |
| 4 | (2,2) | 2 | 4 > 2, set 2 |
| 5 | (1,0) | 1 | 1 <= 1, stop |

Final `time`: `[[0,1,2],[1,0,-inf],[-inf,1,2]]`. The max over fresh oranges is **2**.

### Code Walkthrough
- `math.inf if grid[r][c] in (1,2) else -math.inf`: the `-inf` on empty cells blocks them. `-inf <= currentDays` is always true, so the DFS returns right away.
- `time[r][c] <= currentDays`: one check does two jobs. It marks a cell as visited, and it still lets a faster path update the cell.
- `if time[r][c] == math.inf: return -1`: a fresh orange no rotten orange could reach.

> Note: **Bug:** this version never returns `time_req`. It ends with `print(time, time_req)`, so it returns `None`. Replace the print with `return time_req`.

> Note: An empty grid returns `-1`, but `0` is the usual expected answer. Also, `grid == None` should be `grid is None`.

### Complexity (m × n = number of cells)
| | Complexity | Why |
|---|---|---|
| Time | O((m·n)²) worst case | DFS doesn't visit cells in order of distance, so a cell can be overwritten many times (see (0,1) going 3 → 1), and every rotten orange starts its own DFS. |
| Space | O(m·n) | `time` grid, plus a recursion stack that can be m·n deep. Large grids can hit Python's recursion limit. |

---

## Approach 2: Multi-source BFS: `orangesRotting_2` (the optimal one)

### Idea (Intuition)
Picture dropping several stones in a pond at the same moment. Ripples spread out from every stone together, one ring per second. Rot spreads the same way: all rotten oranges spread **at the same time**, one step per minute.

BFS (breadth-first search) is built for this. It visits everything 1 step away, then everything 2 steps away, and so on. It uses a **queue** (first in, first out, like a line at a shop).

The trick is **multi-source**: instead of starting BFS from one rotten orange, put **all** rotten oranges in the queue at the start. Then:

- Everything in the queue right now = the oranges that are rotten at this minute.
- Processing that whole batch gives the oranges that rot in the **next** minute.
- One batch = one minute. Count the batches and you have the answer.

Each fresh orange is reached first by its shortest path, and it's marked rotten right away, so it's never processed twice. That's why BFS needs no "overwrite with a smaller time" step like the DFS does.

We also keep a `fresh` counter. If it reaches 0, we're done. If the queue runs empty while `fresh > 0`, some oranges are cut off, so the answer is `-1`.

### Approach
1. Scan the grid once:
   - rotten (`2`) → add `(r, c)` to the queue
   - fresh (`1`) → `fresh += 1`
2. Set `mins = 0`.
3. While the queue isn't empty **and** `fresh > 0`:
   1. Take `size = len(q)`. That's how many oranges are rotten at the start of this minute.
   2. Pop exactly `size` cells. For each one, look at its 4 neighbours.
   3. If a neighbour is inside the grid and fresh: set it to `2`, do `fresh -= 1`, and push it to the queue (it will spread next minute).
   4. After the batch, `mins += 1`.
4. Return `mins` if `fresh == 0`, else `-1`.

### Dry Run
Grid `[[2,1,1],[1,2,0],[0,1,1]]`. Directions order: right, down, up, left.

**Setup:** queue = `[(0,0), (1,1)]`, `fresh = 5`, `mins = 0`.

**Minute 1** (batch size 2):

| Pop | Neighbour checked | Fresh? | Action | fresh |
|---|---|---|---|---|
| (0,0) | (0,1) right | yes | rot, push | 4 |
| (0,0) | (1,0) down | yes | rot, push | 3 |
| (0,0) | up / left | out of grid | skip | 3 |
| (1,1) | (1,2) right | no (empty) | skip | 3 |
| (1,1) | (2,1) down | yes | rot, push | 2 |
| (1,1) | (0,1) up | no (now rotten) | skip | 2 |
| (1,1) | (1,0) left | no (now rotten) | skip | 2 |

`mins = 1`, queue = `[(0,1), (1,0), (2,1)]`

```
2 2 1
2 2 0
0 2 1
```

**Minute 2** (batch size 3):

| Pop | Neighbour checked | Fresh? | Action | fresh |
|---|---|---|---|---|
| (0,1) | (0,2) right | yes | rot, push | 1 |
| (0,1) | (1,1) down, (0,0) left | no | skip | 1 |
| (1,0) | (1,1), (2,0), (0,0) | no | skip | 1 |
| (2,1) | (2,2) right | yes | rot, push | 0 |
| (2,1) | (1,1) up, (2,0) left | no | skip | 0 |

`mins = 2`. Now `fresh == 0`, so the loop stops. **Return 2.**

```
2 2 2
2 2 0
0 2 2
```

### Code Walkthrough
- `q = deque()`: `deque` gives O(1) `popleft()`. A plain list's `pop(0)` is O(n).
- First double loop: queues **every** rotten orange at once (this is the "multi-source" part) and counts fresh ones.
- `directions = [(0,1),(1,0),(-1,0),(0,-1)]`: the 4 moves. `nr, nc = r+dr, c+dc` gives the neighbour.
- `for _ in range(len(q)):`: `len(q)` is read **once** at the start of the loop, so only the current minute's oranges are processed. Newly rotted ones wait for the next round. This line turns plain BFS into "one round = one minute".
- `grid[nr][nc] = 2` happens **when pushing**, not when popping. That stops the same orange from being pushed twice by two neighbours.
- `while q and fresh > 0`: the `fresh > 0` part matters. Without it, the last batch (oranges that have nothing left to infect) would still be processed and add one extra minute.
- `return mins if fresh == 0 else -1`: leftover fresh oranges mean some were unreachable.

> Note: This version **changes the input grid** (fresh cells become `2`). That's fine on LeetCode, but copy the grid first if the caller still needs it.

> Note: An empty grid `[]` crashes on `len(grid[0])` with an IndexError. Add `if not grid: return 0` to guard it.

### Complexity (m × n = number of cells)
| | Complexity | Why |
|---|---|---|
| Time | O(m·n) | The first scan touches each cell once. In the BFS, each orange is pushed and popped at most once, and checks 4 neighbours (constant work). |
| Space | O(m·n) | In the worst case (all oranges rotten at the start) the queue holds every cell. |

---

## Edge Cases
- **No fresh oranges:** BFS skips the loop because `fresh == 0` and returns `0`. DFS also gets `0` (but returns `None` because of its bug).
- **No rotten oranges but some fresh:** the queue is empty, the loop never runs, `fresh > 0`, so the answer is `-1`.
- **Fresh orange surrounded by empty cells:** nothing reaches it, so the answer is `-1`.
- **Several rotten oranges:** BFS spreads from all of them together, and DFS keeps the minimum time per cell.
- **Empty grid:** DFS returns `-1`, and BFS crashes (see the note above).

## Comparison
| | DFS + time grid | Multi-source BFS |
|---|---|---|
| Time | O((m·n)²) worst case | O(m·n) |
| Space | O(m·n) (time grid + recursion stack) | O(m·n) (queue) |
| Visits per cell | Many (overwritten when a faster path is found) | Once |
| Modifies input | No | Yes |
| Returns answer | No (prints it, bug) | Yes |

## Key Takeaway
When something spreads from many sources at the same time and you need "how many steps", put all sources in one queue and BFS level by level: one level = one time unit.
