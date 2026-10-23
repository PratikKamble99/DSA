# Count Good Nodes in Binary Tree

## Problem
A node is **good** if no node on the path from the root down to it has a **bigger** value. Count the good nodes.

```
        3          good: 3 (root), 4, 5, and the bottom-left 3
       / \         not good: both 1s (a 3 above them is bigger)
      1   4
     /   / \
    3   1   5      →  4
```

The root is always good, because nothing is above it.

> Note: The comment at the top says "all prev nodes are **less than** current node". The correct rule is "no prev node is **greater than** current node", so equal values count as good. The bottom-left `3` (path `3 → 1 → 3`) is good. The code gets this right by using `<=`. Only the comment is wrong.

## Idea (Intuition)
Walk down the tree carrying one number: **the biggest value seen on the path so far** (`maxNode`). At each node, ask one question: "Is my value at least as big as everything above me?" That's simply `maxNode <= node.val`. Then pass the updated max down to both children.

You only need the max, not the whole path. If a node is at least as big as the biggest node above it, it's at least as big as all of them.

## Approach
1. If the node is `null`, return 0.
2. If `maxNode <= root.val`, this node is good, so count it as 1.
3. Update `maxNode = max(maxNode, root.val)` for the children.
4. Add the good nodes from the left subtree and from the right subtree.
5. Return the total.

This visits the node first and then its children, which is **preorder DFS** (depth-first search: go all the way down one branch before trying the next).

## Dry Run (tree above)

| Call order | Node | `maxNode` passed in | Good? (`maxNode <= val`) | `maxNode` for children | Returns |
|---|---|---|---|---|---|
| 1 | 3 (root) | −∞ | ✅ −∞ ≤ 3 | 3 | 1 + 1 + 2 = **4** |
| 2 | 1 (left) | 3 | ❌ 3 ≤ 1 is false | 3 | 0 + 1 + 0 = 1 |
| 3 | 3 (left of 1) | 3 | ✅ 3 ≤ 3 | 3 | 1 + 0 + 0 = 1 |
| 4 | 4 (right) | 3 | ✅ 3 ≤ 4 | 4 | 1 + 0 + 1 = 2 |
| 5 | 1 (left of 4) | 4 | ❌ 4 ≤ 1 is false | 4 | 0 |
| 6 | 5 (right of 4) | 4 | ✅ 4 ≤ 5 | 5 | 1 |

The `null` children return 0 and are left out of the table. Answer: **4** ✅

How the totals come back up:
```
3 → 1 (itself) + 1 (from the left: node 1's subtree) + 2 (from the right: node 4's subtree) = 4
```

## Code Walkthrough
```js
var goodNodes = function (root, maxNode = -Infinity, count = 0)
```
`maxNode` starts at `-Infinity`, so the root always counts as good, even if its value is negative. LeetCode calls `goodNodes(root)`, so the defaults kick in.

```js
if (maxNode <= root.val) count = 1;
```
Each call counts only **itself** (0 or 1). The children's counts are added on the next lines.

```js
count += goodNodes(root.left, maxNode);
count += goodNodes(root.right, maxNode);
```
Each child gets its own copy of `maxNode`. Changing it in the left branch can't affect the right branch, so each path keeps its own max.

The `count` parameter is never passed in the recursive calls, so it's always 0 when a call starts. It could be a local `let count = 0;` instead. That's harmless, just unneeded.

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | Each of the n nodes is visited once, with O(1) work per node. |
| Space | O(h) | The recursion stack is as deep as the tree height h. That's O(log n) for a balanced tree and O(n) for a skewed one (like a linked list). |

## Edge Cases
- **Empty tree** (`root = null`): returns 0.
- **Single node**: returns 1, since the root is always good.
- **Equal values** (`3 → 3`): both are good, because the check is `<=`.
- **Negative values**: fine, because `maxNode` starts at `-Infinity`, not 0.
- **Strictly decreasing path** (`5 → 4 → 3`): only the root is good.
- **Very deep skewed tree**: recursion may overflow the call stack. An iterative DFS with an explicit stack of `[node, maxSoFar]` pairs avoids that.

## Key Takeaway
**Pass the state down in DFS**: carry the "max so far" as an argument, so each node can decide in O(1) using only its own path.

---

See also: [Tree Types and Traversals](tree-types-and-traversals.md), which compares General Tree, Binary Tree and BST and explains pre, in, postorder, DFS and BFS.
