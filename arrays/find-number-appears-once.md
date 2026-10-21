# Single Number (Find the Number That Appears Once)

## Problem
Every number in the array appears **twice**, except one number that appears **once**. Find it. The challenge asks for O(n) time and O(1) extra space.

```
nums = [4, 1, 2, 1, 2]  →  4
nums = [4, 1, 2, 1, 2, 4, 5]  →  5   (the input used in the file)
```

Below, **n** = the length of the array.

---

## Approach 1: Count with a Map (`numberAppearOnce`)

### Idea
Count how many times each number appears. The answer is the number whose count is `1`.

### Approach
1. Create an empty `Map` (number → count).
2. For each number: if it's already in the map, add 1 to its count, otherwise set its count to `1`.
3. Go through the map and remember the key whose value is `1`.
4. Return it.

### Dry Run (`[4, 1, 2, 1, 2]`)

| i | nums[i] | map after this step |
|---|---|---|
| 0 | 4 | `{4:1}` |
| 1 | 1 | `{4:1, 1:1}` |
| 2 | 2 | `{4:1, 1:1, 2:1}` |
| 3 | 1 | `{4:1, 1:2, 2:1}` |
| 4 | 2 | `{4:1, 1:2, 2:2}` |

Only `4` has count 1, so return `4`.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | One loop to count, one loop over the map (at most n keys). Map operations are O(1). |
| Space | O(n) | The map stores about n/2 + 1 distinct numbers. |

This works, but it breaks the "constant extra space" rule.

---

## Approach 2: XOR everything (`numberAppearOnceOpt`) ⭐

### Idea
XOR (`^`) compares two numbers bit by bit: a bit in the result is `1` when the two bits are **different**, and `0` when they are the **same**.

Three facts make it perfect here:
- `a ^ a = 0`: a number XOR itself cancels out.
- `a ^ 0 = a`: XOR with 0 changes nothing.
- Order doesn't matter: `a ^ b ^ a = a ^ a ^ b = b`.

So if you XOR every number together, each pair cancels to `0`, and only the single number is left.

### Approach
1. Start with `xor = 0`.
2. For each number, do `xor ^= nums[i]`.
3. Return `xor`.

### Dry Run (`[4, 1, 2, 1, 2]`)

| i | nums[i] | xor (decimal) | xor (binary) |
|---|---|---|---|
| start | | 0 | 000 |
| 0 | 4 | 4 | 100 |
| 1 | 1 | 5 | 101 |
| 2 | 2 | 7 | 111 |
| 3 | 1 | 6 | 110 |
| 4 | 2 | 4 | 100 |

Result: `4`. The two `1`s and two `2`s cancelled each other out.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | One loop over n numbers. |
| Space | O(1) | A single variable. |

---

## Comparison

| Approach | Time | Space | Meets O(1) space? |
|---|---|---|---|
| 1. Map count | O(n) | O(n) | No |
| 2. XOR | O(n) | O(1) | Yes |

## Edge Cases
- **One element** (`[7]`): both return `7`.
- **Negative numbers** (`[-3, 1, 1]`): XOR works on negative integers too, returns `-3`.
- **Zero as the answer** (`[0, 5, 5]`): XOR returns `0`, which is correct.
- **Input that breaks the rule** (a number appearing 3 times): XOR gives a wrong answer, because only pairs cancel. The map version would still find a count of `1`.

## Key Takeaway
**Pairs cancel under XOR (`a ^ a = 0`).** XOR all the numbers and the unpaired one is what's left.
