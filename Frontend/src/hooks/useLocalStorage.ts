import { useState } from 'react';

type SetValue<T> = T | ((prev: T) => T);

interface UseLocalStorageOptions<T> {
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: UseLocalStorageOptions<T>,
) {
  const serialize = options?.serialize ?? JSON.stringify;
  const deserialize = options?.deserialize ?? JSON.parse;

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (deserialize(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: SetValue<T>) => {
    setStoredValue((prev) => {
      const valueToStore = value instanceof Function ? value(prev) : value;
      try {
        window.localStorage.setItem(key, serialize(valueToStore));
      } catch {
        // Ignore write errors so UI state still works.
      }
      return valueToStore;
    });
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignore remove errors.
    }
    setStoredValue(initialValue);
  };

  return [storedValue, setValue, removeValue] as const;
}
