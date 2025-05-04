## Omit、Pick 用法

## Solution 1
```tsx
interface User {
  id: string;
  firstName: string;
  lastName: string;
}

// 拿 User 但不要 id
type MyType = Omit<User, "id">;

type tests = [Expect<Equal<MyType, { firstName: string; lastName: string }>>];
```

## Solution 2
```tsx
interface User {
  id: string;
  firstName: string;
  lastName: string;
}

type MyType = Pick<User, "firstName" | "lastName">;

type tests = [Expect<Equal<MyType, { firstName: string; lastName: string }>>];
```
