## Question
```typescript
import React from 'react'

function App() {
  const { data, error } = useSWR('/api', fetcher)
  if (error) return <div>failed</div>
  if (!data) return <div>loading</div>

  return <div>succeeded</div>
}
```

## Solution 1
```tsx
import {useEffect, useState} from 'react';
export function useSWR<T = any, E = any>(
  _key: string,
  fetcher: () => T | Promise<T>
): {
  data?: T
  error?: E
} {
  const fetchRes = fetcher();
  // const [data, setData] = useState<T>();
  // 若像以上的寫法會有 test case error: fetcher could be a non-Promise
  const [data, setData] = useState<T | undefined>(fetchRes instanceof Promise ? undefined : fetchRes);
  const [error, setError] = useState<E | undefined>();
 
  useEffect(() => {
    if (fetchRes instanceof Promise) {
      // Promise.resolve(fetchRes)
      // .then(res => setData(res))
      // .catch(err => setError(err))
      // 上面 3 行，相當於：
      fetchRes.then(setData, setError)
    }
  }, []);
  return {data, error};
}
```

## Solution 2
```typescript
export function useSWR<T = any, E = any>(
  _key: string,
  fetcher: () => T | Promise<T>,
): { data?: T; error?: E } {
  const fetchRes = fetcher();
  const [request, setRequest] = useState(
    fetchRes instanceof Promise
      ? { data: undefined, error: undefined, isLoading: true }
      : { data: fetchRes, error: undefined, isLoading: false },
  );
  useEffect(() => {
    if (fetchRes.then) {
      fetchRes
        .then(res => {
          setRequest({
            data: res,
            error: undefined,
            isLoading: false,
          });
        })
        .catch(error => {
          setRequest({
            data: undefined,
            error,
            isLoading: false,
          });
        });
    }
  }, []);

  if (request.isLoading) return { data: undefined, error: undefined };

  return {
    data: request.data,
    error: request.error,
  };
}
```

## Note
部分筆記寫在程式碼註解處

另外
`{ data?: T; error?: E }`
`{ data?: T, error?: E }`
雖然兩者都可以，但建議用分號；做分隔


## References
1. [useSWR](https://bigfrontend.dev/react/useSWR-1)


