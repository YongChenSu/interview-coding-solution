## Question
What does the code snippet to the right output by console.log?

```javascript
new Promise((resolve, reject) => {
  resolve(1)
  resolve(2)
  reject('error')
}).then((value) => {
  console.log(value)
}, (error) => {
  console.log('error')
})
```

## Solution 1
```javascript
1
```

## Nots
When a promise gets settled (resolved or rejected) additional calls to resolve() or reject() will not have any effect.
