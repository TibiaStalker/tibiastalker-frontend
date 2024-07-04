import { useCallback, useRef, useState } from "react";

import { BASE_URL } from "../../../constants/tibiastalkerApi";

const fetchPromptList = async (input: string, setPromptData: (promptData: string[]) => void): Promise<void> => {
  const result = await fetch(`${BASE_URL}/prompt?searchText=${input}&page=1&pageSize=10`);
  const data = await result.json();
  setPromptData(data);
  return Promise.resolve();
};

const initialPromptsList: string[] = [];

const usePromptList = () => {
  const [promptList, setPromptList] = useState(initialPromptsList);
  const debounceRef = useRef(null);

  const clearPromptList = useCallback(() => {
    setPromptList(initialPromptsList);
  }, []);

  const getPromptList = useCallback((currentInputValue: string) => {
    clearTimeout(debounceRef.current);
    if (currentInputValue.length > 2) {
      debounceRef.current = setTimeout(() => fetchPromptList(currentInputValue, setPromptList), 800);
    }
  }, []);

  return { promptList, getPromptList, clearPromptList };
};

export default usePromptList;
