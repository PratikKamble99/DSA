# Tree Types and Traversals

## Part 1: General Tree vs Binary Tree vs Binary Search Tree

| Feature | General Tree | Binary Tree | Binary Search Tree (BST) |
|---|---|---|---|
| Max children per node | No limit | 2 (left and right) | 2 (left and right) |
| Ordering rule | None | None (any value can go anywhere) | Left subtree < Parent < Right subtree |
| How children are stored | A list/array of children | `left` and `right` pointers | `left` and `right` pointers |
| Search for a value | O(n): check every node | O(n): check every node | O(h): go left or right at each step. O(log n) if balanced, O(n) if skewed |
| Inorder traversal gives | Not defined (no "middle") | Values in no special order | Values in **sorted order** |
| Typical uses | File system folders, HTML DOM, org chart | Expression trees, heaps, Huffman coding | Sorted data, fast lookup/insert/delete, `TreeMap`/`TreeSet` |

### Examples
```
General Tree            Binary Tree             BST
      A                      5                      5
   /  |  \                  / \                    / \
  B   C   D                9   2                  3   8
 / \      |               / \                    / \   \
E   F     G              1   7                  1   4   9
(any number of        (max 2 children,       (left < parent < right,
 children)             no order rule)         at EVERY node)
```

**How they relate:** every BST is a binary tree, and every binary tree is a general tree. Not the other way round.

> The BST rule applies to whole **subtrees**, not just direct children: every value in the left subtree must be less than the parent. For example, a 6 placed anywhere in the left subtree of 5 breaks the BST, even if it's bigger than its own parent.

### Node shapes in JavaScript
```js
// General tree
{ val: "A", children: [nodeB, nodeC, nodeD] }

// Binary tree / BST
{ val: 5, left: node3, right: node8 }
```

### Words you'll see
- **Root**: the top node, which has no parent.
- **Leaf**: a node with no children.
- **Height (h)**: the number of levels on the longest root-to-leaf path. A balanced tree has h ≈ log n; a skewed tree (every node has one child) has h = n.
- **Subtree**: a node together with everything below it.

---

## Part 2: Traversals

A **traversal** visits every node once in a fixed order. There are two families:

| Family | Data structure | Order | Members |
|---|---|---|---|
| **DFS** (Depth-First Search) | Stack, or recursion (the call stack) | Goes deep down one branch before trying the next | Preorder, Inorder, Postorder |
| **BFS** (Breadth-First Search) | Queue | Goes level by level, left to right | Level order |

**Pre**, **in** and **post** are not separate from DFS. They are the three DFS orders. They differ only in **when you visit the node compared to its children**.

All the examples use this tree:
```
        1
       / \
      2   3
     / \   \
    4   5   6
```

| Traversal | Rule | Output |
|---|---|---|
| Preorder | **Node** → Left → Right | `1 2 4 5 3 6` |
| Inorder | Left → **Node** → Right | `4 2 5 1 3 6` |
| Postorder | Left → Right → **Node** | `4 5 2 6 3 1` |
| BFS / Level order | Level by level | `1 2 3 4 5 6` → `[[1], [2, 3], [4, 5, 6]]` |

**Memory trick:** the name tells you where the **node** goes. *Pre* = before its children, *in* = between them, *post* = after them. Left always comes before right.

---

### 1. Preorder (Node → Left → Right)

**Idea:** handle the node first, then dive into its children. You meet a parent before its children.

```js
function preorder(node, out = []) {
    if (!node) return out;
    out.push(node.val);        // node
    preorder(node.left, out);  // left
    preorder(node.right, out); // right
    return out;
}
```

**Dry run:**

| Step | At node | Action | Output so far |
|---|---|---|---|
| 1 | 1 | visit, go left | `1` |
| 2 | 2 | visit, go left | `1 2` |
| 3 | 4 | visit (leaf), back to 2, go right | `1 2 4` |
| 4 | 5 | visit (leaf), back to 1, go right | `1 2 4 5` |
| 5 | 3 | visit; no left child, go right | `1 2 4 5 3` |
| 6 | 6 | visit (leaf), done | `1 2 4 5 3 6` |

**Use it for:** copying or serializing a tree (the parent comes before its children, so you can rebuild it), printing folder structures, and "pass state down" problems like [Count Good Nodes](count-good-nodes-in-binary-tree.md).

---

### 2. Inorder (Left → Node → Right)

**Idea:** go all the way left first, visit the node, then go right. In a **BST** this gives the values in **sorted order**.

```js
function inorder(node, out = []) {
    if (!node) return out;
    inorder(node.left, out);   // left
    out.push(node.val);        // node
    inorder(node.right, out);  // right
    return out;
}
```

**Dry run:**

| Step | At node | Action | Output so far |
|---|---|---|---|
| 1 | 1 → 2 → 4 | keep going left until there is no left child | |
| 2 | 4 | no left child, so visit; no right child | `4` |
| 3 | 2 | left is done, so visit, then go right | `4 2` |
| 4 | 5 | visit (leaf) | `4 2 5` |
| 5 | 1 | left subtree done, so visit, then go right | `4 2 5 1` |
| 6 | 3 | no left child, so visit, then go right | `4 2 5 1 3` |
| 7 | 6 | visit (leaf) | `4 2 5 1 3 6` |

On the BST from Part 1 (`5, 3, 8, 1, 4, 9`), inorder gives `1 3 4 5 8 9`, which is sorted.

**Use it for:** checking whether a tree is a valid BST (Validate BST), finding the k-th smallest value in a BST, and getting a BST's values in sorted order.

---

### 3. Postorder (Left → Right → Node)

