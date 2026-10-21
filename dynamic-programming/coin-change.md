# Coin Change

## Problem
Given coin values `coins` (you can use each one as many times as you like) and a target `amount`, return the **fewest coins** that add up to `amount`. If it can't be done, return `-1`.

```
coins = [1, 2, 5], amount = 11  →  3    (5 + 5 + 1)
coins = [2],       amount = 3   →  -1
coins = [1],       amount = 0   →  0
```

Below, **A** = `amount` and **k** = the number of coin types.

## Idea (Intuition)
Picking the biggest coin first (greedy) doesn't always work. With coins `[1, 3, 4]` and amount 6, greedy gives `4 + 1 + 1` (3 coins), but `3 + 3` is only 2.

Instead, solve every smaller amount first. If you already know the best answer for every amount below `amt`, then for `amt` you just ask: "What if the **last** coin I add is `coin`?" Then you need `best[amt - coin] + 1` coins. Try every coin and keep the smallest.

This is **dynamic programming (DP)**: build the answer for a big problem from saved answers to smaller ones.

## Approach
1. Make `dp_array` of size `A + 1`, filled with `Infinity` (meaning "can't make this yet").
2. Set `dp_array[0] = 0`: zero coins make amount 0.
3. For each `amt` from 1 to `A`:
   - For each `coin` that is `<= amt`:
     - `need = dp_array[amt - coin] + 1`
     - `dp_array[amt] = min(dp_array[amt], need)`
4. If `dp_array[A]` is still `Infinity`, return `-1`. Otherwise return it.

## Dry Run
`coins = [1, 2, 5]`, `amount = 11`

| amt | via coin 1 | via coin 2 | via coin 5 | dp[amt] |
|---|---|---|---|---|
| 0 | – | – | – | 0 |
| 1 | dp[0]+1 = 1 | – | – | 1 |
| 2 | dp[1]+1 = 2 | dp[0]+1 = 1 | – | 1 |
| 3 | dp[2]+1 = 2 | dp[1]+1 = 2 | – | 2 |
| 4 | dp[3]+1 = 3 | dp[2]+1 = 2 | – | 2 |
| 5 | dp[4]+1 = 3 | dp[3]+1 = 3 | dp[0]+1 = 1 | 1 |
| 6 | dp[5]+1 = 2 | dp[4]+1 = 3 | dp[1]+1 = 2 | 2 |
| 7 | dp[6]+1 = 3 | dp[5]+1 = 2 | dp[2]+1 = 2 | 2 |
| 8 | dp[7]+1 = 3 | dp[6]+1 = 3 | dp[3]+1 = 3 | 3 |
| 9 | dp[8]+1 = 4 | dp[7]+1 = 3 | dp[4]+1 = 3 | 3 |
| 10 | dp[9]+1 = 4 | dp[8]+1 = 4 | dp[5]+1 = 2 | 2 |
| 11 | dp[10]+1 = 3 | dp[9]+1 = 4 | dp[6]+1 = 3 | **3** |

Answer: `3`.

## Code Walkthrough
```js
const dp_array = Array.from({ length: amount + 1 }).fill(Infinity);
dp_array[0] = 0;
```
`Infinity` works well as "impossible": `Infinity + 1` is still `Infinity`, and `Math.min` ignores it whenever a real number is available.

```js
if (coin <= amt)
```
Stops the code from reading a negative index like `dp_array[-2]`.

```js
return dp_array[amount] == Infinity ? -1 : dp_array[amount];
```
Converts "still impossible" into the `-1` the problem asks for.

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(A · k) | The outer loop runs A times, and the inner loop runs over k coins; each step is O(1). |
| Space | O(A) | One array of size A + 1. |

## Edge Cases
- **`amount = 0`**: loop doesn't run, returns `dp[0] = 0`.
- **Impossible amount** (`[2]`, 3): `dp[3]` stays `Infinity` → `-1`.
- **Coins bigger than the amount**: skipped by `coin <= amt`.
- **Unsorted or duplicate coins**: fine, every coin is tried for every amount.

## Key Takeaway
**Bottom-up DP**: `dp[x] = min over coins of dp[x - coin] + 1`, starting from `dp[0] = 0`. Use `Infinity` to mean "not reachable".
