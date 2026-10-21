# Add Two Numbers

## Problem
You get two linked lists. Each one is a number with its digits stored **backwards**, one digit per node. Add the two numbers and return the sum as a linked list, also backwards.

Example: `l1 = 2 → 4 → 3` (342), `l2 = 5 → 6 → 4` (465)
Output: `7 → 0 → 8` (807, because 342 + 465 = 807)

## Idea (Intuition)
This is just the addition you learned in school: add column by column from the right and carry the 1 when a column goes over 9.

The digits are already stored backwards, so the head of each list is the **ones digit**. That means you can walk both lists from the start and add as you go. You never need to reverse anything.

Two small tricks:
- **Dummy node**: a fake first node (`result`) so you can always write `temp.next = ...` without checking "is this the first node?". You return `result.next` at the end.
- **Carry**: the extra 1 (`Math.floor(sum / 10)`) that moves to the next column.

## Approach
1. Make a dummy node `result` and a pointer `temp` to it. Set `carry = 0`.
2. While either list still has nodes:
   1. Start `sum` with `carry`.
   2. If `l1` has a node, add its value and move `l1` forward.
   3. If `l2` has a node, add its value and move `l2` forward.
   4. New carry = `sum / 10` (rounded down). Digit to keep = `sum % 10`.
   5. Add a new node with that digit after `temp`, then move `temp` to it.
3. If a carry is left after the loop, add one more node for it.
4. Return `result.next` (skip the dummy).

## Dry Run
`l1 = 2 → 4 → 3`, `l2 = 5 → 6 → 4`

| Step | l1 val | l2 val | carry in | sum | digit (`sum % 10`) | carry out | Result so far |
|---|---|---|---|---|---|---|---|
| 1 | 2 | 5 | 0 | 7 | 7 | 0 | 7 |
| 2 | 4 | 6 | 0 | 10 | 0 | 1 | 7 → 0 |
| 3 | 3 | 4 | 1 | 8 | 8 | 0 | 7 → 0 → 8 |

Both lists are done and carry is 0. Return `7 → 0 → 8`.

Leftover carry example: `l1 = 9 → 9` (99), `l2 = 1` (1)

| Step | l1 val | l2 val | carry in | sum | digit | carry out | Result so far |
|---|---|---|---|---|---|---|---|
| 1 | 9 | 1 | 0 | 10 | 0 | 1 | 0 |
| 2 | 9 | — | 1 | 10 | 0 | 1 | 0 → 0 |

The loop ends with `carry = 1`, so line 43 adds one more node: `0 → 0 → 1` (100).

## Code Walkthrough
- `const result = new ListNode(); let temp = result;`
  The dummy head and a "tail" pointer used to build the answer.
- `while (l1 != null || l2 != null)`
  Keep going while **either** list has digits. This handles lists of different lengths.
- `if (l1 !== null) { sum += l1.val; l1 = l1.next; }`
  Only read a list if it still has a node. A finished list counts as 0. Same for `l2`.
- `carry = Math.floor(sum / 10); sum = sum % 10;`
  Split the column total into "carry to next column" and "digit to write". `sum` is at most 9 + 9 + 1 = 19, so carry is always 0 or 1.
- `if (carry >= 1) temp.next = new ListNode(carry);`
  Handles the final carry, like 99 + 1 needing an extra digit.
- `return result.next;`
  Skip the dummy node.

> Note: `ListNode` is only defined in a comment, as on LeetCode. To run this file on its own, you need to define `function ListNode(val, next) { ... }` yourself.

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(max(m, n)) | the loop runs once per digit of the longer list; each step does constant work |
| Space | O(max(m, n)) | the output list has up to max(m, n) + 1 nodes; extra space besides the output is O(1) (just `carry`, `sum`, `temp`) |

## Edge Cases
- **Different lengths** (`99` + `1`): the `||` in the loop plus the null checks treat the shorter list as 0s.
- **Final carry** (`5` + `5` = `10`): the line after the loop adds the extra node.
- **Both zero** (`0` + `0`): one loop step gives a single `0` node. Correct.
- **Empty lists**: not possible here, the problem says both lists are non-empty.

## Key Takeaway
Simulate grade-school addition with a running `carry`, and use a dummy head node to build a new linked list without special-casing the first node.