**Idea:** finish both children **before** the node. The parent is visited last, so it can use its children's results.

```js
function postorder(node, out = []) {
    if (!node) return out;
    postorder(node.left, out);  // left
    postorder(node.right, out); // right
    out.push(node.val);         // node
    return out;
}
```

**Dry run:**

| Step | At node | Action | Output so far |
|---|---|---|---|
| 1 | 4 | leaf, so visit | `4` |
| 2 | 5 | leaf, so visit | `4 5` |
| 3 | 2 | both children done, so visit | `4 5 2` |
| 4 | 6 | leaf, so visit | `4 5 2 6` |
| 5 | 3 | children done, so visit | `4 5 2 6 3` |
| 6 | 1 | both subtrees done, so visit | `4 5 2 6 3 1` |

**Use it for:** height or depth (Max Depth), Diameter, Balanced Tree, and deleting or freeing a tree. These are all "bottom-up" problems where the answer at a node depends on the answers from its children.

---

### 4. DFS with an explicit stack (iterative)

Recursion uses the call stack behind the scenes. You can use your own stack instead, which avoids a stack overflow on very deep trees.

**Iterative preorder:**
```js
function preorderIterative(root) {
    if (!root) return [];
    const stack = [root], out = [];
    while (stack.length) {
        const node = stack.pop();
        out.push(node.val);
        if (node.right) stack.push(node.right); // push right first...
        if (node.left) stack.push(node.left);   // ...so left is popped first
    }
    return out;
}
```

| Pop | Output | Stack after (top on the right) |
|---|---|---|
| — | | `[1]` |
| 1 | `1` | `[3, 2]` |
| 2 | `1 2` | `[3, 5, 4]` |
| 4 | `1 2 4` | `[3, 5]` |
| 5 | `1 2 4 5` | `[3]` |
| 3 | `1 2 4 5 3` | `[6]` |
| 6 | `1 2 4 5 3 6` | `[]` |

**Iterative inorder:** go left as far as you can, pushing each node. Then pop one node, visit it, and move to its right child.
```js
function inorderIterative(root) {
    const stack = [], out = [];
    let node = root;
    while (node || stack.length) {
        while (node) { stack.push(node); node = node.left; }
        node = stack.pop();
        out.push(node.val);
        node = node.right;
    }
    return out;
}
```

**Iterative postorder (easy trick):** do a preorder that goes right before left (Node → Right → Left), then reverse the result. You get Left → Right → Node.

---

### 5. BFS / Level order (queue)

**Idea:** visit the nodes closest to the root first. Use a **queue** (first in, first out): take a node from the front and add its children to the back.

```js
function levelOrder(root) {
    if (!root) return [];
    const queue = [root], levels = [];
    while (queue.length) {
        const size = queue.length;   // number of nodes on this level
        const level = [];
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            level.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        levels.push(level);
    }
    return levels;
}
```

**Dry run:**

| Level | Queue at the start | size | Visited | Queue at the end |
|---|---|---|---|---|
| 0 | `[1]` | 1 | `[1]` | `[2, 3]` |
| 1 | `[2, 3]` | 2 | `[2, 3]` | `[4, 5, 6]` |
| 2 | `[4, 5, 6]` | 3 | `[4, 5, 6]` | `[]` |

Result: `[[1], [2, 3], [4, 5, 6]]`

`size = queue.length` is saved **before** the inner loop. That's the trick that keeps each level separate.

> `queue.shift()` costs O(n) in JavaScript arrays, because every remaining item moves down one place. For large trees, keep a `head` index and read `queue[head++]` instead, which is O(1).

**Use it for:** Level Order Traversal, Right Side View (the last node of each level), Minimum Depth (the first leaf you reach), and shortest paths in unweighted graphs.

---

## Comparison

| Traversal | Order | Structure | Time | Extra space | Best for |
|---|---|---|---|---|---|
| Preorder | Node, L, R | Stack / recursion | O(n) | O(h) | Copying or serializing, passing state down |
| Inorder | L, Node, R | Stack / recursion | O(n) | O(h) | BST in sorted order, validating a BST |
| Postorder | L, R, Node | Stack / recursion | O(n) | O(h) | Height, diameter, bottom-up answers |
| BFS (level order) | Level by level | Queue | O(n) | O(w) | Level-based questions, shortest path |

- **n** = number of nodes. Every traversal visits each node once.
- **h** = tree height: O(log n) if balanced, O(n) if skewed.
- **w** = the most nodes on any one level. That can be about n/2 for the bottom level of a full tree.

### DFS or BFS: which one?
- The answer needs the **whole path**, or comes **bottom-up** from the children → **DFS**.
- The question is about **levels**, the **nearest** node, or the **shortest** path → **BFS**.
- The tree is **very deep** → BFS or an iterative DFS, so recursion doesn't overflow.
- The tree is **very wide** → DFS uses less memory.

## Related code in this repo
- [tree-traversal.js](tree-traversal.js): recursive pre, in and postorder.
- [tree-traversal-itererative.js](tree-traversal-itererative.js): iterative versions.
- [level-order-traversal.js](level-order-traversal.js): BFS ([notes](level-order-traversal.md)).
- [max-depth-tree.js](max-depth-tree.js): uses postorder ([notes](max-depth-tree.md)).
- [count-good-nodes-in-binary-tree.js](count-good-nodes-in-binary-tree.js): uses preorder ([notes](count-good-nodes-in-binary-tree.md)).

## Key Takeaway
**Pre, in and post are all DFS** (stack or recursion). Only the moment you visit the node changes. **BFS uses a queue** and goes level by level. Inorder on a BST gives sorted order.
