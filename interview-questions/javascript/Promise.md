# Promise

## Question
What is a Promise in JavaScript, and how do you use it?

## Short Answer
A Promise is an object that represents a result that isn't ready yet but will be later. It lets you write code that says "when this finishes, do that" without freezing the program while you wait.

## Detailed Explanation

### Why Promises exist
- JavaScript runs on a **single thread**: it does one thing at a time. If it stopped and waited for slow work (fetching data, reading a file, a timer), the page would freeze.
- So JavaScript starts the slow task, moves on, and comes back when the result is ready. This is **asynchronous** code.
- Before Promises, you passed a **callback** to run when the work finished. Dependent steps nested deeper and deeper, and error handling was repeated at every level. This is called **callback hell**:

```js
getUser(1, (err, user) => {
  if (err) return handle(err);
  getOrders(user.id, (err, orders) => {
    if (err) return handle(err);
    getDetails(orders[0].id, (err, details) => {
      if (err) return handle(err);
      console.log(details);
    });
  });
});
```

The Promise version is flat, reads top to bottom, and has a single error handler:

```js
getUser(1)
  .then(user => getOrders(user.id))
  .then(orders => getDetails(orders[0].id))
  .then(details => console.log(details))
  .catch(err => handle(err)); // one place for all errors
```

### The three states

| State | Meaning | Burger analogy |
|---|---|---|
| pending | Still working | Waiting at your table |
| fulfilled | Finished successfully, has a value | Burger arrived |
| rejected | Failed, has an error | "Sorry, we're out of buns" |

Once a Promise is fulfilled or rejected, it is **settled** and can never change again. Calling `resolve` or `reject` a second time is silently ignored.

### Creating a Promise

```js
const orderBurger = new Promise((resolve, reject) => {
  setTimeout(() => {
    const bunsAvailable = true;
    if (bunsAvailable) resolve("🍔 Burger");   // success
    else reject(new Error("No buns"));         // failure
  }, 2000);
});
```

- The function passed to `new Promise` (the **executor**) runs **immediately and synchronously**.
- JavaScript gives it two functions: call `resolve(value)` on success and `reject(error)` on failure.
- Until one is called, the Promise is pending.
- If the executor **throws**, the Promise is rejected automatically.
- Shortcuts: `Promise.resolve(value)` and `Promise.reject(error)` create an already-settled Promise.

### Using a Promise: `.then`, `.catch`, `.finally`

| Method | Runs when | Receives |
|---|---|---|
| `.then(fn)` | Fulfilled | The value |
| `.catch(fn)` | Rejected (anywhere earlier in the chain) | The error |
| `.finally(fn)` | Either way | Nothing (good for cleanup like hiding a spinner) |

### Chaining
Every `.then()` returns a **new Promise**, which is why chaining works. What you do inside a `.then` decides what the next step gets:
- **Return a normal value**: the next `.then` receives it.
- **Return a Promise**: the chain waits for it, then passes on its result.
- **Throw an error**: the chain skips forward to the nearest `.catch`.
- After `.catch` handles an error, the chain **recovers** and continues normally.

```js
Promise.resolve(1)
  .then(() => { throw new Error("Oops"); })
  .then(() => console.log("skipped"))       // never runs
  .catch(err => console.log(err.message))   // "Oops"
  .then(() => console.log("continues"));    // runs, chain recovered
```

### When `.then` callbacks run (the microtask queue)
`.then` callbacks never run immediately, even when the Promise is already resolved. They go into the **microtask queue**, which runs as soon as the current synchronous code finishes and **before** any `setTimeout` (macrotask) callbacks.

```js
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
console.log("sync");
// sync
// promise
// timeout
```

> Note: a common misconception is that Promises make code run "in the background" or on another thread. They don't. A Promise only schedules **when** your callback runs. The slow work itself (network, timers) is done by the browser or Node, not by the Promise.

### async / await: the modern way
`async/await` is cleaner syntax built on top of Promises.

```js
async function showOrderDetails() {
  try {
    const user    = await getUser(1);
    const orders  = await getOrders(user.id);
    const details = await getDetails(orders[0].id);
    console.log(details);
  } catch (err) {
    console.log("Failed:", err.message);
  } finally {
    console.log("Done");
  }
}
```

- An `async` function **always returns a Promise**. A returned value becomes the fulfilled value; a thrown error becomes the rejection.
- `await` pauses **only this function** until the Promise settles, then gives you its value. The rest of the program keeps running.
- If the Promise rejects, `await` throws, so you use a normal `try/catch`.

| `.then` style | `async/await` style |
|---|---|
| `p.then(v => ...)` | `const v = await p;` |
| `.catch(err => ...)` | `try { ... } catch (err) { ... }` |
| `.finally(() => ...)` | `finally { ... }` |

