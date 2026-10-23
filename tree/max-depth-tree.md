# Maximum Depth of Binary Tree

## Problem
Find the **maximum depth** of a binary tree: the number of nodes on the longest path from the root down to a leaf (a node with no children).

```
        1
       / \
      2   3
     / \
    4   5
       / \
      6   7
           \
            8
Output: 5   (path 1 → 2 → 5 → 7 → 8)
```

## Idea (Intuition)
Ask each node one question: "How deep is the tree under you?" A node answers by asking its left and right children, taking the bigger answer, and adding **1** for itself. An empty spot (`null`) has depth **0**. That's all there is to it. The answers bubble up from the leaves to the root.

## Approach
1. **Base case:** if `node` is `null`, return `0`.
2. Recursively get the left subtree's depth `lh`.
3. Recursively get the right subtree's depth `rh`.
4. Return `1 + Math.max(lh, rh)`.

## Dry Run
Answers come back bottom-up (children before parents):

| Node | lh (left depth) | rh (right depth) | returns 1 + max |
|---|---|---|---|
| 4 | 0 | 0 | 1 |
| 6 | 0 | 0 | 1 |
| 8 | 0 | 0 | 1 |
| 7 | 0 (null) | 1 (node 8) | 2 |
| 5 | 1 (node 6) | 2 (node 7) | 3 |
| 2 | 1 (node 4) | 3 (node 5) | 4 |
| 3 | 0 | 0 | 1 |
| 1 | 4 (node 2) | 1 (node 3) | **5** |

Running the file prints `5`.

## Code Walkthrough
```js
if (!node) return 0;
```
The stopping point. Every path ends at a `null` child, and a missing node adds no depth.

```js
return 1 + Math.max(lh, rh);
```
Count this node (`1`) plus the deeper of its two sides. This is **post-order** recursion: work on the children first, then the node itself.

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | Each of the n nodes is visited exactly once, and each visit does O(1) work. |
| Space | O(h) | The recursion stack is as deep as the tree height h. That's O(log n) for a balanced tree and O(n) for a skewed one (a tree that is basically a linked list). |

## Edge Cases
- **Empty tree (`null`)**: returns `0`.
- **Single node**: returns `1`.
- **Skewed tree** (every node has only one child): depth = n. A very deep tree (around 10,000+ levels) can overflow the JS call stack. Use an iterative BFS that counts levels if that matters.

## Key Takeaway
**Tree height = 1 + max(left height, right height)**, with `null` → 0. This post-order pattern is the base for many tree problems (diameter, balanced check, and others).
