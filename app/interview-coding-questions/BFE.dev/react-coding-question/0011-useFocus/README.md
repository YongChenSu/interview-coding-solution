## Question
CSS pseudo-class :focus-within could be used to allow conditional rendering in parent element on the focus state of descendant elements.

While it is cool, in complex web apps, it might be better to control the state in script.

Now please create useFocus() to support this.

## Solution 1
用 useCallback，先移除 `input.current` 的監聽，node 再重新加入監聽，是比較好的做法

```tsx
import { Ref, useState, useRef, useCallback } from 'react';

export const useFocus = <T extends HTMLElement>(): [Ref<T>, boolean] => {
  const [isFocused, setFocused] = useState(false);
  const input = useRef<T>();

  const handleOnFocus = useCallback(() => setFocused(true), []);
  const handleOnBlur = useCallback(() => setFocused(false), []);

  const inputRefCallback = useCallback(
    (node: T) => {
      if (input.current) {
        // cleanup listeners on previous ref
        input.current.removeEventListener('focus', handleOnFocus);
        input.current.removeEventListener('blur', handleOnBlur);
      }

      if (node) {
        // Add listeners on new ref
        node.addEventListener('focus', handleOnFocus);
        node.addEventListener('blur', handleOnBlur);
      }

      // save new ref
      input.current = node;
    },
    [handleOnFocus, handleOnBlur],
  );

  return [inputRefCallback, isFocused];
}

```

## Solution 2
用 useEffect，但不是個好解法

1. useEffect gets triggered, and it double sets focused to false
2. attach the event listeners When the user focuses on the input
3. useEffect gets triggered again since ref.current has changed from undefined to the input, and it double sets focused to true

The problem is that the value of ref.current in the useEffect deps array is not in sync with the one in its body block

```typescript
import React, { Ref, useEffect, useRef, useState } from 'react'

export function useFocus<T extends HTMLElement>(): [Ref<T | undefined>, boolean] {
  const [isFocused, setFocused] = useState(false)
  const ref = useRef<T>()
  useEffect(() => {
    const currentElement = ref.current
      if (!currentElement)
      return

    // !!IMPORTANT!! 
    // initialize the focus state when currentElement changes.
    setFocused(document.activeElement === currentElement)
    
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    currentElement.addEventListener('focus', onFocus)
    currentElement.addEventListener('blur', onBlur)

    return () => {
      currentElement.removeEventListener('focus', onFocus)
      currentElement.removeEventListener('blur', onBlur)
    }
  }, [ref.current]) // now we can pass a dependency array to get much better performance.

  return [ref, isFocused]
}
```

## Reference
[useFocus](https://bigfrontend.dev/react/useFocus)
