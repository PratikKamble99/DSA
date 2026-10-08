# Best Time to Buy and Sell Stock

## Problem
`prices[i]` is a stock's price on day `i`. You can **buy once** and **sell once later**. Return the biggest profit you can make. If no trade makes money, return `0`.

```
[7, 1, 5, 3, 6, 4]  →  5   (buy at 1 on day 1, sell at 6 on day 4)
[7, 6, 4, 3, 1]     →  0   (the price only goes down, so don't trade)
```
You **must buy before you sell**. Buying at 1 and "selling" at 7 isn't allowed, because 7 comes earlier.

Below, **n** = the number of days.

---

## Approach 1: Try every buy/sell pair (first `maxProfit`)

### Idea
For every buy day `i`, try every sell day `j` from `i` onward and keep the best `prices[j] − prices[i]`.

### Approach
1. Set `max = 0`.
2. For each `i`, for each `j ≥ i`: `max = Math.max(max, prices[j] − prices[i])`.
3. Return `max`.

### Code Walkthrough
```js
for (let j = i; j < prices.length; j++)
```
`j` starts at `i` (buy and sell on the same day, profit 0), which does no harm. Starting `max` at `0` means a loss is never chosen.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n²) | Two nested loops check about n²/2 pairs. |
| Space | O(1) | Only `max`. |

---

## Approach 2: Track the cheapest price so far (second `maxProfit`) ⭐

### Idea
Imagine walking through the days. On each day, ask: **"If I sell today, what's the best profit?"** The answer is today's price minus the **cheapest price seen so far**. So remember that cheapest price as you go, and keep the best profit.

### Approach
1. Set `min = prices[0]` and `max = 0`.
2. For each `price`:
   - Update `min = Math.min(min, price)`. This is the best day to have bought, up to today.
   - Update `max = Math.max(max, price − min)`. This is the profit if you sell today.
3. Return `max`.

### Dry Run (`[7, 1, 5, 3, 6, 4]`)

| price | min so far | price − min | max |
|---|---|---|---|
| 7 | 7 | 0 | 0 |
| 1 | 1 | 0 | 0 |
| 5 | 1 | 4 | 4 |
| 3 | 1 | 2 | 4 |
| 6 | 1 | **5** | **5** |
| 4 | 1 | 3 | 5 |

Result: **5** ✅

### Code Walkthrough
```js
min = Math.min(min, price);
max = Math.max(max, price - min);
```
The order matters. `min` is updated **first**, so on the day a new low appears, `price − min` is `0` (buy and sell that same day), never negative.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | One pass over the prices. |
| Space | O(1) | Only `min` and `max`. |

---

## Approach 3: Two pointers / sliding window (third `maxProfit`)

### Idea
It's the same idea as Approach 2, written with indexes. `left` is the **buy day** and `right` is the **sell day**.
- If `prices[right]` is higher than the buy price, check the profit.
- If `prices[right]` is **lower or equal**, it's a better day to buy, so move `left` to `right`.

`right` always moves forward by one.

### Approach
1. Set `left = 0`, `right = 1` and `max = 0`.
2. While `right < n`:
   - If `prices[left] < prices[right]`, update `max` with `prices[right] − prices[left]`.
   - Else, set `left = right` (a new cheapest buy day).
   - Do `right++`.
3. Return `max`.

### Dry Run (`[7, 1, 5, 3, 6, 4]`)

| left (buy) | right (sell) | prices | Action | max |
|---|---|---|---|---|
| 0 (7) | 1 (1) | 7 vs 1 | 1 is cheaper → `left = 1` | 0 |
| 1 (1) | 2 (5) | 1 vs 5 | profit 4 | 4 |
| 1 (1) | 3 (3) | 1 vs 3 | profit 2 | 4 |
| 1 (1) | 4 (6) | 1 vs 6 | profit **5** | **5** |
| 1 (1) | 5 (4) | 1 vs 4 | profit 3 | 5 |

Result: **5** ✅

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | `right` moves forward once per step, so there are n − 1 steps. |
| Space | O(1) | Only `left`, `right` and `max`. |

---

## Comparison

| Approach | Time | Space | Notes |
|---|---|---|---|
| 1. Every pair | O(n²) | O(1) | Easiest to think of |
| 2. Min so far | O(n) | O(1) | Shortest code |
| 3. Two pointers | O(n) | O(1) | Same logic as Approach 2, written with buy/sell indexes |

## Edge Cases
- **Prices only fall** (`[7, 6, 4, 3, 1]`): no profitable trade, so the result is `0`.
- **One day** (`[5]`) or **empty array** `[]`: you can't buy and then sell, so the result is `0`.
- **All the same** (`[3, 3, 3]`): `0`.
- **New low after a peak** (`[2, 4, 1]`): the answer is `2`, from the earlier pair 2 to 4. The later low of 1 has no higher day after it.
- **New low before a higher peak** (`[2, 5, 1, 6]`): the answer is `5` (buy at 1, sell at 6). It beats 2 to 5, which only gives 3.

> **Note: problems in the file**
> 1. **All three functions are named `maxProfit`.** JavaScript keeps only the **last** one, so the `console.log` lines only test Approach 3. I ran each version separately on all 7 inputs plus `[]`, and all three gave the same answers.
> 2. **The expected output on line 46 is wrong.** `[2, 5, 1, 6]` returns **5** (buy at 1, sell at 6), not 6.

## Key Takeaway
**Keep track of the cheapest price so far** and, on each day, check the profit from selling today. One pass gives O(n) time and O(1) space.
