## Question: 0018-useRef-2
```javascript
import React, { useRef, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'

function App() {
  const ref = useRef(false)

  useLayoutEffect(() => {
    console.log(1)
    ref.current = true
  })

  return <button
    autoFocus
    onFocus={() => {
      console.log(!!ref.current)
    }}
    >
    button
  </button>
}

ReactDOM.render(<App/>, document.getElementById('root'))

```

## Solution 1
```tsx
false
1
```

## Note
1. First button will be rendered
2. Then autofocus will cause button to get focus
3. As button gets focus, it's onFocus handler will be called
4. This will trigger DOM mutation, calling useLayoutEffect function

#### What is useLayoutEffect
`useLayoutEffect` run synchronously before the  browser repaints the screen. It was designed to handle side effect that require immediately DOM layout updates.

`useLayoutEffect` ensure that any change made within the hook are applied synchronously before the browser repaint the screen.

While it might not seem ideal, but highly encouraged in specific use cases, such as when measuring DOM elements, or animating or transitioning elements.

Preventing from user receiving a visual inconsistency

## Reference
[react useEffect vs useLayoutEffect hooks examples](https://blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples/)