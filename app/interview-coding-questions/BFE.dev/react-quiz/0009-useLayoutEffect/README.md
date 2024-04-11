## Question: 0009-useLayoutEffect
```javascript
import React, { useState, useEffect, useLayoutEffect} from 'react'
import ReactDOM from 'react-dom'

function App() {
  console.log('App')
  const [state, setState] = useState(0)
  useEffect(() => {
    setState(state => state + 1)
  }, [])

  useEffect(() => {
    console.log('useEffect 1')
    return () => {
      console.log('useEffect 1 cleanup')
    }
  }, [state])

  useEffect(() => {
    console.log('useEffect 2')
    return () => {
      console.log('useEffect 2 cleanup')
    }
  }, [state])

  useLayoutEffect(() => {
    console.log('useLayoutEffect')
    return () => {
      console.log('useLayoutEffect cleanup')
    }
  }, [state])

  return null
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
```

## Solution 1
```tsx
"App" // Initial rendering cycle doesn't run any clean up.
"useLayoutEffect"
"useEffect 1"
"useEffect 2"
"App" // Re-render
"useLayoutEffect cleanup" // useLayoutEffect is first to be cleaned up and immediately executed.
"useLayoutEffect"
"useEffect 1 cleanup" // Regular useEffects are grouped, cleaned up and then executed for the second rendering cycle.
"useEffect 2 cleanup"
"useEffect 1"
"useEffect 2"
```

## Note
若使用 `useEffect` 畫面會一直閃爍，才考慮改用 `useLayoutEffect` 解決問題，但因會`useLayoutEffect` 會在瀏覽器重繪前執行，可能會造成

在 state 更新之時，畫面要重繪，在 `useEffect` 中 state 又被更新一次，導致畫面閃爍
，但使用 `useLayoutEffect` 會等 `useLayoutEffect` 裡的 state 更新完再進行重繪。

官方文件

#### useLayoutEffect 的使用時機 
需要計算元素的準確高度，才判斷要將元素顯示在哪裡 (tooltip)

```javascript
function Tooltip() {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0); // You don't know real height yet

  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height); // Re-render now that you know the real height
  }, []);

  // ...use tooltipHeight in the rendering logic below...
}
```

React 則會在重繪前，就重新計算正確的位置，才渲染畫面。


## Reference
[useLayoutEffect 的使用時機](https://react.dev/reference/react/useLayoutEffect#usage)
[請解釋 useEffect？與 useLayoutEffect 的區別？](https://www.explainthis.io/zh-hant/swe/use-effect-vs-use-layout-effect)
