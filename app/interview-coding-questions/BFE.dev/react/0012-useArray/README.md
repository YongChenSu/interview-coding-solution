
## Solution 1

```tsx
type UseArrayActions<T> = {
  push: (item: T) => void,
  removeByIndex: (index: number) => void
}

// Function Expression (Arrow Function) with only useCallback:
export const useArray1 = <T,>(initialValue: T[]): { value: T[] } & UseArrayActions<T> =>{
	const [value, setValue] = useState<T[]>(initialValue);
	const push = useCallback((item: T) => setValue((prev) => [...prev, item]), []);
	const removeByIndex = useCallback((index: number) => setValue((prev) => {
	  const copy = [...prev];
	  copy.splice(index, 1);
	  return copy;
	}), []);

	return { value, push, removeByIndex };
}
```

## Solution 2

```tsx
type UseArrayActions<T> = {
  push: (item: T) => void,
  removeByIndex: (index: number) => void
}
// Function Declaration with useRef:
export function useArray2<T>(initialValue: T[]): { value: T[] } & UseArrayActions<T> {
  const [value, setValue] = useState(initialValue);
  const arrayRef = useRef(initialValue); // for empty dependency list in useCallback

  const updateValue = (newValue: T[]) => {
    setValue(newValue);
    arrayRef.current = newValue;
  };

  const push: UseArrayActions<T>['push'] = useCallback((...args) => {
    const newValue = [...arrayRef.current];
    newValue.push(...args);
    updateValue(newValue);
  }, []);

  const removeByIndex: UseArrayActions<T>['removeByIndex'] = useCallback((index) => {
    const changedValue = arrayRef.current.filter((_, idx) => idx !== index);
    updateValue(changedValue);
  }, []);

  return {value, push, removeByIndex}
}
```

## Without callback wrapper, the test case fail
Without the callback wrapper, when a component gets re-rendered (or flushed, in the test), it creates a new instance of the function. So when the test collects the the push/remove functions into it's array, it's collecting two unique instance/objects of the functions in the test

:::danger
push(), removeByIndex() should be stable spec, expects 1 but got 2
:::

## Test case
```tsx
test('push(), removeByIndex() should be stable', async () => {
  const $root = document.querySelector('#root')

  const initArray = [1, 2, 3]

  const push_values = []
  const removeByIndex_values = []

  function App() {
    const {push, removeByIndex} = useArray(initArray)
    const [_, setState] = useState(0)
    push_values.push(push)
    removeByIndex_values.push(removeByIndex)

    useEffect(() => {
      flushSync(() => {
        setState(1)
      })
      flushSync(() => {
        push(4)
      })
    }, [])

    return null
  }

  ReactDOM.render(<App />, $root)
  await wait(50)
  expect(new Set(push_values).size).toBe(1)
  expect(new Set(removeByIndex_values).size).toBe(1)
})
```

## Note
In general, if you're passing functions as callbacks between components/hooks, it's best to wrap it around the callback.


#### [React flushSync](https://react.dev/reference/react-dom/flushSync)
flushSync lets you force React to flush any updates inside the provided callback synchronously. This ensures that the DOM is updated immediately.
