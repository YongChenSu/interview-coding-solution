## Question
```tsx
/**
 * How do we type onFocusChange?
 */
const addListener = (onFocusChange: unknown) => {
  window.addEventListener("focus", () => {
    onFocusChange(true);
  });

  window.addEventListener("blur", () => {
    onFocusChange(false);
  });
};

addListener((isFocused) => {
  console.log({ isFocused });

  type tests = [Expect<Equal<typeof isFocused, boolean>>];
});

```

## Solution 1
```tsx
const addListener = (onFocusChange: (isFocused: boolean) => void) => {
  window.addEventListener('focus', () => {
    onFocusChange(true);
  });

  window.addEventListener('blur', () => {
    onFocusChange(false);
  });
};

addListener((isFocused) => {
  console.log({ isFocused });

  type tests = [Expect<Equal<typeof isFocused, boolean>>];
});
```


## Solution 2
```tsx
type FocusListener = (isFocused: boolean) => void

const addListener = (onFocusChange: FocusListener) => {
  window.addEventListener('focus', () => {
    onFocusChange(true);
  });

  window.addEventListener('blur', () => {
    onFocusChange(false);
  });
};

addListener((isFocused) => {
  console.log({ isFocused });

  type tests = [Expect<Equal<typeof isFocused, boolean>>];
});
```


