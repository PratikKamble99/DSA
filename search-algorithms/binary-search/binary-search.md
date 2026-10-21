# Binary Search

## Problem
Given an array sorted in ascending order and a `target`, return the index of `target`, or `-1` if it's not there. It must run in O(log n) time.

```
nums = [-1, 0, 3, 5, 9, 12], target = 9  →  4
nums = [-1, 0, 3, 5, 9, 12], target = 2  →  -1
```

The file has two versions: a loop (`binarySearch`) and a recursive one (`binarySearchRec`).

Below, **n** = the length of the array.

---

## Approach 1: Iterative (`binarySearch`) ⭐

### Idea
Think of looking up a word in a dictionary. You open it in the middle. If your word comes earlier, you throw away the right half; if it comes later, you throw away the left half. Each check cuts the search space in half, so even a million items take only about 20 checks.

This only works because the array is **sorted**: one look at the middle tells you which half the target must be in.

### Approach
1. Set `start = 0` and `end = n - 1`. The target, if present, is somewhere in `[start, end]`.
2. While `start <= end`:
   - `middle = Math.floor((start + end) / 2)`.
   - If `nums[middle] == target`, return `middle`.
   - If `target < nums[middle]`, the target is to the left: `end = middle - 1`.
   - Otherwise it's to the right: `start = middle + 1`.
3. The range is empty, so return `-1`.

### Dry Run (`[-1, 0, 3, 5, 9, 12]`, target = 9)

| start | end | middle | nums[middle] | Action |
|---|---|---|---|---|
| 0 | 5 | 2 | 3 | 9 > 3 → `start = 3` |
| 3 | 5 | 4 | 9 | ✅ return `4` |

### Dry Run (target = 2, not present)

| start | end | middle | nums[middle] | Action |
|---|---|---|---|---|
| 0 | 5 | 2 | 3 | 2 < 3 → `end = 1` |
| 0 | 1 | 0 | -1 | 2 > -1 → `start = 1` |
| 1 | 1 | 1 | 0 | 2 > 0 → `start = 2` |
| 2 | 1 | - | - | `start > end`, return `-1` |

### Code Walkthrough
```js
while (start <= end)
```
`<=` (not `<`) matters: when `start == end` there is still one element left to check.

```js
end = middle - 1;   // or start = middle + 1
```
`middle` is already checked, so it is skipped. Using `end = middle` here could loop forever.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(log n) | Each loop halves the range `[start, end]`. |
| Space | O(1) | Only three index variables. |

---

## Approach 2: Recursive (`binarySearchRec`)

### Idea
Same halving idea, but instead of a loop, the function calls itself on the half that might hold the target.

### Approach
1. **Base case:** if `start > end`, the range is empty, so return `-1`.
2. Find `middle = Math.trunc((start + end) / 2)`. (`Math.trunc` and `Math.floor` give the same result here since indexes are never negative.)
3. If `nums[middle] == target`, return `middle`.
4. If `target < nums[middle]`, recurse on `[start, middle - 1]`; otherwise recurse on `[middle + 1, end]`.

### Dry Run (`[-1, 0, 3, 5, 9, 12]`, target = 0, called with `0, 5`)

| call | start | end | middle | nums[middle] | Action |
|---|---|---|---|---|---|
| 1 | 0 | 5 | 2 | 3 | 0 < 3 → recurse `(0, 1)` |
| 2 | 0 | 1 | 0 | -1 | 0 > -1 → recurse `(1, 1)` |
| 3 | 1 | 1 | 1 | 0 | ✅ return `1` |

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(log n) | Each call halves the range. |
| Space | O(log n) | Up to log n calls sit on the call stack at once. |

> Note: The demo call `binarySearchRec([-1,0,3,5,9,12], 0, 0, 5)` hardcodes `end = 5`. In general, call it with `end = nums.length - 1`, or give the parameters defaults (`start = 0, end = nums.length - 1`).
---

## Comparison

| Approach | Time | Space | Notes |
|---|---|---|---|
| 1. Iterative | O(log n) | O(1) | Preferred: no call stack. |
| 2. Recursive | O(log n) | O(log n) | Same logic; caller must pass `start` and `end`. |

## Edge Cases
- **Empty array**: `end = -1`, the loop never runs, returns `-1`.
- **One element**: `start == end == 0`, one check, then found or `-1`.
- **Target smaller than all / bigger than all**: the range shrinks to empty, returns `-1`.
- **Duplicates**: returns *some* matching index, not necessarily the first or last one.
- **Unsorted input**: gives wrong answers. Binary search needs sorted data.

## Key Takeaway
On sorted (or any "monotonic") data, check the middle and throw away the half that can't hold the answer: O(log n).
