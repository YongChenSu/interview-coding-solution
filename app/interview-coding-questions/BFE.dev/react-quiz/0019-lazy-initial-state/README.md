## Question: 0019-lazy-initial-state
```javascript
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

function App() {
  const [state1, setState1] = useState(1);

  const [state2] = useState(() => {
    console.log(2);
    return 2;
  });

  console.log(state1);

  useEffect(() => {
    setState1(3);
  }, []);

  return null;
}

ReactDOM.render(<App/>, document.getElementById('root'))
```

## Solution 1
```tsx
2
1
3
```

## Note
If you pass function to useState, then that function gets called right away.
