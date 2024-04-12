## Question: 0017-flushSync
```javascript
import React, { useState } from 'react'
import ReactDOM, { flushSync } from 'react-dom'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

function App() {
  const [state, setState] = useState(0)
  const onClick = () => {
    console.log('handler')
    flushSync(() => {
      setState(state => state + 1)
    })
    console.log('handler ' + state)
  }
  console.log('render ' + state)
  return <div>
    <button onClick={onClick}>click me</button>
  </div>
}

ReactDOM.render(<App/>, document.getElementById('root'))
// click the button
userEvent.click(screen.getByText('click me'))
```

## Solution 1
```tsx
"render 0"
"handler"
"render 1"
"handler 0"
```

## Note
`render 0`: logged the first time the DOM is rendered. Then the click event happens

`handler`: logged when the handler for the click fires

`render 1`: logged first because flushSync causes the DOM to synchronously get re-rendered with the new state

`handler 0`: logged after flushSync, but using the state value that was available when this function first initialized

flushSync 同步刷新，會強制讓整個 tree 以新的 state re-render。

## Reference
[ref]()