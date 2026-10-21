# Subsets (Power Set)

## Problem
Given an array of **unique** numbers, return **every possible subset**, including the empty one and the full array. This is called the power set. For n numbers there are 2ⁿ subsets.

```
Input:  [1, 2, 3]
Output: [[1,2,3], [1,2], [1,3], [1], [2,3], [2], [3], []]   (any order is fine)
```

## Idea (Intuition)
For every element you make one yes/no choice: **take it** or **skip it**. With 3 elements that's 2 × 2 × 2 = 8 combinations of choices, and each combination is one subset.

The recursion walks through those choices. This is **backtracking**: add an element to a temporary list (`temp`), explore everything that follows, then **undo** it (`pop`) and explore the "skip it" branch.

```
                        []
             take 1 /        \ skip 1
                 [1]          []
          take 2 /  \       /    \
            [1,2]   [1]   [2]     []
            /  \    / \   / \    /  \
      [1,2,3][1,2][1,3][1][2,3][2][3] []
```

## Approach
1. Use shared `result` (all subsets) and `temp` (the subset being built).
2. `subset(array, i)` decides for element `i`:
   1. **Base case:** if `i == array.length`, every element has been decided, so save a **copy** of `temp`.
   2. **Take it:** `temp.push(array[i])`, then recurse with `i + 1`.
   3. **Undo:** `temp.pop()`.
   4. **Skip it:** recurse with `i + 1` without the element.
3. Start with `subset(array, 0)`.

## Dry Run (`[1, 2, 3]`)

| Path of choices | temp at base case | Saved |
|---|---|---|
| take 1, take 2, take 3 | [1, 2, 3] | 1st |
| take 1, take 2, skip 3 | [1, 2] | 2nd |
| take 1, skip 2, take 3 | [1, 3] | 3rd |
| take 1, skip 2, skip 3 | [1] | 4th |
| skip 1, take 2, take 3 | [2, 3] | 5th |
| skip 1, take 2, skip 3 | [2] | 6th |
| skip 1, skip 2, take 3 | [3] | 7th |
| skip 1, skip 2, skip 3 | [] | 8th |

The file actually runs on `[1, 2, 3, 4]` (not the `[1, 2, 3]` in the comment), so it prints 2⁴ = **16** subsets, starting with `[1, 2, 3, 4], [1, 2, 3], [1, 2, 4], ...`.

## Code Walkthrough
```js
if (i == array.length) return result.push([...temp]);
```
`[...temp]` saves a **copy**. If it pushed `temp` itself, every entry would point to the same array, which ends up empty (`[]`) after all the pops.

```js
temp.push(array[i]);
subset(array, i + 1);
temp.pop();
subset(array, i + 1);
```
This is the take / undo / skip pattern. The `pop` puts `temp` back exactly as it was before this level, so the "skip" branch starts clean.

> **Note:** `result` and `temp` are global. Calling `subset` a second time keeps adding to the old `result`. Wrapping them inside a function (e.g. `function subsets(nums) { const result = [], temp = []; ...; return result; }`) makes it reusable. Also, `return result.push(...)` returns the new length, which nobody uses. A plain `result.push(...); return;` is clearer.

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n · 2ⁿ) | The recursion reaches 2ⁿ base cases, and each one copies `temp` (up to n items). |
| Space | O(n) extra, O(n · 2ⁿ) with output | The recursion depth and `temp` are at most n. The result holds 2ⁿ subsets of up to n items. |

## Edge Cases
- **Empty array**: `[[]]`. The base case fires right away and saves the empty subset.
- **One element `[0]`**: `[[0], []]`.
- **Duplicates** (e.g. `[1, 2, 2]`): this code would produce repeated subsets. That's a different problem (Subsets II): sort first and skip equal neighbours.

## Key Takeaway
**Pick / don't-pick recursion: push → recurse → pop → recurse.** Save a copy at the base case. This template is the base for combinations, combination sum, and permutations.
