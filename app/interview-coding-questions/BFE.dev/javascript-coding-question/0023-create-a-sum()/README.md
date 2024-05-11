## Question
```javascript
Create a sum(), which makes following possible

const sum1 = sum(1)
sum1(2) == 3 // true
sum1(3) == 4 // true
sum(1)(2)(3) == 6 // true
sum(5)(-1)(2) == 6 // true
```
## Solution 1
```tsx
function sum(num) {
  // num2 是下一個參數，num 則是存在上一個 closure 中先前參數的綜合
  const fn = (num2) => sum(num + num2)
  // 需要將 fn 轉換為原始值
  fn.valueOf = () => num;
  return fn
}
```


## Solution 2
```jsx
// currentSum 用來暫存目前的累積值
function sum(num, currentSum = 0) {
  const func = function(arg) {
    return sum(arg, num + currentSum)
  }

  // 需要將 func 轉換為原始值
  func.valueOf = () => num + currentSum
  return func
}
```

## Note
設計一個 sum，持續接受參數並累加之前的參數值
