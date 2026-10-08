# Minimum Window Substring

## Problem
Given strings `s` and `t`, find the shortest substring of `s` that contains every character of `t`, including duplicates. If there is none, return `""`.

Example: `s = "ADOBECODEBANC"`, `t = "ABC"` → `"BANC"`.

## Idea (Intuition)
Use a **sliding window**: two pointers, `left` and `right`, that mark a piece of `s`.

- Move `right` forward to **grow** the window until it contains everything `t` needs.
- Once it does, it's a valid answer, but maybe not the shortest. So move `left` forward to **shrink** it, recording the length each time, until it stops being valid.
- Then grow again with `right`, and repeat.

To check "does the window contain everything?" quickly, don't compare whole maps each time. Keep a counter `required` of how many **distinct** characters of `t` currently have enough copies in the window. The window is valid when `required` equals the number of distinct characters in `t`.

## Approach
1. If `s` is shorter than `t`, return `""`.
2. Build `need`: how many times each character appears in `t`. Let `need_length` be the number of distinct characters in `t`.
3. Move `right` across `s`. Add `s[right]` to the `window` counts.
4. If that character's window count just reached the count in `need`, increase `required` by 1.
5. While `required == need_length` (the window is valid):
   - If this window is shorter than the best so far, save its start and size.
   - Remove `s[left]` from `window`. If that drops a needed character below its required count, decrease `required` by 1.
   - Move `left` forward by one.
6. Return the best window, or `""` if none was found.

## Dry Run
`s = "ADOBECODEBANC"`, `t = "ABC"` → `need = {A:1, B:1, C:1}`, `need_length = 3`

Indexes: `A0 D1 O2 B3 E4 C5 O6 D7 E8 B9 A10 N11 C12`

| right | char | what happens | required | window checked (left..right) | best window |
|---|---|---|---|---|---|
| 0 | A | A count reaches 1 | 1 | - | - |
| 1-2 | D, O | not needed | 1 | - | - |
| 3 | B | B count reaches 1 | 2 | - | - |
| 4 | E | not needed | 2 | - | - |
| 5 | C | C count reaches 1 | 3, valid | 0..5 `ADOBEC` (6) | `ADOBEC` |
| | | drop `A` at 0, A falls below 1 | 2 | left = 1 | |
| 6-8 | O, D, E | not needed | 2 | - | |
| 9 | B | B count is 2, more than needed, no change | 2 | - | |
| 10 | A | A count reaches 1 | 3, valid | 1..10 (10), 2..10 (9), 3..10 (8), 4..10 (7), 5..10 (6): none shorter | `ADOBEC` |
| | | dropping D, O, B (B still 1), E keeps it valid; dropping `C` at 5 breaks it | 2 | left = 6 | |
| 11 | N | not needed | 2 | - | |
| 12 | C | C count reaches 1 | 3, valid | 6..12 (7), 7..12 (6), 8..12 `EBANC` (5), 9..12 `BANC` (4) | `BANC` |
| | | dropping O, D, E keeps it valid; dropping `B` at 9 breaks it | 2 | left = 10 | |

Answer: **`"BANC"`**.

## Code Walkthrough
- `need[i] = (need[i] || 0) + 1` counts characters of `t`.
- `if (need[current] && need[current] == window[current]) required++` uses `==`, not `>=`, so `required` goes up only **once** per character, at the exact moment it has enough copies. Extra copies (the second `B` at index 9) don't count twice.
- Inside the `while`, `window[s[left]] < need[s[left]]` detects the moment a needed character drops below its required count, so the window is no longer valid.
- `best` stores `right - left`, which is **length minus 1**. That's why the return uses `best_start + best + 1`.

> Note: `best` holds length - 1, not the length. It works, but storing `right - left + 1` and returning `s.substring(best_start, best_start + best)` would be easier to read.

> Note: **bug when `t` is empty.** `need_length` is 0 and `required` starts at 0, so the `while` condition is always true. `left` runs past the end of `s` and the loop never stops (`minWindow("abc", "")` hangs, confirmed by running it). LeetCode guarantees `t` has at least one character, so it passes there. A guard like `if (t.length === 0) return "";` at the top fixes it.

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n + m) | building `need` is O(m); `right` and `left` each move forward at most `n` times, so the window loop is O(n) total even with the inner `while` |
| Space | O(σ) | `need` and `window` store one entry per distinct character (σ = alphabet size, at most 52 letters), so effectively O(1) |

`n` = length of `s`, `m` = length of `t`.

## Edge Cases
- `s` shorter than `t` (`"a"`, `"aa"`) → `""` right away.
- Duplicates in `t` (`"aa"`, `"aa"`) → `"aa"`: the window needs **two** `a`s, not just one.
- A character of `t` missing from `s` (`"abc"`, `"d"`) → `""` because `best` stays `Infinity`.
- Order doesn't matter (`"bba"`, `"ab"`) → `"ba"`.
- Empty `t` → infinite loop (see the note above).

## Key Takeaway
Variable-size sliding window: grow with `right` until valid, shrink with `left` while valid, and track validity with a `required` counter instead of comparing maps.
