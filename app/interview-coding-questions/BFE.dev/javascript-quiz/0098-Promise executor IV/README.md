## Question & Solution
```javascript
const promise = new Promise((resolve, reject) => {
  const promise2 = Promise.reject('error').then(
    () => { console.log(1)}, // resolve
    () => { console.log(2)} // reject
  )
  resolve(promise2)
});
promise.then(console.log);

// 2
// undefined
```

## Notes

## Reference
[Discuss](https://bigfrontend.dev/quiz/promise-order-II/discuss)
