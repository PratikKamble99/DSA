# Top K Frequent Elements

## Problem
Given an array of numbers `nums` and a number `k`, return the `k` numbers that appear most often.

```
nums = [1, 1, 1, 2, 2, 3], k = 2  →  [1, 2]
```
`1` appears 3 times and `2` appears 2 times, so they are the top 2. `3` appears only once.

Both approaches start the same way: **count how many times each number appears**. They differ in how they then pick the top `k`.

---

## Approach 1: Count + Sort

### Idea
Once you know each number's count, sort the numbers by count from highest to lowest and take the first `k`.

### Approach
1. Make a `Map` from number to count.
2. Loop over `nums` and add 1 to that number's count.
3. Turn the map into an array of `[number, count]` pairs.
4. Sort the pairs by count, highest first.
5. Keep the first `k` pairs and return only the numbers.

### Dry Run (`[1, 1, 1, 2, 2, 3]`, k = 2)

| Step | Result |
|---|---|
| Count | `{1: 3, 2: 2, 3: 1}` |
| `Array.from(map)` | `[[1,3], [2,2], [3,1]]` |
| Sort by count (desc) | `[[1,3], [2,2], [3,1]]` |
| `slice(0, 2)` | `[[1,3], [2,2]]` |
| `map(a => a[0])` | `[1, 2]` ✅ |

### Code Walkthrough
```js
if (!map.has(num)) map.set(num, 0);
map.set(num, map.get(num) + 1);
```
Starts a new number at 0, then adds 1. This builds the count.

```js
Array.from(map).sort((a, b) => b[1] - a[1])
```
`b[1] - a[1]` compares the counts. Because `b` comes first, the order is highest to lowest.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n log n) | Counting is O(n). Sorting the `u` unique numbers is O(u log u), and `u` can be as large as `n`. |
| Space | O(n) | The map and the pairs array hold up to `n` unique numbers. |

---

## Approach 2: Count + Buckets (faster)

### Idea
A number can appear at most `n` times, where `n` is the array length. So instead of sorting, make one "bucket" for every possible count from 0 to `n`, and put each number into the bucket for its count. Then walk the buckets from the highest count down and collect numbers until you have `k`.

It works like sorting exam papers into boxes labeled by score: you don't compare papers with each other, you just drop each one in its box.

### Approach
1. Count each number with a `Map` (same as Approach 1).
2. Create `nums.length + 1` empty buckets. The bucket at index `i` holds the numbers that appear `i` times.
3. Put each number into `buckets[count]`.
4. Go from the last bucket down to bucket 1, adding numbers to `result`.
5. Stop as soon as `result` has `k` numbers.

### Dry Run (`[1, 1, 1, 2, 2, 3]`, k = 2)

Count: `{1: 3, 2: 2, 3: 1}`

Buckets (7 of them, indexes 0 to 6):

| freq | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| numbers | [] | [3] | [2] | [1] | [] | [] | [] |

Walk from the top:

| freq | bucket | result |
|---|---|---|
| 6, 5, 4 | empty | `[]` |
| 3 | `[1]` | `[1]` |
| 2 | `[2]` | `[1, 2]`, which has k items, so return ✅ |

### Code Walkthrough
```js
count.set(num, (count.get(num) || 0) + 1);
```
A shorter way to count. `count.get(num)` returns `undefined` for a new number, so `|| 0` makes it start at 0.

```js
const buckets = Array.from({ length: nums.length + 1 }, () => []);
```
Makes `n + 1` **separate** empty arrays. Using `new Array(n + 1).fill([])` here would be a bug, because every slot would share the same array.

```js
for (let freq = buckets.length - 1; freq > 0 && result.length < k; freq--)
```
Walks from the highest count down. It skips bucket 0 because no number appears 0 times.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | Counting is O(n). Filling the buckets is O(u). Walking the `n + 1` buckets and their contents is O(n). |
| Space | O(n) | The map holds up to `n` numbers, plus `n + 1` buckets. |

---

## Comparison

| Approach | Time | Space | Notes |
|---|---|---|---|
| Count + Sort | O(n log n) | O(n) | Easiest to write |
| Count + Buckets | O(n) | O(n) | Fastest; uses the fact that a count can't be bigger than `n` |
| Min-heap of size k | O(n log k) | O(n) | Common in Java and Python. JS has no built-in heap. |

## Edge Cases
- **One element** (`[1]`, k = 1): returns `[1]`.
- **Negative numbers** (`[4, 4, -1, -1, -1, 7]`): work fine, because the numbers are Map keys, not array indexes.
- **Ties in count**: tied numbers come out in the order they first appeared in `nums`, since Map keeps insertion order and JS `sort` is stable.
- **k equals the number of unique values**: returns all of them.

> **Note: problems in the file**
> 1. **Both functions are named `topKFrequent`.** JavaScript hoists function declarations, so the second (bucket) version replaces the first before any code runs. All 8 `console.log` calls actually run the bucket version, and the sort version never runs. Rename one of them (for example `topKFrequentSort`) to test both.
> 2. **Line 20's expected output is wrong.** `[2, 2, 3, 3, 3, 4, 4, 4]` with k = 2 returns `[3, 4]`, not `[1, 2]`: `3` and `4` both appear 3 times.

## Key Takeaway
When the values you want to sort by can only fall in a small range (here, counts from 0 to `n`), use **bucket sort**: an array indexed by that value. It turns O(n log n) into O(n).
