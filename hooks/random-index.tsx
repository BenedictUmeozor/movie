import { useCallback, useEffect, useState } from "react";

const useRandomIndex = (length: number) => {
  const [randIndex, setRandIndex] = useState(
    Math.floor(Math.random() * (length - 1)),
  );

  const setNewIndex = useCallback(() => {
    setRandIndex((prevIndex) => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * (length - 1));
      } while (newIndex === prevIndex);
      return newIndex;
    });
  }, [length]);

  useEffect(() => {
    const interval = setInterval(setNewIndex, 10000);
    return () => clearInterval(interval);
  }, [setNewIndex]);

  return { randIndex, setNewIndex };
};

export default useRandomIndex;
