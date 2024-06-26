## Question & Solution
```javascript
console.log(1) // 1️⃣ 

setTimeout(() => {
  console.log(2) // 1️⃣1️⃣
}, 10)

setTimeout(() => {
  console.log(3) // 1️⃣0️⃣
}, 0);

new Promise((_, reject) => {
  console.log(4) // 2️⃣
  reject(5)
  console.log(6) // 3️⃣
})
.then(() => console.log(7))
.catch(() => console.log(8)) // 5️⃣
.then(() => console.log(9)) // 6️⃣
.catch(() => console.log(10))
.then(() => console.log(11)) // 7️⃣
.then(console.log) // 8️⃣
.finally(() => console.log(12)) // 9️⃣

console.log(13) // 4️⃣

// 1
// 4
// 6
// 13
// 8
// 9
// 11
// undefined
// 12
// 3
// 2
```

## Notes
Key points to remember are-

- All synchronous code gets executed first
- The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value. Basically, it's a nonblocking block of code that executes when the call stack is empty
- The executor is called synchronously by the Promise constructor before even the Promise constructor returns the created object
- Promises create Microtask which has priority over the Macrotask created by setTimeout.
So all code execution can be explained in these steps-

- 1 gets printed
- 3 and 2 get pushed to the Macrotask queue (remember 3 gets pushed before 2 because of less delay)
- 4 and 6 get printed next and the promise is queued to the Microtask queue
- 13 also gets printed being a synchronous code
- Now since, the call stack is empty. Microtask queue is checked first and promise gets executed. Since it is rejected, it goes into catch block and 8 gets printed
- Because of promise chaining as long as no error happens, all subsequent then get executed i.e. 9, 11, undefined and then finally gets invoked so 12 gets printed
- Lastly, queued setTimeouts get executed i.e. 3 and 2 will get printed

## Reference
[Discuss](https://bigfrontend.dev/quiz/promise-order-II/discuss)
