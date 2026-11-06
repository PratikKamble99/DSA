# Combination Sum

## Problem
You get a list of distinct positive numbers (`candidates`) and a `target`. Find every combination of numbers that adds up to `target`. You may use the same number **as many times as you like**.

Example: `candidates = [2, 3, 6, 7]`, `target = 7` → `[[2, 2, 3], [7]]`

## Idea (Intuition)
Stand at one number at a time and make a yes/no choice:
- **Take it**: add it to the current list and *stay on the same number*, because you are allowed to take it again.
- **Skip it**: move on to the next number and never come back to it.

Every path of yes/no choices builds one possible combination. If the running total hits the target, save it. If it goes over, stop that path early. This "try a choice, then undo it" style is called **backtracking**.

Since we only ever move forward (or stay), we never build the same combination in a different order, so `[2, 2, 3]` and `[3, 2, 2]` are not both produced.

## Approach
1. Call `dfs(i, curr, total)` where `i` is the current index, `curr` is the list being built, and `total` is its sum.
2. If `total == target`, save a copy of `curr` and return.
3. If we ran out of numbers (`i >= candidates.length`) or went over (`total > target`), return.
4. **Take** `candidates[i]`: push it, recurse with the same `i`, then pop it (undo).
5. **Skip** `candidates[i]`: recurse with `i + 1`.
6. Start with `dfs(0, [], 0)` and return all saved combinations.

## Dry Run
`candidates = [2, 3, 6, 7]`, `target = 7`. "Take" is always tried before "skip".

| Path (curr) | total | What happens |
|---|---|---|
| [2] | 2 | take 2 again |
| [2, 2] | 4 | take 2 again |
| [2, 2, 2] | 6 | take 2 → 8 > 7, stop. Skip to 3 → 9, stop. 6 → 12, 7 → 13, stop. Out of numbers. |
| [2, 2] → take 3 | 7 | ✅ save `[2, 2, 3]` |
| [2, 2] → 6 / 7 | 10 / 11 | over, stop |
| [2] → 3 | 5 | 3 again → 8 over; 6 → 11, 7 → 12 over |
| [2] → 6 / 7 | 8 / 9 | over, stop |
| [] → 3 | 3 | [3,3] = 6 → every next try goes over |
| [] → 6 | 6 | 6 again → 12, 7 → 13, over |
| [] → 7 | 7 | ✅ save `[7]` |

Result: `[[2, 2, 3], [7]]`

## Code Walkthrough
- `pairs.push([...curr])`: save a **copy**. `curr` keeps changing, so pushing it directly would leave you with empty lists at the end.
- The target check comes **before** the "out of numbers" check. That order matters: a combination can finish exactly when `i` has reached the end.
- Take branch:
  ```js
  curr.push(candidates[i]);
  dfs(i, curr, total + candidates[i]); // same i → reuse allowed
  curr.pop();                          // undo the choice
  ```
- Skip branch: `dfs(i + 1, curr, total)` moves to the next number.

## Complexity
Let `n` = number of candidates, `T` = target, `M` = smallest candidate.

| | Complexity | Why |
|---|---|---|
| Time | O(2^(n + T/M)) | each call splits into 2 (take / skip); a path has at most T/M takes and n skips. Copying a found answer adds O(T/M). |
| Space | O(n + T/M) | recursion depth plus the `curr` list (output not counted) |

## Edge Cases
- Target smaller than every number → `[]`.
- A single number that equals the target → `[[that number]]`.
- Works only for **positive** numbers. A `0` would let "take" repeat forever, since the total never grows.
- The result is computed but never printed in the file; wrap the call in `console.log(...)` to see it.

## Key Takeaway
For "unlimited reuse" combinations, use take/skip backtracking where **take keeps the same index** and **skip moves forward**.
