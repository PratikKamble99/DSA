# Sliding Window Maximum

## Problem
A window of size `k` slides over the array one step at a time, from left to right. For every position of the window, record the biggest number inside it.

```
nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3  →  [3, 3, 5, 5, 6, 7]
```

Below, **n** = the length of the array and **k** = the window size.

## Idea (Intuition)
The simplest way: for each window, cut it out of the array and ask "what's the biggest number here?" There are `n - k + 1` windows, and each one has `k` numbers to check.

This is the **brute force** version. The comment at the bottom of the file defines a **deque** (double-ended queue, a list you can add to and remove from at both ends). That is the trick for the faster O(n) solution; the code here does not use it.

## Approach
1. Create an empty result array.
2. For each start index `i` from `0` to `n - k`:
   - Take the window `array.slice(i, i + k)`.
   - Push `Math.max(...window)` into the result.
3. Return the result.

## Dry Run (`[1, 3, -1, -3, 5, 3, 6, 7]`, k = 3)

| i | window `slice(i, i + 3)` | max | result so far |
|---|---|---|---|
| 0 | [1, 3, -1] | 3 | [3] |
| 1 | [3, -1, -3] | 3 | [3, 3] |
| 2 | [-1, -3, 5] | 5 | [3, 3, 5] |
| 3 | [-3, 5, 3] | 5 | [3, 3, 5, 5] |
| 4 | [5, 3, 6] | 6 | [3, 3, 5, 5, 6] |
| 5 | [3, 6, 7] | 7 | [3, 3, 5, 5, 6, 7] |

The loop stops at `i = 5` because `n - k = 8 - 3 = 5`.

## Code Walkthrough
```js
for (let i = 0; i <= array.length - k; i++)
```
`<=` makes sure the last window (starting at `n - k`) is included.

```js
newArray.push(Math.max(...array.slice(i, k + i)));
```
`slice(i, k + i)` copies the `k` numbers of the current window (end index not included). The spread `...` passes them to `Math.max` as separate arguments.

The commented-out lines are older attempts (building the window by hand, or sorting it and taking the first item). Sorting would be slower: O(k log k) per window instead of O(k).

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n · k) | `n - k + 1` windows, and both `slice` and `Math.max` walk `k` items each time. |
| Space | O(k) extra | Each `slice` makes a temporary copy of `k` numbers (the output array of `n - k + 1` items is not counted). |

> Note: This is the brute force solution. On LeetCode 239 (n up to 10^5, k up to n) it will time out. The faster way keeps a **monotonic deque** of indexes whose values are decreasing: drop indexes that fall out of the window from the front, drop smaller values from the back before pushing a new one, and the front is always the window's max. That runs in O(n) time and O(k) space.

> Note: The function name has a typo: `slidingindow` (missing a "W"). Also, `Math.max(...bigArray)` can throw "Maximum call stack size exceeded" if `k` is very large (hundreds of thousands), because every item becomes a function argument.

## Edge Cases
- **k = 1**: every window is one number, so the output equals the input.
- **k = n**: only one window, so the output is `[max of the whole array]`.
- **k > n**: the loop never runs and the result is `[]`.
- **Negative numbers**: work fine, `Math.max` handles them.
- **Empty array**: returns `[]`.

## Key Takeaway
Brute force checks every window in O(n · k). To get O(n), use a **monotonic deque** that keeps only the indexes that can still become a window's max.
