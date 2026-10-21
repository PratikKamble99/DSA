# Longest Consecutive Sequence

## Problem
You get an unsorted array of integers. Find the length of the longest run of numbers that go up by exactly 1 (like 1, 2, 3, 4). The numbers can be anywhere in the array, in any order. The problem asks for an O(n) solution.

Example: `nums = [100, 4, 200, 1, 3, 2]` → `4` (the run is 1, 2, 3, 4)
Example: `nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]` → `9` (0 to 8)

---

## Approach 1: Sort + Remove Duplicates (`longestConsecutive_1`)

### Idea (Intuition)
If the numbers were sorted, a consecutive run would sit side by side: `1, 2, 3, 4`. Then you only need to walk the array once and check "is this number exactly 1 more than the one before it?"

Duplicates break that check (`1, 1, 2` has a gap of 0 in the middle), so remove them first with a `Set`.

### Approach
1. If the array is empty, return 0.
2. Remove duplicates with `new Set(nums)` and sort the numbers in ascending order.
3. Start with `max_length = 1` and `curr_length = 1`.
4. For each number from index 1: if it is exactly 1 more than the previous number, grow `curr_length` and update `max_length`. Otherwise reset `curr_length` to 1.
5. Return `max_length`.

> Note: the code has a bug on line 112. It checks `sorted[i + 1] - sorted[i - 1] === 1`, which compares two numbers that are 2 positions apart. In a sorted array of unique numbers, that gap is always at least 2, so the check is never true and the function returns `1` for any non-empty input. For example, `[100, 4, 200, 1, 3, 2]` gives `1` instead of `4`. The fix is to compare neighbours: `sorted[i] - sorted[i - 1] === 1`. The dry run below uses the fixed check.

### Dry Run (with the fix)
`nums = [100, 4, 200, 1, 3, 2]` → unique and sorted: `[1, 2, 3, 4, 100, 200]`

| i | sorted[i - 1] | sorted[i] | Difference is 1? | curr_length | max_length |
|---|---|---|---|---|---|
| start | — | — | — | 1 | 1 |
| 1 | 1 | 2 | yes | 2 | 2 |
| 2 | 2 | 3 | yes | 3 | 3 |
| 3 | 3 | 4 | yes | 4 | 4 |
| 4 | 4 | 100 | no | 1 | 4 |
| 5 | 100 | 200 | no | 1 | 4 |

Result: `4`.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n log n) | sorting dominates; building the set and the single loop are O(n) |
| Space | O(n) | the `Set` and the `sorted` array hold up to n numbers |

This is correct once fixed, but it does **not** meet the O(n) requirement because of the sort.

---

## Approach 2: Hash Set, Count Only From Sequence Starts (`longestConsecutive`)

### Idea (Intuition)
Put every number in a `Set` so "is x in the array?" takes O(1) time. (A *Set* is a collection with no duplicates and fast lookups.)

The naive version would start counting upward from **every** number. That repeats work: from 1 you count 1, 2, 3, 4, then from 2 you count 2, 3, 4 again, and so on.

The trick: only start counting from a number that **begins** a sequence. A number begins a sequence when `num - 1` is **not** in the set. From 1 you count up to 4. You skip 2, 3 and 4, because 1, 2 and 3 are in the set, so they are in the middle of a run that has already been counted.

### Approach
1. Put all numbers in a `Set`. This also removes duplicates.
2. For each `num` in the set:
   1. If `num - 1` is in the set, skip it. It is not a start.
   2. Otherwise it is a start. Count up while `current + 1` is in the set.
   3. Update `max` with this run's length.
3. Return `max`. It stays 0 for an empty array.

### Dry Run
`nums = [100, 4, 200, 1, 3, 2]` → set (in insertion order): `{100, 4, 200, 1, 3, 2}`

| num | num - 1 in set? | Start? | Count up | length | max |
|---|---|---|---|---|---|
| 100 | 99: no | yes | 101: no | 1 | 1 |
| 4 | 3: yes | no, skip | — | — | 1 |
| 200 | 199: no | yes | 201: no | 1 | 1 |
| 1 | 0: no | yes | 2 ✓, 3 ✓, 4 ✓, 5 ✗ | 4 | 4 |
| 3 | 2: yes | no, skip | — | — | 4 |
| 2 | 1: yes | no, skip | — | — | 4 |

Result: `4`.

### Code Walkthrough
- `const set = new Set(nums);`
  O(1) lookups, and duplicates disappear (`[0, 0, 1]` becomes `{0, 1}`).
- `for (let num of set)`
  Loops over the set, not `nums`, so a duplicate start is never counted twice.
- `if (!set.has(num - 1))`
  The key line. Only sequence starts go further.
- `while (set.has(current + 1)) { current++; length++; }`
  Walks up the run one number at a time.
- `max = Math.max(length, max);`
  Keeps the best run seen so far.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | building the set is O(n); the `while` loop only runs from sequence starts, so each number is stepped over at most once in total, which makes the loop O(n) overall rather than O(n²) |
| Space | O(n) | the set stores up to n numbers |

---

## Comparison
| Approach | Time | Space | Notes |
|---|---|---|---|
| Sort + dedupe | O(n log n) | O(n) | easy to follow, but the code needs the line-112 fix |
| Hash set, starts only | O(n) | O(n) | meets the O(n) requirement; this is the expected answer |

## Edge Cases
- **Empty array** `[]` → `0`. Approach 1 returns early. In Approach 2 the loop never runs, so `max` stays 0.
- **One element** `[5]` → `1`.
- **Duplicates** `[1, 0, 1, 2]` → `3`. The `Set` removes the extra `1`.
- **No consecutive numbers** `[9, 1, 5]` → `1`.
- **Negative numbers** `[-2, -1, 0]` → `3`. `num - 1` works the same for negatives.

## Key Takeaway
Use a hash set for O(1) lookups, and only start counting at the beginning of a sequence (`num - 1` not in the set), so each number is visited a constant number of times.
