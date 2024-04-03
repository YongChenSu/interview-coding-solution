## Question
It is common to see conditional rendering based on hover state of some element.

We can achive it by CSS pseduo class `:hover`, but for more complex cases it might be better to have state controlled by script.

Now you are asked to create a `useHover()` hook.

## Solution 1

```tsx
export const useHover = <T extends HTMLElement>(): [Ref<T>, boolean] => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const ref = useRef<T>();
  useEffect(() => {
    setIsHovered(false);
    const element = ref?.current
    if (!element) return;
  
    element.addEventListener('mouseenter', () => setIsHovered(true))
    element.addEventListener('mouseleave', () => setIsHovered(false))

    return () => {
      element.removeEventListener('mouseenter', () => setIsHovered(true))
      element.removeEventListener('mouseleave', () => setIsHovered(false))
    }

  },[ref.current])

  return [ref, isHovered]
}

export function App() {
  const [ref, isHovered] = useHover();
  return <div ref={ref}>your app</div>
}
```

## Solution 2

render 次數相較 solution 1 少

```tsx
export const useHover = <T extends HTMLElement>(): [Ref<T>, boolean] => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])
  const ref = useRef<T>();
  // Use a callback ref instead of useEffect so that event listeners
  // get changed in the case that the returned ref gets added to
  // a different element later. With useEffect, changes to ref.current
  // wouldn't cause a rerender and thus the effect would run again.
  const callbackRef = useCallback(node => {
    if (ref.current) {
      // 先 remove
      ref.current.removeEventListener('mouseenter', handleMouseEnter);
      ref.current.removeEventListener('mouseleave', handleMouseLeave);
    }
    ref.current = node;
    
    if (ref.current) {
      ref.current.addEventListener('mouseenter', handleMouseEnter);
      ref.current.addEventListener('mouseleave', handleMouseLeave);
    }
  }, [handleMouseEnter, handleMouseLeave])
  return [callbackRef, isHovered]
}

export function App() {
  const [ref, isHovered] = useHover();
  return <div ref={ref}>your app</div>
}
```

## Note
`useRef` 本意希望不要與 rerender 掛鉤，若使用 useEffect 的方法，要完成 `useHover` 功能就要加在 deps list，即便是用 `ref.current`，還是與設計理念相反。

## References
1. [BFE.dev 討論串](https://bigfrontend.dev/react/useHover/discuss)
2. [useHover example](https://gist.github.com/gragland/a32d08580b7e0604ff02cb069826ca2f)
