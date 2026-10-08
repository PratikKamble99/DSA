# Trapping Rain Water

## Problem
Each number in `height` is a bar of width 1. After it rains, how much water is trapped between the bars?

```
[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]  →  6
[4, 2, 0, 3, 2, 5]  →  9
```

For the first example (`█` = bar, `~` = trapped water):
```
              █
      █ ~ ~ ~ █ █ ~ █
  █ ~ █ █ ~ █ █ █ █ █ █
```
Water per index: `0 0 1 0 1 2 1 0 0 1 0 0`, total **6**.

## The Key Rule (used by all three approaches)
Water above bar `i` rises only as high as the **lower** of the two walls around it: the tallest bar on its left and the tallest bar on its right. Then subtract the bar's own height:

```
water[i] = min(tallest on left, tallest on right) − height[i]
```

In the code, both "tallest" values **include bar `i` itself**, so this number is never negative. If bar `i` is the tallest, it holds 0 water.

The three approaches differ only in **how quickly they find those two tallest walls**. Below, **n** = the number of bars.

---

## Approach 1: Brute force (first `trap`)

### Idea
For every bar, scan everything to its left to find the tallest bar, scan everything to its right to find the tallest, then apply the rule.

### Approach
1. For each index `i`:
   - Start `left_max` at `height[i]`, then loop `j` from 0 to `i − 1` to find the tallest bar on the left.
   - Loop `k` from `i` to the end to find `right_max`.
   - Add `min(left_max, right_max) − height[i]` to the total.
2. Return the total.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n²) | For each of the n bars, the inner loops scan the whole array again. |
| Space | O(1) | Only a few variables. |

> **Note:** On line 9, `|| 0` isn't needed. `height[i]` is always a number inside the loop, so `Math.max(0, height[i])` can never be `NaN` or `0` by mistake.

---

## Approach 2: Precompute left and right maxes (second `trap`)

### Idea
Approach 1 finds the tallest bar on the left again and again for every index. Instead, compute it **once** for all indexes:
- Go **left to right**, keeping a running max. `left_maxes[i]` is the tallest bar from 0 to i.
- Go **right to left**, keeping a running max. `right_maxes[i]` is the tallest bar from i to the end.

Then one more pass applies the rule using these two arrays.

### Approach
1. Fill `left_maxes` with a running max from the left.
2. Fill `right_maxes` with a running max from the right.
3. For each `i`, add `min(left_maxes[i], right_maxes[i]) − height[i]`.

### Dry Run (`[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]`)

| i | height | left_maxes | right_maxes | min | water |
|---|---|---|---|---|---|
| 0 | 0 | 0 | 3 | 0 | 0 |
| 1 | 1 | 1 | 3 | 1 | 0 |
| 2 | 0 | 1 | 3 | 1 | **1** |
| 3 | 2 | 2 | 3 | 2 | 0 |
| 4 | 1 | 2 | 3 | 2 | **1** |
| 5 | 0 | 2 | 3 | 2 | **2** |
| 6 | 1 | 2 | 3 | 2 | **1** |
| 7 | 3 | 3 | 3 | 3 | 0 |
| 8 | 2 | 3 | 2 | 2 | 0 |
| 9 | 1 | 3 | 2 | 2 | **1** |
| 10 | 2 | 3 | 2 | 2 | 0 |
| 11 | 1 | 3 | 1 | 1 | 0 |

Total = 1 + 1 + 2 + 1 + 1 = **6** ✅

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | Three separate passes over the array, so O(3n) = O(n). |
| Space | O(n) | Two extra arrays of size n. |

---

## Approach 3: Two pointers (third `trap`) ⭐

### Idea
You don't need **both** tallest walls exactly, only the **lower** one, because that's what limits the water.

