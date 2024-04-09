## Question: Suspense 2
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

function B() {
  console.log('B')
  return null
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
      <B/>
    </Suspense>
  </div>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
```

## Solution 1
```tsx
"App"
"A1" // ran into async render
"B"  // render other children first
"fallback" // render fallback
"A1" // rerender all children once async resolved
"A2"
"B"
```

## Note
Suspense 'checks' all components. That is, the body code of each component will be executed. Then it waits for each loading it finds.
