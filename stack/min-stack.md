# Min Stack

## Problem
Build a stack that supports `push`, `pop`, `top`, and also `getMin`, which returns the smallest value in the stack. Every operation must be **O(1)** (instant, no matter how big the stack is).

```
push(-2), push(0), push(-3)
getMin() → -3
pop()
top()    → 0
getMin() → -2
```

## Idea (Intuition)
A normal stack can't tell you its minimum without scanning every item, which is O(n). The tricky part is `pop`. If you pop the current minimum, what was the minimum *before* it?

The trick is to keep a second stack, `min_stack`, that moves in step with the main stack. Each slot in `min_stack` stores **the smallest value from the bottom up to that height**. It works like a snapshot: "at this height, the minimum was X."

- When you push, store `min(previous minimum, new value)`.
- When you pop, pop both stacks. The snapshot below is automatically the old minimum again.

## Approach
1. Keep two arrays: `stack` (the real values) and `min_stack` (the minimum at each height).
2. **push(val)**:
   - If `min_stack` is empty, the minimum is `val`.
   - Otherwise it's `Math.min(top of min_stack, val)`.
   - Push `val` onto `stack` and that minimum onto `min_stack`.
3. **pop()**: pop from both stacks so they stay the same height.
4. **top()**: return the last item of `stack`.
5. **getMin()**: return the last item of `min_stack`.

## Dry Run
Operations from the third example: `push 5, push 3, push 7, push 3, pop, getMin, pop, pop, getMin`

| Operation | stack | min_stack | Returns |
|---|---|---|---|
| push(5) | `[5]` | `[5]` | |
| push(3) | `[5, 3]` | `[5, 3]` | |
| push(7) | `[5, 3, 7]` | `[5, 3, 3]` | |
| push(3) | `[5, 3, 7, 3]` | `[5, 3, 3, 3]` | |
| pop() | `[5, 3, 7]` | `[5, 3, 3]` | |
| getMin() | | | `3` |
| pop() | `[5, 3]` | `[5, 3]` | |
| pop() | `[5]` | `[5]` | |
| getMin() | | | `5` |

Look at `push(7)`: 7 is not smaller than 3, so `min_stack` repeats `3`. After every pop, the top of `min_stack` is already the right minimum. No scanning needed.

## Code Walkthrough
- `this.min_stack.length == 0 ? val : Math.min(this.min_stack[this.min_stack.length - 1], val)`: the first push has nothing to compare with, so `val` is the minimum. After that, compare with the previous minimum.
- `this.min_stack.push(min)` runs on **every** push, not only when a new minimum appears. This keeps both stacks the same height, so `pop` can always remove one item from each.
- `pop()` removes from both stacks together. It returns nothing, which matches the LeetCode version.
- `getMin()` only reads the top of `min_stack`, so it's O(1).

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(1) per operation | each method does one array push, pop, or index read at the end; no loops |
| Space | O(n) | `min_stack` stores one extra value for each of the n pushed items |

## Edge Cases
- **Duplicates of the minimum** (`push 1, push 1, pop`): `min_stack` is `[1, 1]`, so after one pop it's `[1]` and `getMin()` is still `1`. Storing a minimum at every height handles this for free.
- **Negative numbers**: `Math.min` works the same, e.g. `-3` is the minimum over `-2` and `0`.
- **A bigger value pushed after the minimum** (`push 3, push 7`): `min_stack` repeats `3`, so popping `7` keeps the minimum correct.
- **Empty stack**: `top()` and `getMin()` return `undefined`, and `pop()` does nothing. LeetCode never calls these on an empty stack.

## Key Takeaway
To get an extra fact (min, max, …) about a stack in O(1), keep a second stack that stores that fact at every height.