Put a pointer at each end, and track `left_max` (tallest bar seen from the left) and `right_max` (tallest bar seen from the right).
- If `left_max < right_max`, then the left side is the limit for bar `left`. The tallest wall on its right is **at least** `right_max`, which is already taller. So bar `left` holds exactly `left_max − height[left]`, and you can move `left` forward.
- Otherwise the right side is the limit. Use the same reasoning for bar `right` and move `right` backward.

This gets the same answer as Approach 2 without the two extra arrays.

### Approach
1. Set `left = 0`, `right = n − 1` and `left_max = right_max = 0`.
2. While `left < right`:
   - Update `left_max` with `height[left]` and `right_max` with `height[right]`.
   - If `left_max < right_max`: add `left_max − height[left]`, then `left++`.
   - Else: add `right_max − height[right]`, then `right--`.
3. Return the total.

### Dry Run (`[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]`)

| left | right | left_max | right_max | Side handled | water | total |
|---|---|---|---|---|---|---|
| 0 | 11 | 0 | 1 | left (0 < 1) | 0 − 0 = 0 | 0 |
| 1 | 11 | 1 | 1 | right (equal) | 1 − 1 = 0 | 0 |
| 1 | 10 | 1 | 2 | left | 1 − 1 = 0 | 0 |
| 2 | 10 | 1 | 2 | left | 1 − 0 = **1** | 1 |
| 3 | 10 | 2 | 2 | right (equal) | 2 − 2 = 0 | 1 |
| 3 | 9 | 2 | 2 | right (equal) | 2 − 1 = **1** | 2 |
| 3 | 8 | 2 | 2 | right (equal) | 2 − 2 = 0 | 2 |
| 3 | 7 | 2 | 3 | left | 2 − 2 = 0 | 2 |
| 4 | 7 | 2 | 3 | left | 2 − 1 = **1** | 3 |
| 5 | 7 | 2 | 3 | left | 2 − 0 = **2** | 5 |
| 6 | 7 | 2 | 3 | left | 2 − 1 = **1** | 6 |
| 7 | 7 | – | – | pointers meet, stop | – | **6** ✅ |

When the two maxes are equal, the code goes to the `else` branch and handles the right side. That's safe either way, because both walls are the same height.

### Code Walkthrough
```js
left_max = Math.max(height[left], left_max);
right_max = Math.max(height[right], right_max);
```
Both maxes are updated **before** the water is calculated, so they include the current bar. That's why `water` is never negative.

```js
if (left_max < right_max) { water = left_max - height[left]; left++; }
```
Always handle the side with the smaller max, because that side is the one that decides the water level.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | Each step moves one pointer inward, so there are at most n − 1 steps. |
| Space | O(1) | Only a few variables. |

---

## Comparison

| Approach | Time | Space | How it finds the walls |
|---|---|---|---|
| 1. Brute force | O(n²) | O(1) | Scans left and right for every bar |
| 2. Prefix/suffix max arrays | O(n) | O(n) | Precomputes both maxes once |
| 3. Two pointers | O(n) | O(1) | Only needs the smaller max, tracked from both ends |

## Edge Cases
- **Empty array** `[]`: returns `0`.
- **One or two bars**: there's no dip, so the answer is `0`.
- **Only going up** (`[1, 2, 3, 4, 5]`) or **only going down** (`[5, 4, 3, 2, 1]`): there's no wall on one side, so the answer is `0`.
- **Single dip** (`[3, 0, 3]`): `3`.
- **Several dips** (`[2, 0, 2, 0, 2]`): `4`. Each dip is counted.

> **Note:** All three functions are named `trap`. JavaScript keeps only the **last** one, so the `console.log` lines at the bottom only test Approach 3. I ran each version separately on the 6 inputs in the file plus two more, and all three gave the correct answers. Rename them (`trapBrute`, `trapPrefix`, `trap`) to test each one in the file.

## Key Takeaway
**Water at a bar = min(tallest on left, tallest on right) − its height.** Use two pointers and always move the side with the smaller max, which gives O(n) time and O(1) space.
