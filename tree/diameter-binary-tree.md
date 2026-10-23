# Diameter of Binary Tree

## Problem
The **diameter** is the length of the longest path between **any two nodes** in the tree, counted in **edges** (the links between nodes). The path does **not** have to go through the root.

```
        1
       / \
      2   3
     / \
    4   5
       / \
      6   7
Output: 4   (path 6 → 5 → 2 → 1 → 3, which has 4 edges)
```

## Idea (Intuition)
Every path has one "highest" node where it turns, going down-left on one side and down-right on the other. At that node the path length is:

```
height(left subtree) + height(right subtree)
```

So while computing heights with the usual post-order recursion (see `max-depth-tree.md`), check `lh + rh` at **every** node and remember the biggest one. One pass gives both the heights and the diameter.

## Approach
1. Keep a running best, `max = 0`.
2. `height(node)`:
   1. If `node` is `null`, return `0`.
   2. Get `lh = height(left)` and `rh = height(right)`.
   3. Update `max = Math.max(max, lh + rh)`, the longest path that turns at this node.
   4. Return `1 + Math.max(lh, rh)`, this node's height, for its parent to use.
3. Call `height(root)` and return `max`.

## Dry Run
How it is **meant** to work on the example tree:

| Node | lh | rh | lh + rh (path through node) | max so far | returns height |
|---|---|---|---|---|---|
| 4 | 0 | 0 | 0 | 0 | 1 |
| 6 | 0 | 0 | 0 | 0 | 1 |
| 7 | 0 | 0 | 0 | 0 | 1 |
| 5 | 1 | 1 | 2 | 2 | 2 |
| 2 | 1 | 2 | 3 | 3 | 3 |
| 3 | 0 | 0 | 0 | 3 | 1 |
| 1 | 3 | 1 | **4** | **4** | 4 |

Answer: **4**.

## Code Walkthrough
```js
function height(node, max) { ... max = Math.max(max, lh + rh); ... }
max = height(root, max);
return max;
```

> **Note: bug, it returns the height, not the diameter.** `max` is passed as a **parameter**. Numbers in JS are copied when passed, so `max = Math.max(...)` inside `height` only changes a local copy, and the outer `max` never sees it. Then `max = height(root, max)` replaces `max` with the root's **height**. The example prints `4` only by coincidence, because here the height (4 nodes: 1 → 2 → 5 → 6) equals the diameter (4 edges).
> Counterexamples: a single node returns `1` (should be `0`). In a tree where the longest path doesn't pass through the root, it returns the height.
> Fix: remove the `max` parameter so `height(node)` updates the outer `max` through the closure, call `height(root)` without using its return value, then `return max`.

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | Each node is visited once, with O(1) work per visit. |
| Space | O(h) | Recursion stack depth = tree height h (O(log n) balanced, O(n) skewed). |

## Edge Cases
- **Empty tree**: diameter `0`.
- **Single node**: diameter `0` (no edges). The current code returns `1`.
- **Longest path not through the root**: for example, a root whose only child has two long branches. That's why `max` has to be checked at every node, not just at the root.
- **Edges vs nodes**: this problem (LeetCode 543) counts edges. If you need nodes instead, add 1.

## Key Takeaway
**Compute height bottom-up and update a global best with `lh + rh` at every node.** It's the same template as max depth, plus one line. Keep the best in an outer variable (closure), not in a number parameter.
