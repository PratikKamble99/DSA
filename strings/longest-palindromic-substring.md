# Longest Palindromic Substring

## Problem
Find the longest substring of `s` that is a palindrome. A palindrome reads the same forwards and backwards. A substring is a continuous piece of the string.

```
s = "cbbd"   →  "bb"
s = "babad"  →  "bab"   ("aba" is also correct)
```

Below, **n** = `s.length`.

The file has three versions:
1. `longestPalindrome_brute`: tries every substring.
2. `function longestPalindrome()`: expands around each center, but returns only a **length**.
3. `var longestPalindrome = function (s)`: expands around each center and returns the **string**. This is the final answer.

> Note: Versions 2 and 3 share the name `longestPalindrome`. The `var` assignment (version 3) runs after the `function` declaration (version 2) is hoisted, so version 3 replaces it. Version 2 is dead code: nothing can call it.

---

## Approach 1: Brute force (`longestPalindrome_brute`)

### Idea
Build every substring, check whether each one is a palindrome, and keep the longest.

### Approach
1. For each start index `i`, set `subString = ""`.
2. For each end index `j` from `i` onward, add `s[j]` to `subString`.
3. If `subString` is a palindrome and longer than `maxLStr`, save it.
4. `checkPalindrome` uses two pointers: compare the first and last characters, then move both inward. Any mismatch means it isn't a palindrome.
5. Return `maxLStr`.

### Dry Run (`"cbbd"`)

| i | substrings built (j = i … 3) | palindromes | maxLStr |
|---|---|---|---|
| 0 | `c`, `cb`, `cbb`, `cbbd` | `c` | `"c"` |
| 1 | `b`, `bb`, `bbd` | `b`, `bb` | `"bb"` |
| 2 | `b`, `bd` | `b` (not longer) | `"bb"` |
| 3 | `d` | `d` (not longer) | `"bb"` |

Result: **"bb"** ✅

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n³) | About n²/2 substrings, and `checkPalindrome` takes up to O(n) for each. |
| Space | O(n) | `subString` and `maxLStr` can each hold up to n characters. |

---

## Approach 2: Expand around center, length only (`function longestPalindrome()`)

### Idea
Every palindrome mirrors around a **center**. Grow outward from each center while both sides match, and keep the widest window. There are two kinds of centers: odd `(i, i)` like `"aba"`, and even `(i, i + 1)` like `"abba"`.

### Approach
1. For each `i`, call `countPalindromeLength` with the odd center and the even center.
2. While the window is in bounds and `s[left] == s[right]`, record `right - left + 1` and widen the window.
3. Keep the biggest length and return it.

> Note: Bug: this function has **no `s` parameter**, so it throws `ReferenceError: s is not defined` if called. It also returns a length (e.g. `2`) instead of the substring (`"bb"`). Version 3 fixes both problems, and since version 3 replaces it, this one never runs.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n²) | 2n centers, and each one can expand up to n/2 steps. |
| Space | O(1) | Only numbers. |

---

## Approach 3: Expand around center, return the string (`var longestPalindrome`) ⭐

### Idea
Same expand-around-center idea, but also remember **where** the best palindrome is (its `left` and `right` indexes). At the end, cut it out with `substring`.

### Approach
1. Set `maxLength = 0`, `left = 0`, `right = 0`.
2. For each `i`:
   - Expand from the odd center `(i, i)` with `countLengthPalindrome`. If its length beats `maxLength`, save the length and its `left` and `right`.
   - Do the same for the even center `(i, i + 1)`.
3. `countLengthPalindrome(s, left, right, maxL)`:
   - While in bounds and `s[left] === s[right]`, move `left--` and `right++`.
   - The loop stops **one step too far** on each side, so the real palindrome is `l = left + 1` to `r = right - 1`.
   - It returns `[max(length, maxL), l, r]`.
4. Return `s.substring(left, right + 1)`.

### Dry Run (`"babad"`)

| i | center | expands to | `l..r` | length | maxLength | best (left, right) |
|---|---|---|---|---|---|---|
| 0 | odd (0,0) | `b`; (-1,1) is out | 0..0 | 1 | 1 | (0, 0) |
| 0 | even (0,1) | `b` ≠ `a`, none | 1..0 | 0 | 1 | (0, 0) |
| 1 | odd (1,1) | `a`, then (0,2) `bab`; (-1,3) is out | 0..2 | 3 | **3** | **(0, 2)** |
| 1 | even (1,2) | `a` ≠ `b` | 2..1 | 0 | 3 | (0, 2) |
| 2 | odd (2,2) | `b`, then (1,3) `aba`; (0,4) `b` ≠ `d` | 1..3 | 3 | 3 (not bigger) | (0, 2) |
| 2 | even (2,3) | `b` ≠ `a` | 3..2 | 0 | 3 | (0, 2) |
| 3 | odd (3,3) | `a`; (2,4) `b` ≠ `d` | 3..3 | 1 | 3 | (0, 2) |
| 3 | even (3,4) | `a` ≠ `d` | 4..3 | 0 | 3 | (0, 2) |
| 4 | odd (4,4) | `d`; (3,5) is out | 4..4 | 1 | 3 | (0, 2) |
| 4 | even (4,5) | out at the start | 5..4 | 0 | 3 | (0, 2) |

`s.substring(0, 3)` = **"bab"** ✅. It keeps `"bab"` rather than `"aba"` because it only replaces the best on a strictly bigger length.

### Code Walkthrough
```js
l = left + 1;
r = right - 1;
```
The `while` loop moves the pointers once more after the last match, or past the edge of the string. Stepping each one back gives the real palindrome's edges.

```js
const length = r - l + 1;
```
When nothing matches, as with an even center on `"ab"`, `l = i + 1` and `r = i`, so `length = 0`. That's correct: there is no palindrome at that center.

```js
return s.substring(left, right + 1);
```
`substring`'s end index is **exclusive**, so the code adds `+1` to include `s[right]`.

The function also returns `l, r` when the length isn't bigger than `maxL`. That's harmless, because the caller only uses them when `length > maxLength`. The `let l = left; let r = right;` at the top are overwritten before they're used.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n²) | 2n centers, and each one can expand up to n/2 steps (worst case: `"aaaa…"`). `substring` runs once at the end, O(n). |
| Space | O(1) | Only numbers, plus the O(n) answer string. |

---

## Comparison

| Approach | Time | Space | Returns | Status |
|---|---|---|---|---|
| 1. Brute force | O(n³) | O(n) | substring | works, but slow |
| 2. Expand, length only | O(n²) | O(1) | length | buggy and replaced (dead code) |
| 3. Expand, with indexes ⭐ | O(n²) | O(1) | substring | correct, the final answer |

## Edge Cases
- **Empty string** `""`: version 3's loop never runs, and `"".substring(0, 1)` is `""`.
- **One character** `"a"`: `"a"`.
- **No repeated letters** `"abc"`: returns `"a"`, the first single character, because later ties don't replace it.
- **All the same letter** `"aaaa"`: returns the whole string. This is the worst case for time.
- **Even-length answer** `"cbbd"`: found by the even center `(1, 2)`, so it returns `"bb"`.
- **Case-sensitive**: `"Aa"` → `"A"`.

## Key Takeaway
**Expand around center** (odd `(i, i)` and even `(i, i+1)`). After the loop, step back one (`left + 1`, `right - 1`) to get the real edges, and keep the best indexes so you can return the string in O(n²) time and O(1) space.
