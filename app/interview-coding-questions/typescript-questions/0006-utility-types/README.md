## Question
```tsx
type APIResponse =
  | { type: 'success'; data: string }
  | { type: 'error'; message: string }
  | { type: 'loading' };
```

請定義兩個 utility type：

type OnlyError<T> = ?;
type OnlyWithData<T> = ?;
OnlyError<APIResponse> 應該會回傳 { type: 'error'; message: string }

OnlyWithData<APIResponse> 應該回傳 { type: 'success'; data: string }


## Solution 1
```tsx
type OnlyError<T> = Extract<T, { type: 'error' }>;
type OnlyWithData<T> = Extract<T, { type: 'success' }>;
```

或是等價地
```tsx
type OnlyError<T> = T extends { type: 'error' } ? T : never;
type OnlyWithData<T> = T extends { type: 'success' } ? T : never;
```

```tsx
type Err = OnlyError<APIResponse>;
//   ↑ 會是 { type: 'error'; message: string }

type Suc = OnlyWithData<APIResponse>;
//   ↑ 會是 { type: 'success'; data: string }
```
