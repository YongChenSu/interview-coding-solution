## Question
What does the code snippet to the right output by console.log?

```javascript
const p1 = Promise.resolve(1)
const p2 = new Promise((resolve) => resolve(p1))
const p3 = Promise.resolve(p1)
const p4 = p2.then(() => new Promise((resolve) => resolve(p3)))
const p5 = p4.then(() => p4)
```

## Solution 1
```javascript
const p1 = Promise.resolve(1)
const p2 = new Promise((resolve) => resolve(p1))
const p3 = Promise.resolve(p1)
const p4 = p2.then(() => new Promise((resolve) => resolve(p3)))
const p5 = p4.then(() => p4)

console.log(p1 == p2) // false
console.log(p1 == p3) // true
console.log(p3 == p4) // false
console.log(p4 == p5) // false
```

## Nots
We know that for object comparisons to be true, the object reference should be same. Here, all the variables p1,p2,p3,p4,p5 store the Promise object, and their comparisons should return false as references are different.

However, the case of p1 == p3 is true because of how Promise.resolve() works.

Promise.resolve() returns a Promise object that is resolved with a given value. If the value is a promise, that promise is returned; otherwise, the returned promise will be fulfilled with the value.

Since we are passing p1 as an argument to p3, the same promise object gets returned and hence the reference is also the same.

## Reference
[Discuss](https://bigfrontend.dev/quiz/Promise-executor-II/discuss)
