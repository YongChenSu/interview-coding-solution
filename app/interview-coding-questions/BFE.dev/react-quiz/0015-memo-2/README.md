## Question: 0015-memo-2
```javascript
import React, { memo, useState } from 'react'
import ReactDOM from 'react-dom'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

function _B() {
  console.log('B')
  return null
}

const B = memo(_B)

function _A({ children }) {
  console.log('A')
  return children
}

const A = memo(_A)

function App() {
  const [count, setCount] = useState(0)
  return <div>
    <button onClick={
      () => setCount(count => count + 1)
    }>
      click me
    </button>
    <A><B/></A>
  </div>
}

ReactDOM.render(<App/>, document.getElementById('root'))

userEvent.click(screen.getByText('click me'))
```

## Solution 1
```tsx
"A"
"B"
"A"
```

## Note
B technically belongs to App and is recreated every time App re-renders. This means that A's children prop is reassigned to a new value every time App re-renders

#####
bc 是 because 的縮寫

## Reference
[Why using the children prop makes React.memo() not work](https://gist.github.com/slikts/e224b924612d53c1b61f359cfb962c06)