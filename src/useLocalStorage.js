import { useState, useEffect } from "react";

function getInputValue(initialVal) {
  const data = JSON.parse(localStorage.getItem("data"));
  if (data) return data;
  return initialVal;
}

export default function useLocalStorage(initialVal) {
  const [value, setValue] = useState(() => {
    return getInputValue(initialVal);
  });

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
