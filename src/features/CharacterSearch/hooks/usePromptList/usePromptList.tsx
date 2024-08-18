import { useCallback, useRef, useState } from "react";

import fetchPromptList from "./fetchPromptList";

const WAITING_TIME = 800;

const initialPromptsList: string[] = [];

export const usePromptList = () => {
  const [promptList, setPromptList] = useState(initialPromptsList);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef(null);

  const clearPromptList = useCallback(() => {
    setPromptList(initialPromptsList);
  }, []);

  const getPromptList = useCallback((currentInputValue: string) => {
    clearTimeout(debounceRef.current);
    if (currentInputValue.length > 2) {
      setIsLoading(true);
      debounceRef.current = setTimeout(async () => {
        await fetchPromptList(currentInputValue, setPromptList);
        setIsLoading(false);
      }, WAITING_TIME);
    }
  }, []);

  return { promptList, getPromptList, clearPromptList, isLoading };
};

export default usePromptList;
