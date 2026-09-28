# Group Anagrams

## Problem
Given an array of words, put words that are **anagrams** of each other into the same group. Anagrams use exactly the same letters the same number of times, only in a different order (`eat`, `tea`, `ate`).

```
Input:  ["eat", "tea", "tan", "ate", "nat", "bat"]
Output: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
```

## Core Idea
Give every word a **signature** that is the same for all of its anagrams. Then use a `Map` from signature to list of words: words with the same signature land in the same list.

The two approaches differ only in how they build the signature.

Throughout, **m** = number of words and **k** = length of the longest word.

---

## Approach 1: Sorted word as key (`group_anagram_1`)

### Idea
Sort the letters of a word. All anagrams become the same string: `eat`, `tea` and `ate` all become `aet`.

### Approach
1. For each word, split it into letters, sort them, and join them back. This is the key.
2. If the key isn't in the map yet, start it with an empty list.
3. Push the word into that key's list.
4. The map's values are the groups.

### Dry Run

| word | sorted key | map after this step |
|---|---|---|
| eat | aet | `{aet: [eat]}` |
| tea | aet | `{aet: [eat, tea]}` |
| tan | ant | `{aet: [eat, tea], ant: [tan]}` |
| ate | aet | `{aet: [eat, tea, ate], ant: [tan]}` |
| nat | ant | `{aet: [...], ant: [tan, nat]}` |
| bat | abt | `{aet: [...], ant: [...], abt: [bat]}` |

Result: `[["eat","tea","ate"], ["tan","nat"], ["bat"]]` ✅

### Code Walkthrough
```js
const sorted = input[i].split("").sort().join("");
```
`"tea"` becomes `["t","e","a"]`, then `["a","e","t"]`, then `"aet"`.

```js
if (!hash.has(sorted)) hash.set(sorted, []);
hash.get(sorted).push(input[i]);
```
Creates the group the first time a key is seen, then adds the word. `push` changes the existing array in place. The commented-out `concat` version made a new array on every insert, which is slower.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(m · k log k) | Each of the m words is sorted, and sorting k letters costs k log k. |
| Space | O(m · k) | The map stores every word plus a key of length k for each group. |

---

## Approach 2: Letter count as key (`group_anagram`)

### Idea
Anagrams have the **same count of each letter**. Count the letters a to z into an array of 26 numbers and use that as the key. Counting is faster than sorting.

### Approach
1. For each word, make an array of 26 zeros, one slot per letter.
2. For each character, compute its slot (`'a'` is 0, `'b'` is 1, and so on) and add 1 there.
3. Join the counts with `#` to get a string key.
4. Group words by that key in a `Map`, exactly like Approach 1.
5. Return `Array.from(map.values())`.

### Dry Run (building keys)

| word | non-zero counts | key (shortened) |
|---|---|---|
| eat | a=1, e=1, t=1 | `1#0#0#0#1#…#1#…` |
| tea | a=1, e=1, t=1 | same key as `eat` ✅ |
| tan | a=1, n=1, t=1 | different key |
| bat | a=1, b=1, t=1 | different key |

The grouping then works the same way as the Approach 1 table.

### Code Walkthrough
```js
const index = char.charCodeAt(0) - "a".charCodeAt(0);
```
Turns a letter into 0 to 25. `'a'` is char code 97, so `'c'` (99) becomes 2.

```js
const key = arr.join("#");
```
The `#` separator matters. Without it, counts such as `[1, 11]` and `[11, 1]` would both join to `"111"` and clash.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(m · k) | Each word is scanned once (k steps) and a 26-slot array is built and joined. 26 is a constant, so it's O(m · (k + 26)) = O(m · k). |
| Space | O(m · k) | The map stores every word. Each key has a fixed size of 26 counts. |

---

## Comparison

| Approach | Key | Time | Space | Best when |
|---|---|---|---|---|
| Sort letters | `"aet"` | O(m · k log k) | O(m · k) | Short words; simplest to write; works with any characters |
| Count letters | `"1#0#…"` | O(m · k) | O(m · k) | Long words with only lowercase `a` to `z` |

## Edge Cases
- **Empty string** `[""]`: its key is `""` (sorted) or all zeros (count), so the output is `[[""]]`.
- **Single word**: one group.
- **No anagrams at all**: every word is in its own group.
- **Uppercase letters, digits or spaces**: Approach 2 assumes lowercase `a` to `z`. For any other character the index falls outside 0 to 25, the count goes into a slot that `join` ignores, and the key is wrong. For example, `"A"` gets the same key as `""`. Approach 1 handles any characters.

> **Note: problems in the file**
> 1. **Nothing is printed.** `group_anagram(Input)` returns the groups, but the result is never logged. Use `console.log(group_anagram(Input))`.
> 2. **`group_anagram_1` is never called**, and it prints its result with `console.log` instead of returning it.
> 3. **`hash` is a global variable** (line 17). If you call `group_anagram_1` twice, the second call still sees the first call's words and the groups get mixed. Create the map inside the function, as `group_anagram` does.
> 4. **The complexity comment on line 21** says `O(nlog(n))`. That's correct only if `n` means the word's length, as the line 27 comment explains.

## Key Takeaway
To group things that are "equal in some way", **build a signature (a canonical key) and group by it in a hash map**. A cheaper signature (counting instead of sorting) makes the whole solution faster.
