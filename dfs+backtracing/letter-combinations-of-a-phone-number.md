# Letter Combinations of a Phone Number

## Problem
Each digit 2–9 on an old phone keypad maps to some letters (`2 → abc`, `3 → def`, …, `7 → pqrs`, `9 → wxyz`). Given a string of digits, return every word you could type with it.

Example: `"23"` → `["ad","ae","af","bd","be","bf","cd","ce","cf"]`

## Idea (Intuition)
Think of it as filling blanks, one per digit: `_ _`. For the first blank you can pick `a`, `b` or `c`. For **each** of those choices, the second blank can be `d`, `e` or `f`.

That's a tree of choices. **Backtracking** means: make a choice, go deeper to fill the next blank, and when the word is complete, save it. Then come back up and try the next choice. Recursion handles the "come back up" part for us.

```
              ""
       /      |      \
      a       b       c        ← letters of '2'
    / | \   / | \   / | \
   ad ae af bd be bf cd ce cf  ← letters of '3' (leaves = answers)
```

## Approach
1. Keep a map from each digit to its letters, and an empty result list `res`.
2. Define `backtrack(i, currstr)`, where `i` = which digit we're filling next and `currstr` = the letters picked so far.
3. **Base case:** if `currstr` is as long as `digits`, every blank is filled. Add it to `res` and return.
4. Otherwise, for each letter of `digits[i]`, call `backtrack(i + 1, currstr + letter)`.
5. Start with `backtrack(0, '')` and return `res`.

## Dry Run
`digits = "23"`

| Call | i | currstr | What happens |
|---|---|---|---|
| backtrack(0, "") | 0 | "" | loop over "abc" |
| backtrack(1, "a") | 1 | "a" | loop over "def" |
| backtrack(2, "ad") | 2 | "ad" | length 2 == 2 → save **"ad"** |
| backtrack(2, "ae") | 2 | "ae" | save **"ae"** |
| backtrack(2, "af") | 2 | "af" | save **"af"** |
| backtrack(1, "b") | 1 | "b" | loop over "def" |
| … | | | save **"bd"**, **"be"**, **"bf"** |
| backtrack(1, "c") | 1 | "c" | loop over "def" |
| … | | | save **"cd"**, **"ce"**, **"cf"** |

`res = ["ad","ae","af","bd","be","bf","cd","ce","cf"]` (3 × 3 = 9 words).

## Code Walkthrough
- `phoneMap = {'2': "abc", ...}`: a dictionary for O(1) lookup of a digit's letters.
- `def backtrack(i, currstr):` is nested inside the main function, so it can read `digits`, `phoneMap` and `res` without passing them in.
- `if len(currstr) == len(digits):` is the base case: one letter has been chosen per digit.
- `backtrack(i+1, currstr+char)`: `currstr + char` builds a **new** string, so `currstr` itself never changes. That's why no explicit "undo" step is needed after the call. With a list you'd have to `append` before the call and `pop` after it.

> Note: **Bug:** for empty input `""`, the base case fires right away (`0 == 0`), so the function returns `[""]`. The expected answer is `[]`. Fix: `if not digits: return []` at the top.

> Note: Digits `0` and `1` (or any non-digit character) aren't in `phoneMap`, so they raise a `KeyError`. LeetCode only gives digits 2–9, so it passes there.

## Complexity
`n = len(digits)`. Each digit has at most 4 letters (`7` and `9`).

| | Complexity | Why |
|---|---|---|
| Time | O(4ⁿ · n) | There are up to 4ⁿ complete words, and building each one with `currstr + char` copies a string of up to n characters. |
| Space | O(n²) extra (plus O(4ⁿ · n) for the output) | The recursion goes n levels deep, and each level holds its own copy of `currstr` (up to n characters). The output list stores up to 4ⁿ words of length n. |

## Edge Cases
- **Empty string `""`:** returns `[""]` instead of `[]` (see the bug note).
- **Single digit `"2"`:** `["a","b","c"]`.
- **Digits with 4 letters (`7`, `9`):** more branches, but the same code handles them.
- **Repeated digits `"22"`:** works fine: `aa, ab, ac, ba, …` (9 words).
- **`0`, `1`, or other characters:** `KeyError`.

## Key Takeaway
"List every combination of choices" = backtracking: one recursion level per position, loop over the choices at that level, and save when every position is filled.
