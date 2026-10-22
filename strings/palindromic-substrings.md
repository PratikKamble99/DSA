# Palindromic Substrings

## Problem
Count how many substrings of `s` are palindromes. A palindrome reads the same forwards and backwards. A substring is a continuous piece of the string. The same text at different positions counts separately.

```
s = "abc"  →  3   ("a", "b", "c")
s = "aaa"  →  6   ("a", "a", "a", "aa", "aa", "aaa")
```

## Idea (Intuition)
Every palindrome has a **center**, and it mirrors around that center. So instead of checking every substring, stand at each center and **expand outward** while the left and right characters match. Each step that still matches is one more palindrome.

There are two kinds of centers:
- **Odd length** (`"aba"`): the center is one character, so start with `left = right = i`.
- **Even length** (`"abba"`): the center is the gap between two characters, so start with `left = i`, `right = i + 1`.

A string of length n has n odd centers and n − 1 useful even centers, so every palindrome gets counted exactly once.

## Approach
1. Set `count = 0`.
2. For each index `i`:
   - Add `countPalindrome(s, i, i)`, the odd palindromes centered at `i`.
   - Add `countPalindrome(s, i, i + 1)`, the even palindromes centered between `i` and `i + 1`.
3. `countPalindrome(s, left, right)`: while both pointers are inside the string and `s[left] == s[right]`, add 1, then move `left` left and `right` right. Return how many matches it found.
4. Return `count`.

## Dry Run (`s = "aaa"`)

| i | center | expansions that match | added | count |
|---|---|---|---|---|
| 0 | odd (0,0) | `"a"`; next (-1,1) is out of bounds | 1 | 1 |
| 0 | even (0,1) | `"aa"`; next (-1,2) is out of bounds | 1 | 2 |
| 1 | odd (1,1) | `"a"`, then (0,2) `"aaa"`; next (-1,3) is out | 2 | 4 |
| 1 | even (1,2) | `"aa"`; next (0,3) is out | 1 | 5 |
| 2 | odd (2,2) | `"a"`; next (1,3) is out | 1 | 6 |
| 2 | even (2,3) | right = 3 is out at the start | 0 | 6 |

Result: **6** ✅

## Code Walkthrough
```js
while (left >= 0 && right < s.length && s[left] == s[right])
```
The bounds checks come first. If the matches stopped, a bigger window around this center can't be a palindrome either, because its inner part already fails. So it's safe to stop.

```js
count += countPalindrome(s, i, i + 1);
```
On the last `i`, `right` starts at `s.length`, so the loop runs zero times and adds 0. No special case is needed.

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n²) | 2n centers, and each one can expand up to n/2 steps (worst case: all the same letter). |
| Space | O(1) | Only counters and two pointers; no substrings are built. |

## Edge Cases
- **Empty string** `""`: the loop never runs, so it returns 0.
- **One character** `"a"`: 1.
- **All different letters** `"abc"`: only the single characters count, so 3.
- **All the same letter** `"aaaa"`: every substring is a palindrome, so n(n+1)/2 = 10. This is the worst case for time.
- **Case-sensitive**: `"Aa"` gives 2, because `'A' != 'a'`.

## Key Takeaway
**Expand around center** (2n − 1 centers, odd and even) finds every palindrome in O(n²) time and O(1) space. Use it for counting palindromic substrings or finding the longest one.
