# Maximum Subarray

## Problem
Given an array of integers, find the **contiguous** subarray (a block of neighbors, at least one element long) with the largest sum.

```
[-2, 1, -3, 4, -1, 2, 1, -5, 4]  →  6    ([4, -1, 2, 1])
[5, 4, -1, 7, 8]                 →  23   (the whole array)
```

Below, **n** = the length of the array. Both functions **print** the answer with `console.log` instead of returning it.

---

## Approach 1: Brute force (`maxSubArray`)

### Idea
Try every start index `i`, then extend the subarray one element at a time to the right, keeping a running sum. Remember the biggest sum and where it started and ended.

### Approach
1. Set `largestSum = nums[0]`, `startI = endI = 0`.
2. For each `i`:
   - `currentSum = nums[i]`.
   - For each `j` from `i + 1`: add `nums[j]`. If `currentSum > largestSum`, save it with `startI = i`, `endI = j`.
3. Print `largestSum` and `nums.slice(startI, endI + 1)`.

### Dry Run (`[5, 4, -1, 7, 8]`)

| i | j | currentSum | largestSum | best range |
|---|---|---|---|---|
| start | – | – | 5 | [0, 0] |
| 0 | 1 | 9 | 9 | [0, 1] |
| 0 | 2 | 8 | 9 | [0, 1] |
| 0 | 3 | 15 | 15 | [0, 3] |
| 0 | 4 | 23 | 23 | [0, 4] |
| 1..4 | … | all smaller | 23 | [0, 4] |

Prints `23 [5, 4, -1, 7, 8]`.

> Note: **bug: single-element subarrays are never checked (except `nums[0]`).** `currentSum = nums[i]` is set, but it is only compared after `nums[j]` is added. So `maxSubArray([-3, 5, -10])` prints `2 [-3, 5]`, but the answer is `5` (`[5]`). Fix: check `currentSum > largestSum` right after `currentSum = nums[i]`, or start `j` at `i` with `currentSum = 0`.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n²) | Two nested loops; the running sum makes each step O(1). |
| Space | O(1) | A few variables (the final `slice` for printing is O(n)). |

---

## Approach 2: Kadane's algorithm (`maxSubArray2`) ⭐

### Idea
Walk left to right with a running `sum`. If the running sum ever goes **negative**, it can only drag down whatever comes next, so throw it away and start fresh at 0. Keep track of the biggest `sum` seen.

### Approach
1. `sum = 0`, `largestSum = nums[0]`.
2. For each number:
   - `sum += nums[i]`.
   - If `sum > largestSum`, update `largestSum`.
   - **Else if** `sum < 0`, reset `sum = 0`.
3. Print `largestSum`.

### Dry Run (`[-2, 1, -3, 4, -1, 2, 1, -5, 4]`)

| i | nums[i] | sum after add | largestSum | action |
|---|---|---|---|---|
| 0 | -2 | -2 | -2 | not bigger, negative → sum = 0 |
| 1 | 1 | 1 | 1 | new best |
| 2 | -3 | -2 | 1 | negative → sum = 0 |
| 3 | 4 | 4 | 4 | new best |
| 4 | -1 | 3 | 4 | – |
| 5 | 2 | 5 | 5 | new best |
| 6 | 1 | 6 | 6 | new best |
| 7 | -5 | 1 | 6 | – |
| 8 | 4 | 5 | 6 | – |

Prints `6`.

### Code Walkthrough
```js
if (sum > largestSum) largestSum = sum;
else if (sum < 0) sum = 0;
```
`largestSum` starts at `nums[0]` (not 0), so an all-negative array still gives its largest single number.

> Note: **bug: the `else if` lets a negative `sum` survive.** When `sum` is negative but still beats `largestSum` (this happens when everything so far is negative), the first branch runs and the reset is skipped. The negative sum is then carried into the next number. Example: `maxSubArray2([-5, -1, 3])` prints `2` (−1 + 3), but the answer is `3`. Fix: make the reset its own `if` after the update (`if (sum < 0) sum = 0;`), or use the standard form `sum = Math.max(nums[i], sum + nums[i]); largestSum = Math.max(largestSum, sum);`.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | One pass over the array. |
| Space | O(1) | Two variables. |

---

## Comparison

| Approach | Time | Space | Gives the subarray? |
|---|---|---|---|
| 1. Brute force | O(n²) | O(1) | Yes (start/end indexes) |
| 2. Kadane | O(n) | O(1) | No, only the sum |

## Edge Cases
- **All negative** (`[-3, -1, -2]` → `-1`): Kadane handles it because `largestSum` starts at `nums[0]`. Watch the `else if` bug above when a positive number comes after negatives.
- **One element**: both print `nums[0]`.
- **Empty array**: `nums[0]` is `undefined`; the problem guarantees at least one element.

## Key Takeaway
**Kadane's algorithm**: at each step, either extend the current subarray or start a new one at this element; drop any running sum that goes negative.
