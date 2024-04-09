## Question

## Solution 1

```tsx
export const useClickOutside = <T extends HTMLElement>(callback: () => void): React.RefObject<T> => {
	const ref = useRef<T>();
	useEffect(() => {
		const handleClickOutSide = ({ target }: Event) => {
			if (ref.current && !ref.current.contains(target as Node)) {
				callback();
			}
		};
		document.addEventListener('click', handleClickOutSide);
		return () => document.removeEventListener('click', handleClickOutSide);
	}, [ref, callback]);
	return ref;
};
```

## Note
很久以前就做過該 hook，這次重新用 TypeScript 再寫一次。
