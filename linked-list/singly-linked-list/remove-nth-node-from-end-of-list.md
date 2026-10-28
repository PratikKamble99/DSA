# Remove Nth Node From End of List

## Problem
You get the head of a singly linked list and a number `n`. Remove the `n`-th node counting from the **end**, and return the head.

Example: `1 → 2 → 3 → 4 → 5`, `n = 2` → `1 → 2 → 3 → 5` (the 4 is removed, because it's 2nd from the end).

## Idea (Intuition)
In a singly linked list you can only walk forward, so you can't count backwards from the end. Instead, turn "n-th from the end" into "k-th from the start":

- If the list has `size` nodes, the n-th from the end is node number `size - n + 1` from the start.
- To remove a node, you have to stand on the node **just before** it and skip over it. That node is number `size - n`.

So: walk once to count the nodes, then walk again to the node before the target and unlink the target. This is the **two-pass** approach.

## Approach
1. **Pass 1:** walk the whole list and count the nodes into `size`.
2. If `size == n`, the node to remove is the head. Return `head.next`.
3. Set `pos = size - n`. That's the position (1-based) of the node just before the target.
4. **Pass 2:** start at `head` (position 1) and move forward `pos - 1` times.
5. Skip the target: `current.next = current.next.next`.
6. Return `head`.

## Dry Run
List `1 → 2 → 3 → 4 → 5`, `n = 2`.

**Pass 1 (count):**

| current | size after step |
|---|---|
| 1 | 1 |
| 2 | 2 |
| 3 | 3 |
| 4 | 4 |
| 5 | 5 |
| null | stop |

`size = 5`, which is not equal to `n`. So `pos = 5 - 2 = 3`.

**Pass 2 (walk to node before target):**

| i | i < pos? | current after step |
|---|---|---|
| start | | 1 |
| 1 | yes | 2 |
| 2 | yes | 3 |
| 3 | no | stop at **3** |

`current = 3` and `current.next = 4`. Set `3.next = 5`.

Result: `1 → 2 → 3 → 5`

## Code Walkthrough
- `while (current) { size += 1; current = current.next; }`: counts the nodes.
- `if (size == n) return (head = head.next);`: removing the first node is a special case, because there's no node before it to stand on. Returning `head.next` makes the second node the new head. (The `head =` assignment does nothing useful; `return head.next` is enough.)
- `for (let i = 1; i < pos; i++)`: `current` starts at node 1, so after `pos - 1` moves it sits on node `pos`, the one just before the target.
- `current.next = current.next.next;`: unlinks the target. Nothing points to it any more, so JavaScript's garbage collector frees it.

> Note: `pos` is never declared with `let`/`const`. In non-strict code this silently creates a global variable. In strict mode or an ES module it throws `ReferenceError: pos is not defined`. Write `let pos = size - n;`.

> Note: The code assumes `1 <= n <= size` (LeetCode guarantees this). With an empty list, or `n > size`, `pos` is 0 or negative, the loop doesn't run, and `current.next.next` either crashes on `null` or removes the wrong node.

## Complexity
`L` = number of nodes.

| | Complexity | Why |
|---|---|---|
| Time | O(L) | One full walk to count the nodes, plus at most one more walk of `size - n - 1` steps. |
| Space | O(1) | Only a few variables (`size`, `current`, `pos`). No extra structures. |

## Edge Cases
- **Remove the head** (`n == size`), e.g. `[1,2]`, `n=2` → `[2]`: handled by the `size == n` check.
- **Single node** `[1]`, `n=1` → `[]`: `size == n`, so the code returns `head.next`, which is `null`. Correct.
- **Remove the last node** (`n = 1`): `current` stops on the second-to-last node, and `current.next.next` is `null`, so the tail is cut off. Correct.
- **Empty list or `n > size`:** not handled (see the note above).

## Key Takeaway
To delete a node in a singly linked list, stand on the node **before** it. "n-th from the end" becomes "(size − n)-th from the start" after one counting pass. The one-pass follow-up uses two pointers kept `n` steps apart.
