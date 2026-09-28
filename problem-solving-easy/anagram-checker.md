# Anagram Checker

## Problem
Check whether two strings are **anagrams**, meaning they use exactly the same letters the same number of times, only in a different order.

```
"listen", "silent"   →  true
"rat",    "car"      →  false
"aab",    "abb"      →  false   (same letters, different counts)
```

The file has three solutions. Below, **n** = the length of the strings.

---

## Approach 1: Clean, sort and compare (`isAnagram_1`)

### Idea
If you sort the letters of two anagrams, you get the same string: `listen` and `silent` both become `eilnst`. So sort both strings and compare them.

This version also **ignores case and non-letters**, so `"Dormitory"` and `"dirty room!"` count as anagrams.

### Approach
1. Remove everything that isn't a letter with `/[^a-zA-Z]/g` and make the string lowercase.
2. Spread it into an array of characters, sort it, and join it back.
3. Do the same for the second string.
4. If the two results are equal, the strings are anagrams.

### Dry Run (`"listen"`, `"silent"`)

| string | cleaned | sorted |
|---|---|---|
| listen | listen | eilnst |
| silent | silent | eilnst |

`"eilnst" === "eilnst"`, so it returns `true` ✅

### Code Walkthrough
```js
[...str1.replace(/[^a-zA-Z]/g, "").toLowerCase()].sort().join("")
```
`[^a-zA-Z]` matches any character that is **not** a letter, and `replace` removes it. `[...str]` splits the string into characters.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n log n) | Sorting n characters costs n log n. Cleaning and joining are O(n). |
| Space | O(n) | The character arrays and the sorted strings. |

---

## Approach 2: Two frequency maps (`isAnagram_2`)

### Idea
Anagrams have the **same count for every character**. Count the characters of each string in its own `Map`, then check that the counts match.

### Approach
1. If the lengths differ, return `false` right away.
2. Build `s_map`: each character of `s` mapped to how many times it appears.
3. Build `t_map` the same way for `t`.
4. For every character in `s_map`, check that `t_map` has it with the same count. If any check fails, return `false`.
5. Otherwise return `true`.

### Dry Run (`"aab"`, `"abb"`)

| map | contents |
|---|---|
| s_map | `{a: 2, b: 1}` |
| t_map | `{a: 1, b: 2}` |

Checking `a`: 2 !== 1, so it returns `false` ✅

### Code Walkthrough
```js
if (!t_map.has(key) || t_map.get(key) !== value) return false;
```
It only loops over `s_map`. That's enough: the lengths are equal, so if every character of `s` matches `t` exactly, `t` has no characters left over.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | Three separate loops, each over at most n items. |
| Space | O(1) for letters only, O(u) in general | Each map holds one entry per distinct character (u). For a to z that's at most 26. |

---

## Approach 3: One map, add and subtract (`isAnagram`)

### Idea
Use a single counter. For each position, **add 1** for the character in `s` and **subtract 1** for the character in `t`. If the strings are anagrams, every character's pluses and minuses cancel out and every count ends at 0.

### Approach
1. If the lengths differ, return `false`.
2. Loop `i` from 0 to n - 1: `count[s[i]] += 1` and `count[t[i]] -= 1`.
3. If any count isn't 0, return `false`. Otherwise return `true`.

### Dry Run (`"rat"`, `"car"`)

| i | s[i] (+1) | t[i] (−1) | count after this step |
|---|---|---|---|
| 0 | r | c | `{r: 1, c: -1}` |
| 1 | a | a | `{r: 1, c: -1, a: 0}` |
| 2 | t | r | `{r: 0, c: -1, a: 0, t: 1}` |

`c` is -1, which isn't 0, so it returns `false` ✅

### Code Walkthrough
```js
count.set(s[i], (count.get(s[i]) || 0) + 1);
count.set(t[i], (count.get(t[i]) || 0) - 1);
```
`|| 0` starts a new character at 0. Both strings are handled in the same loop because their lengths are equal.

### Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(n) | One loop over n positions, then one loop over at most u map entries. |
| Space | O(1) for letters only, O(u) in general | One map with one entry per distinct character. |

---

## Comparison

| Approach | Time | Space | Ignores case and spaces? | Notes |
|---|---|---|---|---|
| 1. Sort | O(n log n) | O(n) | ✅ Yes | Shortest to write; slower for long strings |
| 2. Two maps | O(n) | O(u) | ❌ No | Easy to follow |
| 3. One map | O(n) | O(u) | ❌ No | Fastest and uses the least memory |

## Edge Cases
- **Different lengths** (`"a"`, `"ab"`): Approaches 2 and 3 return `false` immediately.
- **Same letters, different counts** (`"aab"`, `"abb"`): returns `false`, which is why counting (not just checking which letters appear) is needed.
- **Both empty** (`""`, `""`): returns `true`.
- **Case and spaces** (`"Listen"`, `"silent"`): Approach 1 returns `true`. Approaches 2 and 3 return `false`, because `L` and `l` are different characters to them.

> **Note: points about the file**
> 1. **The approaches don't agree on what counts as an anagram.** Approach 1 ignores case and non-letters; Approaches 2 and 3 compare characters exactly. They can give different answers for the same input, so pick one rule.
> 2. **`isAnagram_2` is never called**, so it isn't tested.
> 3. **The length check in `isAnagram_1` isn't needed** (line 14). Two equal strings always have the same length, so comparing the strings alone is enough.

## Key Takeaway
"Same items, any order" means **compare frequency counts**. A single map where one string adds and the other subtracts checks this in O(n).
