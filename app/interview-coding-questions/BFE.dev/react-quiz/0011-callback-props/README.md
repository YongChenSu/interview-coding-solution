## Question: 0011-callback-props
```javascript
import React, { memo, useState} from 'react'
import ReactDOM from 'react-dom'
import { screen, fireEvent } from '@testing-library/dom'

function _A({ onClick }) {
  console.log('A')
  return <button onClick={onClick} data-testid="button">click me</button>
}

const A = memo(_A)

function App() {
  console.log('App')
  const [state, setState] = useState(0)
  return <div>
    {state}
    <A onClick={() => {setState(state => state + 1)}}/>
  </div>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);

// click the button
;(async function() {
  const button = await screen.findByTestId('button')
  fireEvent.click(button)
})()
```

## Solution 1
```tsx
// mount
App
A

// update
App
A
```

## Note
用 React memo，只有當 props 更新時才會 re-render
1. Memo lets re-rendering a component when its props are changed.
2. React use shallow comparison to detect change in props and states.

When App is rendered, onClick is given a new reference value because the function is redefined within the component during each render cycle. This results in a new function reference being created, even if the function's contents remain the same.

## Reference
[callback-props](https://bigfrontend.dev/react-quiz/callback-props)