import { useState } from "react";

export const useLocalStorage = <T>(path: string, initialValue: T) => {
  const storedValue = localStorage.getItem(
    `${import.meta.env.VITE_LOCALSTORAGE_BASE}${path}`
  );
  const parsedValue = storedValue
    ? (JSON.parse(storedValue) as T)
    : initialValue;
  const [value, setValue] = useState<T>(parsedValue);
  const update = (newValue: T) => {
    localStorage.setItem(
      `${import.meta.env.VITE_LOCALSTORAGE_BASE}${path}`,
      JSON.stringify(newValue)
    );
    setValue(newValue);
  };

  return [value, update] as const;
};
