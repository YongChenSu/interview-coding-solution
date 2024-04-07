import { useRef, useEffect } from 'react';

export function useIsFirstRender(): boolean {
  const ref = useRef<boolean>(true);
  useEffect(() => {
    ref.current = false;
  }, []);
  return ref.current;
}
