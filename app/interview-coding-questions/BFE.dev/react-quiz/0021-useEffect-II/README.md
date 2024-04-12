## Question: 0021-useEffect-II
```javascript
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom'

function App() {
  const [show, setShow] = useState(true)
  return <div>
    {show && <Child unmount={() => setShow(false)} />}
  </div>;
}

function Child({ unmount }) {
  const isMounted = useIsMounted()
  useEffect(() => {
    console.log(isMounted)
    Promise.resolve(true).then(() => {
      console.log(isMounted)
    });
    unmount(); 
  }, []);

  return null;
};

function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => isMounted.current = false;
  }, []);

  return isMounted.current;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
```

## Solution 1
```tsx
false
false
```

## Note
#### Discussion 1
Initially the value of ref.current is false, which is captured in isMounted. After the initial render, the value of ref.current changes to true but is not reflected in the useEffect inside Child which holds a reference to the closured value (false).

#### Discussion 2
The second console.log will be triggered when the Child component is already unmounted, because the callback set into the Promise.resolve(true).then was queued in the microtask queue

Even with the cleanup function of the useEffect from useIsMounted running before the promise callback, the reference got by the callback still the same when it was queued, even if the isMounted.current value wouldn't change to false.
