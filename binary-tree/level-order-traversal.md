# Binary Tree Level Order Traversal

## Problem
Return the tree's values **level by level**, from top to bottom and left to right on each level, as a list of lists.

```
        1
       / \
      2   3
     / \ / \
    4  5 6  7
Output: [[1], [2, 3], [4, 5, 6, 7]]
```

## Idea (Intuition)
Use a **queue** (first in, first out, like a line at a shop). Start with the root in it. Remove a node, record it, and add its children to the back of the line. Children always join **behind** everything already waiting, so nodes come out one level at a time. This is **BFS** (Breadth-First Search: explore wide before going deep).

To split the output into levels, look at the queue's size at the start of each round. That number is exactly how many nodes are on the current level, so take that many and no more.

## Approach
1. Create `ans = []` and a queue (`Queue2`, imported from `queue/queue-implementation.js`). Push `root`.
2. While the queue is not empty:
   1. `size = queue.size`, the number of nodes on this level.
   2. Repeat `size` times: pop a node, push its `left` and `right` children if they exist, and add `node.value` to `level`.
   3. Push `level` into `ans`.
3. Print `ans`.

## Dry Run

| Round | Queue at start | size | Popped (→ level) | Children pushed | ans after |
|---|---|---|---|---|---|
| 1 | [1] | 1 | 1 | 2, 3 | [[1]] |
| 2 | [2, 3] | 2 | 2, 3 | 4, 5, 6, 7 | [[1], [2, 3]] |
| 3 | [4, 5, 6, 7] | 4 | 4, 5, 6, 7 | none | [[1], [2, 3], [4, 5, 6, 7]] |
| | [] | stop | | | |

Running the file prints `[ [ 1 ], [ 2, 3 ], [ 4, 5, 6, 7 ] ]`.

## Code Walkthrough
```js
const size = queue.size;
for (let i = 1; i <= size; i++) { ... }
```
The size is saved **before** the loop. While popping, children get pushed and `queue.size` changes. Saving it first keeps the next level's nodes out of the current level.

`Queue2` uses a moving `start` index instead of `Array.shift()`, so `pop` is O(1). With `shift()`, each pop would be O(n), and the whole traversal could become O(n²).

> **Note:** an empty tree crashes. If `root` is `null`, it still gets pushed, and then `node.left` throws `TypeError`. Add `if (!root) return [];` at the top.

> **Note:** the function only `console.log`s the result and returns `undefined`. For LeetCode (102) it should `return ans`.

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | Each node is pushed and popped exactly once, and `Queue2` push/pop are O(1). |
| Space | O(n) | The answer holds all n values. The queue holds up to one full level, about n/2 nodes for the last level of a full tree. (`Queue2` also never frees popped slots, so its array grows to n.) |

## Edge Cases
- **Empty tree**: should return `[]`, but currently crashes (see the note above).
- **Single node**: `[[value]]`.
- **Skewed tree** (one child per node): one value per level, e.g. `[[1], [2], [3]]`.
- **Missing children**: only non-null children are pushed, so gaps in the tree don't add `null`s.

## Key Takeaway
**BFS with a queue, and save `queue.size` at the start of each round to separate levels.** The same template solves right-side view, zigzag order, level averages, and minimum depth.
