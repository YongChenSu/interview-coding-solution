## Question
```javascript
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

function App() {
  const [state, setState] = useState(0)
  console.log("App " + state)
  return (
    <div>
      <button onClick={() => {
        setState(count => count + 1)
        setState(count => count * 2)
      }}>click me</button>
    </div>
  )
}

(async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App/>)

  userEvent.click(await screen.findByText('click me'))
})()
```

## Solution 1

```tsx
"App 0"
"App 2"
```

## Note
**Starting in React 18 with `createRoot`, all updates will be automatically batched, no matter where they originate from.**

React 17 batches inside event handlers. 
React 17 does NOT batch outside event handlers. 

React-18 詳細的討論與 demo: [Automatic batching](https://github.com/reactwg/react-18/discussions/21)

