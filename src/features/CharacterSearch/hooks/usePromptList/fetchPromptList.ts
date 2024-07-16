import { charactersPromptUrl } from "../../../../constants/api";
import { FetchPromptList } from "./types";

const fetchPromptList: FetchPromptList = async (input, setPromptData) => {
  const result = await fetch(`${charactersPromptUrl}?searchText=${input}&page=1&pageSize=10`);
  const data = await result.json();
  setPromptData(data);
  return Promise.resolve();
};

export default fetchPromptList;
