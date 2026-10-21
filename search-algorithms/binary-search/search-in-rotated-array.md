# Search in Rotated Sorted Array

## Problem
A sorted array of **distinct** numbers was rotated at some point (its tail was moved to the front). Find the index of `target`, or return `-1`. It must run in O(log n) time.

```
nums = [11, 20, -12, -5, 1, 3, 4, 8], target = -12  →  2
nums = [4, 5, 6, 7, 0, 1, 2],         target = 3    →  -1
```

Below, **n** = the length of the array.

## Idea (Intuition)
The whole array is no longer sorted, so normal binary search can't tell which way to go. But here's the trick: **if you split a rotated array at any `mid`, at least one of the two halves is still sorted.**

So at each step:
1. Find which half is sorted (compare `nums[left]` with `nums[mid]`).
2. In a sorted half, you can easily check "is the target between its first and last value?"
3. If yes, search that half. If no, the target must be in the other half.

Either way, you throw away half the array each step, just like normal binary search.

## Approach
1. Set `left = 0` and `right = n - 1`.
2. While `left <= right`:
   - `mid = Math.trunc((left + right) / 2)`. If `nums[mid] == target`, return `mid`.
   - **Left half sorted** (`nums[left] <= nums[mid]`):
     - If `nums[left] <= target < nums[mid]`, go left: `right = mid - 1`.
     - Otherwise go right: `left = mid + 1`.
   - **Else, right half sorted**:
     - If `nums[mid] < target <= nums[right]`, go right: `left = mid + 1`.
     - Otherwise go left: `right = mid - 1`.
3. Return `-1`.

## Dry Run (`[11, 20, -12, -5, 1, 3, 4, 8]`, target = -12)

| left | right | mid | nums[mid] | Sorted half | Target in it? | Action |
|---|---|---|---|---|---|---|
| 0 | 7 | 3 | -5 | right (`11 <= -5` is false) | `-5 < -12`? No | `right = 2` |
| 0 | 2 | 1 | 20 | left (`11 <= 20`) | `11 <= -12`? No | `left = 2` |
| 2 | 2 | 2 | -12 | - | - | ✅ return `2` |

## Code Walkthrough
```js
if (nums[left] <= nums[mid])
```
If the first value is not bigger than the middle value, there's no "drop" between them, so `left … mid` is sorted. The `<=` (not `<`) handles the case `left == mid` (a range of 1 or 2 items), where the "left half" is just one element.

```js
if (nums[left] <= target && target < nums[mid])
```
Range check on the sorted half. `target < nums[mid]` is strict because `nums[mid]` was already compared with the target. The right-half check `nums[mid] < target && target <= nums[right]` mirrors it.

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(log n) | Every iteration drops half of `[left, right]`. |
| Space | O(1) | Only three index variables. |

## Edge Cases
- **Not rotated at all** (`[1, 2, 3, 4]`): the left half is always sorted, so it acts like normal binary search.
- **One element**: `left == right == mid`, one comparison.
- **Two elements** (`[3, 1]`, target 1): `mid = 0`, `nums[0] <= nums[0]` so the left half `[3]` counts as sorted; 1 isn't in it, so `left = 1`, then found.
- **Target missing**: the range shrinks to empty, returns `-1`.
- **Duplicates** (`[1, 0, 1, 1, 1]`): not supported. When `nums[left] == nums[mid] == nums[right]` you can't tell which half is sorted. That's LeetCode 81, which needs an extra `left++, right--` step and can be O(n) in the worst case.

## Key Takeaway
In a rotated sorted array, one half around `mid` is always sorted: check whether the target fits in that half's range, then discard the other half.
