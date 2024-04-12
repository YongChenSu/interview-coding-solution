## Question: 0016-event-handler
```javascript
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

function App() {
  const [state, setState] = useState(0)
  const onClick = () => {
    console.log('handler')
    setState(state => state + 1)
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
"handler 0"
"render 1"
```

## Note
Calling setState does not change the current state in the already executing code. It only affects what this.state will return starting from the next render

## Reference
[react Component setState](https://react.dev/reference/react/Component#setstate)