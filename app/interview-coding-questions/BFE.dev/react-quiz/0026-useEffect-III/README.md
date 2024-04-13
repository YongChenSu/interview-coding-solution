## Question: 0026-useEffect-III
```javascript
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'

function App() {
  const [count, setCount] = useState(1)
  console.log(1)
  useEffect(() => {
    console.log(2)
    return () => {
      console.log(3)
    }
  }, [count])

  useEffect(() => {
    console.log(4)
    setCount(count => count + 1)
  }, [])
  return <Child count={count} />
}

function Child({ count }) {
  useEffect(() => {
    console.log(5)
    return () => {
      console.log(6)
    }
  }, [count]);

  return null;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
```

## Solution 1
```tsx
1  // Parent initial render
5  // Child useEffect normal runs
2  // Parent first useEffect normal runs
4  // Parent second useEffect normal runs  <-- Causes a state change
1  // Parent re-render
6  // Cleanup code in Child's useEffect (return ...)
3  // Cleanup code in parent's useEffect (return... )
5  // Child useEffect normal runs (due to dependency on count)
2  // Parent useEffect normal runs (due to dependency on count)
```

## Note
useEffect normal run 從 children component 先開始。