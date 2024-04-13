## Question: 0024-useEffect-timing
```javascript
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

function App() {
  const [state, setState] = useState(0)
  console.log(1)
  
  useEffect(() => {
    console.log(2)
  }, [state])

  Promise.resolve().then(() => console.log(3))

  setTimeout(() => console.log(4), 0)

  const onClick = () => {
    console.log(5)
    setState(num => num + 1)
    console.log(6)
  }
  return <div>
    <button onClick={onClick}>click me</button>
  </div>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)

setTimeout(() => userEvent.click(screen.getByText('click me')), 100)
```

## Solution 1
```tsx
1
2
3
4
5
6
1
2
3
4
```

## Note
Trigger sequence in a component rendering:


>1. synchronous code directly in component (log(1))
>2. synchronous code in useEffect callback (log(2))
>3. ==micro task== (log(3) in promise then)
>4. ==macro task== (log(4) in timeout callback) result: 1 -> 2 -> 3 -> 4

Trigger sequence in the button click event listener:

>1. synchronous code (log(5) and log(6))
>2. setState updates state
>3. component rerendering caused by the state update, same order with the previous component rendering result 5 -> 6 -> 1 -> 2 -> 3 -> 4

Answer 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 1 -> 2 -> 3 -> 4

## Reference
[BFE - useEffect-timing](https://bigfrontend.dev/react-quiz/useeffect-timing)