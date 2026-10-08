# Valid Parentheses

## Problem
You get a string that has only the characters `( ) { } [ ]`. Return `true` if every bracket is closed by the same type of bracket, in the right order. Otherwise return `false`.

- `"()"` → `true`
- `"([]{})"` → `true`
- `"(]"` → `false`
- `")[]"` → `false`

> Note: The file defines `validParenthisis` twice. In JavaScript the second definition replaces the first, so the `console.log` lines only run **Approach 2**. Approach 1 is never called.

---

## Approach 1: Push everything, pop matching pairs

### Idea (Intuition)
A **stack** is a list where you only add to and remove from the top (last in, first out). Put every character on the stack. When a closing bracket lands right on top of its matching opener, the two cancel out, so remove both. If everything cancels, the string is valid.

### Approach
1. If the string has exactly 1 character, return `false`.
2. For each character:
   - If it is an opener (`(`, `[`, `{`), push it.
   - If it is a closer, push it too. Then look at the item just below it (`stack[stack.length - 2]`).
   - If that item is the matching opener, pop twice to remove the pair.
3. At the end, return `true` only if the stack is empty.

### Why it still works when a pair does not match
If a closer does not match, it stays on the stack. Pairs are only removed from the top, so nothing under that stuck closer can ever be removed. The stack can never become empty, so the answer is `false`.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | one loop over n characters; push, pop, and index lookups are O(1) |
| Space | O(n) | in the worst case (for example `"(((("`) every character stays on the stack |

> Note: The `s.length == 1` check is not needed. A single character can never cancel, so the stack would end non-empty and return `false` anyway.

---

## Approach 2: Push the expected closer (the one that runs)

### Idea (Intuition)
When you see an opener, you already know which closer you are waiting for. So push **that closer** instead of the opener. When a closer shows up, pop the top: it must be exactly the closer you were waiting for. No lookup table needed, just a direct `!==` check.

### Approach
1. If the length is odd, return `false`. Brackets come in pairs, so an odd count can never be valid.
2. For each character:
   - `(` → push `)`
   - `[` → push `]`
   - `{` → push `}`
   - Any closer → pop the top. If it is not equal to this character, return `false`.
3. After the loop, return `true` only if the stack is empty (no opener left waiting).

### Dry Run
Input: `"([]{})"`

| i | char | Action | Stack after |
|---|---|---|---|
| 0 | `(` | push `)` | `[ ")" ]` |
| 1 | `[` | push `]` | `[ ")", "]" ]` |
| 2 | `]` | pop `]`, equals `]` ✓ | `[ ")" ]` |
| 3 | `{` | push `}` | `[ ")", "}" ]` |
| 4 | `}` | pop `}`, equals `}` ✓ | `[ ")" ]` |
| 5 | `)` | pop `)`, equals `)` ✓ | `[ ]` |

Stack is empty → `true`.

Input: `"(]"` → push `)`, then `]` pops `)`. `]` ≠ `)` → `false`.

### Code Walkthrough
- `if (s.length % 2 !== 0) return false;` quick exit for odd lengths. This is why `")[]"` returns `false` right away.
- `switch (char)` pushes the matching closer for each opener.
- `default: if (char !== stack.pop()) return false;` handles every closer. If the stack is empty, `pop()` returns `undefined`, which never equals a bracket, so a closer with no opener correctly fails.
- `return stack.length == 0;` catches leftover openers, such as `"(("`.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | one loop over n characters; push and pop are O(1) |
| Space | O(n) | up to n/2 expected closers on the stack (e.g. `"((()))"`) |

---

## Comparison
| | Approach 1 | Approach 2 |
|---|---|---|
| Time | O(n) | O(n) |
| Space | O(n) | O(n) |
| Early exit | no, always scans the whole string | yes, stops at the first mismatch or odd length |
| Readability | harder (peeks at `length - 2`, pops twice) | simple, one pop and one compare |

## Edge Cases
- Empty string `""`: both approaches return `true` (nothing to match).
- Odd length, like `"((("`: Approach 2 returns `false` immediately.
- Starts with a closer, like `")("`: `pop()` on an empty stack gives `undefined` → `false`.
- Only openers, like `"(("`: the stack is not empty at the end → `false`.
- Right brackets in the wrong order, like `"([)]"`: the closer does not match the top → `false`.

## Key Takeaway
For matching pairs in order, use a stack. Pushing the *expected* closer turns the match check into a single comparison.
