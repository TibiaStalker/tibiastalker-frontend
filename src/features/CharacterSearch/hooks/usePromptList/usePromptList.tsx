import { useCallback, useRef, useState } from "react";

import fetchPromptList from "./fetchPromptList";

const initialPromptsList: string[] = [];

export const usePromptList = () => {
  const [promptList, setPromptList] = useState(initialPromptsList);
  const debounceRef = useRef(null);

  const clearPromptList = useCallback(() => {
    setPromptList(initialPromptsList);
  }, []);

  const getPromptList = useCallback((currentInputValue: string) => {
    clearTimeout(debounceRef.current);
    if (currentInputValue.length > 2) {
      debounceRef.current = setTimeout(
        () => fetchPromptList(currentInputValue, setPromptList),
        800,
      );
    }
  }, []);

  return { promptList, getPromptList, clearPromptList };
};

export default usePromptList;
