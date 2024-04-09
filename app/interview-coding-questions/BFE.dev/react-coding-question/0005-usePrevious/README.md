## Question
Create a hook usePrevious() to return the previous value, with initial value of `undefined.

## Solution 1

```tsx
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
```

## References
1. [usePrevious()](https://bigfrontend.dev/react/usePrevious)
