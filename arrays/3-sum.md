# 3 Sum

## Problem
Find all **unique** triplets of numbers in the array that add up to **0**. Each triplet must use three different positions, and the same triplet of values must not appear twice in the answer.

```
nums = [-1, 0, 1, 2, -1, -4]  →  [[-1, -1, 2], [-1, 0, 1]]
```
There are two `-1`s, so `[-1, 0, 1]` can be made two ways, but it appears only once in the answer.

Below, **n** = the length of the array and **t** = the number of unique triplets found.

---

## Approach 1: Brute force (`threeSumBrute`)

### Idea
Try every possible group of three positions `i < j < k`. When a group sums to 0, sort the three numbers and store them as a string like `"-1,0,1"` in a `Set`. Two triplets with the same values in a different order then become the same string, so the `Set` removes the duplicates.

### Approach
1. Three nested loops pick `i < j < k`.
2. If `nums[i] + nums[j] + nums[k] == 0`, sort the three numbers, join them into a string, and add it to the set.
3. At the end, turn each string back into an array of numbers.

### Code Walkthrough
```js
validArr.sort((a, b) => a - b);
set.add(validArr.join(","));
```
A `Set` can't remove duplicate **arrays**, because `[1,2] !== [1,2]` in JS (they are different objects). Strings compare by value, so the triplet is turned into a string first.

```js
ele.split(",").map(Number)
```
Turns `"-1,0,1"` back into `[-1, 0, 1]`.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n³) | Three nested loops. Sorting 3 numbers takes constant time. |
| Space | O(t) | The set holds one string per unique triplet. |

---

## Approach 2: Hash set for the third number (`threeSumBetter`)

### Idea
If you already have `nums[i]` and `nums[j]`, the third number **must** be `-(nums[i] + nums[j])`. There's no need for a third loop. Just check whether that number appeared **between** `i` and `j`.

`tempSet` holds the numbers seen so far for the current `i`, so checking it is O(1).

### Approach
1. For each `i`, start a new empty `tempSet`.
2. For each `j > i`:
   - Compute the needed third number: `k = -(nums[i] + nums[j])`.
   - If `k` is in `tempSet`, a triplet exists. Sort it and add it to the result set as a string.
   - Add `nums[j]` to `tempSet`.
3. Convert the strings back into arrays, as in Approach 1.

### Dry Run (`i = 0`, `nums[i] = -1`)

| j | nums[j] | needed k = −(−1 + nums[j]) | k in tempSet? | tempSet after this step |
|---|---|---|---|---|
| 1 | 0 | 1 | ❌ | {0} |
| 2 | 1 | 0 | ✅ → `[-1, 0, 1]` | {0, 1} |
| 3 | 2 | −1 | ❌ | {0, 1, 2} |
| 4 | −1 | 2 | ✅ → `[-1, -1, 2]` | {0, 1, 2, −1} |
| 5 | −4 | 5 | ❌ | {0, 1, 2, −1, −4} |

Later values of `i` find the same triplets again, and the result set removes the repeats.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n²) | Two nested loops; each set lookup is O(1). |
| Space | O(n + t) | `tempSet` holds up to n numbers, and the result set holds the t triplets. |

---

## Approach 3: Sort + two pointers (`threeSumBest`) ⭐

### Idea
Sort the array first. Then **fix one number** `sorted[i]` and look for two numbers after it that add up to `-sorted[i]`. That's **Two Sum on a sorted array**, which two pointers solve in O(n):
- Sum too small? Move `left` right to get a bigger number.
- Sum too big? Move `right` left to get a smaller number.

Sorting also makes duplicates sit next to each other, so you can **skip** them instead of using a set.

### Approach
1. Sort a copy of the array.
2. For each `i` from 0 to n − 3:
   - If `sorted[i] > 0`, stop. Every number after it is also positive, so nothing can add up to 0.
   - If `sorted[i]` equals the previous number, skip it (duplicate).
   - Set `left = i + 1` and `right = n - 1`. While `left < right`:
     - If the sum is 0, save the triplet. Skip duplicate values on both sides, then move both pointers inward.
     - If the sum is less than 0, do `left++`.
     - If the sum is greater than 0, do `right--`.

### Dry Run (sorted = `[-4, -1, -1, 0, 1, 2]`)

| i | sorted[i] | left, right | sum | Action |
|---|---|---|---|---|
| 0 | −4 | 1, 5 | −4 − 1 + 2 = −3 | < 0 → `left++` |
| | | 2, 5 | −3 | `left++` |
| | | 3, 5 | −4 + 0 + 2 = −2 | `left++` |
| | | 4, 5 | −4 + 1 + 2 = −1 | `left++` → pointers meet, stop |
| 1 | −1 | 2, 5 | −1 − 1 + 2 = 0 | ✅ save `[-1, -1, 2]`, move both |
| | | 3, 4 | −1 + 0 + 1 = 0 | ✅ save `[-1, 0, 1]`, move both → stop |
| 2 | −1 | – | – | same as previous → **skip** |
| 3 | 0 | 4, 5 | 0 + 1 + 2 = 3 | > 0 → `right--` → stop |

Result: `[[-1, -1, 2], [-1, 0, 1]]` ✅

### Code Walkthrough
```js
if (i > 0 && sorted[i] === sorted[i - 1]) continue;
```
If the fixed number is the same as the last one, it would find the same triplets again, so skip it.

```js
while (left < right && sorted[left] === sorted[left + 1]) left++;
while (left < right && sorted[right] === sorted[right - 1]) right--;
```
After finding a triplet, skip over repeated values on both sides so the same triplet isn't added twice.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n²) | Sorting is O(n log n). Then for each of the n values of `i`, the two pointers take O(n) together. n log n + n² = O(n²). |
| Space | O(n) | The sorted copy (`[...nums]`), not counting the output. Sorting the original array in place would make it O(1) extra, but it changes the input. |

> **Note: remember to use the sorted copy.** After `const sorted = [...nums].sort(...)`, every read must come from `sorted`, not `nums`. An earlier version of this code read from `nums`, the unsorted array, and returned `[]` for the example, because two pointers only work on sorted data.

> **Note:** `threeSumBrute` prints its result with `console.log` (line 31) as well as returning it, and the last line calls `threeSumBest(arr)` without logging the result, so running the file prints nothing.

---

## Comparison

| Approach | Time | Space | How duplicates are removed |
|---|---|---|---|
| 1. Brute force | O(n³) | O(t) | Sorted-string keys in a `Set` |
| 2. Hash set | O(n²) | O(n + t) | Sorted-string keys in a `Set` |
| 3. Sort + two pointers | O(n²) | O(n) (O(1) if sorted in place) | Skipping equal neighbours after sorting |

## Edge Cases
- **Fewer than 3 numbers**: no triplet is possible, so it returns `[]`.
- **All zeros** (`[0, 0, 0, 0]`): returns `[[0, 0, 0]]` once, not several times.
- **Duplicates** (`[-1, -1, 2]` from two `-1`s): allowed inside a triplet, because they come from different positions.
- **All positive or all negative**: returns `[]`. Approach 3 stops early once `sorted[i] > 0`.
- **No answer**: returns `[]`.

## Key Takeaway
**Fix one number, then solve Two Sum on the rest.** Sorting first lets you use two pointers and skip duplicates without a set, which turns O(n³) into O(n²).
