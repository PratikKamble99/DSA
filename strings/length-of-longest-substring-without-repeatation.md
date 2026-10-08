# Longest Substring Without Repeating Characters

## Problem
Find the length of the longest **substring** (a continuous part of the string) where no character repeats.

```
"abcabcbb"  →  3   ("abc")
"bbbbb"     →  1   ("b")
"pwwkew"    →  3   ("wke"; "pwke" doesn't count because it isn't continuous)
""          →  0
```

Below, **n** = the length of the string and **m** = the number of different characters it can contain (for example 26 lowercase letters, or 128 ASCII characters).

---

## Approach 1: Brute force (`solution`)

### Idea
Start a substring at every index `i`. Add characters one by one until a character repeats, and record the length reached.

### Approach
1. For each start `i`, set `sub = ""`.
2. For each `j` from `i`: if `sub` already contains `a[j]`, record `sub.length` and stop. Otherwise add `a[j]` to `sub`.
3. Return the max.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n · m²) | For each of the n start positions, the inner loop runs at most m + 1 times before a repeat, and each `sub.includes` scans up to m characters. If the character set isn't limited, this is O(n³). |
| Space | O(m) | The `sub` string. |

> **Note: bug.** `max` is only updated **when a repeat is found** (line 9). If a substring reaches the end of the string without a repeat, its length is never recorded. I ran it: `"abc"` returns `0` (should be 3), `"a"` returns `0`, and `"cadbzabcds"` returns `5` (should be 6, `"zabcds"`). To fix it, also update `max` after the inner loop, or update it on every step with `max = Math.max(max, sub.length)`.

---

## Approach 2: Sliding window + last-seen index (`var lengthOfLongestSubstring`)

### Idea
Keep a **window** `[left … right]` that never contains a repeated character. Use an object to remember the **last index where each character appeared**.

When `s[right]` was already seen **inside the window**, jump `left` straight past that earlier copy, so the window is valid again. No step-by-step shrinking is needed.

### Approach
1. Return 0 for an empty string. Set `left = 0` and `max = 1`.
2. For each `right`:
   - If `s[right]` was seen before, set `left = max(lastIndex + 1, left)`.
   - Save `obj[s[right]] = right`.
   - Update `max` with the window size `right − left + 1`.

### Dry Run (`"abcabcbb"`)

| right | char | last seen | left | window | size | max |
|---|---|---|---|---|---|---|
| 0 | a | – | 0 | a | 1 | 1 |
| 1 | b | – | 0 | ab | 2 | 2 |
| 2 | c | – | 0 | abc | 3 | **3** |
| 3 | a | 0 | 0 → 1 | bca | 3 | 3 |
| 4 | b | 1 | 1 → 2 | cab | 3 | 3 |
| 5 | c | 2 | 2 → 3 | abc | 3 | 3 |
| 6 | b | 4 | 3 → 5 | cb | 2 | 3 |
| 7 | b | 6 | 5 → 7 | b | 1 | 3 |

Result: **3** ✅

### Code Walkthrough
```js
left = Math.max(obj[s[right]] + 1, left);
```
The `Math.max` stops `left` from moving **backward**. In `"abba"`, at the last `a`, the earlier `a` is at index 0 and `0 + 1 = 1`. But `left` is already at 2 (it moved because of the second `b`), so it stays at 2. Without `Math.max`, the window would include both `b`s again.

```js
if (obj[s[right]] > -1)
```
For a character that hasn't been seen yet, `obj[...]` is `undefined`, and `undefined > -1` is `false`. So this works as an "already seen?" check.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | `right` moves through the string once, and each step does O(1) work. |
| Space | O(m) | The object stores at most one entry per different character. |

---

## Approach 3: Sliding window + Set (`function lengthOfLongestSubstring`) ⭐

### Idea
The window `[left … right]` holds no repeats, and a `Set` holds the characters currently in it.
- **Grow:** move `right` forward one step each time.
- **Shrink:** if `s[right]` is already in the set, remove `s[left]` and move `left` forward. Keep going until the repeat is gone.

This is the general sliding-window pattern: **move `right` every step. While the window is invalid, move `left`.**

### Approach
1. Set `left = 0`, `max = 0` and `set = new Set()`.
2. For each `right`:
   - While `s[right]` is in the set: `set.delete(s[left])`, `left++`.
   - `set.add(s[right])`.
   - Update `max` with `right − left + 1`.

### Dry Run (`"abcabcbb"`)

| right | char | left | Removed from set | Window after |
|---|---|---|---|---|
| 0 | a | 0 | – | a |
| 1 | b | 0 | – | ab |
| 2 | c | 0 | – | abc |
| 3 | a | 0 → 1 | a | bca |
| 4 | b | 1 → 2 | b | cab |
| 5 | c | 2 → 3 | c | abc |
| 6 | b | 3 → 5 | a, b | cb |
| 7 | b | 5 → 7 | c, b | b |

The longest window has size 3, so the result is **3** ✅

At `right = 6`, the `while` loop removes `a` (index 3) first. `b` is still in the set, so it then removes `b` (index 4). The window only becomes valid once the **old copy** of `b` is gone.

### Why is it O(n) and not O(n²)? 🔑
There's a `while` inside a `for`, which **looks** like O(n²). But what matters is **how many times `left` moves in total**, not that the loops are nested.

```
right: 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7     8 moves (once per character)
left:  0 → 1 → 2 → 3 → 5 → 7              7 moves in total, never more than n
```

- `left` **only moves forward**. It never resets to 0 like the inner loop in Approach 1 does.
- Each character is **added** to the set once (when `right` reaches it) and **removed** at most once (when `left` passes it).

So across the whole run, the `while` loop runs **at most n times in total**, not n times for each `right`.

```
total work = n moves of right + at most n moves of left = 2n → O(n)
```

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | `right` moves n times and `left` moves at most n times in total, giving O(2n) = O(n). |
| Space | O(m) | The set holds at most one copy of each different character. |

---

## Comparison

| Approach | Time | Space | How `left` moves |
|---|---|---|---|
| 1. Brute force | O(n · m²), up to O(n³) | O(m) | Restarts from every index |
| 2. Last-seen index | O(n) | O(m) | **Jumps** straight past the old copy |
| 3. Set window | O(n) | O(m) | **Steps** forward one at a time (at most n steps in total) |

## Edge Cases
- **Empty string** `""`: returns `0`.
- **One character** `"a"`: returns `1`.
- **All the same** (`"bbbbb"`): returns `1`.
- **Space** (`" "`): a space is a character too, so it returns `1`.
- **Repeat outside the window** (`"abba"`): returns `2`. Approach 2 needs `Math.max(..., left)` to get this right.
- **Best part isn't at the start** (`"dvdf"` → 3, `"vdf"`): the window has to move to find it.

> **Note: two functions are named `lengthOfLongestSubstring`.** The `function` version (Approach 3) is created first, but the `var lengthOfLongestSubstring = …` line (Approach 2) runs later and **replaces** it. So calling `lengthOfLongestSubstring` would run Approach 2. Neither is called in the file. Only the brute-force `solution` runs, and it prints `5` for `"cadbzabcds"` because of the bug above. I ran Approaches 2 and 3 separately on 11 inputs, and both returned the correct answers.

## Key Takeaway
**Sliding window:** move `right` every step, and move `left` forward only while the window is invalid. Because `left` never goes back, the nested loop is still **O(n)** in total.
