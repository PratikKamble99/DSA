# Largest Rectangle in Histogram

## Problem
You get an array of bar heights. Each bar is 1 unit wide, and the bars stand side by side. Find the area of the biggest rectangle you can draw inside the bars.

- Input: `[2, 1, 5, 6, 2, 3]`
- Output: `10` (bars `5` and `6` together give height `5` × width `2`)

A rectangle that covers several bars can only be as tall as the **shortest** bar it covers.

> Note: The file defines `largestRectangleArea` twice. In JavaScript the second definition replaces the first, so the `console.log` lines only run **Approach 2** (the stack). Approach 1 is never called.

---

## Approach 1: Brute Force (try every range)

### Idea (Intuition)
Try every possible range of bars `i..j`. The rectangle over that range has height = the shortest bar in the range, and width = `j - i + 1`. Keep the biggest area.

The shortest bar is easy to track: when you add bar `j` to the range, the new minimum is `min(old minimum, heights[j])`. So you don't need a third loop.

### Approach
1. Set `best = 0`.
2. For each start bar `i`:
   - Reset `minHeight = Infinity`.
   - For each end bar `j` from `i` onward:
     - Update `minHeight` with `heights[j]`.
     - Area = `minHeight * (j - i + 1)`. Update `best`.
3. Return `best`.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n²) | two nested loops check every pair `(i, j)` |
| Space | O(1) | only a few variables |

---

## Approach 2: Monotonic Stack (the one that runs)

### Idea (Intuition)
For each bar, ask: "If this bar is the **shortest** in the rectangle, how far left and right can the rectangle stretch?" It stretches until it hits a shorter bar on each side.

Keep a **stack** (a pile where you only add to and take from the top) of bars whose rectangles are still growing to the right. Each item is `[start, height]`:
- `height` is the bar's height.
- `start` is how far **left** a rectangle of that height can reach.

The heights on the stack only go **up** from bottom to top. That's why it's called a *monotonic stack* (values move in one direction only).

When a **shorter** bar arrives, every taller bar on top can't grow any further right. Pop each one, compute its area (`height × (i - start)`), and remember its `start`. The new shorter bar can reach back to that `start`, because every bar in between was taller than it.

At the end, any bar still on the stack can stretch all the way to the right edge.

### Approach
1. Start with an empty `stack` and `maxArea = 0`.
2. For each bar `i`:
   - Set `start = i`.
   - While the top of the stack is **taller** than `heights[i]`:
     - Pop `[idx, height]`.
     - Area = `height * (i - idx)` (it reaches from `idx` up to just before `i`). Update `maxArea`.
     - Set `start = idx` (the current bar can reach this far left).
   - Push `[start, heights[i]]`.
3. After the loop, pop every leftover `[idx, height]`. Its area is `height * (n - idx)`, because it reaches the right end.
4. Return `maxArea`.

### Dry Run
Input: `[2, 1, 5, 6, 2, 3]`, `n = 6`. Stack items are `[start, height]`.

| i | h | Pops → area | start pushed | Stack after | maxArea |
|---|---|---|---|---|---|
| 0 | 2 | none | 0 | `[0,2]` | 0 |
| 1 | 1 | `[0,2]` → 2×(1−0) = 2 | 0 | `[0,1]` | 2 |
| 2 | 5 | none | 2 | `[0,1] [2,5]` | 2 |
| 3 | 6 | none | 3 | `[0,1] [2,5] [3,6]` | 2 |
| 4 | 2 | `[3,6]` → 6×1 = 6, `[2,5]` → 5×2 = **10** | 2 | `[0,1] [2,2]` | 10 |
| 5 | 3 | none | 5 | `[0,1] [2,2] [5,3]` | 10 |

Leftovers (each reaches the right end, `n = 6`):

| Pop | Area |
|---|---|
| `[5,3]` | 3 × (6−5) = 3 |
| `[2,2]` | 2 × (6−2) = 8 |
| `[0,1]` | 1 × (6−0) = 6 |

Answer: `10` ✓

At `i = 4` the height-2 bar is pushed with `start = 2`, not 4. It inherits the start of the taller bars it popped, so later its rectangle spans bars 2–5 (area 8).

### Code Walkthrough
- `stack[stack.length - 1][1] > heights[i]` pops only **strictly taller** bars. Bars of equal height stay, and the earlier one keeps the leftmost `start`, so nothing is lost.
- `const area = height * (i - idx);` the popped bar's rectangle runs from `idx` to `i - 1`, which is `i - idx` bars wide.
- `start = idx;` passes the leftmost reach down to the current, shorter bar. This is the key trick: no need to search left again.
- `stack.push([start, heights[i]]);` stores the stretched start instead of `i`.
- The final `while` loop handles bars that never met a shorter bar on their right: width = `heights.length - idx`.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | each bar is pushed once and popped at most once, so all the `while` loops together run at most n times |
| Space | O(n) | the stack can hold every bar when heights keep rising (e.g. `[1, 2, 3, 4, 5]`) |

---

## Comparison
| | Brute Force | Monotonic Stack |
|---|---|---|
| Time | O(n²) | O(n) |
| Space | O(1) | O(n) |
| Idea | try every range, track its min | each bar as the shortest: find how far it stretches |

## Edge Cases
- One bar `[5]` → `5` (popped in the final loop: 5 × 1).
- All equal `[3, 3, 3]` → `9`. Nothing is popped (`>` is strict). In the final loop `[0,3]` gives 3 × 3.
- Rising `[1, 2, 3, 4, 5]` → `9`. Nothing is popped in the main loop. The final loop finds `3 × (5−2) = 9`.
- Falling `[5, 4, 3, 2, 1]` → `9`. Each new bar pops the previous one and inherits `start = 0`. At `i = 3`, popping `[0,3]` gives `3 × (3−0) = 9`.
- A dip `[2, 1, 2]` → `3`. The short bar in the middle spans everything: 1 × 3.
- Empty `[]` → `0`.

## Key Takeaway
For "how far can each bar stretch before hitting a smaller one" problems, use a monotonic stack. When a bar is popped, its area is known, and the bar that popped it inherits its left start.
