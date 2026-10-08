# Longest Repeating Character Replacement

## Problem
You get a string `s` of uppercase letters and a number `k`. You may change at most `k` characters into any other letter. Return the length of the longest substring that can be made of one repeated letter.

Example: `s = "AABABBA"`, `k = 1` → `4` (change the A at index 3 → `"AABBBBA"`, which has `"BBBB"`).

## Idea (Intuition)
Look at any window (a continuous piece of the string). To make it all one letter, keep the letter that appears **most** in it and change everything else.

So the number of changes a window needs is:

```
changes needed = window length - count of the most frequent letter
```

If `changes needed <= k`, the window is valid. We slide a window across the string (the **sliding window** technique: two pointers, `left` and `right`, that mark the current piece). We grow it from the right, and when it needs more than `k` changes, we move `left` forward by one.

## Approach
1. Keep a map `count` of how many times each letter appears in the window `s[left..right]`.
2. Move `right` from `0` to the end. Add `s[right]` to `count`.
3. If `window length - max count > k`, the window is invalid: remove `s[left]` from `count` and move `left` one step right.
4. Update `best` with the current window length.
5. Return `best`.

## Dry Run
`s = "AABABBA"`, `k = 1`

| right | char | count | window (left..right) | len | max count | len - max | action | best |
|---|---|---|---|---|---|---|---|---|
| 0 | A | A:1 | 0..0 `A` | 1 | 1 | 0 | ok | 1 |
| 1 | A | A:2 | 0..1 `AA` | 2 | 2 | 0 | ok | 2 |
| 2 | B | A:2, B:1 | 0..2 `AAB` | 3 | 2 | 1 | ok | 3 |
| 3 | A | A:3, B:1 | 0..3 `AABA` | 4 | 3 | 1 | ok | 4 |
| 4 | B | A:3, B:2 | 0..4 `AABAB` | 5 | 3 | 2 > 1 | drop `A` at 0, left = 1 | 4 |
| 5 | B | A:2, B:3 | 1..5 `ABABB` | 5 | 3 | 2 > 1 | drop `A` at 1, left = 2 | 4 |
| 6 | A | A:2, B:3 | 2..6 `BABBA` | 5 | 3 | 2 > 1 | drop `B` at 2, left = 3 | 4 |

The `count` column is after adding `s[right]` and before the drop. Answer: **4**.

## Code Walkthrough
- `count.set(s[right], (count.get(s[right]) || 0) + 1)` adds the new letter to the window.
- `right - left + 1 - Math.max(...count.values()) > k` checks whether the window needs more changes than allowed.
- Inside the `if`, the code decreases the count of `s[left]` and moves `left` forward by one.
- `best = Math.max(right - left + 1, best)` records the largest window seen.

Why `if` and not `while`? Each step adds one letter on the right and removes at most one on the left, so the window **never shrinks**: it either grows or slides. We only care about finding a *bigger* valid window, so there's no need to shrink to a smaller one. The window size at the end always equals the best answer found.

> Note: because of this, the window can sometimes be invalid at a given moment (for example at `right = 4`, after the slide, the window `ABAB` still needs 2 changes). That's fine: `best` was already 4 from an earlier valid window, and a sliding window of the same size never makes `best` wrong. It only grows when a truly valid longer window appears.

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(26 · n) = O(n) | one loop over `n` characters; `Math.max(...count.values())` scans at most 26 letters each step |
| Space | O(1) | the map holds at most 26 uppercase letters |

## Edge Cases
- One character (`"A"`, `k = 1`) → `1`.
- `k = 0`: answer is the longest run of one letter (`"ABBB"` → `3`).
- `k >= s.length`: the whole string can be changed (`"ABCD"`, `k = 4` → `4`).
- All same letters (`"AAAA"`, `k = 0`) → `4`.
- Empty string → `0` (the loop never runs).

## Key Takeaway
Sliding window where "valid" means `window length - most frequent count <= k`. The window only grows or slides, never shrinks.
