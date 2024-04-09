import { useState, useCallback, useRef, Ref } from 'react';

export const useHover = <T extends HTMLElement>(): [Ref<T>, boolean] => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const ref = useRef<T>();
  const callbackRef = useCallback(
    node => {
      if (ref.current) {
        // 先 remove
        ref.current.removeEventListener('mouseenter', handleMouseEnter);
        ref.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      ref.current = node;

      if (ref.current) {
        ref.current.addEventListener('mouseenter', handleMouseEnter);
        ref.current.addEventListener('mouseleave', handleMouseLeave);
      }
    },
    [handleMouseEnter, handleMouseLeave],
  );
  return [callbackRef, isHovered];
};
