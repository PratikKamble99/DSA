# Combination Sum II

## Problem
You get a list of positive numbers (`candidates`) that **may contain duplicates**, and a `target`. Find every unique combination that adds up to `target`. Each number in the list can be used **at most once**, and the answer must not contain the same combination twice.

Example: `candidates = [10, 1, 2, 7, 6, 1, 5]`, `target = 8` → `[[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]`

## Idea (Intuition)
Two problems to solve:
1. **Use each number once**: after picking index `i`, only look at indexes after `i`.
2. **No repeated combinations**: the list has two `1`s. Starting with the first `1` or the second `1` gives the same answers. So **sort** the list to put equal numbers side by side, and at each step only try a given value **once**. The second `1` is skipped *as a choice at the same position*, but it can still be used *after* the first `1` (that is how `[1, 1, 6]` is found).

Instead of subtracting toward zero, the code counts the target down: it passes `target - candidates[i]` and stops when that hits `0`.

## Approach
1. Sort `candidates` ascending.
2. Call `backtrack(curr, curPos, target)` where `target` is the amount **still left** to reach.
3. If `target == 0`, save a copy of `curr` and return.
4. If `target < 0`, return (went over).
5. Loop `i` from `curPos` to the end:
   - If `candidates[i]` equals the value tried just before in this loop (`prev`), skip it.
   - Push `candidates[i]`, recurse with `i + 1` and `target - candidates[i]`, then pop.
   - Set `prev = candidates[i]`.
6. Start with `backtrack([], 0, target)` and return all saved combinations.

## Dry Run
Sorted: `[1, 1, 2, 5, 6, 7, 10]`, `target = 8`. "left" is the amount still needed.

| curr | left | What happens |
|---|---|---|
| [1] | 7 | loop from index 1 |
| [1, 1] | 6 | try 2 → left 4 → 5,6,7,10 all go negative. Try 5 → 1, nothing fits. Try 6 → 0 ✅ `[1, 1, 6]`. 7, 10 → negative |
| [1, 2] | 5 | try 5 → 0 ✅ `[1, 2, 5]`. 6, 7, 10 → negative |
| [1, 5] | 2 | 6, 7, 10 → negative |
| [1, 6] | 1 | 7, 10 → negative |
| [1, 7] | 0 | ✅ `[1, 7]` |
| [1, 10] | -2 | stop |
| second `1` at top level | — | **skipped** (`prev == 1`), would repeat the answers above |
| [2] | 6 | 5 → 1 nothing fits; 6 → 0 ✅ `[2, 6]` |
| [5], [6], [7] | 3, 2, 1 | nothing fits |
| [10] | -2 | stop |

Result: `[[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]`

## Code Walkthrough
- `candidates.sort((a, b) => a - b)`: number sort. Without the compare function, JS sorts as strings (`10` would come before `2`).
- Duplicate skip:
  ```js
  let prev = -1;
  for (let i = curPos; i < candidates.length; i++) {
      if (candidates[i] == prev) continue;
  ```
  `prev` is local to each call, so it only blocks a repeat at the **same depth**. Deeper calls get their own `prev`, which is why `[1, 1, 6]` still works. `-1` is a safe start value because all numbers are positive.
- `backtrack(curr, i + 1, ...)`: `i + 1` means each index is used at most once.
- `pairs.push([...curr])`: save a copy, since `curr` is changed later.

> Note: the `target <= 0` check prints `console.log("less")`, but it actually runs when the sum went **over** the target (left is negative). It is leftover debug output and will print many times. It is also written as `<= 0`, but `0` was already handled above, so only `< 0` ever reaches it.

> Note: since the list is sorted, the loop could `break` as soon as `candidates[i] > target`, because every later number is bigger too. The code instead recurses and returns on the negative check. Same answer, more wasted calls.

## Complexity
Let `n` = number of candidates.

| | Complexity | Why |
|---|---|---|
| Time | O(n · 2^n) | each number is either in or out of a combination, so at most 2^n subsets are explored; copying a found answer costs up to O(n). Sorting adds O(n log n). |
| Space | O(n) | recursion depth and `curr` are at most n long (output not counted) |

## Edge Cases
- Duplicates in the input → handled by sorting + `prev` skip.
- Target smaller than every number → `[]`.
- All numbers the same, e.g. `[2, 2, 2]`, target `4` → `[[2, 2]]` once, not three times.
- `prev = -1` assumes no `-1` in the input; fine here since candidates are positive.
- `sort` changes the caller's array in place.

## Key Takeaway
To avoid duplicate combinations: **sort first, then skip a value that was already tried at the same loop level**.
