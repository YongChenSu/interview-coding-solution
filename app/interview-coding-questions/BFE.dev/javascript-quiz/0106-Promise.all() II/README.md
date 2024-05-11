## Question & Solution
```javascript
const promise1 = Promise.resolve(1)
const promise2 = Promise.resolve(2)
const promise3 = Promise.resolve(3)
const promise4 = Promise.reject(4)

const promiseAll = async () => {
  const group1 = await Promise.all([promise1, promise2])
  const group2 = await Promise.all([promise3, promise4])
  return [group1, group2]
}

promiseAll().then(console.log).catch(console.log)

// 4
```

## Notes
Promise.all 就是將 iterable 的 promises 作為輸入，輸出一個 Promise
**Promise.all() takes an iterable of promises as input and returns a single Promise.**

Promise.all 輸入的 promises 只要有一個 rejects 就返回 rejects
This returned promise fulfills when all of the input's promises fulfill, with an array of the fulfillment values. It rejects when any of the input's promises rejects, with this first rejection reason.

promise4 rejects with value 4 . Which means the result is no longer available, and an error is thrown which gets captured in the catch and logs 4 to the console.
## Reference
[Discuss](https://bigfrontend.dev/quiz/Promise-Order-III/discuss)
