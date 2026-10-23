# Coin Change II

## Problem
You get coin values `coins` and a target `amount`. You can use each coin as many times as you like. Count how many **different combinations** of coins add up to `amount`. Order doesn't matter, so `1+2` and `2+1` are the same combination. If no combination works, return 0.

```
amount = 5, coins = [1, 2, 5]  →  4
  5
  2 + 2 + 1
  2 + 1 + 1 + 1
  1 + 1 + 1 + 1 + 1

amount = 3, coins = [2]  →  0
amount = 0, coins = [7]  →  1   (the empty combination: use no coins)
```

Below, **n** = `coins.length` and **A** = `amount`.

## Idea (Intuition)
Let `dp[x]` = **the number of ways to make amount `x`** with the coins processed so far.

- `dp[0] = 1`: there is exactly one way to make 0, which is to take nothing. Every combination is built on top of this.
- Add the coins **one type at a time**. When you add coin `c`, any way to make `x - c` becomes a way to make `x`: just add one more `c`. So `dp[x] += dp[x - c]`.

**Why the coin loop goes on the outside:** every coin type is fully added before the next type starts. So each combination is built in one fixed order (all 1s, then all 2s, then all 5s), and `2+1` and `1+2` can't both be counted. If the amount loop were outside instead, you would count **orderings** (permutations), which is a different problem.

**Why `amt` goes upward, starting at `coin`:** when `dp[amt]` reads `dp[amt - coin]`, that value may already include this same coin. That's what lets a coin be used **more than once**.

## Approach
1. Make `dp` of size `amount + 1`, filled with 0, and set `dp[0] = 1`.
2. For each `coin` in `coins`:
   - For `amt` from `coin` up to `amount`: `dp[amt] += dp[amt - coin]`.
3. Return `dp[amount]`.

## Dry Run (`amount = 5`, `coins = [1, 2, 5]`)

### Start

| amt | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| dp | **1** | 0 | 0 | 0 | 0 | 0 |

Only `dp[0] = 1`, the "use nothing" way.

### Pass 1: coin = 1 (only 1s allowed)

| amt | dp[amt] before | + dp[amt − 1] | dp[amt] after | combinations so far |
|---|---|---|---|---|
| 1 | 0 | dp[0] = 1 | **1** | `1` |
| 2 | 0 | dp[1] = 1 | **1** | `1+1` |
| 3 | 0 | dp[2] = 1 | **1** | `1+1+1` |
| 4 | 0 | dp[3] = 1 | **1** | `1+1+1+1` |
| 5 | 0 | dp[4] = 1 | **1** | `1+1+1+1+1` |

| amt | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| dp | 1 | 1 | 1 | 1 | 1 | 1 |

With only 1s, there is exactly one way to make any amount.

### Pass 2: coin = 2 (1s and 2s allowed)
The loop starts at `amt = 2`. You can't use a 2 to make 1, so `dp[1]` stays as it is.

| amt | dp[amt] before | + dp[amt − 2] | dp[amt] after | new combinations (end with a 2) | all combinations |
|---|---|---|---|---|---|
| 2 | 1 | dp[0] = 1 | **2** | `2` | `1+1`, `2` |
| 3 | 1 | dp[1] = 1 | **2** | `2+1` | `1+1+1`, `2+1` |
| 4 | 1 | dp[2] = 2 | **3** | `2+1+1`, `2+2` | `1+1+1+1`, `2+1+1`, `2+2` |
| 5 | 1 | dp[3] = 2 | **3** | `2+1+1+1`, `2+2+1` | `1×5`, `2+1+1+1`, `2+2+1` |

Look at `amt = 4`. It reads `dp[2] = 2`, and that value **already includes the 2-coin** (it was updated in this pass, one row earlier). So `2+2` gets counted. That's how a coin gets reused.

| amt | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| dp | 1 | 1 | 2 | 2 | 3 | 3 |

### Pass 3: coin = 5 (1s, 2s and 5s allowed)
The loop runs only for `amt = 5`.

| amt | dp[amt] before | + dp[amt − 5] | dp[amt] after | new combination |
|---|---|---|---|---|
| 5 | 3 | dp[0] = 1 | **4** | `5` |

| amt | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| dp | 1 | 1 | 2 | 2 | 3 | **4** |

Return `dp[5]` = **4** ✅

### What if the loops were swapped? (`amount = 3`, `coins = [1, 2]`)
The correct answer is **2**: `1+1+1` and `1+2`.

| Loop order | dp[3] | What it counts |
|---|---|---|
| coins outside (this code) | **2** | `1+1+1`, `1+2` (combinations) ✅ |
| amount outside | 3 | `1+1+1`, `1+2`, `2+1` (orderings, as in Combination Sum IV) ❌ |

## Code Walkthrough
```js
const dp = Array.from({ length: amount + 1 }).fill(0);
dp[0] = 1;
```
The array has one slot for each amount from 0 to `amount`. `dp[0] = 1` is the base case that every count grows from. `new Array(amount + 1).fill(0)` would do the same thing.

```js
for (let amt = coin; amt <= amount; amt++) {
    dp[amt] += dp[amt - coin];
}
```
- Starting at `coin` keeps `amt - coin` at 0 or more, so no index check is needed.
- `+=` keeps the ways that don't use this coin (already in `dp[amt]`) and adds the ways that end with this coin (`dp[amt - coin]`).
- Going **upward** means `dp[amt - coin]` already counts this coin, so a coin can be used many times. Going downward would allow each coin only once, like 0/1 knapsack.

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n × A) | For each of the n coins, the inner loop runs at most A times, doing O(1) work each time. |
| Space | O(A) | One `dp` array of size A + 1, reused for every coin. |

## Edge Cases
- **`amount = 0`**: returns `dp[0] = 1`, the empty combination. LeetCode expects 1.
- **No way to make the amount** (`amount = 3`, `coins = [2]`): `dp[3]` never gets added to, so it returns 0.
- **Coin bigger than the amount** (`coins = [10]`, `amount = 5`): its inner loop never runs, so it's simply skipped.
- **Coin order in the input**: `[5, 2, 1]` gives the same answer as `[1, 2, 5]`. Only the order of the loops matters.
- **Duplicate coins in the input** (`[1, 1]`): this would count some combinations twice. LeetCode guarantees the coins are unique, so it doesn't come up there.

## Key Takeaway
**Unbounded knapsack, counting combinations**: put the coins in the outer loop and the amount in the inner loop, going upward. `dp[x] += dp[x - coin]`, starting from `dp[0] = 1`. Swap the loops and you count orderings instead.
