# Missing Number

## Problem
The array has **n distinct numbers** taken from the range `0` to `n`. The range has `n + 1` numbers, so exactly one is missing. Find it.

```
nums = [3, 0, 1]  →  2
nums = [0, 1]     →  2   (the input used in the file)
nums = [9, 6, 4, 2, 3, 5, 7, 0, 1]  →  8
```

The file has four versions. Below, **n** = the length of the array.

---

## Approach 1: Search for each number (`findMissingBrute`)

### Idea
Check every number from `0` to `n`. For each one, scan the array. The first number you can't find is the answer.

### Approach
1. For each `i` from `0` to `n`:
   - Set `flag = 0`.
   - Scan the array. If some `nums[j] == i`, set `flag = 1` and stop.
   - If `flag` is still `0`, return `i`.

### Dry Run (`[3, 0, 1]`, n = 3)

| i | found in array? | action |
|---|---|---|
| 0 | yes (index 1) | keep going |
| 1 | yes (index 2) | keep going |
| 2 | no | return `2` |

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n²) | Up to n + 1 outer steps, each scanning n items. |
| Space | O(1) | Only loop variables and `flag`. |

---

## Approach 2: Mark seen numbers (`findMissingBetter`)

### Idea
Use an array as a checklist: `hash[x] = 1` means "x is in the array". Then walk `0` to `n` and return the first number that wasn't ticked.

### Approach
1. For each number, set `hash[nums[i]] = 1`.
2. For `i` from `0` to `n`, return the first `i` where `hash[i]` is empty.

### Dry Run (`[3, 0, 1]`)
After step 1: `hash = [1, 1, empty, 1]`. Checking `0, 1, 2`: `hash[2]` is empty, return `2`.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | Two separate loops of about n steps each (the comment's "2n"). |
| Space | O(n) | `hash` grows to n + 1 slots. |

---

## Approach 3: Expected sum minus actual sum (`findMissingOpt1`) ⭐

### Idea
The sum of `0 + 1 + ... + n` has a formula: `n × (n + 1) / 2`. Add up the array. Whatever is short of the full sum is the missing number.

### Approach
1. `sum = n * (n + 1) / 2`.
2. Add all array items into `arrSum`.
3. Return `sum - arrSum`.

### Dry Run (`[3, 0, 1]`, n = 3)
- Expected: `3 × 4 / 2 = 6`
- Actual: `3 + 0 + 1 = 4`
- Missing: `6 - 4 = 2`

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | One loop to add up the array. |
| Space | O(1) | Two number variables. |

> In languages with fixed-size integers (Java, C++), `n * (n + 1)` can overflow for large n. JavaScript numbers are safe up to about 9 × 10¹⁵, so it's fine here. The XOR version below never has this problem.

---

## Approach 4: XOR (`findMissingOpt2`) ⭐

### Idea
XOR cancels pairs: `a ^ a = 0` and `a ^ 0 = a`. XOR all numbers from the full range, and XOR all numbers in the array. Every number that appears in both cancels out. Only the missing one is left.

### Approach
1. `xor1` = XOR of `1, 2, ..., n` (the full range; `0` can be skipped because `x ^ 0 = x`).
2. `xor2` = XOR of every array item.
3. Return `xor1 ^ xor2`.

Both are built in the same loop: at step `i`, `xor2 ^= nums[i]` and `xor1 ^= i + 1`.

### Dry Run (`[3, 0, 1]`, n = 3)

| i | nums[i] | xor2 | i + 1 | xor1 |
|---|---|---|---|---|
| start | | 0 | | 0 |
| 0 | 3 | 3 | 1 | 1 |
| 1 | 0 | 3 | 2 | 3 |
| 2 | 1 | 2 | 3 | 0 |

Result: `xor1 ^ xor2 = 0 ^ 2 = 2`.

### Code Walkthrough
```js
xor1 = xor1 ^ i+1
```
This reads as `xor1 ^ (i + 1)`, because `+` runs before `^` in JavaScript. It works, but writing the parentheses makes it clearer.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | One loop over n items. |
| Space | O(1) | Two variables. |

---

## Comparison

| Approach | Time | Space |
|---|---|---|
| 1. Brute force | O(n²) | O(1) |
| 2. Hash array | O(n) | O(n) |
| 3. Sum formula | O(n) | O(1) |
| 4. XOR | O(n) | O(1) |

## Edge Cases
- **Missing number is `n`** (`[0, 1]` → `2`): all four return `2`. The brute force and hash loops use `i <= n` exactly so they can reach `n`.
- **Missing number is `0`** (`[1]` → `0`): all four return `0`.
- **One element** (`[0]` → `1`): works the same way.
- **Unsorted input**: none of the approaches need sorting.

## Key Takeaway
**Compare against what the full range should look like.** Either subtract sums (`n(n+1)/2 - sum`) or XOR the range with the array so matching numbers cancel.
