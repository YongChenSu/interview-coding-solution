## Question & Solution
```javascript
const createPromise = () => Promise.resolve(1)

function func1() {
  createPromise().then(console.log)
  console.log(2)
}

async function func2() {
  await createPromise()
  console.log(3)
}

console.log(4)
func1()
func2()

// 4
// 2
// 1
// 3
```

## Notes
Here's how the order works:

- As per the order, 4 gets logged
- func1 is invoked, console.log is queued to microtask queue and 2 gets printed
- func2 is invoked, but because we await, the rest of the function queues as a microtask.
- call stack is empty so the microtask queue starts executing. Thus printing 1(from func1) and then 3(from func2)

## Reference
[Discuss](https://bigfrontend.dev/quiz/Promise-Order-III/discuss)
