import { useState, useCallback, useRef } from 'react'

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
