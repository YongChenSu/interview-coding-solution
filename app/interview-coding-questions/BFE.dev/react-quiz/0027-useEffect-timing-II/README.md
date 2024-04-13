## Question: 0027-useEffect-timing-II
```javascript
'infiniteLoopProtection:false'

import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

function App() {
  const [state] = useState(0)
  console.log(1)
  
  const start = Date.now()
  while (Date.now() - start < 50) {
    window.timestamp = Date.now()
  }
  
  useEffect(() => {
    console.log(2)
  }, [state])

  Promise.resolve().then(() => console.log(3))

  setTimeout(() => console.log(4), 0)

  return null
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
```

## Solution 1
```tsx
1
3
4
2
```

## Note
infinite while loop blocked useEffect invoke
