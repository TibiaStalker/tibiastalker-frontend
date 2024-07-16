import { createContext } from "react";

import StartSearchingCharacter from "../types/StartSearchingCharacter";

export const SearchedCharacterNameContext = createContext<StartSearchingCharacter>(() => {
  return;
});
