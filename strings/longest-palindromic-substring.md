# Longest Palindromic Substring

## Problem
Find the longest substring of `s` that is a palindrome. A palindrome reads the same forwards and backwards. A substring is a continuous piece of the string.

```
s = "cbbd"   →  "bb"
s = "babad"  →  "bab"   ("aba" is also correct)
```

Below, **n** = `s.length`.

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

### Code Walkthrough
```js
subString += s[j];
```
The substring grows one character at a time, so the code never calls `slice`. Each palindrome check still costs O(length).

```js
subString.length > maxLStr.length
```
It uses `>`, not `>=`, so when two palindromes tie, the first one found is kept.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n³) | About n²/2 substrings, and `checkPalindrome` takes up to O(n) for each. |
| Space | O(n) | `subString` and `maxLStr` can each hold up to n characters. |

---

## Approach 2: Expand around center (`longestPalindrome`) ⭐

### Idea
Every palindrome mirrors around a **center**. Stand at each center and grow outward while the left and right characters match. The widest match for any center is the answer.

There are two kinds of centers:
- **Odd length** (`"aba"`): start at `(i, i)`.
- **Even length** (`"abba"`): start at `(i, i + 1)`.

### Approach
1. Set `maxLength = 0`.
2. For each `i`, expand from `(i, i)` and from `(i, i + 1)`.
3. `countPalindromeLength(s, left, right, max)`: while the window is in bounds and `s[left] == s[right]`, record the window length `right - left + 1`, then widen it by one on each side.
4. Keep the biggest length seen and return it.

### Dry Run (`"cbbd"`)

| i | center | windows that match | length returned | maxLength |
|---|---|---|---|---|
| 0 | odd (0,0) | `c` | 1 | 1 |
| 0 | even (0,1) | `c` ≠ `b`, none | 0 | 1 |
| 1 | odd (1,1) | `b`; (0,2) `c` ≠ `b` stops | 1 | 1 |
| 1 | even (1,2) | `bb`; (0,3) `c` ≠ `d` stops | 2 | 2 |
| 2 | odd (2,2) | `b`; (1,3) `b` ≠ `d` stops | 1 | 2 |
| 2 | even (2,3) | `b` ≠ `d`, none | 0 | 2 |
| 3 | odd (3,3) | `d` | 1 | 2 |
| 3 | even (3,4) | out of bounds | 0 | 2 |

Result: **2**, the length of `"bb"`. See the notes below: the problem expects the string `"bb"` itself.

### Code Walkthrough
```js
maxL = Math.max(max, right - left + 1);
```
`right - left + 1` is the size of the current matching window. Passing in `max` and comparing against it here isn't needed, because the caller already does `Math.max(maxLength, ...)`. It's harmless but redundant.

> Note: Bug: `longestPalindrome()` has **no parameter**, but it uses `s`. Calling `longestPalindrome("cbbd")` throws `ReferenceError: s is not defined`, unless a global `s` happens to exist. The signature should be `longestPalindrome(s)`.

> Note: Bug: it returns a **length** (2), but LeetCode 5 asks for the **substring** (`"bb"`). To fix it, track the start index of the best window, for example `start = left + 1` once the loop stops, and return `s.slice(start, start + maxLength)`.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n²) | 2n centers, and each one can expand up to n/2 steps (worst case: `"aaaa…"`). |
| Space | O(1) | Only numbers and pointers; no substrings are built. |

---

## Comparison

| Approach | Time | Space | Returns |
|---|---|---|---|
| 1. Brute force | O(n³) | O(n) | the substring ✅ |
| 2. Expand around center | O(n²) | O(1) | length only (bug) |

## Edge Cases
- **Empty string** `""`: brute returns `""`, and expand returns 0.
- **One character** `"a"`: `"a"` (length 1).
- **No repeated letters** `"abc"`: any single character is a valid answer. Brute returns `"a"`, the first one found.
- **All the same letter** `"aaaa"`: the whole string is the answer. This is the worst case for both approaches.
- **Ties** (`"babad"` → `"bab"` or `"aba"`): both are accepted. Brute keeps the first one it finds.
- **Case-sensitive**: `"Aa"` → `"A"`, because `'A' != 'a'`.

## Key Takeaway
**Expand around center** (odd `(i, i)` and even `(i, i+1)`) is the standard O(n²), O(1)-space way to find palindromes. Track the start index too if you need the string, not just its length.
