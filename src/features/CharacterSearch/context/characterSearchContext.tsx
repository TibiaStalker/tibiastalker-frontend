import { createContext } from "react";

import initialSearchStatus from "../constants/initialSearchStatus";
import SearchContext from "../types/SearchContext";

const CharacterSearchContext = createContext<SearchContext>({
  search: characterName => {
    return;
  },
  successfullyFound: () => {
    return;
  },
  notFound: () => {
    return;
  },
  searchStatus: initialSearchStatus,
});

export default CharacterSearchContext;
