import { useEffect, useRef } from 'react';

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
