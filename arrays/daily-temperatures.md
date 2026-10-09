# Daily Temperatures

## Problem
You get a list of daily temperatures. For each day, find how many days you must wait for a warmer day. If no warmer day comes later, put `0`.

- Input: `[73, 74, 75, 71, 69, 72, 76, 73]`
- Output: `[1, 1, 4, 2, 1, 1, 0, 0]`

For example, day 2 is `75`. The next warmer day is day 6 (`76`), so the wait is `6 - 2 = 4`.

> Note: The file defines `dailyTemperatures` twice. In JavaScript the second definition replaces the first, so the `console.log` lines only run **Approach 2** (the stack). Approach 1 is never called.

---

## Approach 1: Brute Force (two loops)

### Idea (Intuition)
For each day, look at every day after it, one by one. Stop at the first one that is warmer. The distance between the two days is the answer.

### Approach
1. Make the output array `op` with the same length, filled with `0`.
2. For each day `i`:
   - Check each later day `j = i + 1, i + 2, ...`.
   - At the first `j` where `temperatures[j] > temperatures[i]`, set `op[i] = j - i` and `break`.
3. If nothing warmer is found, `op[i]` stays `0`.
4. Return `op`.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n²) | for each of n days, the inner loop can scan all later days (e.g. falling temps `[60, 50, 40, 30]` never `break`) |
| Space | O(1) extra | only loop variables; the `op` array is the required output |

---

## Approach 2: Monotonic Stack (the one that runs)

### Idea (Intuition)
Keep a **stack** (a list where you only add to and remove from the top) of days that are still **waiting** for a warmer day. We store day **indexes**, not temperatures, so we can compute the gap.

The waiting days on the stack always have temperatures that go **down or stay the same** from bottom to top. That is why it's called a *monotonic stack* (its values only move in one direction).

When a new day is warmer than the day on top of the stack, that waiting day finally has its answer. Pop it, write down the gap, and check the next top. The new warm day might answer several waiting days at once.

### Approach
1. Start with an empty `stack` (indexes of days still waiting) and an empty `results` array.
2. For each day `i` with temperature `curr`:
   - While the day on top of the stack is colder than `curr`:
     - Pop that day `prev_day`.
     - Set `results[prev_day] = i - prev_day`.
   - Push `i` onto the stack (today now waits for its own warmer day).
3. After the loop, any day still on the stack never found a warmer day. Pop each one and set its result to `0`.
4. Return `results`.

### Dry Run
Input: `[73, 74, 75, 71, 69, 72, 76, 73]`
The stack shows indexes, with their temperatures in brackets.

| i | curr | Pops (result set) | Stack after |
|---|---|---|---|
| 0 | 73 | none (stack empty) | `0(73)` |
| 1 | 74 | pop 0 → `res[0] = 1` | `1(74)` |
| 2 | 75 | pop 1 → `res[1] = 1` | `2(75)` |
| 3 | 71 | none (75 is not < 71) | `2(75), 3(71)` |
| 4 | 69 | none (71 is not < 69) | `2(75), 3(71), 4(69)` |
| 5 | 72 | pop 4 → `res[4] = 1`, pop 3 → `res[3] = 2` | `2(75), 5(72)` |
| 6 | 76 | pop 5 → `res[5] = 1`, pop 2 → `res[2] = 4` | `6(76)` |
| 7 | 73 | none (76 is not < 73) | `6(76), 7(73)` |

Left on the stack: days 6 and 7 → `res[6] = 0`, `res[7] = 0`.

Result: `[1, 1, 4, 2, 1, 1, 0, 0]` ✓

### Code Walkthrough
- `while (temperatures[stack[stack.length - 1]] < curr)` compares the **temperature** of the top waiting day with today. The stack holds indexes, so we look up the temperature.
- `results[prev_day] = i - prev_day;` the answer is the number of days between the waiting day and today.
- `stack.push(i);` today is pushed *after* the pops, so it waits for its own warmer day.
- `while (stack.length > 0) results[stack.pop()] = 0;` pops every day still waiting and sets its result to `0`, because no warmer day comes after it. This also leaves the stack empty when the function ends.

> Note: When the stack is empty, `stack[-1]` is `undefined`, so `temperatures[undefined]` is `undefined`, and `undefined < curr` is `false`. That ends the loop. It works, but only by luck of JavaScript rules. A clearer check is `while (stack.length && temperatures[stack[stack.length - 1]] < curr)`.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | each index is pushed once and popped at most once, so the `while` loop runs at most n times in total across the whole `for` loop |
| Space | O(n) | the stack can hold every index when temperatures keep falling (e.g. `[60, 50, 40, 30]`) |

---

## Comparison
| | Brute Force | Monotonic Stack |
|---|---|---|
| Time | O(n²) | O(n) |
| Extra Space | O(1) | O(n) |
| Idea | scan forward from every day | keep waiting days; answer them when a warmer day arrives |

## Edge Cases
- One day `[70]` → `[0]` (nothing comes after it).
- Strictly rising `[30, 40, 50, 60]` → `[1, 1, 1, 0]` (each day is popped by the very next one).
- Strictly falling `[60, 50, 40, 30]` → `[0, 0, 0, 0]` (nothing is ever popped; the stack grows to n).
- Equal temps `[50, 50, 50]` → `[0, 0, 0]` (the check is `<`, so an equal day does **not** count as warmer).
- Empty input `[]` → `[]`.

## Key Takeaway
For "next greater element" problems, use a monotonic stack of indexes. Each element is pushed and popped once, so O(n²) becomes O(n).
