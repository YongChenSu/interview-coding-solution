## Question
For a frequently changing value like text input you might want to debounce the changes.

Implement useDebounce() to achieve this.

```javascript
function App() {
  const [value, setValue] = useState(...)
  // this value changes frequently, 
  const debouncedValue = useDebounce(value, 1000)
  // now it is debounced
}
```

## Solution 1
```tsx
// export function useDebounce<T>(value: T, delay: number): T {
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debouncedValue
}
```

## Note

**帶逗號的泛型參數 (<T,>):**

在某些情況下，特別是在 JSX 中使用 TypeScript 時，加上逗號可以幫助解析器更清楚地區分泛型參數和 JSX 標籤。這主要是為了避免和 JSX 的語法衝突。例如：
```typescript
const component = <MyComponent<string, number>>
```
可能會被錯誤地解析為 JSX，而不是泛型。在這種情況下，使用逗號，如：
```typescript
<MyComponent<string, number,>
```
可以幫助解析器正確識別它是一個泛型語句。如果不涉及 JSX 或特殊的解析問題，建議使用沒有逗號的寫法。

## References
1. [useDebounce](https://bigfrontend.dev/react/useDebounce)
