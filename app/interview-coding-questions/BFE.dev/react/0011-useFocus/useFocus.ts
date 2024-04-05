import { Ref, useState, useRef, useCallback } from 'react';

export function useFocus<T extends HTMLElement>(): [Ref<T>, boolean] {
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
