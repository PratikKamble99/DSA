# Container With Most Water

## Problem
Each number in `height` is a vertical line. Pick **two lines** that, together with the x-axis, hold the most water. Return that amount of water.

The water between lines `i` and `j` is:
```
area = width × height = (j − i) × min(height[i], height[j])
```
The **shorter** line sets the height. Water above it would spill over.

```
[1, 8, 6, 2, 5, 4, 8, 3, 7]  →  49   (lines at index 1 and 8: width 7 × height min(8, 7) = 7)
[1, 1]                        →  1
```

Below, **n** = the number of lines.

---

## Approach 1: Try every pair (brute force)

The file only mentions this approach in a comment; it isn't written as code.

### Idea
Check every pair `(i, j)` with two nested loops, calculate its area, and keep the largest.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n²) | Two nested loops check about n²/2 pairs. |
| Space | O(1) | Only a `max` variable. |

---

## Approach 2: Two pointers (`maxArea`) ⭐

### Idea
Start with the **widest** container: `start` at the first line and `end` at the last. After that, every step makes the container narrower. A narrower container can only hold more water if it gets **taller**.

The height is limited by the **shorter** line. Keeping the shorter line and moving the taller one inward can never help: the width shrinks and the height is still capped by that same short line. So the only move that might help is to **move the shorter line inward**, hoping to find a taller one.

If both lines are the same height, move both. Any container that keeps either one would be narrower and no taller, so neither line can be part of a better answer.

### Approach
1. Set `start = 0`, `end = n - 1` and `max = 0`.
2. While `start < end`:
   - Compute the area `(end − start) × min(height[start], height[end])`.
   - Move the pointer at the **shorter** line inward. If the lines are equal, move both.
   - Update `max`.
3. Return `max`.

### Dry Run (`[1, 8, 6, 2, 5, 4, 8, 3, 7]`)

| start | end | width | min height | area | max | Move |
|---|---|---|---|---|---|---|
| 0 (1) | 8 (7) | 8 | 1 | 8 | 8 | left is shorter → `start++` |
| 1 (8) | 8 (7) | 7 | 7 | **49** | 49 | right is shorter → `end--` |
| 1 (8) | 7 (3) | 6 | 3 | 18 | 49 | `end--` |
| 1 (8) | 6 (8) | 5 | 8 | 40 | 49 | equal → move both |
| 2 (6) | 5 (4) | 3 | 4 | 12 | 49 | `end--` |
| 2 (6) | 4 (5) | 2 | 5 | 10 | 49 | `end--` |
| 2 (6) | 3 (2) | 1 | 2 | 2 | 49 | `end--` → pointers meet, stop |

Result: **49** ✅

### Code Walkthrough
```js
const min_height = Math.min(height[start], height[end]);
const total_water = w * min_height;
```
The area uses the shorter line, because water can only fill up to the lower edge.

```js
if (height[start] < height[end]) start++;
else if (height[start] > height[end]) end--;
else { start++; end--; }
```
Always drop the shorter line, since it can't be part of a bigger container. When the lines are equal, drop both.

```js
max = Math.max(total_water, max);
```
This runs after the pointers move, but it uses `total_water` from before they moved, so it's still correct.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | Each step moves at least one pointer inward, so the loop runs at most n − 1 times. |
| Space | O(1) | Only a few variables. |

---

## Comparison

| Approach | Time | Space |
|---|---|---|
| 1. Every pair | O(n²) | O(1) |
| 2. Two pointers | O(n) | O(1) |

## Edge Cases
- **Two lines** (`[1, 1]`): only one container, so the answer is `1 × 1 = 1`.
- **Tallest lines at both ends** (`[4, 3, 2, 1, 4]`): the widest container wins, `4 × 4 = 16`.
- **All zeros** (`[0, 0, 0]`): no water can be held, so the answer is `0`.
- **Equal heights**: both pointers move, as explained in the Idea section.
- **Fewer than 2 lines** (`[]` or `[5]`): the loop never runs, so it returns `0`.

## Key Takeaway
Start as **wide** as possible and always **move the shorter side inward**. It's the only move that could find a bigger area, which makes one O(n) pass enough.
