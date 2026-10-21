# Merge Two Sorted Lists

## Problem
You get two linked lists that are already sorted. Join them into one sorted list by re-linking the existing nodes, and return its head.

Example: `list1 = 1 → 2 → 4`, `list2 = 1 → 3 → 4`
Output: `1 → 1 → 2 → 3 → 4 → 4`

## Idea (Intuition)
Picture two sorted piles of cards, smallest on top. To make one sorted pile, look at the two top cards, take the smaller one, and repeat. When one pile runs out, put the whole other pile on the end. It is already sorted, so you don't need to look at it card by card.

Two small tricks:
- **Dummy node**: a fake first node (`result`) so you can always write `temp.next = ...` without checking "is this the first node?". You return `result.next` at the end.
- **Splicing**: we don't create new nodes. We just change `next` pointers so the existing nodes form one chain.

## Approach
1. Make a dummy node `result` and a pointer `temp` to it. `temp` is always the last node of the merged list.
2. While **both** lists still have nodes:
   1. If `list1.val <= list2.val`, link `list1`'s node after `temp` and move `list1` forward.
   2. Otherwise, link `list2`'s node and move `list2` forward.
   3. Move `temp` to the node just added.
3. One list is now empty. Attach the rest of the other list after `temp`.
4. Return `result.next` (skip the dummy).

## Dry Run
`list1 = 1 → 2 → 4`, `list2 = 1 → 3 → 4`

| Step | list1 head | list2 head | Compare | Take from | Merged so far |
|---|---|---|---|---|---|
| 1 | 1 | 1 | 1 <= 1 | list1 | 1 |
| 2 | 2 | 1 | 2 <= 1? no | list2 | 1 → 1 |
| 3 | 2 | 3 | 2 <= 3 | list1 | 1 → 1 → 2 |
| 4 | 4 | 3 | 4 <= 3? no | list2 | 1 → 1 → 2 → 3 |
| 5 | 4 | 4 | 4 <= 4 | list1 | 1 → 1 → 2 → 3 → 4 |
| 6 | null | 4 | loop stops | — | — |

After the loop, `list1` is null, so line 22 attaches the rest of `list2` (`4`).
Final: `1 → 1 → 2 → 3 → 4 → 4`.

## Code Walkthrough
- `const result = new ListNode(); let temp = result;`
  The dummy head and the "tail" pointer of the merged list.
- `while (list1 !== null && list2 !== null)`
  Uses `&&`: we only compare while both lists have a node.
- `if (list1.val <= list2.val)`
  Pick the smaller head. Using `<=` (not `<`) takes from `list1` on ties, so equal values keep their original order (this is called a *stable* merge).
- `temp.next = list1; list1 = list1.next;`
  Re-link the existing node. No new node is created.
- `temp.next = list1 != null ? list1 : list2;`
  Attach whatever is left in one step. The leftover part is already sorted.
- `return result.next;`
  Skip the dummy node.

> Note: `ListNode` is not defined in this file (LeetCode provides it). To run the file on its own, define `function ListNode(val, next) { ... }` yourself.

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(m + n) | each loop step moves one node into the result; the leftover is attached in one step, so at most m + n steps |
| Space | O(1) | only the dummy node and `temp`; the result reuses the input nodes instead of copying them |

## Edge Cases
- **One or both lists empty**: the loop never runs, and line 22 returns the other list (or `null` if both are empty).
- **Different lengths**: the leftover part of the longer list is attached at the end.
- **Equal values**: handled by `<=`; both copies end up in the result.
- **One list entirely smaller** (`1 → 2` and `5 → 6`): the loop empties `list1`, then attaches all of `list2`.

## Key Takeaway
Two-pointer merge: always take the smaller head, use a dummy node to build the result, and attach the leftover list in one step.
