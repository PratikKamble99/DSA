# Palindromic Substrings

## Problem
Find every substring of `s` that is a **palindrome** (reads the same forwards and backwards). This version returns the **distinct** palindromes as a list.

```
s = "aaa"  →  ["a", "aa", "aaa"]
s = "abc"  →  ["a", "b", "c"]
```

Below, **n** = the length of `s`.

> Note: the function is named `countSubstrings` (like LeetCode 647), but it returns an **array of distinct palindromes**, not a **count**. LeetCode 647 counts every occurrence, so `"aaa"` should give `6` (`a, a, a, aa, aa, aaa`), but this code gives `["a", "aa", "aaa"]`. To match LeetCode, drop the `!result.includes(sub)` check and return a counter instead of an array.

## Idea (Intuition)
Brute force: build every substring one character at a time, and test each one by reversing it. If the reverse equals the original, it is a palindrome. Keep it if you haven't kept it already.

## Approach
1. For each start index `i`:
   - Start with an empty string `sub`.
   - For each end index `j` from `i` to `n - 1`, append `s[j]` to `sub`. Now `sub` is `s[i..j]`.
   - If `sub` equals its reverse **and** it isn't already in `result`, push it.
2. Return `result`.

## Dry Run
`s = "aba"`

| i | j | sub | reversed | palindrome? | already in result? | result after |
|---|---|---|---|---|---|---|
| 0 | 0 | a | a | ✅ | no | `[a]` |
| 0 | 1 | ab | ba | ❌ | – | `[a]` |
| 0 | 2 | aba | aba | ✅ | no | `[a, aba]` |
| 1 | 1 | b | b | ✅ | no | `[a, aba, b]` |
| 1 | 2 | ba | ab | ❌ | – | `[a, aba, b]` |
| 2 | 2 | a | a | ✅ | **yes** | `[a, aba, b]` |

Output: `["a", "aba", "b"]`.

## Code Walkthrough
```js
sub += s[j]
```
Grows the substring by one character each step, instead of calling `s.slice(i, j + 1)` every time.

```js
sub == sub.split('').reverse().join('')
```
The palindrome check: turn the string into an array of characters, reverse it, join it back. This builds a new string, so it costs O(length of `sub`).

```js
&& !result.includes(sub)
```
Skips duplicates. It only runs when the palindrome check passed, because `&&` stops early.

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n³) | About n²/2 substrings, and reversing each one costs up to O(n). The `includes` check is cheap by comparison: a string has at most n distinct palindromes. |
| Space | O(n²) | `result` holds up to n distinct palindromes of up to n characters each; `sub` and its reverse are O(n). |

## Edge Cases
- **Empty string**: loops don't run, returns `[]`.
- **One character**: returns `[s]`.
- **All the same letter** (`"aaaa"`): many repeats, but only distinct ones are kept.

## Key Takeaway
Brute force works but costs O(n³). The usual faster method is **expand around center**: for each of the 2n − 1 centers, grow outwards while the ends match. That's O(n²) time and O(1) extra space.
