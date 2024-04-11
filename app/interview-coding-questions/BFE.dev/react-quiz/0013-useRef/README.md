## Question: 0000-template
```javascript
import React, { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

function App() {
  const ref = useRef(null)
  const [state, setState] = useState(1)

  useEffect(() => {
    setState(2)
  }, [])

  console.log(ref.current?.textContent)

  return <div>
    <div ref={state === 1 ? ref : null}>1</div>
    <div ref={state === 2 ? ref : null}>2</div>
  </div>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
```

## Solution 1
```tsx
undefined
// because at the first time when console hits, the ref.current value is null and a  conditional operator returns undefined for this
// after this DOM renders and ref is assigned to first DOM element with text as 1, after the component mounted, useEffect will update the state to 2 and another lifecycle begins here, but remember ref will remember their past values
"1" // on next render when console log hit the ref. current is assigned to first dome with text value as 1, so it will print 1, but in case any other renders will happen then due to current state as 2 the ref is assigned the second dom with text value as 2 so it will print 2, since there are no more renders in this method so it will stop here
```
