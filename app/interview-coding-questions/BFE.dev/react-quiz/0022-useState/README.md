## Question: 0022-useState
```javascript
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

function A() {
  console.log('render A')
  return null
}

function App() {
  const [_state, setState] = useState(false)
  console.log('render App')
  return <div>
    <button onClick={() => {
      console.log('click')
      setState(true)
    }}>click me</button>
    <A />
  </div>
}

ReactDOM.render(<App/>, document.getElementById('root'))

userEvent.click(screen.getByText('click me'))
userEvent.click(screen.getByText('click me'))
userEvent.click(screen.getByText('click me'))

```

## Solution 1
```tsx
"render App"
"render A"
"click"
"render App"
"render A"
"click"
"render App"
"click"
```

## Note
即使 setState set 的 state value 一樣，依舊會再多 re-render 一次。

## Reference
1. [React hooks useState setValue still rerender one more time when value is equal](https://stackoverflow.com/questions/57652176/react-hooks-usestate-setvalue-still-rerender-one-more-time-when-value-is-equal)
2. [How does useState() work internally in React?](https://jser.dev/2023-06-19-how-does-usestate-work/#1-usestate-in-initial-rendermount)
