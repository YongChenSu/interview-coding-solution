## Question: 0025-all-kind-of-effects
```javascript
import React, { useState, useEffect, useLayoutEffect, useInsertionEffect} from 'react'
import ReactDOM from 'react-dom'

function App() {
  console.log(1)
  const [state, setState] = useState(0)
  useEffect(() => {
    setState(state => state + 1)
  }, [])

  useEffect(() => {
    console.log(2)
    return () => {
      console.log(3)
    }
  }, [state])

  useEffect(() => {
    console.log(4)
    return () => {
      console.log(5)
    }
  }, [state])

  useLayoutEffect(() => {
    console.log(6)
    return () => {
      console.log(7)
    }
  }, [state])

  useInsertionEffect(() => {
    console.log(8)
    return () => {
      console.log(9)
    }
  }, [state])
  console.log(10)
  return null
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)

```

## Solution 1
```tsx
1
10
8
6
2
4
1
10
9
8
7
6
3
5
2
4
```

## Note
Basic follow this priority:

1. Rendering (high to low): main thread -> useInsertionEffect -> useLayoutEffect -> useEffect

2. re- Rendering (high to low): main thread -> useInsertionEffect cleanup, then immediately executed -> useLayoutEffect clean up then immediately executed. -> useEffect ALL cleanup -> useEffect executed one by one by order

## Reference
[BFE all-kinds-of-effects](https://bigfrontend.dev/react-quiz/all-kinds-of-effects)