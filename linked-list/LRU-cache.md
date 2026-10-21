# LRU Cache

## Problem
Build a cache with a fixed **capacity**. `get(key)` returns a value, and `put(key, value)` adds or updates one. When the cache is full and a new key comes in, throw out the **Least Recently Used** key: the one nobody has touched for the longest time. Both operations should be O(1).

```
capacity = 2
put(1, 10)  put(2, 20)      → cache: 2, 1          (most recent first)
get(1)      → 10            → cache: 1, 2
put(3, 30)  → evict 2       → cache: 3, 1
```

---

## Idea (Intuition)
You need two things at once:
- **Find a key fast** → a hash map (`Map`): key → node.
- **Know the usage order and move things around fast** → a **doubly linked list** (each node points to both `prev` and `next`, so you can unlink it in O(1) without searching).

The list is kept in usage order:
- **head** = most recently used.
- **tail** = least recently used, the one to evict.

Every time a key is used (`get` or `put`), unlink its node and put it back at the head. When the cache is full, remove the tail.

## Approach
1. `constructor`: store `capacity`, a `used` counter, an empty `Map`, and `head`/`tail` pointers.
2. `#removeNode(node)` (private helper): unlink a node.
   - Point its `prev` neighbour at its `next`, and its `next` neighbour back at its `prev`.
   - If it was the `head` or `tail`, move that pointer.
3. `put(key, value)`:
   1. If the cache is full **and** the key is new, remove the tail (the LRU item) and do `used -= 1`.
   2. If the key already exists, remove its old node and do `used -= 1`.
   3. Put the new node at the head, store it in the map, and do `used += 1`. If the list was empty, the node is also the tail.
4. `get(key)`: if the key is missing, return `undefined`. Otherwise remove its node, `put` it again (which moves it to the head), and return the value.
5. `print()`: walk from head to tail and print `key : value` pairs.

## Dry Run
This is what the demo at the bottom of the file **would** do once the bugs below are fixed (capacity = 3, list shown head → tail):

| Call | What happens | List (head → tail) |
|---|---|---|
| `put(1, 10)` | new key | 1 |
| `put(2, 20)` | new key | 2, 1 |
| `put(3, 30)` | new key, now full | 3, 2, 1 |
| `put(2, 200)` | key exists → remove old 2, add at head | 2, 3, 1 |
| `put(1, 100)` | key exists → move to head | 1, 2, 3 |
| `put(3, 300)` | key exists → move to head | 3, 1, 2 |
| `put(3, 3000)` | key exists → update value | 3, 1, 2 |
| `get(2)` | used → move to head | 2, 3, 1 |
| `get(3)` | used → move to head | 3, 2, 1 |
| `get(1)` | used → move to head | 1, 3, 2 |
| `put(4, 40)` | full and new → evict tail **2** | 4, 1, 3 |

Expected print: `--> [ 4 : 40 ]--> [ 1 : 100 ]--> [ 3 : 3000 ]`

## Code Walkthrough
```js
if (this.used === this.capacity) {
    if (!this.map.has(key)) { this.#removeNode(this.tail); ... }
}
```
Evict only when the cache is full **and** the key is new. Updating an existing key never needs an eviction, because its old node gets removed anyway.

```js
this.#removeNode(node);
this.put(key, node.value);
```
`get` reuses `put` to move the node to the front. It works, but `put` sees the key in the map and calls `#removeNode` a **second time** on a node that is already unlinked. That's harmless here only because nothing changed in between.

> **Note: bug, the code crashes.** `newNode` is never created, so the first `put` throws `ReferenceError: newNode is not defined` (line 70). `put` needs something like
> `const newNode = { key, value, prev: null, next: this.head };`
> The new node also has to point `next` at the old head. Without that the list never links forward, and `print()` only shows one node.

> **Note: bug, evicted keys stay in the map.** When the tail is removed (line 59), its key is never deleted from `this.map`. A later `get(evictedKey)` still finds it and brings back a value that should be gone. Add `this.map.delete(this.tail.key)` before removing the tail.

> **Note:** `#removeNode` doesn't clear the removed node's own `prev`/`next`. That's fine as long as the node is always relinked, but setting them to `null` is safer. LeetCode's version also expects `get` to return `-1` for a missing key, not `undefined`.

## Complexity
| | Complexity | Why |
|---|---|---|
| Time | O(1) per `get` / `put` | A map lookup is O(1), and unlinking or adding at the head only changes a few pointers. No loops. (`print` is O(n).) |
| Space | O(capacity) | The map and the list each hold at most `capacity` entries. |

## Edge Cases
- **Updating an existing key**: must move it to the head and must not evict anything.
- **`get` on a missing key**: returns `undefined` here (LeetCode wants `-1`).
- **Capacity 1**: each new key evicts the only node, so head and tail are the same node. The head and tail checks in `#removeNode` handle this.
- **Removing the only node**: both `head` and `tail` become `null`.
- **Evicted key read later**: must miss. That needs the `map.delete` fix above.

## Key Takeaway
**Hash map + doubly linked list = O(1) LRU.** The map finds the node, and the list keeps the usage order (head = newest, tail = next to evict). In JS you can also use a plain `Map` alone, because it remembers insertion order: delete and re-set a key to mark it as used, and evict `map.keys().next().value`.
