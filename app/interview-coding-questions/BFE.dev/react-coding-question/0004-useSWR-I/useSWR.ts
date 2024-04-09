import { useState, useEffect } from 'react';

export function useSWR<T = any, E = any>(
  _key: string,
  fetcher: () => T | Promise<T>,
): { data?: T; error?: E } {
  const fetchRes = fetcher();
  const [data, setData] = useState<T | undefined>(
    fetchRes instanceof Promise ? undefined : fetchRes,
  );
  const [error, setError] = useState<E | undefined>();

  useEffect(() => {
    if (fetchRes instanceof Promise) {
      fetchRes.then(setData, setError);
    }
  }, []);

  return { data, error };
}
