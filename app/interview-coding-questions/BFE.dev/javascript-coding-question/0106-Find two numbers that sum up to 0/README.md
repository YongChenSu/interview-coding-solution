## Question
Given an array of integers, find two number that sums up to 0, return their indices.

There might be multiple pairs, any of them would do. If not found, return null

```javascript
findTwo([1,2,3,-1])
// [0,3]

findTwo([1,2,3,-1,-2,0])
// [0,3] or [1,4] or [5, 5]

findTwo([1,2,3,4])
// null
```

## Solution 1
```tsx
function findTwo(arr) {
  const numberMap = new Map()
  for (let i in arr) {
    numberMap.set(arr[i], i)
  }

  for (let i in arr) {
    if (numberMap.has(-arr[i])) {
      return [i, numberMap.get(-arr[i])]
    }
  }
  return null
}
```
## Solution 2
```tsx
function findTwo(arr) {
  let obj = {}
  for (let i in arr) {
    obj[arr[i]] = i
  }
  for (let key in obj) {
    if (obj[-key]) return [obj[key], obj[-key]]
  }
  return null
}
```

## Solution 3
```tsx
function findTwo(arr) {
  for (let i=0; i<arr.length; i++) {
    for (let j=0; j<arr.length; j++) {
      if (arr[i] + arr[j] === 0) return [i, j]
    }
  }
  return null
}
```
