# Valid Palindrome

## Problem
A string is a **palindrome** if it reads the same forwards and backwards. Ignore uppercase/lowercase and anything that isn't a letter or digit (spaces, commas, `_`, and so on).

```
"A man, a plan, a canal: Panama"  →  true   ("amanaplanacanalpanama")
"race a car"                      →  false  ("raceacar")
" "                               →  true   (empty after cleaning)
"0P"                              →  false
"ab_a"                            →  true   ("aba")
```

Both solutions start the same way. They **clean** the string first: make it lowercase, then remove everything except `a` to `z` and `0` to `9`.

```js
s.toLowerCase().replace(/[^a-z0-9]/g, "")
```
`[^a-z0-9]` means "any character that is NOT a lowercase letter or digit". `g` means replace all of them, not just the first. Lowercase comes first so that `A` becomes `a` and isn't removed.

Below, **n** = the length of the string.

---

## Approach 1: Reverse and compare (`isPalindrome_1`)

### Idea
A palindrome is equal to its own reverse. So reverse the cleaned string and check whether it's the same as the original.

### Approach
1. Clean the string.
2. Split it into characters, reverse them, and join them back.
3. Return whether the cleaned string equals the reversed one.

### Dry Run (`"ab_a"`)

| Step | Value |
|---|---|
| Clean | `"aba"` |
| `[..."aba"]` | `["a","b","a"]` |
| `.reverse()` | `["a","b","a"]` |
| `.join("")` | `"aba"` |
| `"aba" === "aba"` | `true` ✅ |

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | Cleaning, splitting, reversing, joining and comparing each pass over the string once. |
| Space | O(n) | It builds a cleaned copy, a character array and a reversed string, each up to n long. |

---

## Approach 2: Clean, then two pointers (`isPalindrome_2`)

### Idea
Put one finger on the first character and one on the last. If they match, move both fingers one step toward the middle and compare again. At the first mismatch it's not a palindrome. If the fingers meet without a mismatch, it is.

This skips building a reversed copy, and it can stop early as soon as a pair doesn't match.

### Approach
1. Clean the string.
2. Set `start = 0` and `end = last index`.
3. While `start < end`:
   - If `cleaned[start] !== cleaned[end]`, return `false`.
   - Otherwise do `start++` and `end--`.
4. Return `true`.

### Dry Run (`"race a car"` → cleaned `"raceacar"`)

| start | end | cleaned[start] | cleaned[end] | Match? |
|---|---|---|---|---|
| 0 | 7 | r | r | ✅ |
| 1 | 6 | a | a | ✅ |
| 2 | 5 | c | c | ✅ |
| 3 | 4 | e | a | ❌ → return `false` |

### Code Walkthrough
```js
while (start < end) {
```
It uses `<`, not `<=`. When the length is odd, the two pointers end on the same middle character, which always matches itself, so there's no need to check it.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | Cleaning is O(n). The loop runs at most n/2 times, which is still O(n). |
| Space | O(n) | The cleaned string is a new copy of up to n characters. The two pointers themselves take O(1). |

---

## Approach 3: Two pointers without cleaning (`isPalindrome`) ⭐

### Idea
Approach 2 still makes a cleaned copy of the string. This version skips the copy. It runs the two pointers on the **original** string, steps past any character that isn't a letter or digit, and lowercases characters only when it compares them. No new string is built, so the extra space is O(1).

### Approach
1. Set `start = 0` and `end = last index`.
2. While `start < end`:
   - Move `start` forward past any character that isn't a letter or digit.
   - Move `end` backward past any character that isn't a letter or digit.
   - Compare `s[start]` and `s[end]` in lowercase. If they differ, return `false`.
   - Do `start++` and `end--`.
3. Return `true`.

### Dry Run (`"ab_a"`)

| start | end | Skip step | Compare | Match? |
|---|---|---|---|---|
| 0 | 3 | nothing to skip | `a` vs `a` | ✅ |
| 1 | 2 | `s[2]` is `_`, so `end` moves to 1 | `b` vs `b` (same character) | ✅ |
| 2 | 0 | loop ends because `start > end` | – | return `true` ✅ |

### Code Walkthrough
```js
const isAlphaNumeric = (ch) => /[a-zA-Z0-9]/.test(ch);
```
Checks whether one character is a letter (either case) or a digit. Uppercase is allowed here because nothing was lowercased beforehand.

```js
while (start < end && !isAlphaNumeric(s[start])) start++;
```
The `start < end` check inside the inner loop matters. Without it, a string of only symbols like `".,"` would push `start` past the end of the string.

```js
if (s[start].toLowerCase() !== s[end].toLowerCase()) return false;
```
Lowercases just these two characters at compare time, instead of lowercasing the whole string up front.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | `start` only moves forward and `end` only moves backward, so together they visit each character at most once, even with the inner skip loops. |
| Space | O(1) | It uses only two index variables. No cleaned copy or reversed string is created. |

---

## Comparison

| Approach | Time | Space | Stops early on a mismatch? |
|---|---|---|---|
| 1. Reverse and compare | O(n) | O(n), about 3 copies | ❌ Always builds the full reverse |
| 2. Clean, then two pointers | O(n) | O(n), 1 copy | ✅ (after cleaning) |
| 3. Two pointers, skip in place | O(n) | **O(1)** | ✅ |

## Edge Cases
- **Only symbols or spaces** (`" "`, `".,"`): nothing is left to compare, so it returns `true`. An empty string counts as a palindrome.
- **Mixed case** (`"Aba"`): characters are compared in lowercase, so it returns `true`.
- **Digits** (`"0P"`): digits are kept, so `0` vs `p` returns `false`. If digits were removed, it would wrongly return `true`.
- **Underscore** (`"ab_a"`): `_` isn't a letter or digit, so it's skipped and the result is `true`.
- **Single character**: the loop doesn't run, so it returns `true`.

> **Note:** In the file, only the first test (`"A man, a plan, a canal: Panama"`) runs; the other four are commented out. I ran all five against `isPalindrome`, and each returned the expected result.

## Key Takeaway
To check something from both ends, use **two pointers moving toward the middle**. Skip unwanted characters in place instead of building a cleaned copy, and the extra space drops from O(n) to O(1).
