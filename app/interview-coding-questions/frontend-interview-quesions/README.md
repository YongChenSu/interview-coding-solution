## Question
Implement useUpdateEffect() that it works the same as useEffect() except that it skips running the callback on first render.

## Solution 1
```tsx
import React, {useEffect, useRef, EffectCallback, DependencyList} from 'react';

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    return effect(); // cleanup
  }, deps)
}

```
## Note


## References
1. [useUpdateEffect()](https://bigfrontend.dev/react/useUpdateEffect)
