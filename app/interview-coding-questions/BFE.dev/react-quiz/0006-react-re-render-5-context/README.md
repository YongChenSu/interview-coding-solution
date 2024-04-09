## Question: React re-render 5 - context
```javascript
import React, { useState, memo, createContext, useEffect, useContext} from 'react'
import ReactDOM from 'react-dom'

const MyContext = createContext(0);

function B() {
  const count = useContext(MyContext)
  console.log('B')
  return null
}

const A = memo(() => {
  // A component 因為被 memo 包起來，除非 props 更新才會 re-render
  console.log('A')
  // 因為 provider value 更新，所有包在 provider 裡面的 component 都回 re-render
  // 即使 parent component 沒有更新
  return <B/> 
})

function C() {
  console.log('C')
  return null
}
function App() {
  const [state, setState] = useState(0)
  useEffect(() => {
    setState(state => state + 1)
  }, [])
  console.log('App')
  return <MyContext.Provider value={state}>
    <A/>
    <C/>
  </MyContext.Provider>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)

```

## Solution 1
```tsx
"App"
"A"
"B"
"C"
"App"
"B"
"C"
```

## Note
context is like "global"

1. All of the descendants of a Provider will rerender whenever the Provider's value is updated
2. Even though their parents component doesn't update
3. Consumers is not subject to the shouldComponentUpdate
