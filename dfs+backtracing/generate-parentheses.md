# Generate Parentheses

## Problem
Given `n` pairs of brackets, list every string of `n` `"("` and `n` `")"` that is **balanced**: every `"("` gets closed, and no `")"` comes before its match.

Example: `n = 3` → `["((()))","(()())","(())()","()(())","()()()"]`

## Idea (Intuition)
Build the string one character at a time. At each step you have at most two choices, `"("` or `")"`, but only some choices are legal:

- You may add `"("` if you haven't used all `n` of them yet.
- You may add `")"` only if there's an open bracket waiting to be closed, that is, fewer closes than opens so far.

If you only ever make legal moves, every finished string is valid automatically. You never build a bad string and throw it away.

**Backtracking** means: try a choice, go deeper, and when you come back, **undo** that choice (`pop`) so the next choice starts from the same prefix.

```
n = 2                      ""
                           |
                          "("
                    /             \
                 "(("             "()"
                   |                |
                "(()"             "()("
                   |                |
                "(())" ✔          "()()" ✔
```

## Approach
1. `stack` holds the characters of the current string. `res` collects the finished strings.
2. `dfs(o, c)`: `o` = number of `"("` used, `c` = number of `")"` used.
3. **Base case:** `o === n && c === n` → join `stack` into a string, save it, return.
4. If `o < n`: push `"("`, recurse with `o + 1`, then pop.
5. If `c < o`: push `")"`, recurse with `c + 1`, then pop.
6. Start with `dfs(0, 0)` and return `res`.

## Dry Run
`n = 2`

| Call | o | c | stack | Action |
|---|---|---|---|---|
| dfs(0,0) | 0 | 0 | [] | o<2 → push "(" |
| dfs(1,0) | 1 | 0 | [(] | o<2 → push "(" |
| dfs(2,0) | 2 | 0 | [(,(] | o=2, can't open; c<o → push ")" |
| dfs(2,1) | 2 | 1 | [(,(,)] | c<o → push ")" |
| dfs(2,2) | 2 | 2 | [(,(,),)] | base case → save **"(())"** |
| back in dfs(1,0) | 1 | 0 | [(] | popped back to "("; now c<o → push ")" |
| dfs(1,1) | 1 | 1 | [(,)] | o<2 → push "(" (c<o is false here) |
| dfs(2,1) | 2 | 1 | [(,),(] | c<o → push ")" |
| dfs(2,2) | 2 | 2 | [(,),(,)] | base case → save **"()()"** |
| back in dfs(0,0) | 0 | 0 | [] | c<o is false (0<0), so nothing more |

Result: `["(())", "()()"]`

## Code Walkthrough
- `const stack = []`: one shared array for the current string. `push` adds a character, and `pop` removes it after the recursive call. That's the "undo" step of backtracking.
- `if (o === n && c == n && o == c)`: the string is complete. `o == c` is redundant because both already equal `n`. It does no harm.
- `if (o < n)`: the "open" branch. It's tried first, so results come out in sorted order (`"("` sorts before `")"`).
- `if (c < o)`: the "close" branch. This rule alone guarantees we never write a `")"` with nothing to match.
- `stack.join("")`: turns the array into a string only at the leaves, so strings aren't rebuilt at every step.

> Note: The original comment above `if (c < o)` said "we can add `"("`". It should be `")"`. I fixed the comment, and the code was already correct.

## Complexity
The number of valid strings is the n-th **Catalan number**, Cₙ ≈ 4ⁿ / (n^1.5 · √π). (Catalan numbers count balanced structures like this one.)

| | Complexity | Why |
|---|---|---|
| Time | O(4ⁿ / √n) | There are Cₙ ≈ 4ⁿ / n^1.5 results, and each costs O(n) to `join`. Only legal moves are made, so no dead branches are explored. |
| Space | O(n) extra (plus O(4ⁿ / √n) for the output) | The recursion is 2n levels deep, and `stack` holds at most 2n characters. `res` holds Cₙ strings of length 2n. |

## Edge Cases
- **`n = 1`:** `["()"]`.
- **`n = 0`:** the base case fires right away, so it returns `[""]` (one empty string). LeetCode only gives `n ≥ 1`.
- **Large `n`:** the output grows roughly like 4ⁿ (n = 8 already has 1430 strings), so time is dominated by output size.

## Key Takeaway
Backtracking with rules: track counts (`open < n` to open, `close < open` to close), so you only ever build valid strings, and push → recurse → pop to explore every branch.
