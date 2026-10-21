# Reverse Linked List

## Problem
Given the `head` of a singly linked list, reverse it and return the new head.

```
12 → 3 → 4 → 6 → 8 → null   →   8 → 6 → 4 → 3 → 12 → null
```

Below, **n** = the number of nodes.

## Idea (Intuition)
Each node has one arrow (`next`) pointing to the node after it. To reverse the list, you just need to **flip every arrow** so it points to the node before it.

Walk through the list once. At each node, turn its arrow around. The catch: once you change `temp.next`, you lose the way to the rest of the list. So **save the next node first** (in `front`), then flip the arrow.

Three pointers do the job:
- `prev`: the part already reversed (starts as `null`, which becomes the new tail's `next`).
- `temp`: the node being flipped now.
- `front`: a bookmark to the rest of the list.

## Approach
1. Set `prev = null`, `temp = head`.
2. While `temp` is not `null`:
   - `front = temp.next` (save the rest of the list).
   - `temp.next = prev` (flip the arrow).
   - `prev = temp` (the reversed part now starts at `temp`).
   - `temp = front` (move on).
3. When `temp` is `null`, `prev` is the last node of the old list, which is the new head. Return `prev`.

## Dry Run (`12 → 3 → 4 → 6 → 8`)

| Step | temp | front | After flip: reversed part (`prev`) | Rest (`temp` after move) |
|---|---|---|---|---|
| 1 | 12 | 3 | 12 → null | 3 → 4 → 6 → 8 |
| 2 | 3 | 4 | 3 → 12 → null | 4 → 6 → 8 |
| 3 | 4 | 6 | 4 → 3 → 12 → null | 6 → 8 |
| 4 | 6 | 8 | 6 → 4 → 3 → 12 → null | 8 |
| 5 | 8 | null | 8 → 6 → 4 → 3 → 12 → null | null |

The loop ends, and `prev` (node `8`) is returned as the new head.

## Code Walkthrough
```js
front = temp.next;
temp.next = prev;
```
The order matters. If you flip first, `temp.next` already points backward and the rest of the list is lost.

```js
head = reverseSL(head);
```
The function changes the nodes in place and returns the new head. The caller must store that return value; the old `head` (node `12`) is now the **tail**.

`convertArrayToLinkedList` and `traverse` come from `./singly-linked-list` and only build and print the list for the demo.

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | One loop that visits each node once. |
| Space | O(1) | Only three pointers; the nodes are reused, not copied. |

## Edge Cases
- **Empty list** (`head = null`): the loop never runs, returns `null`.
- **One node**: its `next` becomes `null` (already was), returns the same node.
- **Two nodes**: `a → b` becomes `b → a → null`; the old head's `next` correctly becomes `null`, so there's no cycle.

## Key Takeaway
To reverse a linked list in place, walk it with `prev / curr / next` pointers: **save next, flip the arrow, step forward**. O(n) time, O(1) space.
