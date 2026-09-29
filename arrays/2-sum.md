# Two Sum

## Problem
Given an array of numbers and a `target`, find **two different positions** whose numbers add up to `target`.

```
Unsorted: nums = [2, 7, 11, 15], target = 9  →  [0, 1]   (2 + 7 = 9, 0-indexed)
Sorted:   numbers = [2, 7, 11, 15], target = 9  →  [1, 2]   (1-indexed, LeetCode 167)
```

The file has two versions of the problem:
- **Unsorted array** (LeetCode 1): return 0-based indexes. Solved with brute force or a hash map.
- **Sorted array** (LeetCode 167): return **1-based** positions. Solved with two pointers.

Below, **n** = the length of the array.

---

## Approach 1: Brute force (`twoSum1`), unsorted array

### Idea
Try every possible pair and check whether it adds up to the target.

### Approach
1. For each index `i`, loop over every `j` after it.
2. If `nums[i] + nums[j] == target`, return `[i, j]`.
3. If no pair is found, return `-1`.

### Dry Run (`[2, 17, 11, 7]`, target = 9)

| i | j | nums[i] + nums[j] | = 9? |
|---|---|---|---|
| 0 | 1 | 2 + 17 = 19 | ❌ |
| 0 | 2 | 2 + 11 = 13 | ❌ |
| 0 | 3 | 2 + 7 = 9 | ✅ → `[0, 3]` |

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n²) | Two nested loops check about n²/2 pairs. |
| Space | O(1) | Only the loop variables. |

---

## Approach 2: Hash map (`twoSum2`), unsorted array ⭐

### Idea
For each number, you already know which number would complete the pair: `target - nums[i]`. Keep a `Map` of the numbers you've already seen (number → index). Then checking "have I seen the partner?" takes O(1) time instead of another loop.

### Approach
1. Create an empty `Map`.
2. For each index `i`:
   - Compute `sub = target - nums[i]`, the partner you need.
   - If `sub` is in the map, return `[map.get(sub), i]`.
   - Otherwise store `nums[i] → i`.

### Dry Run (`[2, 7, 11, 15]`, target = 9)

| i | nums[i] | sub = 9 − nums[i] | sub in map? | map after this step |
|---|---|---|---|---|
| 0 | 2 | 7 | ❌ | `{2: 0}` |
| 1 | 7 | 2 | ✅ at index 0 | return `[0, 1]` |

### Code Walkthrough
```js
if (hash.has(sub)) return [hash.get(sub), i];
hash.set(nums[i], i);
```
It checks **before** adding the current number. That's why it never pairs a number with itself. For `[3, 3]` with target 6, the first `3` is stored, and the second `3` finds it and returns `[0, 1]`.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | One loop over n numbers; each map lookup and insert is O(1). |
| Space | O(n) | The map can hold up to n numbers. |

> **Note:** The comment on line 16 (`O(n) = nlogn`) is wrong. This solution is **O(n)**: there is no sorting, and map operations are O(1).

---

## Approach 3: Two pointers (`twoSum2Pointer`), sorted array ⭐

### Idea
In a **sorted** array, put one pointer at the smallest number (`start`) and one at the largest (`end`):
- Sum too **small**? Move `start` right to get a bigger number.
- Sum too **big**? Move `end` left to get a smaller number.
- Sum equals the target? Done.

Each step removes one number that can't be part of the answer, so you never need a second loop.

### Approach (`twoSum`)
1. Set `start = 0` and `end = n - 1`.
2. While `start < end`:
   - If `numbers[start] + numbers[end] == target`, return `[start + 1, end + 1]` (1-based).
   - If the sum is less than the target, do `start++`.
   - Otherwise do `end--`.
3. Return `[]` if no pair is found.

### Dry Run (`[1, 2, 3, 4, 4, 9]`, target = 8)

| start | end | numbers[start] + numbers[end] | Action |
|---|---|---|---|
| 0 | 5 | 1 + 9 = 10 | too big → `end--` |
| 0 | 4 | 1 + 4 = 5 | too small → `start++` |
| 1 | 4 | 2 + 4 = 6 | too small → `start++` |
| 2 | 4 | 3 + 4 = 7 | too small → `start++` |
| 3 | 4 | 4 + 4 = 8 | ✅ return `[4, 5]` |

### Code Walkthrough
```js
return [start + 1, end + 1];
```
LeetCode 167 asks for **1-based** positions, so 1 is added to each index. `twoSum2Pointer` returns 0-based `[start, end]` instead.

```js
while (start < end)
```
It uses `<`, not `<=`, so the two pointers can never point at the same element.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | Each step moves one pointer inward, so there are at most n − 1 steps. |
| Space | O(1) | Only two index variables. |

> **Note: bug in `twoSum2Pointer`.** Its loop is `while (start <= end)`, so it can use the **same element twice**. For example, `twoSum2Pointer([2, 5], 4)` returns `[0, 0]` (2 + 2), but there's no valid answer. It should be `start < end`, as in `twoSum`. It also sits under the "Unsorted Array" comment, but two pointers only work on a **sorted** array.

---

## Comparison

| Approach | Needs a sorted array? | Time | Space | Returns |
|---|---|---|---|---|
| 1. Brute force | No | O(n²) | O(1) | 0-based indexes, or `-1` |
| 2. Hash map | No | O(n) | O(n) | 0-based indexes, or `undefined` |
| 3. Two pointers | **Yes** | O(n) | O(1) | 1-based (`twoSum`) or 0-based, or `[]` |

## Edge Cases
- **Duplicates** (`[3, 3]`, target 6): the hash map returns `[0, 1]`. The two pointers handle `[…, 4, 4, …]` as shown in the dry run.
- **Negative numbers** (`[-1, 0]`, target -1 → `[1, 2]`; `[-5, -3, 0, 2, 8]`, target 5 → `[2, 5]`): all approaches work, since nothing assumes positive numbers.
- **No answer**: each function returns something different (`-1`, `undefined`, `[]`). Pick one, usually `[]`, if you need them to match.
- **Unsorted input to two pointers**: gives wrong answers. Sort first, which costs O(n log n) and loses the original indexes, or use the hash map.

## Key Takeaway
**Unsorted → hash map** (store what you've seen, look up `target - x`). **Sorted → two pointers** (move `start` right when the sum is too small, `end` left when it's too big). Both are O(n).
