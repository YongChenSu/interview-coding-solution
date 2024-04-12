## Question: 0023-suspense-III
```javascript
import React, { Suspense, useMemo } from 'react'
import ReactDOM from 'react-dom'

const resource = (() => {
  let data = null
  let status = 'pending'
  let fetcher = null
  return {
    get() {
      if (status === 'ready') {
        return data
      }
      if (status === 'pending') {
        fetcher = new Promise((resolve, reject) => {
          setTimeout(() => {
            data = 1
            status = 'ready'
            resolve()
          }, 100)
        })
        status = 'fetching'
      }

      throw fetcher
    }
  }
})()


function A() {
  console.log(1)
  const memoed = useMemo(() => {
    console.log(2)
    return 'memo'
  }, [])

  const data = resource.get()
  console.log(3)
  return memoed + data
}

function App() {
  return <Suspense fallback={null}>
    <A/>
  </Suspense>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
```

## Solution 1
```tsx
1
2
1
2
3
```

## Note

## Reference
[Data fetching with React Suspense](https://blog.logrocket.com/data-fetching-react-suspense/)