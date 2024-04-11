## Question: 0012-useEffect
```javascript
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

function App() {
  const [state, setState] = useState(0)
  console.log(state)

  useEffect(() => {
    setState(state => state + 1)
  }, [])

  useEffect(() => {
    console.log(state)
    setTimeout(() => {
      console.log(state)
    }, 100)
  }, [])

  return null
}

ReactDOM.render(<App/>, document.getElementById('root'))
```

## Solution
```tsx
0 // initial log outside of hooks
0 // from the second useEffect
1 // outside hooks, when state change happened
0 // queued setTimeout(console.log(state)) with closure
```

詳細解釋
```tsx
1st render

console.log(0) 【collect】

after 1st render

callback: setState function

console.log(state), now is still 0 【collect】

callback: setTimeOut(wait for 100 and then fires callback)

start working on the callback queue:

setState -> state=1

setTimeOut(wait for 100 and then fires callback)

2nd render

console.log(1) 【collect】

the 100ms passed, fires the setTimeOut function, here because of closure, console.log(0) 【collect】
```
