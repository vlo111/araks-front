import { useState } from 'react';

export const useLocalStorageGet = <T>(key: string, initialValue: T): T => {
  // Retrieve the initial value from localStorage if it exists
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? (storedValue as T) : initialValue;

  // Create a state variable to hold the current value
  const [value] = useState<T>(initial);

  return value;
};
