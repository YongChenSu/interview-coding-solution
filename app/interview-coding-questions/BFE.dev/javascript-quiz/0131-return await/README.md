## Question
```javascript
async function a() {
  try {
    return await Promise.reject(1)
  } catch (e) {
    console.log(e)
  }
}

async function b() {
  try {
    return Promise.reject(2)
  } catch (e) {
    console.log(e)
  }
}

async function start() {
  await a()
  await b()
}

start()

// 1
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
