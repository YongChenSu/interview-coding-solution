## Question
What does the code snippet to the right output by console.log?

```javascript
const promise = Promise.resolve()
function f() {
  return promise
}

async function a() { return f() }
async function b() { return await f() }
function c() { return f() }

console.log(a() === b())
console.log(b() === c())
console.log(a() === c())
console.log(c() === f())
```

## Solution 1
Async functions always returns a new promise which is a different instance every time.

```javascript
console.log(a() === b()) // false
console.log(b() === c()) // false
console.log(a() === c()) // false
console.log(c() === f()) // true
console.log(a() === a()) // false
```
