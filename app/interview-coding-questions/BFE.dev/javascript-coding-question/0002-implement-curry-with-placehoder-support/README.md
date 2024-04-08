## Question
```javascript
const join = (a, b, c) => {
   return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)

curriedJoin(1, 2, 3) // '1_2_3'

curriedJoin(1)(2, 3) // '1_2_3'

curriedJoin(1, 2)(3) // '1_2_3'
```

## Solution 1
```tsx
const  join = (a, b, c) => {
   return `${a}_${b}_${c}`
}

function curry(func) {
  return function curried(...args) {
    // 1. if enough args(need to filter out the placeholder), call func
    // 2. if not enough, bind the args and wait for new one

    // _,_,_,1,2
    const expectedArgLength = func.length;
    const isArgsEnough =
      args.length >= expectedArgLength &&
      // 擷取出來的參數中，不能有 curry.placeholder
      args.slice(0, expectedArgLength).every(arg => arg !== curry.placeholder);

    if (isArgsEnough) {
      // return func(...args)
      return func.apply(this, args);
    } else {
      // _,_,_,1,2,
      // 3,_
      // if bind _,_,_,1,2,3,_  X
      // we want 3,_,_,1,2
      return function (...newArgs) {
        // we need merge two args,  newArgs, args
        const finalArgs = [];
        let i = 0;
        let j = 0;
        while (i < args.length && j < newArgs.length) {
          if (args[i] === curry.placeholder) {
            // 當 args[i] 為 _ 時，將當下 newArg 的值 (newArg[i]) 推入 finalArgs
            finalArgs.push(newArgs[j]);
            i += 1;
            j += 1;
          } else {
            // 不為 _ 就將原先的 args 推入 finalArgs
            finalArgs.push(args[i]);
            i += 1;
          }
        }
        // 先將原先剩餘的 args[i] 推入
        while (i < args.length) {
          finalArgs.push(args[i]);
          i += 1;
        }
        // 再將剩餘的 newArgs 推入 
        while (j < newArgs.length) {
          finalArgs.push(newArgs[j]);
          j += 1;
        }

        return curried(...finalArgs);
      };
    }
  };
}

curry.placeholder = Symbol();

const curriedJoin = curry(join)
const _ = curry.placeholder

console.log(curriedJoin(_, _, _)(1)(_, 3, 4, 5)(2)) // '1_2_3'
```
## Solution 2
```tsx
function curry(func) {
  return function curried(...args) {
    const complete = args.length >= func.length && !args.slice(0, func.length).includes(curry.placeholder);
    if(complete) return func.apply(this, args)
    return function(...newArgs) {
      // replace placeholders in args with values from newArgs
      const res = args.map(arg => arg === curry.placeholder && newArgs.length ? newArgs.shift() : arg);
      return curried(...res, ...newArgs);
    }
  }
}

curry.placeholder = Symbol()
```

## Note
寫於程式碼註解中。

## References
1. [implement curry() with placeholder support - discuss](https://bigfrontend.dev/problem/implement-curry-with-placeholder/discuss)
