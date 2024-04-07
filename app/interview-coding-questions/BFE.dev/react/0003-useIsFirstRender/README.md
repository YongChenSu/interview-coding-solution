## Question
Create a hook to tell if it is the first render.

## Solution 1
```tsx
export function useFirstRender(): boolean {
  const ref = useRef<boolean>(true);
  useEffect(() => {
    ref.current = false;
  }, []);
  return ref.current;
}
```

## Solution 2
```typescript
export function useIsFirstRender(): boolean {
  const isFirstRender = useRef(true);

  if (isFirstRender.current) {
    isFirstRender.current = false;
    return true
  }

  return false;
```

## Note
Solution 1 is more idiomatic and explicit way to handle such side effects that should only run once after the initial render. It provides a clear signal in the code that a specific effect is intended to run only once.

## References
1. [useIsFirstRender() discussion](https://bigfrontend.dev/react/useIsFirstRender/discuss)
2. [useIsFirstRender()](https://bigfrontend.dev/react/useIsFirstRender)
