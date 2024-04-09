## Question: Suspense 1
```javascript
import React, { Suspense } from 'react'
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
  console.log('A1')
  const data = resource.get()
  console.log('A2')
  return <p>{data}</p>
}

function Fallback() {
  console.log('fallback')
  return null
}

function App() {
  console.log('App')
  return <div>
    <Suspense fallback={<Fallback/>}>
      <A/>
    </Suspense>
  </div>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
```

## Solution 1
```tsx
"App"
"A1"
"fallback"
"A1"
"A2"
```

## Note
##### Discussion 1
1. Firstly, react checks if we do not need any suspense (i.e. component A is ready to be used)
2. However, as code reaches resource, react cannot render A component yet, hence fallback argument component is being rendered.
3. As component A got ready to be used, fallback component is no longer displayed, and A component re-renders as a whole.


##### Discussion 2
- "suspend" rendering in order to wait for some async resource

## Reference
[Suspense-1 Discuss](https://bigfrontend.dev/react-quiz/Suspense-1/discuss)