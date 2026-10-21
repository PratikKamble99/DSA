# Merge Intervals

## Problem
Given a list of intervals `[start, end]`, merge every group that overlaps and return the non-overlapping intervals that cover the same ranges. Touching intervals (`[1, 4]` and `[4, 5]`) count as overlapping.

```
[[1,3],[2,6],[8,10],[15,18]]  →  [[1,6],[8,10],[15,18]]
[[1,4],[4,5]]                 →  [[1,5]]
```

Below, **n** = the number of intervals. Both functions **print** the result with `console.log` instead of returning it, and both **sort the input array in place**.

## Shared first step: sort by start
After sorting by start, any intervals that overlap sit **next to each other**. So you only ever need to compare an interval with the group just before it, never with the whole list.

---

## Approach 1: Look ahead (`mergeIntervals`)

### Idea
Stand at interval `i` and swallow every following interval that starts before the current `end`, stretching `end` as you go. Push the merged block. Later intervals that were already swallowed are skipped.

### Approach
1. Sort by start.
2. For each `i`:
   - `start, end = intervals[i]`.
   - If the last pushed interval's end is `>= end`, this one was already swallowed → skip.
   - For `j = i + 1 …`: while `intervals[j][0] <= end`, set `end = max(end, intervals[j][1])`; stop at the first gap.
   - Push `[start, end]`.

### Dry Run (`[[1,3],[2,6],[8,10],[15,18]]`, already sorted)

| i | start, end | skip? | look-ahead | pushed | result |
|---|---|---|---|---|---|
| 0 | 1, 3 | no | [2,6]: 2 ≤ 3 → end 6; [8,10]: 8 > 6 stop | [1,6] | [[1,6]] |
| 1 | 2, 6 | 6 ≥ 6 → skip | – | – | [[1,6]] |
| 2 | 8, 10 | no | [15,18]: 15 > 10 stop | [8,10] | [[1,6],[8,10]] |
| 3 | 15, 18 | no | none left | [15,18] | [[1,6],[8,10],[15,18]] |

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n log n) | The sort dominates. The look-ahead loops only run for group starts and each covers a different block, so they add up to O(n). |
| Space | O(n) | The `result` array (plus whatever the sort uses internally). |

---

## Approach 2: Merge into the last result (`mergeIntervalsOpt`) ⭐

### Idea
Walk the sorted list once. Compare each interval only with the **last** interval in `result`:
- It starts **after** that one ends → no overlap, push it.
- Otherwise → overlap, stretch the last interval's end.

### Approach
1. Sort by start.
2. For each interval:
   - If `result` is empty or `intervals[i][0] > lastEnd`, push it.
   - Else set `lastEnd = max(lastEnd, intervals[i][1])`.
3. Print `result`.

### Dry Run (the test data at the bottom of the file)
Sorted: `[1,3] [2,4] [2,6] [8,10] [8,9] [9,11] [15,18] [16,17]`

| interval | last in result | overlap? | result after |
|---|---|---|---|
| [1,3] | – | empty → push | [[1,3]] |
| [2,4] | [1,3] | 2 ≤ 3 → end = 4 | [[1,4]] |
| [2,6] | [1,4] | 2 ≤ 4 → end = 6 | [[1,6]] |
| [8,10] | [1,6] | 8 > 6 → push | [[1,6],[8,10]] |
| [8,9] | [8,10] | end stays 10 | [[1,6],[8,10]] |
| [9,11] | [8,10] | end = 11 | [[1,6],[8,11]] |
| [15,18] | [8,11] | 15 > 11 → push | [[1,6],[8,11],[15,18]] |
| [16,17] | [15,18] | end stays 18 | [[1,6],[8,11],[15,18]] |

### Code Walkthrough
```js
intervals[i][0] > result[result.length - 1][1]
```
Uses strict `>`, so touching intervals like `[1,4]` and `[4,5]` are merged.

```js
result[result.length - 1][1] = Math.max(result[result.length - 1][1], intervals[i][1]);
```
`Math.max` matters for intervals that sit fully inside the last one (`[8,9]` inside `[8,10]`): the end must not shrink.

> Note: `result.push(intervals[i])` pushes the **same array object**, not a copy. When its end is stretched later, the caller's original interval changes too (in the test data, `[1,3]` becomes `[1,6]`). Push a copy (`[...intervals[i]]`) if the input must stay untouched.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n log n) | Sorting; the single pass after it is O(n). |
| Space | O(n) | The `result` array (plus the sort's internal space). |

---

## Comparison

| Approach | Time | Space | Notes |
|---|---|---|---|
| 1. Look ahead | O(n log n) | O(n) | Two loops and a skip check; easier to get wrong. |
| 2. Merge into last | O(n log n) | O(n) | One simple pass; the standard solution. |

## Edge Cases
- **Empty input**: both print `[]`.
- **One interval**: printed as is.
- **Touching intervals** (`[1,4],[4,5]`): merged into `[1,5]`, because both use `<=` / `>` correctly.
- **Interval inside another** (`[1,10],[2,3]`): `Math.max` keeps the end at 10.
- **Unsorted input**: handled by the sort at the start.

## Key Takeaway
**Sort by start, then merge into the last result**: overlapping intervals always end up next to each other after sorting.