Use `async/await` for most code because it's easier to read and debug, but understand `.then`, since `async/await` is just Promises underneath.

### Real example with `fetch`

```js
async function loadUser(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!response.ok) throw new Error("HTTP error " + response.status);
  const user = await response.json(); // .json() also returns a Promise
  return user.name;
}
```

> Note: `fetch` only rejects on **network failures**. A 404 or 500 response still fulfills, so you must check `response.ok` yourself.

### Running several Promises at once
If tasks don't depend on each other, run them in parallel:

```js
// Sequential: total ≈ 2s + 2s = 4s
const a = await task1();
const b = await task2();

// Parallel: total ≈ 2s
const [a, b] = await Promise.all([task1(), task2()]);
```

| Method | Resolves when | Rejects when | Use it for |
|---|---|---|---|
| `Promise.all` | All succeed (array of results, same order as input) | Any one fails (fail-fast) | Need every result |
| `Promise.allSettled` | All finish, success or fail | Never | Want every outcome, even failures |
| `Promise.race` | First to settle succeeds | First to settle fails | Timeouts |
| `Promise.any` | First success | All fail (`AggregateError`) | Try several sources, take the first that works |

Timeout with `race`:

```js
const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error("Too slow")), 3000)
);
const data = await Promise.race([fetch("/api/data"), timeout]);
```

> Note: `Promise.race` doesn't **cancel** the slower Promise. The fetch keeps running in the background. To truly cancel a request, use an `AbortController`, or `fetch(url, { signal: AbortSignal.timeout(3000) })`.

### Common mistakes
- **Forgetting `await`**: `const user = getUser(1)` gives you a Promise, so `user.name` is `undefined`.
- **Forgetting `return` inside `.then` with curly braces**: `.then(user => { getOrders(user.id); })` passes `undefined` to the next step. Without braces, `user => getOrders(user.id)` returns automatically.
- **No error handling**: a rejection with no `.catch` or `try/catch` causes an "Unhandled promise rejection". In Node.js 15+ this crashes the process by default.
- **`await` inside `forEach`**: `forEach` doesn't wait for async callbacks, so code after it runs before the work finishes. Use `for...of` (one at a time) or `await Promise.all(ids.map(save))` (in parallel).
- **Awaiting independent tasks one after another**: slower than needed. Use `Promise.all`.
- **Wrapping something that's already a Promise**: `new Promise(resolve => fetch(url).then(resolve))` is pointless (and loses errors). Just `return fetch(url)`.

## Example
Predict the output: this checks executor timing, microtasks vs macrotasks, and chaining.

```js
console.log("1");

const p = new Promise((resolve) => {
  console.log("2");          // executor runs synchronously
  resolve("3");
  resolve("ignored");        // a settled Promise never changes
});

setTimeout(() => console.log("4"), 0);

p.then(v => { console.log(v); return "5"; })
 .then(v => console.log(v));

console.log("6");

// Output:
// 1
// 2
// 6
// 3
// 5
// 4
```

## Common Follow-up Questions
- **What's the difference between a microtask and a macrotask?**: Promise callbacks (`.then`, `await` continuations, `queueMicrotask`) are microtasks. They all run right after the current script, before the next macrotask (`setTimeout`, `setInterval`, I/O, UI events).
- **`Promise.all` vs `Promise.allSettled`?**: `all` fails fast on the first rejection; `allSettled` always waits for every Promise and gives you `{ status, value | reason }` for each.
- **Can you cancel a Promise?**: No, a Promise has no cancel method. You cancel the underlying work instead, e.g. with `AbortController` for `fetch`.
- **Implement `Promise.all` yourself.**: Return a new Promise. Loop over the inputs, wrap each in `Promise.resolve`, and store each result at its index. Keep a counter and resolve when it reaches the input length; reject on the first error. Resolve right away with `[]` for empty input.
- **How do you convert a callback-based function to a Promise?**: Wrap it with `new Promise((resolve, reject) => fn(args, (err, data) => err ? reject(err) : resolve(data)))`, or use `util.promisify` in Node.

## Key Points to Remember
- A Promise is a placeholder for a future value: **pending → fulfilled or rejected**, then it never changes.
- The executor runs immediately; `.then` callbacks run later as **microtasks**, before `setTimeout`.
- Every `.then` returns a new Promise: return a value to pass it on, return a Promise to wait, throw to jump to `.catch`.
- `async/await` is syntax over Promises: an `async` function always returns a Promise, and errors go in `try/catch`.
- Use `Promise.all` for independent tasks; `fetch` doesn't reject on 404/500, so check `response.ok`.
