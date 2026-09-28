# Longest Consecutive Sequence

## Problem
Given an unsorted array of integers, return the length of the longest run of numbers that come one after another (like 1, 2, 3, 4). The numbers can be in any order in the array. Target: **O(n) time**.

```
[100, 4, 200, 1, 3, 2]          →  4   (1, 2, 3, 4)
[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]  →  9   (0 to 8)
[9, 1, 5]                       →  1
[]                              →  0
```

Below, **n** = the number of elements.

---

## Approach 1: Remove duplicates, sort, scan (`longestConsecutive_1`)

### Idea
Once the numbers are sorted, a consecutive run sits side by side: `1, 2, 3, 4, 100, 200`. Walk through the sorted array and count how long each "+1 each step" streak lasts. Remove duplicates first, so a repeated number (like two `0`s) doesn't break a streak.

### Approach
1. If the array is empty, return 0.
2. Remove duplicates with a `Set`, then sort the numbers in ascending order.
3. Start with `max_length = 1` and `curr_length = 1`.
4. For each position `i` from 1 onward, if the number is exactly 1 more than the previous one, add 1 to the current streak and update the max. Otherwise start a new streak at 1.
5. Return `max_length`.

### Dry Run (`[100, 4, 200, 1, 3, 2]`, with the fixed check `sorted[i] - sorted[i-1] === 1`)

sorted = `[1, 2, 3, 4, 100, 200]`

| i | sorted[i-1] → sorted[i] | +1? | curr_length | max_length |
|---|---|---|---|---|
| 1 | 1 → 2 | ✅ | 2 | 2 |
| 2 | 2 → 3 | ✅ | 3 | 3 |
| 3 | 3 → 4 | ✅ | 4 | 4 |
| 4 | 4 → 100 | ❌ | 1 | 4 |
| 5 | 100 → 200 | ❌ | 1 | 4 |

Result: **4** ✅

### Code Walkthrough
```js
const sorted = Array.from(new Set(nums)).sort((a, b) => a - b);
```
`new Set(nums)` removes duplicates. `(a, b) => a - b` sorts the numbers by value. Without it, JS sorts them as text, so `10` would come before `9`.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n log n) | Sorting takes n log n. The Set and the scan are O(n). |
| Space | O(n) | The Set and the sorted copy. |

> **Note: bug on line 112.** The check `sorted[i + 1] - sorted[i - 1] === 1` compares two numbers that are **two positions apart**, and after removing duplicates they always differ by at least 2. At the last position, `sorted[i + 1]` is `undefined`, which gives `NaN`. So the condition is never true, and the function returns **1** for any non-empty input (for example `[1, 2, 3]` returns 1 instead of 3). The fix is to compare neighbours: `sorted[i] - sorted[i - 1] === 1`.

---

## Approach 2: HashSet, count only from the start of a sequence (`longestConsecutive`) ⭐

### Idea
Put all the numbers in a `Set` so checking "is X here?" takes O(1) time.

The trick is to **only start counting at the first number of a sequence**. A number `num` is a start if `num - 1` is **not** in the set. From a start, keep checking `num + 1`, `num + 2`, … until one is missing.

Numbers in the middle of a sequence (like `3` in `1, 2, 3, 4`) are skipped, because their sequence is counted when we reach its start (`1`). So the whole thing runs in O(n) time.

### Approach
1. Put all the numbers into a `Set`. This also removes duplicates.
2. For each `num` in the set:
   - If `num - 1` is in the set, skip it (it's not a start).
   - Otherwise, count upward while `current + 1` is in the set.
   - Update `max` with this sequence's length.
3. Return `max`. It stays 0 for an empty array.

### Dry Run (`[100, 4, 200, 1, 3, 2]`)

set = `{100, 4, 200, 1, 3, 2}`

| num | num - 1 in set? | Action | length | max |
|---|---|---|---|---|
| 100 | 99 ❌ | start; 101 ❌ → stop | 1 | 1 |
| 4 | 3 ✅ | skip | – | 1 |
| 200 | 199 ❌ | start; 201 ❌ → stop | 1 | 1 |
| 1 | 0 ❌ | start; 2 ✅ 3 ✅ 4 ✅ 5 ❌ | 4 | **4** |
| 3 | 2 ✅ | skip | – | 4 |
| 2 | 1 ✅ | skip | – | 4 |

Result: **4** ✅

### Code Walkthrough
```js
if (!set.has(num - 1)) {
```
This one check is what makes the solution O(n). Without it, you would count `2, 3, 4` again from `2`, then `3, 4` from `3`, and so on, which is O(n²) in the worst case.

```js
while (set.has(current + 1)) { current++; length++; }
```
Walks forward through the sequence, one number at a time.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | Building the set is O(n). Each number is visited by the `while` loop at most once in total, because the loop only starts from sequence starts. So the loops add up to O(2n) = O(n). |
| Space | O(n) | The set stores up to n numbers. |

---

## Comparison

| Approach | Time | Space | Meets the O(n) requirement? |
|---|---|---|---|
| 1. Sort + scan | O(n log n) | O(n) | ❌ |
| 2. HashSet, start-only | O(n) | O(n) | ✅ |

## Edge Cases
- **Empty array** `[]`: returns `0`. Approach 1 checks this explicitly; in Approach 2 `max` just stays 0.
- **Duplicates** `[1, 0, 1, 2]`: returns `3`. Both approaches remove duplicates with a `Set`, so the repeated `1` doesn't break the run.
- **No consecutive numbers** `[9, 1, 5]`: returns `1`, because every number is a sequence of length 1 on its own.
- **Negative numbers** `[-2, -1, 0]`: work fine and return `3`.
- **Several sequences** `[1, 2, 6, 7, 8]`: returns `3`, the longer run 6, 7, 8.

## Key Takeaway
Use a **HashSet for O(1) lookups** and only start work at the **beginning of a sequence** (where `num - 1` is missing). Skipping the middle numbers is what turns O(n²) into O(n).
