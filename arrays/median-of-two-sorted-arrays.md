# Median of Two Sorted Arrays

## Problem
You get two arrays, each already sorted. Find the **median** of all their numbers taken together. The median is the middle value once everything is sorted. If the total count is even, it's the average of the two middle values.

```
nums1 = [1, 3], nums2 = [2]     →  2      (all together: [1, 2, 3])
nums1 = [1, 2], nums2 = [3, 4]  →  2.5    (all together: [1, 2, 3, 4] → (2 + 3) / 2)
```

Below, **m** = `nums1.length`, **n** = `nums2.length`, and **N** = m + n.

---

## Approach 1: Merge and sort (`function findMedianSortedArrays`)

### Idea
Ignore that the inputs are sorted. Put every number into one array, sort it, and read the middle.

### Approach
1. Join both arrays: `[...nums1, ...nums2]`.
2. Sort the result as numbers: `.sort((a, b) => a - b)`.
3. If the length is odd, return the middle element.
4. If the length is even, return the average of the two middle elements.

### Dry Run (`[1, 3]`, `[2]`)

| Step | Value |
|---|---|
| merged | `[1, 3, 2]` |
| sorted | `[1, 2, 3]` |
| length | 3 (odd) |
| index | `Math.round(3 / 2) - 1` = `2 - 1` = 1 |
| answer | `sorted[1]` = **2** |

### Code Walkthrough
```js
return mergedArray[Math.round(mergedArray.length / 2) - 1];
```
For an odd length L, `Math.round(L / 2) - 1` gives the same index as `Math.floor(L / 2)`, which is the middle. For L = 5: `round(2.5) - 1 = 2`.

The `(a, b) => a - b` comparator matters. Without it, JavaScript sorts numbers as text, so `[10, 9]` would stay `[10, 9]`.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(N log N) | Sorting all N numbers. |
| Space | O(N) | The merged array holds every number. |

---

## Approach 2: Two pointers, stop halfway (`findMedianSortedArrays`) ⭐

### Idea
Both arrays are already sorted, so you can **merge** them like merge sort does: keep a pointer in each array and always take the smaller front number. You don't need the full merged array, just the middle. So you walk only until you reach index `mid`. Keep the last two numbers you took (`prev` and `curr`): those are the middle one or two.

### Approach
1. Set `start1 = 0`, `start2 = 0`, `mid = Math.floor(N / 2)`.
2. Repeat `mid + 1` times (i = 0 to mid):
   - Save `prev = curr`.
   - Take from `nums1` if `nums2` is used up, or if `nums1[start1] < nums2[start2]`. Otherwise take from `nums2`.
   - Store the taken number in `curr` and move that pointer forward.
3. If N is odd, `curr` is the median.
4. If N is even, the median is `(prev + curr) / 2`.

### Dry Run (`[1, 2]`, `[3, 4]`)
N = 4, mid = 2, so the loop runs for i = 0, 1, 2.

| i | start1 | start2 | compare | take | prev | curr |
|---|---|---|---|---|---|---|
| 0 | 0 | 0 | 1 < 3 | nums1 → 1 | 0 | 1 |
| 1 | 1 | 0 | 2 < 3 | nums1 → 2 | 1 | 2 |
| 2 | 2 | 0 | nums1 used up (`undefined < 3` is false) | nums2 → 3 | 2 | 3 |

N is even, so the answer is `(2 + 3) / 2` = **2.5**.

For `[1, 3]`, `[2]`: N = 3, mid = 1. Step 0 takes 1 and step 1 takes 2. N is odd, so the answer is **2**.

### Code Walkthrough
```js
(start1 < nums1.length && start2 >= nums2.length) ||
nums1[start1] < nums2[start2]
```
- First part: `nums2` is used up, so take from `nums1`.
- Second part: both have numbers, so take the smaller one.
- When `nums1` is used up, `nums1[start1]` is `undefined`, and `undefined < x` is `false`, so the `else` takes from `nums2`. That works, but it relies on a JavaScript quirk. An explicit `start1 < nums1.length &&` check would be clearer.
- When the two numbers are equal, it takes from `nums2`. Either choice gives the same median.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(N) | The loop runs `N/2 + 1` times, doing O(1) work each time. |
| Space | O(1) | Only a few number variables; no new array. |

---

## Comparison

| Approach | Uses sorted input? | Time | Space |
|---|---|---|---|
| 1. Merge and sort | No | O(N log N) | O(N) |
| 2. Two pointers to the middle | Yes | O(N) | O(1) |
| Binary search on partition (not in file) | Yes | O(log(min(m, n))) | O(1) |

> Note: LeetCode asks for **O(log(m + n))** time. Neither approach in the file meets that, though both are accepted. The optimal solution uses binary search on the smaller array. It picks a cut so that the left halves of both arrays together hold exactly half the numbers and every left number is ≤ every right number.

## Edge Cases
- **One array empty** (`[]`, `[2, 3]`): Approach 2 always takes from the other array, so it works. Answer: 2.5.
- **Total of one number** (`[]`, `[5]`): mid = 0, one step takes 5, N is odd, so the answer is 5.
- **Duplicates** (`[1, 1]`, `[1, 1]`): ties go to `nums2`, and the median is still 1.
- **Negative numbers**: no problem. Both approaches compare numbers directly.
- **All of one array is smaller** (`[1, 2]`, `[8, 9]`): Approach 2 uses up `nums1` first, then switches to `nums2` correctly.

## Key Takeaway
To find the k-th smallest of two sorted arrays, **merge with two pointers and stop at k**: no need to build or sort the full array.
